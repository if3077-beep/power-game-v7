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
    if (this.color) {
      pCtx.fillStyle = this.color.replace(')', `,${a})`).replace('rgb(', 'rgba(');
    } else {
      pCtx.fillStyle = `rgba(201,169,110,${a})`;
    }
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

// --- 音频系统（AudioEngine）V8 ---
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.bgmGain = null;
    this.sfxGain = null;
    this.reverbNode = null;
    this.reverbGain = null;
    this.enabled = false;
    this.bgmRunning = false;
    this._bgmTimer = null;
    this._bgmStep = 0;
    this._bgmStyle = null;
  }

  init() {
    if (this.ctx) { this.ctx.resume(); return; }
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.ctx.resume();
    this.master = this.ctx.createGain();
    this.master.gain.value = 0.8;
    this.master.connect(this.ctx.destination);
    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.55;
    this.bgmGain.connect(this.master);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.9;
    this.sfxGain.connect(this.master);
    // 延迟混响（模拟空间感）
    this.reverbGain = this.ctx.createGain();
    this.reverbGain.gain.value = 0.25;
    this.reverbGain.connect(this.master);
  }

  enable() {
    this.init();
    this.enabled = true;
    const btn = document.getElementById('audioBtn');
    if (btn) btn.classList.remove('muted');
  }

  toggle() {
    this.init();
    this.enabled = !this.enabled;
    const btn = document.getElementById('audioBtn');
    if (btn) btn.classList.toggle('muted', !this.enabled);
    if (!this.enabled) this.stopBGM();
    return this.enabled;
  }

  // --- V8: 增强音效 ---
  play(type) {
    if (!this.enabled || !this.ctx) return;
    const t = this.ctx.currentTime;
    const sounds = {
      click: () => {
        this._tone(1200, 0.06, 'sine', this.sfxGain, 0.4);
        this._tone(1800, 0.04, 'sine', this.sfxGain, 0.2);
      },
      debt: () => {
        this._tone(280, 0.35, 'triangle', this.sfxGain, 0.5);
        setTimeout(() => this._tone(220, 0.3, 'triangle', this.sfxGain, 0.35), 150);
        setTimeout(() => this._tone(165, 0.4, 'triangle', this.sfxGain, 0.2), 300);
      },
      scene: () => {
        this._tone(392, 0.25, 'sine', this.sfxGain, 0.35);
        setTimeout(() => this._tone(523, 0.3, 'sine', this.sfxGain, 0.25), 120);
        this._delay(392, 0.5, 0.15);
      },
      ending: () => {
        this._tone(392, 0.5, 'sine', this.sfxGain, 0.45);
        setTimeout(() => this._tone(523, 0.5, 'sine', this.sfxGain, 0.35), 300);
        setTimeout(() => this._tone(659, 0.6, 'sine', this.sfxGain, 0.3), 600);
        setTimeout(() => this._tone(784, 1.0, 'sine', this.sfxGain, 0.25), 900);
        this._delay(523, 1.5, 0.15);
      },
      ink: () => {
        this._noise(0.3, 0.25);
        this._tone(120, 0.45, 'sawtooth', this.sfxGain, 0.2);
      },
      success: () => {
        this._tone(523, 0.2, 'sine', this.sfxGain, 0.4);
        setTimeout(() => this._tone(659, 0.2, 'sine', this.sfxGain, 0.3), 100);
        setTimeout(() => this._tone(784, 0.35, 'sine', this.sfxGain, 0.25), 200);
      },
      fail: () => {
        this._tone(330, 0.4, 'sawtooth', this.sfxGain, 0.35);
        setTimeout(() => this._tone(220, 0.55, 'sawtooth', this.sfxGain, 0.25), 200);
        this._delay(220, 1.0, 0.12);
      },
      scroll: () => {
        this._noise(0.15, 0.12);
        this._tone(180, 0.15, 'triangle', this.sfxGain, 0.2);
      },
      channelLost: () => {
        this._tone(180, 0.7, 'sawtooth', this.sfxGain, 0.35);
        setTimeout(() => this._tone(130, 0.9, 'sawtooth', this.sfxGain, 0.25), 300);
        this._delay(130, 1.2, 0.12);
      },
      zhongyong: () => {
        this._tone(523, 0.3, 'sine', this.sfxGain, 0.3);
        setTimeout(() => this._tone(440, 0.35, 'sine', this.sfxGain, 0.25), 200);
        setTimeout(() => this._tone(392, 0.4, 'sine', this.sfxGain, 0.2), 400);
        setTimeout(() => this._tone(349, 0.55, 'sine', this.sfxGain, 0.18), 600);
        this._delay(392, 1.0, 0.12);
      },
      dramatic: () => {
        this._tone(110, 0.6, 'sawtooth', this.sfxGain, 0.35);
        this._tone(165, 0.5, 'square', this.sfxGain, 0.15);
        setTimeout(() => this._tone(220, 0.5, 'triangle', this.sfxGain, 0.25), 250);
        this._delay(110, 1.2, 0.15);
      },
      choice_hover: () => {
        this._tone(600, 0.04, 'sine', this.sfxGain, 0.15);
      },
      chapter: () => {
        this._tone(261, 0.35, 'sine', this.sfxGain, 0.3);
        setTimeout(() => this._tone(329, 0.35, 'sine', this.sfxGain, 0.25), 200);
        setTimeout(() => this._tone(392, 0.55, 'sine', this.sfxGain, 0.2), 400);
        this._delay(329, 1.0, 0.1);
      },
    };
    (sounds[type] || sounds.click)();
  }

  // --- V8: BGM — 多声部 + 和声进行 ---
  startBGM(style) {
    if (!this.enabled || !this.ctx) return;
    if (this.bgmRunning) this.stopBGM();
    this.bgmRunning = true;
    this._bgmStyle = style;
    this._bgmStep = 0;

    const configs = {
      whitehouse: {
        // 白宫：小调式，紧张感，弦乐质感
        melody:  [220, 247, 261, 293, 330, 311, 293, 261, 247, 220, 196, 220],
        harmony: [110, 130, 130, 146, 165, 155, 146, 130, 130, 110,  98, 110],
        bass:    [55,  65,  65,  73,  82,  77,  73,  65,  65,  55,  49,  55],
        wave: 'triangle',
        harmWave: 'sine',
        tempo: 2200,
        melVol: 0.28,
        harmVol: 0.14,
        bassVol: 0.18,
      },
      ming: {
        // 大明：五声调式，古风，空灵感
        melody:  [261, 293, 329, 392, 440, 523, 440, 392, 329, 293, 261, 220],
        harmony: [130, 146, 165, 196, 220, 261, 220, 196, 165, 146, 130, 110],
        bass:    [65,  73,  82,  98, 110, 130, 110,  98,  82,  73,  65,  55],
        wave: 'sine',
        harmWave: 'triangle',
        tempo: 2600,
        melVol: 0.25,
        harmVol: 0.12,
        bassVol: 0.16,
      },
    };
    const cfg = configs[style] || configs.whitehouse;
    const len = cfg.melody.length;

    const step = () => {
      if (!this.bgmRunning || !this.enabled) return;
      const i = this._bgmStep % len;
      const now = this.ctx.currentTime;

      // 主旋律
      this._bgmOsc(cfg.melody[i], cfg.wave, cfg.melVol, cfg.tempo / 1000);
      // 和声（低八度）
      this._bgmOsc(cfg.harmony[i], cfg.harmWave, cfg.harmVol, cfg.tempo / 1000);
      // 低音
      this._bgmOsc(cfg.bass[i], 'sine', cfg.bassVol, cfg.tempo / 1000 + 0.5);

      this._bgmStep++;
      this._bgmTimer = setTimeout(step, cfg.tempo);
    };
    step();
  }

  _bgmOsc(freq, type, vol, dur) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    const now = this.ctx.currentTime;
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.1);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    o.connect(g);
    g.connect(this.bgmGain);
    // 同时送一点到混响
    g.connect(this.reverbGain);
    o.start(now);
    o.stop(now + dur + 0.1);
  }

  stopBGM() {
    this.bgmRunning = false;
    clearTimeout(this._bgmTimer);
  }

  // --- 底层方法 ---
  _tone(freq, dur, type, dest, vol) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    const now = this.ctx.currentTime;
    g.gain.setValueAtTime(vol || 0.15, now);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    o.connect(g);
    g.connect(dest || this.sfxGain);
    o.start(now);
    o.stop(now + dur + 0.01);
  }

  _delay(freq, dur, vol) {
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = 'sine';
    o.frequency.value = freq;
    const now = this.ctx.currentTime;
    g.gain.setValueAtTime(0.001, now);
    g.gain.linearRampToValueAtTime(vol || 0.03, now + 0.3);
    g.gain.exponentialRampToValueAtTime(0.001, now + dur);
    o.connect(g);
    g.connect(this.reverbGain);
    o.start(now);
    o.stop(now + dur + 0.01);
  }

  _noise(dur, vol) {
    const bufSize = this.ctx.sampleRate * dur;
    const buf = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const src = this.ctx.createBufferSource();
    src.buffer = buf;
    const g = this.ctx.createGain();
    const filt = this.ctx.createBiquadFilter();
    filt.type = 'lowpass';
    filt.frequency.value = 2000;
    g.gain.setValueAtTime(vol || 0.05, this.ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    src.connect(filt);
    filt.connect(g);
    g.connect(this.sfxGain);
    src.start();
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
  overlay.style.pointerEvents = 'all';
  overlay.classList.add('active');
  setTimeout(() => {
    callback();
    setTimeout(() => {
      overlay.classList.remove('active');
      overlay.style.pointerEvents = 'none';
    }, 100);
  }, 600);
}

// --- 涟漪效果 ---
function createRipple(e, el) {
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
  el.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
}

// --- 屏幕震击 ---
function screenShake(intensity) {
  const container = document.getElementById('sceneContainer');
  if (!container) return;
  const cls = intensity === 'heavy' ? 'shake-heavy' : intensity === 'light' ? 'shake-light' : 'shake-medium';
  container.classList.add(cls);
  setTimeout(() => container.classList.remove(cls), 600);
}

// --- 粒子爆发 ---
function particleBurst(x, y, color, count) {
  count = count || 12;
  for (let i = 0; i < count; i++) {
    const p = new Particle();
    p.x = x; p.y = y;
    p.speedX = (Math.random() - 0.5) * 3;
    p.speedY = (Math.random() - 0.5) * 3 - 1;
    p.size = Math.random() * 3 + 1;
    p.life = 60 + Math.random() * 40;
    p.maxLife = p.life;
    p.opacity = 0.8;
    particles.push(p);
  }
  // 清理多余粒子
  setTimeout(() => { if (particles.length > 200) particles = particles.slice(-100); }, 3000);
}

// --- 全屏闪光 ---
function flashScreen(color, duration) {
  const flash = document.createElement('div');
  flash.className = 'screen-flash';
  flash.style.background = color || 'rgba(201,169,110,0.15)';
  document.body.appendChild(flash);
  requestAnimationFrame(() => flash.classList.add('active'));
  setTimeout(() => { flash.classList.remove('active'); setTimeout(() => flash.remove(), 500); }, duration || 300);
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
