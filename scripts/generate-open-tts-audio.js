const fs = require("fs");
const path = require("path");
const { execFileSync, spawnSync } = require("child_process");

const root = process.cwd();
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const copyPath = path.join(root, "assets/audio/recording-copy.json");
const tempDir = path.join(root, ".tmp/open-tts");
const overwrite = process.argv.includes("--overwrite");
const dryRun = process.argv.includes("--dry-run");
const extraBinDirs = ["/opt/homebrew/bin", "/usr/local/bin"];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function resolveCommand(command) {
  const candidates = [
    command,
    ...extraBinDirs.map((dir) => path.join(dir, command)),
  ];
  return candidates.find((candidate) => {
    const result = spawnSync(candidate, ["--version"], { stdio: "ignore" });
    return !result.error;
  });
}

function ensureTool(command, installHint) {
  const resolved = resolveCommand(command);
  if (resolved) return resolved;
  console.error(`缺少命令：${command}`);
  console.error(installHint);
  process.exit(1);
}

const espeakCommand = ensureTool("espeak-ng", "macOS 可运行：brew install espeak-ng");
const ffmpegCommand = ensureTool("ffmpeg", "macOS 可运行：brew install ffmpeg");

function synthesizeWav(text, wavPath) {
  execFileSync(espeakCommand, ["-v", "cmn", "-s", "145", "-p", "55", "-a", "180", "-w", wavPath, text], {
    stdio: "ignore",
  });
}

function convertToWebm(wavPath, webmPath) {
  execFileSync(
    ffmpegCommand,
    ["-y", "-v", "error", "-i", wavPath, "-ar", "24000", "-ac", "1", "-c:a", "libopus", "-b:a", "40k", webmPath],
    { stdio: "ignore" },
  );
}

const expected = readJson(expectedPath);
const copy = readJson(copyPath);
const entries = Object.values(expected.recordings || {}).flat().sort();

if (!dryRun) {
  fs.mkdirSync(tempDir, { recursive: true });
}

let generated = 0;
let skipped = 0;

entries.forEach((basePath) => {
  const text = copy[basePath];
  if (!text) {
    console.error(`缺少朗读文案：${basePath}`);
    process.exitCode = 1;
    return;
  }

  const webmPath = path.join(root, `${basePath}.webm`);
  if (!overwrite && fs.existsSync(webmPath) && fs.statSync(webmPath).size > 0) {
    skipped += 1;
    return;
  }

  if (dryRun) {
    console.log(`${basePath}.webm <- ${text}`);
    return;
  }

  fs.mkdirSync(path.dirname(webmPath), { recursive: true });
  const wavPath = path.join(tempDir, `${basePath.replace(/[\\/]/g, "__")}.wav`);
  synthesizeWav(text, wavPath);
  convertToWebm(wavPath, webmPath);
  generated += 1;
});

if (!dryRun && process.exitCode !== 1) {
  execFileSync(process.execPath, ["scripts/sync-audio-manifest.js"], { stdio: "inherit" });
}

console.log(`开源 TTS 音频处理完成：生成 ${generated} 个，跳过 ${skipped} 个。`);
