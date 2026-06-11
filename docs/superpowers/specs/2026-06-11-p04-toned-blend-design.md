# 拼读关声调第三段 设计

日期：2026-06-11
状态：方向已确认，细节待评审；依赖带调音频补齐后实施

## 背景

现有拼读关（`makeSyllableBuildQuestion` + `selectBuildPart`）做声母、韵母两段拼读；声调感知独立在声调滑梯（`TONE_ITEMS`，共振峰合成四声）。2026-06-04 设计稿明确引入期不做逐音节四声，该取舍在引入期合理。

国标拼音的最终能力是带调拼读（b-ā→bā）。两段拼读到带调拼读之间目前没有桥。

## 目标

在全部声韵母引入完成后的综合复习期，为拼读关增加第三段：选完声母、韵母后再选声调，合读带调音节。

## 约束

- 仅在 `dayIndex > COURSE_PLAN.length`（进入综合复习期）开放，引入期保持两段。
- 依赖音频：`BLEND_SYLLABLE_IDS`（31 个音节）× 4 声 ≈ 124 条带调读音，用 `scripts/generate-melotts-audio.py` 流程合成；三声、整体认读类合成易出偏差，须过 p20 的人工核验清单后才上线。
- 缺某条带调音频时该音节退回两段拼读，静默降级。

## 设计

### 数据

- 音频命名沿用现有 manifest 体系，建议 `syllable-tone/{id}{1-4}.mp3`（如 `ba1.mp3`），`scripts/sync-audio-manifest.js` 照常收录。
- 题目对象扩展：`makeSyllableBuildQuestion` 增加 `withTone` 标志与 `targetTone`（1–4，rng 抽取）；仅当该音节四声音频齐备时才出带调题。

### 交互

1. 前两段照常：选声母 → 播声母音；选韵母 → 播韵母音。
2. 第三段：出现 4 个声调轨迹按钮（复用 `tonePath`/`toneArt` 的视觉），先播目标带调读音，孩子听音选轨迹。
3. 选对后合读动画：声母卡 + 韵母卡合并、戴上声调帽，播带调音节音。`selectBuildPart` 增加 `part === "tone"` 分支。
4. 答错走统一重试流程（p10），声调段错误回写声调感知统计，不动该音节的 Leitner 盒子（声调与音段分开计）。

### 课表接入

- `makeReviewDayPlan` 在综合复习期把 `blend: true` 的题目按比例（建议 1/3）出成带调题。
- 声调滑梯保留，作为声调的自由练习入口。

## 不做的事（YAGNI）

- 不给全部音节配四声（只覆盖 `BLEND_SYLLABLE_IDS`）。
- 不做轻声、变调（一年目标内不需要）。
- 不做孩子跟读评分。

## 影响的文件

- `app.js`：`makeSyllableBuildQuestion`、`selectBuildPart`、`buildSlotText`、`renderBuildChoice`、`questionStage`、`makeReviewDayPlan`/`buildCourse`。
- `styles.css`：第三段槽位、声调帽合读动画。
- `scripts/generate-melotts-audio.py`、`sync-audio-manifest.js`：批量生成与收录带调音频。
- `assets/audio/`：新增约 124 条音频。

## 验证方式

- headless：综合复习期 `withTone` 题目结构正确；缺音频音节自动退回两段题；引入期不出带调题。
- 人工：四声各抽样听辨（重点三声）；合读动画在桌面与窄屏正常；reduced-motion 下直接显示结果。
