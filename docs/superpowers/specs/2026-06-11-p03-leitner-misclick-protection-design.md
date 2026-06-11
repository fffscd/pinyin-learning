# Leitner 当日失败保护 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

`updateLetterSchedule(id, isCorrect)` 当前答错即降盒（box-1、dueDay=明天、streak=0）。同时 `answer()` 在答错后允许无限重试，且每次错选都会调用 `recordQuestionResult` → 一题内连错多次会连续降盒。

推测依据：4–5 岁儿童误触率高（手指精度不足、偶发随机点选），单次错误的信号噪声大；直接降盒会让复习队列被误触污染，复习日塞满并非真正遗忘的内容。通行结论，未逐条核验文献。

## 目标

同一拼音同一天内：第一次答错只重播读音、不降盒；当天第二次答错才降盒。一题内的连续错选最多只计一次错误。

## 设计

### 数据

- `progress.letters[id]` 增加 `lastFailDay`（开课绝对天数，整数或 null）。
- `normalizeProgress` 给旧数据补 `lastFailDay: null`。

### 调度规则（改 `updateLetterSchedule`）

答错分支改为两段：

1. `record.lastFailDay !== today`（当天首错）：记 `lastFailDay = today`；box 不变；`dueDay = today`（保持到期，今天还会再被抽到）；`streak = 0`。
2. `record.lastFailDay === today`（当天再错）：按现行规则降盒（box-1、dueDay=明天）。

答对分支照常升盒，并清 `lastFailDay = null`。

### 一题内去重（改 `answer()` / `recordQuestionResult`）

- `state` 增加非持久化的 `wrongAnsweredIds`（本题已计错的 question 标识），同一题第二次及以后的错选不再调用 `updateLetterSchedule` 与 `recordDailyQuestionResult` 的错误计数（界面反馈与重播照常）。
- `nextQuestion()`/`resetAnswerState()` 推进到新题时清空。
- 与 p10（二错点读确认）协同：p10 限定一题最多错两次后点读过关，本设计保证这两次错合计只产生一次 Leitner 信号。

## 取舍说明

- 「dueDay = today」让首错项当天仍可能再被 `getDueReviewIds` 抽中，相当于当天内的快速重测：再答对则按答对升盒，证明首错是误触；再答错则降盒，证明确实没掌握。这是该设计的核心判别机制。

## 不做的事（YAGNI）

- 不做按题型区分的错误权重。
- 不引入误触检测（按压时长、连点间隔分析）。
- 不改 `answerRead` 自评路径（由 p05 单独处理）。

## 影响的文件

- `app.js`：`updateLetterSchedule`、`normalizeProgress`、`answer`、`recordQuestionResult`、`resetAnswerState`。
- `scripts/verify-goal.js`：补当日首错/再错的盒子断言。

## 验证方式

- headless：构造记录后依次调用——当天首错 box 不变且 `dueDay === today`；当天第二错 box-1；次日首错重新享受保护；一题内连错三次只计一次错误（`attempts` 错误计数 +1）。
- 旧存档（无 `lastFailDay`）经 `normalizeProgress` 后正常运转。
