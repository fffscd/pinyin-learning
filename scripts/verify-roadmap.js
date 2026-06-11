const fs = require("fs");
const vm = require("vm");

const phase = process.argv[2] || "all";
const source = fs.readFileSync("app.js", "utf8");
const styles = fs.readFileSync("styles.css", "utf8");
const expectedAudio = JSON.parse(fs.readFileSync("assets/audio/expected-files.json", "utf8"));
const audioManifest = JSON.parse(fs.readFileSync("assets/audio/manifest.json", "utf8"));
const timers = [];
let reducedMotion = false;
let failures = 0;

function check(condition, message) {
  if (condition) {
    console.log(`通过：${message}`);
    return;
  }
  console.error(`失败：${message}`);
  failures += 1;
}

function runTimers() {
  while (timers.length) {
    const callback = timers.shift();
    if (typeof callback === "function") callback();
  }
}

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
  navigator: {},
  matchMedia() {
    return { matches: reducedMotion };
  },
  Audio: function Audio() {
    return {
      addEventListener() {},
      pause() {},
      play() {
        return Promise.resolve();
      },
    };
  },
  fetch: () => Promise.reject(new Error("no network in vm")),
  localStorage: {
    getItem() {
      return null;
    },
    setItem() {},
    removeItem() {},
  },
  setTimeout(callback) {
    timers.push(callback);
    return timers.length;
  },
  clearTimeout() {},
};

async function loadApp() {
  await vm.runInNewContext(
    `(async () => {
      ${source}
      await globalThis.__pinyinInitPromise;
      globalThis.__roadmap = {
        state,
        app,
        COURSE_PLAN,
        HOME_MODE_CARDS,
        GARDEN_GAME_MODES,
        SR_INTERVALS,
        LESSON_SOFT_CAP_MS: typeof LESSON_SOFT_CAP_MS === "undefined" ? null : LESSON_SOFT_CAP_MS,
        getCourseStep: typeof getCourseStep === "undefined" ? null : getCourseStep,
        getDailyPlan,
        getLocalDateId,
        normalizeProgress,
        getLetterRecord,
        updateLetterSchedule,
        startRound,
        answer,
        nextQuestion,
        getQuestionAnswerId,
        homeView,
        gardenView,
        trainArt,
        resultView,
        advanceResultPhase: typeof advanceResultPhase === "undefined" ? null : advanceResultPhase,
        makeParentGateQuestion: typeof makeParentGateQuestion === "undefined" ? null : makeParentGateQuestion,
        handleClick,
        setLongPressFired(value) { longPressFired = value; },
        applySpotCheckResult: typeof applySpotCheckResult === "undefined" ? null : applySpotCheckResult,
        buildWeeklyReport: typeof buildWeeklyReport === "undefined" ? null : buildWeeklyReport,
        weeklyReportView: typeof weeklyReportView === "undefined" ? null : weeklyReportView,
        buildOfflineTasks: typeof buildOfflineTasks === "undefined" ? null : buildOfflineTasks,
        recordOfflineTask: typeof recordOfflineTask === "undefined" ? null : recordOfflineTask,
        availableUnlockCount: typeof availableUnlockCount === "undefined" ? null : availableUnlockCount,
        unlockDecoration: typeof unlockDecoration === "undefined" ? null : unlockDecoration,
        plantGardenItem: typeof plantGardenItem === "undefined" ? null : plantGardenItem,
        UNLOCK_CATALOG: typeof UNLOCK_CATALOG === "undefined" ? null : UNLOCK_CATALOG,
        recommendMolePace: typeof recommendMolePace === "undefined" ? null : recommendMolePace,
        recordMoleResult: typeof recordMoleResult === "undefined" ? null : recordMoleResult,
        SCENE_HUNT_SCENES: typeof SCENE_HUNT_SCENES === "undefined" ? null : SCENE_HUNT_SCENES,
        buildSceneHuntQuestions: typeof buildSceneHuntQuestions === "undefined" ? null : buildSceneHuntQuestions,
        buildFeedPracticeQuestions: typeof buildFeedPracticeQuestions === "undefined" ? null : buildFeedPracticeQuestions,
        recordVoiceAttempt: typeof recordVoiceAttempt === "undefined" ? null : recordVoiceAttempt,
        makeSyllableBuildQuestion,
        toneMarkedSyllable: typeof toneMarkedSyllable === "undefined" ? null : toneMarkedSyllable,
        buildCourse,
        ILLUSTRATION_IDS: typeof ILLUSTRATION_IDS === "undefined" ? null : ILLUSTRATION_IDS,
        hasIllustration: typeof hasIllustration === "undefined" ? null : hasIllustration,
        buildPicturePracticeQuestions,
        topbar,
      };
    })();`,
    context,
  );
  runTimers();
  return context.__roadmap;
}

function resetLearningState(t) {
  const today = t.getLocalDateId();
  t.state.progress = t.normalizeProgress({});
  t.state.progress.courseStartDate = today;
  t.state.muted = true;
  t.state.view = "home";
  t.state.todayCourse = null;
  t.state.questions = [];
  t.state.currentIndex = 0;
  timers.length = 0;
  return today;
}

function verifyLearning(t) {
  check(t.LESSON_SOFT_CAP_MS === 8 * 60 * 1000, "课程软时长固定为 8 分钟");

  check(typeof t.getCourseStep === "function", "存在课表周节律映射函数");
  if (t.getCourseStep) {
    check(t.getCourseStep(30, 31) === 30, "第 30 天保持原课表");
    check(t.getCourseStep(31, 31) === 31, "第 31 天进入第一个引入日");
    check(t.getCourseStep(36, 31) === 35, "第 36 天不消耗引入步");
    check(t.getCourseStep(37, 31) === 35, "第 37 天自由游戏不消耗引入步");
    check(t.getCourseStep(38, 31) === 36, "第 38 天继续下一个引入步");
    check(t.getCourseStep(40, 50) === 40 && t.getCourseStep(50, 50) === 50, "老用户节律生效日前后课表不回跳");
    const finalCourseDay = Array.from({ length: 365 }, (_, index) => index + 1)
      .find((dayIndex) => t.getCourseStep(dayIndex, 31) >= t.COURSE_PLAN.length);
    check(Boolean(finalCourseDay) && finalCourseDay <= 365, "全部引入内容仍可在一年内完成");
  }

  const reviewPlan = t.getDailyPlan(36, 31);
  const freePlan = t.getDailyPlan(37, 31);
  check(reviewPlan?.weeklyReview === true, "第 36 天生成周复习计划");
  check(freePlan?.freePlay === true, "第 37 天生成自由游戏计划");

  resetLearningState(t);
  t.state.progress.letters.a = {
    attempts: 4,
    correct: 3,
    box: 3,
    dueDay: 1,
    lastDay: 1,
    streak: 2,
    lastFailDay: null,
  };
  const todayNumber = 1;
  t.updateLetterSchedule("a", false);
  let record = t.getLetterRecord("a");
  check(record.box === 3 && record.dueDay === todayNumber, "当天首错不降盒并保持当天到期");
  t.updateLetterSchedule("a", false);
  record = t.getLetterRecord("a");
  check(record.box === 2 && record.dueDay === todayNumber + 1, "当天第二次错误才降盒");

  resetLearningState(t);
  t.state.progress.letters.a = {
    attempts: 4,
    correct: 3,
    box: 3,
    dueDay: 1,
    lastDay: 0,
    streak: 2,
    lastFailDay: 0,
  };
  t.updateLetterSchedule("a", false);
  record = t.getLetterRecord("a");
  check(record.box === 3 && record.lastFailDay === 1, "跨日后的第一次错误重新享受保护");

  resetLearningState(t);
  t.state.progress.letters.ba = {
    attempts: 3,
    correct: 2,
    box: 2,
    dueDay: 1,
    lastDay: 1,
    streak: 1,
    lastFailDay: null,
  };
  t.updateLetterSchedule("ba", true, "self");
  record = t.getLetterRecord("ba");
  check(record.box === 2 && record.dueDay === 1 + t.SR_INTERVALS[2], "认读自评通过只推迟复习不升盒");

  resetLearningState(t);
  t.startRound("lesson");
  const question = t.state.questions[0];
  const correct = t.getQuestionAnswerId(question);
  const wrongChoices = question.choices.filter((choice) => choice !== correct);
  t.answer(wrongChoices[0]);
  check(t.state.wrongCount === 1, "第一次错选进入温和重试");
  const attemptsAfterFirstWrong = t.getLetterRecord(question.target).attempts;
  runTimers();
  t.answer(wrongChoices[1] || wrongChoices[0]);
  check(t.state.revealing === true, "第二次错选进入点读确认");
  check(t.getLetterRecord(question.target).attempts === attemptsAfterFirstWrong, "同一题连续错选只记录一次错误");
  const starsBeforeConfirm = t.state.progress.stars;
  t.answer(correct);
  check(t.state.progress.stars === starsBeforeConfirm, "点读确认不增加星星");

  resetLearningState(t);
  t.startRound("lesson");
  t.state.roundStartedAt = Date.now() - 8 * 60 * 1000 - 1;
  t.state.answeredQuestionCount = 1;
  t.nextQuestion();
  check(t.state.view === "result", "课程超时后在当前题结束时到站收尾");
  check(t.state.todayCourse.completed === false, "超时且答题不足一半时不标记当日课程完成");

  resetLearningState(t);
  t.startRound("lesson");
  t.state.roundStartedAt = Date.now() - 8 * 60 * 1000 - 1;
  t.state.answeredQuestionCount = Math.ceil(t.state.questions.length / 2);
  t.nextQuestion();
  check(t.state.todayCourse.completed === true, "超时且已答过半时标记当日课程完成");

  resetLearningState(t);
  t.startRound("pictures");
  t.state.roundStartedAt = Date.now() - 20 * 60 * 1000;
  t.nextQuestion();
  check(t.state.view === "game" && t.state.currentIndex === 1, "花园小游戏不受课程软时长限制");
}

function verifyShell(t) {
  resetLearningState(t);
  const homeHtml = t.homeView();
  const starts = [...homeHtml.matchAll(/data-start="([^"]+)"/g)].map((match) => match[1]);
  check(starts.length === 1 && starts[0] === "lesson", "首页只有今日课程一个开始入口");

  const gardenModes = t.GARDEN_GAME_MODES.map((game) => game.mode);
  check(gardenModes.length === 10, "花园目录包含 10 个游戏入口");
  check(gardenModes.includes("tones") && gardenModes.includes("pictures"), "声调和拼音配图已收进花园");
  check((t.gardenView().match(/data-start=/g) || []).length === 8, "未解锁寻宝和麦克风时花园渲染 8 个入口");
  t.state.progress.settings.micEnabled = true;
  t.state.micAvailable = true;
  check(t.gardenView().includes('data-start="feed"'), "家长授权且运行时可用时花园显示发声玩法");

  resetLearningState(t);
  const freeDayStart = new Date();
  freeDayStart.setDate(freeDayStart.getDate() - 36);
  t.state.progress.courseStartDate = t.getLocalDateId(freeDayStart);
  t.state.progress.rhythmFromDay = 31;
  t.state.progress.courses = {};
  t.state.todayCourse = null;
  const freeDayHome = t.homeView();
  check(freeDayHome.includes('data-view="garden"') && !freeDayHome.includes('data-start="lesson"'), "花园日首页主卡直接进入花园");

  ["idle", "cheer", "soothe", "arrive"].forEach((expression) => {
    check(t.trainArt(expression).includes(`guide-${expression}`), `火车角色支持 ${expression} 表情`);
  });

  check(/--tap-min:\s*64px/.test(styles), "儿童端触控下限变量为 64px");
  check(/--tap-gap:\s*16px/.test(styles), "儿童端相邻目标间距变量为 16px");
  check(/touch-action:\s*manipulation/.test(styles), "儿童端按钮启用 manipulation 触控策略");

  check(typeof t.advanceResultPhase === "function", "结算页提供阶段推进函数");
  if (t.advanceResultPhase) {
    t.state.learnedItems = ["a", "o"];
    t.state.roundStars = 2;
    t.state.resultPhase = "stars";
    t.state.fullResultSequence = true;
    check(t.resultView().includes('data-result-phase="stars"'), "结算第一段展示落星");
    t.advanceResultPhase(false);
    check(t.state.resultPhase === "learned", "结算可推进到今日所学");
    check(t.resultView().includes('data-result-phase="learned"'), "结算第二段展示今日所学");
    t.advanceResultPhase(false);
    check(t.state.resultPhase === "tomorrow", "结算可推进到明日预告");
    check(t.resultView().includes('data-result-phase="tomorrow"'), "结算第三段展示明日预告");

    reducedMotion = true;
    t.state.resultPhase = "stars";
    const reducedResult = t.resultView();
    check(
      reducedResult.includes('data-static-phase="stars"') &&
        reducedResult.includes('data-static-phase="learned"') &&
        reducedResult.includes('data-static-phase="tomorrow"'),
      "减少动态效果时三段结算静态同屏展示",
    );
    reducedMotion = false;

    t.state.fullResultSequence = false;
    t.state.resultPhase = "stars";
    t.state.mode = "lesson";
    const replayResult = t.resultView();
    check(replayResult.includes('data-start="lesson"') && !replayResult.includes('data-static-phase='), "再练一轮只展示落星并提供重玩入口");
  }
}

function verifyParent(t) {
  const normalized = t.normalizeProgress({ muted: true });
  check(normalized.settings?.muted === true, "旧静音设置迁移到家长区 settings");
  check(normalized.settings?.micEnabled === false, "麦克风设置默认关闭");
  check(normalized.settings?.lessonMinutes === 8, "课程时长设置默认 8 分钟");

  check(typeof t.makeParentGateQuestion === "function", "存在家长算术门禁题生成器");
  if (t.makeParentGateQuestion) {
    const gate = t.makeParentGateQuestion(() => 0.4);
    check(gate.left + gate.right === gate.answer && gate.answer <= 10, "门禁为和不超过 10 的个位数加法");
    check(gate.options.length === 3 && new Set(gate.options).size === 3, "门禁提供三个不同数字选项");
    check(gate.options.includes(gate.answer), "门禁选项包含正确答案");
  }
  check(!t.topbar("测试").includes('data-action="toggle-mute"'), "儿童端顶栏不再暴露静音开关");

  resetLearningState(t);
  t.state.parentGate = { answer: 9 };
  t.state.view = "parent-gate";
  t.setLongPressFired(true);
  t.handleClick({
    target: {
      closest(selector) {
        if (selector === '[data-longpress="parent"]') return null;
        if (selector === "button") return { dataset: { gateAnswer: "9" } };
        return null;
      },
    },
  });
  check(t.state.view === "records", "长按入口未生成 click 时首个门禁答案仍然生效");

  const clickButton = (dataset) => t.handleClick({
    target: {
      closest(selector) {
        return selector === "button" ? { dataset } : null;
      },
    },
  });
  resetLearningState(t);
  t.state.view = "records";
  t.state.progress.stars = 7;
  clickButton({ action: "request-reset" });
  check(t.state.resetRequested === true && t.app.html.includes('id="reset-day"'), "重置进度先显示日期确认输入框");
  t.app.value = 99;
  clickButton({ action: "confirm-reset" });
  check(t.state.progress.stars === 7, "输入错误日期时不会清空学习记录");
  t.app.value = Number(t.getLocalDateId().slice(-2));
  clickButton({ action: "confirm-reset" });
  check(t.state.progress.stars === 0 && t.state.resetRequested === false, "输入当天日期后清空记录并关闭确认框");

  check(typeof t.applySpotCheckResult === "function", "存在家长抽查回写函数");
  if (t.applySpotCheckResult) {
    resetLearningState(t);
    t.state.progress.letters.ba = { attempts: 5, correct: 4, box: 4, dueDay: 1, lastDay: 1, streak: 2 };
    t.applySpotCheckResult("ba", true);
    check(t.getLetterRecord("ba").box === 5, "抽查读对按客观答题升盒");
    t.state.progress.letters.ba = { attempts: 6, correct: 5, box: 4, dueDay: 1, lastDay: 1, streak: 2 };
    t.applySpotCheckResult("ba", false);
    const failedSpot = t.getLetterRecord("ba");
    check(failedSpot.box === 2 && failedSpot.dueDay === 2 && failedSpot.streak === 0, "抽查失败强制回到第 2 盒并次日复习");
  }

  check(typeof t.buildWeeklyReport === "function", "存在家长周报汇总函数");
  if (t.buildWeeklyReport) {
    resetLearningState(t);
    const today = t.getLocalDateId();
    t.state.progress.dailyStats[today] = {
      date: today,
      dayIndex: 1,
      title: "D1",
      attempts: 10,
      correct: 8,
      completedAt: "2026-06-11T10:00:00.000Z",
      items: {},
      tones: {},
      weakItems: ["a"],
      spotChecks: { attempts: 2, correct: 1 },
      offlineTasks: { attempts: 1, correct: 1 },
    };
    t.state.progress.letters.a = { attempts: 4, correct: 1, box: 1, dueDay: 1, lastDay: 1, streak: 0 };
    const reportA = t.buildWeeklyReport(today);
    const reportB = t.buildWeeklyReport(today);
    check(reportA.attempts === 10 && reportA.correct === 8 && reportA.completedDays === 1, "周报汇总最近 7 日练习数据");
    check(reportA.weakItems[0]?.id === "a", "周报列出盒位最低的易忘项");
    check(JSON.stringify(reportA.tips) === JSON.stringify(reportB.tips), "同一周生活建议保持稳定");
    check(reportA.spotChecks.attempts === 2 && reportA.offlineCompleted === 1, "周报汇总抽查与线下任务");
    check(reportA.courseDay === 1 && t.weeklyReportView(reportA).includes("开课第 1 天"), "数据不足一周时周报显示开课天数");
  }

  check(typeof t.buildOfflineTasks === "function", "存在亲子任务卡生成函数");
  if (t.buildOfflineTasks) {
    resetLearningState(t);
    ["a", "o", "e"].forEach((id, index) => {
      t.state.progress.letters[id] = {
        attempts: 4,
        correct: 1,
        box: index,
        dueDay: 1,
        lastDay: 1,
        streak: 0,
      };
    });
    const tasksA = t.buildOfflineTasks(t.getLocalDateId());
    const tasksB = t.buildOfflineTasks(t.getLocalDateId());
    check(tasksA.length === 2, "每天最多生成两张亲子任务卡");
    check(tasksA.every((task) => ["a", "o", "e"].includes(task.id)), "任务卡来自易忘且到期的条目");
    check(JSON.stringify(tasksA) === JSON.stringify(tasksB), "同一天任务卡模板保持稳定");

    const taskId = tasksA[0].id;
    const boxBefore = t.getLetterRecord(taskId).box;
    t.recordOfflineTask(taskId, true);
    const taskStat = t.state.progress.dailyStats[t.getLocalDateId()];
    check(t.getLetterRecord(taskId).box === boxBefore + 1, "线下任务完成且会读时按客观答题升盒");
    check(taskStat.offlineTasks.attempts === 1 && taskStat.offlineTasks.correct === 1, "线下任务回填写入当日统计");

    resetLearningState(t);
    check(t.buildOfflineTasks(t.getLocalDateId()).length === 0, "没有易忘项时不生成线下任务卡");
  }
}

function verifyRewards(t) {
  const normalized = t.normalizeProgress({ stars: 40 });
  check(Array.isArray(normalized.unlocks) && normalized.unlocks.length === 0, "旧存档补空点亮列表");
  check(Array.isArray(normalized.garden) && normalized.garden.length === 0, "旧存档补空花园记录");
  check(normalized.activeTrainColor === "train-blue", "旧存档补默认火车配色");

  check(typeof t.availableUnlockCount === "function", "存在点亮机会计算函数");
  check(typeof t.unlockDecoration === "function", "存在装饰点亮函数");
  if (t.availableUnlockCount && t.unlockDecoration) {
    resetLearningState(t);
    t.state.progress.stars = 19;
    check(t.availableUnlockCount() === 0, "19 颗星没有点亮机会");
    t.state.progress.stars = 20;
    check(t.availableUnlockCount() === 1, "20 颗星获得一次点亮机会");
    const starsBefore = t.state.progress.stars;
    const firstUnlock = t.UNLOCK_CATALOG[0].id;
    check(t.unlockDecoration(firstUnlock) === true, "可用机会能点亮指定装饰");
    check(t.state.progress.stars === starsBefore, "点亮装饰不扣减星星");
    check(t.availableUnlockCount() === 0, "使用一次机会后可用次数归零");
    t.state.progress.stars = 40;
    check(t.availableUnlockCount() === 1, "40 颗星且已点亮一项时还有一次机会");
    const secondUnlock = t.UNLOCK_CATALOG[1].id;
    check(t.unlockDecoration(secondUnlock) === true && t.state.progress.stars === 40, "第二次点亮仍不扣减累计星星");
  }

  check(typeof t.plantGardenItem === "function", "存在花园种植函数");
  if (t.plantGardenItem) {
    resetLearningState(t);
    const today = t.getLocalDateId();
    check(t.plantGardenItem("a", today) === true, "当日首次完成可种植一株");
    check(t.plantGardenItem("o", today) === false, "同一天不会重复种植");
    check(t.state.progress.garden.length === 1 && t.state.progress.garden[0].id === "a", "花园保存拼音与种植日期");
    t.state.view = "garden";
    t.handleClick({
      target: {
        closest(selector) {
          return selector === "button" ? { dataset: { gardenPlant: "a" } } : null;
        },
      },
    });
    check(t.state.gardenPlantOpen === "a" && t.app.html.includes('class="garden-plant-overlay"'), "点击植物打开对应拼音浮层");
    t.state.progress.garden = Array.from({ length: 366 }, (_, index) => ({ id: "a", date: `x-${index}` }));
    check(t.plantGardenItem("o", "future") === false, "花园记录上限为 366 株");
  }
}

function verifyGames(t) {
  check(typeof t.recommendMolePace === "function", "存在打地鼠节奏推荐函数");
  if (t.recommendMolePace) {
    check(t.recommendMolePace([0.9, 0.8, 1]) === "challenge", "近期正确率达到 80% 推荐挑战档");
    check(t.recommendMolePace([0.7, 0.8, 0.7]) === "calm", "近期正确率不足 80% 保持慢档");
  }
  check(typeof t.recordMoleResult === "function", "存在打地鼠会话降档函数");
  if (t.recordMoleResult) {
    t.state.molePace = "challenge";
    t.state.moleWrongStreak = 0;
    t.recordMoleResult(false);
    t.recordMoleResult(false);
    check(t.state.molePace === "calm", "挑战档连续错两题自动退回慢档");
  }

  check(Array.isArray(t.SCENE_HUNT_SCENES) && t.SCENE_HUNT_SCENES.length >= 1, "至少提供一张拼音寻宝场景");
  check(typeof t.buildSceneHuntQuestions === "function", "存在寻宝题目生成函数");
  if (t.buildSceneHuntQuestions && t.SCENE_HUNT_SCENES?.length) {
    const scene = t.SCENE_HUNT_SCENES[0];
    const questions = t.buildSceneHuntQuestions(scene.id);
    check(questions.length === scene.spots.length, "寻宝一轮覆盖场景全部物品");
    check(new Set(questions.map((question) => question.target)).size === scene.spots.length, "寻宝题序不重复目标物品");

    resetLearningState(t);
    t.state.view = "game";
    t.state.mode = "hunt";
    t.state.questions = questions;
    t.state.currentIndex = 0;
    t.state.sceneFoundIds = [];
    const huntQuestion = questions[0];
    const wrongIds = scene.spots.map((spot) => spot.itemId).filter((id) => id !== huntQuestion.target);
    t.answer(wrongIds[0]);
    runTimers();
    t.answer(wrongIds[1]);
    t.answer(huntQuestion.target);
    check(t.state.sceneFoundIds.includes(huntQuestion.target), "寻宝二错点读确认后仍标记目标已找到");
  }

  check(typeof t.buildFeedPracticeQuestions === "function", "存在喂动物发声题生成函数");
  if (t.buildFeedPracticeQuestions) {
    resetLearningState(t);
    const questions = t.buildFeedPracticeQuestions();
    check(questions.length === 5 && questions.every((question) => question.type === "voice-attempt"), "喂动物每轮生成 5 道发声题");
    const target = questions[0].target;
    const attemptsBefore = t.getLetterRecord(target).attempts;
    const starsBefore = t.state.progress.stars;
    t.recordVoiceAttempt(questions[0]);
    check(t.getLetterRecord(target).attempts === attemptsBefore, "发声尝试不更新 Leitner 盒子");
    check(t.state.progress.stars === starsBefore + 1, "完成发声尝试获得一颗星");
  }
}

function verifyTonedBlend(t) {
  check(typeof t.toneMarkedSyllable === "function", "存在带调音节标记函数");
  if (t.toneMarkedSyllable) {
    check(t.toneMarkedSyllable("ba", 1) === "bā", "一声标记位置正确");
    check(t.toneMarkedSyllable("bo", 3) === "bǒ", "三声标记位置正确");
  }

  resetLearningState(t);
  [1, 2, 3, 4].forEach((tone) => {
    const base = `assets/audio/syllable-tone/ba${tone}`;
    t.state.audioByBase.set(base, `${base}.webm`);
  });
  const toned = t.makeSyllableBuildQuestion("ba", () => 0, { withTone: true });
  check(toned.withTone === true && toned.targetTone === 1, "四声音频齐全时拼读题启用第三段");
  check(toned.toneChoices?.length === 4 && toned.tonedLabel === "bā", "带调拼读题包含四条轨迹和目标标记");

  t.state.audioByBase.delete("assets/audio/syllable-tone/ba4");
  const fallback = t.makeSyllableBuildQuestion("ba", () => 0, { withTone: true });
  check(fallback.withTone === false, "缺少任一带调音频时自动回退两段拼读");
  const introduction = t.makeSyllableBuildQuestion("ba", () => 0, { withTone: false });
  check(introduction.withTone === false, "引入期保持两段拼读");

  expectedAudio.recordings["syllable-tone"].forEach((base) => {
    t.state.audioByBase.set(base, `${base}.webm`);
  });
  t.state.progress.rhythmFromDay = 31;
  const reviewDay = Array.from({ length: 365 }, (_, index) => index + 1)
    .find((dayIndex) => t.getCourseStep(dayIndex, 31) > t.COURSE_PLAN.length);
  const reviewCourse = t.buildCourse(t.getLocalDateId(), reviewDay, {
    title: "综合复习",
    focus: "综合复习",
    newItems: [],
    reviewItems: [],
    blend: true,
    read: true,
    useWeakReview: true,
    questionCount: 8,
  });
  check(reviewCourse.questions.some((question) => question.type === "syllable-build" && question.withTone), "综合复习课程实际生成带调拼读题");

  check(
    expectedAudio.recordings?.["syllable-tone"]?.length === 124,
    "音频期望清单包含 31 个音节的四声资源",
  );
}

function verifyIllustrations(t) {
  check(Array.isArray(t.ILLUSTRATION_IDS) && t.ILLUSTRATION_IDS.length >= 25, "插画覆盖 id 以显式常量维护");
  check(typeof t.hasIllustration === "function", "存在手绘插画覆盖判断函数");
  if (t.hasIllustration) {
    check(t.hasIllustration("a") === true && t.hasIllustration("ai") === false, "插画覆盖判断与现有 SVG 一致");
    check(["o", "e", "i", "u"].every((id) => t.hasIllustration(id)), "抽查五个已覆盖插画 id 与代码清单一致");
  }

  resetLearningState(t);
  t.state.progress.courseStartDate = "2020-01-01";
  const questions = t.buildPicturePracticeQuestions();
  check(questions.every((question) => t.hasIllustration?.(question.target)), "配图自由练习优先选择已有手绘插画");

  check(fs.existsSync("scripts/report-missing-illustrations.js"), "存在缺图清单生成脚本");
  check(fs.existsSync("docs/illustration-style-guide.md"), "存在插画风格规范");
  check(fs.existsSync("docs/illustration-backlog.md"), "存在按课表排序的插画 backlog");
}

function verifyAudioQa() {
  check(fs.existsSync("docs/audio-qa-checklist.md"), "存在全量音频人工核验清单");
  if (!fs.existsSync("docs/audio-qa-checklist.md")) return;
  const qa = fs.readFileSync("docs/audio-qa-checklist.md", "utf8");
  const fileRows = (qa.match(/\| `assets\/audio\//g) || []).length;
  check(fileRows === audioManifest.files.length, "音频核验清单逐条覆盖 manifest");
  check(qa.includes("| 文件 | 条目 id | 类型 |"), "音频核验清单包含独立条目 id 列");
  check(qa.includes("声调正确") && qa.includes("音段正确") && qa.includes("可懂度"), "核验清单包含三项人工判断");
  ["读音", "例词", "提示音", "声调", "带调拼读"].forEach((type) => {
    check(qa.includes(`| ${type} |`), `核验清单包含${type}分组`);
  });
  const importSource = fs.readFileSync("scripts/import-recordings.js", "utf8");
  check(importSource.includes("loudnorm=I=-18:TP=-2:LRA=11"), "真人录音导入流程执行响度归一");
}

(async () => {
  const t = await loadApp();
  if (phase === "learning" || phase === "all") verifyLearning(t);
  if (phase === "shell" || phase === "all") verifyShell(t);
  if (phase === "parent" || phase === "all") verifyParent(t);
  if (phase === "rewards" || phase === "all") verifyRewards(t);
  if (phase === "games" || phase === "all") verifyGames(t);
  if (phase === "toned-blend" || phase === "all") verifyTonedBlend(t);
  if (phase === "illustrations" || phase === "all") verifyIllustrations(t);
  if (phase === "audio-qa" || phase === "all") verifyAudioQa();
  process.exitCode = failures === 0 ? 0 : 1;
})();
