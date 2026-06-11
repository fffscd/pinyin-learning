const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = process.cwd();
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const copyPath = path.join(root, "assets/audio/recording-copy.json");
const manifestPath = path.join(root, "assets/audio/manifest.json");
const csvPath = path.join(root, "assets/audio/recording-checklist.csv");
const qaPath = path.join(root, "docs/audio-qa-checklist.md");
const checkOnly = process.argv.includes("--check");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function stripExtension(filePath) {
  return filePath.replace(/\.(mp3|wav|m4a|ogg|webm)$/i, "");
}

function audioType(filePath) {
  if (filePath.includes("/syllable-tone/")) return "带调拼读";
  if (filePath.includes("/pinyin/")) return "读音";
  if (filePath.includes("/words/")) return "例词";
  if (filePath.includes("/tones/")) return "声调";
  return "提示音";
}

function firstCourseDay(coursePlan, id) {
  const index = coursePlan.findIndex((plan) =>
    ["newItems", "reviewItems", "pictureItems"].some((field) => (plan[field] || []).includes(id)),
  );
  return index >= 0 ? index + 1 : Number.MAX_SAFE_INTEGER;
}

function itemIdFromFile(filePath) {
  const name = path.basename(stripExtension(filePath));
  return filePath.includes("/syllable-tone/") ? name.replace(/[1-4]$/, "") : name;
}

async function loadCoursePlan() {
  const source = fs.readFileSync(path.join(root, "app.js"), "utf8");
  const app = { addEventListener() {}, set innerHTML(value) {}, get innerHTML() { return ""; } };
  const context = {
    console,
    navigator: {},
    document: { querySelector: () => app },
    Audio: function Audio() {},
    fetch: () => Promise.reject(new Error("no network")),
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    setTimeout() {},
    clearTimeout() {},
  };
  await vm.runInNewContext(
    `(async () => {
      ${source}
      await globalThis.__pinyinInitPromise;
      globalThis.__audioQaCoursePlan = COURSE_PLAN;
    })();`,
    context,
  );
  return context.__audioQaCoursePlan;
}

function buildCsv(expected, copy) {
  const rows = [["分组", "目标基名", "建议文件名", "朗读内容"]];
  Object.entries(expected.recordings || {}).forEach(([group, bases]) => {
    bases.forEach((base) => rows.push([group, base, `${base}.webm`, copy[base] || ""]));
  });
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function readQaStates() {
  if (!fs.existsSync(qaPath)) return new Map();
  const states = new Map();
  fs.readFileSync(qaPath, "utf8")
    .split("\n")
    .filter((line) => line.startsWith("| `assets/audio/"))
    .forEach((line) => {
      const cells = line.split("|").slice(1, -1).map((cell) => cell.trim());
      const file = cells[0]?.replaceAll("`", "");
      if (file && cells.length >= 9) states.set(file, cells.slice(-5));
    });
  return states;
}

function buildQa(manifest, copy, coursePlan, qaStates = new Map()) {
  const entries = manifest.files
    .map((file) => {
      const type = audioType(file);
      const id = itemIdFromFile(file);
      const dayIndex = type === "提示音" ? 0 : type === "声调" ? 8 : firstCourseDay(coursePlan, id);
      return {
        file,
        type,
        content: copy[stripExtension(file)] || "",
        dayIndex,
      };
    })
    .sort((a, b) => {
      const aEarly = a.dayIndex <= 60 ? 0 : 1;
      const bEarly = b.dayIndex <= 60 ? 0 : 1;
      return aEarly - bEarly || a.dayIndex - b.dayIndex || a.file.localeCompare(b.file);
    });

  const rows = entries.map((entry) => {
    const priority = entry.dayIndex === 0 ? "基础提示" : entry.dayIndex <= 60 ? `前60天 · D${entry.dayIndex}` : "后续课程";
    const [tone, segment, intelligibility, status, issue] = qaStates.get(entry.file) || ["[ ]", "[ ]", "[ ]", "待核验", ""];
    return `| \`${entry.file}\` | \`${itemIdFromFile(entry.file)}\` | ${entry.type} | ${entry.content} | ${priority} | ${tone} | ${segment} | ${intelligibility} | ${status} | ${issue} |`;
  });

  return `# 音频质量核验清单\n\n` +
    `生成命令：\`node scripts/generate-recording-checklist.js\`。当前清单覆盖 manifest 中 ${entries.length} 个音频文件。\n\n` +
    `每条依次判断：声调正确、音段正确、可懂度。发现问题时填写问题描述；MeloTTS 连续两次重制仍不合格的条目，状态改为“待真人录音”。\n\n` +
    `共振峰声调文件需要做四声两两连播；带调拼读重点复核三声、ü 系和翘舌音。线下儿童听辨观察只记录真实结果，不预填结论。\n\n` +
    `| 文件 | 条目 id | 类型 | 内容 | 优先级 | 声调正确 | 音段正确 | 可懂度 | 状态 | 问题描述 |\n` +
    `| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n` +
    `${rows.join("\n")}\n`;
}

(async () => {
  const expected = readJson(expectedPath);
  const copy = readJson(copyPath);
  const manifest = readJson(manifestPath);
  const coursePlan = await loadCoursePlan();
  const csv = buildCsv(expected, copy);
  const qa = buildQa(manifest, copy, coursePlan, readQaStates());

  if (checkOnly) {
    const csvCurrent = fs.existsSync(csvPath) ? fs.readFileSync(csvPath, "utf8") : "";
    const qaCurrent = fs.existsSync(qaPath) ? fs.readFileSync(qaPath, "utf8") : "";
    if (csvCurrent !== csv || qaCurrent !== qa) {
      console.error("录音清单已过期，请运行 node scripts/generate-recording-checklist.js");
      process.exitCode = 1;
      return;
    }
    console.log(`录音 CSV 与 QA 清单均覆盖 ${manifest.files.length} 个 manifest 文件。`);
    return;
  }

  fs.writeFileSync(csvPath, csv, "utf8");
  fs.writeFileSync(qaPath, qa, "utf8");
  console.log(`已生成 ${csvPath} 与 ${qaPath}，QA 共 ${manifest.files.length} 条。`);
})();
