# 答错流程统一（二错点读确认） 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

现状核实：`answer()` 答错后温和提示、重播读音、`resetAnswerState()` 保留题面让孩子再选——方向正确，但可无限重试，从不出示正确答案。三个及以上选项时，连续乱点也终会蒙对，蒙对与真会在数据上无法区分，孩子也可能陷入挫败循环。

推测依据：幼儿从自己修正的错误中留存更深，但连续失败超过两次后挫败感压倒学习动机；「被动看答案」几乎不形成记忆，而「看提示后自己点读确认」保留了主动动作。通行结论，未逐条核验文献。

## 目标

全部选择类玩法统一为：第一次答错 → 重播读音再试（现状）；第二次答错 → 高亮正确项，孩子必须点一下正确项（点读确认）才进入下一题。点读确认该题记为答错。

## 设计

### 状态

- `state.wrongCount`：本题错选次数，非持久化；`resetAnswerState()` 时与 p03 的 `wrongAnsweredIds` 一并清理。
- `state.revealing`：布尔，进入点读确认阶段的标志。

### 流程（改 `answer()`）

1. 第一次错选：现状不变（`getRetryFeedback`、重播、重试），`wrongCount = 1`。
2. 第二次错选：`wrongCount = 2`、`revealing = true`；正确选项加高亮类（呼吸光圈 + 轻微放大），其余选项 `pointer-events` 关闭；播一遍目标读音。
3. 点读确认：孩子点高亮项 → 播目标读音 + 温和肯定音（沿用 `correct` 音即可），进入 `nextQuestion()`；不记星（星只给独立答对），Leitner 按一次答错计（p03 已保证整题只计一次错误信号）。
4. 适用题型：`listen`/`picture`/`word`/`pinyin-picture`/`category`/`mole-choice`/`tone` 等走 `answer()` 的选择题，以及拼花 `selectBuildPart` 的段内选择（段内二错高亮正确段）。`syllable-read` 自评不适用。

### 视觉

- 高亮样式与「答对」绿色区分开（用目标色光圈 + 手指指示图标），传达「来点这里」而非「你错了」。
- `prefers-reduced-motion` 下光圈呼吸改为静态描边。

## 与 p03 的协同

p03 保证一题内多次错选只产生一次 Leitner 错误信号；本设计把"多次"封顶为两次。两者合并后：每题至多两次错选 + 一次点读确认，Leitner 收到至多一次错误。

## 不做的事（YAGNI）

- 不做三次以上容错档位配置。
- 不在点读确认后追加同题重测（当天 Leitner 调度自然会再抽到，见 p03 的 dueDay=today 机制）。
- 不显示任何「错 X 次」的计数给孩子。

## 影响的文件

- `app.js`：`answer`、`selectBuildPart`、`resetAnswerState`、`choiceClass`/`moleClass`/`buildChoiceClass`（revealing 状态类）、`handleClick`（revealing 阶段只放行正确项）。
- `styles.css`：高亮光圈、手指指示、reduced-motion 兜底。
- `scripts/verify-goal.js`：补二错高亮、点读确认计错不计星的断言。

## 验证方式

- headless：连错两次后 `revealing === true` 且仅正确项可点；点读确认后进入下一题、`roundStars` 未增加、Leitner 仅一次错误信号。
- 人工：各题型（含打地鼠、拼花）走二错路径；高亮在窄屏可辨；目标年龄孩子能理解「点发光的那个」。
