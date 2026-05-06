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

// --- 音频系统（AudioEngine） ---
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.enabled = false;
    this.bgmNodes = [];
    this.bgmRunning = false;
    this._bgmTimer = null;
  }

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.4;
    this.master.connect(this.ctx.destination);
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.15;
    this.bgmGain.connect(this.master);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.5;
    this.sfxGain.connect(this.master);
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    const btn = document.getElementById('audioBtn');
    if (btn) btn.classList.toggle('muted', !this.enabled);
    if (!this.enabled) this.stopBGM();
    return this.enabled;
  }

  // 音效
  play(type) {
    if (!this.enabled || !this.ctx) return;
    const sounds = {
      click:    () => this._tone(800, 0.06, 'sine', this.sfxGain),
      debt:     () => { this._tone(300, 0.25, 'triangle', this.sfxGain); setTimeout(() => this._tone(250, 0.2, 'triangle', this.sfxGain), 120); },
      scene:    () => { this._tone(440, 0.15, 'sine', this.sfxGain); setTimeout(() => this._tone(550, 0.15, 'sine', this.sfxGain), 100); },
      ending:   () => { this._tone(523, 0.3, 'sine', this.sfxGain); setTimeout(() => this._tone(659, 0.3, 'sine', this.sfxGain), 250); setTimeout(() => this._tone(784, 0.5, 'sine', this.sfxGain), 500); },
      ink:      () => this._tone(150, 0.3, 'sawtooth', this.sfxGain, 0.08),
      success:  () => { this._tone(523, 0.2, 'sine', this.sfxGain); setTimeout(() => this._tone(784, 0.3, 'sine', this.sfxGain), 150); },
      fail:     () => { this._tone(330, 0.3, 'sawtooth', this.sfxGain, 0.1); setTimeout(() => this._tone(220, 0.4, 'sawtooth', this.sfxGain, 0.1), 200); },
      scroll:   () => this._tone(200, 0.15, 'sawtooth', this.sfxGain, 0.06),
      channelLost: () => { this._tone(180, 0.5, 'sawtooth', this.sfxGain, 0.12); setTimeout(() => this._tone(120, 0.8, 'sawtooth', this.sfxGain, 0.08), 300); },
    };
    (sounds[type] || sounds.click)();
  }

  // BGM: 不同路线不同主题
  startBGM(style) {
    if (!this.enabled || !this.ctx || this.bgmRunning) return;
    this.bgmRunning = true;
    const scales = {
      whitehouse: [261, 277, 329, 349, 370, 349, 329, 277],   // tension: 半音阶，紧张感
      ming:       [261, 293, 329, 392, 440, 523, 440, 392],   // chinese: 五声调式，古风
      ambient:    [261, 293, 329, 392, 440, 392, 329, 293],
      dramatic:   [196, 233, 261, 293, 329, 293, 261, 233],
    };
    const notes = scales[style] || scales.ambient;
    let i = 0;
    const playNote = () => {
      if (!this.bgmRunning || !this.enabled) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = style === 'ming' ? 'triangle' : 'sine';
      osc.frequency.value = notes[i % notes.length];
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(this.bgmGain);
      osc.start();
      osc.stop(this.ctx.currentTime + 2);
      this.bgmNodes.push(osc);
      i++;
      this._bgmTimer = setTimeout(playNote, 1800);
    };
    playNote();
  }

  stopBGM() {
    this.bgmRunning = false;
    clearTimeout(this._bgmTimer);
    this.bgmNodes.forEach(n => { try { n.stop(); } catch(e) {} });
    this.bgmNodes = [];
  }

  _tone(freq, dur, type, dest, vol) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.setValueAtTime(vol || 0.15, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    o.connect(g);
    g.connect(dest || this.sfxGain);
    o.start();
    o.stop(this.ctx.currentTime + dur);
  }
}

// 全局音频引擎实例
const audioEngine = new AudioEngine();

// 兼容旧接口
function toggleAudio() { audioEngine.toggle(); }
function playClick() { audioEngine.play('click'); }
function playDebt() { audioEngine.play('debt'); }
function playEnding() { audioEngine.play('ending'); }
function playScroll() { audioEngine.play('scroll'); }
function playChannelLost() { audioEngine.play('channelLost'); }
function startBGM(style) { audioEngine.startBGM(style); }
function stopBGM() { audioEngine.stopBGM(); }

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

// --- 结果闪字 ---
function showResultFlash(text) {
  let flash = document.getElementById('resultFlash');
  if (!flash) {
    flash = document.createElement('div');
    flash.id = 'resultFlash';
    flash.className = 'result-flash';
    document.body.appendChild(flash);
  }
  flash.textContent = text;
  flash.style.opacity = '1';
  flash.style.transform = 'translate(-50%, -50%) scale(1)';
  setTimeout(() => {
    flash.style.opacity = '0';
    flash.style.transform = 'translate(-50%, -50%) scale(0.95)';
  }, 2500);
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
  showResultFlash('消息渠道 -1');
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
  audioEngine.play('ink');
  setTimeout(() => splash.remove(), 2000);
}

// --- 键盘快捷键 ---
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const gs = document.getElementById('game-screen');
    if (gs.classList.contains('active')) confirmExit();
  }
});
