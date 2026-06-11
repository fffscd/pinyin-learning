# 认读自评降权与家长抽查 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

认读关（`syllable-read`）由孩子自评「我会读了 / 再练练」，`answerRead(known)` 把自评结果原样传给 `recordQuestionResult` → `updateLetterSchedule`，与客观答题同权重升盒。box≥5 计「已掌握」。

推测依据：4–5 岁儿童元认知能力尚未成熟，自我评估普遍偏高；自评直通升盒会让「已掌握」统计虚高，复习引擎提前撤掉支撑。通行结论，未逐条核验文献。

## 目标

1. 自评通过对 Leitner 的影响降权：推迟复习但不升盒。
2. 家长区增加「抽查」：对自评进入高盒的项做客观核验，核验结果有完整权重。

## 设计

### 自评降权（改 `updateLetterSchedule` 或在 `recordQuestionResult` 分流）

- `recordQuestionResult` 对 `question.type === "syllable-read"` 传入 `source: "self"` 标记。
- 自评通过（known=true）：`dueDay = today + SR_INTERVALS[box]`（按当前盒间隔推迟），box 不变，streak 不变；`attempts`/`correct` 照常累计。
- 自评再练练（known=false）：沿用答错规则（含 p03 的当日保护）。
- 客观题型（听音、配图、拼花等）不受影响，仍可正常升盒——同一拼音的「已掌握」最终由客观答题决定。

### 家长抽查（`recordsView` 新增区块）

- 数据来源：`masteryBreakdown()` 中 box≥4 且近期主要靠自评推进的项（实现上可简化为：box≥4 且属于 `WHOLE_IDS`/`BLEND_SYLLABLE_IDS` 的认读项），每次抽 3 个。
- 交互：家长点「开始抽查」→ 逐项显示音节大卡（不放音频，由孩子当面读给家长听）→ 家长点「读对了 / 没读出来」→ 下一项。
- 回写：读对了 → 按客观答对处理（升盒）；没读出来 → box 降到 2、`dueDay = 明天`、streak=0（明确的强信号，越过当日保护）。
- 抽查记录写入当日 `dailyStat`，周报（p17）可引用。

### 家长侧文案

抽查界面在家长区内，不受儿童端无文字约束限制，可用完整中文说明。

## 不做的事（YAGNI）

- 不做语音识别自动判卷（见 p07 的分阶段结论）。
- 不为自评单独建第二套盒子。
- 不在儿童端暴露「自评不算数」的任何信号（保护自评的仪式感与诚实性）。

## 影响的文件

- `app.js`：`recordQuestionResult`、`updateLetterSchedule`（source 分支）、`answerRead`、`recordsView`（抽查区块与状态机）、`masteryBreakdown`。
- `styles.css`：抽查卡片与按钮（成人风格，配合 p15）。
- `scripts/verify-goal.js`：补自评不升盒、抽查回写的断言。

## 验证方式

- headless：自评通过后 box 不变、dueDay 推迟一个间隔；抽查「读对了」升盒、「没读出来」降到 box=2；客观题型行为不变；旧存档兼容。
- 人工：家长区抽查全流程（3 项、跳出、回看记录页统计变化）。
