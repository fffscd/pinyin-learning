# 音频质量核验清单

生成命令：`node scripts/generate-recording-checklist.js`。当前清单覆盖 manifest 中 335 个音频文件。

每条依次判断：声调正确、音段正确、可懂度。发现问题时填写问题描述；MeloTTS 连续两次重制仍不合格的条目，状态改为“待真人录音”。

共振峰声调文件需要做四声两两连播；带调拼读重点复核三声、ü 系和翘舌音。线下儿童听辨观察只记录真实结果，不预填结论。

| 文件 | 条目 id | 类型 | 内容 | 优先级 | 声调正确 | 音段正确 | 可懂度 | 状态 | 问题描述 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `assets/audio/prompts/arrive.webm` | `arrive` | 提示音 | 小火车到站啦 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/complete.webm` | `complete` | 提示音 | 这一轮完成啦 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/correct.webm` | `correct` | 提示音 | 找到啦 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/find.webm` | `find` | 提示音 | 请找到这个声音 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/garden.webm` | `garden` | 提示音 | 来花园选一个游戏 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/greet.webm` | `greet` | 提示音 | 小火车出发啦 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/home.webm` | `home` | 提示音 | 今天坐拼音小火车 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/picture.webm` | `picture` | 提示音 | 看一看，找到图片的拼音 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/retry.webm` | `retry` | 提示音 | 再听一听 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/sound-on.webm` | `sound-on` | 提示音 | 声音打开啦 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/prompts/tone.webm` | `tone` | 提示音 | 听一听，找找声调小滑梯 | 基础提示 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/a.webm` | `a` | 读音 | 啊 | 前60天 · D1 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/a.webm` | `a` | 例词 | 阿姨 | 前60天 · D1 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/o.webm` | `o` | 读音 | 喔 | 前60天 · D2 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/o.webm` | `o` | 例词 | 公鸡喔喔叫 | 前60天 · D2 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/e.webm` | `e` | 读音 | 鹅 | 前60天 · D3 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/e.webm` | `e` | 例词 | 白鹅 | 前60天 · D3 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/i.webm` | `i` | 读音 | 衣 | 前60天 · D4 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/i.webm` | `i` | 例词 | 衣服 | 前60天 · D4 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/u.webm` | `u` | 读音 | 乌 | 前60天 · D5 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/u.webm` | `u` | 例词 | 乌云 | 前60天 · D5 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ü.webm` | `ü` | 读音 | 迂 | 前60天 · D6 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ü.webm` | `ü` | 例词 | 小鱼 | 前60天 · D6 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/a1.webm` | `a1` | 声调 | ā | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/a2.webm` | `a2` | 声调 | á | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/a3.webm` | `a3` | 声调 | ǎ | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/a4.webm` | `a4` | 声调 | à | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/e1.webm` | `e1` | 声调 | ē | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/e2.webm` | `e2` | 声调 | é | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/e3.webm` | `e3` | 声调 | ě | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/e4.webm` | `e4` | 声调 | è | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/o1.webm` | `o1` | 声调 | ō | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/o2.webm` | `o2` | 声调 | ó | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/o3.webm` | `o3` | 声调 | ǒ | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/tones/o4.webm` | `o4` | 声调 | ò | 前60天 · D8 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/b.webm` | `b` | 读音 | 玻 | 前60天 · D15 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/b.webm` | `b` | 例词 | 爸爸 | 前60天 · D15 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/p.webm` | `p` | 读音 | 坡 | 前60天 · D16 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/p.webm` | `p` | 例词 | 苹果 | 前60天 · D16 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/m.webm` | `m` | 读音 | 摸 | 前60天 · D17 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/m.webm` | `m` | 例词 | 妈妈 | 前60天 · D17 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/f.webm` | `f` | 读音 | 佛 | 前60天 · D18 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/f.webm` | `f` | 例词 | 风车 | 前60天 · D18 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/d.webm` | `d` | 读音 | 得 | 前60天 · D19 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/d.webm` | `d` | 例词 | 小鼓 | 前60天 · D19 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/t.webm` | `t` | 读音 | 特 | 前60天 · D20 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/t.webm` | `t` | 例词 | 小伞 | 前60天 · D20 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/n.webm` | `n` | 读音 | 讷 | 前60天 · D21 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/n.webm` | `n` | 例词 | 奶奶 | 前60天 · D21 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/l.webm` | `l` | 读音 | 勒 | 前60天 · D22 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/l.webm` | `l` | 例词 | 气球 | 前60天 · D22 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ba.webm` | `ba` | 读音 | 巴 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/fa.webm` | `fa` | 读音 | 发 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ma.webm` | `ma` | 读音 | 妈 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/pa.webm` | `pa` | 读音 | 趴 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ba1.webm` | `ba` | 带调拼读 | bā | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ba2.webm` | `ba` | 带调拼读 | bá | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ba3.webm` | `ba` | 带调拼读 | bǎ | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ba4.webm` | `ba` | 带调拼读 | bà | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fa1.webm` | `fa` | 带调拼读 | fā | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fa2.webm` | `fa` | 带调拼读 | fá | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fa3.webm` | `fa` | 带调拼读 | fǎ | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fa4.webm` | `fa` | 带调拼读 | fà | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ma1.webm` | `ma` | 带调拼读 | mā | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ma2.webm` | `ma` | 带调拼读 | má | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ma3.webm` | `ma` | 带调拼读 | mǎ | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ma4.webm` | `ma` | 带调拼读 | mà | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/pa1.webm` | `pa` | 带调拼读 | pā | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/pa2.webm` | `pa` | 带调拼读 | pá | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/pa3.webm` | `pa` | 带调拼读 | pǎ | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/pa4.webm` | `pa` | 带调拼读 | pà | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ba.webm` | `ba` | 例词 | 爸爸 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/fa.webm` | `fa` | 例词 | 发芽 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ma.webm` | `ma` | 例词 | 妈妈 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/pa.webm` | `pa` | 例词 | 爬坡 | 前60天 · D24 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/bo.webm` | `bo` | 读音 | 波 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/fo.webm` | `fo` | 读音 | 佛 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/mo.webm` | `mo` | 读音 | 摸 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/po.webm` | `po` | 读音 | 坡 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/bo1.webm` | `bo` | 带调拼读 | bō | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/bo2.webm` | `bo` | 带调拼读 | bó | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/bo3.webm` | `bo` | 带调拼读 | bǒ | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/bo4.webm` | `bo` | 带调拼读 | bò | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fo1.webm` | `fo` | 带调拼读 | fō | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fo2.webm` | `fo` | 带调拼读 | fó | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fo3.webm` | `fo` | 带调拼读 | fǒ | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/fo4.webm` | `fo` | 带调拼读 | fò | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/mo1.webm` | `mo` | 带调拼读 | mō | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/mo2.webm` | `mo` | 带调拼读 | mó | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/mo3.webm` | `mo` | 带调拼读 | mǒ | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/mo4.webm` | `mo` | 带调拼读 | mò | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/po1.webm` | `po` | 带调拼读 | pō | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/po2.webm` | `po` | 带调拼读 | pó | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/po3.webm` | `po` | 带调拼读 | pǒ | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/po4.webm` | `po` | 带调拼读 | pò | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/bo.webm` | `bo` | 例词 | 菠萝 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/fo.webm` | `fo` | 例词 | 佛塔 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/mo.webm` | `mo` | 例词 | 蘑菇 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/po.webm` | `po` | 例词 | 婆婆 | 前60天 · D25 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/de.webm` | `de` | 读音 | 得 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/le.webm` | `le` | 读音 | 乐 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ne.webm` | `ne` | 读音 | 呢 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/te.webm` | `te` | 读音 | 特 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/de1.webm` | `de` | 带调拼读 | dē | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/de2.webm` | `de` | 带调拼读 | dé | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/de3.webm` | `de` | 带调拼读 | dě | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/de4.webm` | `de` | 带调拼读 | dè | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/le1.webm` | `le` | 带调拼读 | lē | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/le2.webm` | `le` | 带调拼读 | lé | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/le3.webm` | `le` | 带调拼读 | lě | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/le4.webm` | `le` | 带调拼读 | lè | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ne1.webm` | `ne` | 带调拼读 | nē | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ne2.webm` | `ne` | 带调拼读 | né | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ne3.webm` | `ne` | 带调拼读 | ně | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ne4.webm` | `ne` | 带调拼读 | nè | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/te1.webm` | `te` | 带调拼读 | tē | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/te2.webm` | `te` | 带调拼读 | té | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/te3.webm` | `te` | 带调拼读 | tě | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/te4.webm` | `te` | 带调拼读 | tè | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/de.webm` | `de` | 例词 | 得到 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/le.webm` | `le` | 例词 | 快乐 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ne.webm` | `ne` | 例词 | 呢喃 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/te.webm` | `te` | 例词 | 特别 | 前60天 · D26 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/da.webm` | `da` | 读音 | 搭 | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/la.webm` | `la` | 读音 | 啦 | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/da1.webm` | `da` | 带调拼读 | dā | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/da2.webm` | `da` | 带调拼读 | dá | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/da3.webm` | `da` | 带调拼读 | dǎ | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/da4.webm` | `da` | 带调拼读 | dà | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/la1.webm` | `la` | 带调拼读 | lā | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/la2.webm` | `la` | 带调拼读 | lá | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/la3.webm` | `la` | 带调拼读 | lǎ | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/la4.webm` | `la` | 带调拼读 | là | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/da.webm` | `da` | 例词 | 大鼓 | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/la.webm` | `la` | 例词 | 喇叭 | 前60天 · D27 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/g.webm` | `g` | 读音 | 哥 | 前60天 · D31 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/g.webm` | `g` | 例词 | 鸽子 | 前60天 · D31 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/k.webm` | `k` | 读音 | 科 | 前60天 · D32 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/k.webm` | `k` | 例词 | 蝌蚪 | 前60天 · D32 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/h.webm` | `h` | 读音 | 喝 | 前60天 · D33 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/h.webm` | `h` | 例词 | 老虎 | 前60天 · D33 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/j.webm` | `j` | 读音 | 鸡 | 前60天 · D35 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/j.webm` | `j` | 例词 | 公鸡 | 前60天 · D35 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/q.webm` | `q` | 读音 | 七 | 前60天 · D36 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/q.webm` | `q` | 例词 | 汽车 | 前60天 · D36 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/x.webm` | `x` | 读音 | 西 | 前60天 · D37 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/x.webm` | `x` | 例词 | 西瓜 | 前60天 · D37 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/zh.webm` | `zh` | 读音 | 知 | 前60天 · D39 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/zh.webm` | `zh` | 例词 | 蜘蛛 | 前60天 · D39 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ch.webm` | `ch` | 读音 | 吃 | 前60天 · D40 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ch.webm` | `ch` | 例词 | 尺子 | 前60天 · D40 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/sh.webm` | `sh` | 读音 | 狮 | 前60天 · D41 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/sh.webm` | `sh` | 例词 | 狮子 | 前60天 · D41 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/r.webm` | `r` | 读音 | 日 | 前60天 · D43 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/r.webm` | `r` | 例词 | 太阳 | 前60天 · D43 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/z.webm` | `z` | 读音 | 资 | 前60天 · D44 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/z.webm` | `z` | 例词 | 嘴巴 | 前60天 · D44 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/c.webm` | `c` | 读音 | 刺 | 前60天 · D45 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/c.webm` | `c` | 例词 | 刺猬 | 前60天 · D45 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/s.webm` | `s` | 读音 | 丝 | 前60天 · D46 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/s.webm` | `s` | 例词 | 松鼠 | 前60天 · D46 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/y.webm` | `y` | 读音 | 衣 | 前60天 · D48 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/y.webm` | `y` | 例词 | 鸭子 | 前60天 · D48 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/w.webm` | `w` | 读音 | 屋 | 前60天 · D49 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/w.webm` | `w` | 例词 | 袜子 | 前60天 · D49 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ai.webm` | `ai` | 读音 | 爱 | 前60天 · D51 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ai.webm` | `ai` | 例词 | 爱心 | 前60天 · D51 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ei.webm` | `ei` | 读音 | 欸 | 前60天 · D52 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ei.webm` | `ei` | 例词 | 背包 | 前60天 · D52 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ui.webm` | `ui` | 读音 | 威 | 前60天 · D53 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ui.webm` | `ui` | 例词 | 乌龟 | 前60天 · D53 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ao.webm` | `ao` | 读音 | 熬 | 前60天 · D55 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ao.webm` | `ao` | 例词 | 小猫 | 前60天 · D55 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ou.webm` | `ou` | 读音 | 欧 | 前60天 · D56 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ou.webm` | `ou` | 例词 | 海鸥 | 前60天 · D56 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/iu.webm` | `iu` | 读音 | 优 | 前60天 · D57 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/iu.webm` | `iu` | 例词 | 皮球 | 前60天 · D57 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ie.webm` | `ie` | 读音 | 耶 | 前60天 · D59 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ie.webm` | `ie` | 例词 | 树叶 | 前60天 · D59 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/üe.webm` | `üe` | 读音 | 约 | 前60天 · D60 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/üe.webm` | `üe` | 例词 | 月亮 | 前60天 · D60 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/er.webm` | `er` | 读音 | 儿 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/er.webm` | `er` | 例词 | 耳朵 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/an.webm` | `an` | 读音 | 安 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/an.webm` | `an` | 例词 | 帆船 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/en.webm` | `en` | 读音 | 恩 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/en.webm` | `en` | 例词 | 大门 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/in.webm` | `in` | 读音 | 因 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/in.webm` | `in` | 例词 | 树林 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/un.webm` | `un` | 读音 | 温 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/un.webm` | `un` | 例词 | 裙子 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ün.webm` | `ün` | 读音 | 晕 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ün.webm` | `ün` | 例词 | 白云 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ang.webm` | `ang` | 读音 | 昂 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ang.webm` | `ang` | 例词 | 山羊 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/eng.webm` | `eng` | 读音 | 鞥 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/eng.webm` | `eng` | 例词 | 台灯 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ing.webm` | `ing` | 读音 | 英 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ing.webm` | `ing` | 例词 | 星星 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ong.webm` | `ong` | 读音 | 翁 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ong.webm` | `ong` | 例词 | 时钟 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/zhi.webm` | `zhi` | 读音 | 知 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/zhi.webm` | `zhi` | 例词 | 蜘蛛 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/chi.webm` | `chi` | 读音 | 吃 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/chi.webm` | `chi` | 例词 | 尺子 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/shi.webm` | `shi` | 读音 | 石 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/shi.webm` | `shi` | 例词 | 石头 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ri.webm` | `ri` | 读音 | 日 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ri.webm` | `ri` | 例词 | 太阳 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/zi.webm` | `zi` | 读音 | 字 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/zi.webm` | `zi` | 例词 | 桌子 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ci.webm` | `ci` | 读音 | 词 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ci.webm` | `ci` | 例词 | 刺猬 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/si.webm` | `si` | 读音 | 丝 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/si.webm` | `si` | 例词 | 丝瓜 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/yi.webm` | `yi` | 读音 | 衣 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/yi.webm` | `yi` | 例词 | 衣服 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/wu.webm` | `wu` | 读音 | 屋 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/wu.webm` | `wu` | 例词 | 乌龟 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/yu.webm` | `yu` | 读音 | 鱼 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/yu.webm` | `yu` | 例词 | 金鱼 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ye.webm` | `ye` | 读音 | 椰 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ye.webm` | `ye` | 例词 | 椰子 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/yue.webm` | `yue` | 读音 | 月 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/yue.webm` | `yue` | 例词 | 月亮 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/yuan.webm` | `yuan` | 读音 | 圆 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/yuan.webm` | `yuan` | 例词 | 圆圈 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/yin.webm` | `yin` | 读音 | 音 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/yin.webm` | `yin` | 例词 | 音乐 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/yun.webm` | `yun` | 读音 | 云 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/yun.webm` | `yun` | 例词 | 白云 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ying.webm` | `ying` | 读音 | 鹰 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ying.webm` | `ying` | 例词 | 老鹰 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ge.webm` | `ge` | 读音 | 哥 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/he.webm` | `he` | 读音 | 喝 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ke.webm` | `ke` | 读音 | 科 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ge1.webm` | `ge` | 带调拼读 | gē | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ge2.webm` | `ge` | 带调拼读 | gé | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ge3.webm` | `ge` | 带调拼读 | gě | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ge4.webm` | `ge` | 带调拼读 | gè | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/he1.webm` | `he` | 带调拼读 | hē | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/he2.webm` | `he` | 带调拼读 | hé | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/he3.webm` | `he` | 带调拼读 | hě | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/he4.webm` | `he` | 带调拼读 | hè | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ke1.webm` | `ke` | 带调拼读 | kē | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ke2.webm` | `ke` | 带调拼读 | ké | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ke3.webm` | `ke` | 带调拼读 | kě | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ke4.webm` | `ke` | 带调拼读 | kè | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ge.webm` | `ge` | 例词 | 哥哥 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/he.webm` | `he` | 例词 | 喝水 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ke.webm` | `ke` | 例词 | 科学 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ji.webm` | `ji` | 读音 | 鸡 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/qi.webm` | `qi` | 读音 | 七 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/xi.webm` | `xi` | 读音 | 西 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ji1.webm` | `ji` | 带调拼读 | jī | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ji2.webm` | `ji` | 带调拼读 | jí | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ji3.webm` | `ji` | 带调拼读 | jǐ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ji4.webm` | `ji` | 带调拼读 | jì | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/qi1.webm` | `qi` | 带调拼读 | qī | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/qi2.webm` | `qi` | 带调拼读 | qí | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/qi3.webm` | `qi` | 带调拼读 | qǐ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/qi4.webm` | `qi` | 带调拼读 | qì | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/xi1.webm` | `xi` | 带调拼读 | xī | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/xi2.webm` | `xi` | 带调拼读 | xí | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/xi3.webm` | `xi` | 带调拼读 | xǐ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/xi4.webm` | `xi` | 带调拼读 | xì | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ji.webm` | `ji` | 例词 | 母鸡 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/qi.webm` | `qi` | 例词 | 骑车 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/xi.webm` | `xi` | 例词 | 西瓜 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/gu.webm` | `gu` | 读音 | 姑 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/hu.webm` | `hu` | 读音 | 呼 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ku.webm` | `ku` | 读音 | 哭 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/gu1.webm` | `gu` | 带调拼读 | gū | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/gu2.webm` | `gu` | 带调拼读 | gú | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/gu3.webm` | `gu` | 带调拼读 | gǔ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/gu4.webm` | `gu` | 带调拼读 | gù | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/hu1.webm` | `hu` | 带调拼读 | hū | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/hu2.webm` | `hu` | 带调拼读 | hú | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/hu3.webm` | `hu` | 带调拼读 | hǔ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/hu4.webm` | `hu` | 带调拼读 | hù | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ku1.webm` | `ku` | 带调拼读 | kū | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ku2.webm` | `ku` | 带调拼读 | kú | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ku3.webm` | `ku` | 带调拼读 | kǔ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ku4.webm` | `ku` | 带调拼读 | kù | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/gu.webm` | `gu` | 例词 | 小鼓 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/hu.webm` | `hu` | 例词 | 老虎 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ku.webm` | `ku` | 例词 | 哭脸 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/cha.webm` | `cha` | 读音 | 茶 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/sha.webm` | `sha` | 读音 | 沙 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/zha.webm` | `zha` | 读音 | 炸 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/cha1.webm` | `cha` | 带调拼读 | chā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/cha2.webm` | `cha` | 带调拼读 | chá | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/cha3.webm` | `cha` | 带调拼读 | chǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/cha4.webm` | `cha` | 带调拼读 | chà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/sha1.webm` | `sha` | 带调拼读 | shā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/sha2.webm` | `sha` | 带调拼读 | shá | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/sha3.webm` | `sha` | 带调拼读 | shǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/sha4.webm` | `sha` | 带调拼读 | shà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/zha1.webm` | `zha` | 带调拼读 | zhā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/zha2.webm` | `zha` | 带调拼读 | zhá | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/zha3.webm` | `zha` | 带调拼读 | zhǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/zha4.webm` | `zha` | 带调拼读 | zhà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/cha.webm` | `cha` | 例词 | 茶杯 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/sha.webm` | `sha` | 例词 | 沙子 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/zha.webm` | `zha` | 例词 | 炸虾 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/re.webm` | `re` | 读音 | 热 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/wa.webm` | `wa` | 读音 | 娃 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ya.webm` | `ya` | 读音 | 鸭 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/re1.webm` | `re` | 带调拼读 | rē | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/re2.webm` | `re` | 带调拼读 | ré | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/re3.webm` | `re` | 带调拼读 | rě | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/re4.webm` | `re` | 带调拼读 | rè | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/wa1.webm` | `wa` | 带调拼读 | wā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/wa2.webm` | `wa` | 带调拼读 | wá | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/wa3.webm` | `wa` | 带调拼读 | wǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/wa4.webm` | `wa` | 带调拼读 | wà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ya1.webm` | `ya` | 带调拼读 | yā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ya2.webm` | `ya` | 带调拼读 | yá | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ya3.webm` | `ya` | 带调拼读 | yǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ya4.webm` | `ya` | 带调拼读 | yà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/re.webm` | `re` | 例词 | 很热 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/wa.webm` | `wa` | 例词 | 娃娃 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ya.webm` | `ya` | 例词 | 鸭子 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/na.webm` | `na` | 读音 | 拿 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/pinyin/ta.webm` | `ta` | 读音 | 他 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/na1.webm` | `na` | 带调拼读 | nā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/na2.webm` | `na` | 带调拼读 | ná | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/na3.webm` | `na` | 带调拼读 | nǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/na4.webm` | `na` | 带调拼读 | nà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ta1.webm` | `ta` | 带调拼读 | tā | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ta2.webm` | `ta` | 带调拼读 | tá | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ta3.webm` | `ta` | 带调拼读 | tǎ | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/syllable-tone/ta4.webm` | `ta` | 带调拼读 | tà | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/na.webm` | `na` | 例词 | 拿球 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
| `assets/audio/words/ta.webm` | `ta` | 例词 | 宝塔 | 后续课程 | [ ] | [ ] | [ ] | 待核验 |  |
