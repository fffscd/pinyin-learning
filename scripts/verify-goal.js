const fs = require("fs");
const vm = require("vm");
const { spawnSync } = require("child_process");

function fail(message) {
  console.error(`失败：${message}`);
  process.exitCode = 1;
}

function pass(message) {
  console.log(`通过：${message}`);
}

const source = fs.readFileSync("app.js", "utf8");
const app = {
  html: "",
  addEventListener() {},
  set innerHTML(value) {
    this.html = value;
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
  Audio: function Audio() {},
  setTimeout() {},
};

(async () => {
  await vm.runInNewContext(
    `(async () => {
      ${source}
      await globalThis.__pinyinInitPromise;
      const renderedHome = app.innerHTML;
      const gardenRounds = GARDEN_GAME_MODES.map((game) => {
        startRound(game.mode);
        return {
          mode: game.mode,
          title: state.roundTitle,
          questionCount: state.questions.length,
          questionTypes: state.questions.map((question) => question.type),
          firstQuestion: state.questions[0],
          renderedGame: app.innerHTML,
        };
      });
      globalThis.__snapshot = {
        itemIds: PINYIN_ITEMS.map((item) => item.id),
        courseDays: COURSE_PLAN_30_DAYS.length,
        toneIds: TONE_ITEMS.map((tone) => tone.id),
        todayCourse: state.todayCourse,
        hasSpeechSynthesisReference: /speechSynthesis|SpeechSynthesisUtterance/.test(${JSON.stringify(source)}),
        hasPictureQuestions: COURSE_PLAN_30_DAYS.some((day) => Array.isArray(day.pictureItems) && day.pictureItems.length > 0),
        hasToneQuestions: COURSE_PLAN_30_DAYS.some((day) => Array.isArray(day.toneItems) && day.toneItems.length > 0),
        gardenModes: GARDEN_GAME_MODES.map((game) => game.mode),
        gardenTitles: GARDEN_GAME_MODES.map((game) => game.title),
        gardenRounds,
        renderedHome,
      };
    })();`,
    context,
  );

const snapshot = context.__snapshot;
const requiredInitials = ["b", "p", "m", "f", "d", "t", "n", "l"];
const missingInitials = requiredInitials.filter((id) => !snapshot.itemIds.includes(id));

if (snapshot.courseDays === 30) {
  pass("30 天课程表存在");
} else {
  fail(`课程表天数为 ${snapshot.courseDays}`);
}

if (snapshot.todayCourse && snapshot.todayCourse.date && snapshot.todayCourse.questions.length >= 5) {
  pass("按日期生成了今日课程");
} else {
  fail("今日课程未生成或题量不足");
}

if (missingInitials.length === 0) {
  pass("基础声母 b/p/m/f/d/t/n/l 已接入题库");
} else {
  fail(`缺少基础声母：${missingInitials.join("/")}`);
}

if (snapshot.toneIds.length >= 12 && snapshot.hasToneQuestions) {
  pass("声调感知题库和课程入口存在");
} else {
  fail("声调感知题库或课程入口缺失");
}

const pinyinPictureRound = snapshot.gardenRounds.find((round) => round.mode === "pinyin-pictures");
const pinyinPictureOk =
  pinyinPictureRound && pinyinPictureRound.questionTypes.every((type) => type === "pinyin-picture-choice");
if (snapshot.hasPictureQuestions && pinyinPictureOk) {
  pass("拼音配图玩法入口和题型存在");
} else {
  fail("拼音配图玩法入口或题型缺失");
}

const expectedGardenModes = ["word", "pinyin-pictures", "flowers", "baskets", "moles"];
const missingGardenModes = expectedGardenModes.filter((mode) => !snapshot.gardenModes.includes(mode));
const gardenTypeExpectations = {
  word: "word-choice",
  "pinyin-pictures": "pinyin-picture-choice",
  flowers: "syllable-build",
  baskets: "category-choice",
  moles: "mole-choice",
};
const brokenGardenRounds = snapshot.gardenRounds.filter((round) => {
  const expectedType = gardenTypeExpectations[round.mode];
  return round.questionCount < 5 || !round.questionTypes.every((type) => type === expectedType);
});

if (missingGardenModes.length === 0 && brokenGardenRounds.length === 0) {
  pass("游戏花园 5 种玩法入口和题型存在");
} else {
  fail(
    `游戏花园校验失败：缺少模式 ${missingGardenModes.join("/") || "无"}，异常轮次 ${
      brokenGardenRounds.map((round) => round.mode).join("/") || "无"
    }`,
  );
}

const flowerRound = snapshot.gardenRounds.find((round) => round.mode === "flowers");
if (flowerRound?.firstQuestion?.targetInitial && flowerRound?.firstQuestion?.targetFinal) {
  pass("声韵拼花包含声母和韵母两段选择数据");
} else {
  fail("声韵拼花缺少两段选择数据");
}

const moleRound = snapshot.gardenRounds.find((round) => round.mode === "moles");
if (moleRound?.renderedGame?.includes("mole-yard") && moleRound?.firstQuestion?.choices?.length >= 3) {
  pass("打地鼠拼音包含地鼠选项界面");
} else {
  fail("打地鼠拼音界面或选项数据缺失");
}

if (!snapshot.hasSpeechSynthesisReference && source.includes("new Audio(")) {
  pass("已移除浏览器语音合成并改用本地音频播放");
} else {
  fail("仍存在浏览器语音合成引用，或未使用本地音频播放");
}

const audioResult = spawnSync(process.execPath, ["scripts/verify-audio-assets.js", "--summary"], {
  encoding: "utf8",
});

if (audioResult.status === 0) {
  pass("真人录音素材完整并通过校验");
} else {
  fail("真人录音素材未通过校验");
  process.stderr.write(audioResult.stderr || audioResult.stdout);
}
})();
