// ============================================================
//  M6: 游戏机制（人情债/消息渠道/结局/奏折/身份卡/图鉴）
// ============================================================

const scenarios = { whitehouse: whitehouseData, ming: mingData };

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
      { ending: 'wh_survivor', texts: [
        '此人可用，但不可重用——太会自保的人，关键时刻也会自保。',
        '他活下来了。在这个城里，活着本身就是一种能力。',
        '观察了四年，此人最大的优点是——知道什么时候该闭嘴。'
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
      ]},
      { ending: 'wh_power', texts: [
        '他赢了。但赢得太彻底的人，往往输在最后。',
        '权力是最好的春药，也是最好的毒药。他选了前者。',
        '此人已不可控。能用则用，不能用则——'
      ]},
      { ending: 'wh_exile', texts: [
        '他走了。有些人适合权力，有些人适合远方。他选了远方。',
        '离开的人往往比留下的人看得更清楚。',
        '他走得时候没有回头。这是他在这四年里做过的最正确的决定。'
      ]}
    ],
    colleagueDiary: [
      { ending: 'wh_survivor', texts: [
        'X月X日。他又活过了一天。在这个地方，这不是理所当然的事。',
        '今天在走廊里遇见他。他的眼神比去年空了一些。不知道是好事还是坏事。',
        '他开始学会说"我考虑一下"了。以前他会直接说"不"。这是进步还是退步？'
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
      { ending: 'wh_power', texts: [
        'X月X日。他变了。不是变坏了——是变成了一个我认不出来的人。',
        '他开始用"我们"代替"我"。以前他从不这样。权力改变了他说话的方式。',
        '他赢了所有的人。但我发现，他已经没有朋友了。也许他不在乎。'
      ]}
    ]
  },
  ming: {
    emperorComments: [
      { ending: 'ming_qingfeng', texts: [
        '此官清廉，但清廉不能当饭吃。调往边疆，让他去治理那些没人想去的地方。',
        '万历批：知道了。此人可用，但不宜在京。',
        '朕看了他的万言书。写得很好。但写得好有什么用？能修河吗？能赈灾吗？'
      ]},
      { ending: 'ming_nongchao', texts: [
        '此人懂事。懂事的人好用。但懂事的人也危险——因为他知道太多。',
        '万历批：准。让他继续做。但派人盯着。',
        '他学会了规矩。但规矩学得太好的人，往往忘了规矩是为什么定的。'
      ]},
      { ending: 'ming_juanniao', texts: [
        '辞官？也好。这官场少他一个不少，多他一个不多。',
        '万历批：知道了。缺另行补。',
        '他走了。走得时候没带走任何东西。这在大明官场，算是罕见的清白了。'
      ]},
      { ending: 'ming_bianjiang', texts: [
        '流放？他值得更好的结局。但这个朝廷，不配拥有更好的人。',
        '万历批：此人有才，但不识时务。调往边疆，磨磨性子。',
        '他的万言书在士林中流传。朕也读了。写得很好。但朕不会承认。'
      ]},
      { ending: 'ming_yuanman', texts: [
        '此人找到了第三条路。不容易。在朕的朝廷里，能活成这样的人不多。',
        '万历批：此人可大用。',
        '他既不是清官，也不是贪官。他是——一个活着的人。这也许就够了。'
      ]},
      { ending: 'ming_fuping', texts: [
        '浮萍。这个朝廷里大多数人都这样。不高不低，不好不坏。',
        '万历批：平庸，但可用。',
        '他没有大善，也没有大恶。他只是——随波逐流。这也许是大多数人的真实写照。'
      ]}
    ],
    colleagueDiary: [
      { ending: 'ming_qingfeng', texts: [
        'X月X日。他被调走了。县衙上下松了一口气。但张老实哭了。',
        '他走的那天，行李只有一箱书。我帮他搬的。很轻。轻得让人心酸。',
        '他走后，县里恢复了"规矩"。但偶尔有人提起他。说他是"好官"。'
      ]},
      { ending: 'ming_nongchao', texts: [
        'X月X日。他升了。同僚们纷纷道贺。但笑声里藏着刀。',
        '他开始学着笑。以前他不会笑。现在他笑得很熟练。熟练得让人心疼。',
        '他赢了。但我不确定他赢了什么。也许他自己也不确定。'
      ]},
      { ending: 'ming_bianjiang', texts: [
        'X月X日。他被流放了。我去送他。他说："至少那里的天是干净的。"',
        '他在边疆种了一棵树。来信说等树长大了就回来。我知道他回不来了。',
        '二十年后，一个年轻的御史读到了他的万言书。然后改变了整个朝廷。但他已经不在了。'
      ]},
      { ending: 'ming_yuanman', texts: [
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
  audioEngine.init();
  if (!audioEngine.enabled) {
    audioEngine.enabled = true;
    const btn = document.getElementById('audioBtn');
    if (btn) btn.classList.remove('muted');
  }

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
  const container = document.getElementById('sceneContainer');
  document.getElementById('levelIndicator').textContent = `${state.currentScene + 1} / ${sc.scenes.length}`;

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
          btn.className = 'choice-btn';
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

  state.choices.push({ scene: state.currentScene, choice: index, text: choice.text });

  // 设置历史标记（事件联动）
  if (choice.historyFlag) {
    setFlag(choice.historyFlag, true);
  }
  state.history.push({ ...state });

  addDebt(choice.debtPhrase, choice.debtCategory, state.currentScene);
  if (choice.channelEffect < 0) loseChannel(choice.debtPhrase);

  document.querySelectorAll('.choices-container .choice-btn').forEach(btn => {
    btn.style.pointerEvents = 'none';
    btn.style.opacity = '0.3';
  });

  // 分析引擎洞察
  let insightHTML = '';
  if (typeof AnalysisEngine !== 'undefined') {
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

  const container = document.getElementById('sceneContainer');
  const consequenceEl = document.createElement('div');
  consequenceEl.className = 'consequence-box';
  consequenceEl.innerHTML = `
    <div class="consequence-label">后果</div>
    <div class="consequence-text">${choice.consequence}</div>
    <div class="debt-added">新增人情债：「${choice.debtPhrase}」</div>
    ${insightHTML}
  `;
  container.appendChild(consequenceEl);
  setTimeout(() => {
    consequenceEl.style.transition = 'all 0.8s ease';
    consequenceEl.style.opacity = '1';
    consequenceEl.style.transform = 'translateY(0)';
  }, 100);

  setTimeout(() => {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'choice-btn';
    nextBtn.style.marginTop = '2rem';
    nextBtn.style.opacity = '0';
    nextBtn.innerHTML = state.currentScene < sc.scenes.length - 1 ? '继续' : '查看结局';
    nextBtn.onclick = () => {
      if (state.currentScene < sc.scenes.length - 1) {
        state.currentScene++;
        transition(() => renderScene());
      } else {
        transition(() => showEnding());
      }
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
        <div class="ec-footer"><span>权力的游戏 v4</span><span>${new Date().toLocaleDateString('zh-CN')}</span></div>
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
