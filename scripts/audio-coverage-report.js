const fs = require("fs");
const path = require("path");

const root = process.cwd();
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const manifestPath = path.join(root, "assets/audio/manifest.json");
const copyPath = path.join(root, "assets/audio/recording-copy.json");
const showMissing = process.argv.includes("--missing");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function filePath(relativePath) {
  return path.join(root, relativePath);
}

function fileSize(relativePath) {
  const target = filePath(relativePath);
  return fs.existsSync(target) && fs.statSync(target).isFile() ? fs.statSync(target).size : 0;
}

function findRecording(base, extensions) {
  return extensions.map((extension) => `${base}${extension}`).find((candidate) => fileSize(candidate) > 0) || "";
}

function formatPercent(count, total) {
  return total === 0 ? "0%" : `${Math.round((count / total) * 100)}%`;
}

const expected = readJson(expectedPath);
const manifest = readJson(manifestPath);
const copy = readJson(copyPath);
const supportedExtensions = expected.supportedExtensions || [".mp3"];
const manifestFiles = new Set(Array.isArray(manifest.files) ? manifest.files : []);
const groups = expected.recordings || {};
const groupStats = Object.entries(groups).map(([group, bases]) => {
  const items = bases.map((base) => {
    const recording = findRecording(base, supportedExtensions);
    return {
      base,
      recording,
      inManifest: recording ? manifestFiles.has(recording) : false,
      copy: copy[base] || "",
    };
  });
  const recorded = items.filter((item) => item.recording).length;
  const manifestReady = items.filter((item) => item.inManifest).length;
  return {
    group,
    total: items.length,
    recorded,
    manifestReady,
    missing: items.filter((item) => !item.recording),
  };
});
const totals = groupStats.reduce(
  (sum, stat) => ({
    total: sum.total + stat.total,
    recorded: sum.recorded + stat.recorded,
    manifestReady: sum.manifestReady + stat.manifestReady,
    missing: sum.missing + stat.missing.length,
  }),
  { total: 0, recorded: 0, manifestReady: 0, missing: 0 },
);
const manifestMissingOnDisk = [...manifestFiles].filter((item) => fileSize(item) === 0);

console.log(`录音覆盖率：${totals.recorded}/${totals.total}（${formatPercent(totals.recorded, totals.total)}）`);
console.log(`manifest 可播放录音：${totals.manifestReady}/${totals.total}（${formatPercent(totals.manifestReady, totals.total)}）`);

groupStats.forEach((stat) => {
  console.log(`- ${stat.group}: 已录 ${stat.recorded}/${stat.total}，manifest ${stat.manifestReady}/${stat.total}，缺少 ${stat.missing.length}`);
});

if (manifestMissingOnDisk.length > 0) {
  console.log(`manifest 中有 ${manifestMissingOnDisk.length} 个文件不存在或为空。`);
}

if (totals.missing === 0) {
  console.log("所有期望录音文件都已落盘。运行 `node scripts/sync-audio-manifest.js` 同步播放清单。");
} else if (showMissing) {
  console.log("");
  console.log("待录清单：");
  groupStats.forEach((stat) => {
    stat.missing.forEach((item) => {
      console.log(`- [${stat.group}] ${item.base}{${supportedExtensions.join(",")}}：${item.copy || "未填写朗读内容"}`);
    });
  });
} else {
  console.log(`仍缺少 ${totals.missing} 条录音。运行 \`node scripts/audio-coverage-report.js --missing\` 查看待录清单。`);
}
