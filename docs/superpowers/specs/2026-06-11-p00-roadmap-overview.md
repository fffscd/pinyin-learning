# 后续二十点核心规划 · 总览索引

日期：2026-06-11
状态：方向已确认（来自当日规划讨论），各设计稿细节待评审

## 说明

本索引对应 20 份设计稿，编号 p01–p20。每份独立可实施，互相之间的依赖在「依赖」列标注。
涉及儿童心理的依据来自发展心理学通行结论，未逐条核验文献，各文档中相关表述均按推测处理。

## 清单与优先级

| 编号 | 文档 | 主题 | 优先级 | 依赖 |
| --- | --- | --- | --- | --- |
| p01 | 2026-06-11-p01-daily-session-cap-design.md | 单日学习量上限与到站收尾 | P0 | 无 |
| p02 | 2026-06-11-p02-weekly-rhythm-design.md | 课表周节律 | P1 | 无 |
| p03 | 2026-06-11-p03-leitner-misclick-protection-design.md | Leitner 当日失败保护 | P0 | 与 p10 协同 |
| p04 | 2026-06-11-p04-toned-blend-design.md | 拼读关声调第三段 | P2 | 需补带调音频 |
| p05 | 2026-06-11-p05-read-self-assess-weighting-design.md | 认读自评降权与家长抽查 | P0 | 无 |
| p06 | 2026-06-11-p06-mole-pacing-design.md | 打地鼠节奏分级 | P2 | 无 |
| p07 | 2026-06-11-p07-feed-animal-voice-design.md | 喂动物语音输出玩法 | P2 | 需麦克风权限设计（p15） |
| p08 | 2026-06-11-p08-scene-hunt-design.md | 拼音寻宝场景玩法 | P2 | 依赖场景插画（p19） |
| p09 | 2026-06-11-p09-garden-growth-design.md | 花园成长可见 | P1 | 无 |
| p10 | 2026-06-11-p10-retry-flow-design.md | 答错流程统一（二错点读确认） | P0 | 与 p03 协同 |
| p11 | 2026-06-11-p11-home-single-path-design.md | 首页单一主路径 | P0 | 无 |
| p12 | 2026-06-11-p12-guide-character-design.md | 引导角色（火车头拟人化） | P1 | 需补角色提示音 |
| p13 | 2026-06-11-p13-touch-target-audit-design.md | 触控规格审计 | P1 | 无 |
| p14 | 2026-06-11-p14-result-peak-end-design.md | 结算页峰终三段式 | P1 | 可与 p12 合并实施 |
| p15 | 2026-06-11-p15-parent-zone-isolation-design.md | 家长区隔离与算术门禁 | P1 | 无 |
| p16 | 2026-06-11-p16-star-unlock-design.md | 星星点亮兑换（不清零） | P1 | 无 |
| p17 | 2026-06-11-p17-parent-weekly-report-design.md | 家长周报 | P1 | 建议先做 p15 |
| p18 | 2026-06-11-p18-weak-item-task-cards-design.md | 易忘项亲子任务卡 | P2 | 建议先做 p15、p17 |
| p19 | 2026-06-11-p19-illustration-pipeline-design.md | 插画补齐排期与风格锁定 | P0 | 无 |
| p20 | 2026-06-11-p20-audio-qa-design.md | 录音质量核验与重制评估 | P1 | 无 |

## 建议实施顺序

1. 第一批（学习有效性，纯前端小改动）：p11 → p01 → p10 → p03 → p05 → p19。
2. 第二批（体验与家长侧）：p15 → p17 → p13 → p14 → p16 → p09 → p20 → p02 → p12。
3. 第三批（新玩法与素材依赖）：p18 → p06 → p04 → p08 → p07。

## 公共约束（所有设计稿适用）

- 纯 HTML/CSS/JS，无构建步骤，无第三方依赖。
- 向后兼容旧本地进度：新增字段一律在 `normalizeProgress()` 补默认值。
- 儿童端壳层不出现可见中文长句（`scripts/verify-child-shell.js` 既有守护）；新增儿童端界面遵守同一约束，说明靠图标与语音。
- 尊重 `prefers-reduced-motion`。
- 缺音频时静默降级，不阻塞流程。
