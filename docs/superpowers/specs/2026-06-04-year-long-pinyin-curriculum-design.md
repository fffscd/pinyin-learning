# 一年学会拼音：三大需求设计

日期：2026-06-04
状态：已确认，进入实现

## 目标

让现有「30 天启蒙 MVP」升级为可支撑幼儿一年内学会拼音的产品。落地三个需求：全套国标内容 + 年度课表、间隔重复复习引擎、拼读与认读产出训练。约束：纯 HTML/CSS/JS，无构建步骤，向后兼容旧本地进度，新增拼音暂不配音（缺录音时静默降级）。

## 需求一：全套国标内容 + 年度课表

### 内容数据（PINYIN_ITEMS）
- 声母补 15 个：g k h j q x zh ch sh r z c s y w（凑满 23）。type=initial。
- 复韵母 9 个：ai ei ui ao ou iu ie üe er。type=final。
- 鼻韵母 9 个：an en in un ün ang eng ing ong。type=final。
- 整体认读 16 个：zhi chi shi ri zi ci si yi wu yu ye yue yuan yin yun ying。新增 type=whole。
- 拼读巩固音节若干（ge ke he / ji qi xi / gu ku hu / zha cha sha / ya wa re 等），type=syllable，pictureable=false，仅用于拼读/认读。
- 字段沿用 label/sound/word/emoji/color/audio；颜色按调色板循环分配。

### 配套
- splitSyllable 改最长前缀匹配，避免 zh/ch/sh 被 z/c/s/h 截错。
- categoryName/categoryDisplay/makeCategoryQuestion 增加第 4 类「整体认读」。
- INITIAL_IDS 扩为 23 个，新增 COMPOUND_FINAL_IDS / NASAL_FINAL_IDS / WHOLE_IDS / BLEND_SYLLABLE_IDS。

### 年度课表
- COURSE_PLAN = 第一月 30 天（原样）+ 生成的引入日（覆盖全部新内容，引入+巩固，每天 1–2 个新内容）。
- getDailyPlan(dayIndex)：超出 COURSE_PLAN 长度时合成「综合复习」日（newItems=[]，review 全解锁，blend+read+useWeakReview）。年度乃至更久都有内容。
- getCourseDayIndex 去掉对 30 取模，按开课绝对天数推进。
- getUnlockedPinyinIds 累积到 min(dayIndex, 长度) 的 newItems；全部引入后返回全部。

## 需求二：间隔重复复习引擎（Leitner）

- progress.letters[id] 扩展 {attempts, correct, box, dueDay, lastDay, streak}。normalizeProgress 给旧数据补默认。
- 时间单位 = 开课绝对天数 diffDays(startDate, today)。
- 间隔表 box→天：[1,2,4,8,16,32]。答对 box+1（封顶 5），dueDay=今天+间隔，streak+1；答错 box-1，dueDay=明天，streak=0。box>=5 记「已掌握」。
- getDueReviewIds(unlockedIds, today)：返回到期项，按逾期最久、box 最低排序。
- buildCourse 复习题优先取到期项，不足时回退 plan.reviewItems / 题池（保第一月早期行为稳定）。recordQuestionResult 更新盒子。

## 需求三：拼读与认读产出

- 拼读关：扩展 syllable-build 覆盖 BLEND_SYLLABLE_IDS；initial/final 选项池来自实际音节拆分。
- 认读关：新增 syllable-read。呈现音节卡片，点「听一听」对照标准音，再自评「我会读了 ✓ / 再练练」；结果回写 Leitner 盒子。
- 入口：花园加「认读」模式；课表巩固日与综合复习日排入 blend/read。
- 声调取舍：声母+韵母两段拼读，声调留在现有声调滑梯，不引入逐音节四声目标。

## 记录与样式
- recordsView 增加「已掌握 / 复习中 / 易忘」三类统计。
- styles.css 增加认读卡片、自评按钮等样式。

## 验证
- node --check app.js；node scripts/verify-goal.js；本地静态服务人工走查首页、课程、拼读关、认读关、记录页、桌面与窄屏。
