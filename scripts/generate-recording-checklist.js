const fs = require("fs");
const path = require("path");

const expectedPath = path.join(process.cwd(), "assets/audio/expected-files.json");
const copyPath = path.join(process.cwd(), "assets/audio/recording-copy.json");
const outputPath = path.join(process.cwd(), "assets/audio/recording-checklist.csv");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function csvCell(value) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

const expected = readJson(expectedPath);
const copy = readJson(copyPath);
const rows = [["分组", "目标基名", "建议文件名", "朗读内容"]];

Object.entries(expected.recordings || {}).forEach(([group, bases]) => {
  bases.forEach((base) => {
    rows.push([group, base, `${base}.webm`, copy[base] || ""]);
  });
});

const csv = `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
fs.writeFileSync(outputPath, csv, "utf8");
console.log(`已生成 ${outputPath}，共 ${rows.length - 1} 条录音。`);
