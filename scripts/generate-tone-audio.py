#!/usr/bin/env python3
# 用源-滤波器共振峰合成生成声调小滑梯音频：声门脉冲源按普通话四声基频曲线，
# 过 a/o/e 三个共振峰带通滤波。完全离线、声调精确，避免 TTS 对孤立元音渲染不出声调。
# 用法：python scripts/generate-tone-audio.py [--overwrite]
import argparse
import subprocess
import sys
import tempfile
from pathlib import Path

import numpy as np
from scipy.signal import lfilter
import soundfile

ROOT = Path.cwd()
OUT_DIR = ROOT / "assets/audio/tones"
SR = 24000
DUR = 0.72  # 秒
BITRATE = "56k"

# 共振峰（F1,F2,F3 Hz）和带宽，近似普通话单元音。
VOWEL_FORMANTS = {
    "a": [(800, 80), (1200, 90), (2800, 160)],
    "o": [(480, 70), (820, 90), (2550, 160)],
    "e": [(500, 80), (1350, 100), (2500, 160)],
}

# 四声基频控制点（归一化时间 -> Hz），女声教师音域，标准调型。
TONE_CONTOURS = {
    1: [(0.0, 250), (1.0, 248)],                      # 一声：高平
    2: [(0.0, 200), (0.45, 210), (1.0, 305)],         # 二声：上升
    3: [(0.0, 225), (0.35, 175), (0.6, 165), (1.0, 220)],  # 三声：降升
    4: [(0.0, 320), (1.0, 165)],                      # 四声：高降
}


def f0_curve(tone, n):
    pts = TONE_CONTOURS[tone]
    xs = np.array([p[0] for p in pts])
    ys = np.array([p[1] for p in pts])
    t = np.linspace(0.0, 1.0, n)
    # 在半音域线性插值更接近听感
    semis = np.interp(t, xs, 12.0 * np.log2(ys / 100.0))
    return 100.0 * (2.0 ** (semis / 12.0))


def glottal_source(f0, sr):
    # 相位积分得到基频随时间变化的脉冲位置，生成带频谱倾斜的脉冲串。
    phase = np.cumsum(f0) / sr
    src = np.zeros(len(f0))
    pulse_idx = np.where(np.floor(phase[1:]) > np.floor(phase[:-1]))[0]
    src[pulse_idx] = 1.0
    # 轻微抖动避免过于机械
    noise = np.random.default_rng(7).normal(0, 0.004, len(src))
    src = src + noise
    # 一阶低通造成声门源的频谱倾斜（-6dB/oct 附近）
    src = lfilter([1.0], [1.0, -0.97], src)
    return src


def formant_filter(x, formants, sr):
    out = np.zeros_like(x)
    for freq, bw in formants:
        r = np.exp(-np.pi * bw / sr)
        theta = 2.0 * np.pi * freq / sr
        a1 = -2.0 * r * np.cos(theta)
        a2 = r * r
        gain = (1.0 - r) * np.sqrt(1.0 - 2.0 * r * np.cos(2.0 * theta) + r * r)
        out += lfilter([gain], [1.0, a1, a2], x)
    return out


def envelope(n, sr):
    env = np.ones(n)
    ramp = int(0.03 * sr)
    win = 0.5 * (1.0 - np.cos(np.linspace(0, np.pi, ramp)))
    env[:ramp] *= win
    env[-ramp:] *= win[::-1]
    return env


def synth(vowel, tone):
    n = int(DUR * SR)
    f0 = f0_curve(tone, n)
    src = glottal_source(f0, SR)
    voiced = formant_filter(src, VOWEL_FORMANTS[vowel], SR)
    voiced *= envelope(n, SR)
    peak = np.max(np.abs(voiced)) or 1.0
    return (voiced / peak * 0.9).astype(np.float32)


def to_webm(wav_path, webm_path):
    webm_path.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-i", str(wav_path),
         "-af", "loudnorm=I=-18:TP=-2:LRA=11", "-ar", "24000", "-ac", "1",
         "-c:a", "libopus", "-b:a", BITRATE, str(webm_path)],
        check=True,
    )


def main():
    parser = argparse.ArgumentParser(description="合成声调小滑梯音频。")
    parser.add_argument("--overwrite", action="store_true", help="覆盖已存在文件。")
    parser.add_argument("--out", default=str(OUT_DIR), help="输出目录。")
    args = parser.parse_args()
    out_dir = Path(args.out)

    generated = 0
    for vowel in ("a", "o", "e"):
        for tone in (1, 2, 3, 4):
            webm = out_dir / f"{vowel}{tone}.webm"
            if webm.exists() and not args.overwrite:
                continue
            audio = synth(vowel, tone)
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmp:
                soundfile.write(tmp.name, audio, SR)
                to_webm(Path(tmp.name), webm)
                Path(tmp.name).unlink()
            generated += 1
            print(f"{webm.relative_to(ROOT) if out_dir == OUT_DIR else webm} <- {vowel} 调{tone}")
    print(f"声调音频处理完成：生成 {generated} 个。")


if __name__ == "__main__":
    main()
