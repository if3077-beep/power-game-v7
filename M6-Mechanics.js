// ============================================================
//  M6: 游戏机制（人情债/消息渠道/结局/奏折/身份卡/图鉴）
// ============================================================

const scenarios = { whitehouse: whitehouseData, ming: mingData };

// --- 场景专属权力动力学解读 ---
const scenePowerInsights = {
  whitehouse: {
    '总统每日简报': {
      'self-serving': '你选择了掌控信息流——这是最原始的权力形式。谁控制信息，谁就控制叙事。但记住：CIA局长记住了你的优先级排序。下次他给你的信息，可能已经被"筛选"过了。',
      'moral': '你选择了对公众负责——这是民主权力的合法性来源。但在这个房间里，"对公众负责"和"对盟友负责"往往是矛盾的。军方会记住：在你心里，民意比安全重要。',
      'compromise': '你选择了委派——这是权力的"杠杆"。幕僚长替你扛了两件事，但他也获得了"替你做决定"的权力。权力从不消失，只转移。你刚才把一部分权力转给了他。',
      'passive': '沉默本身就是一种权力操作。你没有做决定，但你让所有人都在猜你的意图。这种"战略性模糊"是高手的玩法——但前提是你真的有计划，而不是在逃避。',
      'betrayal': '你选择了出卖盟友的利益来保全自己。短期内你获得了喘息空间，但你向整个团队发出了一个信号：在这个人手下，忠诚不被保护。'
    },
    '内阁会议': {
      'self-serving': '你押注了权力基础——国防部长是你的盟友，你用一次表态巩固了联盟。但联盟的本质是交换：你给了他支持，他将来会要求你给更多。权力联盟是一张不断膨胀的账单。',
      'moral': '你试图用沉默制造权力真空——让双方都来争取你。这是经典的"鹬蚌相争"策略。但风险是：如果双方都决定绕过你直接对话，你就从"仲裁者"变成了"局外人"。',
      'compromise': '你拖延了决定——这是科层制中最常见的权力操作。拖延让你暂时避免了站队，但也消耗了你的权威。下属会开始觉得：这个人做不了决定。',
      passive: '你选择了不表态。在权力博弈中，"不表态"是最昂贵的表态——因为它同时得罪了所有人。但如果你能坚持到最后，让双方自己找到解决方案，你就成了"不可替代的最终仲裁者"。',
      betrayal: '你出卖了盟友。国防部长曾经是你的铁杆支持者，现在他会成为你最危险的敌人。在华盛顿，被背叛的盟友比天然的对手更可怕——因为他知道你所有的秘密。'
    },
    '媒体风暴': {
      'self-serving': '你选择了对抗媒体——这是一场豪赌。如果你赢了，"敢说真话"会成为你最强的政治资本。如果你输了，你将同时失去"诚实"和"能力"两个标签。',
      moral: '你选择了说真话。在权力场中，真话是最危险的武器——因为它无法撤回。但真话也是最稀缺的资源：当所有人都在说谎时，一个说真话的人会获得不成比例的信任。',
      compromise: '你选择了撒谎。这是权力场上最常见的操作——也是风险最大的。因为在这个数字化时代，任何谎言都有被证伪的可能。一旦被证伪，你失去的不只是信任，还有"撒谎的能力"本身。',
      passive: '你选择了沉默。在24小时新闻周期里，沉默的半衰期是48小时。如果你能撑过这两天，另一个丑闻会盖过你的。但你的支持者会觉得你"怂了"——沉默的代价是忠诚度的流失。',
      betrayal: '你选择了出卖真相来保护自己。真相是最无辜的受害者——它不会反击，不会起诉，不会在推特上骂你。但每一次出卖真相，你都在透支自己的"可信度账户"。'
    },
    '国会交易': {
      'self-serving': '你接受了交易——政治是可能的艺术。三千万人的医疗保障被牺牲了，但你的legacy保住了。历史会怎么评价这笔交易？也许要五十年后才有答案。但你知道：你用别人的痛苦换了自己的功绩。',
      moral: '你拒绝了交易——坚守底线的代价是什么？你的法案流产了，你的任期成了"一事无成"的代名词。但你的核心团队说："终于做了一次对的事。"在权力场中，有底线的人往往在逆境中获得意想不到的支持。',
      compromise: '你提出了折中——没有人满意，但也没有人翻桌。折中方案需要极强的游说能力。你累得瘦了十斤，但你学会了权力场最重要的一课：大多数决定不是"对vs错"，而是"哪种不完美更能接受"。',
      passive: '沉默是最昂贵的操作。你没有做决定，但时间替你做了——法案过了有效期。你既没有"做对的事"的道德资本，也没有"做交易"的政治资本。你什么都没得到，什么都没失去——这也许是最坏的结果。',
      betrayal: '你出卖了自己的原则来换取政治资本。原则是最忠诚的伙伴——你背叛它的时候它不会反抗，但你将来需要它的时候，它也不会回来。'
    },
    '幕僚背叛': {
      'self-serving': '你选择了摊牌——直接对抗是最危险的策略。他知道你所有的秘密。但不表态会让其他幕僚觉得：背叛没有代价。你用一次冒险，维护了整个团队的"恐惧底线"。',
      moral: '你选择了隐忍——知道别人的秘密是权力，假装不知道是更大的权力。但隐忍需要极强的心理素质。你需要在他面前表演"一切如常"，这对精神消耗极大。',
      compromise: '你选择了提拔他——用利益绑定比用威胁控制更持久。但提拔一个已经在动摇的人，风险是：他可能用你给的资源来对付你。权力操控的精髓是让对方觉得跟着你比单干更好。',
      passive: '你选择了不作为。疲惫本身就是一种答案。有时候，问题会自己解决——或者自己恶化。你赌了一把。三天后，照片风波自然平息了。但你知道，这只是暂时的平静。',
      betrayal: '你选择了背叛一个正在背叛你的人。以其人之道还治其人之身——但你也在告诉所有人：在这个团队里，先动手的人赢。这会加速整个团队的信任崩塌。'
    },
    '派系拉拢': {
      'self-serving': '你同意了交易——两年畅通无阻值这个价。社会舆论炸了锅，但你的法案确实全部落地了。历史会怎么评价你？取决于五十年后谁在写历史。权力的终极悖论：你做了"对的事"（推动改革），但用了"错的方式"（交易司法独立）。',
      moral: '你拒绝了——司法独立不能拿来交易。多数党领袖摔门而去，接下来两年你的所有法案都被卡在参议院。但你的幕僚说："至少我们没有出卖灵魂。"在权力场中，有底线的人往往在卸任后获得更高的历史评价——如果他能撑过任期的话。',
      compromise: '你提出了替代方案——折中需要极强的谈判技巧和足够的筹码。谈判持续了三周，你累得瘦了十斤。但你学会了权力场最重要的一课：在没有筹码的时候，折中就是投降。',
      passive: '你沉默了。在深夜的白宫里，沉默比任何话都更有力量。参议院领袖不知道你会不会答应，这种不确定性让他焦虑。但不确定性也有代价——他可能会去找你的对手谈。',
      betrayal: '你出卖了司法独立来换取立法成果。这是一个结构性的背叛——不是背叛某个人，而是背叛了制度本身。制度不会反击，但制度的崩塌会伤害所有人，包括你自己。'
    },
    '危机表态': {
      'self-serving': '你发表了全国讲话——直面问题。在危机中，总统的声音是唯一的稳定器。你说了十五分钟，没有提词器，没有稿子。支持者热泪盈眶，反对者说你在"作秀"。但至少，你开口了。在权力场中，"开口"本身就是一种权力——它定义了谁在掌控叙事。',
      moral: '你让副总统出面——分散风险。这是权力的"代理"操作：你保留了自己的安全空间，但也放弃了直接建立情感连接的机会。副总统的表现越好，你的权力就越被稀释。',
      compromise: '你在推特上发了一条简短声明——四两拨千斤。在危机中，有时一条推文比一场发布会更有效。但推文的"低成本"也意味着"低诚意"——人们会觉得你在敷衍。',
      passive: '你什么都没说。在危机中，沉默是最危险的操作——因为它被解读为"不在乎"。但如果你能撑到另一个更大的新闻盖过这件事，你就安全了。问题是：你能撑多久？',
      betrayal: '你出卖了自己的立场来迎合舆论。在危机中，立场是最脆弱的东西——但也是最有价值的东西。你用立场换来了暂时的安全，但你失去了"有立场的人"这个标签。'
    },
    '深夜抉择': {
      'self-serving': '你选择了家庭——在权力场中，这是一个奢侈的选择。但"人性化"本身也是一种政治策略。你的幕僚发现你关了手机——他们反而更紧张了。当你重新出现时，眼神比之前更坚定了。',
      moral: '你选择了最后的底线——有些事不能做。你的幕僚长沉默了很久，然后说："我尊重你的决定。"你知道这可能是你做过的最"对"的决定——也可能是最"贵"的决定。',
      compromise: '你选择了折中——两边各退一步。没有人满意，但也没有人翻桌。你累得在办公室沙发上睡着了。在权力场中，"折中"是最常见的结局——也是最容易被遗忘的结局。',
      passive: '你选择了不做决定——把命运交给时间。在权力场中，"不做决定"本身就是一种决定。它意味着你接受了现状，无论现状是什么。这也许是懦弱，也许是智慧——取决于结果。',
      betrayal: '你出卖了最后的底线。在权力场中，底线是你唯一真正拥有的东西。你用底线换来了什么？也许是一个法案的通过，也许是一次选举的胜利。但你知道：你再也找不回那条底线了。'
    }
  },
  ming: {
    '两本账': {
      'self-serving': '你按官账上报——规矩是你的武器。上司沉默了三天，然后派了一个"巡查"下来。你的师爷说"水至清则无鱼"。在大明官场，"清官"不是一个褒义词——它意味着"不会做人"。',
      moral: '你按私账来——先融入再说。县衙上下松了一口气。你发现"私账"是整个县运转的真正规则。在大明，制度分两种：写在奏折上的和活在人心里的。你选择了后者。',
      compromise: '你先不动，把两本账都研究透。你的师爷看你的眼神从轻视变成了谨慎。在权力场中，"观察者"是最安全的位置——但观察太久，你会错过行动的窗口期。',
      passive: '你沉默了。在大明官场，沉默是最常见的生存策略。但沉默也有代价：你错过了表明立场的最佳时机。以后无论你做什么选择，都会被解读为"被迫的"而非"主动的"。',
      betrayal: '你出卖了规矩来换取生存。规矩是最无辜的受害者——它不会反击，不会告状，不会在背后说你坏话。但每一次出卖规矩，你都在透支整个制度的信用。'
    },
    '乡绅宴请': {
      'self-serving': '你收下了金子——入乡随俗。王员外当场认你做"贤侄"。在乡土中国，"贤侄"不是称呼，是契约。你欠他一个"贤侄"该做的事。费孝通说得对：礼物是社会关系的黏合剂——但黏合剂一旦用上，就很难撕开。',
      moral: '你婉拒了——你拒绝的不是一锭金子，而是王员外向你发出的"结盟邀请"。三天后，粮商拒绝向官仓供货。在乡土社会，拒绝礼物就是拒绝关系，拒绝关系就是与整个社区为敌。',
      compromise: '你收下但捐给了县学——在规则的缝隙里找到第三条路。但过于聪明的人会让所有人不安。你的名声传开了，但也有人开始说你"沽名钓誉"。在权力场中，"聪明"有时候比"贪婪"更危险。',
      passive: '你把决定权交给了监司——在科层体制中，"请示上级"是最安全的选择。监司皮笑肉不笑："大人自己做主就好。"你听出了弦外之音——他在试探你。你的犹豫本身就是筹码，也是把柄。',
      betrayal: '你出卖了自己的原则来换取关系网。原则是最忠诚的伙伴——你背叛它的时候它不会反抗，但你将来需要它的时候，它也不会回来。'
    },
    '土地之争': {
      'self-serving': '你判张老实胜诉——法不容情。王员外摔门而去，你的考评降为"下下"。张老实给你磕了三个响头，你的仕途却开始亮红灯。但民间开始流传"青天大老爷"的故事。在权力场中，"正义"是最昂贵的奢侈品——你买得起吗？',
      moral: '你判王员外胜——"证据不足，驳回"。王员外派人送来厚礼。你在夜里把判决书翻来覆去看了十遍。师爷说："大人，做官就是做选择。"你选择了权力结构的稳定——代价是一个农民的十亩水田。',
      compromise: '你调解了——让王员外"补偿"张老实银两。双方都不满意，但都接受了。在权力场中，"调解"是最常见的结局——弱者退的那一步，往往比强者大得多。你觉得自己做了"对的事"，但你也不确定。',
      passive: '你拖延了——"此案复杂，需进一步调查"。案子拖了三个月，张老实的妻子病倒了，王员外已经把地转到了别人名下。你最终以"证据灭失"结案。在权力场中，"拖延"是最隐蔽的暴力——受害者甚至不知道自己被伤害了。',
      betrayal: '你出卖了正义来换取安稳。正义是最天真的理想主义者——它相信世界是公平的。你用现实告诉它：世界不是。但你知道：没有正义的世界，最终也不会有安稳。'
    },
    '派系抉择': {
      'self-serving': '你拒绝了——"知遇之恩，不敢忘"。太监的人冷笑而去。你的上司听说后，感动了三天。然后继续贪他的银子。三年后，你的上司被革职，你也被牵连调任。忠诚是最昂贵的赌注——你押对了人，但押错了时间。',
      moral: '你署名弹劾了——识时务者为俊杰。上司被革职，你连升两级。但你开始一个人吃饭。晚上对着铜镜，你发现自己的笑容越来越像王员外。在权力场中，"成长"和"堕落"往往长得很像。',
      compromise: '你两不得罪——署名但暗中通知上司。弹劾失败，太监的人查出是你泄的密。从此你成了官场上的透明人。在权力场中，脚踩两只船是最危险的——因为两边都会觉得你是叛徒。',
      passive: '你辞官了——"这官场，我不玩了"。你回到了乡下，种了一亩薄田。夜里读书时，你忽然觉得，也许这才是你真正想要的。但偶尔你会想起张老实——你走了，谁来替他说话？',
      betrayal: '你出卖了恩师来换取前途。恩师是最危险的敌人——因为他知道你所有的弱点。但恩师也是最脆弱的敌人——因为他信任你。'
    },
    '官场酒局': {
      'self-serving': '你跟着笑了——附和知府的"笑话"。知府拍着你的肩膀说"小兄弟懂事"。你在回去的马车里，对着夜空吐了。不是因为酒，是因为你发现自己笑得越来越自然了。在权力场中，"融入"和"被同化"之间只有一线之隔。',
      moral: '你沉默了——低头喝酒，不接话。酒局的气氛微妙地冷了。几个关键的审批开始"卡住"了。在权力场中，"不参与"本身就是一种参与——你的沉默传达的信息是："我不站队。"但不站队的人，永远不会被考虑。',
      compromise: '你反击了——讲了一个关于知府的"笑话"。全场安静了三秒。然后知府哈哈大笑——但笑声没有到达眼底。你给自己树立了一个强大的敌人。但你的"敢言"也在官场传开了。在权力场中，"反击"是最危险的操作——要么一战成名，要么一败涂地。',
      passive: '你中途离席了——"身体不适，先行告退"。你走在府城的夜街上，吃了一碗馄饨。这是你穿越以来最自在的一刻。但你也知道，你错过了一个改变命运的机会。在权力场中，"自由"和"边缘化"往往是一回事。',
      betrayal: '你出卖了沉默来换取归属感。沉默是最廉价的筹码——你用它换来了一张入场券。但入场券的背面写着：从此你是"他们的人"了。'
    },
    '民变前夜': {
      'self-serving': '你开仓放粮，强制减租——为民做主。佃户们跪了一地。但王员外当晚就给府城写了信。七天后，你被以"擅权妄为"为由停职。在权力场中，"为民做主"是最危险的选择——因为它同时得罪了权力结构中的所有利益方。',
      moral: '你按上司指示——安抚为主，不做实质行动。你贴了一张"正在调查"的告示，然后关了县衙的门。三天后，佃户们散了。王员外派人送来一坛好酒。你在书房里把酒倒了——然后又重新倒了一杯。',
      compromise: '你两边斡旋了——让王员外减一成租。你苦口婆心谈了三天，没有人满意，但也没有人流血。你累得在公堂上睡着了，师爷给你盖了一件外衣。在权力场中，"调解"是最消耗的——因为你要同时承受两边的怒火。',
      passive: '你装病了——把烂摊子推给县丞。所有人都知道了：这个知县，关键时候靠不住。在权力场中，"逃避"是最隐蔽的权力操作——你推掉的每一件事，都在消耗你的权威。',
      betrayal: '你出卖了佃户来换取安稳。三百个人的命运被你用一张"正在调查"的告示打发了。在权力场中，"沉默的大多数"是最容易被牺牲的——因为他们没有声音。'
    },
    '御史来访': {
      'self-serving': '你配合调查——"下官知无不言"。御史满意地离开了。但你供出的那些名字，背后都有家庭、有孩子。在权力场中，"配合"是最安全的选择——但"安全"的代价是别人的"不安全"。',
      moral: '你拒绝合作——"下官不知"。御史冷笑而去。你的上司暂时安全了，但你也失去了往上爬的最后机会。在权力场中，"忠诚"是最昂贵的赌注——你押对了人，但押错了方向。',
      compromise: '你选择了折中——提供部分信息，保护核心人物。御史不太满意，但也没为难你。在权力场中，"部分合作"是最常见的操作——它让你两边都不完全得罪，但也两边都不完全交好。',
      passive: '你病了——在御史来访的前一天。你的师爷替你接待了。御史什么都没问到，但他在报告里写了你的"不合作"。在权力场中，"装病"是最古老的逃避策略——但也是最容易被识破的。',
      betrayal: '你出卖了所有人来换取自保。御史满意地离开了，但你的名字从此在官场上消失了——不是被革职，是被所有人遗忘。在权力场中，"遗忘"比"惩罚"更可怕。'
    },
    '最后抉择': {
      'self-serving': '你选择了继续——在大明官场，"坚持"是最稀缺的品质。但坚持和固执之间的区别是什么？也许只是结果不同。你不知道自己是哪一种——但你已经没有退路了。',
      moral: '你选择了离开——辞官归隐。你回到了乡下，种田、读书、睡觉。这些曾经最简单的事，现在成了最奢侈的事。在权力场中，"退出"是最勇敢的选择——因为你放弃了所有的沉没成本。',
      compromise: '你选择了折中——既不完全留下，也不完全离开。你申请调往边远之地。在权力场中，"折中"是最常见的结局——也是最容易被遗忘的结局。',
      passive: '你选择了不做决定——让命运来决定。在权力场中，"不做决定"本身就是一种决定。它意味着你接受了现状，无论现状是什么。这也许是懦弱，也许是智慧——取决于结果。',
      betrayal: '你出卖了最后的底线来换取生存。在权力场中，底线是你唯一真正拥有的东西。你用底线换来了什么？也许是一个官位，也许是一条命。但你知道：你再也找不回那条底线了。'
    }
  }
};

// 获取场景专属权力动力学解读
function getScenePowerInsight(scenarioKey, sceneTitle, debtCategory) {
  const scenarioInsights = scenePowerInsights[scenarioKey];
  if (!scenarioInsights) return null;
  const sceneInsights = scenarioInsights[sceneTitle];
  if (!sceneInsights) return null;
  return sceneInsights[debtCategory] || sceneInsights.compromise;
}

// --- 历史标记系统（事件联动） ---
let historyFlags = {};

function setFlag(key, value) { historyFlags[key] = value; }
function hasFlag(key) { return !!historyFlags[key]; }
function getFlag(key) { return historyFlags[key]; }
function resetFlags() { historyFlags = {}; }

// 根据历史标记修改场景文本/选项
function applyHistoryEffects(scene, scenarioKey) {
  const modified = JSON.parse(JSON.stringify(scene)); // deep clone

  // 白宫篇联动
  if (scenarioKey === 'whitehouse') {
    // 如果第一关选择了处理推文（民意优先），后面的媒体风暴场景加一句提醒
    if (hasFlag('wh_chose_public_op') && modified.title === '媒体风暴') {
      modified.text += '\n\n你想起了上次因为民意而搁置情报的事。这次，你不能再犯同样的错误——或者，你已经习惯了？';
    }
    // 如果第一关选了委派，幕僚长的信任成本在后面体现
    if (hasFlag('wh_delegated') && modified.title === '幕僚背叛') {
      modified.text += '\n\n你忽然想起，你已经不是第一次把难题推给别人了。也许这就是为什么他开始为自己留后路。';
    }
    // 如果在内阁会议中沉默，后面派系拉拢时有人提起
    if (hasFlag('wh_silent_cabinet') && modified.title === '派系拉拢') {
      modified.text += '\n\n参议院领袖开门见山："上次内阁会议你的沉默，让很多人猜了三天。我今天来，就是想听你一个准话。"';
    }
  }

  // 大明篇联动
  if (scenarioKey === 'ming') {
    // 如果收了金元宝，后面断案时王员外更有恃无恐
    if (hasFlag('ming_accepted_gold') && modified.title === '土地之争') {
      modified.text += '\n\n你想起了那锭金元宝。王员外之所以敢如此嚣张，正是因为他知道——你收过他的东西。';
    }
    // 如果按官账上报，后面民变时上司不帮你
    if (hasFlag('ming_followed_rules') && modified.title === '民变前夜') {
      modified.text += '\n\n你想起刚到任时按官账上报的事。上司至今没有原谅你。这次，他不会派人来帮你。';
    }
    // 如果在酒局上沉默，后面站队时信息更少
    if (hasFlag('ming_silent_at_feast') && modified.title === '派系抉择') {
      modified.text += '\n\n你想起酒局上的沉默。你错过了获取情报的最佳机会。现在，你对朝廷的局势一无所知。';
    }
  }

  return modified;
}

// --- 结局彩蛋文案库 ---
const endingEasterEggs = {
  whitehouse: {
    emperorComments: [
      { ending: 'wh_manipulator', texts: [
        '他赢了。但赢得太彻底的人，往往输在最后。',
        '权力是最好的春药，也是最好的毒药。他选了前者。',
        '此人已不可控。能用则用，不能用则——'
      ]},
      { ending: 'wh_trapped', texts: [
        '他被困住了。不是被别人困住，是被自己困住。',
        '他得到了一切，也失去了一切。这也许是权力最残酷的玩笑。',
        '他坐在那个位置上，但那个位置已经不属于自己了。'
      ]},
      { ending: 'wh_hermit', texts: [
        '他走了。有些人适合权力，有些人适合远方。他选了远方。',
        '离开的人往往比留下的人看得更清楚。',
        '他走得时候没有回头。这是他在这四年里做过的最正确的决定。'
      ]},
      { ending: 'wh_deaf', texts: [
        '他已经什么都听不到了。一个聋子坐在权力中心，比一个敌人更危险。',
        '失聪不是最可怕的——最可怕的是他以为自己还能听到。',
        '此人已废。不是因为他做了什么，而是因为他再也听不到什么。'
      ]},
      { ending: 'wh_martyr', texts: [
        '他做了对的事。可惜，在这个地方，"对的事"往往意味着"错的人"。',
        '历史上会记住他。但历史记不住所有人——他可能只是脚注。',
        '一个有底线的人。我尊重他。但我不会学他。'
      ]},
      { ending: 'wh_balanced', texts: [
        '此人深谙中庸之道。不功不过，不痛不痒——最适合做执行者。',
        '他活下来了，但没有人记得他做过什么。这也许就是他想要的。',
        '最安全的选择，也是最容易被遗忘的选择。'
      ]}
    ],
    colleagueDiary: [
      { ending: 'wh_manipulator', texts: [
        'X月X日。他变了。不是变坏了——是变成了一个我认不出来的人。',
        '他开始用"我们"代替"我"。以前他从不这样。权力改变了他说话的方式。',
        '他赢了所有的人。但我发现，他已经没有朋友了。也许他不在乎。'
      ]},
      { ending: 'wh_trapped', texts: [
        'X月X日。他还在那个位置上。但他看起来比任何人都想离开。',
        '他得到了一切。但我今天在走廊里遇见他，他的眼神是空的。',
        '他赢了。但赢了什么？一个他不想要的位置，一群他不信任的人。'
      ]},
      { ending: 'wh_hermit', texts: [
        'X月X日。他走了。没有告别派对，没有感人演讲。他只是走了。',
        '他的办公桌被清空了。我偷偷留了他的一支笔。算是纪念吧。',
        '他走后，华盛顿继续运转。好像他从来没来过。'
      ]},
      { ending: 'wh_deaf', texts: [
        'X月X日。他今天问了我三次"你说什么"。我不知道他是真的没听到，还是不想听到。',
        '他开始依赖书面报告了。也许是好事——至少白纸黑字不会骗人。',
        '他不再参加非正式聚会了。消息渠道一个一个断掉。他成了信息孤岛。'
      ]},
      { ending: 'wh_martyr', texts: [
        'X月X日。他做了一个所有人都不敢做的决定。我不知道该佩服他还是可怜他。',
        '他被调走了。走廊里没有人谈论这件事。沉默本身就是一种态度。',
        '他的办公桌被清空了。我偷偷留了他的一支笔。算是纪念吧。'
      ]},
      { ending: 'wh_balanced', texts: [
        'X月X日。他又活过了一天。在这个地方，这不是理所当然的事。',
        '今天在走廊里遇见他。他的眼神比去年空了一些。不知道是好事还是坏事。',
        '他开始学会说"我考虑一下"了。以前他会直接说"不"。这是进步还是退步？'
      ]}
    ]
  },
  ming: {
    emperorComments: [
      { ending: 'ming_manipulator', texts: [
        '此人懂事。懂事的人好用。但懂事的人也危险——因为他知道太多。',
        '万历批：准。让他继续做。但派人盯着。',
        '他学会了规矩。但规矩学得太好的人，往往忘了规矩是为什么定的。'
      ]},
      { ending: 'ming_martyr', texts: [
        '此官清廉，但清廉不能当饭吃。调往边疆，让他去治理那些没人想去的地方。',
        '万历批：知道了。此人可用，但不宜在京。',
        '朕看了他的万言书。写得很好。但写得好有什么用？能修河吗？能赈灾吗？'
      ]},
      { ending: 'ming_deaf', texts: [
        '他已经什么都听不到了。一个聋子坐在县衙里，比一个贪官更危险。',
        '万历批：此人已废。另行补缺。',
        '他坐在县衙里，但县衙里发生的事他一件都不知道。这比贪污更可怕。'
      ]},
      { ending: 'ming_betrayed', texts: [
        '他踩着别人的肩膀往上爬。聪明。但聪明人往往死在聪明上。',
        '万历批：此人可用，但不可信。',
        '他升了。但朕知道，一个会背叛恩师的人，也会背叛任何人。'
      ]},
      { ending: 'ming_hermit', texts: [
        '辞官？也好。这官场少他一个不少，多他一个不多。',
        '万历批：知道了。缺另行补。',
        '他走了。走得时候没带走任何东西。这在大明官场，算是罕见的清白了。'
      ]},
      { ending: 'ming_balanced', texts: [
        '此人找到了第三条路。不容易。在朕的朝廷里，能活成这样的人不多。',
        '万历批：此人可大用。',
        '他既不是清官，也不是贪官。他是——一个活着的人。这也许就够了。'
      ]}
    ],
    colleagueDiary: [
      { ending: 'ming_manipulator', texts: [
        'X月X日。他升了。同僚们纷纷道贺。但笑声里藏着刀。',
        '他开始学着笑。以前他不会笑。现在他笑得很熟练。熟练得让人心疼。',
        '他赢了。但我不确定他赢了什么。也许他自己也不确定。'
      ]},
      { ending: 'ming_martyr', texts: [
        'X月X日。他被调走了。县衙上下松了一口气。但张老实哭了。',
        '他走的那天，行李只有一箱书。我帮他搬的。很轻。轻得让人心酸。',
        '他走后，县里恢复了"规矩"。但偶尔有人提起他。说他是"好官"。'
      ]},
      { ending: 'ming_deaf', texts: [
        'X月X日。他今天问了我三次"最近有什么事"。我不知道他是真的不知道，还是不想知道。',
        '他开始依赖书面报告了。但书面报告都是经过筛选的——他看到的，是别人想让他看到的。',
        '他不再参加非正式聚会了。消息渠道一个一个断掉。他成了信息孤岛。'
      ]},
      { ending: 'ming_betrayed', texts: [
        'X月X日。他升了。但他开始一个人吃饭。没有人愿意和一个背叛者同桌。',
        '他踩着别人往上爬。现在他站在高处——但高处不胜寒。',
        '他赢了。但他赢的每一步，都踩在别人的白骨上。'
      ]},
      { ending: 'ming_hermit', texts: [
        'X月X日。他辞官了。走的时候只带了一箱书。我帮他搬的。',
        '他回到了乡下。听说种了一亩薄田。偶尔有人去看他。他泡茶，不说话。',
        '他走后，县里恢复了"规矩"。但偶尔有人提起他。说他是"好官"。虽然他没做成什么事。'
      ]},
      { ending: 'ming_balanced', texts: [
        'X月X日。他还在。在这个官场，能"还在"本身就是一种本事。',
        '他既不站队，也不清高。他只是——做好自己的事。这也许是最聪明的活法。',
        '他退休了。回到乡下种田。偶尔有人来看他。他泡茶，不说话。笑容很淡。'
      ]}
    ]
  }
};

// --- 获取随机彩蛋文案 ---
function getEasterEgg(scenarioKey, endingId) {
  const eggs = endingEasterEggs[scenarioKey];
  if (!eggs) return null;

  const result = {};

  // 皇帝/上司批语
  const emperorPool = eggs.emperorComments.find(e => e.ending === endingId);
  if (emperorPool) {
    result.emperor = emperorPool.texts[Math.floor(Math.random() * emperorPool.texts.length)];
  }

  // 同僚日记
  const diaryPool = eggs.colleagueDiary.find(e => e.ending === endingId);
  if (diaryPool) {
    result.diary = diaryPool.texts[Math.floor(Math.random() * diaryPool.texts.length)];
  }

  return result;
}

// --- V7: 类别追踪系统（防止单一结局） ---
function getCategoryStreak() {
  if (state.debts.length < 2) return { category: null, count: 0 };
  const last = state.debts[state.debts.length - 1].category;
  let count = 0;
  for (let i = state.debts.length - 1; i >= 0; i--) {
    if (state.debts[i].category === last) count++;
    else break;
  }
  return { category: last, count };
}

function getStreakWarning(streak) {
  if (streak.count < 3) return null;
  const warnings = {
    moral: '你已经连续三次坚守原则了。历史上的殉道者，大多没有好下场。你确定不给自己留一条退路？',
    'self-serving': '你已经连续三次选择利己。权力的游戏里，赢太多次的人往往输在最后一把。',
    compromise: '你已经连续三次折中。折中是最安全的路——也是最容易被遗忘的路。',
    betrayal: '你已经连续三次出卖他人。被背叛的人不会忘记——他们只是在等一个反击的机会。',
    passive: '你已经连续三次选择沉默。沉默不是没有代价——它只是在积累，直到有一天全部爆发。'
  };
  return warnings[streak.category] || null;
}

// --- 开局身份介绍 ---
function showIntro(scenarioKey) {
  const sc = scenarios[scenarioKey];
  const intro = sc.intro;
  const screen = document.getElementById('intro-screen');
  screen.innerHTML = `
    <div class="intro-identity">
      <div class="intro-badge">${intro.badge}</div>
      <div class="intro-name">${intro.name}</div>
      <div class="intro-role">${intro.role}</div>
      <div class="intro-desc">${intro.desc.replace(/\n/g, '<br>')}</div>
      <div class="intro-situation">${intro.situation.replace(/\n/g, '<br>')}</div>
      <button class="intro-btn" onclick="startGame('${scenarioKey}')">踏入命运</button>
    </div>
  `;
  transition(() => showScreen('intro-screen'));
}

// --- 开始游戏 ---
function startGame(scenarioKey) {
  // 自动初始化并开启音频
  audioEngine.enable();

  state = { scenario: scenarioKey, currentScene: 0, debts: [], channels: 5, choices: [], history: [] };
  resetFlags();
  renderChannels();
  renderDebtScroll();
  transition(() => {
    showScreen('game-screen');
    document.getElementById('channelsBar').classList.add('visible');
    document.getElementById('scenarioLabel').textContent = scenarios[scenarioKey].label;
    document.getElementById('vignette').classList.toggle('active', scenarioKey === 'ming');
    document.getElementById('scanline').classList.toggle('active', scenarioKey === 'ming');
    renderScene();
    startBGM(scenarioKey);
  });
}

// --- 渲染场景 ---
function renderScene() {
  const sc = scenarios[state.scenario];
  const rawScene = sc.scenes[state.currentScene];
  // 应用历史联动效果
  const scene = applyHistoryEffects(rawScene, state.scenario);

  // 随机文本变体（每次游玩不同）
  if (scene.textVariants && scene.textVariants.length > 0) {
    const allTexts = [scene.text, ...scene.textVariants];
    scene.text = allTexts[Math.floor(Math.random() * allTexts.length)];
  }
  if (scene.narratorVariants && scene.narratorVariants.length > 0) {
    const allNarrators = [scene.narrator, ...scene.narratorVariants];
    scene.narrator = allNarrators[Math.floor(Math.random() * allNarrators.length)];
  }
  const container = document.getElementById('sceneContainer');
  document.getElementById('levelIndicator').textContent = `${state.currentScene + 1} / ${sc.scenes.length}`;

  // V7: 场景氛围光效
  let ambient = document.querySelector('.ambient-glow');
  if (!ambient) {
    ambient = document.createElement('div');
    ambient.className = 'ambient-glow';
    document.body.appendChild(ambient);
  }
  ambient.className = `ambient-glow ${state.scenario}`;
  requestAnimationFrame(() => ambient.classList.add('active'));

  // 收集本场景所有选项的书摘
  const bookQuotes = scene.choices.map(c => c.bookQuote).filter(Boolean);

  container.innerHTML = `
    <div class="scene-chapter" id="sceneChapter">${scene.chapter} · ${scene.title}</div>
    <div class="scene-text" id="sceneText"></div>
    <div class="scene-narrator" id="sceneNarrator"></div>
    <div class="choices-container" id="choicesContainer"></div>
    <div class="scene-book-quotes" id="sceneBookQuotes">
      ${bookQuotes.map(q => `<div class="scene-bq-item">${q}</div>`).join('')}
    </div>
  `;

  const chapterEl = document.getElementById('sceneChapter');
  const textEl = document.getElementById('sceneText');
  const narratorEl = document.getElementById('sceneNarrator');
  const choicesEl = document.getElementById('choicesContainer');
  const quotesEl = document.getElementById('sceneBookQuotes');

  setTimeout(() => {
    chapterEl.style.opacity = '1';
    chapterEl.style.transform = 'translateY(0)';
    chapterEl.style.transition = 'all 0.8s cubic-bezier(0.23,1,0.32,1)';
  }, 100);

  setTimeout(() => {
    textEl.style.opacity = '1';
    textEl.style.transform = 'translateY(0)';
    textEl.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    typewriter(textEl, scene.text, () => {
      setTimeout(() => {
        narratorEl.style.opacity = '1';
        narratorEl.style.transform = 'translateY(0)';
        narratorEl.style.transition = 'all 0.8s ease';
        narratorEl.innerHTML = scene.narrator;
      }, 300);
      setTimeout(() => {
        choicesEl.style.opacity = '1';
        choicesEl.style.transform = 'translateY(0)';
        choicesEl.style.transition = 'all 0.8s cubic-bezier(0.23,1,0.32,1)';
        scene.choices.forEach((choice, i) => {
          const btn = document.createElement('button');
          btn.className = `choice-btn cat-${choice.debtCategory || 'compromise'}`;
          const hintHTML = choice.hint ? `<span class="choice-hint">${choice.hint}</span>` : '';
          btn.innerHTML = `${choice.text}<span class="debt-preview">「${choice.debtPhrase}」</span>${hintHTML}`;
          btn.style.opacity = '0';
          btn.style.transform = 'translateX(-20px)';
          btn.onclick = () => makeChoice(i);
          choicesEl.appendChild(btn);
          setTimeout(() => {
            btn.style.transition = 'all 0.5s cubic-bezier(0.23,1,0.32,1)';
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
          }, 200 + i * 150);
        });
      }, 800);
      // 书摘在选项之后淡入
      setTimeout(() => {
        quotesEl.style.opacity = '1';
        quotesEl.style.transform = 'translateY(0)';
        quotesEl.style.transition = 'all 0.8s ease';
      }, 1200);
    });
  }, 400);

  audioEngine.play('scene');
}

// --- 做出选择 ---
function makeChoice(index) {
  const sc = scenarios[state.scenario];
  const scene = sc.scenes[state.currentScene];
  const choice = scene.choices[index];

  audioEngine.play('click');
  if (state.scenario === 'ming') inkSplash();

  // V7: 涟漪 + 粒子爆发 + 屏幕效果
  const clickedBtn = document.querySelectorAll('.choices-container .choice-btn')[index];
  if (clickedBtn) {
    const rect = clickedBtn.getBoundingClientRect();
    particleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, null, 8);
  }
  if (choice.debtCategory === 'betrayal') {
    screenShake('heavy');
    flashScreen('rgba(196,92,74,0.12)', 400);
    audioEngine.play('dramatic');
  } else if (choice.debtCategory === 'moral') {
    flashScreen('rgba(107,143,113,0.1)', 300);
  } else if (choice.debtCategory === 'self-serving') {
    flashScreen('rgba(201,169,110,0.1)', 300);
  } else if (choice.debtCategory === 'passive') {
    screenShake('light');
  }

  state.choices.push({ scene: state.currentScene, choice: index, text: choice.text });

  // 设置历史标记（事件联动）
  if (choice.historyFlag) {
    setFlag(choice.historyFlag, true);
  }
  state.history.push({ ...state });

  addDebt(choice.debtPhrase, choice.debtCategory, state.currentScene);
  if (choice.channelEffect < 0) loseChannel(choice.debtPhrase);

  document.querySelectorAll('.choices-container .choice-btn').forEach((btn, i) => {
    btn.style.pointerEvents = 'none';
    if (i === index) {
      btn.classList.add('clicked');
      btn.style.opacity = '1';
    } else {
      btn.style.opacity = '0.2';
      btn.style.filter = 'blur(1px)';
    }
  });

  // 分析引擎洞察 — 场景专属权力动力学 + 通用分析
  let insightHTML = '';
  const powerInsight = getScenePowerInsight(state.scenario, scene.title, choice.debtCategory);
  if (powerInsight) {
    insightHTML = `<div class="insight-text power-insight"><span class="insight-label">权力动力学</span>${powerInsight}</div>`;
  } else if (typeof AnalysisEngine !== 'undefined') {
    try {
      const engine = new AnalysisEngine();
      const result = engine.analyze({
        scenario: scene.title,
        context: { role: sc.intro.role, stakes: '高' },
        options: scene.choices.map((o, i) => ({ id: String.fromCharCode(97 + i), text: o.text, tags: o.analysisTags || [] }))
      });
      if (result.insights && result.insights.length > 0) {
        const topInsight = result.insights.find(i => i.severity === 'high') || result.insights[0];
        insightHTML = `<div class="insight-text">「${topInsight.framework}」${topInsight.text}</div>`;
      }
    } catch (e) { /* 静默失败 */ }
  }

  // V7: 中庸之道 — 仅在有zhongyongText时显示
  let zhongyongHTML = '';
  if (choice.zhongyongText) {
    zhongyongHTML = `<div class="zhongyong-box"><div class="zy-label">中庸之道</div><div class="zy-text">${choice.zhongyongText}</div><div class="zy-quote">「极高明而道中庸」——《中庸》</div></div>`;
    setTimeout(() => audioEngine.play('zhongyong'), 800);
  }

  // V7: 类别连击警告
  const streak = getCategoryStreak();
  const streakWarning = getStreakWarning(streak);
  let streakHTML = '';
  if (streakWarning) {
    streakHTML = `<div class="streak-warning"><div class="streak-label">路径依赖警告</div><div class="streak-text">${streakWarning}</div></div>`;
    audioEngine.play('fail');
    screenShake('medium');
  }

  const container = document.getElementById('sceneContainer');
  const consequenceEl = document.createElement('div');
  consequenceEl.className = 'consequence-box';
  consequenceEl.innerHTML = `
    <div class="consequence-glow"></div>
    <div class="consequence-label">后果</div>
    <div class="consequence-text">${choice.consequence}</div>
    <div class="debt-added">新增人情债：「${choice.debtPhrase}」</div>
    ${streakHTML}
    ${insightHTML}
    ${zhongyongHTML}
  `;
  container.appendChild(consequenceEl);
  setTimeout(() => {
    consequenceEl.style.transition = 'all 0.8s cubic-bezier(0.23,1,0.32,1)';
    consequenceEl.style.opacity = '1';
    consequenceEl.style.transform = 'translateY(0)';
  }, 100);

  setTimeout(() => {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'choice-btn';
    nextBtn.style.marginTop = '2rem';
    nextBtn.style.opacity = '0';
    nextBtn.innerHTML = state.currentScene < sc.scenes.length - 1 ? '继续' : '查看结局';
    nextBtn.onclick = (e) => {
      createRipple(e, nextBtn);
      setTimeout(() => {
        if (state.currentScene < sc.scenes.length - 1) {
          state.currentScene++;
          transition(() => renderScene());
        } else {
          transition(() => showEnding());
        }
      }, 300);
    };
    container.appendChild(nextBtn);
    setTimeout(() => { nextBtn.style.transition = 'all 0.5s ease'; nextBtn.style.opacity = '1'; }, 100);
  }, 2000);
}

// --- 结局判定 ---
function determineEnding() {
  const sc = scenarios[state.scenario];
  for (const ending of sc.endings) {
    if (ending.condition(state.debts, state.channels)) return ending;
  }
  return sc.endings[sc.endings.length - 1];
}

// --- 生成身份卡 ---
function generateEchoCard(ending) {
  const categoryNames = { 'self-serving': '利己', 'moral': '守义', 'compromise': '折衷', 'betrayal': '背叛', 'passive': '沉默' };
  const counts = {};
  state.debts.forEach(d => { counts[d.category] = (counts[d.category] || 0) + 1; });
  const topCategory = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  const lastDebt = state.debts[state.debts.length - 1];
  return {
    title: ending.epitaph || ending.title,
    epitaph: lastDebt ? lastDebt.text : '无债一身轻',
    totalDebts: state.debts.length,
    channelSurvived: state.channels,
    topCategory: topCategory ? categoryNames[topCategory[0]] || topCategory[0] : '无',
    pathName: scenarios[state.scenario].label
  };
}

// --- 显示结局 ---
function showEnding() {
  showScreen('ending-screen');
  document.getElementById('vignette').classList.remove('active');
  document.getElementById('scanline').classList.remove('active');
  document.getElementById('channelsBar').classList.remove('visible');
  stopBGM();

  const ending = determineEnding();
  const card = generateEchoCard(ending);

  if (!unlockedEndings[state.scenario]) unlockedEndings[state.scenario] = [];
  if (!unlockedEndings[state.scenario].includes(ending.id)) {
    unlockedEndings[state.scenario].push(ending.id);
    localStorage.setItem('unlockedEndings', JSON.stringify(unlockedEndings));
  }

  if (ending.atmosphere === 'confetti') createConfetti();
  if (ending.atmosphere === 'dark') createDarkAtmosphere();
  audioEngine.play('ending');

  // 获取彩蛋文案
  const easterEgg = getEasterEgg(state.scenario, ending.id);

  const screen = document.getElementById('ending-screen');
  screen.innerHTML = `
    <div class="ending-badge">${ending.icon}</div>
    <div class="ending-title glitch-text" data-text="${ending.title}">${ending.title}</div>
    <div class="ending-subtitle">${ending.subtitle}</div>
    <div class="ending-epitaph">"${card.epitaph}"</div>
    <div class="echo-card-wrapper">
      <div class="echo-card" id="echoCard">
        <div class="ec-header"><div class="ec-badge">${ending.icon}</div><div class="ec-label">POWER ECHO</div></div>
        <div class="ec-title">${card.title}</div>
        <div class="ec-epitaph">"${card.epitaph}"</div>
        <div class="ec-divider"></div>
        <div class="ec-stats">
          <div class="ec-stat"><div class="ec-stat-val">${card.totalDebts}</div><div class="ec-stat-label">人情债</div></div>
          <div class="ec-stat"><div class="ec-stat-val">${card.channelSurvived}</div><div class="ec-stat-label">消息渠道</div></div>
          <div class="ec-stat"><div class="ec-stat-val">${card.topCategory}</div><div class="ec-stat-label">主要债务</div></div>
          <div class="ec-stat"><div class="ec-stat-val">${card.pathName}</div><div class="ec-stat-label">路径</div></div>
        </div>
        <div class="ec-divider"></div>
        <div class="ec-debts">${state.debts.slice(-3).map(d => `<div class="ec-debt">"${d.text}"</div>`).join('')}</div>
        <div class="ec-footer"><span>权力的游戏 v7</span><span>${new Date().toLocaleDateString('zh-CN')}</span></div>
        <div class="ec-watermark">权</div>
      </div>
    </div>
    <div class="ending-verdict">${ending.verdict}</div>
    <div class="ending-analysis"><h4>深度解析</h4>${ending.analysis}</div>
    <div class="ending-quote">${ending.quote}</div>
    ${easterEgg && easterEgg.emperor ? `
    <div class="ending-easter-egg emperor-egg">
      <div class="egg-label">${state.scenario === 'ming' ? '万历帝朱批' : '总统密档'}</div>
      <div class="egg-text">"${easterEgg.emperor}"</div>
    </div>` : ''}
    ${easterEgg && easterEgg.diary ? `
    <div class="ending-easter-egg diary-egg">
      <div class="egg-label">${state.scenario === 'ming' ? '同僚日记残页' : '幕僚工作日志'}</div>
      <div class="egg-text">"${easterEgg.diary}"</div>
    </div>` : ''}
    <div class="ending-btns">
      <button class="ending-btn primary" onclick="startGame('${state.scenario}')">再来一次</button>
      <button class="ending-btn" onclick="showScreen('landing')">返回首页</button>
      <button class="ending-btn" onclick="showGallery()">结局图鉴</button>
    </div>
  `;
}

// --- 奏折失败系统 ---
function showMemorial(text, sign) {
  const overlay = document.getElementById('memorialOverlay');
  document.getElementById('memorialText').textContent = text;
  document.getElementById('memorialSign').textContent = sign;
  document.getElementById('memorialDate').textContent = `万历${Math.floor(Math.random() * 30 + 1)}年`;
  overlay.classList.add('active');
  audioEngine.play('scroll');
}
function closeMemorial() {
  document.getElementById('memorialOverlay').classList.remove('active');
  showScreen('landing');
}
function saveMemorialAsImage() {
  const canvas = document.createElement('canvas');
  const w = 840, h = 1200;
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, '#f5e6c8'); grad.addColorStop(0.5, '#e8d5a8'); grad.addColorStop(1, '#f0dbb8');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 3000; i++) {
    ctx.fillStyle = `rgba(139,69,19,${Math.random() * 0.03})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }
  ctx.strokeStyle = '#8b2500'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.arc(w - 100, 100, 40, 0, Math.PI * 2); ctx.stroke();
  ctx.font = '28px "Ma Shan Zheng", cursive'; ctx.fillStyle = '#8b2500';
  ctx.textAlign = 'center'; ctx.fillText('印', w - 100, 110);
  ctx.font = '36px "Ma Shan Zheng", "Noto Serif SC", cursive';
  ctx.fillStyle = '#2a1f14'; ctx.textAlign = 'center';
  const text = document.getElementById('memorialText').textContent;
  const lines = text.split(/，|。/).filter(Boolean);
  lines.forEach((line, i) => { ctx.fillText(line + (i < lines.length - 1 ? '，' : '。'), w / 2, 300 + i * 70); });
  ctx.font = '28px "Ma Shan Zheng", cursive'; ctx.textAlign = 'right';
  ctx.fillStyle = '#5a4a3a'; ctx.fillText(document.getElementById('memorialSign').textContent, w - 60, h - 120);
  ctx.font = '18px sans-serif'; ctx.textAlign = 'center'; ctx.fillStyle = '#8a7a6a';
  ctx.fillText(document.getElementById('memorialDate').textContent, w / 2, h - 60);
  const link = document.createElement('a');
  link.download = '政治墓志铭.png'; link.href = canvas.toDataURL('image/png'); link.click();
}

// --- 图鉴系统 ---
function showGallery() {
  showScreen('gallery-screen');
  renderGalleryContent('whitehouse');
}
function renderGalleryContent(tab) {
  const screen = document.getElementById('gallery-screen');
  const sc = scenarios[tab];
  const unlocked = unlockedEndings[tab] || [];
  screen.innerHTML = `
    <div class="gallery-header"><h2>结局图鉴</h2><p>已解锁 ${unlocked.length} / ${sc.endings.length} 个结局</p></div>
    <div class="gallery-tabs">
      <button class="gallery-tab ${tab === 'whitehouse' ? 'active' : ''}" onclick="renderGalleryContent('whitehouse')">白宫篇</button>
      <button class="gallery-tab ${tab === 'ming' ? 'active' : ''}" onclick="renderGalleryContent('ming')">明朝篇</button>
    </div>
    <div class="gallery-grid">
      ${sc.endings.map(e => {
        const isUnlocked = unlocked.includes(e.id);
        return `<div class="gallery-card ${isUnlocked ? 'unlocked' : 'locked'}">
          <div class="gc-icon">${isUnlocked ? e.icon : '?'}</div>
          <div class="gc-title">${isUnlocked ? e.title : '???'}</div>
          <div class="gc-subtitle">${isUnlocked ? e.subtitle : '未解锁'}</div>
          <div class="gc-quote">${isUnlocked ? e.quote : '继续探索以解锁此结局'}</div>
        </div>`;
      }).join('')}
    </div>
    <button class="gallery-back" onclick="showScreen('landing')">返回首页</button>
  `;
}

// --- 特效 ---
function createConfetti() {
  const container = document.createElement('div');
  container.className = 'confetti-container'; document.body.appendChild(container);
  const colors = ['#c9a96e', '#6b8f71', '#9b8ec4', '#7a8ba0', '#c45c4a'];
  for (let i = 0; i < 80; i++) {
    const c = document.createElement('div'); c.className = 'confetti';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (Math.random() * 3 + 2) + 's';
    c.style.animationDelay = Math.random() * 2 + 's';
    c.style.width = (Math.random() * 8 + 4) + 'px';
    c.style.height = (Math.random() * 8 + 4) + 'px';
    container.appendChild(c);
  }
  setTimeout(() => container.remove(), 6000);
}
function createDarkAtmosphere() {
  const el = document.createElement('div');
  el.className = 'atmosphere-dark'; document.body.appendChild(el);
  setTimeout(() => el.remove(), 5000);
}
