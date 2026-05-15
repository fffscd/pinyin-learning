const fs = require("fs");
const path = require("path");

const root = process.cwd();
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const overwrite = args.includes("--overwrite");
const wantsHelp = args.includes("--help") || args.includes("-h");
const sourceArg = args.find((arg) => !arg.startsWith("--"));

function usage() {
  console.log("用法：node scripts/import-recordings.js <录音来源目录> [--dry-run] [--overwrite]");
  console.log("示例：node scripts/import-recordings.js ~/Downloads --dry-run");
  console.log("支持来源文件名：");
  console.log("- pinyin-a.webm / words-a.webm / tones-a1.webm / prompts-find.webm");
  console.log("- pinyin/a.webm / words/a.webm / tones/a1.webm / prompts/find.webm");
  console.log("- assets/audio/pinyin/a.webm");
}

if (wantsHelp || !sourceArg) {
  usage();
  process.exitCode = wantsHelp ? 0 : 1;
  return;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function expandHome(input) {
  if (input === "~") return process.env.HOME || input;
  if (input.startsWith("~/")) return path.join(process.env.HOME || "", input.slice(2));
  return input;
}

function fileSize(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? fs.statSync(filePath).size : 0;
}

function ensureDir(dirPath) {
  if (!dryRun) fs.mkdirSync(dirPath, { recursive: true });
}

function targetExists(relativePath) {
  return fileSize(path.join(root, relativePath)) > 0;
}

function copyRecording(sourceFile, targetRelativePath) {
  const targetFile = path.join(root, targetRelativePath);
  ensureDir(path.dirname(targetFile));
  if (!dryRun) fs.copyFileSync(sourceFile, targetFile);
}

function getGroup(basePath) {
  return basePath.split("/").at(-2) || "";
}

function getName(basePath) {
  return basePath.split("/").pop() || "";
}

function candidatePaths(sourceDir, basePath, extensions) {
  const group = getGroup(basePath);
  const name = getName(basePath);
  return extensions.flatMap((extension) => [
    path.join(sourceDir, `${group}-${name}${extension}`),
    path.join(sourceDir, group, `${name}${extension}`),
    path.join(sourceDir, "assets", "audio", group, `${name}${extension}`),
  ]);
}

function findSource(sourceDir, basePath, extensions) {
  return candidatePaths(sourceDir, basePath, extensions).find((candidate) => fileSize(candidate) > 0) || "";
}

const expected = readJson(expectedPath);
const extensions = expected.supportedExtensions || [".mp3"];
const sourceDir = path.resolve(expandHome(sourceArg));

if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
  console.error(`录音来源目录不存在：${sourceDir}`);
  process.exitCode = 1;
  return;
}

const entries = Object.values(expected.recordings || {}).flat();
const imported = [];
const skipped = [];
const missing = [];

entries.forEach((basePath) => {
  const sourceFile = findSource(sourceDir, basePath, extensions);
  if (!sourceFile) {
    missing.push(basePath);
    return;
  }

  const extension = path.extname(sourceFile);
  const targetRelativePath = `${basePath}${extension}`;
  if (!overwrite && targetExists(targetRelativePath)) {
    skipped.push(targetRelativePath);
    return;
  }

  copyRecording(sourceFile, targetRelativePath);
  imported.push({ sourceFile, targetRelativePath });
});

const action = dryRun ? "可导入" : "已导入";
console.log(`${action} ${imported.length}/${entries.length} 条录音。`);

if (skipped.length > 0) {
  console.log(`跳过 ${skipped.length} 条已存在录音。需要覆盖时加 --overwrite。`);
}

if (missing.length > 0) {
  console.log(`来源目录仍缺少 ${missing.length} 条录音。`);
}

if (dryRun && imported.length > 0) {
  console.log("预览导入：");
  imported.slice(0, 12).forEach((item) => {
    console.log(`- ${item.sourceFile} -> ${item.targetRelativePath}`);
  });
  if (imported.length > 12) {
    console.log(`- 还有 ${imported.length - 12} 条未显示`);
  }
}

if (!dryRun && imported.length > 0) {
  console.log("导入后请运行：node scripts/sync-audio-manifest.js");
}
