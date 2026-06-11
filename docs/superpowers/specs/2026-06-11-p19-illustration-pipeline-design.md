# 插画补齐排期与风格锁定 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

手绘 SVG 插画（`illustration()` 内联体系）仅覆盖首月条目，新增内容用 emoji 兜底（README 已注明）。emoji 的问题：不同平台渲染差异大、语义常含混（如 ü 的鱼和 yu 的鱼无法区分场景），直接影响「拼音配图」「听词找拼音」等玩法的题目效度——孩子可能因看不懂图而答错，污染 Leitner 数据。

## 目标

1. 自动导出缺图清单，按课表引入顺序排定补图优先级。
2. 先锁定风格规范再批量生产，避免风格漂移。

## 设计

### 缺图清单（新增 `scripts/report-missing-illustrations.js`）

- 遍历 `PINYIN_ITEMS` 中 `pictureable` 条目，对照 `illustration()` 已实现的 id 集合（实现方式：`illustration()` 导出已覆盖 id 列表，或脚本静态扫描其 switch/map 键），输出缺图条目表：id、label、word、emoji 兜底、课表首次引入的 dayIndex（扫描 `COURSE_PLAN` 取首现位置）。
- 输出按 dayIndex 升序——孩子先学到的先补。结果写 `docs/illustration-backlog.md`，每批补图后重跑刷新。

### 风格规范（写入 `docs/illustration-style-guide.md`）

锁定以下维度，对照首月已有插画提炼成文：

1. 画布：统一 viewBox（与现有插画一致，实施时核实具体值）。
2. 线条:有无描边、描边宽度统一值。
3. 配色：只用 `PINYIN_ITEMS` 既有 color 字段色板 + 中性色若干，列出允许色值清单。
4. 构图：单主体居中、主体占画布比例区间、不带背景框（背景由卡片容器负责）。
5. 语义要求：图必须指向 `word` 例词的具体名词（画「乌鸦」而非抽象的 wū 概念）；多义词选幼儿最熟悉的义项。
6. 技术约束：纯 SVG path/基本图形，无滤镜、无外链、无位图嵌入；单条目节点数上限（控制 `app.js` 体积，建议每幅 ≤ 30 个节点，实施时按现有插画均值定）。

### 生产与验收流程

1. 按 backlog 顺序，每批 10–15 幅。
2. 每批完成后：`.tmp/illus-preview.html`（已有预览页）人工过一遍风格一致性；与同批 emoji 兜底对比确认语义更清晰。
3. 验收口径：3 名以上不同成人看图说词，能说出目标例词（或近义）的图才通过——图的效度先于美观（家庭项目可降为家长自测，原则保留）。
4. 合入后跑 `verify-child-shell.js` 与体积检查（`app.js` 增量）。

### 过渡策略

- 未补图期间，emoji 兜底条目在「拼音配图」类题型的出题池中降权（`isPictureable` 细分一个 `hasIllustration`，配图题优先抽有插画的条目），从源头减少低效度题目。

## 不做的事（YAGNI）

- 不引入位图/外部图片资源。
- 不做插画懒加载拆分（先观察 app.js 体积，超过明显阈值再议）。
- 不做多风格主题切换。

## 影响的文件

- 新增 `scripts/report-missing-illustrations.js`、`docs/illustration-backlog.md`、`docs/illustration-style-guide.md`。
- `app.js`：`illustration()` 持续扩充、`hasIllustration` 出题降权。
- `.tmp/illus-preview.html` 沿用。

## 验证方式

- 脚本输出与 `illustration()` 实际覆盖一致（抽查 5 个 id）。
- 配图题型 headless 断言：出题池优先有插画条目。
- 每批插画的预览页人工核验记录留在 backlog 文档中。
