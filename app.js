const LETTERS = [
  { id: "a", label: "a", sound: "啊", word: "阿姨", color: "#4b8fe8" },
  { id: "o", label: "o", sound: "喔", word: "公鸡喔喔叫", color: "#35a56a" },
  { id: "e", label: "e", sound: "鹅", word: "白鹅", color: "#d85a45" },
  { id: "i", label: "i", sound: "衣", word: "衣服", color: "#8b5cf6" },
  { id: "u", label: "u", sound: "乌", word: "乌云", color: "#0f9f9a" },
  { id: "ü", label: "ü", sound: "迂", word: "小鱼", color: "#c46a1c" },
];

const STORAGE_KEY = "pinyin-train-progress-v1";
const ROUND_SIZE = 5;

const state = {
  view: "home",
  mode: "lesson",
  muted: false,
  questions: [],
  currentIndex: 0,
  selected: "",
  feedback: "",
  answered: false,
  learnedLetters: [],
  progress: {
    completedRounds: 0,
    muted: false,
    letters: {},
  },
};

const app = document.querySelector("#app");

function icon(name) {
  const icons = {
    play: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path class="icon-fill" d="M8 5.5v13l10-6.5-10-6.5Z"/></svg>',
    volume: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M16 9.5c1.2 1.4 1.2 3.6 0 5"/><path d="M18.5 7c2.4 2.8 2.4 7.2 0 10"/></svg>',
    mute: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 9l4 4"/><path d="M21 9l-4 4"/></svg>',
    home: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11.5 12 5l8 6.5"/><path d="M6.5 10.5V20h11v-9.5"/><path d="M10 20v-5h4v5"/></svg>',
    repeat: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 2.5 21 6l-4 3.5"/><path d="M3 11V9a3 3 0 0 1 3-3h15"/><path d="m7 21.5-4-3.5L7 14.5"/><path d="M21 13v2a3 3 0 0 1-3 3H3"/></svg>',
    chart: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V9"/><path d="M12 19V5"/><path d="M19 19v-7"/><path d="M3 19h18"/></svg>',
    cards: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7h10v13H7z"/><path d="M4 4h10"/><path d="M4 4v13"/></svg>',
    train: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12a2 2 0 0 1 2 2v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2Z"/><path d="M7 9h10"/><path d="M8 18l-2 3"/><path d="M16 18l2 3"/><path d="M9 14h.01"/><path d="M15 14h.01"/></svg>',
  };

  return icons[name] || "";
}

function trainArt() {
  return `
    <svg class="train-scene" viewBox="0 0 420 300" role="img" aria-label="拼音小火车">
      <rect x="22" y="226" width="376" height="8" rx="4" fill="#5f738a"/>
      <circle cx="82" cy="238" r="12" fill="#223047"/>
      <circle cx="172" cy="238" r="12" fill="#223047"/>
      <circle cx="264" cy="238" r="12" fill="#223047"/>
      <circle cx="348" cy="238" r="12" fill="#223047"/>
      <rect x="46" y="120" width="108" height="92" rx="8" fill="#4b8fe8" stroke="#223047" stroke-width="5"/>
      <rect x="70" y="88" width="60" height="42" rx="8" fill="#ffe9a6" stroke="#223047" stroke-width="5"/>
      <rect x="166" y="144" width="84" height="68" rx="8" fill="#ffb8a4" stroke="#223047" stroke-width="5"/>
      <rect x="264" y="144" width="84" height="68" rx="8" fill="#dff5df" stroke="#223047" stroke-width="5"/>
      <path d="M154 176h12M250 176h14" stroke="#223047" stroke-width="5" stroke-linecap="round"/>
      <text x="100" y="178" text-anchor="middle" font-size="46" font-weight="900" fill="#fff">a</text>
      <text x="208" y="190" text-anchor="middle" font-size="42" font-weight="900" fill="#223047">o</text>
      <text x="306" y="190" text-anchor="middle" font-size="42" font-weight="900" fill="#223047">e</text>
      <path d="M50 111c-14-24 7-41 25-26" stroke="#35a56a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M190 90c28-30 70-20 82 18" stroke="#d85a45" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M310 88c24 4 44 23 50 48" stroke="#c46a1c" stroke-width="7" fill="none" stroke-linecap="round"/>
    </svg>
  `;
}

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    state.progress = {
      completedRounds: Number(saved.completedRounds || 0),
      muted: Boolean(saved.muted),
      letters: saved.letters && typeof saved.letters === "object" ? saved.letters : {},
    };
    state.muted = state.progress.muted;
  } catch {
    state.progress = { completedRounds: 0, muted: false, letters: {} };
  }
}

function saveProgress() {
  state.progress.muted = state.muted;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.progress));
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  return (
    voices.find((voice) => voice.lang === "zh-CN") ||
    voices.find((voice) => voice.lang.startsWith("zh")) ||
    null
  );
}

function speak(text, options = {}) {
  if (state.muted || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = options.rate || 0.82;
  utterance.pitch = options.pitch || 1.08;
  utterance.volume = 1;
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
}

function getLetter(id) {
  return LETTERS.find((item) => item.id === id);
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function makeQuestion(target) {
  const distractors = shuffle(LETTERS.filter((item) => item.id !== target.id))
    .slice(0, 2)
    .map((item) => item.id);

  return {
    target: target.id,
    choices: shuffle([target.id, ...distractors]),
  };
}

function startRound(mode = "lesson") {
  const sequence = shuffle(LETTERS).slice(0, ROUND_SIZE);
  state.view = "game";
  state.mode = mode;
  state.questions = sequence.map(makeQuestion);
  state.currentIndex = 0;
  state.selected = "";
  state.feedback = "听一听，找找这个声音。";
  state.answered = false;
  state.learnedLetters = [];
  render();
  setTimeout(() => speakCurrentPrompt(), 180);
}

function speakCurrentPrompt() {
  const question = state.questions[state.currentIndex];
  if (!question) return;
  const target = getLetter(question.target);
  speak(`请找到这个声音，${target.sound}`);
}

function speakCurrentSound() {
  const question = state.questions[state.currentIndex];
  if (!question) return;
  const target = getLetter(question.target);
  speak(target.sound, { rate: 0.72, pitch: 1.04 });
}

function answer(choice) {
  if (state.answered) return;

  const question = state.questions[state.currentIndex];
  const target = getLetter(question.target);
  const isCorrect = choice === question.target;
  const record = state.progress.letters[target.id] || { attempts: 0, correct: 0 };

  state.selected = choice;
  state.answered = true;
  record.attempts += 1;
  if (isCorrect) {
    record.correct += 1;
    state.feedback = `找到啦，${target.label}，读作${target.sound}。`;
    state.learnedLetters.push(target.id);
    speak(`找到啦，${target.sound}`);
  } else {
    state.feedback = `再听一听，找找${target.sound}。`;
    speak(`再听一听，${target.sound}`);
  }
  state.progress.letters[target.id] = record;
  saveProgress();
  render();

  const delay = isCorrect ? 900 : 1150;
  setTimeout(() => {
    if (isCorrect) {
      nextQuestion();
    } else {
      state.answered = false;
      state.selected = "";
      render();
      speakCurrentPrompt();
    }
  }, delay);
}

function nextQuestion() {
  if (state.currentIndex + 1 >= state.questions.length) {
    state.progress.completedRounds += 1;
    saveProgress();
    state.view = "result";
    state.feedback = "";
    render();
    speak("这一轮完成啦");
    return;
  }

  state.currentIndex += 1;
  state.selected = "";
  state.feedback = "听一听，找找这个声音。";
  state.answered = false;
  render();
  setTimeout(() => speakCurrentPrompt(), 160);
}

function goHome() {
  window.speechSynthesis?.cancel?.();
  state.view = "home";
  state.selected = "";
  state.feedback = "";
  render();
}

function toggleMute() {
  state.muted = !state.muted;
  if (state.muted) {
    window.speechSynthesis?.cancel?.();
  } else {
    speak("声音打开啦");
  }
  saveProgress();
  render();
}

function resetProgress() {
  state.progress = { completedRounds: 0, muted: state.muted, letters: {} };
  saveProgress();
  render();
}

function topbar(subtitle = "听一听，找拼音") {
  return `
    <header class="topbar">
      <div class="brand">
        <svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="8" y="22" width="34" height="24" rx="8" fill="#4b8fe8" stroke="#223047" stroke-width="4"/>
          <rect x="17" y="12" width="18" height="16" rx="5" fill="#ffe9a6" stroke="#223047" stroke-width="4"/>
          <rect x="43" y="30" width="14" height="16" rx="5" fill="#ffb8a4" stroke="#223047" stroke-width="4"/>
          <circle cx="18" cy="50" r="5" fill="#223047"/>
          <circle cx="44" cy="50" r="5" fill="#223047"/>
        </svg>
        <div class="brand-copy">
          <h1 class="brand-title">拼音小火车</h1>
          <p class="brand-subtitle">${subtitle}</p>
        </div>
      </div>
      <nav class="toolbar" aria-label="页面操作">
        <button class="icon-button" type="button" data-action="toggle-mute" aria-label="${state.muted ? "打开声音" : "关闭声音"}" title="${state.muted ? "打开声音" : "关闭声音"}">
          ${state.muted ? icon("mute") : icon("volume")}
        </button>
        <button class="text-button" type="button" data-view="home">
          ${icon("home")} 首页
        </button>
      </nav>
    </header>
  `;
}

function homeView() {
  return `
    <main class="screen">
      ${topbar("单韵母小练习")}
      <section class="hero-band" aria-labelledby="home-title">
        <div class="welcome-copy">
          <h2 id="home-title" class="welcome-title">坐上小火车，听声音找拼音</h2>
          <p class="welcome-note">今天学习 a、o、e、i、u、ü。每轮 5 题，答完就能收集车厢。</p>
          <div class="hero-actions">
            <button class="primary-button" type="button" data-start="lesson">
              ${icon("play")} 开始学习
            </button>
            <button class="text-button" type="button" data-view="practice">
              ${icon("cards")} 自由练习
            </button>
            <button class="text-button" type="button" data-view="records">
              ${icon("chart")} 学习记录
            </button>
          </div>
        </div>
        ${trainArt()}
      </section>
      <section class="section" aria-labelledby="mode-title">
        <h2 id="mode-title" class="section-title">今天的入口</h2>
        <div class="mode-grid">
          <button class="mode-card" type="button" data-start="lesson">
            <span class="mode-art">${icon("train")}</span>
            <span><strong>开始学习</strong><span>5 题一轮，听音找单韵母。</span></span>
          </button>
          <button class="mode-card" type="button" data-view="practice">
            <span class="mode-art">${icon("volume")}</span>
            <span><strong>自由练习</strong><span>点拼音卡片，反复听读音。</span></span>
          </button>
          <button class="mode-card" type="button" data-view="records">
            <span class="mode-art">${icon("chart")}</span>
            <span><strong>学习记录</strong><span>查看已完成轮数和练习次数。</span></span>
          </button>
        </div>
      </section>
    </main>
  `;
}

function gameView() {
  const question = state.questions[state.currentIndex];
  const target = getLetter(question.target);
  const progress = ((state.currentIndex + Number(state.answered)) / ROUND_SIZE) * 100;

  return `
    <main class="screen">
      ${topbar("听音找单韵母")}
      <section class="game-layout" aria-labelledby="game-title">
        <div class="progress-row">
          <span class="progress-text">第 ${state.currentIndex + 1}/${ROUND_SIZE} 题</span>
          <div class="progress-track" aria-label="学习进度">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <button class="text-button" type="button" data-action="repeat-prompt">
            ${icon("repeat")} 再听一次
          </button>
        </div>
        <div class="question-stage">
          <div class="sound-panel">
            <button class="sound-disc" type="button" data-action="repeat-sound" aria-label="播放拼音声音">
              <span class="sound-letter" style="color: ${target.color}">?</span>
            </button>
            <p class="sound-prompt" id="game-title">听一听，找到对应的拼音</p>
          </div>
          <div class="choices" role="list" aria-label="拼音选项">
            ${question.choices
              .map((id) => {
                const item = getLetter(id);
                const className =
                  state.selected === id
                    ? id === question.target
                      ? "choice-button correct"
                      : "choice-button wrong"
                    : "choice-button";
                return `
                  <button class="${className}" type="button" data-answer="${id}" aria-label="选择 ${item.label}">
                    <span>${item.label}</span>
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>
        <div class="feedback-row">
          <p class="feedback">${state.feedback}</p>
          <button class="text-button" type="button" data-view="home">
            ${icon("home")} 返回
          </button>
        </div>
      </section>
    </main>
  `;
}

function practiceView() {
  return `
    <main class="screen">
      ${topbar("自由练习")}
      <section class="practice-grid" aria-label="单韵母卡片">
        ${LETTERS.map(
          (item) => `
            <button class="letter-card" type="button" data-practice="${item.id}">
              <span class="letter-symbol" style="color: ${item.color}">${item.label}</span>
              <span class="letter-word">${item.word}</span>
              <span class="text-button" aria-hidden="true">${icon("volume")} 听一听</span>
            </button>
          `,
        ).join("")}
      </section>
    </main>
  `;
}

function recordsView() {
  const entries = LETTERS.map((letter) => {
    const record = state.progress.letters[letter.id] || { attempts: 0, correct: 0 };
    return { letter, record };
  });
  const hasAny = entries.some(({ record }) => record.attempts > 0);

  return `
    <main class="screen">
      ${topbar("学习记录")}
      <section class="record-panel" aria-labelledby="record-title">
        <h2 id="record-title" class="section-title">今日小火车</h2>
        <p class="empty-note">已完成 ${state.progress.completedRounds} 轮学习。</p>
        ${
          hasAny
            ? `<div class="stats-grid">
                ${entries
                  .map(
                    ({ letter, record }) => `
                      <div class="stat-tile">
                        <div class="stat-letter" style="color: ${letter.color}">${letter.label}</div>
                        <div class="stat-copy">练习 ${record.attempts} 次<br />答对 ${record.correct} 次</div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>`
            : `<p class="empty-note">开始一轮学习后，这里会出现拼音练习记录。</p>`
        }
        <div class="hero-actions" style="margin-top: 18px">
          <button class="primary-button" type="button" data-start="lesson">${icon("play")} 开始学习</button>
          <button class="text-button" type="button" data-action="reset-progress">${icon("repeat")} 清空记录</button>
        </div>
      </section>
    </main>
  `;
}

function resultView() {
  const learned = [...new Set(state.learnedLetters)].map(getLetter);
  return `
    <main class="screen">
      ${topbar("本轮完成")}
      <section class="result-panel" aria-labelledby="result-title">
        <h2 id="result-title" class="result-title">小火车到站啦</h2>
        <p class="result-subtitle">这一轮听到了 ${learned.map((item) => item.label).join("、")}。</p>
        <div class="carriage-line" aria-label="本轮车厢">
          ${learned
            .map(
              (item) => `
                <div class="carriage" style="background: ${item.color}33; border-color: ${item.color}; color: ${item.color}">
                  ${item.label}
                </div>
              `,
            )
            .join("")}
        </div>
        <div class="hero-actions">
          <button class="primary-button" type="button" data-start="lesson">${icon("repeat")} 再玩一次</button>
          <button class="text-button" type="button" data-view="practice">${icon("cards")} 自由练习</button>
          <button class="text-button" type="button" data-view="records">${icon("chart")} 学习记录</button>
        </div>
      </section>
    </main>
  `;
}

function render() {
  const views = {
    home: homeView,
    game: gameView,
    practice: practiceView,
    records: recordsView,
    result: resultView,
  };
  app.innerHTML = views[state.view]();
}

function handleClick(event) {
  const button = event.target.closest("button");
  if (!button) return;

  const view = button.dataset.view;
  const start = button.dataset.start;
  const answerId = button.dataset.answer;
  const practiceId = button.dataset.practice;
  const action = button.dataset.action;

  if (view) {
    window.speechSynthesis?.cancel?.();
    state.view = view;
    render();
    return;
  }

  if (start) {
    startRound(start);
    return;
  }

  if (answerId) {
    answer(answerId);
    return;
  }

  if (practiceId) {
    const letter = getLetter(practiceId);
    const record = state.progress.letters[letter.id] || { attempts: 0, correct: 0 };
    record.attempts += 1;
    state.progress.letters[letter.id] = record;
    saveProgress();
    speak(`${letter.sound}，${letter.word}`);
    return;
  }

  if (action === "toggle-mute") {
    toggleMute();
    return;
  }

  if (action === "repeat-prompt") {
    speakCurrentPrompt();
    return;
  }

  if (action === "repeat-sound") {
    speakCurrentSound();
    return;
  }

  if (action === "reset-progress") {
    resetProgress();
  }
}

app.addEventListener("click", handleClick);

if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => pickVoice();
}

loadProgress();
render();
