# 课表周节律 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

当前课表按开课绝对天数线性推进：`getCourseDayIndex` → `getDailyPlan(dayIndex)`，`COURSE_PLAN` 用完后由 `makeReviewDayPlan` 合成综合复习日。每天都可能引入新内容，孩子对「今天学什么」没有周期性预期。

推测依据：幼儿对固定仪式与可预期结构的依赖高于成人，可预期的节奏能降低抵触情绪。通行结论，未逐条核验文献。

## 目标

引入七天周期：每周第 6 天固定为纯复习日，第 7 天为自由游戏日（只开花园、不引新内容），其余 5 天照常推进引入日。

## 约束

- 前 30 天（`COURSE_PLAN_30_DAYS`）保持原样，节律从第 31 天起生效，保护已验证的首月体验。
- 向后兼容：已在课程中途的老用户，课表位置不能突变。
- 总课表会因此拉长（每 7 天只消耗 5 个引入日），属预期内变化，年度目标仍可覆盖。

## 设计

### 天数到课表步的映射

- 新增 `getCourseStep(dayIndex)`：
  - `dayIndex <= 30`：返回 `dayIndex`（原样）。
  - `dayIndex > 30`：令 `offset = dayIndex - 30`，每满 7 天只计 5 步：`step = 30 + floor(offset / 7) * 5 + min(offset % 7, 5)`。
  - `offset % 7 === 6` → 周复习日；`offset % 7 === 0`（第 7 天）→ 自由游戏日。
- `getDailyPlan` 改为：周复习日返回 `makeReviewDayPlan`（已有）；自由游戏日返回新的 `makeFreePlayPlan(dayIndex)`：`{ title: "花园日", newItems: [], freePlay: true }`；其余日按 `COURSE_PLAN[getCourseStep(dayIndex) - 1]` 取。
- `getUnlockedPinyinIds`、`getUnlockedBlendIds`、`getUnlockedReadIds` 改用 `getCourseStep` 累积，保证解锁进度与引入日一致。

### 老用户兼容

- `normalizeProgress` 增加 `rhythmFromDay` 字段：老存档升级时记为 `当前 dayIndex + 1`，节律从次日生效；映射函数在 `dayIndex < rhythmFromDay` 时按旧线性规则计算，避免课表回跳或跳跃。新用户记 31。

### 自由游戏日表现

- `homeView`：当日 plan 带 `freePlay` 时，今日课程卡替换为放大的花园入口（图标态，不新增可见中文长句）；点今日课程直接进 `gardenView`。
- 复习引擎照常运转：花园各玩法已通过 `recordQuestionResult` 回写 Leitner 盒子，自由玩也在巩固。

## 不做的事（YAGNI）

- 不做家长自定义周起点或节律开关。
- 不动前 30 天课表。
- 不在自由游戏日发额外奖励（避免把「不上课」塑造成更高价值事件）。

## 影响的文件

- `app.js`：新增 `getCourseStep`、`makeFreePlayPlan`；改 `getDailyPlan`、`getUnlockedPinyinIds`、`getUnlockedBlendIds`、`getUnlockedReadIds`、`normalizeProgress`、`homeView`。
- `scripts/verify-goal.js`：补映射函数的边界断言。
- `README.md`：年度课程描述更新。

## 验证方式

- headless：断言 `getCourseStep` 关键点位（30/31/36/37/38 天）映射正确；老存档带 `rhythmFromDay` 后课表无回跳；全部引入完成的总天数仍在一年内（打印实际天数核对）。
- 浏览器人工走查：把开课日期改到对应天数，分别验证引入日、周复习日、花园日的首页与课程表现。
