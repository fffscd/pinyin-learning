const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const sourceDir = process.argv[2] || path.join(root, ".tmp/mp3-chinese-pinyin-sound/mp3");
const outputDir = path.join(root, "assets/audio/pinyin");
const sourceByTarget = {
  a: "a1",
  o: "wo1",
  e: "e1",
  i: "yi1",
  u: "wu1",
  ü: "yu1",
  b: "bo1",
  p: "po1",
  m: "mo1",
  f: "fo1",
  d: "de1",
  t: "te1",
  n: "ne1",
  l: "le1",
  ba: "ba1",
  pa: "pa1",
  ma: "ma1",
  fa: "fa1",
  bo: "bo1",
  po: "po1",
  mo: "mo1",
  fo: "fo1",
  de: "de1",
  te: "te1",
  ne: "ne1",
  le: "le1",
  da: "da1",
  ta: "ta1",
  na: "na1",
  la: "la1",
};

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8" });
  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")}\n${result.stderr || result.stdout}`);
  }
}

if (!fs.existsSync(sourceDir)) {
  console.error(`缺少源目录：${sourceDir}`);
  console.error("先运行：git clone --depth=1 https://github.com/davinfifield/mp3-chinese-pinyin-sound.git .tmp/mp3-chinese-pinyin-sound");
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

for (const [target, source] of Object.entries(sourceByTarget)) {
  const input = path.join(sourceDir, `${source}.mp3`);
  const output = path.join(outputDir, `${target}.webm`);

  if (!fs.existsSync(input)) {
    console.error(`缺少源音频：${input}`);
    process.exit(1);
  }

  run("ffmpeg", [
    "-y",
    "-v",
    "error",
    "-i",
    input,
    "-af",
    "loudnorm=I=-18:TP=-2:LRA=11",
    "-ar",
    "24000",
    "-ac",
    "1",
    "-c:a",
    "libopus",
    "-b:a",
    "56k",
    output,
  ]);
  console.log(`${path.relative(root, output)} <- ${source}.mp3`);
}

run(process.execPath, ["scripts/sync-audio-manifest.js"]);
console.log(`已从 davinfifield/mp3-chinese-pinyin-sound 导入 ${Object.keys(sourceByTarget).length} 个拼音音频。`);
