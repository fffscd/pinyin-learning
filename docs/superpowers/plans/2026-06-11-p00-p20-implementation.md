# P00-P20 Roadmap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成 `2026-06-11-p00` 到 `p20` 定义的学习调度、儿童端体验、家长区、新玩法、插画与音频质检能力。

**Architecture:** 保持纯 HTML/CSS/JavaScript 和无第三方依赖结构。行为继续集中在 `app.js`，用 `scripts/verify-roadmap.js` 覆盖纯函数、状态迁移和 HTML 结构；素材管线各自保留独立 Node 脚本。所有新增持久化字段统一由 `normalizeProgress()` 迁移。

**Tech Stack:** 浏览器原生 JavaScript、HTML、CSS、Node.js `vm`/`fs` 验证脚本、本地 Web Audio API。

---

### Task 1: 学习会话、周节律与错误调度

**Files:**
- Modify: `app.js`
- Create: `scripts/verify-roadmap.js`
- Modify: `README.md`

- [ ] 为 8 分钟软上限、30 天后周节律、当日首错保护、自评降权、二错点读确认编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js learning`，确认断言因缺少对应行为失败。
- [ ] 在 `app.js` 增加 `LESSON_SOFT_CAP_MS`、`getCourseStep()`、`makeFreePlayPlan()`、进度迁移字段和答题状态字段。
- [ ] 调整 `updateLetterSchedule()`、`recordQuestionResult()`、`answer()`、`answerRead()`、`nextQuestion()`，让失败断言通过。
- [ ] 运行 `node scripts/verify-roadmap.js learning` 与 `node scripts/verify-goal.js`。

### Task 2: 首页、引导角色、触控与结算

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `scripts/verify-child-shell.js`
- Modify: `scripts/verify-roadmap.js`
- Create: `docs/touch-audit-2026-06.md`

- [ ] 为首页唯一课程入口、花园入口数量、角色四状态、64px 触控变量和三段结算编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js shell`，确认失败原因对应缺失功能。
- [ ] 调整首页与花园入口，参数化 `trainArt(expression)`，实现 `resultPhase` 和跳过逻辑。
- [ ] 在 `styles.css` 落实 `--tap-min`、`--tap-gap`、引导角色和 reduced-motion 样式。
- [ ] 更新儿童壳层验证并记录触控审计结果。
- [ ] 运行 `node scripts/verify-roadmap.js shell` 与 `node scripts/verify-child-shell.js`。

### Task 3: 家长区、抽查、周报与线下任务

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `scripts/verify-roadmap.js`

- [ ] 为算术门禁、设置迁移、抽查回写、周报汇总和每日最多两张任务卡编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js parent`，确认失败。
- [ ] 增加 `parent-gate` 视图、`parent-theme`、设置和重置确认状态。
- [ ] 实现 `buildWeeklyReport()`、`buildOfflineTasks()`、抽查状态机及 daily stat 回写。
- [ ] 运行 `node scripts/verify-roadmap.js parent`。

### Task 4: 星星点亮与花园成长

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `scripts/verify-roadmap.js`

- [ ] 为旧存档迁移、点亮机会、星数不扣减、每日只种一株和植物回放编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js rewards`，确认失败。
- [ ] 增加 `UNLOCK_CATALOG`、车色应用、装饰架、花田和植物浮层。
- [ ] 在轮次完成时种植，并保证 366 条上限和日期去重。
- [ ] 运行 `node scripts/verify-roadmap.js rewards`。

### Task 5: 打地鼠、寻宝与喂动物

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `scripts/verify-roadmap.js`
- Modify: `AGENTS.md`

- [ ] 为打地鼠推荐档、连错降档、寻宝完整题序、麦克风入口门控和发声题结构编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js games`，确认失败。
- [ ] 实现节奏开关、场景寻宝数据与热区、发声检测模块及静默降级。
- [ ] 保证发声练习只计练习次数和星星，不更新 Leitner 盒子。
- [ ] 运行 `node scripts/verify-roadmap.js games`。

### Task 6: 带调拼读第三段

**Files:**
- Modify: `app.js`
- Modify: `styles.css`
- Modify: `scripts/build-audio-expectations.js`
- Modify: `scripts/generate-melotts-audio.py`
- Modify: `scripts/verify-roadmap.js`
- Modify: `assets/audio/expected-files.json`
- Modify: `assets/audio/recording-copy.json`
- Modify: `assets/audio/manifest.json`
- Create: `assets/audio/syllable-tone/*.webm`

- [ ] 为引入期两段、综合复习期三段、缺音频回退和声调段统计编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js toned-blend`，确认失败。
- [ ] 扩展音频期望清单与生成脚本，生成 31 个音节四声资源并同步 manifest。
- [ ] 扩展拼花题结构、第三槽位、声调轨迹选择和合读反馈。
- [ ] 运行 `node scripts/verify-roadmap.js toned-blend` 与 `node scripts/verify-audio-assets.js`。

### Task 7: 插画生产管线与题池降权

**Files:**
- Modify: `app.js`
- Create: `scripts/report-missing-illustrations.js`
- Create: `docs/illustration-style-guide.md`
- Create: `docs/illustration-backlog.md`
- Modify: `scripts/verify-roadmap.js`

- [ ] 为插画覆盖列表、缺图排序和配图题优先手绘插画编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js illustrations`，确认失败。
- [ ] 增加 `ILLUSTRATION_IDS`/`hasIllustration()` 并调整配图目标选择。
- [ ] 实现 backlog 生成脚本和风格规范，生成当前清单。
- [ ] 运行 `node scripts/report-missing-illustrations.js --check` 与 `node scripts/verify-roadmap.js illustrations`。

### Task 8: 音频质检清单与录音规范

**Files:**
- Modify: `scripts/generate-recording-checklist.js`
- Modify: `assets/audio/README.md`
- Create: `docs/audio-qa-checklist.md`
- Modify: `scripts/verify-roadmap.js`

- [ ] 为 QA 清单覆盖 manifest、四项分组和课表优先级编写失败断言。
- [ ] 运行 `node scripts/verify-roadmap.js audio-qa`，确认失败。
- [ ] 扩展清单生成器并写入统一真人录音规范和分批替换建议。
- [ ] 生成 `docs/audio-qa-checklist.md`。
- [ ] 运行 `node scripts/generate-recording-checklist.js --check`、`node scripts/verify-roadmap.js audio-qa` 和 `node scripts/audio-coverage-report.js`。

### Task 9: 全量回归与浏览器验收

**Files:**
- Modify: `README.md`
- Modify: `scripts/verify-goal.js`

- [ ] 更新功能说明、运行方式、家长区和隐私说明。
- [ ] 运行 `node scripts/verify-roadmap.js all`。
- [ ] 运行 `node scripts/verify-goal.js`、`node scripts/verify-child-shell.js`、`node scripts/verify-audio-assets.js`。
- [ ] 启动 `node server.js`，在 375px 与桌面视口检查首页、课程、花园、家长区、结算和新增玩法。
- [ ] 对照 p00-p20 逐项复核证据，未满足条目继续修正。
