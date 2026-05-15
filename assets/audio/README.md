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

`manifest.json` 控制哪些录音会被播放。当前清单为空，页面不会请求不存在的 MP3 文件。录音补齐后，运行同步脚本生成 `files`：

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

建议同一批录音使用相同音量、相同采样率和干净的单人声线。提交前确认文件体积合理，不包含个人身份信息或其他敏感内容。

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

## 开源 TTS 占位音频

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
