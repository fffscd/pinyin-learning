// 从 app.js 的 PINYIN_ITEMS（唯一数据源）派生音频期望清单与朗读文本，
// 保留 tones、prompts 等手工分组，避免内容数据与音频配置漂移。
// 用法：node scripts/build-audio-expectations.js [--check]
const fs = require("fs");
const path = require("path");

const root = process.cwd();
const appPath = path.join(root, "app.js");
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const copyPath = path.join(root, "assets/audio/recording-copy.json");
const checkOnly = process.argv.includes("--check");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

// 提取 `const PINYIN_ITEMS = [ ... ]` 的数组字面量并求值。
function loadPinyinItems() {
  const source = fs.readFileSync(appPath, "utf8");
  const startToken = "const PINYIN_ITEMS = [";
  const startIndex = source.indexOf(startToken);
  if (startIndex < 0) {
    throw new Error("未在 app.js 中找到 PINYIN_ITEMS");
  }
  const arrayStart = startIndex + startToken.length - 1; // 指向 '['
  const endIndex = source.indexOf("].map(", arrayStart);
  if (endIndex < 0) {
    throw new Error("未找到 PINYIN_ITEMS 数组结尾");
  }
  const literal = source.slice(arrayStart, endIndex + 1); // 含首尾方括号
  // eslint-disable-next-line no-eval
  return eval(`(${literal})`);
}

function buildExpected(items, previous) {
  const recordings = { ...(previous.recordings || {}) };
  recordings.pinyin = items.map((item) => `assets/audio/pinyin/${item.id}`);
  recordings.words = items.map((item) => `assets/audio/words/${item.id}`);
  return {
    supportedExtensions: previous.supportedExtensions || [".mp3", ".wav", ".m4a", ".ogg", ".webm"],
    recordings,
  };
}

function buildCopy(items, previous) {
  const copy = {};
  // pinyin 读单字声音，words 读例词；其余分组沿用既有文本。
  items.forEach((item) => {
    copy[`assets/audio/pinyin/${item.id}`] = item.sound;
  });
  items.forEach((item) => {
    copy[`assets/audio/words/${item.id}`] = item.word;
  });
  Object.keys(previous)
    .filter((key) => !key.startsWith("assets/audio/pinyin/") && !key.startsWith("assets/audio/words/"))
    .forEach((key) => {
      copy[key] = previous[key];
    });
  return copy;
}

function stringify(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

const items = loadPinyinItems();
const expected = buildExpected(items, readJson(expectedPath));
const copy = buildCopy(items, readJson(copyPath));

const expectedText = stringify(expected);
const copyText = stringify(copy);

if (checkOnly) {
  const expectedStale = fs.readFileSync(expectedPath, "utf8") !== expectedText;
  const copyStale = fs.readFileSync(copyPath, "utf8") !== copyText;
  if (expectedStale || copyStale) {
    console.error("音频期望清单与 PINYIN_ITEMS 不一致，请运行 node scripts/build-audio-expectations.js");
    if (expectedStale) console.error("- assets/audio/expected-files.json 过期");
    if (copyStale) console.error("- assets/audio/recording-copy.json 过期");
    process.exitCode = 1;
  } else {
    console.log("音频期望清单与 PINYIN_ITEMS 一致。");
  }
} else {
  fs.writeFileSync(expectedPath, expectedText);
  fs.writeFileSync(copyPath, copyText);
  console.log(
    `已生成音频期望清单：拼音 ${expected.recordings.pinyin.length} 条、例词 ${expected.recordings.words.length} 条、` +
      `声调 ${(expected.recordings.tones || []).length} 条、提示 ${(expected.recordings.prompts || []).length} 条。`,
  );
}
