#!/usr/bin/env python3
import argparse
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path


ROOT = Path.cwd()
EXPECTED_PATH = ROOT / "assets/audio/expected-files.json"
COPY_PATH = ROOT / "assets/audio/recording-copy.json"
TEMP_DIR = ROOT / ".tmp/melotts"

os.environ.setdefault("TOKENIZERS_PARALLELISM", "false")

PINYIN_PHONES = {
    "a": ["AA", "a"],
    "o": ["OO", "o"],
    "e": ["EE", "e"],
    "i": ["y", "i"],
    "u": ["w", "u"],
    "ü": ["y", "v"],
    "b": ["b", "o"],
    "p": ["p", "o"],
    "m": ["m", "o"],
    "f": ["f", "o"],
    "d": ["d", "e"],
    "t": ["t", "e"],
    "n": ["n", "e"],
    "l": ["l", "e"],
    "ba": ["b", "a"],
    "pa": ["p", "a"],
    "ma": ["m", "a"],
    "fa": ["f", "a"],
    "bo": ["b", "o"],
    "po": ["p", "o"],
    "mo": ["m", "o"],
    "fo": ["f", "o"],
    "de": ["d", "e"],
    "te": ["t", "e"],
    "ne": ["n", "e"],
    "le": ["l", "e"],
    "da": ["d", "a"],
    "ta": ["t", "a"],
    "na": ["n", "a"],
    "la": ["l", "a"],
}

TONE_BASE_PHONES = {
    "a": ["AA", "a"],
    "o": ["OO", "o"],
    "e": ["EE", "e"],
}


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def ensure_ffmpeg():
    try:
        subprocess.run(["ffmpeg", "-version"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=True)
    except (FileNotFoundError, subprocess.CalledProcessError):
        print("缺少命令：ffmpeg", file=sys.stderr)
        print("macOS 可运行：brew install ffmpeg", file=sys.stderr)
        sys.exit(1)


def load_melotts():
    try:
        from melo.api import TTS
    except ImportError:
        print("缺少 MeloTTS Python 依赖。", file=sys.stderr)
        print("推荐安装方式：", file=sys.stderr)
        print("  python3.9 -m venv .venv-melotts", file=sys.stderr)
        print("  source .venv-melotts/bin/activate", file=sys.stderr)
        print("  git clone https://github.com/myshell-ai/MeloTTS.git .tmp/MeloTTS", file=sys.stderr)
        print("  python -m pip install -e .tmp/MeloTTS", file=sys.stderr)
        print("  python -m unidic download", file=sys.stderr)
        sys.exit(1)
    return TTS


def disable_mps_when_cpu(device):
    if device != "cpu":
        return
    try:
        import torch
    except ImportError:
        return

    # MeloTTS 的中文 BERT 工具在 macOS 上会把 CPU 请求改到 MPS。
    # 这里强制保持 CPU，避免模型在 CPU、输入在 MPS 的设备不一致错误。
    torch.backends.mps.is_available = lambda: False


def output_path_for(base_path, extension):
    return ROOT / f"{base_path}{extension}"


def wav_path_for(base_path):
    return TEMP_DIR / f"{base_path.replace('/', '__')}.wav"


def convert_to_webm(wav_path, webm_path, bitrate):
    webm_path.parent.mkdir(parents=True, exist_ok=True)
    filters = "loudnorm=I=-18:TP=-2:LRA=11"
    subprocess.run(
        [
            "ffmpeg",
            "-y",
            "-v",
            "error",
            "-i",
            str(wav_path),
            "-af",
            filters,
            "-ar",
            "24000",
            "-ac",
            "1",
            "-c:a",
            "libopus",
            "-b:a",
            bitrate,
            str(webm_path),
        ],
        check=True,
    )


def direct_audio_spec(base_path):
    path = Path(base_path)
    group = path.parts[-2]
    name = path.name

    if group == "pinyin" and name in PINYIN_PHONES:
        return {"phones": PINYIN_PHONES[name], "tone": 1}

    if group == "tones" and len(name) == 2 and name[0] in TONE_BASE_PHONES and name[1] in "1234":
        return {"phones": TONE_BASE_PHONES[name[0]], "tone": int(name[1])}

    return None


def synthesize_direct_audio(model, speaker_id, spec, wav_path, speed):
    import numpy as np
    import soundfile
    import torch
    from melo import commons
    from melo.text import cleaned_text_to_sequence

    phones = spec["phones"]
    tones = [spec["tone"]] * len(phones)
    phone_ids, tone_ids, lang_ids = cleaned_text_to_sequence(phones, tones, "ZH_MIX_EN", model.symbol_to_id)

    if model.hps.data.add_blank:
        phone_ids = commons.intersperse(phone_ids, 0)
        tone_ids = commons.intersperse(tone_ids, 0)
        lang_ids = commons.intersperse(lang_ids, 0)

    device = model.device
    with torch.no_grad():
        x_tst = torch.LongTensor(phone_ids).to(device).unsqueeze(0)
        tones_tst = torch.LongTensor(tone_ids).to(device).unsqueeze(0)
        lang_ids_tst = torch.LongTensor(lang_ids).to(device).unsqueeze(0)
        bert = torch.zeros(1024, len(phone_ids)).to(device).unsqueeze(0)
        ja_bert = torch.zeros(768, len(phone_ids)).to(device).unsqueeze(0)
        x_tst_lengths = torch.LongTensor([len(phone_ids)]).to(device)
        speakers = torch.LongTensor([speaker_id]).to(device)
        audio = model.model.infer(
            x_tst,
            x_tst_lengths,
            speakers,
            tones_tst,
            lang_ids_tst,
            bert,
            ja_bert,
            sdp_ratio=0.2,
            noise_scale=0.6,
            noise_scale_w=0.8,
            length_scale=1.0 / speed,
        )[0][0, 0].data.cpu().float().numpy()

    silence = np.zeros(int(model.hps.data.sampling_rate * 0.04), dtype=np.float32)
    soundfile.write(wav_path, np.concatenate([audio, silence]), model.hps.data.sampling_rate)


def sync_manifest():
    node = shutil.which("node")
    if not node:
        print("缺少命令：node", file=sys.stderr)
        sys.exit(1)
    subprocess.run([node, "scripts/sync-audio-manifest.js"], check=True)


def parse_args():
    parser = argparse.ArgumentParser(description="使用 MeloTTS 批量生成拼音游戏音频。")
    parser.add_argument("--overwrite", action="store_true", help="覆盖已存在的 .webm 文件。")
    parser.add_argument("--dry-run", action="store_true", help="只打印将要生成的文件，不加载模型。")
    parser.add_argument("--device", default="auto", help="MeloTTS 设备：auto、cpu、cuda、cuda:0、mps。默认 auto。")
    parser.add_argument("--language", default="ZH", help="MeloTTS 语言代码。默认 ZH。")
    parser.add_argument("--speaker", default="ZH", help="MeloTTS 说话人。默认 ZH。")
    parser.add_argument("--speed", type=float, default=0.92, help="语速。默认 0.92，适合儿童稍慢一点。")
    parser.add_argument("--bitrate", default="56k", help="输出 webm/opus 比特率。默认 56k。")
    parser.add_argument("--groups", default="", help="只生成指定分组，逗号分隔：pinyin,tones,words,prompts。默认全部。")
    return parser.parse_args()


def main():
    args = parse_args()
    expected = read_json(EXPECTED_PATH)
    copy = read_json(COPY_PATH)
    entries = sorted(item for group in expected.get("recordings", {}).values() for item in group)
    groups = {item.strip() for item in args.groups.split(",") if item.strip()}

    if "tones" in groups:
        # 声调小滑梯改用 scripts/generate-tone-audio.py 的共振峰合成，
        # MeloTTS 对孤立元音渲染不出可辨声调，这里不再处理 tones 分组。
        print("声调音频请改用：python scripts/generate-tone-audio.py --overwrite", file=sys.stderr)
        sys.exit(1)

    if groups:
        known_groups = set(expected.get("recordings", {}).keys())
        unknown_groups = sorted(groups - known_groups)
        if unknown_groups:
            print(f"未知音频分组：{'、'.join(unknown_groups)}", file=sys.stderr)
            print(f"可用分组：{'、'.join(sorted(known_groups))}", file=sys.stderr)
            sys.exit(1)
        entries = [item for item in entries if Path(item).parts[-2] in groups]

    # 声调由专用脚本生成，全量运行时跳过 tones 分组，避免覆盖成无声调音频。
    entries = [item for item in entries if Path(item).parts[-2] != "tones"]

    missing_copy = [base_path for base_path in entries if not copy.get(base_path)]

    if missing_copy:
        print("recording-copy.json 缺少朗读内容：", file=sys.stderr)
        for base_path in missing_copy:
            print(f"- {base_path}", file=sys.stderr)
        sys.exit(1)

    targets = []
    skipped = 0
    for base_path in entries:
        webm_path = output_path_for(base_path, ".webm")
        if not args.overwrite and webm_path.exists() and webm_path.stat().st_size > 0:
            skipped += 1
            continue
        targets.append((base_path, copy[base_path], webm_path))

    for base_path, text, webm_path in targets:
        print(f"{webm_path.relative_to(ROOT)} <- {text}")

    if args.dry_run:
        print(f"MeloTTS 音频预览完成：将生成 {len(targets)} 个，跳过 {skipped} 个。")
        return

    if not targets:
        print(f"MeloTTS 音频处理完成：生成 0 个，跳过 {skipped} 个。")
        return

    ensure_ffmpeg()
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    disable_mps_when_cpu(args.device)
    TTS = load_melotts()
    model = TTS(language=args.language, device=args.device)
    speaker_ids = model.hps.data.spk2id

    if args.speaker not in speaker_ids:
        available = "、".join(sorted(speaker_ids.keys()))
        print(f"说话人不存在：{args.speaker}", file=sys.stderr)
        print(f"可用说话人：{available}", file=sys.stderr)
        sys.exit(1)

    generated = 0
    for base_path, text, webm_path in targets:
        wav_path = wav_path_for(base_path)
        wav_path.parent.mkdir(parents=True, exist_ok=True)
        spec = direct_audio_spec(base_path)
        if spec:
            synthesize_direct_audio(model, speaker_ids[args.speaker], spec, wav_path, args.speed)
        else:
            model.tts_to_file(text, speaker_ids[args.speaker], str(wav_path), speed=args.speed, quiet=True)
        convert_to_webm(wav_path, webm_path, args.bitrate)
        generated += 1

    sync_manifest()
    print(f"MeloTTS 音频处理完成：生成 {generated} 个，跳过 {skipped} 个。")


if __name__ == "__main__":
    main()
