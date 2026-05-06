// ============================================================
//  M4: 白宫场景数据
// ============================================================
const whitehouseData = {
  label: '白宫的一天',
  badge: '🏛️',
  intro: {
    name: '白宫幕僚',
    role: '总统核心幕僚',
    badge: '🏛️',
    desc: '你是总统最信任的核心幕僚之一。在这个位置上，你每天面对的不是"对与错"，而是"哪个代价更小"。\n\n你的每一个建议都可能改变历史——也可能毁掉你自己。',
    situation: '今天是关键的一天：晨间简报有紧急情报，内阁会议将爆发争吵，媒体手里有一段可能毁掉一切的录音。\n\n你需要在24小时内做出8个决定。每个决定都会欠下一笔人情债。\n\n你准备好了吗？'
  },
  scenes: [
    {
      chapter: '第一章 · 清晨',
      title: '总统每日简报',
      text: '清晨6:15，你被叫醒。CIA局长亲自送来每日简报：一份关于对手阵营正在秘密接触军方高层的情报，另一份是昨晚推文引发的外交风波。\n\n你的幕僚长站在门口，欲言又止。桌上咖啡已经凉了。',
      textVariants: [
        '清晨5:50，你被加密电话吵醒。CIA局长的声音比平时低了半个调："长官，有两个坏消息，您想先听哪个？"\n\n窗外天还没亮，但华盛顿已经醒了。',
        '清晨6:30，你在健身房的跑步机上接到CIA局长的电话。他说："长官，昨晚发生了一些事。我需要当面汇报。"\n\n你的特勤局保镖看了一眼你的表情，默默关上了跑步机。'
      ],
      narrator: '「权力的本质不是发号施令，而是让别人心甘情愿地替你挡子弹。」——《白宫幕僚》',
      choices: [
        {
          text: '先处理推文风波——民意是根基，不能让它发酵',
          hint: '民意是即时的，情报是潜在的——但潜在的危险一旦爆发，比热搜更致命。',
          bookQuote: '选这个？《乡土中国》：面子是社会交往中最微妙的武器。在西方，面子叫 approval rating。',
          debtPhrase: '你让情报长等了三小时——军方记住了你的优先级',
          historyFlag: 'wh_chose_public_op',
          debtCategory: 'compromise',
          channelEffect: 0,
          consequence: '你发了一条澄清推文，支持率回升。但情报被搁置，军方接触对手的消息在下午才被你看到——已经晚了三小时。幕僚长在走廊里叹了口气。',
          analysisTags: ['public_op', 'short_term']
        },
        {
          text: '优先处理军方情报——危机要扼杀在摇篮里',
          hint: '情报安全是底线，但热搜失控的支持率跌幅可能比军方威胁更快到来。',
          bookQuote: '选这个？《权力的道路》：真正的权力博弈发生在公众视线之外。',
          debtPhrase: '你欠新闻发言人一次完美的危机公关',
          debtCategory: 'self-serving',
          channelEffect: 0,
          consequence: '你迅速介入，军方高层被约谈。但推文风波发酵成热搜，#总统失言# 阅读量破十亿。你的支持率跌了三个点。新闻发言人在直播间被追问到满头大汗。',
          analysisTags: ['security', 'long_term']
        },
        {
          text: '交给幕僚长处理——"两件事你都安排，给我一个方案"',
          bookQuote: '选这个？《置身事内》：领导者最重要的能力不是决策，是让制度运转。',
          debtPhrase: '你欠幕僚长一个不会再透支他的承诺',
          historyFlag: 'wh_delegated',
          debtCategory: 'passive',
          channelEffect: -1,
          consequence: '幕僚长眼底闪过一丝疲惫，但还是转身去安排了。下午他交来两份方案——都算不上完美，但至少没有出大乱子。只是，你的消息渠道少了一条——他开始自己筛选信息再给你。',
          analysisTags: ['delegate', 'trust_cost']
        }
      ]
    },
    {
      chapter: '第二章 · 上午',
      title: '内阁会议',
      text: '国防部长和财政部长在会议上吵起来了。国防部长要求增加军费，财政部长说赤字已经到红线。\n\n两个人都在等你表态。更微妙的是——国防部长是你的铁杆盟友，财政部长背后站着华尔街。',
      textVariants: [
        '内阁会议室的空气凝固了。国防部长拍了桌子，财政部长冷笑。两个人都觉得自己是对的，两个人都需要你站队。\n\n你知道，无论你支持谁，另一边都会成为你的敌人。',
        '会议开了四十分钟，两个人已经从"讨论"变成了"争吵"。国防部长说"没有军费就没有安全"，财政部长说"没有经济就没有一切"。\n\n所有人的目光都落在你身上。你忽然想起一句话：在体制内，最难的不是做事，是摆平做事的人。'
      ],
      narrator: '「沧浪之水」：在体制内，最难的不是做事，是摆平做事的人。',
      choices: [
        {
          text: '支持国防部长——忠诚是政治的第一货币',
          hint: '军方的忠诚比华尔街的钱更难买到——但没有钱，你连选举都过不了。',
          bookQuote: '选这个？《白宫幕僚》：失去军方信任的总统，就像失去枪的将军。',
          debtPhrase: '华尔街给你的竞选经理打了一个电话',
          debtCategory: 'self-serving',
          channelEffect: 0,
          consequence: '国防部长感激涕零。但当晚，三家投行下调了美国信用展望。财政部长开始私下接触你的对手。',
          analysisTags: ['loyalty', 'power_base']
        },
        {
          text: '支持财政部长——经济才是连任的关键',
          bookQuote: '选这个？《置身事内》：经济议题是所有政治博弈的底层逻辑。',
          debtPhrase: '国防部长在记者会上意味深长地说："总统有总统的考量"',
          debtCategory: 'compromise',
          channelEffect: -1,
          consequence: '华尔街很满意，股市应声上涨。但你的安全简报开始"迟到"——军方不再把你当自己人。',
          analysisTags: ['pragmatic', 'military_trust']
        },
        {
          text: '沉默十秒，然后说："我听完了。下一个议题。"',
          hint: '沉默是最昂贵的表态——它同时得罪了所有人。',
          bookQuote: '选这个？《权力的道路》：不表态本身就是最强的表态。让所有人猜，你就永远掌握主动。',
          debtPhrase: '你让两个部长都在会后疯狂打听你的立场',
          historyFlag: 'wh_silent_cabinet',
          debtCategory: 'passive',
          channelEffect: -1,
          consequence: '整个会议室陷入诡异的安静。当晚，两边都派人来"汇报工作"——实际上是在试探你。但你的沉默也让你失去了一个关键信息源：国防部长不再主动分享军事情报，财政部长开始绕过你直接和国会沟通。你发现，"让所有人猜"的代价是"没有人告诉你真相"。',
          analysisTags: ['strategic', 'uncertainty']
        },
        {
          text: '"你们两个都别吵了，下周给我一份联合方案"',
          hint: '拖延不会让问题消失，只会让炸弹的引信更短。',
          bookQuote: '选这个？《沧浪之水》：拖延是一种被严重低估的政治智慧。',
          debtPhrase: '你欠两个部长一个明确的答案——只是延期支付',
          debtCategory: 'passive',
          channelEffect: -1,
          consequence: '两个人都不满意，但也没撕破脸。下周的联合方案是一纸空文——两个部门各写各的。更糟的是，你的拖延被媒体解读为"总统优柔寡断"。一条评论被转发了十万次："连内阁吵架都摆不平，怎么治理国家？"你的幕僚长开始在走廊里叹气。',
          analysisTags: ['avoidance', 'delay']
        }
      ]
    },
    {
      chapter: '第三章 · 午后',
      title: '媒体风暴',
      text: 'CNN爆出一段你三年前私下谈话的录音。你说了一句"那些选民根本不知道什么对他们好"。\n\n这段话在断章取义后，变成了"总统蔑视选民"。你的新闻发言人在直播间被追问到满头大汗。\n\n你的手机响了——是你的女儿。',
      textVariants: [
        '你正在办公室看文件，新闻秘书冲进来："长官，CNN放了一段录音。"\n\n你听了三遍才认出那是自己的声音。三年前的一次私人晚宴，你以为没人录音。你错了。\n\n推特上，#总统蔑视选民# 已经是热搜第一。你的女儿发来短信："爸，你还好吗？"',
        '凌晨两点，你的手机响了。是新闻秘书："长官，出事了。"\n\nCNN拿到了一段你三年前的录音。你说的原话是"选民不知道什么对他们好"，被剪成了"选民不知道什么"。上下文完全消失了。\n\n你的发言人在直播间被追问了四十分钟。他开始出汗了。'
      ],
      narrator: '「权力的道路」：公众人物的每一句话都是武器，包括你说过的和别人说你说过的。',
      choices: [
        {
          text: '亲自开发布会："我说的是实话，但我理解你们的愤怒"',
          bookQuote: '选这个？《沧浪之水》：真话的代价很高，但谎言的代价更高。',
          debtPhrase: '你欠自己一个不需要失眠的夜晚',
          debtCategory: 'moral',
          channelEffect: 0,
          consequence: '你的坦诚引发两极化讨论。支持者更支持，反对者更反对。但"敢说真话"成了你的新标签。压力值爆表——你开始失眠。',
          analysisTags: ['authenticity', 'polarization']
        },
        {
          text: '让发言人否认："录音经过剪辑，不代表原意"',
          bookQuote: '选这个？《白宫幕僚》：永远不要在可以被证伪的事情上撒谎。',
          debtPhrase: '你欠真相一个道歉——它迟早会找上门',
          debtCategory: 'betrayal',
          channelEffect: -1,
          consequence: '声明发出去了。但第二天，完整录音被放出。你失去了最后一个"诚实"的标签。三名高级幕僚提交了辞呈。你的消息渠道断了三条。',
          analysisTags: ['deception', 'risk']
        },
        {
          text: '不回应，让时间冲淡一切',
          bookQuote: '选这个？《乡土中国》：在乡土社会，"等等看"是最常见的冲突应对方式。',
          debtPhrase: '你的沉默被十万人转发："总统连回应的勇气都没有"',
          debtCategory: 'passive',
          channelEffect: 0,
          consequence: '三天后，另一个政客出了更大的丑闻。你的录音风波被冲淡了。但你的支持者觉得你"怂了"。',
          analysisTags: ['cold_shoulder', 'timing']
        },
        {
          text: '接女儿的电话——家人比新闻重要',
          bookQuote: '选这个？《权力的道路》：在危机中展现人性，是最被低估的政治策略。',
          debtPhrase: '你欠女儿一顿安安静静的晚饭——已经很久了',
          debtCategory: 'moral',
          channelEffect: 0,
          consequence: '女儿说："爸，你还好吗？"你突然意识到，你已经很久没和家人吃过一顿安静的晚饭了。幕僚们发现你下午关了手机——他们反而更紧张了。但当晚你重新出现时，眼神比之前更坚定了。',
          analysisTags: ['family', 'humanity']
        }
      ]
    },
    {
      chapter: '第四章 · 傍晚',
      title: '国会交易',
      text: '一项关键法案需要国会通过。反对党领袖私下找你：他可以帮你拉票，条件是在一个你反对的条款上让步。\n\n这个条款关乎三千万人的医疗保障。但没有这个法案，你的整个任期成果将化为泡影。',
      narrator: '「沧浪之水」：池大为最终明白，清高不能当饭吃，妥协才是活下去的代价。',
      choices: [
        {
          text: '接受交易——政治是可能的艺术',
          bookQuote: '选这个？《置身事内》：所有的政策背后都是利益交换。',
          debtPhrase: '三千万人会记住这笔交易——只是现在还不知道',
          debtCategory: 'betrayal',
          channelEffect: 0,
          consequence: '法案通过了。你在签署仪式上微笑，但手指微微发抖。当晚，#出卖人民#成为热搜第一。你的legacy保住了，但历史会记住这笔交易。',
          analysisTags: ['pragmatic', 'legacy']
        },
        {
          text: '拒绝——有些底线不能碰',
          bookQuote: '选这个？《沧浪之水》：坚守原则的代价是什么？池大为的答案是——被边缘化。',
          debtPhrase: '你的幕僚们说"终于做了一次对的事"——但任期还剩两年，手里已经没有牌了',
          debtCategory: 'moral',
          channelEffect: 0,
          consequence: '法案流产了。反对党领袖在电视上说你"不懂政治"。但你的核心团队对你更加忠诚。只是，你的任期还剩两年，手里已经没有牌了。',
          analysisTags: ['principled', 'cost']
        },
        {
          text: '提出折中方案：让步一半，但增加监督条款',
          bookQuote: '选这个？《沧浪之水》：折中是最现实的选择。没有人满意，但也没有人翻桌。',
          debtPhrase: '你欠反对党领袖一个人情——他让步了，你也得让',
          debtCategory: 'compromise',
          channelEffect: 0,
          consequence: '谈判进入深夜。最终双方各退一步。法案通过了，但条款被稀释得面目全非——没有人满意，但也没有人翻桌。你累得在办公室沙发上睡着了。',
          analysisTags: ['negotiate', 'compromise']
        }
      ]
    },
    {
      chapter: '第五章 · 夜晚',
      title: '幕僚背叛',
      text: '你的首席战略顾问被拍到和对手阵营的人共进晚餐。照片在社交媒体上疯传。\n\n他跟了你七年。你知道他不是叛徒——但他确实在为自己留后路。\n\n其他幕僚都在看你怎么做。',
      narrator: '「白宫幕僚」：在华盛顿，忠诚是稀缺品。每个人都在为自己打算。',
      choices: [
        {
          text: '当面质问——"我需要一个解释"',
          hint: '摊牌可能让他收手，也可能让他加速——他知道你所有的秘密。',
          bookQuote: '选这个？《白宫幕僚》：直接对抗是最危险的策略——如果他决定反击，他知道你所有的秘密。',
          debtPhrase: '你欠他七年的信任一个体面的告别——如果会告别的话',
          debtCategory: 'betrayal',
          channelEffect: 0,
          consequence: '他沉默了很久，然后说："我只是在做准备。政治没有永远的朋友。"你们都知道，这层窗户纸捅破了就再也糊不回去。其他幕僚开始在你面前表现得格外忠诚——但你知道那只是表演。',
          analysisTags: ['confrontation', 'trust']
        },
        {
          text: '装不知道——用他到最后一刻',
          hint: '隐忍需要极强的心理素质——你需要在他面前表演"一切如常"。',
          bookQuote: '选这个？《沧浪之水》：知道别人的秘密是权力，假装不知道是更大的权力。',
          debtPhrase: '你欠自己一个不需要表演"一切如常"的晚上',
          debtCategory: 'passive',
          channelEffect: 0,
          consequence: '你开始在关键决策中绕过他。他感觉到了，但不敢声张。你们维持着一种诡异的默契——直到任期结束。但你知道，你已经不再信任任何人了。',
          analysisTags: ['manipulation', 'isolation']
        },
        {
          text: '提拔他——给他更大的舞台，让他离不开你',
          bookQuote: '选这个？《权力的道路》：用利益绑定比用威胁控制更持久。',
          debtPhrase: '你给了他一把更大的椅子——也给了他一个更高的跳板',
          debtCategory: 'self-serving',
          channelEffect: 0,
          consequence: '你让他负责一个重量级项目。他受宠若惊，和对手的接触暂停了。三个月后，项目成功了——他也彻底回到了你的阵营。但你知道，你买的不是忠诚，是时间。',
          analysisTags: ['strategic', 'binding']
        },
        {
          text: '什么都不做。今天太累了。',
          hint: '疲惫本身是一种答案——但也是最昂贵的答案。你推掉的不只是决定，还有你的权威。',
          bookQuote: '选这个？《置身事内》：体制有自我修复的能力。有时候，问题会自己解决。',
          debtPhrase: '你欠自己一个答案——但你选择明天再说',
          debtCategory: 'passive',
          channelEffect: -1,
          consequence: '你关了灯，走出白宫。深夜的空气很冷。你想起了当总统之前的日子——那时候你只需要对自己负责。照片风波三天后自然平息了。但你的幕僚们发现：你开始在关键决策中缺席。他们不再第一时间找你汇报——而是先找你的副手。你的消息渠道又断了一条。',
          analysisTags: ['avoidance', 'exhaustion']
        }
      ]
    },
    {
      chapter: '第六章 · 深夜',
      title: '派系拉拢',
      text: '凌晨一点，参议院多数党领袖深夜来访。他带来一个提议：如果你愿意在最高法院大法官提名上支持他的人选，他可以保证你未来两年的所有法案畅通无阻。\n\n这个人选极端保守，会引发巨大的社会争议。但你的法案——你真正的legacy——全卡在参议院。',
      narrator: '「权力的道路」：每一次交易都有价格。问题不是要不要交易，是你愿意付出什么。',
      choices: [
        {
          text: '同意——两年畅通无阻值这个价',
          bookQuote: '选这个？《置身事内》：最高法院是终极筹码。让出它意味着放弃长期影响力来换取短期收益。',
          debtPhrase: '你欠历史一个解释——五十年后才有答案',
          debtCategory: 'betrayal',
          channelEffect: 0,
          consequence: '提名通过了。社会舆论炸了锅。但你的法案确实畅通无阻了——基建、教育、医疗改革，两年内全部落地。历史会怎么评价你？也许要五十年后才有答案。',
          analysisTags: ['trade', 'legacy']
        },
        {
          text: '拒绝——司法独立不能拿来交易',
          bookQuote: '选这个？《沧浪之水》：有原则的总统在卸任后往往获得更高的历史评价——如果他能撑过任期的话。',
          debtPhrase: '多数党领袖摔门而去——你的所有法案都被卡在参议院',
          debtCategory: 'moral',
          channelEffect: -1,
          consequence: '接下来两年，你的所有法案都被卡在参议院。你的任期成了"一事无成"的代名词。但你的幕僚们说："至少我们没有出卖灵魂。"',
          analysisTags: ['principled', 'stalemate']
        },
        {
          text: '提出替代方案：换一个温和人选',
          bookQuote: '选这个？《沧浪之水》：谈判的本质是找到双方都能接受的第三种方案。',
          debtPhrase: '你欠多数党领袖一个更大的人情——他做了真正的让步',
          debtCategory: 'compromise',
          channelEffect: 0,
          consequence: '谈判持续了三周。最终双方找到一个中间人选——不够保守，也不够自由，但至少能通过。法案通过了一半，最高法院少了一场风暴。你累得瘦了十斤。',
          analysisTags: ['negotiate', 'middle_ground']
        }
      ]
    },
    {
      chapter: '第七章 · 黎明',
      title: '危机表态',
      text: '全国爆发大规模抗议。起因是一起执法过度事件，但矛头直指你的施政方针。\n\n抗议者包围了白宫。你的安全部门建议你"低调处理"。但你的女儿发来短信："爸，你应该说点什么。"\n\n全国都在等你开口。',
      narrator: '「乡土中国」：在危机中，人们需要的不是真相，是一个可以相信的人。',
      choices: [
        {
          text: '发表全国讲话——直面问题',
          bookQuote: '选这个？《白宫幕僚》：在危机中，总统的声音是唯一的稳定器。',
          debtPhrase: '你欠自己一个不需要对镜头微笑的下午',
          debtCategory: 'moral',
          channelEffect: 0,
          consequence: '你站在镜头前，说了十五分钟。没有提词器，没有稿子。你说："我听到了你们的声音。"支持者热泪盈眶，反对者说你在"作秀"。但至少，你开口了。',
          analysisTags: ['leadership', 'authenticity']
        },
        {
          text: '让副总统出面——分散风险',
          bookQuote: '选这个？《权力的道路》：永远不要让自己成为唯一的靶子。',
          debtPhrase: '副总统的讲话效果平平——评论说："总统在哪？"',
          debtCategory: 'passive',
          channelEffect: -1,
          consequence: '副总统发表了讲话，但效果平平。你的缺席成了最大的新闻。幕僚们开始在私下讨论：总统是不是"怕了"？你的消息渠道又少了一条——副总统开始自己建立信息网络。',
          analysisTags: ['delegation', 'perception']
        },
        {
          text: '私下会见抗议代表——不在镜头前表态',
          bookQuote: '选这个？《置身事内》：真正的谈判从来不在台面上。',
          debtPhrase: '你欠五名抗议代表一个他们能对外讲述的版本',
          debtCategory: 'compromise',
          channelEffect: 0,
          consequence: '你在白宫地下室会见了五名抗议代表。会谈持续了三小时。没有达成协议，但双方都说了真心话。三天后，会谈内容被泄露了——但泄露的版本对你有利。你开始怀疑：是谁泄露的？',
          analysisTags: ['backroom', 'control']
        }
      ]
    },
    {
      chapter: '第八章 · 终局',
      title: '最后的选择',
      text: '任期进入最后一年。你面前有两条路：\n\n一是全力推动一项争议性极大的改革——成功了是 legacy，失败了是政治自杀。\n二是稳扎稳打，保住现有成果，安全落地。\n\n你的幕僚长说："总统，该做决定了。"\n\n窗外，华盛顿的灯火像棋盘。',
      narrator: '「权力的道路」：在权力的游戏中，你不当玩家，就只能当棋子。',
      choices: [
        {
          text: '全力一搏——不成功便成仁',
          bookQuote: '选这个？《权力的道路》：历史上所有伟大的政治遗产，都是在赌博中诞生的。',
          debtPhrase: '你押上了一切——瘦了十五斤，头发白了一半',
          debtCategory: 'moral',
          channelEffect: 0,
          consequence: '法案在国会鏖战了四十七天。最终——以两票之差通过了。你在签字时手在发抖。这是你的 legacy，也是你的代价。',
          analysisTags: ['gamble', 'legacy']
        },
        {
          text: '稳扎稳打——安全落地比什么都重要',
          bookQuote: '选这个？《沧浪之水》：安全是一种选择，但安全也是一种放弃。',
          debtPhrase: '你签了几项温和的行政命令——白宫和你入住时一模一样',
          debtCategory: 'passive',
          channelEffect: 0,
          consequence: '你签署了几项温和的行政命令，没有大风大浪。卸任那天，你在白宫草坪上回头看了一眼——它看起来和你入住时一模一样。你不知道该欣慰还是遗憾。',
          analysisTags: ['safe', 'regret']
        },
        {
          text: '把选择权交给选民——发起公投',
          bookQuote: '选这个？《白宫幕僚》：公投是最不可控的政治工具——你无法预测结果。',
          debtPhrase: '你把命运交给了民意——它不属于你了',
          debtCategory: 'compromise',
          channelEffect: 0,
          consequence: '公投通过了。你赢了。但你知道，这不是你的胜利——是民意的胜利。你只是那个顺水推舟的人。但有时候，顺势而为才是最大的智慧。',
          analysisTags: ['democratic', 'abdication']
        }
      ]
    }
  ],
  endings: [
    {
      id: 'wh_manipulator',
      title: '弄权者',
      subtitle: '你学会了游戏规则，也学会了代价',
      icon: '♟️',
      condition: (debts, ch) => {
        const selfServing = debts.filter(d => d.category === 'self-serving').length;
        return selfServing >= 3 && ch >= 2;
      },
      verdict: '你活了下来，而且活得不错。你学会了权力的游戏规则——不是最聪明的人赢，是最会玩的人赢。但你偶尔会想：那些被你牺牲的原则，值不值？',
      analysis: '《权力的道路》说：真正的权力高手是让所有人觉得自己赢了。你的选择路径体现了"顺势而为"的核心逻辑。',
      quote: '「权力是最好的春药，也是最好的安眠药。」——基辛格',
      atmosphere: 'confetti',
      epitaph: '手腕圆滑的弄权者'
    },
    {
      id: 'wh_trapped',
      title: '困兽',
      subtitle: '你赢了，但代价是什么？',
      icon: '🦁',
      condition: (debts, ch) => {
        const betrayal = debts.filter(d => d.category === 'betrayal').length;
        return betrayal >= 2;
      },
      verdict: '你在政治上站稳了脚跟，但代价是无尽的失眠、焦虑和孤独。你开始理解为什么历届总统卸任后都老了十岁。',
      analysis: '《沧浪之水》里池大为的结局就是如此——他得到了权力，但失去了自己。',
      quote: '「权力使人腐化，绝对权力使人绝对腐化。」——阿克顿勋爵',
      atmosphere: 'dark',
      epitaph: '被权力吞噬的困兽'
    },
    {
      id: 'wh_hermit',
      title: '隐者',
      subtitle: '你选择了退出',
      icon: '🏔️',
      condition: (debts, ch) => {
        const passive = debts.filter(d => d.category === 'passive').length;
        return passive >= 4;
      },
      verdict: '你没有成为最成功的政治家，但你可能是最幸福的。你学会了在权力的游戏中说"不"。',
      analysis: '「沧浪之水」的另一条路：不是所有人都必须在权力的漩涡中沉浮。',
      quote: '「不争，故天下莫能与之争。」——老子',
      atmosphere: 'neutral',
      epitaph: '在风暴中心选择沉默的人'
    },
    {
      id: 'wh_deaf',
      title: '聋子',
      subtitle: '你失去了所有内线',
      icon: '🔇',
      condition: (debts, ch) => ch <= 0,
      verdict: '你失去了所有消息渠道。你坐在白宫的椭圆形办公室里，但你什么都不知道。你成了聋子——一个看起来还在位，实际上已经出局的人。',
      analysis: '《置身事内》：信息是权力的血液。失去信息，就失去了一切。',
      quote: '「不知道真相的人是无知的；知道真相却假装不知道的人是卑劣的。」',
      atmosphere: 'dark',
      epitaph: '被所有人礼貌地遗忘的人'
    },
    {
      id: 'wh_martyr',
      title: '殉道者',
      subtitle: '你守住了自己，但官场没有你的位置',
      icon: '🕯️',
      condition: (debts, ch) => {
        const moral = debts.filter(d => d.category === 'moral').length;
        return moral >= 4;
      },
      verdict: '你守住了原则，但失去了改变一切的能力。你的幕僚离心，派系孤立，话语权流失。',
      analysis: '「沧浪之水」：理想主义者在体制内的最终命运，要么被同化，要么被边缘化。',
      quote: '「沧浪之水清兮，可以濯吾缨；沧浪之水浊兮，可以濯吾足。」——屈原',
      atmosphere: 'dark',
      epitaph: '守住了灵魂的殉道者'
    },
    {
      id: 'wh_balanced',
      title: '走钢丝的人',
      subtitle: '你找到了第三条路',
      icon: '⚖️',
      condition: (debts, ch) => true,
      verdict: '你既没有被同化，也没有被边缘化。你学会了在规则和原则之间找到平衡点。你不是最清的官，也不是最浊的官——但你可能是最"活"的官。',
      analysis: '「沧浪之水」：在理想和现实之间，存在第三条路——不是妥协，不是对抗，而是"在规则中寻找空间"。',
      quote: '「极高明而道中庸。」——《中庸》',
      atmosphere: 'confetti',
      epitaph: '在刀锋上跳舞的人'
    }
  ]
};
