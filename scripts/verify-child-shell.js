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

  process.exitCode = failures === 0 ? 0 : 1;
})();
