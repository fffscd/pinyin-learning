const fs = require("fs");
const vm = require("vm");

let failures = 0;
function check(cond, okMsg, failMsg) {
  if (cond) {
    console.log(`通过：${okMsg}`);
  } else {
    console.error(`失败：${failMsg}`);
    failures += 1;
  }
}

const source = fs.readFileSync("app.js", "utf8");
const app = {
  html: "",
  addEventListener() {},
  set innerHTML(v) {
    this.html = v;
  },
  get innerHTML() {
    return this.html;
  },
};
const context = {
  console,
  document: {
    querySelector() {
      return app;
    },
  },
  Audio: function Audio() {
    return {
      addEventListener() {},
      play() {
        return Promise.resolve();
      },
      pause() {},
    };
  },
  setTimeout() {},
  fetch: () => Promise.reject(new Error("no network in vm")),
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {},
  },
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
        makePinyinPictureQuestion,
        illustration: typeof illustration !== "undefined" ? illustration : null,
        gardenView: typeof gardenView !== "undefined" ? gardenView : null,
        homeView: typeof homeView !== "undefined" ? homeView : null,
        resultView: typeof resultView !== "undefined" ? resultView : null,
        normalizeProgress: typeof normalizeProgress !== "undefined" ? normalizeProgress : null,
        answer: typeof answer !== "undefined" ? answer : null,
        getQuestionAnswerId: typeof getQuestionAnswerId !== "undefined" ? getQuestionAnswerId : null,
        buildCourse: typeof buildCourse !== "undefined" ? buildCourse : null,
        COURSE_PLAN_30_DAYS: typeof COURSE_PLAN_30_DAYS !== "undefined" ? COURSE_PLAN_30_DAYS : null,
        getUnlockedPinyinIds,
        buildPicturePracticeQuestions,
        buildPinyinPicturePracticeQuestions,
        startRound,
        app,
      };
    })();`,
    context,
  );

  const t = context.__t;
  // === 断言区：每个 Task 往此处追加 check(...) ===

  // Task 1: pictureable 标记与 l 词修订
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

  // Task 2: 配图题按 pictureable 过滤
  const isNonPic = (id) => NON_PICTUREABLE.includes(id);
  // 强制场景：选项池含全部音节(含 de/te/ne/le/fo),反复抽样验证选项不漏出难配图音节
  const allSyll = ["ba", "pa", "ma", "fa", "bo", "po", "mo", "fo", "de", "te", "ne", "le", "da", "ta", "na", "la"];
  let leakChoice = false;
  for (let i = 0; i < 50; i += 1) {
    const q1 = t.makePictureQuestion("ba", 30, Math.random, allSyll);
    const q2 = t.makePinyinPictureQuestion("ma", 30, Math.random, allSyll);
    if (q1.choices.some(isNonPic) || q2.choices.some(isNonPic)) leakChoice = true;
  }
  check(!leakChoice, "配图题选项过滤掉难配图音节", "配图题选项漏出 pictureable:false 条目");

  // 强制全解锁(把课程起始日设为很早),多种子采样验证练习题目标不出现难配图音节
  t.state.progress.courseStartDate = "2020-01-01";
  let targetA = [];
  let targetB = [];
  for (let r = 0; r < 50; r += 1) {
    t.state.progress.completedRounds = r;
    targetA = targetA.concat(t.buildPicturePracticeQuestions().map((q) => q.target));
    targetB = targetB.concat(t.buildPinyinPicturePracticeQuestions().map((q) => q.target));
  }
  t.state.progress.completedRounds = 0;
  check(
    targetA.length > 0 && targetA.every((id) => !isNonPic(id)),
    "看图练习目标不含难配图音节(全解锁多种子)",
    "看图练习目标含 pictureable:false 条目",
  );
  check(
    targetB.length > 0 && targetB.every((id) => !isNonPic(id)),
    "拼音找图练习目标不含难配图音节(全解锁多种子)",
    "拼音找图练习目标含 pictureable:false 条目",
  );

  // Task 3: 所有可配图条目都有 SVG 插画
  const PICTUREABLE = t.PINYIN_ITEMS.filter((i) => i.pictureable !== false).map((i) => i.id);
  const missingArt = PICTUREABLE.filter((id) => !/<svg/.test((t.illustration && t.illustration(id)) || ""));
  check(missingArt.length === 0, "所有可配图条目都有 SVG 插画", `缺少 SVG 插画：${missingArt.join("/")}`);

  // Task 4: 配图舞台渲染 SVG 而非 emoji
  t.startRound("pictures");
  const picHtml = t.app.innerHTML;
  check(picHtml.includes('class="art-svg"'), "配图舞台渲染 SVG 插画", "配图舞台未渲染 SVG(仍用 emoji)");

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

  // Task 6: 家长角
  check(/class="parent-corner"/.test(home5), "首页有家长角", "首页缺少家长角");
  check(/data-longpress="parent"/.test(home5), "家长角支持长按标记", "家长角缺少 longpress 标记");

  // Task 7: 花园入口永久解锁，抽屉过滤掉已上首页的玩法
  check(!/data-action="garden-locked"/.test(home5), "首页花园入口不再锁定", "首页花园入口仍锁定");
  check(/data-view="garden"/.test(home5), "首页有花园入口", "首页缺少花园入口");
  const gv = t.gardenView ? t.gardenView() : "";
  const gvStarts = gv.match(/data-start="([^"]+)"/g) || [];
  check(gvStarts.length === 4, "花园抽屉含 4 个游戏入口", `花园入口数为 ${gvStarts.length}`);
  check(!/data-start="moles"/.test(gv), "花园不再重复打地鼠(已上首页)", "花园仍含打地鼠入口");

  // Task 8: 已移除锁定入口提示逻辑
  check(
    !/garden-locked/.test(source) && !/function playLockedHint/.test(source),
    "已移除锁定入口提示逻辑",
    "仍存在锁定入口提示逻辑",
  );

  // Task 9: 按视图自动语音播报
  check(/function playViewPrompt/.test(source), "存在按视图播报的语音入口", "缺少按视图自动播报");
  check(/playViewPrompt\(\)/.test(source), "导航后调用 playViewPrompt", "导航未调用 playViewPrompt");

  // Task 10: 导航外壳无可见中文整句指令(短标签可保留,长句不可)
  const stripSrOnly = (html) =>
    html.replace(/<([a-z0-9]+)\b[^>]*class="[^"]*sr-only[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, " ");
  const visibleText = (html) => stripSrOnly(html).replace(/<[^>]*>/g, " ");
  const noLongHan = (html) => !/[一-鿿]{6,}/.test(visibleText(html));
  check(noLongHan(home5), "首页无可见长中文句", "首页存在可见长中文指令");
  check(noLongHan(t.gardenView ? t.gardenView() : ""), "花园抽屉无可见长中文句", "花园抽屉存在可见长中文指令");
  // resultView 需要 learnedItems 状态，已在前面跑过一轮 lesson；直接渲染检查
  t.state.view = "result";
  const resultHtml = typeof context.__t.resultView === "function" ? context.__t.resultView() : "";
  check(resultHtml === "" || noLongHan(resultHtml), "结算页无可见长中文句", "结算页存在可见长中文指令");

  // Task 11: 零文字反馈
  t.state.muted = true;
  t.startRound("lesson");
  const q0 = t.state.questions[0];
  t.answer(t.getQuestionAnswerId(q0));
  const fbHtml = t.app.innerHTML;
  check(fbHtml.includes('class="feedback sr-only"'), "反馈文字为 sr-only(不可见)", "反馈文字仍可见");
  check(/feedback-correct/.test(fbHtml), "答对时舞台有正向动画类", "答对缺少动画类");

  // Task 12: 声母易混对首现降到 2 选项,干扰项为配对另一半
  // 第 16 天「轻轻送气」newItems=['p'], 期望 p 的听辨题为 2 选项且含 b
  const plan16 = t.COURSE_PLAN_30_DAYS[15];
  const course16 = t.buildCourse("2026-01-01", 16, plan16);
  const pListen = course16.questions.filter((q) => q.type === "listen-choice" && q.target === "p");
  check(
    pListen.length > 0 && pListen.every((q) => q.choices.length === 2 && q.choices.includes("b")),
    "声母易混对(p)首现为2选项且含配对b",
    `p 首现题异常：${JSON.stringify(pListen.map((q) => q.choices))}`,
  );

  // Task 13: 声调具象化(轨迹上有具象动画物体)
  t.startRound("tones");
  check(/tone-rider/.test(t.app.innerHTML), "声调题含具象动画元素", "声调题缺少具象元素");

  // Task 14: 星星激励
  // 14a 空存档默认累计星星为 0；旧存档(无 stars)经 normalize 补 0
  check(
    t.normalizeProgress && t.normalizeProgress({}).stars === 0,
    "空存档默认累计星星为 0",
    "空存档默认 stars 非 0",
  );
  check(
    t.normalizeProgress && t.normalizeProgress({ completedRounds: 3 }).stars === 0,
    "旧存档无 stars 字段时补 0",
    "旧存档迁移后 stars 非 0",
  );
  // 14b 答对一题：本轮星星与累计星星各 +1，startRound 后本轮归零
  t.state.muted = true;
  t.startRound("lesson");
  check(t.state.roundStars === 0, "startRound 后本轮星星归零", `roundStars=${t.state.roundStars}`);
  const starsBefore14 = t.state.progress.stars;
  const q14 = t.state.questions[0];
  t.answer(t.getQuestionAnswerId(q14));
  check(t.state.progress.stars === starsBefore14 + 1, "答对后累计星星+1", `stars ${starsBefore14}→${t.state.progress.stars}`);
  check(t.state.roundStars === 1, "答对后本轮星星+1", `roundStars=${t.state.roundStars}`);
  // 14c 游戏页有星星托盘
  check(/star-tray/.test(t.app.innerHTML), "游戏页有星星托盘", "游戏页缺少星星托盘");
  // 14d 首页有星星盒子并显示累计数字
  const homeHtml14 = t.homeView ? t.homeView() : "";
  check(/star-box/.test(homeHtml14), "首页有星星盒子", "首页缺少星星盒子");
  check(homeHtml14.includes(String(t.state.progress.stars)), "首页盒子显示累计数字", "首页盒子未显示累计数字");
  // 14e 结算页有星星盒子
  t.state.view = "result";
  const resultHtml14 = t.resultView ? t.resultView() : "";
  check(/star-box/.test(resultHtml14), "结算页有星星盒子", "结算页缺少星星盒子");
  // 14f 游戏页与首页仍无可见中文长句
  check(noLongHan(t.app.innerHTML), "游戏页无可见长中文句", "游戏页存在可见长中文指令");
  check(noLongHan(homeHtml14), "首页(含盒子)无可见长中文句", "首页存在可见长中文指令");

  process.exitCode = failures === 0 ? 0 : 1;
})();
