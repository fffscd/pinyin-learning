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

  process.exitCode = failures === 0 ? 0 : 1;
})();
