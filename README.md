# 拼音小火车

面向幼儿园中班儿童的拼音启蒙小游戏。当前版本接入年度课程表，覆盖国标全套拼音：23 个声母、单韵母 `a/o/e/i/u/ü`、复韵母、鼻韵母、16 个整体认读音节、声调感知和拼读认读，目标是支撑孩子在一年内学会拼音。配合间隔重复复习，帮助孩子建立并长期保持声音、符号和生活图像之间的对应关系。

## 功能概览

- 首页：只保留今日课程主入口，声调、配图、打地鼠等自由玩法统一进入花园；家长入口长按后需通过个位数加法验证。
- 年度课程：首次访问会记录课程开始日期，之后按本地日期推进。前 30 天保持原课程，之后每周 5 天引入、1 天复习、1 天自由花园；单课默认 8 分钟软上限，到时完成当前题后自然到站。
- 全套国标内容：声母 `b p m f d t n l g k h j q x zh ch sh r z c s y w`，单/复/鼻韵母，整体认读 `zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying`。
- 听音找拼音：每轮 5 到 8 题，播放读音后从 2 到 3 个选项中选择对应拼音。
- 间隔重复复习：每个拼音按 Leitner 盒子调度，按记忆间隔（1/2/4/8/16/32 天）安排复习，答对升盒、答错降盒，抗遗忘。
- 拼读关：选声母和韵母拼出音节；全部内容引入后，部分综合复习题增加四声轨迹第三段。
- 认读关：呈现音节卡片，孩子先自己读再听标准音对照；自评通过只推迟复习，不直接升盒，家长区可做客观抽查。
- 声调滑梯：用四条轨迹感知一声、二声、三声、四声。
- 拼音配图：通过生活图像和拼音卡片做配对练习。
- 游戏花园：包含声调、配图、听词、拼音找图、声韵拼花、分类、打地鼠、认读和场景寻宝；家长开启麦克风后增加喂动物发声玩法。
- 即时反馈：第一次答错重播再试，第二次答错高亮正确项并要求点读确认；同一题连续错选只记录一次错误信号。
- 星星与花园：星星终身累计不清零，每 20 颗获得一次装饰点亮机会；每天完成一轮后花园最多新增一株对应拼音植物。
- 自由练习：点击拼音卡片或声调卡片，反复听录音。
- 家长区：提供本周摘要、易忘项、认读抽查、亲子线下任务，以及声音、麦克风、课程时长和二次确认重置设置。

> 说明：当前 manifest 覆盖拼音、例词、提示音、基础声调和 124 条带调拼读音频，共 335 条；缺音频时仍会静默降级。手绘 SVG 插画当前覆盖 25 个首月条目，缺图清单由脚本按课表顺序维护。

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

当前版本会把学习进度、课程开始日期、每日课程缓存、每日汇总、花园、装饰和家长设置保存在本地。使用 `node server.js` 时写入 `.tmp/progress.json`；使用 GitHub Pages 或直接打开静态页面时写入浏览器 `localStorage`。不需要登录。喂动物玩法只实时读取音量包络，不录制、不缓存、不上传声音。

如需清空记录，在家长区输入当天日期数字完成二次确认。

## 音频资源

应用已去掉浏览器语音合成调用，改为读取 `assets/audio/` 下的录音文件。录音命名、目录和清单说明见 [音频资源说明](assets/audio/README.md)。

音频期望清单（`expected-files.json`）和朗读文本（`recording-copy.json`）由 `app.js` 的 `PINYIN_ITEMS` 派生。增删拼音内容后，先重建这两份配置，再生成录音：

```bash
node scripts/build-audio-expectations.js
```

需要校验配置与内容数据是否一致时运行：

```bash
node scripts/build-audio-expectations.js --check
```

补齐或更新录音后，同步播放清单：

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

如果只需要修正拼音教学音：

```bash
python scripts/generate-melotts-audio.py --overwrite --device cpu --groups pinyin
```

声调小滑梯的四声音频由独立脚本用共振峰合成生成（MeloTTS 对孤立元音渲染不出可辨声调），不走 MeloTTS：

```bash
python scripts/generate-tone-audio.py --overwrite
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
