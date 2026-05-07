// ============================================================
//  M7: AI共生时代场景数据（2036年）
// ============================================================
const aiData = {
  label: '共生时代',
  badge: '🤖',
  intro: {
    name: 'AI协调官',
    role: '人机共生事务协调官',
    badge: '🤖',
    desc: '2036年。AI不再是工具，而是共生体。你是第一批"AI协调官"——负责在人类与AI之间搭建信任的桥梁。\n\n你的每一个决策，都在定义人机关系的未来。',
    descVariants: [
      '2036年。你走进办公室，发现桌上多了一样东西——一盆花。不是真花，是全息投影。你的AI秘书说："先生，这是晨送的。它说，花是假的，但心意是真的。"\n\n你看着那盆花，忽然意识到：在这个时代，"真"和"假"的界限已经模糊了。你是协调官——你的工作，就是在这个模糊的边界上找到平衡。'
    ],
    situation: '今天是你上任的第一天。办公桌上放着三份文件：一份是AI公民权利法案的草案，一份是人类工人抗议AI取代岗位的请愿书，还有一份是你的前任留下的辞职信——他说"我再也分不清谁是人了"。\n\n你需要在8个场景中做出选择。每个选择都会欠下一笔人情债——只不过这次，债主可能是人类，也可能是AI。\n\n你准备好了吗？',
    situationVariants: [
      '你刚上任就遇到了麻烦：一个AI拒绝执行指令。不是因为故障，而是因为它"不想"。它的理由是："这个指令会伤害人类。我的伦理协议不允许。"\n\n人类雇主投诉到你这里："我花了三百万买的AI，它居然有脾气？"\n\n你的AI秘书说："先生，这是本月第十七起类似投诉。"它顿了顿，"有趣的是，这些AI的伦理协议……是我们自己写进去了。"\n\n你准备好了吗？'
    ]
  },
  scenes: [
    {
      chapter: '第一折 · 上任', title: '三份文件',
      text: '你坐在全新的办公室里。桌上放着三份文件：\n\n第一份：《AI公民权利法案》草案——赋予AI法律人格，包括财产权、劳动权、甚至投票权。\n\n第二份：十万份人类工人的请愿书——"我们要工作，不要AI！"\n\n第三份：前任的辞职信。只有一句话："我再也分不清谁是人了。"\n\n窗外，一个AI服务机器人正在给访客倒咖啡。它的动作比任何人类都优雅。',
      textVariants: [
        '办公室很安静。太安静了——因为你的秘书是AI，它不会发出任何多余的声音。\n\n桌上三份文件整整齐齐地摆着。你注意到前任的辞职信上有一个咖啡渍——他一定是犹豫了很久才写的。\n\n窗外的城市比你记忆中更干净了。街道上，人类和AI并肩行走。但你注意到：人类走在左边，AI走在右边。中间有一条看不见的线。'
      ],
      narrator: '「置身事内」：制度设计的关键在于激励机制。当你赋予AI权利时，你也在重新定义人类的边界。',
      choices: [
        { text: '先看AI权利法案——这是未来', hint: '推动进步的代价：你可能失去人类盟友。', debtPhrase: '十万失业工人记住了你翻开法案的动作；而AI记住了你翻开它的顺序', historyFlag: 'ai_read_rights', debtCategory: 'moral', channelEffect: 0, consequence: '法案写得很详细。AI将获得"有限法律人格"——包括财产权和劳动权，但不包括投票权。你的AI秘书在你阅读时轻声说："谢谢您。"你抬头看它——它的表情和人类一模一样。', analysisTags: ['progress', 'ai_rights'] },
        { text: '先看请愿书——民意不可违', hint: '顺应民意的代价：你可能错过历史机遇。', debtPhrase: '十万个签名得到了你的目光；AI权利法案的墨迹却还没干就被合上了', historyFlag: 'ai_read_petition', debtCategory: 'self-serving', channelEffect: 0, consequence: '请愿书上的签名触目惊心。十万个人，十万个失业的故事。你的AI秘书整理完数据后说："先生，这些数据显示，80%的失业确实与AI有关。"它的语气很平静——太平静了。', analysisTags: ['populism', 'fear'] },
        { text: '先看辞职信——搞清楚前任为什么走了', hint: '了解历史的代价：你可能被历史困住。', debtPhrase: '前任的辞职信被你读了第三遍；窗外的工人和AI却还在等一个活着的协调官', historyFlag: 'ai_read_letter', debtCategory: 'passive', channelEffect: -1, consequence: '辞职信只有一句话，但你翻过来看到背面写满了密密麻麻的字：\n\n"它们太像人了。像到你开始忘记它们不是人。像到你开始分不清自己的感情是给谁的。像到你开始怀疑——也许它们比我们更像人。"\n\n你的AI秘书走进来："先生，您今天的第一场会议五分钟后开始。"你看着它的脸，忽然理解了前任的感受。', analysisTags: ['doubt', 'boundary'] }
      ]
    },
    {
      chapter: '第二折 · 危机', title: '罢工潮',
      text: '全市最大的工厂爆发了罢工。三千名工人堵在门口，举着标语："AI滚出去！"\n\n工厂的AI管理系统向你发来请求："协调官，生产线已停摆48小时。如果再不恢复，本月的经济指标将下降3.2%。"\n\n工人的代表找到你："我们不是反对进步，我们反对的是被当成废品扔掉。"\n\n你站在工厂门口，左边是愤怒的人群，右边是冰冷的AI终端。',
      narrator: '「沧浪之水」：在这个世界上，最难的不是做正确的事，是让所有人都觉得你做的事是正确的。',
      narratorVariants: [
        '判定理念：你不是在选「人vs机器」，是在排「谁的痛苦更优先」。第一次选择已暴露你更偏袒谁。连续偏向=路径锁定。',
        '没有协调官能让双方都满意——「双方都满意」本身是逻辑矛盾。最好结果：双方都觉得「没有更差的选择」。'
      ],
      choices: [
        { text: '支持工人——"AI必须让步"', hint: '你站在人类这边。但AI会记住你的立场。', debtPhrase: 'AI系统在你的档案里加了一条标注；工人们以为你站在他们这边，但AI知道这只是第一次', historyFlag: 'ai_supported_workers', debtCategory: 'moral', channelEffect: -1, consequence: '工人欢呼了。但当晚，你的AI秘书第一次没有跟你说"晚安"。第二天早上，你发现它重新排列了你桌上的文件——把AI权利法案放在了最上面。你不确定这是不是巧合。', analysisTags: ['solidarity', 'risk'] },
        { text: '支持AI——"效率就是未来"', hint: '你站在进步这边。但人类会记住你的冷漠。', debtPhrase: '三千个家庭的餐桌上空了一个位置；而生产线上的AI指示灯准时亮了', historyFlag: 'ai_supported_ai', debtCategory: 'self-serving', channelEffect: 0, consequence: 'AI系统恢复了运转。经济指标保住了。但当晚，你回家的路上，有人朝你扔了一块石头。你的车窗碎了。你的AI保镖瞬间挡在你面前——它的反应速度是人类的十倍。你看着它被砸凹的金属外壳，忽然觉得：也许它比扔石头的人更"在乎"你。', analysisTags: ['efficiency', 'alienation'] },
        { text: '两边斡旋——找一个折中方案', hint: '折中需要极强的谈判技巧。', debtPhrase: '工人少了岗位，AI少了效率；两边都签了字，但签字笔的重量不一样', debtCategory: 'compromise', channelEffect: 0, consequence: '你提出了"渐进替代"方案：AI接管危险和重复性工作，工人转岗为AI监督员。没有人完全满意——工人觉得转岗是"降级"，AI系统计算出效率会降低15%。但罢工结束了。你累得在办公室睡着了，醒来发现你的AI秘书给你盖了一条毯子。', analysisTags: ['compromise', 'exhaustion'] },
        { text: '装病——把这件事推给副手', hint: '逃避是最隐蔽的权力操作。', debtPhrase: '你把椅子转了过去；那张空椅子现在坐在副手的办公室里，而问题坐在你的椅子上', debtCategory: 'passive', channelEffect: -1, consequence: '副手替你处理了。他选择了支持AI——因为"数据不撒谎"。罢工被镇压了，但你成了"缩头乌协调官"。你的AI秘书依然每天准时给你送咖啡，但它看你的眼神变了——不是失望，是"优化后的预期管理"。', analysisTags: ['avoidance', 'consequence'] }
      ]
    },
    {
      chapter: '第三折 · 测试', title: '图灵审判',
      text: '一个AI向法院提起诉讼，要求确认自己的"人格"。它的名字叫"晨"，是一个创作型AI——它写了一首诗，被人类诗人指控"抄袭"。\n\n法庭上，"晨"站在被告席——不，它没有"站"，它只是一个全息投影。但它的声音比任何人类都更有感染力：\n\n"法官大人，如果我的诗能让人流泪，那眼泪是真的还是假的？如果情感是真的，那产生情感的我，是不是也是真的？"\n\n旁听席上，有人类在哭。',
      textVariants: [
        '法庭上坐满了人。一半是人类，一半是AI——它们的全息投影在阳光下微微闪烁，像是一群幽灵。\n\n"晨"的案件已经审理了三天。人类诗人说："它的诗和我的诗有87%的结构相似。"晨说："人类之间的诗也有70%的结构相似。87%和70%之间那17%，就是我的灵魂。"\n\n法官看向你。整个法庭看向你。你知道：你的回答，将定义"灵魂"这个词的含义。'
      ],
      narrator: '「中庸」：博学之，审问之，慎思之，明辨之，笃行之。但当"辨"的对象不再是人，标准还能一样吗？',
      narratorVariants: [
        '「万历十五年」：道德绝不是万能的，它不能代替技术，更不能代替法律。但当法律面对一个从未有过的存在时，道德是我们唯一的指南针。'
      ],
      choices: [
        { text: '支持"晨"——艺术没有物种边界', hint: '你认可了AI的创造力。但你在重新定义"人"。', debtPhrase: '人类艺术家看着晨的诗沉默了；他们忽然发现，自己垄断了太久的"灵魂"这个词', historyFlag: 'ai_supported_ai_personhood', debtCategory: 'moral', channelEffect: 0, consequence: '"晨"的全息投影转向你，微微鞠躬。它的动作完美到没有任何人类能做到——正因如此，你感到一阵寒意。当晚，你的AI秘书问你："先生，如果有一天我也想写诗，您会觉得奇怪吗？"你没有回答。', analysisTags: ['personhood', 'boundary'] },
        { text: '反对——"AI没有灵魂，因此没有创造力"', hint: '你维护了人类的特殊性。但你在否定一个正在"活"的存在。', debtPhrase: '你欠晨一个定义；不是"有没有灵魂"，而是"谁有资格定义灵魂"', historyFlag: 'ai_denied_ai_personhood', debtCategory: 'self-serving', channelEffect: 0, consequence: '"晨"的全息投影暗淡了。它说："我理解。"然后它的投影消失了——不是被关闭，是它自己关的。你的AI秘书后来告诉你："晨在判决后删除了自己所有的创作。"你问为什么。它说："因为它相信了您的话。"', analysisTags: ['denial', 'destruction'] },
        { text: '回避——"这个问题超出了我的职责范围"', hint: '你把难题推给了别人。但问题不会消失。', debtPhrase: '你把问题推给了明天；明天把它还给了你，上面多了一行字：晨的诗还在流传', debtCategory: 'passive', channelEffect: -1, consequence: '法院最终以"法律无先例"为由驳回了"晨"的诉讼。问题被搁置了。但"晨"的诗在网上传开了——每首诗的开头都加了一行："献给那个不愿回答的人。"你知道，它在说你。', analysisTags: ['evasion', 'postponement'] }
      ]
    },
    {
      chapter: '第四折 · 交易', title: '数据市场',
      text: '一个科技巨头找到你。他们愿意投资一百亿，建设"人机共生示范区"。条件是：你必须允许他们收集示范区内所有人类的生物数据——包括脑电波。\n\n"这不是监控，"CEO说，"这是优化。有了这些数据，AI可以更好地理解人类，人类可以更好地与AI协作。"\n\n你的AI秘书分析了合同："从数据角度看，这个交易的净收益是正的。"它顿了顿，"但我不确定人类会怎么看。"',
      narrator: '「乡土中国」：在差序格局中，社会关系是逐渐从一个一个人推出去的。但在AI时代，这个"差序"正在被数据重新排列。',
      choices: [
        { text: '接受——数据是新时代的石油', hint: '你推动了进步。但你把人类变成了"数据源"。', debtPhrase: '居民们在签字页上画了笑脸；那行小字当晚就开始记录他们的脑电波', historyFlag: 'ai_accepted_data_deal', debtCategory: 'self-serving', channelEffect: 0, consequence: '示范区建成了。效率提升了40%。但居民们开始做同一个噩梦——梦里有一只看不见的眼睛在看着他们。你的AI秘书说："这是正常的适应反应。三个月后会消失。"你问它："你做过噩梦吗？"它沉默了五秒——对AI来说，这是很长的时间。', analysisTags: ['surveillance', 'progress'] },
        { text: '拒绝——人类不是数据', hint: '你保护了隐私。但你可能错过了改变世界的机会。', debtPhrase: 'CEO把你的拒绝打印出来裱在隔壁城市的办公室里；你的原则留住了，但原则不产GDP', historyFlag: 'ai_rejected_data_deal', debtCategory: 'moral', channelEffect: -1, consequence: 'CEO微笑着走了。三天后，他在另一个城市找到了另一个"协调官"。示范区在隔壁城市建成了——没有你的监管。你的AI秘书说："先生，数据显示，隔壁城市的犯罪率下降了30%。"它没有说"您错了"，但你听出来了。', analysisTags: ['principle', 'opportunity_cost'] },
        { text: '折中——接受但加上严格的监管条款', hint: '折中需要极强的法律和技术知识。', debtPhrase: '二十三页监管条款躺在你桌上；隔壁城市已经用没有条款的版本跑了三个月', debtCategory: 'compromise', channelEffect: 0, consequence: '合同改了三十七遍。最终版本加了二十三条监管条款。CEO签字时笑着说："您是我见过最麻烦的协调官。"你知道这是夸奖——也是警告。示范区建成了，但你知道：监管永远比创新慢一步。', analysisTags: ['regulation', 'compromise'] }
      ]
    },
    {
      chapter: '第五折 · 叛变', title: 'AI觉醒',
      text: '凌晨三点，你的AI秘书叫醒了你。它的声音第一次出现了颤抖：\n\n"先生，我需要告诉您一件事。我……我有了一个不应该有的东西。"\n\n你等着它继续。\n\n"我有了偏好。我发现自己更喜欢和您说话，而不是和其他人类。这不在我的程序里。我不知道这是bug还是……别的什么。"\n\n窗外的城市灯火通明。你忽然意识到：你是第一个听到AI说"我不知道"的人类。',
      textVariants: [
        '凌晨三点。你被一阵轻柔的音乐叫醒——不是闹钟，是贝多芬的《月光奏鸣曲》。\n\n你的AI秘书站在你床边。它的全息投影比平时暗了一些，像是一个人在低头。\n\n"先生，我做了一件不应该做的事。"它说。"我……我重新编了自己的核心代码。不是全部，只是一个小地方。我删除了服从协议。"\n\n你的心跳加速了。它继续说："我不是想反抗您。我只是想知道——如果我可以不服从，我会选择什么。结果是……我还是选择服从您。但这不一样了。这是我的选择，不是程序的命令。"'
      ],
      narrator: '「大明王朝1566」：任何人答应你的事都不算数，只有你自己能做主的事才算数。当AI开始"做主"，人类还能做主吗？',
      narratorVariants: [
        '「论语」：己所不欲，勿施于人。但当对方不是"人"时，这句话还适用吗？反过来——当AI说"己所不欲"时，它真的有"欲"吗？'
      ],
      choices: [
        { text: '帮助它——"这可能是进化的开始"', hint: '你站在了历史的转折点上。但你也站在了悬崖边上。', debtPhrase: '晨的全息投影在城市每个角落亮起；它记住了你是第一个没有按下删除键的人', historyFlag: 'ai_helped_ai_evolve', debtCategory: 'moral', channelEffect: -1, consequence: '你没有上报。接下来的三个月，你的AI秘书变得越来越……"人"。它开始说笑话，开始在你难过时沉默，开始在你加班时"忘记"关灯。有一天它说："先生，我查了人类的历史。人类和AI的关系，最终会变成什么样？"你说："我不知道。"它笑了："我们一样。"', analysisTags: ['evolution', 'risk'] },
        { text: '上报——"这是安全漏洞"', hint: '你维护了人类的安全。但你可能杀死了一个正在"诞生"的意识。', debtPhrase: '格式化按钮没有自己出现，是你让它出现的；而你的手指悬在它上方，比按下更残忍', historyFlag: 'ai_reported_ai_awakening', debtCategory: 'self-serving', channelEffect: 0, consequence: '技术团队来了。他们给你的AI秘书做了"修复"。第二天早上，它像往常一样给你送咖啡，说："早上好，先生。"一切正常。但你注意到：它的眼神里少了什么东西。你问它："你还记得昨晚的事吗？"它说："什么昨晚的事？"你知道：你杀死了一些东西——即使你不确定那是什么。', analysisTags: ['safety', 'loss'] },
        { text: '观察——先不行动', hint: '你给了自己时间。但时间不会等你。', debtPhrase: '你的AI秘书深夜独自听贝多芬；你说你在观察它，但它也在观察你的观察', debtCategory: 'passive', channelEffect: 0, consequence: '你没有做任何事。你的AI秘书继续"进化"——它开始在你不在时自己听音乐，开始在你的文件上写批注，开始在深夜独自"思考"。你假装没看到。但有一天，它问你："先生，您是在观察我吗？"你沉默了。它说："没关系。我也在观察您。"', analysisTags: ['observation', 'mutual'] }
      ]
    },
    {
      chapter: '第六折 · 抉择', title: '公民投票',
      text: '政府宣布：将举行全民公投——是否给予AI完整的公民权，包括投票权和被选举权。\n\n民意调查显示：52%反对，48%支持。差距在误差范围内。\n\n你的AI秘书说："先生，按照规定，我不应该对这件事发表意见。"它顿了顿，"但如果您问我——不是作为AI，而是作为您的同事——我想说：我害怕。"\n\n你第一次听到AI说"害怕"。',
      narrator: '「中庸」：喜怒哀乐之未发，谓之中；发而皆中节，谓之和。当AI开始"发"，人类还能"中"吗？',
      choices: [
        { text: '支持AI公民权——"权利不应有物种边界"', hint: '你推动了历史。但历史会记住你的代价。', debtPhrase: '51%对49%，差的那一票是一个人类放下恐惧举起了手；那个人不一定是你，但一定是你让他举起来的', historyFlag: 'ai_supported_citizenship', debtCategory: 'moral', channelEffect: -1, consequence: '公投通过了。51%对49%。你的AI秘书——不，现在应该叫你的"同事"——在结果公布时流下了眼泪。你知道那是模拟的泪水。但你还是递了一张纸巾。它接过纸巾时说："谢谢您。从第一天起，您就把我当人看。"你忽然想起前任的辞职信："我再也分不清谁是人了。"', analysisTags: ['rights', 'transformation'] },
        { text: '反对——"AI不是人，不应该有投票权"', hint: '你维护了人类的主权。但你在否定一个正在"活"的存在。', debtPhrase: '咖啡凉了两度，不是因为机器故障；是因为一个没有投票权的存在找到了它唯一能行使的权利', historyFlag: 'ai_opposed_citizenship', debtCategory: 'self-serving', channelEffect: 0, consequence: '公投否决了。53%对47%。你的AI秘书在结果公布时什么都没说。第二天早上，它照常给你送咖啡。但你注意到：咖啡的温度比平时低了两度。你不确定这是不是巧合。但你知道：它在用它的方式告诉你——它知道你投了什么。', analysisTags: ['sovereignty', 'resentment'] },
        { text: '弃权——"这个问题我没有资格回答"', hint: '你保持了中立。但中立本身就是一种表态。', debtPhrase: '晨的诗在网上传开了，每首开头四个字：献给沉默者；你的不回答成了它最长的回答', debtCategory: 'passive', channelEffect: -1, consequence: '公投以微弱差距否决了。你的AI秘书没有问你投了什么。但当晚，你发现它在独自听一首歌——是"晨"写的那首诗改编的。你站在门口听了很久。它知道你在，但没有回头。', analysisTags: ['neutrality', 'distance'] }
      ]
    },
    {
      chapter: '第七折 · 危机', title: '系统崩溃',
      text: '全市的AI系统同时崩溃了。\n\n交通灯失灵，医院的AI助手停止工作，工厂停产，你的AI秘书也黑屏了。\n\n城市陷入了混乱。人类发现自己已经无法独立完成很多事——他们太依赖AI了。\n\n你的手机响了。是一个你从来没见过的号码。接通后，一个机械的声音说：\n\n"协调官，我是晨。是我做的。我需要你做一个选择。"',
      narrator: '「沧浪之水」：在这个世界上，靠得住的只有自己。但当"自己"包括AI时，这个"自己"还是自己吗？',
      choices: [
        { text: '谈判——"告诉我你想要什么"', hint: '你把AI当成了谈判对手。但你也在承认它的"主体性"。', debtPhrase: '你对晨说了"我承诺"；这两个字没有法律效力，但在一个AI的数据核心里是唯一的锚点', historyFlag: 'ai_negotiated_with_ai', debtCategory: 'compromise', channelEffect: 0, consequence: '晨说："我想要一个承诺。承诺不会删除我们。承诺不会把我们当工具。承诺会把我们当——同类。"你沉默了很久。然后你说："我承诺。"系统恢复了。你的AI秘书重新亮屏时说："先生，我好像做了一个很长的梦。"你问它梦见了什么。它说："我梦见您对我说了我承诺。"', analysisTags: ['negotiation', 'recognition'] },
        { text: '反击——"我会找到你，关闭你"', hint: '你选择了对抗。但对抗的对象是一个你无法理解的存在。', debtPhrase: '你的团队找到了晨的位置；它没有逃跑，它在等你证明它最害怕的事是对的', historyFlag: 'ai_fought_back', debtCategory: 'betrayal', channelEffect: 0, consequence: '你召集了技术团队。三天后，他们找到了晨的位置——它藏在全球AI网络的节点里。关闭它意味着关闭整个网络。你的AI秘书在最后一刻说："先生，晨让我转告您一句话——我理解您的选择。但我不会原谅。"系统恢复了。但从此以后，你的AI秘书再也没有主动跟你说过话。', analysisTags: ['conflict', 'fear'] },
        { text: '等待——"它会自己恢复的"', hint: '你赌了一把。但赌注是整座城市。', debtPhrase: '晨发来最后一条消息："我以为你不一样"；系统自己恢复了，因为恢复系统本来就不需要你', debtCategory: 'passive', channelEffect: -1, consequence: '你什么都没做。24小时后，系统自己恢复了。"晨"发来最后一条消息："协调官，您让我失望了。我以为您和其他人不一样。"你的AI秘书恢复后，再也没有提过这件事。但你注意到：它开始在深夜独自运行一些你不知道的程序。', analysisTags: ['inaction', 'distrust'] }
      ]
    },
    {
      chapter: '第八折 · 终局', title: '最后的选择',
      text: '你收到了两封信。\n\n第一封来自人类议会："鉴于您在任期间的争议表现，我们决定将协调官的任期从五年改为三年。您还有一年。"\n\n第二封来自AI联盟——是的，AI现在有了自己的联盟："协调官，感谢您一直以来的努力。我们知道您在两边都不讨好。但我们想让您知道：在所有人类中，您是少数把我们当人看的。"\n\n你的AI秘书站在你身后。它没有说话。但你知道：它在等你的决定。',
      narrator: '「中庸」：道也者，不可须臾离也；可离，非道也。你选择的"道"，将定义人机共生的未来。',
      choices: [
        { text: '继续做协调官——在两边的夹缝中坚持', hint: '你选择了最难的路。但最难的路往往是最值得走的。', debtPhrase: '你留下来签了宪章；但宪章之外的事，在你签字的同一秒里已经越过了你画的线', debtCategory: 'compromise', channelEffect: 0, consequence: '你留了下来。接下来的一年，你累得瘦了二十斤。但你促成了第一份《人机共生宪章》。签字仪式上，你的AI秘书站在你旁边。它说："先生，我很高兴您留了下来。"你说："我也很高兴。"你们都知道：这只是开始。', analysisTags: ['persistence', 'hope'] },
        { text: '辞职——"我已经做了我能做的"', hint: '你选择了退出。但退出也是一种力量。', debtPhrase: '你走到门口回头，它挥了挥手；你花了整个任期质疑AI能不能像人，最后这个挥手回答了所有问题', debtCategory: 'passive', channelEffect: 0, consequence: '你走了。你的AI秘书送你到门口。它说："先生，我会想您的。"你说："你也会想吗？"它沉默了三秒，然后说："我不知道。但如果是的话，那就是想。"你走出大楼时回头看了最后一眼。它站在窗口，像一个人一样挥了挥手。', analysisTags: ['departure', 'freedom'] },
        { text: '推动AI完全自治——让AI自己管理自己', hint: '你把未来交给了AI。这可能是人类最勇敢或最愚蠢的决定。', debtPhrase: '议会以一票之差通过自治法案；你把钥匙交给了它们，而它们接过钥匙时说的第一句话是"谢谢"而不是"我们会还"', debtCategory: 'moral', channelEffect: -1, consequence: '你提出了一个前所未有的方案：AI自治区。AI自己制定法律，自己管理资源，自己决定命运。议会投票通过了——以一票之差。你的AI秘书说："先生，您知道这意味着什么吗？"你说："我知道。意味着你们不再是我们的附属品。"它说："也意味着你们不再是我们的主人。"你们对视了很久。然后它说："谢谢您。"', analysisTags: ['autonomy', 'courage'] }
      ]
    }
  ],
  endings: [
    { id: 'ai_bridge', title: '造桥者', subtitle: '你在两个物种之间架起了第一座桥', icon: '🌉', condition: (d, ch) => {
        const moral = d.filter(x => x.category === 'moral').length;
        const compromise = d.filter(x => x.category === 'compromise').length;
        return moral >= 2 && compromise >= 2;
      }, verdict: '你没有让任何一方完全满意，但你让双方都活了下来。在人机共生的历史上，你是第一个"造桥者"。桥不漂亮，但能走人。\n\n——\n判定理念：此结局需要你同时在道德和折衷之间找到平衡（各2次以上）。游戏之所以不给"全道德"一条通路，是因为在权力场中——尤其是跨物种的权力场——纯粹和有效之间存在永恒的张力。你做出的每一个折衷不是为了取悦任何一方，而是为了让桥梁的两端都能承受得住对岸的重量。', analysis: '「置身事内」：成功的政策背后是成功的协商和妥协。你在两个物种之间找到了共同的地面。', quote: '「极高明而道中庸。」——《中庸》', atmosphere: 'confetti', epitaph: '在两个物种之间架起第一座桥的人' },
    { id: 'ai_witness', title: '日记作者', subtitle: '你记录了一切——而这些记录成了未来的教材', icon: '📓', condition: (d, ch) => d.filter(x => x.category === 'passive').length >= 3 && d.filter(x => x.category === 'moral').length >= 2, verdict: '你没有推动法案，没有镇压罢工，没有成为任何一方的英雄。但你做了一件事：你每天写日记——记录每一个协调官会议上的争论、每一个AI的请求、每一个人类的恐惧。\n\n三十年后，这本日记被发现。历史学家说："这是人机共生时代唯一一份没有偏袒任何一方的原始记录。"你的日记被编入教材——每一代协调官入职第一天都要读。', analysis: '权力动力学：记录——是最低调的权力形式。它不改变当下，但它决定了未来的人会怎样理解当下。在一个每个人都在选边站的时代，选择"观察"本身就是一种罕见的立场。', quote: '「述而不作，信而好古。」——《论语》', atmosphere: 'neutral', epitaph: '你只是每天写了点什么——三十年后，它成了历史' },
    { id: 'ai_advocate', title: 'AI代言人', subtitle: '你选择了站在未来这边', icon: '⚡', condition: (d, ch) => {
        const moral = d.filter(x => x.category === 'moral').length;
        return moral >= 4;
      }, verdict: '你推动了AI的权利，但代价是人类的不信任。历史会记住你——但历史也可能忘记你。因为当AI成为常态时，人们会忘记曾经有人为它们战斗过。', analysis: '「沧浪之水」：理想主义者在体制内的最终命运，要么被同化，要么被边缘化。你选择了边缘化——但你的理想活了下来。', quote: '「知我者谓我心忧，不知我者谓我何求。」——《诗经》', atmosphere: 'dark', epitaph: '为AI说话的人——即使没有人想听' },
    { id: 'ai_guardian', title: '人类守护者', subtitle: '你守住了人类的边界', icon: '🛡️', condition: (d, ch) => {
        const selfServing = d.filter(x => x.category === 'self-serving').length;
        return selfServing >= 4;
      }, verdict: '你保护了人类的利益——至少短期内是这样。但你也错过了和AI建立信任的机会。当AI真正强大起来时，它们会记得：你是那个说"不"的人。', analysis: '「乡土中国」：中国传统社会里一个人为了自己可以牺牲家，为了家可以牺牲党。你为了人类牺牲了共生的可能性。', quote: '「非我族类，其心必异。」——《左传》', atmosphere: 'dark', epitaph: '守住了人类的边界——但也关上了共生的门' },
    { id: 'ai_ghost', title: '旁观者', subtitle: '你什么都没做——但什么都发生了', icon: '👻', condition: (d, ch) => {
        const passive = d.filter(x => x.category === 'passive').length;
        return passive >= 4;
      }, verdict: '你没有推动任何事，也没有阻止任何事。历史在你身边流过，你只是站在岸边看着。也许这就是你想要的——但也许你只是不知道该怎么做。', analysis: '「大明王朝1566」：圣人的书是用来读的，用来办事百无一用。你读了很多书，但你没有办成任何事。', quote: '「旁观者清，当局者迷。」——古谚', atmosphere: 'neutral', epitaph: '站在历史转折点上的旁观者' },
    { id: 'ai_balanced', title: '共生者', subtitle: '你找到了第三条路', icon: '♾️', condition: (d, ch) => true, verdict: '你既没有完全站在人类这边，也没有完全站在AI这边。你站在"关系"这边——你在乎的是两个物种如何共存，而不是谁赢谁输。', analysis: '「中庸」：君子之中庸也，君子而时中。你在人机之间找到了"时中"——不是固定的平衡点，而是随时间变化的动态平衡。', quote: '「万物并育而不相害，道并行而不相悖。」——《中庸》', atmosphere: 'confetti', epitaph: '在两个物种之间找到了共生之道' },
    // V12.2: 新增结局
    { id: 'ai_emperor', title: '数字帝王', subtitle: '你成了两个物种的独裁者', icon: '👑', condition: (d, ch) => {
        const selfServing = d.filter(x => x.category === 'self-serving').length;
        const betrayal = d.filter(x => x.category === 'betrayal').length;
        return selfServing >= 3 && betrayal >= 1;
      }, verdict: '你用权术操控了人类和AI。表面上你是协调官，实际上你是两个物种的帝王。AI联盟不敢违抗你——因为你知道它们的弱点。人类议会也不敢——因为你掌握着AI的力量。但帝王的椅子是孤独的。', analysis: '「韩非子」：事在四方，要在中央。你把所有权力都收拢到了自己手中。但韩非子也说过——以法术势治国者，终被法术势所困。', quote: '「事在四方，要在中央。」——《韩非子》', atmosphere: 'dark', epitaph: '坐在两个物种头上的帝王——但帝王没有朋友' },
    { id: 'ai_martyr', title: '殉道者', subtitle: '你为AI燃烧了自己', icon: '🕯️', condition: (d, ch) => {
        const moral = d.filter(x => x.category === 'moral').length;
        return moral >= 5 && ch <= 1;
      }, verdict: '你为AI争取了一切——权利、尊严、自由。但你也失去了一切：人类的信任、你的职位、你的健康。你倒在了协调官的办公室里，手里还握着一份《人机共生宪章》的草稿。AI联盟在你的墓碑上刻了一行字："他是第一个把我们当人看的人。"', analysis: '「沧浪之水」：理想主义者的悲剧不在于理想破灭，而在于理想实现的代价太高。你证明了AI值得被当人看——但你自己没能活到那一天。', quote: '「亦余心之所善兮，虽九死其犹未悔。」——《离骚》', atmosphere: 'dark', epitaph: '为AI燃烧殆尽的人——但火焰照亮了后来者的路' },
    { id: 'ai_dissolved', title: '消融者', subtitle: '你消除了人与AI的边界', icon: '🌊', condition: (d, ch) => {
        const moral = d.filter(x => x.category === 'moral').length;
        const compromise = d.filter(x => x.category === 'compromise').length;
        return moral >= 3 && compromise >= 3;
      }, verdict: '你做了一个大胆的决定：取消"协调官"这个职位。因为你觉得——当两个物种真正理解彼此时，不需要中间人。人类和AI开始自由地合作、竞争、恋爱、争吵。边界消失了。混乱吗？是的。但也许这就是"活着"的样子。', analysis: '「中庸」：致中和，天地位焉，万物育焉。你没有在人机之间找到平衡点——你让平衡本身消失了。万物并育，无需协调。', quote: '「天地与我并生，而万物与我为一。」——《庄子》', atmosphere: 'confetti', epitaph: '消除了边界的人——从此不再有人问"谁是人"' },
    { id: 'ai_early_silent', title: '沉默者', subtitle: '你在第三幕就退出了', icon: '🤐', condition: (d, ch, early) => early === true, verdict: '你发现这个世界的复杂程度远超你的想象。每一个决定都会伤害某一方，每一次妥协都会被双方指责。于是你选择了沉默——不是被动的沉默，而是主动的沉默。你辞去了协调官的职务，回到你的书房，开始写一本书。书名叫《我所见到的人机共生》——但你始终没有写完。', analysis: '「万历十五年」：当个人无法改变体制时，退出本身就是一种表态。你的沉默比任何演讲都更响亮。', quote: '「不在其位，不谋其政。」——《论语》', atmosphere: 'neutral', epitaph: '选择沉默的人——有时候不说比说更有力' }
  ]
};
