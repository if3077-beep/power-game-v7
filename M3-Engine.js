// ============================================================
//  M3: 核心引擎（粒子/光标/音频/状态/打字机/转场）
// ============================================================

// --- 粒子系统 ---
const canvas = document.getElementById('particles');
const pCtx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedY = -(Math.random() * 0.3 + 0.05);
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.4 + 0.1;
    this.life = Math.random() * 200 + 100;
    this.maxLife = this.life;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY; this.life--;
    if (this.life <= 0 || this.y < -10) this.reset();
  }
  draw() {
    const a = this.opacity * (this.life / this.maxLife);
    pCtx.fillStyle = `rgba(201,169,110,${a})`;
    pCtx.beginPath(); pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2); pCtx.fill();
  }
}
for (let i = 0; i < 60; i++) particles.push(new Particle());
function animateParticles() {
  pCtx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// --- 光标跟随 ---
const glow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

// --- 音频系统 ---
let audioCtx = null, masterGain = null, audioEnabled = false, bgmRunning = false;
function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.3;
  masterGain.connect(audioCtx.destination);
}
function playTone(freq, dur, type = 'sine', vol = 0.2) {
  if (!audioEnabled || !audioCtx) return;
  const o = audioCtx.createOscillator(), g = audioCtx.createGain();
  o.type = type; o.frequency.value = freq;
  g.gain.setValueAtTime(vol * 0.3, audioCtx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  o.connect(g); g.connect(masterGain);
  o.start(); o.stop(audioCtx.currentTime + dur);
}
function playClick() { playTone(800, 0.08, 'sine', 0.15); }
function playDebt() { playTone(300, 0.3, 'triangle', 0.2); setTimeout(() => playTone(250, 0.2, 'triangle', 0.15), 150); }
function playEnding() { playTone(523, 0.4, 'sine', 0.2); setTimeout(() => playTone(659, 0.4, 'sine', 0.2), 300); setTimeout(() => playTone(784, 0.6, 'sine', 0.25), 600); }
function playScroll() { playTone(200, 0.15, 'sawtooth', 0.08); }
function playChannelLost() { playTone(180, 0.5, 'sawtooth', 0.15); setTimeout(() => playTone(120, 0.8, 'sawtooth', 0.1), 300); }

// BGM
function startBGM(style) {
  if (!audioEnabled || !audioCtx || bgmRunning) return;
  bgmRunning = true;
  const notes = style === 'whitehouse'
    ? [261,293,329,349,392,349,329,293,261,246,220,246,261,293,329,349]
    : [261,293,329,392,440,392,329,293,261,220,196,220,261,293,329,261];
  let i = 0;
  function playNext() {
    if (!bgmRunning || !audioEnabled) return;
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = style === 'whitehouse' ? 'sine' : 'triangle';
    o.frequency.value = notes[i % notes.length];
    g.gain.setValueAtTime(0.04, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
    o.connect(g); g.connect(masterGain);
    o.start(); o.stop(audioCtx.currentTime + 2);
    i++;
    setTimeout(playNext, 2000);
  }
  playNext();
}
function stopBGM() { bgmRunning = false; }
function toggleAudio() {
  initAudio();
  audioEnabled = !audioEnabled;
  const btn = document.getElementById('audioBtn');
  btn.classList.toggle('muted', !audioEnabled);
  if (audioEnabled) { startBGM(state.scenario || 'whitehouse'); }
  else { stopBGM(); }
}

// --- 游戏状态 ---
let state = { scenario: null, currentScene: 0, debts: [], channels: 5, choices: [], history: [] };
let unlockedEndings = JSON.parse(localStorage.getItem('unlockedEndings') || '{}');

// --- 屏幕切换 ---
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (id === 'game-screen') {
    document.getElementById('channelsBar').classList.add('visible');
  } else {
    document.getElementById('channelsBar').classList.remove('visible');
  }
}

// --- 转场 ---
function transition(callback) {
  const overlay = document.getElementById('transitionOverlay');
  overlay.classList.add('active');
  setTimeout(() => {
    callback();
    setTimeout(() => overlay.classList.remove('active'), 100);
  }, 600);
}

// --- 打字机 ---
function typewriter(el, text, callback) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  el.textContent = '';
  el.appendChild(cursor);
  function type() {
    if (i < text.length) {
      if (text[i] === '\n') {
        el.insertBefore(document.createElement('br'), cursor);
      } else {
        el.insertBefore(document.createTextNode(text[i]), cursor);
      }
      i++;
      const ch = text[i - 1];
      const speed = ch === '。' ? 120 : ch === '，' ? 80 : ch === '\n' ? 200 : 25 + Math.random() * 20;
      setTimeout(type, speed);
    } else {
      setTimeout(() => { cursor.remove(); if (callback) callback(); }, 500);
    }
  }
  type();
}

// --- 债务面板 ---
function toggleDebtPanel() {
  const panel = document.getElementById('debtPanel');
  const toggle = document.getElementById('debtToggle');
  panel.classList.toggle('collapsed');
  toggle.classList.toggle('collapsed');
}
function addDebt(phrase, category, sceneIndex) {
  const entry = { text: phrase, category, sceneIndex };
  state.debts.push(entry);
  renderDebtScroll();
  playDebt();
}
function renderDebtScroll() {
  const scroll = document.getElementById('debtScroll');
  const mobile = document.getElementById('mobileDebtScroll');
  const count = document.getElementById('debtCount');
  const html = state.debts.map(d => `<div class="debt-item ${d.category}">${d.text}</div>`).join('');
  scroll.innerHTML = html;
  if (mobile) mobile.innerHTML = html;
  count.textContent = `共 ${state.debts.length} 笔人情债`;
}

// --- 消息渠道 ---
function renderChannels() {
  const dots = document.getElementById('channelDots');
  const status = document.getElementById('channelStatus');
  dots.innerHTML = Array.from({ length: 5 }, (_, i) =>
    `<div class="ch-dot ${i >= state.channels ? 'lost' : ''}"></div>`
  ).join('');
  const msgs = ['彻底失聪', '几近聋哑', '孤陋寡闻', '耳目渐少', '消息尚可', '内线畅通'];
  status.textContent = msgs[Math.min(state.channels, 5)];
}
function loseChannel(reason) {
  if (state.channels <= 0) return;
  state.channels--;
  renderChannels();
  playChannelLost();
}

// --- 确认退出 ---
function confirmExit() {
  if (confirm('确定要返回首页吗？当前进度不会保存。')) {
    showScreen('landing');
    document.getElementById('vignette').classList.remove('active');
    document.getElementById('scanline').classList.remove('active');
    stopBGM();
  }
}

// --- 墨水飞溅（大明专用） ---
function inkSplash() {
  const splash = document.createElement('div');
  splash.className = 'ink-splash';
  splash.style.left = '50%'; splash.style.top = '50%';
  document.body.appendChild(splash);
  setTimeout(() => splash.remove(), 2000);
}

// --- 键盘快捷键 ---
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const gs = document.getElementById('game-screen');
    if (gs.classList.contains('active')) confirmExit();
  }
});
