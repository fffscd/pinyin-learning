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
  // 声母补全（凑满 23 个）
  { id: "g", type: "initial", label: "g", sound: "哥", word: "鸽子", emoji: "🕊️", color: "#15803d" },
  { id: "k", type: "initial", label: "k", sound: "科", word: "蝌蚪", emoji: "🐸", color: "#0d9488" },
  { id: "h", type: "initial", label: "h", sound: "喝", word: "老虎", emoji: "🐯", color: "#b45309" },
  { id: "j", type: "initial", label: "j", sound: "鸡", word: "公鸡", emoji: "🐔", color: "#c2410c" },
  { id: "q", type: "initial", label: "q", sound: "七", word: "汽车", emoji: "🚗", color: "#1d4ed8" },
  { id: "x", type: "initial", label: "x", sound: "西", word: "西瓜", emoji: "🍉", color: "#16a34a" },
  { id: "zh", type: "initial", label: "zh", sound: "知", word: "蜘蛛", emoji: "🕷️", color: "#7c3aed" },
  { id: "ch", type: "initial", label: "ch", sound: "吃", word: "尺子", emoji: "📏", color: "#be185d" },
  { id: "sh", type: "initial", label: "sh", sound: "狮", word: "狮子", emoji: "🦁", color: "#ca8a04" },
  { id: "r", type: "initial", label: "r", sound: "日", word: "太阳", emoji: "☀️", color: "#ea580c" },
  { id: "z", type: "initial", label: "z", sound: "资", word: "嘴巴", emoji: "👄", color: "#dc2626" },
  { id: "c", type: "initial", label: "c", sound: "刺", word: "刺猬", emoji: "🦔", color: "#a16207" },
  { id: "s", type: "initial", label: "s", sound: "丝", word: "松鼠", emoji: "🐿️", color: "#0891b2" },
  { id: "y", type: "initial", label: "y", sound: "衣", word: "鸭子", emoji: "🦆", color: "#2563eb" },
  { id: "w", type: "initial", label: "w", sound: "屋", word: "袜子", emoji: "🧦", color: "#9333ea" },
  // 复韵母
  { id: "ai", type: "final", label: "ai", sound: "爱", word: "爱心", emoji: "❤️", color: "#dc2626" },
  { id: "ei", type: "final", label: "ei", sound: "欸", word: "背包", emoji: "🎒", color: "#16a34a" },
  { id: "ui", type: "final", label: "ui", sound: "威", word: "乌龟", emoji: "🐢", color: "#0d9488" },
  { id: "ao", type: "final", label: "ao", sound: "熬", word: "小猫", emoji: "🐱", color: "#ca8a04" },
  { id: "ou", type: "final", label: "ou", sound: "欧", word: "海鸥", emoji: "🐦", color: "#2563eb" },
  { id: "iu", type: "final", label: "iu", sound: "优", word: "皮球", emoji: "🏀", color: "#ea580c" },
  { id: "ie", type: "final", label: "ie", sound: "耶", word: "树叶", emoji: "🍃", color: "#15803d" },
  { id: "üe", type: "final", label: "üe", sound: "约", word: "月亮", emoji: "🌙", color: "#7c3aed" },
  { id: "er", type: "final", label: "er", sound: "儿", word: "耳朵", emoji: "👂", color: "#be185d" },
  // 鼻韵母
  { id: "an", type: "final", label: "an", sound: "安", word: "帆船", emoji: "⛵", color: "#1d4ed8" },
  { id: "en", type: "final", label: "en", sound: "恩", word: "大门", emoji: "🚪", color: "#a16207" },
  { id: "in", type: "final", label: "in", sound: "因", word: "树林", emoji: "🌲", color: "#15803d" },
  { id: "un", type: "final", label: "un", sound: "温", word: "裙子", emoji: "👗", color: "#be185d" },
  { id: "ün", type: "final", label: "ün", sound: "晕", word: "白云", emoji: "☁️", color: "#0891b2" },
  { id: "ang", type: "final", label: "ang", sound: "昂", word: "山羊", emoji: "🐑", color: "#ca8a04" },
  { id: "eng", type: "final", label: "eng", sound: "鞥", word: "台灯", emoji: "💡", color: "#d97706" },
  { id: "ing", type: "final", label: "ing", sound: "英", word: "星星", emoji: "⭐", color: "#2563eb" },
  { id: "ong", type: "final", label: "ong", sound: "翁", word: "时钟", emoji: "🕐", color: "#dc2626" },
  // 整体认读音节
  { id: "zhi", type: "whole", label: "zhi", sound: "知", word: "蜘蛛", emoji: "🕷️", color: "#7c3aed" },
  { id: "chi", type: "whole", label: "chi", sound: "吃", word: "尺子", emoji: "📏", color: "#be185d" },
  { id: "shi", type: "whole", label: "shi", sound: "石", word: "石头", emoji: "🪨", color: "#ca8a04" },
  { id: "ri", type: "whole", label: "ri", sound: "日", word: "太阳", emoji: "☀️", color: "#ea580c" },
  { id: "zi", type: "whole", label: "zi", sound: "字", word: "桌子", emoji: "🪑", color: "#dc2626" },
  { id: "ci", type: "whole", label: "ci", sound: "词", word: "刺猬", emoji: "🦔", color: "#a16207" },
  { id: "si", type: "whole", label: "si", sound: "丝", word: "丝瓜", emoji: "🥒", color: "#0891b2" },
  { id: "yi", type: "whole", label: "yi", sound: "衣", word: "衣服", emoji: "👕", color: "#2563eb" },
  { id: "wu", type: "whole", label: "wu", sound: "屋", word: "乌龟", emoji: "🐢", color: "#9333ea" },
  { id: "yu", type: "whole", label: "yu", sound: "鱼", word: "金鱼", emoji: "🐠", color: "#0d9488" },
  { id: "ye", type: "whole", label: "ye", sound: "椰", word: "椰子", emoji: "🥥", color: "#15803d" },
  { id: "yue", type: "whole", label: "yue", sound: "月", word: "月亮", emoji: "🌙", color: "#7c3aed" },
  { id: "yuan", type: "whole", label: "yuan", sound: "圆", word: "圆圈", emoji: "⭕", color: "#dc2626" },
  { id: "yin", type: "whole", label: "yin", sound: "音", word: "音乐", emoji: "🎵", color: "#be185d" },
  { id: "yun", type: "whole", label: "yun", sound: "云", word: "白云", emoji: "☁️", color: "#0891b2" },
  { id: "ying", type: "whole", label: "ying", sound: "鹰", word: "老鹰", emoji: "🦅", color: "#b45309" },
  // 拼读巩固音节（仅用于拼读/认读，不进入图卡游戏）
  { id: "ge", type: "syllable", label: "ge", sound: "哥", word: "哥哥", emoji: "👦", color: "#15803d", pictureable: false },
  { id: "ke", type: "syllable", label: "ke", sound: "科", word: "科学", emoji: "🔬", color: "#0d9488", pictureable: false },
  { id: "he", type: "syllable", label: "he", sound: "喝", word: "喝水", emoji: "🥤", color: "#b45309", pictureable: false },
  { id: "ji", type: "syllable", label: "ji", sound: "鸡", word: "母鸡", emoji: "🐔", color: "#c2410c", pictureable: false },
  { id: "qi", type: "syllable", label: "qi", sound: "七", word: "骑车", emoji: "🚲", color: "#1d4ed8", pictureable: false },
  { id: "xi", type: "syllable", label: "xi", sound: "西", word: "西瓜", emoji: "🍉", color: "#16a34a", pictureable: false },
  { id: "gu", type: "syllable", label: "gu", sound: "姑", word: "小鼓", emoji: "🥁", color: "#15803d", pictureable: false },
  { id: "ku", type: "syllable", label: "ku", sound: "哭", word: "哭脸", emoji: "😢", color: "#0d9488", pictureable: false },
  { id: "hu", type: "syllable", label: "hu", sound: "呼", word: "老虎", emoji: "🐯", color: "#b45309", pictureable: false },
  { id: "zha", type: "syllable", label: "zha", sound: "炸", word: "炸虾", emoji: "🍤", color: "#7c3aed", pictureable: false },
  { id: "cha", type: "syllable", label: "cha", sound: "茶", word: "茶杯", emoji: "🍵", color: "#be185d", pictureable: false },
  { id: "sha", type: "syllable", label: "sha", sound: "沙", word: "沙子", emoji: "🏖️", color: "#ca8a04", pictureable: false },
  { id: "ya", type: "syllable", label: "ya", sound: "鸭", word: "鸭子", emoji: "🦆", color: "#2563eb", pictureable: false },
  { id: "wa", type: "syllable", label: "wa", sound: "娃", word: "娃娃", emoji: "🪆", color: "#9333ea", pictureable: false },
  { id: "re", type: "syllable", label: "re", sound: "热", word: "很热", emoji: "🔥", color: "#ea580c", pictureable: false },
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
const COMPOUND_FINAL_IDS = ["ai", "ei", "ui", "ao", "ou", "iu", "ie", "üe", "er"];
const NASAL_FINAL_IDS = ["an", "en", "in", "un", "ün", "ang", "eng", "ing", "ong"];
const ALL_FINAL_IDS = [...FINAL_IDS, ...COMPOUND_FINAL_IDS, ...NASAL_FINAL_IDS];
// 多字符声母排在前面，配合 splitSyllable 的最长前缀匹配
const INITIAL_IDS = ["zh", "ch", "sh", "b", "p", "m", "f", "d", "t", "n", "l", "g", "k", "h", "j", "q", "x", "r", "z", "c", "s", "y", "w"];
const SIMPLE_SYLLABLE_IDS = ["ba", "pa", "ma", "fa", "bo", "po", "mo", "fo", "de", "te", "ne", "le", "da", "ta", "na", "la"];
const BLEND_SYLLABLE_IDS = [...SIMPLE_SYLLABLE_IDS, "ge", "ke", "he", "ji", "qi", "xi", "gu", "ku", "hu", "zha", "cha", "sha", "ya", "wa", "re"];
const WHOLE_IDS = ["zhi", "chi", "shi", "ri", "zi", "ci", "si", "yi", "wu", "yu", "ye", "yue", "yuan", "yin", "yun", "ying"];
const ILLUSTRATION_IDS = ["a", "o", "e", "i", "u", "ü", "b", "p", "m", "f", "d", "t", "n", "l", "ba", "pa", "ma", "fa", "bo", "po", "mo", "da", "ta", "na", "la"];
const CONFUSABLE_PARTNER = { b: "p", p: "b", d: "t", t: "d", n: "l", l: "n", g: "k", k: "g", j: "q", q: "j", z: "zh", zh: "z", c: "ch", ch: "c", s: "sh", sh: "s" };
const SCENE_HUNT_SCENES = [
  {
    id: "park",
    label: "公园",
    spots: [
      { itemId: "a", x: 12, y: 42, w: 20, h: 34 },
      { itemId: "o", x: 68, y: 44, w: 18, h: 30 },
      { itemId: "i", x: 37, y: 18, w: 18, h: 28 },
      { itemId: "u", x: 7, y: 8, w: 20, h: 25 },
      { itemId: "ü", x: 70, y: 10, w: 20, h: 28 },
    ],
  },
];
const GARDEN_GAME_MODES = [
  {
    mode: "tones",
    title: "声调",
    text: "听声调，选择对应轨迹。",
    icon: "tone",
    color: "#238755",
    bg: "#ecfbf1",
  },
  {
    mode: "pictures",
    title: "配图",
    text: "看图片，找到对应拼音。",
    icon: "image",
    color: "#a86413",
    bg: "#fff6db",
  },
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
  {
    mode: "read",
    title: "认读",
    text: "看音节，自己读出来。",
    icon: "volume",
    color: "#2477d6",
    bg: "#eaf4ff",
  },
  {
    mode: "hunt",
    title: "寻宝",
    text: "听声音，在场景里找到物品。",
    icon: "search",
    color: "#8b5cf6",
    bg: "#f3efff",
  },
  {
    mode: "feed",
    title: "喂养",
    text: "读出拼音，把食物喂给小动物。",
    icon: "animal",
    color: "#d85a45",
    bg: "#fff0ec",
  },
];

const HOME_MODE_CARDS = [
  { mode: "lesson", icon: "train", label: "今天的学习", color: "#2477d6", bg: "#eaf4ff" },
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

// 第二个月起的课程单元。每个单元按 groups 逐日引入新内容，单元末追加一次巩固日。
// 复习题由间隔重复调度器在 buildCourse 中填充，这里的 reviewItems 仅作早期回退种子。
const CURRICULUM_UNITS = [
  { title: "声母 g k h", groups: [["g"], ["k"], ["h"]], pictureItems: ["g", "k", "h"] },
  { title: "声母 j q x", groups: [["j"], ["q"], ["x"]], pictureItems: ["j", "q", "x"] },
  { title: "翘舌 zh ch sh", groups: [["zh"], ["ch"], ["sh"]], pictureItems: ["zh", "ch", "sh"], blend: true },
  { title: "声母 r z c s", groups: [["r"], ["z"], ["c"], ["s"]], pictureItems: ["r", "z", "c", "s"] },
  { title: "声母 y w", groups: [["y"], ["w"]], pictureItems: ["y", "w"], blend: true },
  { title: "复韵母 ai ei ui", groups: [["ai"], ["ei"], ["ui"]], pictureItems: ["ai", "ei", "ui"] },
  { title: "复韵母 ao ou iu", groups: [["ao"], ["ou"], ["iu"]], pictureItems: ["ao", "ou", "iu"] },
  { title: "复韵母 ie üe er", groups: [["ie"], ["üe"], ["er"]], pictureItems: ["ie", "üe", "er"] },
  { title: "前鼻韵母 an en in", groups: [["an"], ["en"], ["in"]], pictureItems: ["an", "en", "in"] },
  { title: "前鼻韵母 un ün", groups: [["un"], ["ün"]], pictureItems: ["un", "ün"] },
  { title: "后鼻韵母 ang eng", groups: [["ang"], ["eng"]], pictureItems: ["ang", "eng"] },
  { title: "后鼻韵母 ing ong", groups: [["ing"], ["ong"]], pictureItems: ["ing", "ong"] },
  { title: "整体认读 zhi chi shi ri", groups: [["zhi"], ["chi"], ["shi"], ["ri"]], pictureItems: ["zhi", "chi", "shi", "ri"], read: true },
  { title: "整体认读 zi ci si", groups: [["zi"], ["ci"], ["si"]], pictureItems: ["zi", "ci", "si"], read: true },
  { title: "整体认读 yi wu yu", groups: [["yi"], ["wu"], ["yu"]], pictureItems: ["yi", "wu", "yu"], read: true },
  { title: "整体认读 ye yue yuan", groups: [["ye"], ["yue"], ["yuan"]], pictureItems: ["ye", "yue", "yuan"], read: true },
  { title: "整体认读 yin yun ying", groups: [["yin"], ["yun"], ["ying"]], pictureItems: ["yin", "yun", "ying"], read: true },
  { title: "拼读巩固 g k h j q x", groups: [["ge", "ke", "he"], ["ji", "qi", "xi"], ["gu", "ku", "hu"]], blend: true, read: true },
  { title: "拼读巩固 zh ch sh y w r", groups: [["zha", "cha", "sha"], ["ya", "wa", "re"]], blend: true, read: true },
];

function labelsOf(ids) {
  return ids.join(" ");
}

function expandCurriculumUnit(unit) {
  const days = [];
  const unitItems = unit.groups.flat();
  unit.groups.forEach((group) => {
    days.push({
      title: unit.title,
      newItems: group,
      reviewItems: [],
      pictureItems: unit.pictureItems ? group.filter((id) => unit.pictureItems.includes(id)) : [],
      blend: Boolean(unit.blend),
      focus: `认识 ${labelsOf(group)}`,
    });
  });
  days.push({
    title: `${unit.title} · 巩固`,
    newItems: [],
    reviewItems: unitItems,
    pictureItems: unit.pictureItems || [],
    blend: Boolean(unit.blend),
    read: Boolean(unit.read),
    useWeakReview: true,
    questionCount: 8,
    focus: `复习 ${unit.title}`,
  });
  return days;
}

const COURSE_PLAN = [...COURSE_PLAN_30_DAYS, ...CURRICULUM_UNITS.flatMap(expandCurriculumUnit)];

// 学完全部引入日后，每天合成一个综合复习日，由间隔重复驱动，长期覆盖一整年。
function makeReviewDayPlan(dayIndex) {
  return {
    title: "综合复习",
    newItems: [],
    reviewItems: [],
    blend: true,
    read: true,
    useWeakReview: true,
    questionCount: 8,
    focus: "综合复习与拼读认读",
    weeklyReview: false,
  };
}

function getCourseStep(dayIndex, rhythmFromDay = state.progress.rhythmFromDay || 31) {
  if (dayIndex < rhythmFromDay) return dayIndex;
  const offset = dayIndex - rhythmFromDay;
  return rhythmFromDay - 1 + Math.floor(offset / 7) * 5 + Math.min((offset % 7) + 1, 5);
}

function getRhythmDayType(dayIndex, rhythmFromDay = state.progress.rhythmFromDay || 31) {
  if (dayIndex < rhythmFromDay) return "lesson";
  const cycleDay = (dayIndex - rhythmFromDay) % 7;
  if (cycleDay === 5) return "review";
  if (cycleDay === 6) return "free";
  return "lesson";
}

function makeFreePlayPlan(dayIndex) {
  return {
    title: "花园日",
    newItems: [],
    reviewItems: [],
    freePlay: true,
    questionCount: DEFAULT_ROUND_SIZE,
    focus: "自由游戏",
    dayIndex,
  };
}

function getDailyPlan(dayIndex, rhythmFromDay = state.progress.rhythmFromDay || 31) {
  const dayType = getRhythmDayType(dayIndex, rhythmFromDay);
  if (dayType === "free") return makeFreePlayPlan(dayIndex);
  if (dayType === "review") return { ...makeReviewDayPlan(dayIndex), weeklyReview: true };
  const courseStep = getCourseStep(dayIndex, rhythmFromDay);
  return COURSE_PLAN[courseStep - 1] || makeReviewDayPlan(dayIndex);
}

const PROGRESS_API_PATH = "/api/progress";
const PROGRESS_STORAGE_KEY = "pinyin-learning-progress-v1";
const DEFAULT_ROUND_SIZE = 5;
const LESSON_SOFT_CAP_MS = 8 * 60 * 1000;
const WEEKLY_TIP_TEMPLATES = {
  initial: (item) => `请孩子当小老师教你读 ${item.label}，你故意读错一次，请他帮你改正。`,
  final: (item) => `生活里见到“${item.word}”时，可以一起找一找 ${item.label} 的声音。`,
  syllable: (item) => `吃饭或散步时说一个带 ${item.label} 的词，再请孩子接一个。`,
  whole: (item) => `把 ${item.label} 写在小纸片上，藏起来请孩子找到后读给你听。`,
};
const OFFLINE_TASK_TEMPLATES = {
  initial: [
    (item) => `请孩子当小老师教你读 ${item.label}，你故意读错一次，请他纠正。`,
    (item) => `在家里找一个能联想到“${item.word}”的东西，找到后一起读 ${item.label}。`,
  ],
  final: [
    (item) => `散步时找三个圆圆的东西，每找到一个就一起读 ${item.label}。`,
    (item) => `说出“${item.word}”，请孩子听一听里面的 ${item.label}。`,
  ],
  syllable: [
    (item) => `玩拼音接龙：你先读 ${item.label}，孩子说一个带这个音的词。`,
    (item) => `把 ${item.label} 写在纸上，请孩子读出来，再说“${item.word}”。`,
  ],
  whole: [
    (item) => `请孩子找到 ${item.label} 卡片并读给你听，再一起说“${item.word}”。`,
    (item) => `轮流读 ${item.label}，谁读完就拍一下手。`,
  ],
};
const STARS_PER_UNLOCK = 20;
const UNLOCK_CATALOG = [
  { id: "train-coral", kind: "train-color", color: "#e66b56", art: "●" },
  { id: "train-green", kind: "train-color", color: "#35a56a", art: "●" },
  { id: "train-purple", kind: "train-color", color: "#8b5cf6", art: "●" },
  { id: "train-gold", kind: "train-color", color: "#d89b20", art: "●" },
  { id: "pet-rabbit", kind: "garden-pet", art: "🐰" },
  { id: "pet-panda", kind: "garden-pet", art: "🐼" },
  { id: "pet-bear", kind: "garden-pet", art: "🐻" },
  { id: "pet-cat", kind: "garden-pet", art: "🐱" },
  { id: "pet-bird", kind: "garden-pet", art: "🐦" },
];
const AUDIO_PROMPTS = {
  find: "assets/audio/prompts/find.mp3",
  picture: "assets/audio/prompts/picture.mp3",
  tone: "assets/audio/prompts/tone.mp3",
  correct: "assets/audio/prompts/correct.mp3",
  retry: "assets/audio/prompts/retry.mp3",
  complete: "assets/audio/prompts/complete.mp3",
  greet: "assets/audio/prompts/greet.mp3",
  arrive: "assets/audio/prompts/arrive.mp3",
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
  roundStars: 0,
  roundStartedAt: 0,
  answeredQuestionCount: 0,
  wrongCount: 0,
  revealing: false,
  wrongAnsweredIds: new Set(),
  resultReason: "complete",
  resultPhase: "stars",
  fullResultSequence: false,
  guideExpression: "idle",
  parentGate: null,
  spotCheck: null,
  resetRequested: false,
  gardenPlantOpen: "",
  molePace: "calm",
  moleRecent: [],
  moleWrongStreak: 0,
  activeSceneId: "",
  sceneIntro: false,
  sceneFoundIds: [],
  micAvailable: typeof navigator !== "undefined" && Boolean(navigator.mediaDevices?.getUserMedia),
  voiceDetector: null,
  feedEating: false,
  buildBaseReady: false,
  questionHadError: false,
  boxOpen: false,
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
    stars: 0,
    letters: {},
    tones: {},
    courseStartDate: "",
    courses: {},
    dailyStats: {},
    rhythmFromDay: 31,
    settings: {
      muted: false,
      micEnabled: false,
      lessonMinutes: 8,
    },
    unlocks: [],
    activeTrainColor: "train-blue",
    garden: [],
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
    star: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path class="icon-fill" d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.9 6.6 20l1-6.1L3.2 9.5l6.1-.9L12 3Z"/></svg>',
    box: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5v-7Z"/><path d="M3 8.5 12 13l9-4.5"/><path d="M12 13v7"/><path class="icon-fill" d="m12 6.4 1.4 2.9 3.1.4-2.2 2.2.5 3.1-2.8-1.5-2.8 1.5.5-3.1L7.5 9.7l3.1-.4L12 6.4Z"/></svg>',
    close: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12"/><path d="M18 6 6 18"/></svg>',
    search: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></svg>',
    animal: '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9 4 4l5 3M18 9l2-5-5 3"/><circle cx="12" cy="13" r="8"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M10 16h4"/></svg>',
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

function trainArt(expression = "idle", compact = false) {
  const mouthPath = expression === "soothe" ? "M82 184 Q100 176 118 184" : "M82 180 Q100 196 118 180";
  const trainColor = getActiveTrainColor();
  return `
    <svg class="train-scene guide-character guide-${expression} ${compact ? "guide-compact" : ""}" viewBox="0 0 420 300" role="img" aria-label="拼音小火车">
      <rect x="22" y="226" width="376" height="8" rx="4" fill="#5f738a"/>
      <circle cx="82" cy="238" r="12" fill="#223047"/>
      <circle cx="172" cy="238" r="12" fill="#223047"/>
      <circle cx="264" cy="238" r="12" fill="#223047"/>
      <circle cx="348" cy="238" r="12" fill="#223047"/>
      <rect x="46" y="120" width="108" height="92" rx="8" fill="${trainColor}" stroke="#223047" stroke-width="5"/>
      <rect x="70" y="88" width="60" height="42" rx="8" fill="#ffe9a6" stroke="#223047" stroke-width="5"/>
      <rect x="166" y="144" width="84" height="68" rx="8" fill="#ffb8a4" stroke="#223047" stroke-width="5"/>
      <rect x="264" y="144" width="84" height="68" rx="8" fill="#dff5df" stroke="#223047" stroke-width="5"/>
      <path d="M154 176h12M250 176h14" stroke="#223047" stroke-width="5" stroke-linecap="round"/>
      <text x="100" y="178" text-anchor="middle" font-size="46" font-weight="900" fill="#fff">a</text>
      <g class="guide-face" fill="none" stroke="#223047" stroke-width="5" stroke-linecap="round">
        <path class="guide-eye guide-eye-left" d="M76 151h10"/>
        <path class="guide-eye guide-eye-right" d="M114 151h10"/>
        <path class="guide-mouth" d="${mouthPath}"/>
      </g>
      <g class="guide-steam" fill="none" stroke="#35a56a" stroke-width="7" stroke-linecap="round">
        <path d="M50 111c-14-24 7-41 25-26"/>
        <path d="M62 92c-5-18 12-28 25-18"/>
      </g>
      <g class="guide-confetti" aria-hidden="true">
        <circle cx="34" cy="78" r="7" fill="#ffb8a4"/>
        <circle cx="112" cy="64" r="6" fill="#ffe9a6"/>
        <circle cx="145" cy="90" r="7" fill="#dff5df"/>
      </g>
      <text x="208" y="190" text-anchor="middle" font-size="42" font-weight="900" fill="#223047">b</text>
      <text x="306" y="190" text-anchor="middle" font-size="42" font-weight="900" fill="#223047">m</text>
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
  const oldUserRhythmDay = saved.courseStartDate
    ? diffDays(saved.courseStartDate, getLocalDateId()) + 2
    : 31;
  const savedSettings = saved.settings && typeof saved.settings === "object" ? saved.settings : {};
  return {
    ...createEmptyProgress(),
    completedRounds: Number(saved.completedRounds || 0),
    muted: Boolean(saved.muted),
    stars: Number(saved.stars) || 0,
    letters: saved.letters && typeof saved.letters === "object" ? saved.letters : {},
    tones: saved.tones && typeof saved.tones === "object" ? saved.tones : {},
    courseStartDate: typeof saved.courseStartDate === "string" ? saved.courseStartDate : "",
    courses: saved.courses && typeof saved.courses === "object" ? saved.courses : {},
    dailyStats: saved.dailyStats && typeof saved.dailyStats === "object" ? saved.dailyStats : {},
    rhythmFromDay: Number.isFinite(saved.rhythmFromDay) ? saved.rhythmFromDay : oldUserRhythmDay,
    settings: {
      muted: Boolean(savedSettings.muted ?? saved.muted),
      micEnabled: Boolean(savedSettings.micEnabled),
      lessonMinutes: [5, 8, 10].includes(Number(savedSettings.lessonMinutes))
        ? Number(savedSettings.lessonMinutes)
        : 8,
    },
    unlocks: Array.isArray(saved.unlocks) ? unique(saved.unlocks) : [],
    activeTrainColor: typeof saved.activeTrainColor === "string" ? saved.activeTrainColor : "train-blue",
    garden: Array.isArray(saved.garden)
      ? saved.garden
          .filter((entry) => entry && ITEM_BY_ID.has(entry.id) && typeof entry.date === "string")
          .slice(0, 366)
      : [],
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
      state.muted = state.progress.settings.muted;
      return;
    } catch {
      // GitHub Pages 没有后端接口，继续读取浏览器本地存储。
    }
  }

  state.progress = loadLocalProgress() || createEmptyProgress();
  state.muted = state.progress.settings.muted;
}

async function saveProgress() {
  state.progress.muted = state.muted;
  state.progress.settings.muted = state.muted;

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

function hasIllustration(id) {
  return ILLUSTRATION_IDS.includes(id);
}

function getTone(id) {
  return TONE_BY_ID.get(id);
}

function getQuestionTarget(question) {
  return question.type === "tone-choice" ? getTone(question.target) : getItem(question.target);
}

function getCourseDayIndex(dateId) {
  const startDate = state.progress.courseStartDate || dateId;
  return Math.max(1, diffDays(startDate, dateId) + 1);
}

function getUnlockedPinyinIds(dayIndex) {
  const ids = [];
  const courseStep = getCourseStep(dayIndex);
  const limit = Math.min(courseStep, COURSE_PLAN.length);
  COURSE_PLAN.slice(0, limit).forEach((plan) => {
    ids.push(...(plan.newItems || []), ...(plan.reviewItems || []), ...(plan.pictureItems || []));
  });
  if (courseStep > COURSE_PLAN.length) {
    ids.push(...ALL_FINAL_IDS, ...INITIAL_IDS, ...BLEND_SYLLABLE_IDS, ...WHOLE_IDS);
  }
  return unique(ids).filter((id) => ITEM_BY_ID.has(id));
}

// 间隔重复（Leitner 盒子）：box 0..5，间隔表为 box 对应的天数
const SR_INTERVALS = [1, 2, 4, 8, 16, 32];
const SR_MAX_BOX = SR_INTERVALS.length - 1;

function getLetterRecord(id) {
  const rec = state.progress.letters[id] || {};
  return {
    attempts: Number(rec.attempts) || 0,
    correct: Number(rec.correct) || 0,
    box: Number(rec.box) || 0,
    dueDay: Number.isFinite(rec.dueDay) ? rec.dueDay : 0,
    lastDay: Number.isFinite(rec.lastDay) ? rec.lastDay : -1,
    streak: Number(rec.streak) || 0,
    lastFailDay: Number.isFinite(rec.lastFailDay) ? rec.lastFailDay : null,
  };
}

function currentDayNumber() {
  return getCourseDayIndex(getLocalDateId());
}

function updateLetterSchedule(id, isCorrect, source = "objective") {
  const record = getLetterRecord(id);
  const today = currentDayNumber();
  record.attempts += 1;
  record.lastDay = today;
  if (isCorrect) {
    record.correct += 1;
    record.lastFailDay = null;
    if (source === "self") {
      record.dueDay = today + SR_INTERVALS[record.box];
      state.progress.letters[id] = record;
      return;
    }
    record.streak += 1;
    record.box = Math.min(record.box + 1, SR_MAX_BOX);
    record.dueDay = today + SR_INTERVALS[record.box];
  } else if (record.lastFailDay !== today) {
    record.lastFailDay = today;
    record.streak = 0;
    record.dueDay = today;
  } else {
    record.streak = 0;
    record.box = Math.max(record.box - 1, 0);
    record.dueDay = today + 1;
  }
  state.progress.letters[id] = record;
}

function getDueReviewIds(allowedIds, today) {
  return unique(allowedIds)
    .map((id) => ({ id, rec: getLetterRecord(id) }))
    .filter(({ id, rec }) => ITEM_BY_ID.has(id) && rec.attempts > 0 && rec.dueDay <= today)
    .sort((a, b) => a.rec.dueDay - b.rec.dueDay || a.rec.box - b.rec.box)
    .map(({ id }) => id);
}

function masteryBreakdown() {
  const result = {
    mastered: 0,
    reviewing: 0,
    weak: 0,
    masteredIds: [],
    reviewingIds: [],
    weakIds: [],
  };
  Object.keys(state.progress.letters).forEach((id) => {
    if (!ITEM_BY_ID.has(id)) return;
    const rec = getLetterRecord(id);
    if (rec.attempts === 0) return;
    if (rec.box >= SR_MAX_BOX) {
      result.mastered += 1;
      result.masteredIds.push(id);
    } else if (rec.attempts >= 2 && rec.correct / rec.attempts < 0.6) {
      result.weak += 1;
      result.weakIds.push(id);
    } else {
      result.reviewing += 1;
      result.reviewingIds.push(id);
    }
  });
  return result;
}

function availableUnlockCount() {
  return Math.max(0, Math.floor(state.progress.stars / STARS_PER_UNLOCK) - state.progress.unlocks.length);
}

function unlockDecoration(id) {
  const decoration = UNLOCK_CATALOG.find((entry) => entry.id === id);
  if (!decoration || state.progress.unlocks.includes(id) || availableUnlockCount() <= 0) return false;
  state.progress.unlocks.push(id);
  if (decoration.kind === "train-color") state.progress.activeTrainColor = id;
  saveProgress();
  return true;
}

function activateTrainColor(id) {
  const decoration = UNLOCK_CATALOG.find((entry) => entry.id === id && entry.kind === "train-color");
  if (!decoration || !state.progress.unlocks.includes(id)) return false;
  state.progress.activeTrainColor = id;
  saveProgress();
  return true;
}

function getActiveTrainColor() {
  if (state.progress.activeTrainColor === "train-blue") return "#4b8fe8";
  return UNLOCK_CATALOG.find((entry) => entry.id === state.progress.activeTrainColor)?.color || "#4b8fe8";
}

function plantGardenItem(id, dateId = getLocalDateId()) {
  if (!ITEM_BY_ID.has(id) || state.progress.garden.length >= 366) return false;
  if (state.progress.garden.some((entry) => entry.date === dateId)) return false;
  state.progress.garden.push({ id, date: dateId });
  return true;
}

function selectGardenPlantId() {
  const newItem = state.learnedItems.length ? state.todayCourse?.newItems?.[0] : "";
  if (newItem) return newItem;
  const stat = state.progress.dailyStats[getLocalDateId()];
  const strongestReview = Object.entries(stat?.items || {})
    .sort((a, b) => Number(b[1].correct || 0) - Number(a[1].correct || 0))[0]?.[0];
  return strongestReview || state.learnedItems[0] || "";
}

function gardenFlowerArt(item, index) {
  const petals = [5, 6, 7, 8][index % 4];
  const circles = Array.from({ length: petals }, (_, petalIndex) => {
    const angle = (Math.PI * 2 * petalIndex) / petals;
    const x = 50 + Math.cos(angle) * 22;
    const y = 38 + Math.sin(angle) * 22;
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="${item.color}99"/>`;
  }).join("");
  return `
    <svg class="garden-flower-art" viewBox="0 0 100 120" aria-hidden="true">
      <path d="M50 56v54M50 82c-18-3-25-14-28-26 15 0 25 7 28 20M50 92c18-3 25-14 28-26-15 0-25 7-28 20" fill="none" stroke="#4f9655" stroke-width="6" stroke-linecap="round"/>
      ${circles}
      <circle cx="50" cy="38" r="16" fill="#ffe9a6"/>
      <text x="50" y="45" text-anchor="middle" font-size="20" font-weight="900" fill="#223047">${item.label}</text>
    </svg>
  `;
}

function makeParentGateQuestion(rng = Math.random) {
  const left = 1 + Math.floor(rng() * 5);
  const right = 1 + Math.floor(rng() * Math.max(1, 10 - left));
  const answer = left + right;
  const candidates = unique([
    answer,
    Math.max(0, answer - 1),
    Math.min(10, answer + 1),
    Math.max(0, answer - 2),
    Math.min(10, answer + 2),
  ]);
  while (candidates.length < 3) candidates.push(candidates.length);
  return {
    left,
    right,
    answer,
    options: shuffle(candidates.slice(0, 3), rng),
  };
}

function openParentGate() {
  state.parentGate = makeParentGateQuestion();
  state.view = "parent-gate";
  render();
}

function answerParentGate(value) {
  if (Number(value) === state.parentGate?.answer) {
    state.view = "records";
    state.parentGate = null;
  } else {
    state.parentGate = makeParentGateQuestion();
  }
  render();
}

function applySpotCheckResult(id, isCorrect) {
  const today = currentDayNumber();
  if (isCorrect) {
    updateLetterSchedule(id, true, "objective");
  } else {
    const record = getLetterRecord(id);
    record.attempts += 1;
    record.box = 2;
    record.dueDay = today + 1;
    record.lastDay = today;
    record.lastFailDay = today;
    record.streak = 0;
    state.progress.letters[id] = record;
  }

  recordDailyQuestionResult({ type: "spot-check", target: id }, isCorrect);
  const stat = getDailyStat();
  stat.spotChecks = stat.spotChecks || { attempts: 0, correct: 0 };
  stat.spotChecks.attempts += 1;
  if (isCorrect) stat.spotChecks.correct += 1;
}

function buildSpotCheckItems() {
  const candidates = unique([...WHOLE_IDS, ...BLEND_SYLLABLE_IDS])
    .filter((id) => getLetterRecord(id).box >= 4)
    .sort((a, b) => getLetterRecord(a).box - getLetterRecord(b).box || a.localeCompare(b));
  return candidates.slice(0, 3);
}

function startSpotCheck() {
  const ids = buildSpotCheckItems();
  state.spotCheck = ids.length ? { ids, index: 0 } : null;
  render();
}

function answerSpotCheck(isCorrect) {
  const id = state.spotCheck?.ids[state.spotCheck.index];
  if (!id) return;
  applySpotCheckResult(id, isCorrect);
  state.spotCheck.index += 1;
  if (state.spotCheck.index >= state.spotCheck.ids.length) state.spotCheck = null;
  saveProgress();
  render();
}

function recentDateIds(endDateId, limit = 7) {
  const end = parseDateId(endDateId);
  return Array.from({ length: limit }, (_, offset) => {
    const date = new Date(end.getFullYear(), end.getMonth(), end.getDate() - offset);
    return getLocalDateId(date);
  });
}

function buildWeeklyReport(endDateId = getLocalDateId()) {
  const dateIds = recentDateIds(endDateId, 7);
  const stats = dateIds.map((dateId) => state.progress.dailyStats[dateId]).filter(Boolean);
  const newItems = unique(
    stats.flatMap((stat) => getDailyPlan(stat.dayIndex || getCourseDayIndex(stat.date)).newItems || []),
  );
  const attempts = stats.reduce((sum, stat) => sum + Number(stat.attempts || 0), 0);
  const correct = stats.reduce((sum, stat) => sum + Number(stat.correct || 0), 0);
  const completedDays = stats.filter((stat) => stat.completedAt).length;
  const unlocked = new Set(getUnlockedPinyinIds(currentDayNumber()));
  const weakItems = masteryBreakdown()
    .weakIds.filter((id) => unlocked.has(id))
    .sort((a, b) => getLetterRecord(a).box - getLetterRecord(b).box)
    .slice(0, 5)
    .map((id) => ({ id, item: getItem(id), box: getLetterRecord(id).box }));
  const spotChecks = stats.reduce(
    (sum, stat) => ({
      attempts: sum.attempts + Number(stat.spotChecks?.attempts || 0),
      correct: sum.correct + Number(stat.spotChecks?.correct || 0),
    }),
    { attempts: 0, correct: 0 },
  );
  const offlineCompleted = stats.reduce((sum, stat) => sum + Number(stat.offlineTasks?.attempts || 0), 0);
  const tipItems = unique([...newItems, ...weakItems.map((entry) => entry.id)])
    .map(getItem)
    .filter(Boolean);
  const tips = shuffle(tipItems, seededRandom(`${dateIds[dateIds.length - 1]}-weekly-tips`))
    .slice(0, 3)
    .map((item) => (WEEKLY_TIP_TEMPLATES[item.type] || WEEKLY_TIP_TEMPLATES.syllable)(item));
  return {
    dateIds,
    courseDay: currentDayNumber(),
    availableDays: stats.length,
    newItems,
    attempts,
    correct,
    completedDays,
    weakItems,
    spotChecks,
    offlineCompleted,
    tips,
  };
}

function buildOfflineTasks(dateId = getLocalDateId()) {
  const today = getCourseDayIndex(dateId);
  const mastery = masteryBreakdown();
  const completedIds = new Set(getDailyStat(dateId).offlineTaskIds || []);
  const due = new Set(getDueReviewIds(mastery.weakIds, today));
  const ordered = [...mastery.weakIds].sort((a, b) => {
    const dueOrder = Number(due.has(b)) - Number(due.has(a));
    return dueOrder || getLetterRecord(a).box - getLetterRecord(b).box || a.localeCompare(b);
  });
  return ordered
    .filter((id) => !completedIds.has(id))
    .slice(0, 2)
    .map((id) => {
      const item = getItem(id);
      const templates = OFFLINE_TASK_TEMPLATES[item.type] || OFFLINE_TASK_TEMPLATES.syllable;
      const rng = seededRandom(`${dateId}-${id}-offline-task`);
      const template = templates[Math.floor(rng() * templates.length)];
      return { id, label: item.label, text: template(item) };
    });
}

function recordOfflineTask(id, isCorrect) {
  updateLetterSchedule(id, isCorrect, "objective");
  recordDailyQuestionResult({ type: "offline-task", target: id }, isCorrect);
  const stat = getDailyStat();
  stat.offlineTasks = stat.offlineTasks || { attempts: 0, correct: 0 };
  stat.offlineTasks.attempts += 1;
  if (isCorrect) stat.offlineTasks.correct += 1;
  stat.offlineTaskIds = unique([...(stat.offlineTaskIds || []), id]);
  saveProgress();
  render();
}

function getUnlockedBlendIds(dayIndex) {
  const unlocked = new Set(getUnlockedPinyinIds(dayIndex));
  return BLEND_SYLLABLE_IDS.filter((id) => {
    if (!ITEM_BY_ID.has(id)) return false;
    const { initial, final } = splitSyllable(id);
    return unlocked.has(initial) && unlocked.has(final);
  });
}

function getUnlockedReadIds(dayIndex) {
  const unlocked = new Set(getUnlockedPinyinIds(dayIndex));
  const wholes = WHOLE_IDS.filter((id) => unlocked.has(id));
  return unique([...wholes, ...getUnlockedBlendIds(dayIndex)]);
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
  const illustratedPool = poolIds.filter(hasIllustration);
  const choicePool = hasIllustration(targetId) && illustratedPool.length >= count ? illustratedPool : poolIds;
  return {
    type: "picture-choice",
    target: targetId,
    choices: makeChoices(targetId, choicePool, count, rng, isPictureable),
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

function selectPictureTargets(preferredIds, fallbackIds, count, rng) {
  const combined = unique([...preferredIds, ...fallbackIds]).filter(isPictureable);
  const illustrated = combined.filter(hasIllustration);
  if (illustrated.length >= count) return shuffle(illustrated, rng).slice(0, count);
  return unique([...shuffle(illustrated, rng), ...shuffle(combined.filter((id) => !hasIllustration(id)), rng)]).slice(0, count);
}

function getPracticePool() {
  return unique([...ALL_FINAL_IDS, ...INITIAL_IDS, ...BLEND_SYLLABLE_IDS, ...WHOLE_IDS]).filter((id) => ITEM_BY_ID.has(id));
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
  const illustratedPool = poolIds.filter(hasIllustration);
  const choicePool = hasIllustration(targetId) && illustratedPool.length >= count ? illustratedPool : poolIds;
  return {
    type: "pinyin-picture-choice",
    target: targetId,
    choices: makeChoices(targetId, choicePool, count, rng, isPictureable),
  };
}

function makeCategoryQuestion(targetId) {
  const order = ["initial", "final", "syllable", "whole"];
  const targetType = getItem(targetId).type;
  const distractors = order.filter((t) => t !== targetType).slice(0, 2);
  const choices = order.filter((t) => t === targetType || distractors.includes(t));
  return {
    type: "category-choice",
    target: targetId,
    correctChoice: targetType,
    choices,
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
  // 最长前缀匹配，避免 zh/ch/sh 被 z/c/s/h 截错
  const initial = INITIAL_IDS
    .filter((item) => id.startsWith(item) && id.length > item.length)
    .sort((a, b) => b.length - a.length)[0] || "";
  return { initial, final: initial ? id.slice(initial.length) : "" };
}

function makeBuildChoices(targetValue, sourceValues, count, rng) {
  const candidates = sourceValues.filter((value) => value !== targetValue);
  return shuffle([targetValue, ...shuffle(candidates, rng).slice(0, count - 1)], rng);
}

const TONE_MARKS = {
  a: ["a", "ā", "á", "ǎ", "à"],
  o: ["o", "ō", "ó", "ǒ", "ò"],
  e: ["e", "ē", "é", "ě", "è"],
  i: ["i", "ī", "í", "ǐ", "ì"],
  u: ["u", "ū", "ú", "ǔ", "ù"],
  ü: ["ü", "ǖ", "ǘ", "ǚ", "ǜ"],
};

function toneMarkedSyllable(syllable, tone) {
  const vowels = [...syllable].filter((char) => TONE_MARKS[char]);
  let vowel = vowels.find((char) => char === "a") || vowels.find((char) => char === "e");
  if (!vowel && syllable.includes("ou")) vowel = "o";
  vowel ||= vowels[vowels.length - 1];
  return vowel ? syllable.replace(vowel, TONE_MARKS[vowel][tone]) : syllable;
}

function hasCompleteToneAudio(targetId) {
  return [1, 2, 3, 4].every((tone) => state.audioByBase.has(`assets/audio/syllable-tone/${targetId}${tone}`));
}

function makeSyllableBuildQuestion(targetId, rng, options = {}) {
  const parts = splitSyllable(targetId);
  const finalOptions = unique(BLEND_SYLLABLE_IDS.map((id) => splitSyllable(id).final).filter(Boolean));
  const withTone = Boolean(options.withTone) && hasCompleteToneAudio(targetId);
  const targetTone = withTone ? 1 + Math.floor(rng() * 4) : null;
  return {
    type: "syllable-build",
    target: targetId,
    targetInitial: parts.initial,
    targetFinal: parts.final,
    initialChoices: makeBuildChoices(parts.initial, INITIAL_IDS, 3, rng),
    finalChoices: makeBuildChoices(parts.final, finalOptions, 3, rng),
    withTone,
    targetTone,
    toneChoices: withTone ? shuffle([1, 2, 3, 4], rng) : [],
    tonedLabel: withTone ? toneMarkedSyllable(targetId, targetTone) : targetId,
    tonedAudio: withTone ? `assets/audio/syllable-tone/${targetId}${targetTone}.mp3` : "",
  };
}

function makeSyllableReadQuestion(targetId) {
  return {
    type: "syllable-read",
    target: targetId,
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
  const targets = selectPictureTargets(unlocked, getPracticePool().filter(isPictureable), 6, rng);
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

function buildReadPracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-read-practice-${state.progress.completedRounds}`);
  const pool = getUnlockedReadIds(dayIndex);
  const source = pool.length ? pool : BLEND_SYLLABLE_IDS.filter((id) => ITEM_BY_ID.has(id));
  return shuffle(source, rng)
    .slice(0, 6)
    .map((id) => makeSyllableReadQuestion(id));
}

function buildMolePracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-mole-practice-${state.progress.completedRounds}`);
  const unlocked = getUnlockedPinyinIds(dayIndex);
  const targets = selectRoundTargets(unlocked, getPracticePool(), 6, rng);
  const pool = unique([...unlocked, ...getPracticePool()]);
  return targets.map((itemId) => makeMoleQuestion(itemId, dayIndex, rng, pool));
}

function recommendMolePace(rates) {
  const recent = rates.slice(-3).map(Number).filter(Number.isFinite);
  if (!recent.length) return "calm";
  const average = recent.reduce((sum, rate) => sum + rate, 0) / recent.length;
  return average >= 0.8 ? "challenge" : "calm";
}

function recentMoleRates() {
  return recentDailyStats(7)
    .filter((stat) => Number(stat.moles?.attempts || 0) > 0)
    .slice(0, 3)
    .map((stat) => stat.moles.correct / stat.moles.attempts);
}

function recordMoleResult(isCorrect) {
  state.moleRecent.push(Boolean(isCorrect));
  state.moleRecent = state.moleRecent.slice(-6);
  state.moleWrongStreak = isCorrect ? 0 : state.moleWrongStreak + 1;
  if (state.molePace === "challenge" && state.moleWrongStreak >= 2) state.molePace = "calm";
  const stat = getDailyStat();
  stat.moles = stat.moles || { attempts: 0, correct: 0 };
  stat.moles.attempts += 1;
  if (isCorrect) stat.moles.correct += 1;
}

function getAvailableHuntScene() {
  const unlocked = new Set(getUnlockedPinyinIds(currentDayNumber()));
  return SCENE_HUNT_SCENES.find((scene) => scene.spots.every((spot) => unlocked.has(spot.itemId))) || null;
}

function buildSceneHuntQuestions(sceneId) {
  const scene = SCENE_HUNT_SCENES.find((entry) => entry.id === sceneId);
  if (!scene) return [];
  const rng = seededRandom(`${getLocalDateId()}-${sceneId}-hunt-${state.progress.completedRounds}`);
  return shuffle(scene.spots, rng).map((spot) => ({
    type: "scene-hunt",
    target: spot.itemId,
    correctChoice: spot.itemId,
    sceneId,
    spotId: spot.itemId,
  }));
}

async function playSceneIntroduction() {
  const scene = SCENE_HUNT_SCENES.find((entry) => entry.id === state.activeSceneId);
  if (!scene || !state.sceneIntro) return;
  await playAudioSequence(scene.spots.map((spot) => getItem(spot.itemId)?.wordAudio));
  if (state.view !== "game" || state.mode !== "hunt" || !state.sceneIntro) return;
  state.sceneIntro = false;
  render();
  playCurrentPrompt();
}

function buildFeedPracticeQuestions() {
  const dayIndex = getCourseDayIndex(getLocalDateId());
  const rng = seededRandom(`${getLocalDateId()}-feed-${state.progress.completedRounds}`);
  const unlocked = getUnlockedReadIds(dayIndex);
  const source = unlocked.length ? unlocked : BLEND_SYLLABLE_IDS.filter((id) => ITEM_BY_ID.has(id));
  const targets = selectRoundTargets(source, getPracticePool(), 5, rng);
  return targets.map((target) => ({ type: "voice-attempt", target }));
}

function recordVoiceAttempt(question) {
  state.learnedItems.push(question.target);
  state.roundStars += 1;
  state.progress.stars += 1;
  recordDailyQuestionResult(question, true);
  const stat = getDailyStat();
  stat.voiceAttempts = Number(stat.voiceAttempts || 0) + 1;
}

function stopVoiceDetector() {
  const detector = state.voiceDetector;
  if (!detector) return;
  if (detector.frame && typeof cancelAnimationFrame === "function") cancelAnimationFrame(detector.frame);
  detector.stream?.getTracks?.().forEach((track) => track.stop());
  detector.context?.close?.();
  state.voiceDetector = null;
}

function voiceRms(analyser, data) {
  analyser.getByteTimeDomainData(data);
  const sum = data.reduce((total, value) => {
    const sample = (value - 128) / 128;
    return total + sample * sample;
  }, 0);
  return Math.sqrt(sum / data.length);
}

function monitorVoiceDetector(timestamp) {
  const detector = state.voiceDetector;
  if (!detector || typeof requestAnimationFrame !== "function") return;
  const rms = voiceRms(detector.analyser, detector.data);
  if (timestamp - detector.startedAt < 1000) {
    detector.baselineSamples.push(rms);
  } else {
    if (!detector.baseline) {
      const sum = detector.baselineSamples.reduce((total, value) => total + value, 0);
      detector.baseline = sum / Math.max(1, detector.baselineSamples.length);
    }
    const threshold = Math.max(0.035, detector.baseline * 2.2);
    if (rms >= threshold) {
      detector.aboveSince ||= timestamp;
      if (timestamp - detector.aboveSince >= 400) {
        completeVoiceAttempt();
        return;
      }
    } else {
      detector.aboveSince = 0;
    }
  }
  detector.frame = requestAnimationFrame(monitorVoiceDetector);
}

async function startVoiceDetector() {
  if (!state.progress.settings.micEnabled || !state.micAvailable) return false;
  stopVoiceDetector();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const AudioContextClass = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!AudioContextClass) throw new Error("AudioContext unavailable");
    const context = new AudioContextClass();
    const analyser = context.createAnalyser();
    analyser.fftSize = 1024;
    context.createMediaStreamSource(stream).connect(analyser);
    state.voiceDetector = {
      stream,
      context,
      analyser,
      data: new Uint8Array(analyser.fftSize),
      baselineSamples: [],
      baseline: 0,
      aboveSince: 0,
      startedAt: performance.now(),
      frame: 0,
    };
    if (typeof requestAnimationFrame === "function") {
      state.voiceDetector.frame = requestAnimationFrame(monitorVoiceDetector);
    }
    setTimeout(() => {
      if (state.view === "game" && state.mode === "feed" && !state.answered) playCurrentPrompt();
    }, 5000);
    return true;
  } catch {
    state.micAvailable = false;
    state.progress.settings.micEnabled = false;
    state.view = "garden";
    saveProgress();
    render();
    return false;
  }
}

async function requestMicrophonePermission() {
  if (!navigator.mediaDevices?.getUserMedia) return false;
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => track.stop());
    state.micAvailable = true;
    return true;
  } catch {
    state.micAvailable = false;
    return false;
  }
}

function completeVoiceAttempt() {
  if (state.answered || state.mode !== "feed") return;
  const question = state.questions[state.currentIndex];
  state.answered = true;
  state.feedEating = true;
  state.guideExpression = "cheer";
  recordVoiceAttempt(question);
  stopVoiceDetector();
  saveProgress();
  render();
  playAudioSequence([AUDIO_PROMPTS.correct]);
  setTimeout(() => {
    state.answeredQuestionCount += 1;
    state.feedEating = false;
    nextQuestion();
    if (state.view === "game" && state.mode === "feed") startVoiceDetector();
  }, 1000);
}

function buildCourse(date, dayIndex, plan) {
  const rng = seededRandom(`${date}-${dayIndex}-${plan.title}`);
  const unlocked = getUnlockedPinyinIds(dayIndex);
  const newItems = (plan.newItems || []).filter((id) => ITEM_BY_ID.has(id));
  const seedReview = (plan.reviewItems || []).filter((id) => ITEM_BY_ID.has(id));
  const pool = unique([...unlocked, ...newItems, ...seedReview]);
  const questionCount = Math.min(Math.max(plan.questionCount || DEFAULT_ROUND_SIZE, DEFAULT_ROUND_SIZE), 8);
  const questions = [];

  // 声调感知题
  (plan.toneItems || []).forEach((toneId) => {
    if (TONE_BY_ID.has(toneId)) {
      questions.push(makeToneQuestion(toneId, rng, plan.toneItems));
    }
  });

  // 拼音配图题
  shuffle((plan.pictureItems || []).filter(isPictureable), rng)
    .sort((a, b) => Number(hasIllustration(b)) - Number(hasIllustration(a)))
    .forEach((itemId) => {
    if (ITEM_BY_ID.has(itemId) && questions.length < Math.max(2, Math.floor(questionCount / 2))) {
      questions.push(makePictureQuestion(itemId, dayIndex, rng, pool));
    }
    });

  // 拼读关（声母 + 韵母）
  if (plan.blend) {
    const blendPool = getUnlockedBlendIds(dayIndex);
    const allowTonedBlend = getCourseStep(dayIndex) > COURSE_PLAN.length;
    shuffle(blendPool, rng)
      .slice(0, newItems.length ? 1 : 2)
      .forEach((id, index) => questions.push(makeSyllableBuildQuestion(id, rng, { withTone: allowTonedBlend && index === 0 })));
  }

  // 认读关（自评）
  if (plan.read) {
    const readPool = getUnlockedReadIds(dayIndex);
    shuffle(readPool, rng)
      .slice(0, newItems.length ? 1 : 2)
      .forEach((id) => questions.push(makeSyllableReadQuestion(id)));
  }

  // 听音找拼音：新内容重点 + 到期复习 + 易错回流
  const today = getCourseDayIndex(date);
  const dueReview = getDueReviewIds(unlocked, today).filter((id) => !newItems.includes(id));
  const targetQueue = shuffle([...newItems, ...newItems], rng);
  if (plan.useWeakReview) {
    const weakId = getWeakReviewId(pool);
    if (weakId && !targetQueue.includes(weakId)) targetQueue.unshift(weakId);
  }
  const reviewQueue = dueReview.length
    ? dueReview
    : shuffle(seedReview.length ? seedReview : pool, rng);

  const newSet = new Set(newItems);
  const fallbackTargets = pool.length ? pool : ["a", "o", "e"];
  let qcursor = 0;
  let rcursor = 0;
  while (questions.length < questionCount) {
    const wantReview = newItems.length === 0 || questions.length % 2 === 1;
    let targetId;
    if (wantReview && reviewQueue.length) {
      targetId = reviewQueue[rcursor % reviewQueue.length];
      rcursor += 1;
    } else if (targetQueue.length) {
      targetId = targetQueue[qcursor % targetQueue.length];
      qcursor += 1;
    } else if (reviewQueue.length) {
      targetId = reviewQueue[rcursor % reviewQueue.length];
      rcursor += 1;
    } else {
      targetId = fallbackTargets[(qcursor + rcursor) % fallbackTargets.length];
      qcursor += 1;
    }
    const partner = CONFUSABLE_PARTNER[targetId];
    const confusableFirst = newSet.has(targetId) && Boolean(partner) && ITEM_BY_ID.has(partner);
    questions.push(makeListenQuestion(targetId, dayIndex, rng, pool, { confusableFirst }));
  }

  return {
    date,
    dayIndex,
    title: plan.title,
    focus: plan.focus,
    newItems,
    reviewItems: seedReview,
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

  const course = buildCourse(today, dayIndex, getDailyPlan(dayIndex));
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
  return selectPictureTargets(source, getPracticePool(), 6, rng)
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
    durationMs: 0,
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
  stat.durationMs = Number(stat.durationMs) || 0;
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
  state.buildSelection = { initial: "", final: "", tone: "" };
  state.answered = false;
  state.wrongCount = 0;
  state.revealing = false;
  state.wrongAnsweredIds = new Set();
  state.guideExpression = "idle";
  state.buildBaseReady = false;
  state.questionHadError = false;
}

function resetAttemptVisualState() {
  state.selected = "";
  const question = state.questions[state.currentIndex];
  state.buildSelection = state.buildBaseReady && question?.type === "syllable-build"
    ? { initial: question.targetInitial, final: question.targetFinal, tone: "" }
    : { initial: "", final: "", tone: "" };
  state.answered = false;
  state.guideExpression = "idle";
}

function getQuestionInstruction(question) {
  if (question.type === "picture-choice" || question.type === "pinyin-picture-choice") return "👀";
  if (question.type === "syllable-build") return "b + a";
  if (question.type === "syllable-read") return "🗣️";
  if (question.type === "category-choice") return "a / b / ba";
  return "🔊";
}

function startRound(mode = "lesson") {
  stopVoiceDetector();
  const course = ensureTodayCourse();
  state.view = "game";
  state.mode = mode;
  state.currentIndex = 0;
  resetAnswerState();
  state.learnedItems = [];
  state.roundStars = 0;
  state.roundStartedAt = Date.now();
  state.answeredQuestionCount = 0;
  state.resultReason = "complete";
  state.resultPhase = "stars";
  state.fullResultSequence = false;
  state.guideExpression = mode === "lesson" ? "cheer" : "idle";
  state.sceneIntro = false;
  state.sceneFoundIds = [];
  state.feedEating = false;
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
    state.molePace = recommendMolePace(recentMoleRates());
    state.moleRecent = [];
    state.moleWrongStreak = 0;
    state.roundTitle = "地鼠";
    state.roundSubtitle = "听读音，敲中拼音地鼠";
  } else if (mode === "read") {
    state.questions = buildReadPracticeQuestions();
    state.roundTitle = "认读";
    state.roundSubtitle = "看音节，自己读";
  } else if (mode === "hunt") {
    const scene = getAvailableHuntScene() || SCENE_HUNT_SCENES[0];
    state.activeSceneId = scene.id;
    state.sceneIntro = true;
    state.questions = buildSceneHuntQuestions(scene.id);
    state.roundTitle = "寻宝";
    state.roundSubtitle = "听声音，找物品";
    setTimeout(() => {
      if (state.view === "game" && state.mode === "hunt" && state.sceneIntro) {
        state.sceneIntro = false;
        render();
        playCurrentPrompt();
      }
    }, 8000);
  } else if (mode === "feed") {
    state.questions = buildFeedPracticeQuestions();
    state.roundTitle = "喂养";
    state.roundSubtitle = "读出拼音";
  } else {
    state.questions = course.questions;
    state.roundTitle = `D${course.dayIndex} · ${courseFocusLabels(course)}`;
    state.roundSubtitle = course.focus;
  }

  state.feedback = getQuestionInstruction(state.questions[0]);
  render();
  if (mode === "feed") startVoiceDetector();
  setTimeout(() => {
    if (mode === "lesson") {
      playAudioSequence([AUDIO_PROMPTS.greet, getPromptAudio(state.questions[0]), getTargetAudio(state.questions[0])]);
      state.guideExpression = "idle";
      render();
      return;
    }
    if (mode === "hunt" && state.sceneIntro) {
      playSceneIntroduction();
      return;
    }
    playCurrentPrompt();
  }, 180);
}

function getPromptAudio(question) {
  if (question.type === "tone-choice") return AUDIO_PROMPTS.tone;
  if (question.type === "picture-choice" || question.type === "pinyin-picture-choice") return AUDIO_PROMPTS.picture;
  return AUDIO_PROMPTS.find;
}

function getTargetAudio(question) {
  const target = getQuestionTarget(question);
  if (question.type === "word-choice") return target?.wordAudio;
  if (question.type === "syllable-build" && question.withTone && state.buildBaseReady) return question.tonedAudio;
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

function questionResultKey(question) {
  const stage = question.type === "syllable-build" && question.withTone && state.buildBaseReady ? "tone" : "base";
  return `${state.currentIndex}:${question.type}:${question.target}:${stage}`;
}

function recordQuestionResult(question, isCorrect, source = "objective") {
  const resultKey = questionResultKey(question);
  if (!isCorrect && state.wrongAnsweredIds.has(resultKey)) return false;
  if (!isCorrect) state.wrongAnsweredIds.add(resultKey);

  if (question.type === "syllable-build" && question.withTone && state.buildBaseReady) {
    recordTonedBlendResult(question, isCorrect);
    if (isCorrect) updateLetterSchedule(question.target, true, source);
    return true;
  }

  if (question.type === "tone-choice") {
    const tone = getTone(question.target);
    const record = state.progress.tones[tone.id] || { attempts: 0, correct: 0 };
    record.attempts += 1;
    if (isCorrect) record.correct += 1;
    state.progress.tones[tone.id] = record;
    recordDailyQuestionResult(question, isCorrect);
    return true;
  }

  const item = getItem(question.target);
  updateLetterSchedule(item.id, isCorrect, source);
  recordDailyQuestionResult(question, isCorrect);
  return true;
}

function getQuestionAnswerId(question) {
  if (question.type === "syllable-build" && question.withTone && state.buildBaseReady) {
    return `tone:${question.targetTone}`;
  }
  return question.correctChoice || question.target;
}

function recordTonedBlendResult(question, isCorrect) {
  const id = `${question.target}${question.targetTone}`;
  const record = state.progress.tones[id] || { attempts: 0, correct: 0 };
  record.attempts += 1;
  if (isCorrect) record.correct += 1;
  state.progress.tones[id] = record;
  const stat = getDailyStat();
  const daily = stat.tones[id] || { attempts: 0, correct: 0 };
  stat.attempts += 1;
  daily.attempts += 1;
  if (isCorrect) {
    stat.correct += 1;
    daily.correct += 1;
  }
  stat.tones[id] = daily;
  updateDailyWeakItems(stat);
}

function categoryName(type) {
  const names = {
    final: "韵母",
    initial: "声母",
    syllable: "声韵组合",
    whole: "整体认读",
  };
  return names[type] || "";
}

function categoryDisplay(type) {
  const labels = {
    final: "a o e",
    initial: "b p m",
    syllable: "ba ma",
    whole: "zhi yi",
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
  if (part === "tone") value = Number(value);
  const targetValue = part === "initial" ? question.targetInitial : part === "final" ? question.targetFinal : question.targetTone;
  if (state.revealing && value !== targetValue) return;

  if (part === "tone") {
    if (!question.withTone || !state.buildBaseReady) return;
    state.buildSelection = { ...state.buildSelection, tone: value };
    answer(`tone:${value}`);
    return;
  }

  state.buildSelection = { ...state.buildSelection, [part]: value };
  state.feedback = getQuestionInstruction(question);
  render();

  const { initial, final } = state.buildSelection;
  if (initial && final) {
    if (question.withTone && `${initial}${final}` === question.target) {
      state.buildBaseReady = true;
      state.revealing = false;
      state.wrongCount = 0;
      state.selected = "";
      state.buildSelection = { initial, final, tone: "" };
      render();
      playAudioSequence([question.tonedAudio]);
      return;
    }
    answer(`${initial}${final}`);
  }
}

function answer(choice) {
  if (state.answered) return;

  const question = state.questions[state.currentIndex];
  const target = getQuestionTarget(question);
  const answerId = getQuestionAnswerId(question);
  const isCorrect = choice === answerId;

  if (state.revealing) {
    if (!isCorrect) return;
    state.selected = choice;
    state.answered = true;
    state.feedback = getCorrectFeedback(target);
    state.learnedItems.push(question.target);
    if (question.type === "scene-hunt") {
      state.sceneFoundIds = unique([...state.sceneFoundIds, question.target]);
    }
    saveProgress();
    render();
    playAudioSequence([AUDIO_PROMPTS.correct, getTargetAudio(question)]);
    setTimeout(() => {
      state.answeredQuestionCount += 1;
      nextQuestion();
    }, 900);
    return;
  }

  state.selected = choice;
  state.answered = true;
  state.feedback = isCorrect ? getCorrectFeedback(target) : getRetryFeedback();
  state.guideExpression = isCorrect ? "cheer" : "soothe";
  if (isCorrect) {
    state.learnedItems.push(question.target);
    if (!state.questionHadError) {
      state.roundStars += 1;
      state.progress.stars += 1;
    }
  } else {
    if (!isCorrect) {
      state.wrongCount += 1;
      state.questionHadError = true;
    }
  }
  const resultRecorded = recordQuestionResult(question, isCorrect);
  if (question.type === "mole-choice" && resultRecorded) recordMoleResult(isCorrect);
  if (question.type === "scene-hunt" && isCorrect) {
    state.sceneFoundIds = unique([...state.sceneFoundIds, question.target]);
  }
  saveProgress();

  if (!isCorrect && state.wrongCount >= 2) {
    state.revealing = true;
    state.answered = false;
    state.buildSelection = state.buildBaseReady && question.type === "syllable-build"
      ? { initial: question.targetInitial, final: question.targetFinal, tone: "" }
      : { initial: "", final: "", tone: "" };
  }
  render();

  playAudioSequence([isCorrect ? AUDIO_PROMPTS.correct : AUDIO_PROMPTS.retry, getTargetAudio(question)]);

  const delay = isCorrect ? 900 : 1150;
  if (state.revealing) return;
  setTimeout(() => {
    if (isCorrect) {
      state.answeredQuestionCount += 1;
      nextQuestion();
    } else {
      resetAttemptVisualState();
      render();
      playCurrentPrompt();
    }
  }, delay);
}

function answerRead(known) {
  if (state.answered) return;

  const question = state.questions[state.currentIndex];
  if (question?.type !== "syllable-read") return;

  const target = getQuestionTarget(question);
  state.answered = true;
  state.selected = known ? "known" : "again";
  state.feedback = known ? getCorrectFeedback(target) : getRetryFeedback();
  state.guideExpression = known ? "cheer" : "soothe";
  if (known) {
    state.learnedItems.push(question.target);
    if (!state.questionHadError) {
      state.roundStars += 1;
      state.progress.stars += 1;
    }
  } else {
    state.questionHadError = true;
  }
  recordQuestionResult(question, known, "self");
  saveProgress();
  render();

  playAudioSequence([known ? AUDIO_PROMPTS.correct : AUDIO_PROMPTS.retry, getTargetAudio(question)]);

  const delay = known ? 900 : 1150;
  setTimeout(() => {
    if (known) {
      state.answeredQuestionCount += 1;
      nextQuestion();
    } else {
      resetAttemptVisualState();
      render();
      playCurrentSound();
    }
  }, delay);
}

function finishRound(reason = "complete") {
  stopVoiceDetector();
  state.progress.completedRounds += 1;
  state.resultReason = reason;
  state.resultPhase = "stars";
  state.guideExpression = "arrive";
  if (state.activeCourseDate && state.progress.courses[state.activeCourseDate]) {
    const course = state.progress.courses[state.activeCourseDate];
    const wasCompleted = Boolean(course.completed);
    const enoughForCompletion = state.answeredQuestionCount >= Math.ceil(state.questions.length / 2);
    const completed = reason === "complete" || enoughForCompletion;
    course.completed = completed;
    const stat = getDailyStat(state.activeCourseDate);
    stat.durationMs += Math.max(0, Date.now() - state.roundStartedAt);
    if (completed) completeDailyCourse(state.activeCourseDate);
    state.fullResultSequence = !wasCompleted;
  }
  const plantId = selectGardenPlantId();
  if (plantId) plantGardenItem(plantId);
  saveProgress();
  state.view = "result";
  state.feedback = "";
  render();
  playAudioSequence([AUDIO_PROMPTS.arrive, AUDIO_PROMPTS.complete]);
  scheduleResultAdvance();
}

function getLessonSoftCapMs() {
  return (state.progress.settings?.lessonMinutes || 8) * 60 * 1000;
}

function nextQuestion() {
  const lessonTimedOut =
    state.mode === "lesson" &&
    state.roundStartedAt > 0 &&
    Date.now() - state.roundStartedAt >= getLessonSoftCapMs();
  if (lessonTimedOut) {
    finishRound("soft-cap");
    return;
  }

  if (state.currentIndex + 1 >= state.questions.length) {
    finishRound("complete");
    return;
  }

  state.currentIndex += 1;
  resetAnswerState();
  state.feedback = getQuestionInstruction(state.questions[state.currentIndex]);
  render();
  setTimeout(() => playCurrentPrompt(), 160);
}

function goHome() {
  stopVoiceDetector();
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
  state.resetRequested = false;
  state.spotCheck = null;
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
  const homeModes = new Set(HOME_MODE_CARDS.map((card) => card.mode));
  return GARDEN_GAME_MODES.filter((game) => {
    if (homeModes.has(game.mode)) return false;
    if (game.mode === "feed") return state.progress.settings.micEnabled && state.micAvailable;
    if (game.mode === "hunt") return Boolean(getAvailableHuntScene());
    return true;
  })
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

function homeModeCards() {
  const course = ensureTodayCourse();
  const plan = getDailyPlan(course.dayIndex);
  const completedClass = course.completed ? "is-complete" : "";
  const action = plan.freePlay ? 'data-view="garden"' : 'data-start="lesson"';
  return `
    <button class="mode-card home-mode-card lesson-main-card ${completedClass} ${plan.freePlay ? "is-free-play" : ""}" type="button" ${action} aria-label="${plan.freePlay ? "去游戏花园" : "开始今日课程"}">
      ${trainArt(course.completed ? "arrive" : "idle")}
      <span class="lesson-lights" aria-hidden="true">${course.completed ? "● ● ●" : "○ ○ ○"}</span>
    </button>
  `;
}

function parentCorner() {
  return `
    <button class="parent-corner" type="button" data-longpress="parent" aria-label="家长入口（长按打开）">
      ${icon("chart")}
    </button>
  `;
}

function parentGateView() {
  const gate = state.parentGate || makeParentGateQuestion();
  state.parentGate = gate;
  return `
    <main class="screen parent-theme parent-gate-screen">
      <section class="parent-gate-card" aria-labelledby="parent-gate-title">
        <h1 id="parent-gate-title">家长验证</h1>
        <p>请选择正确答案后进入家长区。</p>
        <div class="parent-gate-equation">${gate.left} + ${gate.right} = ?</div>
        <div class="parent-gate-options">
          ${gate.options
            .map(
              (option) => `<button type="button" data-gate-answer="${option}">${option}</button>`,
            )
            .join("")}
        </div>
        <button class="parent-back-button" type="button" data-view="home">返回孩子界面</button>
      </section>
    </main>
  `;
}

function gardenEntry() {
  return `
    <button class="garden-entry" type="button" data-view="garden" aria-label="去游戏花园">
      <span class="garden-entry-art">${icon("flower")}</span>
    </button>
  `;
}

function starBox(extraClass = "") {
  const unlockClass = availableUnlockCount() > 0 ? "has-unlock" : "";
  return `
    <button class="star-box ${extraClass} ${unlockClass}" type="button" data-action="open-box" aria-label="打开星星盒子">
      ${icon("box")}
      <span class="star-box-count">${state.progress.stars}</span>
    </button>
  `;
}

function starBoxOverlay() {
  if (!state.boxOpen) return "";
  const total = state.progress.stars;
  const pile = Array.from({ length: Math.min(total, 30) }, () => `<span class="star-pile-item">${icon("star")}</span>`).join("");
  const available = availableUnlockCount();
  return `
    <div class="box-overlay" role="dialog" aria-label="星星盒子">
      <button class="box-overlay-backdrop" type="button" data-action="close-box" aria-label="关闭"></button>
      <div class="box-overlay-card">
        <button class="box-close" type="button" data-action="close-box" aria-label="关闭">${icon("close")}</button>
        <div class="star-pile" aria-hidden="true">${pile}</div>
        <div class="star-pile-total">${icon("star")}<strong>${total}</strong></div>
        <div class="unlock-shelf" aria-label="装饰点亮架">
          ${UNLOCK_CATALOG.map((entry) => {
            const unlocked = state.progress.unlocks.includes(entry.id);
            const active = state.progress.activeTrainColor === entry.id;
            const action = unlocked
              ? entry.kind === "train-color"
                ? `data-activate-decoration="${entry.id}"`
                : ""
              : available > 0
                ? `data-unlock-decoration="${entry.id}"`
                : "";
            return `
              <button class="unlock-item ${unlocked ? "is-unlocked" : "is-locked"} ${active ? "is-active" : ""}" type="button" ${action} aria-label="${unlocked ? "已点亮装饰" : "待点亮装饰"}">
                <span style="${entry.color ? `color: ${entry.color}` : ""}">${unlocked ? entry.art : "◆"}</span>
              </button>
            `;
          }).join("")}
        </div>
      </div>
    </div>
  `;
}

function homeView() {
  ensureTodayCourse();
  return `
    <main class="screen home-screen">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <div class="mode-grid home-mode-grid">
        ${homeModeCards()}
      </div>
      <div class="home-footer">
        ${starBox("home-box")}
        ${gardenEntry()}
      </div>
      ${starBoxOverlay()}
    </main>
  `;
}

function gardenView() {
  const plants = state.progress.garden;
  const pets = UNLOCK_CATALOG.filter(
    (entry) => entry.kind === "garden-pet" && state.progress.unlocks.includes(entry.id),
  );
  return `
    <main class="screen garden-screen">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <button class="garden-back" type="button" data-view="home" aria-label="回首页">
        ${icon("home")}
      </button>
      <section class="garden-field" aria-label="我的拼音花园">
        <div class="garden-pets" aria-hidden="true">${pets.map((pet) => `<span>${pet.art}</span>`).join("")}</div>
        <div class="garden-plant-grid">
          ${plants
            .map((plant, index) => {
              const item = getItem(plant.id);
              return `
                <button class="garden-plant ${index === plants.length - 1 ? "is-new" : ""}" type="button" data-garden-plant="${plant.id}" aria-label="播放 ${item.label}">
                  ${gardenFlowerArt(item, index)}
                </button>
              `;
            })
            .join("")}
        </div>
      </section>
      <div class="mode-grid garden-grid garden-drawer">
        ${gardenGameCards()}
      </div>
      ${gardenPlantOverlay()}
    </main>
  `;
}

function gardenPlantOverlay() {
  const item = getItem(state.gardenPlantOpen);
  if (!item) return "";
  return `
    <div class="garden-plant-overlay" role="dialog" aria-label="${item.label}">
      <button class="box-overlay-backdrop" type="button" data-action="close-plant" aria-label="关闭"></button>
      <div class="garden-plant-card">
        <button class="box-close" type="button" data-action="close-plant" aria-label="关闭">${icon("close")}</button>
        ${pictureArt(item)}
        <strong style="color: ${item.color}">${item.label}</strong>
        <button class="icon-button" type="button" data-practice="${item.id}" aria-label="播放读音">${icon("volume")}</button>
      </div>
    </div>
  `;
}

function getGameTitle(question) {
  if (question.type === "tone-choice") return "听声调，选轨迹";
  if (question.type === "picture-choice") return "看图片，找拼音";
  if (question.type === "word-choice") return "听词语，找拼音";
  if (question.type === "pinyin-picture-choice") return "看拼音，找图卡";
  if (question.type === "syllable-build") return "听音节，拼花朵";
  if (question.type === "syllable-read") return "看音节，自己读";
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
  if (state.revealing) {
    return choiceId === getQuestionAnswerId(question) ? "choice-button reveal-target" : "choice-button reveal-disabled";
  }
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
  const paceClass = state.molePace === "challenge" ? " mole-challenge" : "";
  if (state.revealing) {
    return choiceId === getQuestionAnswerId(question)
      ? `mole-button reveal-target${paceClass}`
      : `mole-button reveal-disabled${paceClass}`;
  }
  if (state.selected !== choiceId) return `mole-button${paceClass}`;
  return choiceId === getQuestionAnswerId(question)
    ? `mole-button correct${paceClass}`
    : `mole-button wrong${paceClass}`;
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
  const targetValue = part === "initial" ? question.targetInitial : part === "final" ? question.targetFinal : question.targetTone;
  if (state.revealing) {
    return value === targetValue ? "build-button reveal-target" : "build-button reveal-disabled";
  }
  if (state.buildSelection[part] !== value) return "build-button";
  if (!state.answered) return "build-button selected";
  return value === targetValue ? "build-button correct" : "build-button wrong";
}

function renderBuildChoice(question, part, value) {
  if (part === "tone") {
    const tone = TONE_ITEMS.find((entry) => entry.base === "a" && entry.number === Number(value));
    return `
      <button class="${buildChoiceClass(question, part, value)} build-tone-button" type="button" data-build-part="tone" data-build-value="${value}" aria-label="选择第 ${value} 声">
        ${toneArt(tone, true)}
      </button>
    `;
  }
  return `
    <button class="${buildChoiceClass(question, part, value)}" type="button" data-build-part="${part}" data-build-value="${value}" aria-label="选择 ${value}">
      ${value}
    </button>
  `;
}

function buildSlotText(part) {
  if (part === "tone" && state.buildSelection.tone) return `ˉˊˇˋ`[Number(state.buildSelection.tone) - 1];
  return state.buildSelection[part] || "？";
}

function categoryCard(item) {
  return `
    <div class="category-card" style="--item-color: ${item.color}">
      <span class="category-symbol">${item.label}</span>
    </div>
  `;
}

function sceneHuntArt(scene, interactive = true) {
  return `
    <div class="scene-hunt-board" aria-label="${scene.label}">
      <svg class="scene-hunt-background" viewBox="0 0 800 480" aria-hidden="true">
        <rect width="800" height="480" fill="#dff2ff"/>
        <rect y="260" width="800" height="220" fill="#dff5df"/>
        <circle cx="690" cy="80" r="46" fill="#ffe9a6"/>
        <path d="M0 320 Q180 230 350 330 T800 300 V480 H0Z" fill="#9bd29f"/>
        <path d="M250 480 Q370 280 520 480" fill="#e8c898"/>
        <rect x="48" y="190" width="90" height="120" rx="12" fill="#d89b63"/>
        <circle cx="92" cy="175" r="80" fill="#6fb879"/>
      </svg>
      ${scene.spots
        .map((spot, index) => {
          const item = getItem(spot.itemId);
          const found = state.sceneFoundIds.includes(spot.itemId);
          const className = `scene-spot ${found ? "is-found" : ""} ${state.sceneIntro ? "is-intro" : ""}`;
          const content = illustration(item.id) || `<span class="picture-emoji">${item.emoji}</span>`;
          const style = `left:${spot.x}%;top:${spot.y}%;width:${spot.w}%;height:${spot.h}%;--spot-delay:${index * 120}ms`;
          if (!interactive || state.sceneIntro) return `<div class="${className}" style="${style}">${content}</div>`;
          return `<button class="${className}" style="${style}" type="button" data-answer="${item.id}" aria-label="${item.word}">${content}</button>`;
        })
        .join("")}
    </div>
  `;
}

function feedAnimalArt() {
  return `
    <svg class="feed-animal" viewBox="0 0 240 220" aria-hidden="true">
      <path d="M55 70 32 22l58 32M185 70l23-48-58 32" fill="#e8c29a" stroke="#223047" stroke-width="7" stroke-linejoin="round"/>
      <circle cx="120" cy="120" r="82" fill="#f3d4ad" stroke="#223047" stroke-width="7"/>
      <circle cx="88" cy="110" r="7" fill="#223047"/>
      <circle cx="152" cy="110" r="7" fill="#223047"/>
      <path d="M102 148 Q120 ${state.feedEating ? 178 : 160} 138 148" fill="none" stroke="#223047" stroke-width="8" stroke-linecap="round"/>
      <path class="animal-ear-wave" d="M35 82q-24 18 0 36M205 82q24 18 0 36" fill="none" stroke="#4b8fe8" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `;
}

function questionStage(question, target) {
  if (question.type === "scene-hunt") {
    const scene = SCENE_HUNT_SCENES.find((entry) => entry.id === question.sceneId);
    return `
      <div class="question-stage scene-hunt-stage">
        ${sceneHuntArt(scene)}
        ${
          state.sceneIntro
            ? `<button class="scene-intro-skip" type="button" data-action="skip-scene-intro" aria-label="跳过介绍">${icon("play")}</button>`
            : `<button class="sound-disc scene-sound" type="button" data-action="repeat-sound" aria-label="重播目标声音"><span class="sound-letter">?</span></button>`
        }
      </div>
    `;
  }

  if (question.type === "voice-attempt") {
    return `
      <div class="question-stage feed-stage ${state.feedEating ? "is-eating" : "is-listening"}">
        ${feedAnimalArt()}
        <div class="feed-food" aria-hidden="true">●</div>
        <button class="pinyin-card-display feed-card" type="button" data-action="repeat-sound" aria-label="播放拼音声音" style="--item-color:${target.color}">
          <span>${target.label}</span>
        </button>
      </div>
    `;
  }

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
            ${question.withTone ? `<span class="build-plus">+</span><span class="build-slot build-tone-slot">${buildSlotText("tone")}</span>` : ""}
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
          ${
            question.withTone && state.buildBaseReady
              ? `<div class="build-group build-tone-group">
                  <span class="build-group-title sr-only">声调</span>
                  <div class="build-options build-tone-options">
                    ${question.toneChoices.map((value) => renderBuildChoice(question, "tone", value)).join("")}
                  </div>
                </div>`
              : ""
          }
        </div>
      </div>
    `;
  }

  if (question.type === "syllable-read") {
    return `
      <div class="question-stage read-stage">
        <div class="picture-panel garden-panel">
          <button class="pinyin-card-display read-card" type="button" data-action="repeat-sound" aria-label="播放音节声音" style="--item-color: ${target.color}">
            <span>${target.label}</span>
          </button>
          <p class="read-hint sr-only">先自己读一读，再听一听</p>
          <p class="sound-prompt sr-only" id="game-title">${getGameTitle(question)}</p>
        </div>
        <div class="choices read-choices" role="group" aria-label="自我评价">
          <button class="${state.answered && state.selected === "known" ? "choice-button correct" : "choice-button read-known"}" type="button" data-read="known" aria-label="我会读了">
            ${icon("star")}<span>我会读了</span>
          </button>
          <button class="${state.answered && state.selected === "again" ? "choice-button wrong" : "choice-button read-again"}" type="button" data-read="again" aria-label="再练练">
            ${icon("repeat")}<span>再练练</span>
          </button>
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
        <div class="mole-pace-switch" role="group" aria-label="地鼠节奏">
          <button class="${state.molePace === "calm" ? "is-active" : ""}" type="button" data-mole-pace="calm" aria-label="慢慢玩">🐢</button>
          <button class="${state.molePace === "challenge" ? "is-active" : ""}" type="button" data-mole-pace="challenge" aria-label="小挑战">⚡</button>
        </div>
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
  const answeredCorrect =
    state.answered &&
    (question.type === "syllable-read" ? state.selected === "known" : state.selected === getQuestionAnswerId(question));
  const answeredWrong = state.answered && !answeredCorrect;
  const feedbackClass = answeredCorrect ? "feedback-correct" : answeredWrong ? "feedback-wrong" : "";

  return `
    <main class="screen">
      ${topbar(state.roundTitle)}
      <section class="game-layout ${feedbackClass} ${state.answered ? "is-answered" : ""}" aria-labelledby="game-title">
        <div class="guide-mini" aria-hidden="true">${trainArt(state.guideExpression, true)}</div>
        <div class="progress-row">
          <span class="progress-text">${state.currentIndex + 1}/${total}</span>
          <div class="progress-track" aria-label="学习进度">
            <div class="progress-fill" style="width: ${progress}%"></div>
          </div>
          <span class="star-tray" aria-label="本轮星星">${icon("star")}<span class="star-tray-count">${state.roundStars}</span></span>
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

function parentHeader() {
  return `
    <header class="parent-header">
      <div>
        <strong>拼音学习家长区</strong>
        <span>记录、抽查与设置</span>
      </div>
      <button class="parent-back-button" type="button" data-view="home">返回孩子界面</button>
    </header>
  `;
}

function weeklyReportView(report) {
  const rate = report.attempts ? Math.round((report.correct / report.attempts) * 100) : 0;
  const opening = report.availableDays < 7 ? `开课第 ${report.courseDay} 天，` : "";
  return `
    <section class="parent-section weekly-report" aria-labelledby="weekly-report-title">
      <h2 id="weekly-report-title">本周摘要</h2>
      <p>${opening}已完成 ${report.completedDays} 天课程，练习 ${report.attempts} 题，正确率 ${rate}%。</p>
      <div class="weekly-rate"><span style="width: ${rate}%"></span></div>
      <dl class="weekly-metrics">
        <div><dt>本周新学</dt><dd>${formatPinyinList(report.newItems, "暂无")}</dd></div>
        <div><dt>家长抽查</dt><dd>${report.spotChecks.correct}/${report.spotChecks.attempts}</dd></div>
        <div><dt>线下任务</dt><dd>${report.offlineCompleted} 个</dd></div>
      </dl>
      ${
        report.weakItems.length
          ? `<h3>易忘项</h3><div class="parent-chip-row">${report.weakItems
              .map((entry) => `<span>${entry.item.label} · 盒 ${entry.box}</span>`)
              .join("")}</div>`
          : ""
      }
      ${report.tips.length ? `<h3>生活配合建议</h3><ul>${report.tips.map((tip) => `<li>${tip}</li>`).join("")}</ul>` : ""}
    </section>
  `;
}

function spotCheckView() {
  if (state.spotCheck) {
    const id = state.spotCheck.ids[state.spotCheck.index];
    const item = getItem(id);
    return `
      <section class="parent-section spot-check-panel" aria-labelledby="spot-check-title">
        <h2 id="spot-check-title">认读抽查 ${state.spotCheck.index + 1}/${state.spotCheck.ids.length}</h2>
        <div class="spot-check-card" style="color: ${item.color}">${item.label}</div>
        <p>请孩子直接读出卡片，不要先播放声音。</p>
        <div class="parent-action-row">
          <button type="button" data-action="spot-correct">读对了</button>
          <button type="button" data-action="spot-wrong">没读出来</button>
        </div>
      </section>
    `;
  }

  const count = buildSpotCheckItems().length;
  return `
    <section class="parent-section" aria-labelledby="spot-check-title">
      <h2 id="spot-check-title">认读抽查</h2>
      <p>${count ? `本次抽查 ${count} 个高盒音节。` : "暂时没有需要抽查的高盒音节。"}</p>
      ${count ? '<button type="button" data-action="start-spot-check">开始抽查</button>' : ""}
    </section>
  `;
}

function offlineTasksView(tasks) {
  if (!tasks.length) return "";
  return `
    <section class="parent-section" aria-labelledby="offline-task-title">
      <h2 id="offline-task-title">今天可以做</h2>
      <div class="offline-task-list">
        ${tasks
          .map(
            (task) => `
              <article class="offline-task-card">
                <strong>${task.label}</strong>
                <p>${task.text}</p>
                <div class="parent-action-row">
                  <button type="button" data-offline-id="${task.id}" data-offline-result="correct">完成了，孩子会</button>
                  <button type="button" data-offline-id="${task.id}" data-offline-result="wrong">完成了，还不熟</button>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
}

function parentSettingsView() {
  const settings = state.progress.settings;
  const todayNumber = parseDateId(getLocalDateId()).getDate();
  return `
    <section class="parent-section parent-settings" aria-labelledby="parent-settings-title">
      <h2 id="parent-settings-title">设置</h2>
      <div class="setting-row">
        <span>声音</span>
        <button type="button" data-action="toggle-mute">${state.muted ? "打开声音" : "关闭声音"}</button>
      </div>
      <div class="setting-row">
        <span>喂动物麦克风玩法</span>
        <button type="button" data-action="toggle-mic">${settings.micEnabled ? "已开启" : "未开启"}</button>
      </div>
      <div class="setting-row">
        <span>课程软时长</span>
        <div class="parent-action-row">
          ${[5, 8, 10]
            .map(
              (minutes) => `<button type="button" class="${settings.lessonMinutes === minutes ? "is-active" : ""}" data-lesson-minutes="${minutes}">${minutes} 分钟</button>`,
            )
            .join("")}
        </div>
      </div>
      ${
        state.resetRequested
          ? `<div class="reset-confirm">
              <label for="reset-day">今天是 ${todayNumber} 号，请输入 ${todayNumber}</label>
              <input id="reset-day" type="number" inputmode="numeric" min="1" max="31" />
              <div class="parent-action-row">
                <button type="button" data-action="confirm-reset">确认清空</button>
                <button type="button" data-action="cancel-reset">取消</button>
              </div>
            </div>`
          : '<button class="danger-button" type="button" data-action="request-reset">清空全部学习记录</button>'
      }
    </section>
  `;
}

function recordsView() {
  const course = ensureTodayCourse();
  const todayStat = getDailyStat(course.date);
  const totalStats = totalRecordStats();
  const completedDates = completedCourseDates();
  const mastery = masteryBreakdown();
  const learnedTotal = mastery.mastered + mastery.reviewing + mastery.weak;
  const contentTotal = ALL_FINAL_IDS.length + INITIAL_IDS.length + WHOLE_IDS.length + BLEND_SYLLABLE_IDS.length;
  const entries = PINYIN_ITEMS.map((letter) => {
    const record = state.progress.letters[letter.id] || { attempts: 0, correct: 0 };
    return { letter, record };
  }).filter(({ record }) => record.attempts > 0);
  const toneEntries = TONE_ITEMS.map((tone) => {
    const record = state.progress.tones[tone.id] || { attempts: 0, correct: 0 };
    return { tone, record };
  }).filter(({ record }) => record.attempts > 0);
  const weeklyReport = buildWeeklyReport();
  const offlineTasks = buildOfflineTasks();

  return `
    <main class="screen parent-theme">
      ${parentHeader()}
      <section class="record-panel" aria-labelledby="record-title">
        <h2 id="record-title" class="section-title">家长每日记录</h2>
        ${weeklyReportView(weeklyReport)}
        ${offlineTasksView(offlineTasks)}
        ${spotCheckView()}
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
        <section class="record-section" aria-labelledby="mastery-title">
          <h3 id="mastery-title" class="subsection-title">掌握进度</h3>
          <div class="mastery-grid">
            <div class="mastery-tile mastery-mastered">
              <strong>${mastery.mastered}</strong>
              <span>已掌握</span>
            </div>
            <div class="mastery-tile mastery-reviewing">
              <strong>${mastery.reviewing}</strong>
              <span>复习中</span>
            </div>
            <div class="mastery-tile mastery-weak">
              <strong>${mastery.weak}</strong>
              <span>易忘</span>
            </div>
            <div class="mastery-tile mastery-total">
              <strong>${learnedTotal}/${contentTotal}</strong>
              <span>已接触/总量</span>
            </div>
          </div>
        </section>
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
        ${parentSettingsView()}
      </section>
    </main>
  `;
}

function getResultLearnedItems() {
  const courseItems = state.todayCourse?.newItems || [];
  const source = courseItems.length ? courseItems : state.learnedItems;
  return unique(source)
    .map((id) => getItem(id) || getTone(id))
    .filter(Boolean)
    .slice(0, 3);
}

function tomorrowPreviewArt() {
  const dayIndex = (state.todayCourse?.dayIndex || currentDayNumber()) + 1;
  const plan = getDailyPlan(dayIndex);
  if (plan.freePlay) return icon("flower");
  if (plan.weeklyReview || !plan.newItems?.length) return icon("repeat");
  return `<span class="tomorrow-question">?</span>`;
}

function resultPhaseContent(phase = state.resultPhase) {
  if (phase === "learned") {
    return `
      <div class="result-learned" aria-label="今日所学">
        ${getResultLearnedItems()
          .map(
            (item) => `
              <button class="result-learned-card" type="button" data-practice="${item.id}" aria-label="播放 ${item.label}">
                ${pictureArt(item)}
                <strong style="color: ${item.color}">${item.label}</strong>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  if (phase === "tomorrow") {
    return `
      <div class="result-tomorrow" aria-label="明日预告">
        <div class="tomorrow-silhouette">${tomorrowPreviewArt()}</div>
        ${trainArt("arrive", true)}
      </div>
    `;
  }

  return `
    <div class="result-arrival">${trainArt("arrive", true)}</div>
    <div class="result-stars" aria-label="本轮收集星星" style="--round-stars: ${state.roundStars}">
      ${starBox("result-box")}
    </div>
  `;
}

function prefersReducedMotion() {
  return Boolean(globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches);
}

function scheduleResultAdvance() {
  if (!state.fullResultSequence || state.view !== "result" || prefersReducedMotion()) return;
  setTimeout(() => {
    if (state.view === "result") advanceResultPhase();
  }, 3000);
}

function advanceResultPhase(renderAfter = true) {
  const nextByPhase = { stars: "learned", learned: "tomorrow" };
  const next = nextByPhase[state.resultPhase];
  if (!state.fullResultSequence || !next) {
    if (renderAfter) goHome();
    return;
  }
  state.resultPhase = next;
  if (renderAfter) {
    render();
    scheduleResultAdvance();
  }
}

function resultView() {
  const replayMode = state.mode || "lesson";
  const staticSequence = state.fullResultSequence && prefersReducedMotion();
  const phaseAction = staticSequence
    ? 'data-view="home"'
    : state.fullResultSequence
      ? 'data-action="result-next"'
      : "";
  const phaseContent = staticSequence
    ? `<div class="result-static-sequence">
        ${["stars", "learned", "tomorrow"]
          .map(
            (phase) => `<div class="result-static-phase" data-static-phase="${phase}">${resultPhaseContent(phase)}</div>`,
          )
          .join("")}
      </div>`
    : resultPhaseContent();
  return `
    <main class="screen result-screen" data-result-phase="${state.resultPhase}">
      ${parentCorner()}
      <button class="home-replay" type="button" data-action="repeat-prompt" aria-label="再听一次">
        ${icon("volume")}
      </button>
      <section class="result-panel result-phase-panel" aria-labelledby="result-title">
        <h2 id="result-title" class="sr-only">完成</h2>
        <button class="result-phase-button" type="button" ${phaseAction} aria-label="继续">
          ${phaseContent}
        </button>
        ${
          state.fullResultSequence
            ? ""
            : `<div class="result-actions">
                <button class="result-replay" type="button" data-start="${replayMode}" aria-label="再玩一次">${icon("repeat")}</button>
                ${gardenEntry()}
                <button class="garden-back" type="button" data-view="home" aria-label="回首页">${icon("home")}</button>
              </div>`
        }
      </section>
      ${starBoxOverlay()}
    </main>
  `;
}

function render() {
  const views = {
    home: homeView,
    garden: gardenView,
    game: gameView,
    practice: practiceView,
    "parent-gate": parentGateView,
    records: recordsView,
    result: resultView,
  };
  app.innerHTML = views[state.view]();
}

function handleClick(event) {
  if (longPressFired) {
    const longPressSource = event.target.closest?.('[data-longpress="parent"]');
    longPressFired = false;
    if (longPressSource) return;
  }

  const button = event.target.closest("button");
  if (!button) return;

  const view = button.dataset.view;
  const start = button.dataset.start;
  const answerId = button.dataset.answer;
  const buildPart = button.dataset.buildPart;
  const buildValue = button.dataset.buildValue;
  const readAssess = button.dataset.read;
  const practiceId = button.dataset.practice;
  const tonePracticeId = button.dataset.tonePractice;
  const action = button.dataset.action;
  const gateAnswer = button.dataset.gateAnswer;
  const lessonMinutes = button.dataset.lessonMinutes;
  const offlineId = button.dataset.offlineId;
  const offlineResult = button.dataset.offlineResult;
  const unlockDecorationId = button.dataset.unlockDecoration;
  const activateDecorationId = button.dataset.activateDecoration;
  const gardenPlantId = button.dataset.gardenPlant;
  const molePace = button.dataset.molePace;

  if (gateAnswer !== undefined) {
    answerParentGate(gateAnswer);
    return;
  }

  if (lessonMinutes) {
    state.progress.settings.lessonMinutes = Number(lessonMinutes);
    saveProgress();
    render();
    return;
  }

  if (offlineId && offlineResult) {
    recordOfflineTask(offlineId, offlineResult === "correct");
    return;
  }

  if (unlockDecorationId) {
    unlockDecoration(unlockDecorationId);
    render();
    return;
  }

  if (activateDecorationId) {
    activateTrainColor(activateDecorationId);
    render();
    return;
  }

  if (gardenPlantId) {
    state.gardenPlantOpen = gardenPlantId;
    render();
    const item = getItem(gardenPlantId);
    playAudioSequence([item.audio, item.wordAudio]);
    return;
  }

  if (molePace) {
    state.molePace = molePace;
    state.moleWrongStreak = 0;
    render();
    return;
  }

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

  if (readAssess) {
    answerRead(readAssess === "known");
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

  if (action === "toggle-mic") {
    if (state.progress.settings.micEnabled) {
      state.progress.settings.micEnabled = false;
      saveProgress();
      render();
      return;
    }
    requestMicrophonePermission().then((allowed) => {
      state.progress.settings.micEnabled = allowed;
      saveProgress();
      render();
    });
    return;
  }

  if (action === "skip-scene-intro") {
    stopAudio();
    state.sceneIntro = false;
    render();
    playCurrentPrompt();
    return;
  }

  if (action === "start-spot-check") {
    startSpotCheck();
    return;
  }

  if (action === "spot-correct" || action === "spot-wrong") {
    answerSpotCheck(action === "spot-correct");
    return;
  }

  if (action === "request-reset") {
    state.resetRequested = true;
    render();
    return;
  }

  if (action === "cancel-reset") {
    state.resetRequested = false;
    render();
    return;
  }

  if (action === "confirm-reset") {
    const input = document.querySelector("#reset-day");
    const todayNumber = parseDateId(getLocalDateId()).getDate();
    if (Number(input?.value) === todayNumber) resetProgress();
    return;
  }

  if (action === "open-box") {
    state.boxOpen = true;
    render();
    return;
  }

  if (action === "close-box") {
    state.boxOpen = false;
    render();
    return;
  }

  if (action === "close-plant") {
    state.gardenPlantOpen = "";
    render();
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

  if (action === "result-next") {
    advanceResultPhase();
    return;
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
    openParentGate();
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
  await loadAudioManifest();
  ensureTodayCourse();
  render();
  setTimeout(() => playViewPrompt(), 180);
}

globalThis.__pinyinInitPromise = init();
