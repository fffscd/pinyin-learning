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

  process.exitCode = failures === 0 ? 0 : 1;
})();
