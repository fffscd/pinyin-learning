const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const manifestPath = path.join(root, "assets/audio/manifest.json");
const copyPath = path.join(root, "assets/audio/recording-copy.json");
const summaryOnly = process.argv.includes("--summary");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getExpectedBases(expected) {
  return Object.values(expected.recordings || {}).flat().sort();
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fileSize(relativePath) {
  const filePath = path.join(root, relativePath);
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? fs.statSync(filePath).size : 0;
}

function stripSupportedExtension(file, extensions) {
  const extension = extensions.find((item) => file.endsWith(item));
  return extension ? file.slice(0, -extension.length) : "";
}

function resolveCommand(command) {
  const candidates = [command, "/opt/homebrew/bin/ffprobe", "/usr/local/bin/ffprobe"];
  return candidates.find((candidate) => {
    const result = spawnSync(candidate, ["-version"], { stdio: "ignore" });
    return !result.error && result.status === 0;
  });
}

function canDecodeAudio(relativePath, ffprobeCommand) {
  const result = spawnSync(
    ffprobeCommand,
    ["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", relativePath],
    { cwd: root, encoding: "utf8" },
  );
  const duration = Number(result.stdout.trim());
  return result.status === 0 && Number.isFinite(duration) && duration > 0;
}

const expectedData = readJson(expectedPath);
const expected = getExpectedBases(expectedData);
const recordingCopy = readJson(copyPath);
const supportedExtensions = expectedData.supportedExtensions || [".mp3"];
const manifest = readJson(manifestPath);
const files = Array.isArray(manifest.files) ? [...manifest.files].sort() : [];
const ffprobeCommand = resolveCommand("ffprobe");
const duplicateFiles = files.filter((item, index) => files.indexOf(item) !== index);
const fileBases = files.map((file) => stripSupportedExtension(file, supportedExtensions));
const duplicateBases = fileBases
  .filter(Boolean)
  .filter((item, index, list) => list.indexOf(item) !== index);
const unexpectedFiles = files.filter((item, index) => !fileBases[index] || !expected.includes(fileBases[index]));
const missingFromManifest = expected.filter((item) => !fileBases.includes(item));
const manifestFilesMissingOnDisk = files.filter((item) => !fileExists(item));
const emptyManifestFiles = files.filter((item) => fileExists(item) && fileSize(item) === 0);
const expectedFilesMissingOnDisk = expected.filter((base) => !supportedExtensions.some((extension) => fileExists(`${base}${extension}`)));
const expectedFilesEmptyOnDisk = expected.filter((base) =>
  supportedExtensions.some((extension) => fileExists(`${base}${extension}`) && fileSize(`${base}${extension}`) === 0),
);
const missingRecordingCopy = expected.filter((base) => !recordingCopy[base]);
const unusedRecordingCopy = Object.keys(recordingCopy).filter((base) => !expected.includes(base));
const uniqueDuplicateBases = [...new Set(duplicateBases)];
const unreadableAudioFiles = ffprobeCommand
  ? files.filter((item) => fileExists(item) && fileSize(item) > 0 && !canDecodeAudio(item, ffprobeCommand))
  : [];

const hasError =
  duplicateFiles.length > 0 ||
  duplicateBases.length > 0 ||
  unexpectedFiles.length > 0 ||
  manifestFilesMissingOnDisk.length > 0 ||
  emptyManifestFiles.length > 0 ||
  missingFromManifest.length > 0 ||
  expectedFilesMissingOnDisk.length > 0 ||
  expectedFilesEmptyOnDisk.length > 0 ||
  missingRecordingCopy.length > 0 ||
  unusedRecordingCopy.length > 0 ||
  unreadableAudioFiles.length > 0;

function printSummary() {
  const usableManifestFiles = files.filter((item) => fileExists(item) && fileSize(item) > 0).length;

  console.error("音频资源校验未通过：");
  console.error(`- manifest 录音数：${files.length}/${expected.length}`);
  console.error(`- 可用 manifest 录音：${usableManifestFiles}/${expected.length}`);
  console.error(`- 缺少录音文件：${expectedFilesMissingOnDisk.length}`);
  console.error(`- 未加入 manifest：${missingFromManifest.length}`);
  console.error(`- 空录音文件：${expectedFilesEmptyOnDisk.length + emptyManifestFiles.length}`);
  console.error(`- 无法解码录音文件：${unreadableAudioFiles.length}`);
  console.error(`- 重复或异常 manifest 条目：${duplicateFiles.length + uniqueDuplicateBases.length + unexpectedFiles.length}`);
  console.error(`- 朗读内容缺口：${missingRecordingCopy.length + unusedRecordingCopy.length}`);
  console.error("运行 `node scripts/verify-audio-assets.js` 查看详细清单。");
}

if (!summaryOnly && duplicateFiles.length > 0) {
  console.error("manifest.json 存在重复条目:");
  duplicateFiles.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && duplicateBases.length > 0) {
  console.error("manifest.json 中同一录音存在多个格式:");
  uniqueDuplicateBases.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && unexpectedFiles.length > 0) {
  console.error("manifest.json 存在未登记到 expected-files.json 的条目:");
  unexpectedFiles.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && manifestFilesMissingOnDisk.length > 0) {
  console.error("manifest.json 中的文件不存在:");
  manifestFilesMissingOnDisk.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && emptyManifestFiles.length > 0) {
  console.error("manifest.json 中存在空录音文件:");
  emptyManifestFiles.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && unreadableAudioFiles.length > 0) {
  console.error("录音文件无法被 ffprobe 解码:");
  unreadableAudioFiles.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && missingFromManifest.length > 0) {
  console.error("expected-files.json 中仍未加入 manifest.json 的文件:");
  missingFromManifest.forEach((item) => console.error(`- ${item}{${supportedExtensions.join(",")}}`));
}

if (!summaryOnly && expectedFilesMissingOnDisk.length > 0) {
  console.error("仍缺少真人录音文件:");
  expectedFilesMissingOnDisk.forEach((item) => console.error(`- ${item}{${supportedExtensions.join(",")}}`));
}

if (!summaryOnly && expectedFilesEmptyOnDisk.length > 0) {
  console.error("真人录音文件为空:");
  expectedFilesEmptyOnDisk.forEach((item) => console.error(`- ${item}{${supportedExtensions.join(",")}}`));
}

if (!summaryOnly && missingRecordingCopy.length > 0) {
  console.error("recording-copy.json 缺少朗读内容:");
  missingRecordingCopy.forEach((item) => console.error(`- ${item}`));
}

if (!summaryOnly && unusedRecordingCopy.length > 0) {
  console.error("recording-copy.json 存在未使用条目:");
  unusedRecordingCopy.forEach((item) => console.error(`- ${item}`));
}

if (hasError) {
  if (summaryOnly) {
    printSummary();
  }
  process.exitCode = 1;
} else {
  console.log(`音频资源校验通过，共 ${files.length} 个录音文件。`);
}
