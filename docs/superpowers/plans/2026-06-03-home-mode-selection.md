# 首页多模式选择 实现计划

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把首页从"单个大播放键 + 上锁花园"改为"火车头图 + 4 张无文字模式卡 + 永久解锁的花园入口"，让幼儿自己挑玩法。

**Architecture:** 纯前端改动，复用现有 `startRound(mode)` 与 `data-start` 事件分发。首页新增 4 张图画卡（lesson/tones/pictures/moles），删除"完成课程才解锁花园"的门禁逻辑，花园渲染时过滤掉已上首页的玩法。`GARDEN_GAME_MODES` 数据结构保持 5 项不变（`verify-goal.js` 依赖它），只在 `gardenGameCards()` 渲染时过滤。

**Tech Stack:** 纯 HTML/CSS/JavaScript，无构建步骤；Node 无头脚本 `scripts/verify-child-shell.js` 做断言验证。

设计依据：`docs/superpowers/specs/2026-06-03-home-mode-selection-design.md`

---

## 文件结构

- `app.js`
  - 新增常量 `HOME_MODE_CARDS`（首页 4 张卡的数据）。
  - 新增渲染函数 `homeModeCards()`。
  - 改 `homeView()`：去掉门禁判断与大播放键，加入火车头图 + 模式卡网格 + 花园入口。
  - 改 `gardenEntry()`：去掉 `unlocked` 参数，永远返回解锁形态。
  - 改 `resultView()`：去掉 `isTodayCourseCompleted()` 调用，`gardenEntry()` 无参调用。
  - 改 `gardenGameCards()`：过滤掉首页已展示的模式（moles）。
  - 删除死代码：`handleClick` 中 `garden-locked` 分支、`playLockedHint()`、`isTodayCourseCompleted()`。
- `styles.css`
  - 新增 `.home-mode-grid` / `.home-mode-card` / `.home-mode-art` 样式。
  - 删除 `.home-start`、`.garden-entry.locked`、`.garden-lock` 及其相关样式；调整 `.home-stage` 火车头图为较小尺寸。
- `scripts/verify-child-shell.js`
  - 更新 Task 5 / Task 7 / Task 8 三段断言为新契约。
- `README.md`
  - 同步"功能概览"中首页描述。

---

## Chunk 1: 首页逻辑与测试

### Task 1: 首页渲染 4 张模式卡，花园入口永久解锁

**Files:**
- Modify: `app.js`（`homeView` ~1332、`gardenEntry` ~1316、`gardenGameCards` ~1295、`resultView` ~1872、`handleClick` ~1985、`playLockedHint` ~1087、`isTodayCourseCompleted` ~948，新增 `HOME_MODE_CARDS` 常量、`homeModeCards()` 函数）
- Test: `scripts/verify-child-shell.js`（Task 5/7/8 三段断言）

- [ ] **Step 1: 改测试断言为新契约（先让它失败）**

在 `scripts/verify-child-shell.js` 中，把 Task 5 整段（当前约 141-154 行）替换为：

```js
  // Task 5: 首页 4 张模式卡
  const home5 = t.home;
  const startMatches = home5.match(/data-start="([^"]+)"/g) || [];
  const startModes = startMatches
    .map((s) => s.replace(/^data-start="|"$/g, ""))
    .sort();
  check(
    JSON.stringify(startModes) === JSON.stringify(["lesson", "moles", "pictures", "tones"]),
    "首页有 4 张模式卡(lesson/tones/pictures/moles)",
    `首页 start 入口为 ${startModes.join(",") || "无"}`,
  );
  check(/data-action="repeat-prompt"/.test(home5), "首页有再听一次喇叭", "首页缺少 repeat-prompt 喇叭");
```

把 Task 7 整段（当前约 160-164 行）替换为：

```js
  // Task 7: 花园入口永久解锁，抽屉过滤掉已上首页的玩法
  check(!/data-action="garden-locked"/.test(home5), "首页花园入口不再锁定", "首页花园入口仍锁定");
  check(/data-view="garden"/.test(home5), "首页有花园入口", "首页缺少花园入口");
  const gv = t.gardenView ? t.gardenView() : "";
  const gvStarts = gv.match(/data-start="([^"]+)"/g) || [];
  check(gvStarts.length === 4, "花园抽屉含 4 个游戏入口", `花园入口数为 ${gvStarts.length}`);
  check(!/data-start="moles"/.test(gv), "花园不再重复打地鼠(已上首页)", "花园仍含打地鼠入口");
```

把 Task 8 整段（当前约 166-171 行）替换为：

```js
  // Task 8: 已移除锁定入口提示逻辑
  check(
    !/garden-locked/.test(source) && !/function playLockedHint/.test(source),
    "已移除锁定入口提示逻辑",
    "仍存在锁定入口提示逻辑",
  );
```

- [ ] **Step 2: 运行测试确认失败**

Run: `node scripts/verify-child-shell.js`
Expected: FAIL（出现"失败："行，进程退出码非 0），因为当前 app.js 首页只有 1 个 lesson 入口、花园仍上锁、`playLockedHint` 仍存在。

- [ ] **Step 3: 新增首页模式卡数据与渲染函数**

在 `app.js` 中 `GARDEN_GAME_MODES` 常量定义之后（约第 101 行后）新增：

```js
const HOME_MODE_CARDS = [
  { mode: "lesson", icon: "train", label: "今天的学习", color: "#2477d6", bg: "#eaf4ff" },
  { mode: "tones", icon: "tone", label: "声调滑梯", color: "#238755", bg: "#ecfbf1" },
  { mode: "pictures", icon: "image", label: "拼音配图", color: "#a86413", bg: "#fff6db" },
  { mode: "moles", icon: "hammer", label: "打地鼠", color: "#6f5433", bg: "#fff1d7" },
];
```

在 `homeView` 之前新增渲染函数：

```js
function homeModeCards() {
  return HOME_MODE_CARDS.map(
    (card) => `
      <button class="mode-card home-mode-card" style="--mode-color: ${card.color}; --mode-bg: ${card.bg}" type="button" data-start="${card.mode}" aria-label="${card.label}">
        <span class="mode-art home-mode-art">${icon(card.icon)}</span>
      </button>
    `,
  ).join("");
}
```

说明：卡片只渲染图标，不含可见中文（`label` 仅用于 `aria-label` 属性，无障碍读屏用，不在视觉上显示）。

- [ ] **Step 4: 改 `homeView` —— 去门禁、加模式卡网格**

把 `homeView`（约 1332-1350 行）整体替换为：

```js
function homeView() {
  ensureTodayCourse();
  return `
    <main class="screen home-screen">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <div class="home-stage">
        ${trainArt()}
      </div>
      <div class="mode-grid home-mode-grid">
        ${homeModeCards()}
      </div>
      ${gardenEntry()}
    </main>
  `;
}
```

- [ ] **Step 5: 改 `gardenEntry` —— 永久解锁、去参数**

把 `gardenEntry`（约 1316-1330 行）整体替换为：

```js
function gardenEntry() {
  return `
    <button class="garden-entry" type="button" data-view="garden" aria-label="去游戏花园">
      <span class="garden-entry-art">${icon("flower")}</span>
    </button>
  `;
}
```

- [ ] **Step 6: 改 `resultView` 的花园入口调用**

在 `resultView`（约 1870-1903 行）中：
- 删除这一行：`const unlocked = isTodayCourseCompleted();`
- 把 `${gardenEntry(unlocked)}` 改为 `${gardenEntry()}`

- [ ] **Step 7: `gardenGameCards` 过滤掉首页已展示的玩法**

把 `gardenGameCards`（约 1295-1304 行）整体替换为：

```js
function gardenGameCards() {
  const homeModes = new Set(HOME_MODE_CARDS.map((card) => card.mode));
  return GARDEN_GAME_MODES.filter((game) => !homeModes.has(game.mode))
    .map(
      (game) => `
      <button class="mode-card garden-card" style="--garden-color: ${game.color}; --garden-bg: ${game.bg}" type="button" data-start="${game.mode}" aria-label="${game.text}">
        <span class="mode-art garden-art">${icon(game.icon)}</span>
        <span><strong>${game.title}</strong></span>
      </button>
    `,
    )
    .join("");
}
```

- [ ] **Step 8: 删除死代码（门禁相关）**

在 `app.js` 中删除以下三处：
1. `handleClick` 内的分支（约 1985-1988 行）：
```js
  if (action === "garden-locked") {
    playLockedHint();
    return;
  }
```
2. `playLockedHint` 整个函数（约 1087 行起）。
3. `isTodayCourseCompleted` 整个函数（约 948 行起）。

- [ ] **Step 9: 确认没有遗留引用**

Run: `grep -n "isTodayCourseCompleted\|playLockedHint\|garden-locked\|\.locked" app.js`
Expected: 无输出（全部清除干净）。若仍有命中，回到 Step 4-8 处理。

- [ ] **Step 10: 运行两个验证脚本确认通过**

Run: `node scripts/verify-child-shell.js`
Expected: PASS（全部"通过："，无"失败："，退出码 0）。

Run: `node scripts/verify-goal.js`
Expected: PASS（"游戏花园 5 种玩法入口和题型存在"等仍通过，因为 `GARDEN_GAME_MODES` 数据未改）。

- [ ] **Step 11: 提交**

```bash
git add app.js scripts/verify-child-shell.js
git commit -m "feat: home shows four mode cards, garden always unlocked

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Chunk 2: 样式与文档

### Task 2: 首页模式卡样式 + 清理废弃样式

**Files:**
- Modify: `styles.css`（`.home-stage` ~1368、`.home-start` ~1377-1403、`.garden-entry.locked`/`.garden-lock` ~1423-1437，新增 home-mode 样式）

- [ ] **Step 1: 新增首页模式卡样式**

在 `styles.css` 的 `.home-stage .train-scene { ... }`（约 1372-1375 行）之后插入：

```css
.home-mode-grid {
  width: min(86vw, 460px);
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

.home-mode-card {
  min-height: 0;
  padding: 18px;
  place-items: center;
  align-content: center;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(255, 255, 255, 0.78)),
    var(--mode-bg);
}

.home-mode-art {
  width: 64px;
  height: 64px;
  margin-bottom: 0;
  color: var(--mode-color);
  background: var(--mode-bg);
}

.home-mode-art .icon {
  width: 40px;
  height: 40px;
}
```

- [ ] **Step 2: 火车头图改为较小的装饰尺寸**

把 `.home-stage`（约 1368-1370 行）的宽度改小，从：
```css
.home-stage {
  width: min(80vw, 420px);
}
```
改为：
```css
.home-stage {
  width: min(62vw, 300px);
}
```

- [ ] **Step 3: 删除废弃样式**

在 `styles.css` 中删除以下规则块：
1. `.home-start { ... }`（约 1377-1389 行）
2. `.home-start .icon { ... }`（约 1391-1394 行）
3. `@keyframes home-start-pulse { ... }`（约 1396-1399 行）
4. `@media (prefers-reduced-motion: reduce) { .home-start { animation: none; } }`（约 1401-1403 行）
5. `.garden-entry.locked { ... }`（约 1423-1429 行）
6. `.garden-lock { ... }`（约 1431-1437 行）

- [ ] **Step 4: 确认没有遗留引用**

Run: `grep -n "home-start\|garden-entry.locked\|garden-lock\|home-start-pulse" styles.css app.js`
Expected: 无输出。

- [ ] **Step 5: 启动本地服务，目视检查首页**

Run: `python3 -m http.server 4173`（后台），浏览器打开 `http://127.0.0.1:4173`
确认：首页顶部有缩小的火车图，下方 2×2 共 4 张图画卡，底部花园入口无锁；点击 4 张卡分别进入对应玩法；花园显示 4 个小游戏；窄屏（手机宽度）下卡片不溢出。
（可用 chrome-devtools 截图记录桌面与窄屏两种布局。）

- [ ] **Step 6: 提交**

```bash
git add styles.css
git commit -m "style: home mode card grid, drop locked-garden styles

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

### Task 3: 同步 README 首页描述

**Files:**
- Modify: `README.md`（"功能概览"首页条目，约第 7 行）

- [ ] **Step 1: 改写首页描述**

把 README 中这一行：
```
- 首页：展示按日期生成的今日课程，提供每日课程、游戏花园、自由练习和学习记录入口。
```
改为：
```
- 首页：以图画卡呈现今日课程、声调滑梯、拼音配图、打地鼠 4 种玩法，孩子可直接选择；花园入口常驻，放置其余小游戏；家长入口长按可看学习记录。
```

- [ ] **Step 2: 提交**

```bash
git add README.md
git commit -m "docs: update home description for mode selection

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## 完成标准

- `node scripts/verify-child-shell.js` 与 `node scripts/verify-goal.js` 均退出码 0、无"失败："。
- 首页渲染 4 张模式卡（lesson/tones/pictures/moles），花园入口可直接进入。
- 花园抽屉显示 4 个小游戏（不含打地鼠）。
- 首页与花园界面无可见中文长句（Task 10 断言保持通过）。
- 桌面与窄屏布局正常，火车头图保留为装饰。
