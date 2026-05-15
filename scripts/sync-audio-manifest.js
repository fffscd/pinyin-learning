const fs = require("fs");
const path = require("path");

const root = process.cwd();
const expectedPath = path.join(root, "assets/audio/expected-files.json");
const manifestPath = path.join(root, "assets/audio/manifest.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function getExpectedBases(expected) {
  return Object.values(expected.recordings || {}).flat().sort();
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function isNonEmptyFile(relativePath) {
  const filePath = path.join(root, relativePath);
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile() && fs.statSync(filePath).size > 0;
}

const expectedData = readJson(expectedPath);
const expected = getExpectedBases(expectedData);
const supportedExtensions = expectedData.supportedExtensions || [".mp3"];
const files = expected
  .map((base) => supportedExtensions.map((extension) => `${base}${extension}`).find(isNonEmptyFile))
  .filter(Boolean);
const manifest = `${JSON.stringify({ files }, null, 2)}\n`;

fs.writeFileSync(manifestPath, manifest, "utf8");
console.log(`已同步 ${files.length}/${expected.length} 个录音到 assets/audio/manifest.json。`);

if (files.length < expected.length) {
  console.log(`仍缺少 ${expected.length - files.length} 个录音文件。`);
}
