// ============================================================
//  M6: 游戏机制（人情债/消息渠道/结局/奏折/身份卡/图鉴）
// ============================================================

const scenarios = { whitehouse: whitehouseData, ming: mingData };

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
  state = { scenario: scenarioKey, currentScene: 0, debts: [], channels: 5, choices: [], history: [] };
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
  const scene = sc.scenes[state.currentScene];
  const container = document.getElementById('sceneContainer');
  document.getElementById('levelIndicator').textContent = `${state.currentScene + 1} / ${sc.scenes.length}`;

  container.innerHTML = `
    <div class="scene-chapter" id="sceneChapter">${scene.chapter} · ${scene.title}</div>
    <div class="scene-text" id="sceneText"></div>
    <div class="scene-narrator" id="sceneNarrator"></div>
    <div class="choices-container" id="choicesContainer"></div>
  `;

  const chapterEl = document.getElementById('sceneChapter');
  const textEl = document.getElementById('sceneText');
  const narratorEl = document.getElementById('sceneNarrator');
  const choicesEl = document.getElementById('choicesContainer');

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
          btn.innerHTML = `${choice.text}<span class="book-quote">${choice.bookQuote}</span><span class="debt-preview">「${choice.debtPhrase}」</span>`;
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
    });
  }, 400);
}

// --- 做出选择 ---
function makeChoice(index) {
  const sc = scenarios[state.scenario];
  const scene = sc.scenes[state.currentScene];
  const choice = scene.choices[index];

  playClick();
  if (state.scenario === 'ming') inkSplash();

  state.choices.push({ scene: state.currentScene, choice: index, text: choice.text });
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
    <div class="debt-added">📜 新增人情债：「${choice.debtPhrase}」</div>
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
    nextBtn.innerHTML = state.currentScene < sc.scenes.length - 1 ? '继续 →' : '查看结局 →';
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
  playEnding();

  const screen = document.getElementById('ending-screen');
  screen.innerHTML = `
    <div class="ending-badge">${ending.icon}</div>
    <div class="ending-title glitch-text" data-text="${ending.title}">${ending.title}</div>
    <div class="ending-subtitle">${ending.subtitle}</div>
    <div class="ending-epitaph">"${card.epitaph}"</div>
    <div class="echo-card-wrapper">
      <div class="echo-card" id="echoCard">
        <div class="ec-header"><div class="ec-badge">${ending.icon}</div><div class="ec-label">POWER ECHO · 权力回响</div></div>
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
  playScroll();
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
          <div class="gc-icon">${isUnlocked ? e.icon : '🔒'}</div>
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
