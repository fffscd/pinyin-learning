# 触控规格审计 设计

日期：2026-06-11
状态：方向已确认，细节待评审

## 背景

界面元素的可点尺寸、间距、手势依赖未做过针对幼儿的系统审计。成人无障碍标准（44×44 pt）对 4–5 岁手指精度不够用。

推测依据：幼儿点击散布半径明显大于成人，目标过小或过密会推高误触率，进而污染答题数据（与 p03 的保护机制互补：先从源头减少误触）。通行结论，未逐条核验文献。

## 目标

确立并落实儿童端触控规格，全 UI 过一遍审计清单，修正不达标项，并加入自动化守护防止回退。

## 规格（儿童端视图适用；家长区按成人标准）

1. 可点目标最小 64×64 px（CSS 像素），关键答题选项建议 ≥ 88 px。
2. 相邻可点目标间距 ≥ 16 px。
3. 全部交互单击完成；儿童端不依赖双击、长按、拖拽（长按保留给 `parentCorner` 家长入口，700ms 现状不变）。
4. 全局 `touch-action: manipulation` 消除双击缩放延迟与误缩放。
5. 答题反馈期间（`state.answered`）选项区关闭 `pointer-events`，防连点穿透到下一题（现状是否已防需在审计中核实）。
6. 可见焦点样式保留（`:focus-visible` 现有写法不动）。

## 审计范围清单

- `renderChoice` 选项卡、`renderMoleChoice` 地鼠、`renderBuildChoice` 拼花段选、`categoryCard` 花篮、声调轨迹按钮（`toneArt` 区域）。
- `topbar` 返回与静音按钮、`sound-disc` 重播按钮。
- `homeView` 课程大卡、`gardenEntry`、`starBox`、`gardenGameCards`。
- 浮层类：星星盒放大浮层（`starBoxOverlay`）关闭按钮。
- 后续新增视图（p08 热区、p09 植物、p16 点亮项）按本规格执行。

## 设计

### CSS 基建

- `:root` 增加 `--tap-min: 64px`、`--tap-gap: 16px`，达标项逐步改用变量，规格变更一处生效。
- 不达标项的修法优先「扩大可点区不放大视觉」：透明 padding 或伪元素外扩，保持现有布局密度。

### 自动化守护

- `scripts/verify-child-shell.js` 增加尺寸断言：headless 渲染各儿童端视图，对带 `data-answer`/`data-action` 的元素测 `getBoundingClientRect`，宽高 < 64 即失败；以 375px 窄屏视口为准（最严苛场景）。
- 间距断言成本高，首版只查尺寸，间距靠人工审计表。

### 交付物

- 审计表：`docs/touch-audit-2026-06.md`，逐元素记录实测尺寸、是否达标、修正方式，作为一次性快照存档。

## 不做的事（YAGNI）

- 不引入第三方测试框架。
- 不做按设备 DPI 的动态规格。
- 不改家长区控件尺寸（成人标准即可）。

## 影响的文件

- `styles.css`：变量、各不达标项修正、`touch-action`。
- `app.js`：个别元素结构微调（外扩伪元素需要的容器）。
- `scripts/verify-child-shell.js`：尺寸断言。
- 新增 `docs/touch-audit-2026-06.md`。

## 验证方式

- headless：尺寸断言全部通过（375px 视口）。
- 人工：真机（手机 + iPad）逐视图试点边缘、相邻目标缝隙；幼儿实测一轮观察误触位置。
