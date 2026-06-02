const PINYIN_ITEMS = [
  { id: "a", type: "final", label: "a", sound: "啊", word: "阿姨", emoji: "😮", color: "#4b8fe8" },
  { id: "o", type: "final", label: "o", sound: "喔", word: "公鸡喔喔叫", emoji: "🐓", color: "#35a56a" },
  { id: "e", type: "final", label: "e", sound: "鹅", word: "白鹅", emoji: "🦢", color: "#d85a45" },
  { id: "i", type: "final", label: "i", sound: "衣", word: "衣服", emoji: "👕", color: "#8b5cf6" },
  { id: "u", type: "final", label: "u", sound: "乌", word: "乌云", emoji: "☁️", color: "#0f9f9a" },
  { id: "ü", type: "final", label: "ü", sound: "迂", word: "小鱼", emoji: "🐟", color: "#c46a1c" },
  { id: "b", type: "initial", label: "b", sound: "玻", word: "爸爸", emoji: "👨", color: "#2563eb" },
  { id: "p", type: "initial", label: "p", sound: "坡", word: "苹果", emoji: "🍎", color: "#dc2626" },
  { id: "m", type: "initial", label: "m", sound: "摸", word: "妈妈", emoji: "👩", color: "#be185d" },
  { id: "f", type: "initial", label: "f", sound: "佛", word: "风车", emoji: "🌀", color: "#0891b2" },
  { id: "d", type: "initial", label: "d", sound: "得", word: "小鼓", emoji: "🥁", color: "#ca8a04" },
  { id: "t", type: "initial", label: "t", sound: "特", word: "小伞", emoji: "☂️", color: "#7c3aed" },
  { id: "n", type: "initial", label: "n", sound: "讷", word: "奶奶", emoji: "🍼", color: "#16a34a" },
  { id: "l", type: "initial", label: "l", sound: "勒", word: "气球", emoji: "🎈", color: "#ea580c" },
  { id: "ba", type: "syllable", label: "ba", sound: "巴", word: "爸爸", emoji: "👨‍👧", color: "#1d4ed8" },
  { id: "pa", type: "syllable", label: "pa", sound: "趴", word: "爬坡", emoji: "⛰️", color: "#b91c1c" },
  { id: "ma", type: "syllable", label: "ma", sound: "妈", word: "妈妈", emoji: "🤱", color: "#be123c" },
  { id: "fa", type: "syllable", label: "fa", sound: "发", word: "发芽", emoji: "🌱", color: "#047857" },
  { id: "bo", type: "syllable", label: "bo", sound: "波", word: "菠萝", emoji: "🍍", color: "#2563eb" },
  { id: "po", type: "syllable", label: "po", sound: "坡", word: "婆婆", emoji: "👵", color: "#dc2626" },
  { id: "mo", type: "syllable", label: "mo", sound: "摸", word: "蘑菇", emoji: "🍄", color: "#be185d" },
  { id: "fo", type: "syllable", label: "fo", sound: "佛", word: "佛塔", emoji: "🏯", color: "#0891b2", pictureable: false },
  { id: "de", type: "syllable", label: "de", sound: "得", word: "得到", emoji: "✅", color: "#ca8a04", pictureable: false },
  { id: "te", type: "syllable", label: "te", sound: "特", word: "特别", emoji: "⭐", color: "#7c3aed", pictureable: false },
  { id: "ne", type: "syllable", label: "ne", sound: "呢", word: "呢喃", emoji: "💬", color: "#16a34a", pictureable: false },
  { id: "le", type: "syllable", label: "le", sound: "乐", word: "快乐", emoji: "😊", color: "#ea580c", pictureable: false },
  { id: "da", type: "syllable", label: "da", sound: "搭", word: "大鼓", emoji: "🪘", color: "#ca8a04" },
  { id: "ta", type: "syllable", label: "ta", sound: "他", word: "宝塔", emoji: "🗼", color: "#7c3aed" },
  { id: "na", type: "syllable", label: "na", sound: "拿", word: "拿球", emoji: "🟢", color: "#16a34a" },
  { id: "la", type: "syllable", label: "la", sound: "啦", word: "喇叭", emoji: "📣", color: "#ea580c" },
].map((item) => ({
  ...item,
  audio: `assets/audio/pinyin/${item.id}.mp3`,
  wordAudio: `assets/audio/words/${item.id}.mp3`,
}));

const TONE_ITEMS = [
  { id: "a1", base: "a", label: "ā", name: "一声", sound: "ā", number: 1, color: "#2563eb" },
  { id: "a2", base: "a", label: "á", name: "二声", sound: "á", number: 2, color: "#16a34a" },
  { id: "a3", base: "a", label: "ǎ", name: "三声", sound: "ǎ", number: 3, color: "#ca8a04" },
  { id: "a4", base: "a", label: "à", name: "四声", sound: "à", number: 4, color: "#dc2626" },
  { id: "o1", base: "o", label: "ō", name: "一声", sound: "ō", number: 1, color: "#2563eb" },
  { id: "o2", base: "o", label: "ó", name: "二声", sound: "ó", number: 2, color: "#16a34a" },
  { id: "o3", base: "o", label: "ǒ", name: "三声", sound: "ǒ", number: 3, color: "#ca8a04" },
  { id: "o4", base: "o", label: "ò", name: "四声", sound: "ò", number: 4, color: "#dc2626" },
  { id: "e1", base: "e", label: "ē", name: "一声", sound: "ē", number: 1, color: "#2563eb" },
  { id: "e2", base: "e", label: "é", name: "二声", sound: "é", number: 2, color: "#16a34a" },
  { id: "e3", base: "e", label: "ě", name: "三声", sound: "ě", number: 3, color: "#ca8a04" },
  { id: "e4", base: "e", label: "è", name: "四声", sound: "è", number: 4, color: "#dc2626" },
].map((item) => ({
  ...item,
  audio: `assets/audio/tones/${item.id}.mp3`,
}));

const FINAL_IDS = ["a", "o", "e", "i", "u", "ü"];
const INITIAL_IDS = ["b", "p", "m", "f", "d", "t", "n", "l"];
const SIMPLE_SYLLABLE_IDS = ["ba", "pa", "ma", "fa", "bo", "po", "mo", "fo", "de", "te", "ne", "le", "da", "ta", "na", "la"];
const CONFUSABLE_PARTNER = { b: "p", p: "b", d: "t", t: "d", n: "l", l: "n" };
const GARDEN_GAME_MODES = [
  {
    mode: "word",
    title: "听音",
    text: "听生活词语，选拼音花牌。",
    icon: "flower",
    color: "#d85a45",
    bg: "#fff0ec",
  },
  {
    mode: "pinyin-pictures",
    title: "看图",
    text: "看拼音卡片，找到图卡。",
    icon: "image",
    color: "#2477d6",
    bg: "#eaf4ff",
  },
  {
    mode: "flowers",
    title: "拼花",
    text: "选声母和韵母，拼出音节。",
    icon: "puzzle",
    color: "#238755",
    bg: "#ecfbf1",
  },
  {
    mode: "baskets",
    title: "分类",
    text: "把拼音送进合适花篮。",
    icon: "basket",
    color: "#a86413",
    bg: "#fff6db",
  },
  {
    mode: "moles",
    title: "地鼠",
    text: "听读音，敲中冒出的拼音地鼠。",
    icon: "hammer",
    color: "#6f5433",
    bg: "#fff1d7",
  },
];

const COURSE_PLAN_30_DAYS = [
  { title: "初识拼音小火车", newItems: ["a"], reviewItems: [], focus: "听“啊”找 a" },
  { title: "圆圆嘴巴读一读", newItems: ["o"], reviewItems: ["a"], focus: "在 a/o 中听音选择" },
  { title: "白鹅的声音", newItems: ["e"], reviewItems: ["a", "o"], focus: "在 a/o/e 中听音选择" },
  { title: "小衣服的声音", newItems: ["i"], reviewItems: ["a", "o", "e"], focus: "听音找 i，复习前三个" },
  { title: "乌云来了", newItems: ["u"], reviewItems: ["a", "o", "e", "i"], focus: "听音找 u" },
  { title: "小鱼游来了", newItems: ["ü"], reviewItems: ["a", "o", "e", "i", "u"], focus: "听音找 ü" },
  { title: "单韵母小复习", newItems: [], reviewItems: ["a", "o", "e", "i", "u", "ü"], focus: "6 个单韵母综合练习" },
  { title: "声调小滑梯一", newItems: [], reviewItems: ["a", "o", "e"], toneItems: ["a1", "a2"], focus: "听 ā/á 的走势" },
  { title: "声调小滑梯二", newItems: [], reviewItems: ["a", "o", "e"], toneItems: ["a3", "a4"], focus: "听 ǎ/à 的走势" },
  { title: "声调配动作", newItems: [], reviewItems: ["a"], toneItems: ["a1", "a2", "a3", "a4"], focus: "点击轨迹听声音" },
  { title: "单韵母加强", newItems: [], reviewItems: ["i", "u", "ü"], focus: "区分 i/u/ü" },
  { title: "易错复习日", newItems: [], reviewItems: ["a", "o", "e", "i", "u", "ü"], useWeakReview: true, focus: "根据记录补弱" },
  { title: "生活词联想", newItems: [], reviewItems: ["a", "o", "e", "i", "u", "ü"], pictureItems: ["a", "o", "e", "i", "u", "ü"], focus: "拼音配图或词语联想" },
  { title: "单韵母小测", newItems: [], reviewItems: ["a", "o", "e", "i", "u", "ü"], pictureItems: ["a", "o", "e"], questionCount: 8, focus: "5 到 8 题综合游戏" },
  { title: "声母朋友来了", newItems: ["b"], reviewItems: ["a", "o", "e"], focus: "听 b，认字形" },
  { title: "轻轻送气", newItems: ["p"], reviewItems: ["b"], focus: "区分 b/p" },
  { title: "妈妈的 m", newItems: ["m"], reviewItems: ["b", "p"], focus: "听音找 m" },
  { title: "小风吹 f", newItems: ["f"], reviewItems: ["b", "p", "m"], focus: "听音找 f" },
  { title: "小鼓 d", newItems: ["d"], reviewItems: ["b", "p", "m", "f"], focus: "听音找 d" },
  { title: "小伞 t", newItems: ["t"], reviewItems: ["d"], focus: "区分 d/t" },
  { title: "鼻音 n", newItems: ["n"], reviewItems: ["d", "t"], focus: "听音找 n" },
  { title: "快乐的 l", newItems: ["l"], reviewItems: ["n"], focus: "区分 n/l" },
  { title: "声母小复习", newItems: [], reviewItems: ["b", "p", "m", "f", "d", "t", "n", "l"], pictureItems: ["b", "p", "m", "f"], questionCount: 8, focus: "声母综合听辨" },
  { title: "声韵牵手一", newItems: ["ba", "pa", "ma", "fa"], reviewItems: ["a", "b", "p", "m", "f"], focus: "感受声母加 a" },
  { title: "声韵牵手二", newItems: ["bo", "po", "mo", "fo"], reviewItems: ["o", "b", "p", "m", "f"], focus: "感受声母加 o" },
  { title: "声韵牵手三", newItems: ["de", "te", "ne", "le"], reviewItems: ["e", "d", "t", "n", "l"], focus: "感受声母加 e" },
  { title: "简单音节找一找", newItems: ["ba", "ma", "da", "la"], reviewItems: ["a", "b", "m", "d", "l"], pictureItems: ["ba", "ma", "da", "la"], focus: "听音找音节" },
  { title: "易错组合复习", newItems: [], reviewItems: ["ba", "pa", "ma", "fa", "de", "te", "ne", "le"], useWeakReview: true, focus: "根据记录生成复习题" },
  { title: "一个月综合练习", newItems: [], reviewItems: ["a", "o", "e", "i", "u", "ü", "b", "p", "m", "f", "d", "t", "n", "l", "ba", "ma", "da", "la"], toneItems: ["a1", "a2", "a3", "a4"], pictureItems: ["a", "o", "e", "i", "u", "ü", "b", "p", "m", "f"], questionCount: 8, focus: "混合听辨" },
  { title: "拼音小火车毕业日", newItems: [], reviewItems: ["a", "o", "e", "i", "u", "ü", "b", "p", "m", "f", "d", "t", "n", "l", "ba", "pa", "ma", "fa", "bo", "po", "mo", "fo", "de", "te", "ne", "le"], pictureItems: ["ba", "pa", "ma", "fa"], questionCount: 8, focus: "展示一个月学习成果" },
];

const PROGRESS_API_PATH = "/api/progress";
const PROGRESS_STORAGE_KEY = "pinyin-learning-progress-v1";
const DEFAULT_ROUND_SIZE = 5;
const AUDIO_PROMPTS = {
  find: "assets/audio/prompts/find.mp3",
  picture: "assets/audio/prompts/picture.mp3",
  tone: "assets/audio/prompts/tone.mp3",
  correct: "assets/audio/prompts/correct.mp3",
  retry: "assets/audio/prompts/retry.mp3",
  complete: "assets/audio/prompts/complete.mp3",
  soundOn: "assets/audio/prompts/sound-on.mp3",
  home: "assets/audio/prompts/home.mp3",
  garden: "assets/audio/prompts/garden.mp3",
};
const AUDIO_MANIFEST_PATH = "assets/audio/manifest.json";
const AUDIO_EXTENSIONS = [".mp3", ".wav", ".m4a", ".ogg", ".webm"];

const ITEM_BY_ID = new Map(PINYIN_ITEMS.map((item) => [item.id, item]));
const TONE_BY_ID = new Map(TONE_ITEMS.map((item) => [item.id, item]));

const state = {
  view: "home",
  mode: "lesson",
  muted: false,
  questions: [],
  currentIndex: 0,
  selected: "",
  buildSelection: { initial: "", final: "" },
  feedback: "",
  answered: false,
  learnedItems: [],
  todayCourse: null,
  roundTitle: "",
  roundSubtitle: "",
  activeCourseDate: "",
  audioToken: 0,
  activeAudio: null,
  audioManifestLoaded: false,
  missingAudio: new Set(),
  availableAudio: new Set(),
  audioByBase: new Map(),
  progress: createEmptyProgress(),
};

const app = document.querySelector("#app");

function createEmptyProgress() {
  return {
    completedRounds: 0,
    muted: false,
    letters: {},
    tones: {},
    courseStartDate: "",
    courses: {},
    dailyStats: {},
  };
}

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
    tone: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 17c4 0 4-10 8-10s4 10 8 10"/><path d="M4 20h16"/></svg>',
    image: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2"/><path d="m6 17 4.5-5 3.5 4 2-2.5 2 3.5"/><path d="M9 9.5h.01"/></svg>',
    calendar: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4"/><path d="M16 3v4"/><path d="M4 10h16"/></svg>',
    flower: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="5" r="3"/><circle cx="18.1" cy="8.5" r="3"/><circle cx="18.1" cy="15.5" r="3"/><circle cx="12" cy="19" r="3"/><circle cx="5.9" cy="15.5" r="3"/><circle cx="5.9" cy="8.5" r="3"/></svg>',
    puzzle: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 4h5v4h2a2 2 0 1 1 0 4h-2v8H8v-3a2 2 0 1 0-4 0v3H2v-8h3a2 2 0 1 0 0-4H2V4h6Z"/><path d="M13 4h7v7h-3a2 2 0 1 0 0 4h3v5h-7"/></svg>',
    basket: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 10h14l-1.5 9h-11L5 10Z"/><path d="M8 10c0-4 8-4 8 0"/><path d="M4 10h16"/><path d="M9 14v2"/><path d="M15 14v2"/></svg>',
    hammer: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="m14 4 6 6-3 3-6-6 3-3Z"/><path d="m12 8-8 8 4 4 8-8"/><path d="m18 8 2-2"/><path d="M6 14 10 18"/></svg>',
  };

  return icons[name] || "";
}

function illustration(itemId) {
  const item = getItem(itemId);
  if (!item) return "";

  const face = (hair, skin = "#ffe1bd") => `
    ${hair}
    <circle cx="60" cy="62" r="30" fill="${skin}"/>
    <circle cx="50" cy="60" r="3.5" fill="#223047" stroke="none"/>
    <circle cx="70" cy="60" r="3.5" fill="#223047" stroke="none"/>
    <path d="M50 74 q10 9 20 0"/>`;
  const dad = face(`<path d="M30 58c0-24 60-24 60 0c-10-14-50-14-60 0z" fill="#4a3526" stroke="none"/>`);
  const mom = face(`<path d="M28 60c0-28 64-28 64 0v22c0 6-8 6-8 0v-16c-4-14-44-14-48 0v16c0 6-8 6-8 0z" fill="#6a3f24" stroke="none"/>`);
  const auntie = face(`<path d="M30 58c0-26 60-26 60 0v10c0 5-7 5-7 0 0-6-46-6-46 0 0 5-7 5-7 0z" fill="#5a3a26" stroke="none"/>`);
  const granny = `
    <circle cx="60" cy="36" r="8" fill="#e7e7ec"/>
    <path d="M31 60c0-26 58-26 58 0c-9-13-49-13-58 0z" fill="#e7e7ec" stroke="none"/>
    <circle cx="60" cy="62" r="29" fill="#ffe1bd"/>
    <circle cx="50" cy="60" r="6"/><circle cx="70" cy="60" r="6"/><path d="M56 60h8"/>
    <path d="M50 76 q10 7 20 0"/>`;
  const drum = `
    <ellipse cx="60" cy="50" rx="26" ry="8" fill="#ffe1bd"/>
    <path d="M34 50 v30 a26 9 0 0 0 52 0 v-30" fill="#e07b3a"/>
    <ellipse cx="60" cy="50" rx="26" ry="8" fill="#ffe1bd"/>
    <path d="M40 55 l40 22 M80 55 l-40 22" stroke-width="3"/>
    <line x1="44" y1="32" x2="30" y2="20"/><circle cx="28" cy="18" r="4" fill="#223047" stroke="none"/>
    <line x1="76" y1="32" x2="90" y2="20"/><circle cx="92" cy="18" r="4" fill="#223047" stroke="none"/>`;

  const art = {
    a: auntie,
    b: dad,
    ba: dad,
    m: mom,
    ma: mom,
    n: granny,
    po: granny,
    d: drum,
    da: drum,
    o: `
      <path d="M72 30 q6-12 16-8 q-2 10 -12 12z" fill="#e23b3b" stroke="none"/>
      <ellipse cx="56" cy="80" rx="30" ry="22" fill="#d98a32"/>
      <path d="M30 72 q-16-6-20-24 q18 6 24 18z" fill="#b5641f"/>
      <circle cx="74" cy="48" r="15" fill="#d98a32"/>
      <path d="M86 48 l16 5 -16 7z" fill="#f0a800" stroke="none"/>
      <circle cx="76" cy="46" r="3" fill="#223047" stroke="none"/>
      <path d="M48 100 l-4 12 M66 100 l4 12"/>`,
    e: `
      <path d="M22 98 h80" stroke="#7bb7e0"/>
      <ellipse cx="58" cy="84" rx="34" ry="16" fill="#ffffff"/>
      <path d="M44 94 q-8-42 26-46 q18-2 18 12 q0 10 -12 10 q-10 0 -10 8"/>
      <path d="M84 58 l12 3 -9 7z" fill="#f0a800" stroke="none"/>
      <circle cx="80" cy="56" r="2.6" fill="#223047" stroke="none"/>`,
    i: `<path d="M42 32 l-22 16 9 15 13-8 v45 h36 v-45 l13 8 9-15 -22-16 q-14 12 -28 0z" fill="#7aa6e6"/>`,
    u: `<path d="M34 84 a18 18 0 0 1 3-35 a22 22 0 0 1 43-2 a16 16 0 0 1 2 37 z" fill="#cfe0f0"/>`,
    "ü": `
      <path d="M30 60 q24-26 52 0 q-24 26 -52 0z" fill="#f0922e"/>
      <path d="M82 60 l20-15 v30z" fill="#f0922e"/>
      <circle cx="46" cy="54" r="3" fill="#223047" stroke="none"/>`,
    p: `
      <line x1="60" y1="44" x2="60" y2="30"/>
      <path d="M60 34 q12-10 18 0 q-10 7 -18 0z" fill="#3a8a3a" stroke="none"/>
      <path d="M60 44 c-22-6-26 22-14 38 c8 10 14 8 14 4 c0 4 6 6 14-4 c12-16 8-44-14-38z" fill="#e23b3b"/>`,
    f: `
      <line x1="60" y1="60" x2="60" y2="104"/>
      <path d="M60 60 v-34 q22 0 22 22z" fill="#36a0c0"/>
      <path d="M60 60 h34 q0 22 -22 22z" fill="#e8902a"/>
      <path d="M60 60 v34 q-22 0 -22-22z" fill="#3a8a3a"/>
      <path d="M60 60 h-34 q0-22 22-22z" fill="#e23b3b"/>
      <circle cx="60" cy="60" r="5" fill="#223047" stroke="none"/>`,
    t: `
      <path d="M20 64 a40 40 0 0 1 80 0 z" fill="#8b5cf6"/>
      <path d="M20 64 q10-10 20 0 q10-10 20 0 q10-10 20 0 q10-10 20 0" stroke-width="3"/>
      <line x1="60" y1="64" x2="60" y2="100"/>
      <path d="M60 100 q0 8 -10 8"/>`,
    l: `
      <ellipse cx="60" cy="50" rx="26" ry="30" fill="#ef6a3a"/>
      <path d="M60 80 l-5 7 10 0z" fill="#ef6a3a" stroke="none"/>
      <path d="M60 87 q7 12 -4 24"/>`,
    pa: `
      <path d="M12 102 l34-56 22 30 16-22 24 48z" fill="#5aa86a"/>
      <line x1="46" y1="46" x2="46" y2="26"/>
      <path d="M46 26 l16 5 -16 7z" fill="#e23b3b" stroke="none"/>`,
    fa: `
      <path d="M40 100 h40 l-5 -16 h-30z" fill="#b5793a"/>
      <line x1="60" y1="84" x2="60" y2="48"/>
      <path d="M60 66 q-20-4-24-22 q20 2 24 18z" fill="#5aa86a"/>
      <path d="M60 58 q18-6 22-22 q-18 0 -22 16z" fill="#6ec06e"/>`,
    bo: `
      <path d="M48 22 q12 14 24 0 q4 8 -4 12 h-16 q-8-4-4-12z" fill="#3a8a3a" stroke="none"/>
      <path d="M60 34 l-12-16 M60 34 v-20 M60 34 l12-16" stroke="#3a8a3a" stroke-width="5"/>
      <rect x="40" y="40" width="40" height="56" rx="18" fill="#e0a52e"/>
      <path d="M44 52 l32 18 M76 52 l-32 18 M48 78 l24 12 M72 78 l-24 12" stroke-width="3"/>`,
    mo: `
      <path d="M26 62 a34 24 0 0 1 68 0 z" fill="#e23b3b"/>
      <circle cx="46" cy="50" r="5" fill="#fff" stroke="none"/>
      <circle cx="68" cy="46" r="6" fill="#fff" stroke="none"/>
      <circle cx="60" cy="58" r="4" fill="#fff" stroke="none"/>
      <path d="M50 62 q-4 28 0 34 q10 6 20 0 q4-6 0-34z" fill="#ffe9c8"/>`,
    ta: `
      <path d="M30 44 h60 l-12-16 h-36z" fill="#c0452e"/>
      <rect x="40" y="44" width="40" height="14" fill="#e8b35a"/>
      <path d="M34 72 h52 l-8-14 h-36z" fill="#c0452e"/>
      <rect x="44" y="72" width="32" height="14" fill="#e8b35a"/>
      <path d="M38 100 h44 l-8-14 h-28z" fill="#c0452e"/>
      <line x1="60" y1="28" x2="60" y2="18"/>
      <circle cx="60" cy="16" r="4" fill="#e8b35a" stroke="none"/>`,
    na: `
      <circle cx="60" cy="62" r="32" fill="#f0a800"/>
      <path d="M60 30 v64 M28 62 h64 M36 42 q24 20 48 0 M36 82 q24-20 48 0" stroke-width="3"/>`,
    la: `
      <path d="M26 52 h16 l30-18 v52 l-30-18 h-16z" fill="#e8b35a"/>
      <path d="M78 40 q12 8 12 22 t-12 22" stroke-width="3"/>`,
  };

  const inner = art[itemId];
  if (!inner) return "";
  return `<svg class="art-svg" viewBox="0 0 120 120" role="img" aria-label="${item.word}" fill="none" stroke="#223047" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
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
      <text x="208" y="190" text-anchor="middle" font-size="42" font-weight="900" fill="#223047">b</text>
      <text x="306" y="190" text-anchor="middle" font-size="42" font-weight="900" fill="#223047">m</text>
      <path d="M50 111c-14-24 7-41 25-26" stroke="#35a56a" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M190 90c28-30 70-20 82 18" stroke="#d85a45" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M310 88c24 4 44 23 50 48" stroke="#c46a1c" stroke-width="7" fill="none" stroke-linecap="round"/>
    </svg>
  `;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function getLocalDateId(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateId(dateId) {
  const [year, month, day] = dateId.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function diffDays(startDateId, endDateId) {
  const start = parseDateId(startDateId);
  const end = parseDateId(endDateId);
  return Math.max(0, Math.round((end - start) / 86400000));
}

function hashString(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function seededRandom(seedText) {
  let seed = hashString(seedText);
  return () => {
    seed += 0x6d2b79f5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function shuffle(items, rng = Math.random) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function normalizeProgress(saved = {}) {
  return {
    ...createEmptyProgress(),
    completedRounds: Number(saved.completedRounds || 0),
    muted: Boolean(saved.muted),
    letters: saved.letters && typeof saved.letters === "object" ? saved.letters : {},
    tones: saved.tones && typeof saved.tones === "object" ? saved.tones : {},
    courseStartDate: typeof saved.courseStartDate === "string" ? saved.courseStartDate : "",
    courses: saved.courses && typeof saved.courses === "object" ? saved.courses : {},
    dailyStats: saved.dailyStats && typeof saved.dailyStats === "object" ? saved.dailyStats : {},
  };
}

function getProgressStorage() {
  try {
    return globalThis.localStorage || null;
  } catch {
    return null;
  }
}

function loadLocalProgress() {
  const storage = getProgressStorage();
  if (!storage) return null;

  const saved = storage.getItem(PROGRESS_STORAGE_KEY);
  if (!saved) return null;

  try {
    return normalizeProgress(JSON.parse(saved));
  } catch {
    storage.removeItem(PROGRESS_STORAGE_KEY);
    return null;
  }
}

function saveLocalProgress(progress) {
  const storage = getProgressStorage();
  if (!storage) return;

  try {
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(normalizeProgress(progress)));
  } catch {
    // localStorage 写入失败时，本轮内存状态仍可继续使用。
  }
}

function clearLocalProgress() {
  const storage = getProgressStorage();
  if (!storage) return;

  storage.removeItem(PROGRESS_STORAGE_KEY);
}

async function loadProgress() {
  if (typeof fetch === "function") {
    try {
      const response = await fetch(PROGRESS_API_PATH, { cache: "no-store" });
      if (!response.ok) throw new Error("progress api unavailable");
      state.progress = normalizeProgress(await response.json());
      saveLocalProgress(state.progress);
      state.muted = state.progress.muted;
      return;
    } catch {
      // GitHub Pages 没有后端接口，继续读取浏览器本地存储。
    }
  }

  state.progress = loadLocalProgress() || createEmptyProgress();
  state.muted = state.progress.muted;
}

async function saveProgress() {
  state.progress.muted = state.muted;

  if (typeof fetch === "function") {
    try {
      const response = await fetch(PROGRESS_API_PATH, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state.progress),
      });
      if (!response.ok) throw new Error("progress api unavailable");
    } catch {
      // GitHub Pages 没有后端接口，改用浏览器本地存储。
    }
  }

  saveLocalProgress(state.progress);
}

async function clearSavedProgress() {
  clearLocalProgress();
  if (typeof fetch !== "function") return;

  try {
    const response = await fetch(PROGRESS_API_PATH, { method: "DELETE" });
    if (!response.ok) throw new Error("progress api unavailable");
  } catch {
    // GitHub Pages 没有后端接口，本地记录已经清理。
  }
}

function normalizeAudioPath(path) {
  return path.replace(/^\.\//, "");
}

function stripAudioExtension(path) {
  const extension = AUDIO_EXTENSIONS.find((item) => path.endsWith(item));
  return extension ? path.slice(0, -extension.length) : path;
}

async function loadAudioManifest() {
  if (typeof fetch !== "function") return;

  try {
    const response = await fetch(AUDIO_MANIFEST_PATH, { cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const files = (data.files || []).map(normalizeAudioPath);
    state.availableAudio = new Set(files);
    state.audioByBase = new Map(files.map((file) => [stripAudioExtension(file), file]));
    state.audioManifestLoaded = true;
  } catch {
    state.availableAudio = new Set();
    state.audioByBase = new Map();
    state.audioManifestLoaded = true;
  }
}

function resolveAudioPath(src) {
  const path = normalizeAudioPath(src);
  if (state.availableAudio.has(path)) return path;

  const base = stripAudioExtension(path);
  return state.audioByBase.get(base) || "";
}

function stopAudio() {
  state.audioToken += 1;
  if (state.activeAudio) {
    state.activeAudio.pause();
    state.activeAudio.currentTime = 0;
  }
  state.activeAudio = null;
}

function playAudioFile(src, token) {
  return new Promise((resolve) => {
    const path = src ? resolveAudioPath(src) : "";
    if (!path || state.missingAudio.has(path) || token !== state.audioToken) {
      resolve();
      return;
    }

    const audio = new Audio(path);
    state.activeAudio = audio;
    audio.addEventListener("ended", resolve, { once: true });
    audio.addEventListener(
      "error",
      () => {
        state.missingAudio.add(path);
        resolve();
      },
      { once: true },
    );
    audio.play().catch(() => resolve());
  });
}

async function playAudioSequence(paths) {
  if (state.muted) return;
  stopAudio();
  const token = state.audioToken;
  for (const path of paths.filter(Boolean)) {
    if (token !== state.audioToken) return;
    await playAudioFile(path, token);
  }
}

function getItem(id) {
  return ITEM_BY_ID.get(id);
}

function isPictureable(id) {
  return getItem(id)?.pictureable !== false;
}

function getTone(id) {
  return TONE_BY_ID.get(id);
}

function getQuestionTarget(question) {
  return question.type === "tone-choice" ? getTone(question.target) : getItem(question.target);
}

function getCourseDayIndex(dateId) {
  const startDate = state.progress.courseStartDate || dateId;
  return (diffDays(startDate, dateId) % COURSE_PLAN_30_DAYS.length) + 1;
}

function getUnlockedPinyinIds(dayIndex) {
  const ids = [];
  COURSE_PLAN_30_DAYS.slice(0, dayIndex).forEach((plan) => {
    ids.push(...(plan.newItems || []), ...(plan.reviewItems || []), ...(plan.pictureItems || []));
  });
  return unique(ids).filter((id) => ITEM_BY_ID.has(id));
}

function getWeakReviewId(allowedIds) {
  return allowedIds
    .map((id) => {
      const record = state.progress.letters[id];
      if (!record || record.attempts < 2) return null;
      return { id, rate: record.correct / record.attempts, attempts: record.attempts };
    })
    .filter(Boolean)
    .sort((a, b) => a.rate - b.rate || b.attempts - a.attempts)[0]?.id;
}

function makeChoices(targetId, poolIds, count, rng, filterFn) {
  const target = getItem(targetId);
  const allow = (id) => !filterFn || filterFn(id);
  const sameTypePool = unique(poolIds).filter((id) => {
    const item = getItem(id);
    return item && item.id !== targetId && item.type === target.type && allow(id);
  });
  const fallbackPool = PINYIN_ITEMS.filter((item) => item.id !== targetId && item.type === target.type && allow(item.id)).map((item) => item.id);
  const candidates = unique([...sameTypePool, ...fallbackPool]);
  return shuffle([targetId, ...shuffle(candidates, rng).slice(0, count - 1)], rng);
}

function makeListenQuestion(targetId, dayIndex, rng, poolIds, opts = {}) {
  const partner = CONFUSABLE_PARTNER[targetId];
  if (opts.confusableFirst && partner) {
    return {
      type: "listen-choice",
      target: targetId,
      choices: shuffle([targetId, partner], rng),
    };
  }
  const count = dayIndex <= 2 ? 2 : 3;
  return {
    type: "listen-choice",
    target: targetId,
    choices: makeChoices(targetId, poolIds, count, rng),
  };
}

function makePictureQuestion(targetId, dayIndex, rng, poolIds) {
  const count = dayIndex <= 2 ? 2 : 3;
  return {
    type: "picture-choice",
    target: targetId,
    choices: makeChoices(targetId, poolIds, count, rng, isPictureable),
  };
}

function makeToneQuestion(targetId, rng, tonePoolIds = []) {
  const target = getTone(targetId);
  const sameBase = TONE_ITEMS.filter((tone) => tone.base === target.base).map((tone) => tone.id);
  const scopedPool = unique(tonePoolIds).filter((id) => getTone(id)?.base === target.base);
  const source = scopedPool.length >= 2 ? scopedPool : sameBase;
  const count = source.length < 4 ? Math.min(2, source.length) : 4;
  const candidates = source.filter((id) => id !== targetId);

  return {
    type: "tone-choice",
    target: targetId,
    choices: shuffle([targetId, ...shuffle(candidates, rng).slice(0, count - 1)], rng),
  };
}

function selectRoundTargets(preferredIds, fallbackIds, count, rng) {
  const preferred = shuffle(unique(preferredIds).filter((id) => ITEM_BY_ID.has(id)), rng);
  const fallback = shuffle(unique(fallbackIds).filter((id) => ITEM_BY_ID.has(id) && !preferred.includes(id)), rng);
  return unique([...preferred, ...fallback]).slice(0, count);
}

function getPracticePool() {
  return unique([...FINAL_IDS, ...INITIAL_IDS, ...SIMPLE_SYLLABLE_IDS]).filter((id) => ITEM_BY_ID.has(id));
}

function makeWordQuestion(targetId, dayIndex, rng, poolIds) {
  const count = dayIndex <= 2 ? 2 : 3;
  return {
    type: "word-choice",
    target: targetId,
    choices: makeChoices(targetId, poolIds, count, rng),
  };
}

function makePinyinPictureQuestion(targetId, dayIndex, rng, poolIds) {
  const count = dayIndex <= 2 ? 2 : 3;
  return {
    type: "pinyin-picture-choice",
    target: targetId,
    choices: makeChoices(targetId, poolIds, count, rng, isPictureable),
  };
}

function makeCategoryQuestion(targetId) {
  return {
    type: "category-choice",
    target: targetId,
    correctChoice: getItem(targetId).type,
    choices: ["final", "initial", "syllable"],
  };
}

function makeMoleQuestion(targetId, dayIndex, rng, poolIds) {
  const count = dayIndex <= 2 ? 3 : 5;
  return {
    type: "mole-choice",
    target: targetId,
    choices: makeChoices(targetId, poolIds, count, rng),
  };
}

function splitSyllable(id) {
  const initial = INITIAL_IDS.find((item) => id.startsWith(item)) || "";
  return { initial, final: initial ? id.slice(initial.length) : "" };
}

function makeBuildChoices(targetValue, sourceValues, count, rng) {
  const candidates = sourceValues.filter((value) => value !== targetValue);
  return shuffle([targetValue, ...shuffle(candidates, rng).slice(0, count - 1)], rng);
}

function makeSyllableBuildQuestion(targetId, rng) {
  const parts = splitSyllable(targetId);
  const finalOptions = unique(SIMPLE_SYLLABLE_IDS.map((id) => splitSyllable(id).final));
  return {
    type: "syllable-build",
    target: targetId,
    targetInitial: parts.initial,
    targetFinal: parts.final,
    initialChoices: makeBuildChoices(parts.initial, INITIAL_IDS, 3, rng),
    finalChoices: makeBuildChoices(parts.final, finalOptions, 3, rng),
  };
}

function buildWordPracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-word-practice-${state.progress.completedRounds}`);
  const unlocked = getUnlockedPinyinIds(dayIndex);
  const targets = selectRoundTargets(unlocked, getPracticePool(), 6, rng);
  const pool = unique([...unlocked, ...getPracticePool()]);
  return targets.map((itemId) => makeWordQuestion(itemId, dayIndex, rng, pool));
}

function buildPinyinPicturePracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-pinyin-picture-practice-${state.progress.completedRounds}`);
  const unlocked = getUnlockedPinyinIds(dayIndex).filter(isPictureable);
  const targets = selectRoundTargets(unlocked, getPracticePool().filter(isPictureable), 6, rng);
  const pool = unique([...unlocked, ...getPracticePool().filter(isPictureable)]);
  return targets.map((itemId) => makePinyinPictureQuestion(itemId, dayIndex, rng, pool));
}

function buildSyllableFlowerQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-syllable-flower-${state.progress.completedRounds}`);
  const unlocked = getUnlockedPinyinIds(dayIndex).filter((id) => getItem(id)?.type === "syllable");
  const targets = selectRoundTargets(unlocked, SIMPLE_SYLLABLE_IDS, 5, rng);
  return targets.map((itemId) => makeSyllableBuildQuestion(itemId, rng));
}

function buildBasketPracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-basket-practice-${state.progress.completedRounds}`);
  const unlocked = getUnlockedPinyinIds(dayIndex);
  const targets = selectRoundTargets(unlocked, getPracticePool(), 6, rng);
  return targets.map((itemId) => makeCategoryQuestion(itemId));
}

function buildMolePracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-mole-practice-${state.progress.completedRounds}`);
  const unlocked = getUnlockedPinyinIds(dayIndex);
  const targets = selectRoundTargets(unlocked, getPracticePool(), 6, rng);
  const pool = unique([...unlocked, ...getPracticePool()]);
  return targets.map((itemId) => makeMoleQuestion(itemId, dayIndex, rng, pool));
}

function buildCourse(date, dayIndex, plan) {
  const rng = seededRandom(`${date}-${dayIndex}-${plan.title}`);
  const unlocked = getUnlockedPinyinIds(dayIndex);
  const planItems = unique([...(plan.newItems || []), ...(plan.reviewItems || [])]).filter((id) => ITEM_BY_ID.has(id));
  const pool = unique([...unlocked, ...planItems]);
  const questions = [];
  const targetQueue = shuffle([...(plan.newItems || []), ...(plan.newItems || []), ...(plan.reviewItems || [])].filter((id) => ITEM_BY_ID.has(id)), rng);
  const weakId = getWeakReviewId(pool);

  if (plan.useWeakReview && weakId) {
    targetQueue.unshift(weakId);
  }

  (plan.toneItems || []).forEach((toneId) => {
    if (TONE_BY_ID.has(toneId)) {
      questions.push(makeToneQuestion(toneId, rng, plan.toneItems));
    }
  });

  shuffle((plan.pictureItems || []).filter(isPictureable), rng).forEach((itemId) => {
    if (ITEM_BY_ID.has(itemId) && questions.length < Math.max(2, Math.floor((plan.questionCount || DEFAULT_ROUND_SIZE) / 2))) {
      questions.push(makePictureQuestion(itemId, dayIndex, rng, pool));
    }
  });

  const fallbackTargets = pool.length > 0 ? pool : ["a", "o", "e"];
  const newSet = new Set(plan.newItems || []);
  let cursor = 0;
  const questionCount = Math.min(Math.max(plan.questionCount || DEFAULT_ROUND_SIZE, DEFAULT_ROUND_SIZE), 8);

  while (questions.length < questionCount) {
    const targetId = targetQueue[cursor] || fallbackTargets[cursor % fallbackTargets.length];
    const confusableFirst = newSet.has(targetId) && Boolean(CONFUSABLE_PARTNER[targetId]);
    questions.push(makeListenQuestion(targetId, dayIndex, rng, pool, { confusableFirst }));
    cursor += 1;
  }

  return {
    date,
    dayIndex,
    title: plan.title,
    focus: plan.focus,
    newItems: plan.newItems || [],
    reviewItems: plan.reviewItems || [],
    questions: shuffle(questions, rng).slice(0, questionCount),
    completed: false,
  };
}

function ensureTodayCourse() {
  const today = getLocalDateId();
  if (!state.progress.courseStartDate) {
    state.progress.courseStartDate = today;
  }

  const dayIndex = getCourseDayIndex(today);
  const existing = state.progress.courses[today];
  if (existing && existing.dayIndex === dayIndex && Array.isArray(existing.questions)) {
    state.todayCourse = existing;
    return existing;
  }

  const course = buildCourse(today, dayIndex, COURSE_PLAN_30_DAYS[dayIndex - 1]);
  state.progress.courses[today] = course;
  state.todayCourse = course;
  saveProgress();
  return course;
}

function buildTonePracticeQuestions() {
  const rng = seededRandom(`${getLocalDateId()}-tone-practice-${state.progress.completedRounds}`);
  return shuffle(["a1", "a2", "a3", "a4", "o1", "o2", "o3", "o4", "e1", "e2", "e3", "e4"], rng)
    .slice(0, 6)
    .map((toneId) => makeToneQuestion(toneId, rng));
}

function buildPicturePracticeQuestions() {
  const rng = seededRandom(`${getLocalDateId()}-picture-practice-${state.progress.completedRounds}`);
  const ids = getUnlockedPinyinIds(getCourseDayIndex(getLocalDateId())).filter(isPictureable);
  const source = ids.length >= 6 ? ids : ["a", "o", "e", "i", "u", "ü", "b", "p", "m", "f", "d", "t", "n", "l"];
  return shuffle(source, rng)
    .slice(0, 6)
    .map((itemId) => makePictureQuestion(itemId, 30, rng, source));
}

function formatPinyinList(ids, emptyText = "无") {
  const labels = ids
    .map((id) => getItem(id)?.label || getTone(id)?.label)
    .filter(Boolean);
  return labels.length ? labels.join("、") : emptyText;
}

function courseFocusLabels(course) {
  const ids = unique([...course.newItems, ...course.reviewItems, ...(course.toneItems || [])]);
  return formatPinyinList(ids, "a、o、e");
}

function formatPercent(correct, attempts) {
  if (!attempts) return "0%";
  return `${Math.round((correct / attempts) * 100)}%`;
}

function createDailyStat(date, course) {
  return {
    date,
    dayIndex: course.dayIndex,
    title: course.title,
    attempts: 0,
    correct: 0,
    items: {},
    tones: {},
    weakItems: [],
    completedAt: "",
  };
}

function getDailyStat(date = getLocalDateId()) {
  const course = date === getLocalDateId() ? ensureTodayCourse() : state.progress.courses[date];
  const fallbackCourse = course || { dayIndex: getCourseDayIndex(date), title: "自由练习" };
  const stat = state.progress.dailyStats[date] || createDailyStat(date, fallbackCourse);
  stat.date = date;
  stat.dayIndex = stat.dayIndex || fallbackCourse.dayIndex;
  stat.title = stat.title || fallbackCourse.title;
  stat.items = stat.items && typeof stat.items === "object" ? stat.items : {};
  stat.tones = stat.tones && typeof stat.tones === "object" ? stat.tones : {};
  stat.weakItems = Array.isArray(stat.weakItems) ? stat.weakItems : [];
  state.progress.dailyStats[date] = stat;
  return stat;
}

function updateDailyWeakItems(stat) {
  const entries = [
    ...Object.entries(stat.items).map(([id, record]) => ({ id, ...record })),
    ...Object.entries(stat.tones).map(([id, record]) => ({ id, ...record })),
  ];
  stat.weakItems = entries
    .filter((entry) => entry.attempts > 0 && entry.correct < entry.attempts)
    .sort((a, b) => a.correct / a.attempts - b.correct / b.attempts || b.attempts - a.attempts)
    .slice(0, 3)
    .map((entry) => entry.id);
}

function recordDailyQuestionResult(question, isCorrect) {
  const stat = getDailyStat();
  const bucket = question.type === "tone-choice" ? stat.tones : stat.items;
  const record = bucket[question.target] || { attempts: 0, correct: 0 };
  stat.attempts += 1;
  if (isCorrect) stat.correct += 1;
  record.attempts += 1;
  if (isCorrect) record.correct += 1;
  bucket[question.target] = record;
  updateDailyWeakItems(stat);
}

function isTodayCourseCompleted() {
  return state.progress.courses[getLocalDateId()]?.completed === true;
}

function completeDailyCourse(date) {
  const course = state.progress.courses[date];
  if (!course) return;
  const stat = getDailyStat(date);
  stat.dayIndex = course.dayIndex;
  stat.title = course.title;
  stat.completedAt = new Date().toISOString();
}

function totalRecordStats() {
  const records = [...Object.values(state.progress.letters), ...Object.values(state.progress.tones)];
  return records.reduce(
    (summary, record) => ({
      attempts: summary.attempts + Number(record?.attempts || 0),
      correct: summary.correct + Number(record?.correct || 0),
    }),
    { attempts: 0, correct: 0 },
  );
}

function completedCourseDates() {
  const fromCourses = Object.entries(state.progress.courses)
    .filter(([, course]) => course?.completed)
    .map(([date]) => date);
  const fromDailyStats = Object.values(state.progress.dailyStats)
    .filter((stat) => stat?.completedAt)
    .map((stat) => stat.date);
  return unique([...fromCourses, ...fromDailyStats]).sort();
}

function currentStreakDays() {
  const completed = new Set(completedCourseDates());
  let cursor = parseDateId(getLocalDateId());
  let streak = 0;

  while (completed.has(getLocalDateId(cursor))) {
    streak += 1;
    cursor = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() - 1);
  }

  return streak;
}

function recentDailyStats(limit = 7) {
  return Object.values(state.progress.dailyStats)
    .filter((stat) => stat?.date)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

function resetAnswerState() {
  state.selected = "";
  state.buildSelection = { initial: "", final: "" };
  state.answered = false;
}

function getQuestionInstruction(question) {
  if (question.type === "picture-choice" || question.type === "pinyin-picture-choice") return "👀";
  if (question.type === "syllable-build") return "b + a";
  if (question.type === "category-choice") return "a / b / ba";
  return "🔊";
}

function startRound(mode = "lesson") {
  const course = ensureTodayCourse();
  state.view = "game";
  state.mode = mode;
  state.currentIndex = 0;
  resetAnswerState();
  state.learnedItems = [];
  state.activeCourseDate = mode === "lesson" ? course.date : "";

  if (mode === "tones") {
    state.questions = buildTonePracticeQuestions();
    state.roundTitle = "ā á ǎ à";
    state.roundSubtitle = "听声调，选轨迹";
  } else if (mode === "pictures") {
    state.questions = buildPicturePracticeQuestions();
    state.roundTitle = "看图";
    state.roundSubtitle = "看图片，找拼音";
  } else if (mode === "word") {
    state.questions = buildWordPracticeQuestions();
    state.roundTitle = "听音";
    state.roundSubtitle = "听生活词语，选拼音花牌";
  } else if (mode === "pinyin-pictures") {
    state.questions = buildPinyinPicturePracticeQuestions();
    state.roundTitle = "看图";
    state.roundSubtitle = "看拼音卡片，找到图卡";
  } else if (mode === "flowers") {
    state.questions = buildSyllableFlowerQuestions();
    state.roundTitle = "b + a";
    state.roundSubtitle = "选声母和韵母，拼出音节";
  } else if (mode === "baskets") {
    state.questions = buildBasketPracticeQuestions();
    state.roundTitle = "a / b / ba";
    state.roundSubtitle = "把拼音送进合适花篮";
  } else if (mode === "moles") {
    state.questions = buildMolePracticeQuestions();
    state.roundTitle = "地鼠";
    state.roundSubtitle = "听读音，敲中拼音地鼠";
  } else {
    state.questions = course.questions;
    state.roundTitle = `D${course.dayIndex} · ${courseFocusLabels(course)}`;
    state.roundSubtitle = course.focus;
  }

  state.feedback = getQuestionInstruction(state.questions[0]);
  render();
  setTimeout(() => playCurrentPrompt(), 180);
}

function getPromptAudio(question) {
  if (question.type === "tone-choice") return AUDIO_PROMPTS.tone;
  if (question.type === "picture-choice" || question.type === "pinyin-picture-choice") return AUDIO_PROMPTS.picture;
  return AUDIO_PROMPTS.find;
}

function getTargetAudio(question) {
  const target = getQuestionTarget(question);
  if (question.type === "word-choice") return target?.wordAudio;
  return target?.audio;
}

function playCurrentPrompt() {
  const question = state.questions[state.currentIndex];
  if (!question) return;
  playAudioSequence([getPromptAudio(question), getTargetAudio(question)]);
}

function playCurrentSound() {
  const question = state.questions[state.currentIndex];
  if (!question) return;
  playAudioSequence([getTargetAudio(question)]);
}

function playLockedHint() {
  playAudioSequence([AUDIO_PROMPTS.retry]);
}

function playViewPrompt() {
  if (state.view === "game") {
    playCurrentPrompt();
    return;
  }
  const promptByView = {
    home: AUDIO_PROMPTS.home,
    garden: AUDIO_PROMPTS.garden,
  };
  const src = promptByView[state.view];
  if (src) playAudioSequence([src]);
}

function recordQuestionResult(question, isCorrect) {
  if (question.type === "tone-choice") {
    const tone = getTone(question.target);
    const record = state.progress.tones[tone.id] || { attempts: 0, correct: 0 };
    record.attempts += 1;
    if (isCorrect) record.correct += 1;
    state.progress.tones[tone.id] = record;
    recordDailyQuestionResult(question, isCorrect);
    return;
  }

  const item = getItem(question.target);
  const record = state.progress.letters[item.id] || { attempts: 0, correct: 0 };
  record.attempts += 1;
  if (isCorrect) record.correct += 1;
  state.progress.letters[item.id] = record;
  recordDailyQuestionResult(question, isCorrect);
}

function getQuestionAnswerId(question) {
  return question.correctChoice || question.target;
}

function categoryName(type) {
  const names = {
    final: "单韵母",
    initial: "声母",
    syllable: "声韵组合",
  };
  return names[type] || "";
}

function categoryDisplay(type) {
  const labels = {
    final: "a o e",
    initial: "b p m",
    syllable: "ba ma",
  };
  return labels[type] || "";
}

function getCorrectFeedback(target) {
  return `✓ ${target.label}`;
}

function getRetryFeedback() {
  return "↻";
}

function selectBuildPart(part, value) {
  if (state.answered) return;

  const question = state.questions[state.currentIndex];
  if (question?.type !== "syllable-build") return;

  state.buildSelection = { ...state.buildSelection, [part]: value };
  state.feedback = getQuestionInstruction(question);
  render();

  const { initial, final } = state.buildSelection;
  if (initial && final) {
    answer(`${initial}${final}`);
  }
}

function answer(choice) {
  if (state.answered) return;

  const question = state.questions[state.currentIndex];
  const target = getQuestionTarget(question);
  const isCorrect = choice === getQuestionAnswerId(question);

  state.selected = choice;
  state.answered = true;
  state.feedback = isCorrect ? getCorrectFeedback(target) : getRetryFeedback();
  if (isCorrect) state.learnedItems.push(question.target);
  recordQuestionResult(question, isCorrect);
  saveProgress();
  render();

  playAudioSequence([isCorrect ? AUDIO_PROMPTS.correct : AUDIO_PROMPTS.retry, getTargetAudio(question)]);

  const delay = isCorrect ? 900 : 1150;
  setTimeout(() => {
    if (isCorrect) {
      nextQuestion();
    } else {
      resetAnswerState();
      render();
      playCurrentPrompt();
    }
  }, delay);
}

function nextQuestion() {
  if (state.currentIndex + 1 >= state.questions.length) {
    state.progress.completedRounds += 1;
    if (state.activeCourseDate && state.progress.courses[state.activeCourseDate]) {
      state.progress.courses[state.activeCourseDate].completed = true;
      completeDailyCourse(state.activeCourseDate);
    }
    saveProgress();
    state.view = "result";
    state.feedback = "";
    render();
    playAudioSequence([AUDIO_PROMPTS.complete]);
    return;
  }

  state.currentIndex += 1;
  resetAnswerState();
  state.feedback = getQuestionInstruction(state.questions[state.currentIndex]);
  render();
  setTimeout(() => playCurrentPrompt(), 160);
}

function goHome() {
  stopAudio();
  state.view = "home";
  resetAnswerState();
  state.feedback = "";
  render();
}

function toggleMute() {
  state.muted = !state.muted;
  if (state.muted) {
    stopAudio();
  } else {
    playAudioSequence([AUDIO_PROMPTS.soundOn]);
  }
  saveProgress();
  render();
}

async function resetProgress() {
  state.progress = createEmptyProgress();
  state.muted = false;
  ensureTodayCourse();
  await clearSavedProgress();
  saveProgress();
  render();
}

function topbar(subtitle = "拼音") {
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
        ${
          state.audioManifestLoaded && state.availableAudio.size === 0
            ? `<span class="audio-status" title="真人录音文件尚未接入">录音待补</span>`
            : ""
        }
        <button class="icon-button" type="button" data-action="toggle-mute" aria-label="${state.muted ? "打开声音" : "关闭声音"}" title="${state.muted ? "打开声音" : "关闭声音"}">
          ${state.muted ? icon("mute") : icon("volume")}
        </button>
        <button class="icon-button" type="button" data-view="home" aria-label="首页" title="首页">
          ${icon("home")}
        </button>
      </nav>
    </header>
  `;
}

function courseSummary(course) {
  const rows = [
    `${icon("calendar")} D${course.dayIndex}`,
    formatPinyinList(course.newItems, ""),
    formatPinyinList(course.reviewItems, ""),
  ].filter(Boolean);

  return `
    <div class="course-summary" aria-label="今日课程内容">
      ${rows.map((row) => `<span>${row}</span>`).join("")}
    </div>
  `;
}

function gardenGameCards() {
  return GARDEN_GAME_MODES.map(
    (game) => `
      <button class="mode-card garden-card" style="--garden-color: ${game.color}; --garden-bg: ${game.bg}" type="button" data-start="${game.mode}" aria-label="${game.text}">
        <span class="mode-art garden-art">${icon(game.icon)}</span>
        <span><strong>${game.title}</strong></span>
      </button>
    `,
  ).join("");
}

function parentCorner() {
  return `
    <div class="parent-corner" data-longpress="parent" role="group" aria-label="家长入口（长按打开学习记录）">
      <button class="icon-button parent-mute" type="button" data-action="toggle-mute" aria-label="${state.muted ? "打开声音" : "关闭声音"}" title="${state.muted ? "打开声音" : "关闭声音"}">
        ${state.muted ? icon("mute") : icon("volume")}
      </button>
    </div>
  `;
}

function gardenEntry(unlocked) {
  if (unlocked) {
    return `
      <button class="garden-entry unlocked" type="button" data-view="garden" aria-label="去游戏花园">
        <span class="garden-entry-art">${icon("flower")}</span>
      </button>
    `;
  }
  return `
    <button class="garden-entry locked" type="button" data-action="garden-locked" aria-disabled="true" aria-label="先完成今天的学习，才能去游戏花园">
      <span class="garden-entry-art">${icon("flower")}</span>
      <span class="garden-lock" aria-hidden="true">🔒</span>
    </button>
  `;
}

function homeView() {
  ensureTodayCourse();
  const unlocked = isTodayCourseCompleted();
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
      ${gardenEntry(unlocked)}
    </main>
  `;
}

function gardenView() {
  return `
    <main class="screen garden-screen">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <button class="garden-back" type="button" data-view="home" aria-label="回首页">
        ${icon("home")}
      </button>
      <div class="mode-grid garden-grid garden-drawer">
        ${gardenGameCards()}
      </div>
    </main>
  `;
}

function getGameTitle(question) {
  if (question.type === "tone-choice") return "听声调，选轨迹";
  if (question.type === "picture-choice") return "看图片，找拼音";
  if (question.type === "word-choice") return "听词语，找拼音";
  if (question.type === "pinyin-picture-choice") return "看拼音，找图卡";
  if (question.type === "syllable-build") return "听音节，拼花朵";
  if (question.type === "category-choice") return "看拼音，送花篮";
  if (question.type === "mole-choice") return "听声音，打地鼠";
  return "听声音，找拼音";
}

function pictureArt(item) {
  const svg = illustration(item.id);
  const visual = svg || `<span class="picture-emoji" aria-hidden="true">${item.emoji}</span>`;
  return `
    <div class="picture-art" style="--item-color: ${item.color}">
      ${visual}
    </div>
  `;
}

function tonePath(number) {
  const paths = {
    1: "M18 46H122",
    2: "M18 62 122 24",
    3: "M18 36 C42 78 82 78 122 30",
    4: "M18 24 122 64",
  };
  return paths[number] || paths[1];
}

function toneArt(tone, compact = false) {
  const path = tonePath(tone.number);
  return `
    <svg class="${compact ? "tone-track compact" : "tone-track"}" viewBox="0 0 140 88" aria-hidden="true">
      <path class="tone-grid" d="M18 24H122M18 46H122M18 68H122"/>
      <path class="tone-line" d="${path}" style="stroke: ${tone.color}"/>
      <circle class="tone-rider" r="8" fill="${tone.color}" stroke="#223047" stroke-width="3" style="offset-path: path('${path}'); --tone-fallback: 0;"/>
    </svg>
  `;
}

function choiceClass(question, choiceId) {
  if (state.selected !== choiceId) return "choice-button";
  return choiceId === getQuestionAnswerId(question) ? "choice-button correct" : "choice-button wrong";
}

function renderChoice(question, choiceId) {
  if (question.type === "tone-choice") {
    const tone = getTone(choiceId);
    return `
      <button class="${choiceClass(question, choiceId)} tone-choice" type="button" data-answer="${choiceId}" aria-label="选择 ${tone.label}">
        <span class="tone-label">${tone.label}</span>
        <span class="tone-name sr-only">${tone.name}</span>
        ${toneArt(tone, true)}
      </button>
    `;
  }

  if (question.type === "pinyin-picture-choice") {
    const item = getItem(choiceId);
    return `
      <button class="${choiceClass(question, choiceId)} picture-option" type="button" data-answer="${choiceId}" aria-label="选择 ${item.word}">
        ${pictureArt(item)}
      </button>
    `;
  }

  if (question.type === "category-choice") {
    return `
      <button class="${choiceClass(question, choiceId)} basket-button" type="button" data-answer="${choiceId}" aria-label="选择 ${categoryName(choiceId)}">
        <span class="basket-lid">${icon("basket")}</span>
        <span>${categoryDisplay(choiceId)}</span>
      </button>
    `;
  }

  const item = getItem(choiceId);
  return `
    <button class="${choiceClass(question, choiceId)}" type="button" data-answer="${choiceId}" aria-label="选择 ${item.label}">
      <span>${item.label}</span>
    </button>
  `;
}

function moleClass(question, choiceId) {
  if (state.selected !== choiceId) return "mole-button";
  return choiceId === getQuestionAnswerId(question) ? "mole-button correct" : "mole-button wrong";
}

function renderMoleChoice(question, choiceId, index) {
  const item = getItem(choiceId);
  return `
    <button class="${moleClass(question, choiceId)}" type="button" data-answer="${choiceId}" aria-label="敲 ${item.label}" style="--item-color: ${item.color}; --rise-delay: ${index * 70}ms">
      <span class="mole-body">
        <span class="mole-label">${item.label}</span>
      </span>
      <span class="mole-hole" aria-hidden="true"></span>
    </button>
  `;
}

function buildChoiceClass(question, part, value) {
  if (state.buildSelection[part] !== value) return "build-button";
  if (!state.answered) return "build-button selected";
  const targetValue = part === "initial" ? question.targetInitial : question.targetFinal;
  return value === targetValue ? "build-button correct" : "build-button wrong";
}

function renderBuildChoice(question, part, value) {
  return `
    <button class="${buildChoiceClass(question, part, value)}" type="button" data-build-part="${part}" data-build-value="${value}" aria-label="选择 ${value}">
      ${value}
    </button>
  `;
}

function buildSlotText(part) {
  return state.buildSelection[part] || "？";
}

function categoryCard(item) {
  return `
    <div class="category-card" style="--item-color: ${item.color}">
      <span class="category-symbol">${item.label}</span>
    </div>
  `;
}

function questionStage(question, target) {
  if (question.type === "word-choice") {
    return `
      <div class="question-stage">
        <div class="sound-panel garden-panel">
          <button class="sound-disc flower-disc" type="button" data-action="repeat-sound" aria-label="播放词语声音">
            <span class="sound-letter">?</span>
          </button>
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="choices" role="list" aria-label="拼音选项">
          ${question.choices.map((id) => renderChoice(question, id)).join("")}
        </div>
      </div>
    `;
  }

  if (question.type === "picture-choice") {
    return `
      <div class="question-stage">
        <div class="picture-panel">
          ${pictureArt(target)}
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="choices" role="list" aria-label="拼音选项">
          ${question.choices.map((id) => renderChoice(question, id)).join("")}
        </div>
      </div>
    `;
  }

  if (question.type === "pinyin-picture-choice") {
    return `
      <div class="question-stage">
        <div class="picture-panel garden-panel">
          <button class="pinyin-card-display" type="button" data-action="repeat-sound" aria-label="播放拼音声音" style="--item-color: ${target.color}">
            <span>${target.label}</span>
          </button>
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="choices picture-choices" role="list" aria-label="图卡选项">
          ${question.choices.map((id) => renderChoice(question, id)).join("")}
        </div>
      </div>
    `;
  }

  if (question.type === "syllable-build") {
    return `
      <div class="question-stage flower-stage">
        <div class="sound-panel garden-panel">
          <button class="sound-disc flower-disc" type="button" data-action="repeat-sound" aria-label="播放音节声音">
            <span class="sound-letter">?</span>
          </button>
          <div class="build-slots" aria-label="已选择的声母和韵母">
            <span class="build-slot">${buildSlotText("initial")}</span>
            <span class="build-plus">+</span>
            <span class="build-slot">${buildSlotText("final")}</span>
          </div>
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="build-board" role="group" aria-label="声韵拼花选项">
          <div class="build-group">
            <span class="build-group-title sr-only">声母</span>
            <div class="build-options">
              ${question.initialChoices.map((value) => renderBuildChoice(question, "initial", value)).join("")}
            </div>
          </div>
          <div class="build-group">
            <span class="build-group-title sr-only">韵母</span>
            <div class="build-options">
              ${question.finalChoices.map((value) => renderBuildChoice(question, "final", value)).join("")}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (question.type === "category-choice") {
    return `
      <div class="question-stage">
        <div class="picture-panel garden-panel">
          ${categoryCard(target)}
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="choices basket-choices" role="list" aria-label="花篮选项">
          ${question.choices.map((id) => renderChoice(question, id)).join("")}
        </div>
      </div>
    `;
  }

  if (question.type === "mole-choice") {
    return `
      <div class="question-stage mole-stage">
        <div class="sound-panel mole-prompt-panel">
          <button class="sound-disc mole-disc" type="button" data-action="repeat-sound" aria-label="播放拼音声音">
            <span class="sound-letter">?</span>
          </button>
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="mole-yard" role="list" aria-label="拼音地鼠选项">
          ${question.choices.map((id, index) => renderMoleChoice(question, id, index)).join("")}
        </div>
      </div>
    `;
  }

  if (question.type === "tone-choice") {
    return `
      <div class="question-stage">
        <div class="tone-panel">
          <button class="sound-disc tone-disc" type="button" data-action="repeat-sound" aria-label="播放声调声音">
            <span class="sound-letter">?</span>
          </button>
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="choices tone-choices" role="list" aria-label="声调选项">
          ${question.choices.map((id) => renderChoice(question, id)).join("")}
        </div>
      </div>
    `;
  }

  return `
    <div class="question-stage">
      <div class="sound-panel">
        <button class="sound-disc" type="button" data-action="repeat-sound" aria-label="播放拼音声音">
          <span class="sound-letter" style="color: ${target.color}">?</span>
        </button>
        <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
      </div>
      <div class="choices" role="list" aria-label="拼音选项">
        ${question.choices.map((id) => renderChoice(question, id)).join("")}
      </div>
    </div>
  `;
}

function gameView() {
  const question = state.questions[state.currentIndex];
  const target = getQuestionTarget(question);
  const total = state.questions.length;
  const progress = ((state.currentIndex + Number(state.answered)) / total) * 100;
  const answeredCorrect = state.answered && state.selected === getQuestionAnswerId(question);
  const answeredWrong = state.answered && !answeredCorrect;
  const feedbackClass = answeredCorrect ? "feedback-correct" : answeredWrong ? "feedback-wrong" : "";

  return `
    <main class="screen">
      ${topbar(state.roundTitle)}
      <section class="game-layout ${feedbackClass}" aria-labelledby="game-title">
        <div class="progress-row">
          <span class="progress-text">${state.currentIndex + 1}/${total}</span>
          <div class="progress-track" aria-label="学习进度">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <button class="icon-button" type="button" data-action="repeat-prompt" aria-label="再听一次" title="再听一次">
            ${icon("repeat")}
          </button>
        </div>
        ${questionStage(question, target)}
        ${answeredCorrect ? '<div class="feedback-burst" aria-hidden="true">⭐</div>' : ""}
        <div class="feedback-row">
          <p class="feedback sr-only">${state.feedback}</p>
          <button class="icon-button" type="button" data-view="home" aria-label="返回首页" title="返回首页">
            ${icon("home")}
          </button>
        </div>
      </section>
    </main>
  `;
}

function practiceSection(title, ids) {
  return `
    <section class="practice-section" aria-labelledby="practice-${title}">
      <h2 id="practice-${title}" class="section-title">${title}</h2>
      <div class="practice-grid">
        ${ids
          .map((id) => getItem(id))
          .filter(Boolean)
          .map(
            (item) => `
              <button class="letter-card" type="button" data-practice="${item.id}">
                ${pictureArt(item)}
                <span class="letter-symbol" style="color: ${item.color}">${item.label}</span>
                <span class="text-button listen-mark" aria-hidden="true">${icon("volume")}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function tonePracticeSection() {
  return `
    <section class="practice-section" aria-labelledby="practice-tone">
      <h2 id="practice-tone" class="section-title">ā á ǎ à</h2>
      <div class="tone-card-grid">
        ${TONE_ITEMS.filter((tone) => tone.base === "a")
          .map(
            (tone) => `
              <button class="tone-card" type="button" data-tone-practice="${tone.id}">
                <span class="tone-label">${tone.label}</span>
                <span class="tone-name sr-only">${tone.name}</span>
                ${toneArt(tone)}
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function practiceView() {
  return `
    <main class="screen">
      ${topbar("练习")}
      ${practiceSection("a o e", ["a", "o", "e", "i", "u", "ü"])}
      ${practiceSection("b p m", ["b", "p", "m", "f", "d", "t", "n", "l"])}
      ${practiceSection("ba ma", ["ba", "pa", "ma", "fa", "bo", "po", "mo", "fo", "de", "te", "ne", "le"])}
      ${tonePracticeSection()}
    </main>
  `;
}

function recordWeakLabels(stat) {
  return formatPinyinList(stat.weakItems || [], "状态稳定");
}

function dailyPracticeLabels(stat) {
  return formatPinyinList([...Object.keys(stat.items || {}), ...Object.keys(stat.tones || {})], "还没有记录");
}

function dailyHistoryView(stats) {
  if (!stats.length) {
    return `<p class="empty-note">完成一轮课程后，这里会出现近 7 天记录。</p>`;
  }

  return `
    <div class="daily-list">
      ${stats
        .map(
          (stat) => `
            <article class="daily-row">
              <div>
                <strong>${stat.date} · 第 ${stat.dayIndex} 天</strong>
                <span>${stat.title}</span>
              </div>
              <div class="daily-metric">
                <strong>${stat.attempts || 0} 题</strong>
                <span>答对 ${stat.correct || 0} 题 · ${formatPercent(stat.correct || 0, stat.attempts || 0)}</span>
              </div>
              <div class="weak-note">可复习：${recordWeakLabels(stat)}</div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function recordsView() {
  const course = ensureTodayCourse();
  const todayStat = getDailyStat(course.date);
  const totalStats = totalRecordStats();
  const completedDates = completedCourseDates();
  const entries = PINYIN_ITEMS.map((letter) => {
    const record = state.progress.letters[letter.id] || { attempts: 0, correct: 0 };
    return { letter, record };
  }).filter(({ record }) => record.attempts > 0);
  const toneEntries = TONE_ITEMS.map((tone) => {
    const record = state.progress.tones[tone.id] || { attempts: 0, correct: 0 };
    return { tone, record };
  }).filter(({ record }) => record.attempts > 0);

  return `
    <main class="screen">
      ${topbar("学习记录")}
      <section class="record-panel" aria-labelledby="record-title">
        <h2 id="record-title" class="section-title">家长每日记录</h2>
        <div class="record-overview">
          <div class="overview-tile">
            <span>今日课程</span>
            <strong>第 ${course.dayIndex} 天</strong>
            <small>${course.title}</small>
          </div>
          <div class="overview-tile">
            <span>总练习</span>
            <strong>${state.progress.completedRounds} 轮</strong>
            <small>累计 ${completedDates.length} 天完成</small>
          </div>
          <div class="overview-tile">
            <span>连续完成</span>
            <strong>${currentStreakDays()} 天</strong>
            <small>按本地日期统计</small>
          </div>
          <div class="overview-tile">
            <span>总正确率</span>
            <strong>${formatPercent(totalStats.correct, totalStats.attempts)}</strong>
            <small>答对 ${totalStats.correct}/${totalStats.attempts} 题</small>
          </div>
        </div>
        <section class="record-section" aria-labelledby="today-record-title">
          <h3 id="today-record-title" class="subsection-title">今日表现</h3>
          <div class="today-record">
            <div class="today-score">
              <strong>${formatPercent(todayStat.correct, todayStat.attempts)}</strong>
              <span>答对 ${todayStat.correct || 0}/${todayStat.attempts || 0} 题</span>
            </div>
            <div class="today-detail">
              <p>今日练习：${dailyPracticeLabels(todayStat)}</p>
              <p class="weak-note">建议复习：${recordWeakLabels(todayStat)}</p>
            </div>
          </div>
        </section>
        <section class="record-section" aria-labelledby="daily-record-title">
          <h3 id="daily-record-title" class="subsection-title">近 7 天记录</h3>
          ${dailyHistoryView(recentDailyStats())}
        </section>
        <section class="record-section" aria-labelledby="pinyin-record-title">
          <h3 id="pinyin-record-title" class="subsection-title">拼音累计记录</h3>
        ${
          entries.length
            ? `<div class="stats-grid">
                ${entries
                  .map(
                    ({ letter, record }) => `
                      <div class="stat-tile">
                        <div class="stat-letter" style="color: ${letter.color}">${letter.label}</div>
                        <div class="stat-copy">练习 ${record.attempts} 次<br />答对 ${record.correct} 次<br />正确率 ${formatPercent(record.correct, record.attempts)}</div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>`
            : `<p class="empty-note">开始一轮学习后，这里会出现拼音练习记录。</p>`
        }
        </section>
        ${
          toneEntries.length
            ? `<section class="record-section" aria-labelledby="tone-record-title">
              <h3 id="tone-record-title" class="subsection-title">声调累计记录</h3>
              <div class="stats-grid tone-stats">
                ${toneEntries
                  .map(
                    ({ tone, record }) => `
                      <div class="stat-tile">
                        <div class="stat-letter" style="color: ${tone.color}">${tone.label}</div>
                        <div class="stat-copy">${tone.name}<br />练习 ${record.attempts} 次，答对 ${record.correct} 次<br />正确率 ${formatPercent(record.correct, record.attempts)}</div>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </section>`
            : ""
        }
        <div class="hero-actions" style="margin-top: 18px">
          <button class="primary-button" type="button" data-start="lesson">${icon("play")} 开始今日课程</button>
          <button class="text-button" type="button" data-action="reset-progress">${icon("repeat")} 清空记录</button>
        </div>
      </section>
    </main>
  `;
}

function resultView() {
  const learned = unique(state.learnedItems);
  const unlocked = isTodayCourseCompleted();
  const replayMode = state.mode || "lesson";
  return `
    <main class="screen result-screen">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <section class="result-panel" aria-labelledby="result-title">
        <h2 id="result-title" class="sr-only">完成</h2>
        <p class="sr-only">${learned.map((id) => getItem(id)?.label || getTone(id)?.label).filter(Boolean).join("、")}</p>
        <div class="carriage-line" aria-label="本轮车厢">
          ${learned
            .map((id) => getItem(id) || getTone(id))
            .filter(Boolean)
            .map(
              (item) => `
                <div class="carriage" style="background: ${item.color}33; border-color: ${item.color}; color: ${item.color}">
                  ${item.label}
                </div>
              `,
            )
            .join("")}
        </div>
        <div class="result-actions">
          <button class="result-replay" type="button" data-start="${replayMode}" aria-label="再玩一次">${icon("repeat")}</button>
          ${gardenEntry(unlocked)}
          <button class="garden-back" type="button" data-view="home" aria-label="回首页">${icon("home")}</button>
        </div>
      </section>
    </main>
  `;
}

function render() {
  const views = {
    home: homeView,
    garden: gardenView,
    game: gameView,
    practice: practiceView,
    records: recordsView,
    result: resultView,
  };
  app.innerHTML = views[state.view]();
}

function handleClick(event) {
  if (longPressFired) {
    longPressFired = false;
    return;
  }

  const button = event.target.closest("button");
  if (!button) return;

  const view = button.dataset.view;
  const start = button.dataset.start;
  const answerId = button.dataset.answer;
  const buildPart = button.dataset.buildPart;
  const buildValue = button.dataset.buildValue;
  const practiceId = button.dataset.practice;
  const tonePracticeId = button.dataset.tonePractice;
  const action = button.dataset.action;

  if (view) {
    stopAudio();
    resetAnswerState();
    state.view = view;
    render();
    setTimeout(() => playViewPrompt(), 180);
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

  if (buildPart && buildValue) {
    selectBuildPart(buildPart, buildValue);
    return;
  }

  if (practiceId) {
    const item = getItem(practiceId);
    const record = state.progress.letters[item.id] || { attempts: 0, correct: 0 };
    record.attempts += 1;
    state.progress.letters[item.id] = record;
    saveProgress();
    playAudioSequence([item.audio, item.wordAudio]);
    return;
  }

  if (tonePracticeId) {
    const tone = getTone(tonePracticeId);
    const record = state.progress.tones[tone.id] || { attempts: 0, correct: 0 };
    record.attempts += 1;
    state.progress.tones[tone.id] = record;
    saveProgress();
    playAudioSequence([tone.audio]);
    return;
  }

  if (action === "toggle-mute") {
    toggleMute();
    return;
  }

  if (action === "garden-locked") {
    playLockedHint();
    return;
  }

  if (action === "repeat-prompt") {
    playCurrentPrompt();
    return;
  }

  if (action === "repeat-sound") {
    playCurrentSound();
    return;
  }

  if (action === "reset-progress") {
    resetProgress();
  }
}

app.addEventListener("click", handleClick);

let longPressTimer = null;
let longPressFired = false;
const LONG_PRESS_MS = 700;

function startLongPress(event) {
  const corner = event.target.closest && event.target.closest('[data-longpress="parent"]');
  if (!corner) return;
  longPressFired = false;
  clearTimeout(longPressTimer);
  longPressTimer = setTimeout(() => {
    longPressFired = true;
    stopAudio();
    resetAnswerState();
    state.view = "records";
    render();
  }, LONG_PRESS_MS);
}

function cancelLongPress() {
  clearTimeout(longPressTimer);
  longPressTimer = null;
}

app.addEventListener("pointerdown", startLongPress);
app.addEventListener("pointerup", cancelLongPress);
app.addEventListener("pointercancel", cancelLongPress);
app.addEventListener("pointerleave", cancelLongPress);

async function init() {
  await loadProgress();
  ensureTodayCourse();
  render();
  loadAudioManifest().then(() => {
    render();
    setTimeout(() => playViewPrompt(), 180);
  });
}

globalThis.__pinyinInitPromise = init();
