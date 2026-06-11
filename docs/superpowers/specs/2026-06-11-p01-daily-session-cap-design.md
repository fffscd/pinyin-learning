# 单日学习量上限与到站收尾 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

当前每日课程由 `buildCourse()` 生成 5–8 题（`DEFAULT_ROUND_SIZE` 与 `plan.questionCount`），孩子答错会循环重试，单轮时长无上限。家长也可能让孩子连续多轮练习。

推测依据：4–5 岁儿童单任务持续注意力一般在 5–15 分钟量级，超时练习会把负面情绪绑定到拼音活动本身。该结论来自发展心理学通行说法，未逐条核验文献。

## 目标

给课程会话加一个软时长上限。到时不打断当前题，由「到站」动画自然收尾进入结算，避免家长强行关停造成的负面体验。

## 约束

- 仅对 `startRound("lesson")` 的课程模式生效；花园小游戏与自由练习不限时（孩子主动选择的玩耍不设墙）。
- 软上限：到时后等当前题答完才收尾，不在题中打断。
- 儿童端不显示倒计时（时间压力会诱发乱点）；收尾用图像与音频表达。

## 设计

### 数据

- 新增常量 `LESSON_SOFT_CAP_MS = 8 * 60 * 1000`（8 分钟，后续可在家长区调成 5/8/10 分钟，初版固定值）。
- `state.roundStartedAt`：`startRound()` 内记录 `Date.now()`，非持久化。
- `createDailyStat()` 可顺带记录 `durationMs`（结算时回写），供家长周报（p17）使用。

### 触发点

- 在 `nextQuestion()` 入口处判断：`state.mode === "lesson"` 且 `Date.now() - state.roundStartedAt >= LESSON_SOFT_CAP_MS` 时，直接走轮末分支（视为完成本课，`completeDailyCourse` 照常调用），不再推进 `currentIndex`。
- 已答题数过半即算当日课程完成；不足一半时同样收尾，但 `courses[date].completed` 保持 false，明天课表照常推进（孩子状态不好的一天不强求）。

### 表现

- 结算页（`resultView`）增加「到站」变体：小火车进站动画 + 既有落星流程。提示音复用 `AUDIO_PROMPTS.complete`；可选新增一条「到站」短音效，缺音频静默降级。
- 不向孩子展示「没做完」的负面信息；到站与正常完成在儿童端观感一致。

## 不做的事（YAGNI）

- 不做倒计时 UI、不做剩余时间提示音。
- 不限制花园与自由练习时长。
- 不做家长可配置时长（留到 p15 家长区迭代）。

## 影响的文件

- `app.js`：`startRound`、`nextQuestion`、`resultView`、`createDailyStat`。
- `styles.css`：到站动画（含 reduced-motion 兜底）。
- `scripts/verify-goal.js` 或新增断言：模拟超时后 `nextQuestion` 进入结算。
- `README.md`：功能概览补一句。

## 验证方式

- headless：把 `LESSON_SOFT_CAP_MS` 临时调小，模拟答题超时后调用 `nextQuestion`，断言 `state.view === "result"`、课程完成标记符合「过半算完成」规则。
- 浏览器人工走查：正常完成与到站收尾两条路径的结算页观感一致；窄屏正常。
