const fs = require("fs");
const vm = require("vm");

const source = fs.readFileSync("app.js", "utf8");
const outputPath = "docs/illustration-backlog.md";
const checkOnly = process.argv.includes("--check");
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

function firstCourseDay(coursePlan, id) {
  const index = coursePlan.findIndex((plan) =>
    ["newItems", "reviewItems", "pictureItems"].some((field) => (plan[field] || []).includes(id)),
  );
  return index >= 0 ? index + 1 : Number.MAX_SAFE_INTEGER;
}

function buildMarkdown(items, illustrationIds, coursePlan) {
  const covered = new Set(illustrationIds);
  const missing = items
    .filter((item) => item.pictureable !== false && !covered.has(item.id))
    .map((item) => ({ ...item, dayIndex: firstCourseDay(coursePlan, item.id) }))
    .sort((a, b) => a.dayIndex - b.dayIndex || a.id.localeCompare(b.id));

  const rows = missing.map((item) => {
    const day = Number.isFinite(item.dayIndex) && item.dayIndex < Number.MAX_SAFE_INTEGER ? `D${item.dayIndex}` : "未排入";
    return `| [ ] | ${day} | \`${item.id}\` | ${item.label} | ${item.word} | ${item.emoji} | 待绘制 |`;
  });

  return `# 插画补齐 Backlog\n\n` +
    `生成命令：\`node scripts/report-missing-illustrations.js\`。当前手绘覆盖 ${illustrationIds.length} 项，待补 ${missing.length} 项。\n\n` +
    `按课程首次出现顺序处理，每批建议 10–15 幅。完成后勾选状态并重跑脚本核对代码覆盖；人工验收记录写在“验收”列。\n\n` +
    `| 完成 | 首次课程 | id | 拼音 | 例词 | 临时图 | 验收 |\n` +
    `| --- | --- | --- | --- | --- | --- | --- |\n` +
    `${rows.join("\n")}\n`;
}

(async () => {
  await vm.runInNewContext(
    `(async () => {
      ${source}
      await globalThis.__pinyinInitPromise;
      globalThis.__illustrationData = { PINYIN_ITEMS, ILLUSTRATION_IDS, COURSE_PLAN };
    })();`,
    context,
  );
  const data = context.__illustrationData;
  const markdown = buildMarkdown(data.PINYIN_ITEMS, data.ILLUSTRATION_IDS, data.COURSE_PLAN);
  if (checkOnly) {
    const current = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf8") : "";
    if (current !== markdown) {
      console.error("插画 backlog 已过期，请运行 node scripts/report-missing-illustrations.js");
      process.exitCode = 1;
      return;
    }
    console.log("插画 backlog 与当前代码覆盖一致。");
    return;
  }
  fs.writeFileSync(outputPath, markdown, "utf8");
  console.log(`已生成 ${outputPath}`);
})();
