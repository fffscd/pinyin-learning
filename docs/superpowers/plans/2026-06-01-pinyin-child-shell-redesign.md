# 拼音学习 · 语音优先外壳重构 Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把面向幼儿园中班儿童的拼音 App 外壳重构为「不识字的 5 岁儿童可独立游玩」的语音优先体验，保留题库与课程逻辑。

**Architecture:** 纯 HTML/CSS/JS，无构建步骤，无第三方依赖。全部交互逻辑在单文件 `app.js`，样式在 `styles.css`，入口 `index.html`。验证通过 Node + `vm` 加载 `app.js` 并对渲染输出和状态做断言（沿用 `scripts/verify-goal.js` 模式）；视觉与音频效果用浏览器手动验证。

**Tech Stack:** 原生 ES、内联 SVG、`HTMLAudioElement`、Node 脚本（`vm` 沙箱）做无头断言。

**Spec:** `docs/superpowers/specs/2026-06-01-pinyin-child-shell-redesign-design.md`

---

## 文件结构

| 文件 | 职责 | 本次动作 |
| --- | --- | --- |
| `app.js` | 全部数据与交互逻辑 | 修改：数据标记、首页、抽屉、语音、反馈、SVG、教学法微调 |
| `styles.css` | 全部样式 | 修改：首页、喇叭、家长角、抽屉锁定、反馈动画、SVG/声调动画样式 |
| `scripts/verify-child-shell.js` | 新增：外壳重构的无头断言 | 新建 |
| `scripts/verify-goal.js` | 既有目标验收 | 修改：home 渲染断言适配新导航 |
| `index.html` | 入口 | 不改 |

`app.js` 已是大文件（约 1830 行）且仓库约定单文件，本计划不拆分，只在既有结构内增改函数。

## 约定：本计划的「测试」如何运作

仓库无 jest/vitest。沿用 `scripts/verify-goal.js` 的做法：用 `vm.runInNewContext` 加载 `app.js`，mock `document`/`Audio`/`setTimeout`，等待 `globalThis.__pinyinInitPromise`，然后读取 `app.innerHTML`、`state`、调用导出到沙箱作用域的函数做断言。

每个任务的红/绿循环：
1. 在 `scripts/verify-child-shell.js` 写一条断言（期望失败）。
2. `node scripts/verify-child-shell.js`，确认该条 `失败：...`。
3. 在 `app.js`/`styles.css` 写最小实现。
4. 再跑，确认该条 `通过：...`。
5. 提交。

视觉/动画/语音时序无法在 Node 断言的，标注为「手动浏览器验证」，用 `index.html` 在浏览器打开核对，必要时用项目内 Playwright 截图。

`verify-child-shell.js` 的脚手架（Task 0 创建一次）：

```js
const fs = require("fs");
const vm = require("vm");

let failures = 0;
function check(cond, okMsg, failMsg) {
  if (cond) { console.log(`通过：${okMsg}`); }
  else { console.error(`失败：${failMsg}`); failures += 1; }
}

const source = fs.readFileSync("app.js", "utf8");
const app = {
  html: "",
  addEventListener() {},
  set innerHTML(v) { this.html = v; },
  get innerHTML() { return this.html; },
};
const context = {
  console,
  document: { querySelector() { return app; } },
  Audio: function Audio() { return { addEventListener() {}, play() { return Promise.resolve(); }, pause() {} }; },
  setTimeout() {},
  fetch: () => Promise.reject(new Error("no network in vm")),
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
};

(async () => {
  await vm.runInNewContext(
    `(async () => {
      ${source}
      await globalThis.__pinyinInitPromise;
      globalThis.__t = {
        home: app.innerHTML,
        state,
        PINYIN_ITEMS,
        makePictureQuestion,
        getUnlockedPinyinIds,
        buildPicturePracticeQuestions,
        startRound,
        app,
      };
    })();`,
    context,
  );

  const t = context.__t;
  // === 断言区：每个 Task 往此处追加 check(...) ===

  process.exitCode = failures === 0 ? 0 : 1;
})();
```

> 说明：`verify-goal.js` 现状已对 garden 标题断言失败（因近期精简文案）。本计划 Chunk 3 会一并修正 `verify-goal.js`，使全套验收恢复全绿。

---

## Chunk 1: 数据层 — 联想词修订与 pictureable 标记

### Task 0: 创建无头验证脚手架

**Files:**
- Create: `scripts/verify-child-shell.js`

- [ ] **Step 1:** 按上文「脚手架」原样创建该文件。
- [ ] **Step 2:** 运行 `node scripts/verify-child-shell.js`，预期：无 `失败`，退出码 0（断言区暂为空）。
- [ ] **Step 3:** 提交。

```bash
git add scripts/verify-child-shell.js
git commit -m "test: add headless verification scaffold for child shell"
```

### Task 1: 给题库加 pictureable 标记并修订 l 的联想词

**Files:**
- Modify: `app.js:1-36`（`PINYIN_ITEMS` 定义与 `.map`）
- Test: `scripts/verify-child-shell.js`

设计依据（spec 3.4）：配图仅用于单韵母和有好词的音节；`de/te/ne/le/fo` 仅听辨、不配图；`l` 的词由「快乐」改「气球」。

- [ ] **Step 1: 写断言**（追加到断言区）

```js
const NON_PICTUREABLE = ["de", "te", "ne", "le", "fo"];
const byId = new Map(t.PINYIN_ITEMS.map((i) => [i.id, i]));
check(
  NON_PICTUREABLE.every((id) => byId.get(id) && byId.get(id).pictureable === false),
  "de/te/ne/le/fo 标记为 pictureable:false",
  "存在难配图音节未标记 pictureable:false",
);
check(
  t.PINYIN_ITEMS.filter((i) => !NON_PICTUREABLE.includes(i.id)).every((i) => i.pictureable !== false),
  "其余条目默认可配图",
  "有可配图条目被误标记",
);
check(byId.get("l") && byId.get("l").word === "气球", "l 联想词为气球", "l 联想词未改为气球");
```

- [ ] **Step 2:** `node scripts/verify-child-shell.js`，预期上述三条 `失败`。
- [ ] **Step 3: 实现**

在 `PINYIN_ITEMS` 数组中：
- 将 `l` 的 `word: "快乐"` 改为 `word: "气球"`（`emoji` 保持 🎈）。
- 给 `de`、`te`、`ne`、`le`、`fo` 五条各加字段 `pictureable: false`。例如 `de` 改为：
  `{ id: "de", type: "syllable", label: "de", sound: "得", word: "得到", emoji: "✅", color: "#ca8a04", pictureable: false },`
- 其余条目不加该字段（缺省即可配图）。

- [ ] **Step 4:** 再跑，预期三条 `通过`。
- [ ] **Step 5: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: mark non-pictureable syllables and revise l word"
```

### Task 2: 配图题生成按 pictureable 过滤

**Files:**
- Modify: `app.js`（`makePictureQuestion` ~524、`makePinyinPictureQuestion` ~567、`buildPicturePracticeQuestions` ~734、`buildPinyinPicturePracticeQuestions` ~626，以及它们的题源与课程 `pictureItems` 消费处）
- Test: `scripts/verify-child-shell.js`

目标：任何配图类题目（`picture-choice`、`pinyin-picture-choice`）的目标与选项都不得包含 `pictureable === false` 的条目。

- [ ] **Step 1: 写断言**

```js
// 自由练习配图题
const pics = t.buildPicturePracticeQuestions();
const bad = pics.filter((q) => NON_PICTUREABLE.includes(t.makePictureQuestion ? q.target : q.target));
check(pics.length > 0 && bad.length === 0, "自由练习配图题不含难配图音节", "配图题包含 pictureable:false 条目");
// 选项也不含
const badChoice = pics.some((q) => (q.choices || []).some((id) => NON_PICTUREABLE.includes(id)));
check(!badChoice, "配图题选项不含难配图音节", "配图题选项含 pictureable:false 条目");
```

- [ ] **Step 2:** 跑，预期 `失败`（当前未过滤）。
- [ ] **Step 3: 实现**

在生成配图题的题源处统一过滤。新增小工具：

```js
function isPictureable(id) {
  return getItem(id)?.pictureable !== false;
}
```

- `buildPicturePracticeQuestions`（~734）：题源 `source` 过滤 `isPictureable`。
- `buildPinyinPicturePracticeQuestions`（~626）：`pool` 与 `targets` 过滤 `isPictureable`。
- `makePictureQuestion` / `makePinyinPictureQuestion` 内 `makeChoices` 的 `poolIds` 入参先过滤 `isPictureable`。
- 课程构建 `buildCourse`（~660）对 `plan.pictureItems` 的消费处，过滤掉非可配图项（防止课程表里混入难配图音节生成配图题）。

- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5:** 运行既有 `node scripts/verify-goal.js`，确认拼音配图相关断言仍 `通过`（拼音配图入口/题型不缺失）。
- [ ] **Step 6: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: exclude non-pictureable items from picture questions"
```

---

## Chunk 2: SVG 插画素材体系

### Task 3: 新增 illustration(itemId) 内联 SVG

**Files:**
- Modify: `app.js`（在 `icon()` 之后新增 `illustration()`）
- Test: `scripts/verify-child-shell.js`

设计依据（spec 3.4）：统一画风（粗描边 `stroke-width` 一致、明快色、单一主体）的内联 SVG，覆盖全部 pictureable 条目。emoji 仅作 SVG 缺失时的兜底。

实现模式（每个条目一段，viewBox 统一 `0 0 120 120`，统一描边 `#223047`/宽 6）：

```js
function illustration(itemId) {
  const art = {
    a: `<svg class="art-svg" viewBox="0 0 120 120" role="img" aria-label="阿姨">...</svg>`,
    o: `<svg class="art-svg" viewBox="0 0 120 120" role="img" aria-label="公鸡">...</svg>`,
    // ... 其余 pictureable 条目
  };
  return art[itemId] || "";
}
```

需绘制的条目（spec 3.4 列表，共 23 个）：单韵母 `a/o/e/i/u/ü`，声母 `b/p/m/f/d/t/n/l`，音节 `ba/pa/ma/fa/bo/po/mo/da/ta/na/la`（注意：`po` 婆婆、`bo` 菠萝在列；`de/te/ne/le/fo` 不画）。每段为单主体、粗描边、3–5 个形状以内的简笔画。

- [ ] **Step 1: 写断言**

```js
const PICTUREABLE = t.PINYIN_ITEMS.filter((i) => i.pictureable !== false).map((i) => i.id);
// illustration 导出到沙箱：需在脚手架 __t 增加 illustration
const ill = context.__t.illustration;
const missing = PICTUREABLE.filter((id) => !/<svg/.test(ill(id) || ""));
check(missing.length === 0, "所有可配图条目都有 SVG 插画", `缺少 SVG 插画：${missing.join("/")}`);
```

同时在脚手架 `__t` 增加 `illustration,`。

- [ ] **Step 2:** 跑，预期 `失败`（函数不存在或条目缺失）。
- [ ] **Step 3: 实现** `illustration()`，逐个补齐 23 段 SVG。先用最简形状占位通过断言，再逐个精修（精修属手动浏览器验证范畴）。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: add inline SVG illustrations for pictureable items"
```

### Task 4: pictureArt 用 SVG 替换 emoji

**Files:**
- Modify: `app.js`（`pictureArt` ~1219）
- Test: `scripts/verify-child-shell.js`

- [ ] **Step 1: 写断言**

```js
// 触发一道配图题渲染并检查 picture-art 含 svg
t.startRound("pictures");
const gameHtml = context.__t.app.innerHTML;
check(/picture-art[\s\S]*<svg/.test(gameHtml), "配图舞台渲染 SVG 插画", "配图舞台仍用 emoji");
```

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：`pictureArt(item)` 内将 `<span class="picture-emoji">${item.emoji}</span>` 改为 `${illustration(item.id) || `<span class="picture-emoji">${item.emoji}</span>`}`（SVG 优先，emoji 兜底）。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5: 样式**：`styles.css` 给 `.art-svg` 设统一尺寸（如 `width: 56%`、居中），与 `.picture-art` 既有布局协调。【手动浏览器验证】打开 `index.html` 进「看图」核对插画清晰、单主体。
- [ ] **Step 6: 提交**

```bash
git add app.js styles.css scripts/verify-child-shell.js
git commit -m "feat: render SVG illustrations in picture stage"
```

---

## Chunk 3: 首页重构（单主线）+ 家长角

### Task 5: 重写 homeView 为单主线

**Files:**
- Modify: `app.js`（`homeView` ~1149）
- Test: `scripts/verify-child-shell.js`、`scripts/verify-goal.js`

设计依据（spec 3.1）：首页只剩顶部大喇叭、火车插画、占屏底「开始」按钮。删除 hero 多按钮、「游戏」区、「入口」区。声调/看图并入课程，自由练习并入花园，记录/静音入家长角。

- [ ] **Step 1: 写断言**

```js
const home = context.__t.app.innerHTML; // 初始即 home
// 只有一个 data-start，且为 lesson
const startMatches = home.match(/data-start="([^"]+)"/g) || [];
check(startMatches.length === 1 && /data-start="lesson"/.test(home), "首页只有一个开始入口(lesson)", `首页 start 入口为 ${startMatches.join(",")}`);
// 首页不再直接出现花园游戏卡 mode
check(!/data-start="moles"|data-start="word"|data-start="flowers"/.test(home), "首页不含花园游戏卡", "首页仍直接暴露花园游戏卡");
// 首页有再听一次喇叭
check(/data-action="repeat-prompt"/.test(home), "首页有再听一次喇叭", "首页缺少 repeat-prompt 喇叭");
```

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现** 新 `homeView()`：

```js
function homeView() {
  const course = ensureTodayCourse();
  const gardenUnlocked = isTodayCourseCompleted();
  return `
    <main class="screen home-screen">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <div class="home-stage">
        ${trainArt()}
      </div>
      <button class="home-start" type="button" data-start="lesson" aria-label="开始今天的学习">
        ${icon("play")}
      </button>
      ${gardenEntry(gardenUnlocked)}
    </main>
  `;
}
```

需配套新增：`isTodayCourseCompleted()`（读 `state.progress.courses[today]?.completed` 或 `dailyStats`，复用既有 `completeDailyCourse`/`getDailyStat` 逻辑）、`gardenEntry(unlocked)`（解锁=可点的花园大图标 `data-view="garden"`；未解锁=灰化+小锁、`data-action="garden-locked"`）、`parentCorner()`（见 Task 6）。

- [ ] **Step 4:** 跑 `verify-child-shell.js`，预期 `通过`。
- [ ] **Step 5: 修正 verify-goal.js**：其 home 断言（`renderedHome.includes("拼音配图")`、garden 标题）已不适配新首页。改为：拼音配图与花园玩法的校验改用 `startRound(mode)` 后的 `state.questions` 类型断言（脚本已有 `gardenRounds` 机制），删除/替换对 `renderedHome` 文案的依赖。garden 标题断言改为读 `GARDEN_GAME_MODES.map((g) => g.title)` 与期望集合比对，而非 home HTML。
- [ ] **Step 6:** 跑 `node scripts/verify-goal.js`，预期全部 `通过`（恢复全绿）。
- [ ] **Step 7: 样式**：`styles.css` 新增 `.home-screen`（纵向居中布局）、`.home-start`（占屏底大圆按钮，最小边长 ≥ 96px 适配幼儿手指）、`.home-replay`（右上大喇叭）、`.home-stage`。【手动浏览器验证】
- [ ] **Step 8: 提交**

```bash
git add app.js styles.css scripts/verify-child-shell.js scripts/verify-goal.js
git commit -m "feat: single-lane home screen for independent play"
```

### Task 6: 家长角（长按进入记录/静音）

**Files:**
- Modify: `app.js`（新增 `parentCorner()`、长按事件、`records` 视图入口；`handleClick`/事件绑定 ~1749、1825）
- Test: `scripts/verify-child-shell.js`

设计依据（spec 3.1）：记录与静音移到屏幕角落小区域，长按进入，降低孩子误入。

- [ ] **Step 1: 写断言**

```js
check(/class="parent-corner"/.test(context.__t.app.innerHTML), "首页有家长角", "首页缺少家长角");
```

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现** `parentCorner()`：右上角小热区，`data-longpress="parent"`，内含静音切换与记录入口的小图标但默认半透明。长按交互：在 `app.addEventListener` 旁新增 `pointerdown`/`pointerup` 监听，按住 ≥ 700ms 触发 `state.view = "records"` 并 `render()`；普通点击不触发。普通点击家长角仅播放一句轻提示语音（可复用某 prompt）。静音按钮保留 `data-action="toggle-mute"`，仅在记录页/家长展开时可见。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5: 样式 + 手动验证**：家长角足够小且偏置，幼儿不易误触；长按阈值在触屏与鼠标都生效。【手动浏览器验证】
- [ ] **Step 6: 提交**

```bash
git add app.js styles.css scripts/verify-child-shell.js
git commit -m "feat: parent corner with long-press for records and mute"
```

---

## Chunk 4: 奖励抽屉（游戏花园）

### Task 7: 花园抽屉视图与解锁门控

**Files:**
- Modify: `app.js`（`render()` 的 `views` 映射 ~1739 增加 `garden`；新增 `gardenView()`；`gardenEntry()` 已在 Task 5 占位）
- Test: `scripts/verify-child-shell.js`

设计依据（spec 3.1）：完成今日课程后出现花园入口；进入后是 5 个游戏全图标化；未完成则灰化+锁。

- [ ] **Step 1: 写断言**

```js
// 未完成今日课程：首页花园入口为锁定态
check(/data-action="garden-locked"|aria-disabled="true"/.test(context.__t.app.innerHTML), "未完成时花园入口锁定", "花园入口未锁定");
// 强制进入 garden 视图渲染含 5 个游戏 mode
t.state.view = "garden";
// 需在脚手架导出 render 或直接读：改为调用 setView 风格。简化：断言 gardenView 存在且含 5 个 data-start
const gv = context.__t.gardenView ? context.__t.gardenView() : "";
const modes = (gv.match(/data-start="([^"]+)"/g) || []);
check(modes.length === 5, "花园抽屉含 5 个游戏入口", `花园入口数为 ${modes.length}`);
```

脚手架 `__t` 增加 `gardenView,`。

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：
  - `gardenView()`：顶部 `parentCorner()` + 大喇叭 + 用 `GARDEN_GAME_MODES` 渲染 5 个大图标卡（沿用 `gardenGameCards()`，但置于独立视图）。
  - `render()` 的 `views` 增加 `garden: gardenView`。
  - `gardenEntry(unlocked)`：解锁时按钮 `data-view="garden"`；未解锁 `aria-disabled="true"` 且 `data-action="garden-locked"`，叠加 `icon` 小锁。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: reward garden drawer gated by daily completion"
```

### Task 8: 抽屉导航与锁定反馈接线

**Files:**
- Modify: `app.js`（`handleClick` ~1749）
- Test: `scripts/verify-child-shell.js`（行为断言）+【手动浏览器验证】

- [ ] **Step 1: 写断言**：`handleClick` 对 `data-action="garden-locked"` 调用一个 `playLockedHint()`（播放轻提示语音、不切视图）。断言：存在 `garden-locked` 分支处理（通过源码字符串检查或行为：点击后 `state.view` 未变）。

```js
check(/garden-locked/.test(source) && /function playLockedHint|locked/.test(source), "锁定入口有提示处理", "缺少锁定入口提示处理");
```

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：`handleClick` 增加 `if (action === "garden-locked") { playLockedHint(); return; }`；`playLockedHint()` 播放一句鼓励「先完成今天的学习」的语音（复用 `AUDIO_PROMPTS.retry` 或新增 prompt，无音频时静默）。进入 `garden` 视图沿用既有 `data-view` 分支。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5:【手动浏览器验证】** 完成一轮课程 → 首页花园解锁 → 进入花园玩任一游戏；未完成时点锁定入口仅听到提示、不进入。
- [ ] **Step 6: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: wire garden drawer navigation and locked hint"
```

---

## Chunk 5: 语音指令系统

### Task 9: 进入每个界面自动播放语音指令

**Files:**
- Modify: `app.js`（`setView`/`render` 流程、`init` ~1827、首页与抽屉进入处）
- Test:【手动浏览器验证】+ 轻量源码断言

设计依据（spec 3.2）：进入任何界面自动播放该界面语音指令。游戏内已有 `playCurrentPrompt`；需补首页与花园。

- [ ] **Step 1: 写断言**（源码层）

```js
check(/function announceView|playViewPrompt/.test(source), "存在按视图播报的语音入口", "缺少按视图自动播报");
```

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：新增 `playViewPrompt()`，按 `state.view` 选择提示音（home → 一句「点大按钮开始」；garden → 「选一个游戏」；game → 复用 `playCurrentPrompt`）。在视图切换（`handleClick` 的 `data-view` 分支、`startRound`、`init` 首次渲染）后调用，包一层 `setTimeout(..., 180)`（与既有 `startRound` 一致）。静音时不播放（沿用 `state.muted` 判断与 `playAudioSequence` 既有静音处理）。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5:【手动浏览器验证】** 进首页/花园/游戏分别自动听到指令；静音开关生效。
- [ ] **Step 6: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: auto-play voice prompt on entering each screen"
```

### Task 10: 移除视觉中文整句指令（保留 sr-only）

**Files:**
- Modify: `app.js`（`getGameTitle` 使用处 ~1341 等已是 `sr-only`，核查 home/garden 无可见整句指令）
- Test: `scripts/verify-child-shell.js`

游戏舞台的 `getGameTitle` 已置于 `class="...sr-only"`，本任务确保首页与抽屉同样无可见整句中文指令。

- [ ] **Step 1: 写断言**

```js
// 首页/花园不含可见的整句中文指令（粗判：home HTML 去掉 sr-only 节点后无长中文句）
const homeVisible = (context.__t.home || "").replace(/sr-only[^>]*>[^<]*</g, "");
check(!/[一-龥]{6,}/.test(homeVisible.replace(/aria-label="[^"]*"/g, "")), "首页无可见长中文句", "首页存在可见长中文指令");
```

- [ ] **Step 2:** 跑；若 `失败`，把首页/抽屉残留的可见中文整句（标题文案等）移入 `sr-only` 或删除，仅保留 `aria-label`（不计入可见文本）。
- [ ] **Step 3:** 跑，预期 `通过`。
- [ ] **Step 4: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "refactor: move visible Chinese instructions to sr-only on shell"
```

---

## Chunk 6: 零文字反馈

### Task 11: 反馈动画 + 音效，文字降级 sr-only

**Files:**
- Modify: `app.js`（`answer`/反馈渲染、`state.feedback` 使用处）、`styles.css`（动画）
- Test: `scripts/verify-child-shell.js` + 【手动浏览器验证】

设计依据（spec 3.3）：答对火车进一节/花朵绽放动画 + 音效 + 语音；答错温和音效 + 重播 + 正确项轻高亮；`state.feedback` 文本降为 sr-only。

- [ ] **Step 1: 写断言**：触发一次作答，断言反馈文本节点带 `sr-only`，且舞台含动画类（如 `feedback-correct`/`feedback-wrong`）。

```js
t.startRound("lesson");
const q = t.state.questions[0];
// 直接调用 answer 需导出；脚手架 __t 增加 answer, getQuestionAnswerId
context.__t.answer(context.__t.getQuestionAnswerId(q));
const fb = context.__t.app.innerHTML;
check(/feedback[^"]*sr-only|sr-only[^"]*feedback/.test(fb) || !/(再听一听|找找这个声音)/.test(fb.replace(/sr-only[\s\S]*?</g, "")), "反馈文字不可见(sr-only)", "反馈文字仍可见");
```

脚手架 `__t` 增加 `answer, getQuestionAnswerId`。

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：反馈渲染把 `state.feedback` 包入 `sr-only`；答对/答错给舞台加动画 class，配既有 `AUDIO_PROMPTS.correct`/`retry` 音效与语音（已部分存在，核查触发路径）。`styles.css` 实现 1 秒内的轻动画（需求 6 节：动画约 1 秒）。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5:【手动浏览器验证】** 答对有正向动画+音、答错温和提示+重播，全程无依赖阅读的文字。
- [ ] **Step 6: 提交**

```bash
git add app.js styles.css scripts/verify-child-shell.js
git commit -m "feat: text-free feedback with animation and audio"
```

---

## Chunk 7: 教学法微调

### Task 12: 声母易混对首现降到 2 选项

**Files:**
- Modify: `app.js`（`makeChoices` ~504、`makeListenQuestion` ~515 的选项数决策）
- Test: `scripts/verify-child-shell.js`

设计依据（spec 3.5）：`b/p`、`d/t`、`n/l` 这类难区分对首次出现时降到 2 选项。

- [ ] **Step 1: 写断言**

```js
const CONFUSE = [["b","p"],["d","t"],["n","l"]];
// 构造仅含某易混声母的课程/题，断言其首题 choices.length === 2
// 简化：直接调用 makeListenQuestion 风格的生成（脚手架导出 makeListenQuestion）
// 断言：当 target 属易混对且为首现，choices 长度为 2
```

（实现者据 `makeListenQuestion` 实参补全；脚手架 `__t` 导出 `makeListenQuestion`、`INITIAL_IDS`。）

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：在选项数决策处增加规则——目标为易混声母对成员且该声母在当日为新内容（`newItems` 含该 id）时，强制 `count = 2`；选项优先取其易混对的另一半作干扰（更有教学意义）。带元音延长示范：声母听辨题播放时，附带其 `bo/po` 类示范音（用既有 `wordAudio` 或音节音）。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5:【手动浏览器验证】** 第 16 天（区分 b/p）首现题为 2 选项。
- [ ] **Step 6: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: 2-option first appearance for confusable initials"
```

### Task 13: 声调具象化动画

**Files:**
- Modify: `app.js`（`toneArt` ~1237、声调题渲染 ~1442）、`styles.css`
- Test: `scripts/verify-child-shell.js` + 【手动浏览器验证】

设计依据（spec 3.5）：滑梯轨迹配具象物体（小车沿轨迹上/下坡），点击播放并触发动画。

- [ ] **Step 1: 写断言**：声调题渲染含具象元素（如 `class="tone-rider"` 的 SVG 物体）。

```js
t.startRound("tones");
check(/tone-rider|tone-vehicle/.test(context.__t.app.innerHTML), "声调题含具象动画元素", "声调题缺少具象元素");
```

- [ ] **Step 2:** 跑，预期 `失败`。
- [ ] **Step 3: 实现**：`toneArt` 在轨迹上加一个小物体（`<circle>`/简笔小车），点击播放时通过 CSS 沿 `tone-line` 路径或按声调走势平移（`@keyframes` 按 `tone.number` 不同走势）。
- [ ] **Step 4:** 跑，预期 `通过`。
- [ ] **Step 5:【手动浏览器验证】** 四声轨迹各有对应上行/下行/先降后升动画。
- [ ] **Step 6: 提交**

```bash
git add app.js styles.css scripts/verify-child-shell.js
git commit -m "feat: concrete moving object on tone tracks"
```

---

## Chunk 8: 整体验收

### Task 14: 全套验证与独立游玩走查

**Files:**
- Modify: `scripts/verify-goal.js`（若 Task 5 未完全收口）
- Test: 全套

- [ ] **Step 1:** `node scripts/verify-child-shell.js` → 全 `通过`，退出码 0。
- [ ] **Step 2:** `node scripts/verify-goal.js` → 全 `通过`（含 30 天课程、声母、声调、配图、花园 5 玩法、无 speechSynthesis、音频校验）。
- [ ] **Step 3:** `node scripts/verify-audio-assets.js --summary` → 通过。
- [ ] **Step 4:【手动浏览器验证 · 独立游玩走查】** 用 `index.html` 在平板尺寸视口（或浏览器设备模拟）完整走一遍，对照 spec 第 6 节核心验收：
  - 不靠阅读，仅凭语音+图标，从首页进入并完成一轮课程。
  - 每个界面进入有语音；大喇叭可重听。
  - 配图均为 SVG、单主体清晰。
  - 答对/答错反馈无文字依赖。
  - 完成后花园解锁；家长角不易误入。
  - 按钮在触屏下易点（≥ 96px 量级）。
- [ ] **Step 5:** 若任一项不达标，回到对应 Chunk 修复并重跑该 Chunk 验证。
- [ ] **Step 6: 提交**（如有收尾改动）

```bash
git add -A
git commit -m "test: finalize verification for child-facing shell redesign"
```

---

## 风险与备注

- `app.js` 单文件较大；每个任务只增改局部函数，提交粒度小，便于回滚。
- SVG 插画工作量集中在 Task 3（23 段）；可先占位通过断言、再分批精修，避免阻塞后续结构任务。
- 语音/动画时序无法在 Node 断言，依赖手动浏览器验证；务必逐 Chunk 走查，不要积压到最后。
- `verify-goal.js` 现状已对旧首页文案断言失败，Task 5 必须同步修正，否则全套验收无法恢复全绿。
- 音频沿用现有 TTS，结构（manifest + `AUDIO_PROMPTS`）预留真人替换，本计划不重录。
