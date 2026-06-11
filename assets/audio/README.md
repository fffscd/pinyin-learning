# 音频资源说明

应用通过 `HTMLAudioElement` 播放本地录音文件，路径在 `app.js` 中按固定规则生成。请把真人录制的 MP3 文件放到下面目录。

## 目录

```text
assets/audio/
├── pinyin/
├── tones/
├── words/
└── prompts/
```

`manifest.json` 控制哪些录音会被播放。录音补齐后，运行同步脚本生成 `files`：

```bash
node scripts/sync-audio-manifest.js
```

同步后的清单格式如下：

```json
{
  "files": [
    "assets/audio/pinyin/a.mp3",
    "assets/audio/prompts/find.mp3"
  ]
}
```

## 拼音读音

放在 `assets/audio/pinyin/`：

```text
a.mp3
o.mp3
e.mp3
i.mp3
u.mp3
ü.mp3
b.mp3
p.mp3
m.mp3
f.mp3
d.mp3
t.mp3
n.mp3
l.mp3
ba.mp3
pa.mp3
ma.mp3
fa.mp3
bo.mp3
po.mp3
mo.mp3
fo.mp3
de.mp3
te.mp3
ne.mp3
le.mp3
da.mp3
ta.mp3
na.mp3
la.mp3
```

当前拼音音频可从 `davinfifield/mp3-chinese-pinyin-sound` 导入。该仓库使用 Unlicense，适合直接打包使用。

```bash
git clone --depth=1 https://github.com/davinfifield/mp3-chinese-pinyin-sound.git .tmp/mp3-chinese-pinyin-sound
node scripts/import-davinfifield-pinyin-audio.js
```

源仓库没有独立的 `o1.mp3`，导入脚本会用 `wo1.mp3` 生成当前 `o.webm`。

## 声调读音

放在 `assets/audio/tones/`：

```text
a1.mp3
a2.mp3
a3.mp3
a4.mp3
o1.mp3
o2.mp3
o3.mp3
o4.mp3
e1.mp3
e2.mp3
e3.mp3
e4.mp3
```

## 示例词读音

放在 `assets/audio/words/`，文件名和拼音读音保持一致，例如 `a.mp3`、`b.mp3`、`ba.mp3`。

## 提示音

放在 `assets/audio/prompts/`：

```text
find.mp3
picture.mp3
tone.mp3
correct.mp3
retry.mp3
complete.mp3
sound-on.mp3
```

## 真人录音规范

- 使用稳定、清楚的成年女声，同一批次保持同一位录音者。
- 语速比自然对话慢约 20%，音节之间不额外拖长，不加入背景音乐。
- 在安静房间使用同一设备，嘴与麦克风距离保持约 15–20 厘米。
- 原始录音避免削波、风噪、混响和明显底噪；开头结尾不截断音素。
- `scripts/import-recordings.js` 导入时会统一单声道、24kHz，并用 `loudnorm=I=-18:TP=-2:LRA=11` 做响度规整；运行前需安装 ffmpeg。
- 提交前确认文件体积合理，不包含姓名等个人身份信息或其他敏感内容。

真人替换按模仿风险分批：第一批为 23 个声母、24 个韵母和 16 个整体认读标准读音；第二批为拼读及带调拼读音节；例词和提示音可保留合成，待角色音色统一时再集中替换。

## 校验

`expected-files.json` 记录当前应用需要的完整录音清单，`recording-copy.json` 记录每个文件的朗读内容。补齐录音并同步 `manifest.json` 后，在项目根目录运行：

```bash
node scripts/verify-audio-assets.js
```

校验通过后，应用会按 `manifest.json` 播放这些真人录音。

需要查看各分组录音覆盖率时运行：

```bash
node scripts/audio-coverage-report.js
```

需要列出待录内容时运行：

```bash
node scripts/audio-coverage-report.js --missing
```

## MeloTTS 音频生成

如果暂时没有真人录音，推荐先用 MeloTTS 生成一版更自然的中文音频。MeloTTS 支持中文和中英混合，官方说明可用 CPU 实时推理，仓库使用 MIT 许可证。MeloTTS 官方开发和测试环境偏向 Python 3.9，如果本机 Python 版本较新，建议单独建虚拟环境。

安装依赖：

```bash
brew install ffmpeg
uv venv --python python3.11 .tmp/.venv-melotts
source .tmp/.venv-melotts/bin/activate
git clone https://github.com/myshell-ai/MeloTTS.git .tmp/MeloTTS
uv pip install --python .tmp/.venv-melotts/bin/python -e .tmp/MeloTTS
python -m unidic download
```

先预览会生成哪些文件：

```bash
python scripts/generate-melotts-audio.py --dry-run
```

生成并覆盖当前占位音频：

```bash
python scripts/generate-melotts-audio.py --overwrite --device cpu
```

只覆盖拼音和声调教学音：

```bash
python scripts/generate-melotts-audio.py --overwrite --device cpu --groups pinyin,tones
```

脚本会读取 `recording-copy.json`，批量生成 `.webm` 文件，做基础音量规整，并自动同步 `manifest.json`。其中 `pinyin/` 和 `tones/` 会直接使用 MeloTTS 内部音素与声调编号生成，减少拉丁拼音和多音字造成的发音偏差。

## eSpeak NG 兜底音频

如果暂时没有真人录音，可以用开源 eSpeak NG 生成占位音频。macOS 先安装依赖：

```bash
brew install espeak-ng ffmpeg
```

然后运行：

```bash
node scripts/generate-open-tts-audio.js
```

脚本会读取 `recording-copy.json`，生成 `.webm` 文件，并自动同步 `manifest.json`。这些音频适合开发和验收占位，正式给儿童使用前仍建议替换为真人录音。

## 本地录制页面

可以启动本地服务后访问：

```text
http://127.0.0.1:4173/tools/record-audio.html
```

页面会按 `expected-files.json` 展示录音条目和 manifest 可播放状态，并下载带有分组前缀的真人录音，例如 `pinyin-a.webm`、`words-a.webm`。下载后可以批量导入到目标目录：

```bash
node scripts/import-recordings.js ~/Downloads --dry-run
node scripts/import-recordings.js ~/Downloads
```

导入完成后再运行同步和校验命令。

## 离线录音表

可以生成 CSV 给录音人员逐条处理：

```bash
node scripts/generate-recording-checklist.js
```

输出文件为 `assets/audio/recording-checklist.csv`。该文件由 `expected-files.json` 和 `recording-copy.json` 生成，不需要手工维护。

同一命令还会生成 `docs/audio-qa-checklist.md`。QA 表逐条覆盖 `manifest.json`，需要人工勾选声调、音段和可懂度；检查清单是否过期可运行：

```bash
node scripts/generate-recording-checklist.js --check
```
