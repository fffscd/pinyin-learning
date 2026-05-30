# 拼音小火车

面向幼儿园中班儿童的拼音启蒙小游戏。当前版本接入 30 天课程表，覆盖单韵母 `a/o/e/i/u/ü`、基础声母 `b/p/m/f/d/t/n/l`、声调感知和拼音配图，帮助孩子建立声音、符号和生活图像之间的对应关系。

## 功能概览

- 首页：展示按日期生成的今日课程，提供每日课程、游戏花园、自由练习和学习记录入口。
- 30 天课程：首次访问会记录课程开始日期，之后按本地日期推进每日内容。
- 听音找拼音：每轮 5 到 8 题，播放读音后从 2 到 3 个选项中选择对应拼音。
- 基础声母：自由练习和课程中包含 `b/p/m/f/d/t/n/l`。
- 声调滑梯：用四条轨迹感知一声、二声、三声、四声。
- 拼音配图：通过生活图像和拼音卡片做配对练习。
- 游戏花园：包含听词找拼音、拼音找图、声韵拼花和花篮分类 4 种小游戏。
- 即时反馈：答对后进入下一题，答错后温和提示并再次播放读音。
- 自由练习：点击拼音卡片或声调卡片，反复听录音。
- 学习记录：记录已完成轮数、每个拼音的练习次数和答对次数。
- 静音设置：支持开启或关闭语音提示。

## 技术说明

项目使用纯 HTML、CSS 和 JavaScript 实现，无构建步骤，无第三方依赖。

- 页面入口：`index.html`
- 交互逻辑：`app.js`
- 页面样式：`styles.css`
- 音频能力：本地录音文件，通过 `HTMLAudioElement` 播放
- 学习记录：优先写入本地 Node 服务的 `.tmp/progress.json`，静态托管时写入浏览器 `localStorage`

## 本地运行

可以直接在浏览器中打开 `index.html`，学习记录会保存在当前浏览器的 `localStorage` 中。

如需把学习记录同时保存到后端临时 JSON 文件，可在项目目录运行：

```bash
node server.js
```

然后访问：

```text
http://127.0.0.1:4173
```

记录文件会生成在 `.tmp/progress.json`，该目录不会提交到 Git。

## 部署到 GitHub Pages

这个项目没有构建步骤，可以直接用 GitHub Pages 托管仓库根目录。

1. 推送代码到 GitHub：

```bash
git add index.html app.js styles.css assets README.md .nojekyll
git commit -m "Enable GitHub Pages deployment"
git push origin main
```

2. 打开 GitHub 仓库设置：

```text
Settings -> Pages -> Build and deployment
```

3. 选择发布源：

```text
Source: Deploy from a branch
Branch: main
Folder: / root
```

4. 保存后访问 GitHub Pages 给出的地址。当前仓库的默认地址通常是：

```text
https://fffscd.github.io/pinyin-learning/
```

GitHub Pages 只托管静态文件，无法运行 `server.js`。线上版本会把学习记录保存在访问者当前浏览器的 `localStorage` 中。

## 项目结构

```text
.
├── README.md
├── app.js
├── assets
│   └── audio
│       ├── expected-files.json
│       ├── manifest.json
│       └── README.md
├── docs
│   ├── one-month-learning-guide.md
│   └── pinyin-game-requirements.md
├── index.html
├── scripts
├── server.js
├── tools
└── styles.css
```

## 文档

- [需求规划说明书](docs/pinyin-game-requirements.md)
- [一个月学习指南](docs/one-month-learning-guide.md)

## 数据与隐私

当前版本会把学习进度、课程开始日期、每日课程缓存、每日汇总记录和静音设置保存在本地。使用 `node server.js` 时写入 `.tmp/progress.json`；使用 GitHub Pages 或直接打开静态页面时写入浏览器 `localStorage`。不需要登录，不上传学习数据。

如需清空记录，可在应用的“学习记录”页面点击“清空记录”。

## 音频资源

应用已去掉浏览器语音合成调用，改为读取 `assets/audio/` 下的录音文件。录音命名、目录和清单说明见 [音频资源说明](assets/audio/README.md)。

二进制录音文件未随当前代码提交。补齐真人录音后，先同步播放清单：

```bash
node scripts/sync-audio-manifest.js
```

可以运行下面命令检查录音文件和清单是否完整：

```bash
node scripts/verify-audio-assets.js
```

日常快速检查可使用摘要输出：

```bash
node scripts/verify-audio-assets.js --summary
```

需要查看各分组录音覆盖率时运行：

```bash
node scripts/audio-coverage-report.js
```

没有真人录音时，优先用 MeloTTS 生成更自然的中文音频：

```bash
brew install ffmpeg
uv venv --python python3.11 .tmp/.venv-melotts
source .tmp/.venv-melotts/bin/activate
git clone https://github.com/myshell-ai/MeloTTS.git .tmp/MeloTTS
uv pip install --python .tmp/.venv-melotts/bin/python -e .tmp/MeloTTS
python -m unidic download
python scripts/generate-melotts-audio.py --overwrite --device cpu
```

如果只需要修正拼音和声调教学音：

```bash
python scripts/generate-melotts-audio.py --overwrite --device cpu --groups pinyin,tones
```

也可以用 eSpeak NG 生成开发兜底音频：

```bash
brew install espeak-ng ffmpeg
node scripts/generate-open-tts-audio.js
```

需要在浏览器中逐条录音时，先启动本地服务，再访问 `http://127.0.0.1:4173/tools/record-audio.html`。

录音页面下载的文件可先放在同一个目录，再批量导入：

```bash
node scripts/import-recordings.js ~/Downloads --dry-run
node scripts/import-recordings.js ~/Downloads
```

完整验收当前目标时运行：

```bash
node scripts/verify-goal.js
```

需要导出离线录音表时运行：

```bash
node scripts/generate-recording-checklist.js
```
