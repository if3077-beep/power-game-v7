/**
 * MiroFish v9 - 主应用
 * 去emoji / 深色主题 / 分析引擎集成 / 动效增强
 */

class App {
  constructor() {
    this.engine = new PredictionEngine();
    this.selectedMood = null;
    this.selectedFactors = new Set();
    this.currentPhase = 'input';
    this.lastResult = null;
    this.insightTimer = null;
    this.twistState = { optimistic: false, neutral: false, pessimistic: false };
    this.voteData = this.loadVoteData();
    this.journal = this.loadJournal();

    this.init();
  }

  init() {
    this.setupBgCanvas();
    this.setupCursorGlow();
    this.setupInspiration();
    this.setupScenes();
    this.setupInput();
    this.setupMood();
    this.setupSliders();
    this.setupFactors();
    this.setupNav();
    this.setupExport();
    this.setupRandomDilemma();
    this.setupTypewriterSounds();
  }

  // ===== 背景粒子（琥珀色，带连线） =====
  setupBgCanvas() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.12, vy: (Math.random() - 0.5) * 0.12,
        r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.06 + 0.01
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 110, ${p.a})`;
        ctx.fill();
      });
      // 连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(201, 169, 110, ${0.015 * (1 - d / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    };
    draw();
  }

  // ===== 鼠标光晕 =====
  setupCursorGlow() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // ===== 打字音效 =====
  setupTypewriterSounds() {
    const textarea = document.getElementById('userInput');
    if (!textarea) return;
    let lastType = 0;
    textarea.addEventListener('input', () => {
      const now = Date.now();
      if (now - lastType > 60) {
        audioSystem.play('typewriter');
        lastType = now;
      }
    });
  }

  // ===== 每日灵感 =====
  setupInspiration() {
    const today = new Date();
    const idx = (today.getFullYear() * 366 + today.getMonth() * 31 + today.getDate()) % DAILY_QUOTES.length;
    const quote = DAILY_QUOTES[idx];
    document.getElementById('inspirationText').textContent = quote.text;
    const authorEl = document.getElementById('inspirationAuthor');
    if (authorEl) authorEl.textContent = quote.author;
  }

  // ===== 场景轮播 =====
  setupScenes() {
    const track = document.getElementById('sceneTrack');
    document.querySelectorAll('.scene-card').forEach(card => {
      card.addEventListener('click', () => {
        document.getElementById('userInput').value = card.dataset.text;
        this.updateInputState();
        if (card.dataset.mood) {
          this.selectedMood = card.dataset.mood;
          document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
          const chip = document.querySelector(`.mood-chip[data-mood="${card.dataset.mood}"]`);
          if (chip) chip.classList.add('selected');
        }
        audioSystem.play('click');
      });
    });

    // 自动滚动
    let dir = 1;
    let auto = setInterval(() => {
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) dir = -1;
      if (track.scrollLeft <= 0) dir = 1;
      track.scrollBy({ left: dir * 0.5, behavior: 'auto' });
    }, 30);
    track.addEventListener('mouseenter', () => clearInterval(auto));
    track.addEventListener('mouseleave', () => {
      auto = setInterval(() => {
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) dir = -1;
        if (track.scrollLeft <= 0) dir = 1;
        track.scrollBy({ left: dir * 0.5, behavior: 'auto' });
      }, 30);
    });
  }

  // ===== 输入 =====
  setupInput() {
    const textarea = document.getElementById('userInput');
    textarea.addEventListener('input', () => this.updateInputState());

    document.getElementById('btnNext').addEventListener('click', () => {
      if (textarea.value.trim()) {
        audioSystem.play('transition');
        this.goToPhase('calibrate');
        this.analyzeInput();
      }
    });
  }

  updateInputState() {
    const ta = document.getElementById('userInput');
    document.getElementById('btnNext').disabled = ta.value.trim().length === 0;
  }

  // ===== 随机困境 =====
  setupRandomDilemma() {
    const btn = document.getElementById('btnRandomDilemma');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const dilemma = RANDOM_DILEMMAS[Math.floor(Math.random() * RANDOM_DILEMMAS.length)];
      document.getElementById('userInput').value = dilemma;
      this.updateInputState();
      audioSystem.play('click');
    });
  }

  // ===== 情绪 =====
  setupMood() {
    document.querySelectorAll('.mood-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        this.selectedMood = chip.dataset.mood;
        audioSystem.play('select');
      });
    });
  }

  // ===== 滑块 =====
  setupSliders() {
    const sliders = [
      { id: 'slScope', valId: 'valScope', labels: SCOPE_LABELS },
      { id: 'slIntensity', valId: 'valIntensity', labels: INTENSITY_LABELS },
      { id: 'slTime', valId: 'valTime', labels: TIME_LABELS },
      { id: 'slUncertainty', valId: 'valUncertainty', labels: UNCERTAINTY_LABELS },
    ];
    sliders.forEach(s => {
      const el = document.getElementById(s.id);
      const val = document.getElementById(s.valId);
      el.addEventListener('input', () => { val.textContent = s.labels[el.value]; });
    });
  }

  // ===== 因素 =====
  setupFactors() {
    document.querySelectorAll('.factor-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const f = chip.dataset.factor;
        if (this.selectedFactors.has(f)) {
          this.selectedFactors.delete(f);
          chip.classList.remove('selected');
        } else {
          this.selectedFactors.add(f);
          chip.classList.add('selected');
        }
        audioSystem.play('click');
      });
    });
  }

  // ===== 分析输入 =====
  analyzeInput() {
    const text = document.getElementById('userInput').value;
    const keywords = this.engine.extractKeywords(text);

    document.getElementById('keywordCloud').innerHTML = keywords.map(k =>
      `<span class="keyword-tag">${k.tag} · ${k.words.join('、')}</span>`
    ).join('');

    this.selectedFactors.clear();
    document.querySelectorAll('.factor-chip').forEach(c => c.classList.remove('selected'));
    const autoMap = {
      media: /朋友圈|微博|抖音|群里|社交/,
      family: /父母|家人|亲戚|家庭/,
      peer: /同事|朋友|同学|大家/,
      money: /钱|工资|投资|房贷|亏|赚/,
      reputation: /面子|别人怎么看|丢人/,
      time: /急|赶|截止|来不及|马上/,
      health: /身体|健康|生病|失眠|疲劳/,
    };
    for (const [f, re] of Object.entries(autoMap)) {
      if (re.test(text)) {
        this.selectedFactors.add(f);
        const chip = document.querySelector(`.factor-chip[data-factor="${f}"]`);
        if (chip) chip.classList.add('selected');
      }
    }
  }

  // ===== 导航 =====
  setupNav() {
    document.getElementById('btnBack').addEventListener('click', () => {
      audioSystem.play('click');
      this.goToPhase('input');
    });

    document.getElementById('btnStart').addEventListener('click', () => {
      this.startSimulation();
    });

    document.getElementById('btnNew').addEventListener('click', () => {
      audioSystem.play('click');
      this.reset();
      this.goToPhase('input');
    });

    // 音频开关
    const audioBtn = document.getElementById('btnAudio');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const on = audioSystem.toggle();
        audioBtn.textContent = on ? '音效：开' : '音效：关';
        audioBtn.classList.toggle('muted', !on);
      });
    }
  }

  // ===== 加载洞察轮播 =====
  startInsightRotation() {
    const container = document.getElementById('loadingInsights');
    if (!container) return;
    container.innerHTML = '';
    let idx = Math.floor(Math.random() * LOADING_INSIGHTS.length);

    const show = () => {
      const insight = LOADING_INSIGHTS[idx % LOADING_INSIGHTS.length];
      container.innerHTML = `<div class="loading-insight"><span>${insight.text}</span></div>`;
      idx++;
    };
    show();
    this.insightTimer = setInterval(show, 4000);
  }

  stopInsightRotation() {
    if (this.insightTimer) { clearInterval(this.insightTimer); this.insightTimer = null; }
  }

  // ===== 推演 =====
  async startSimulation() {
    const text = document.getElementById('userInput').value;
    const mood = this.selectedMood || 'neutral';
    const scope = parseInt(document.getElementById('slScope').value);
    const intensity = parseInt(document.getElementById('slIntensity').value);
    const timeScale = parseInt(document.getElementById('slTime').value);
    const uncertainty = parseInt(document.getElementById('slUncertainty').value);
    const factors = [...this.selectedFactors];

    audioSystem.play('scan');
    audioSystem.startAmbient(mood);
    this.goToPhase('simulate');

    document.getElementById('simEngine').textContent = this.engine.useAI ? 'AI 引擎' : '本地引擎';

    const stepsEl = document.getElementById('simSteps');
    stepsEl.innerHTML = '';
    document.getElementById('empathyText').textContent = '';
    document.getElementById('simProgressBar').style.width = '0%';

    // 激活扫描线
    document.querySelector('.scanline')?.classList.add('active');

    this.startInsightRotation();

    try {
      const result = await this.engine.run(text, mood, scope, intensity, timeScale, uncertainty, factors,
        (step, msg, progress) => {
          document.getElementById('simProgressBar').style.width = progress + '%';

          const stepEl = document.createElement('div');
          stepEl.className = 'sim-step active';
          stepEl.innerHTML = `<span class="sim-step-icon">...</span><span>${msg}</span>`;
          stepsEl.appendChild(stepEl);

          const prev = stepsEl.querySelectorAll('.sim-step');
          if (prev.length > 1) {
            const p = prev[prev.length - 2];
            p.classList.remove('active');
            p.classList.add('done');
            p.querySelector('.sim-step-icon').textContent = '+';
          }

          audioSystem.play('progress');
        }
      );

      this.lastResult = result;
      this.twistState = { optimistic: false, neutral: false, pessimistic: false };

      const allSteps = stepsEl.querySelectorAll('.sim-step');
      if (allSteps.length > 0) {
        const last = allSteps[allSteps.length - 1];
        last.classList.remove('active');
        last.classList.add('done');
        last.querySelector('.sim-step-icon').textContent = '+';
      }

      if (result.empathy) {
        document.getElementById('empathyText').textContent = result.empathy;
      }

      await this.delay(800);
      this.stopInsightRotation();
      document.querySelector('.scanline')?.classList.remove('active');
      audioSystem.stopAmbient();
      this.showResult(result);

    } catch (err) {
      console.error('推演失败:', err);
      this.stopInsightRotation();
      document.querySelector('.scanline')?.classList.remove('active');
      audioSystem.stopAmbient();
      audioSystem.play('error');
      this.showToast('推演出错，请重试');
      this.goToPhase('input');
    }
  }

  // ===== 显示结果 =====
  showResult(result) {
    audioSystem.play('reveal');
    this.goToPhase('result');

    // 解析洞察
    if (result.parsed) {
      const p = result.parsed;
      document.getElementById('parsedInsights').innerHTML = `
        <div class="parsed-insight-row">
          <span class="parsed-insight-label">你怕的是</span>
          <span class="parsed-insight-value ${p.fear ? '' : 'empty'}">${p.fear || '未提及'}</span>
        </div>
        <div class="parsed-insight-row">
          <span class="parsed-insight-label">你想要的是</span>
          <span class="parsed-insight-value ${p.hope ? '' : 'empty'}">${p.hope || '未提及'}</span>
        </div>
        <div class="parsed-insight-row">
          <span class="parsed-insight-label">内心的矛盾</span>
          <span class="parsed-insight-value ${p.contradiction ? '' : 'empty'}">${p.contradiction || '未提及'}</span>
        </div>
      `;
    }

    document.getElementById('empathyBubble').textContent = result.empathy || '';

    document.getElementById('probOptimistic').textContent = result.optimistic.probability + '%';
    document.getElementById('probNeutral').textContent = result.neutral.probability + '%';
    document.getElementById('probPessimistic').textContent = result.pessimistic.probability + '%';

    this.renderPath('pathOptimistic', result.optimistic, 'optimistic');
    this.renderPath('pathNeutral', result.neutral, 'neutral');
    this.renderPath('pathPessimistic', result.pessimistic, 'pessimistic');

    // 建议
    document.getElementById('adviceList').innerHTML = result.advice.map((a, i) => `
      <div class="advice-card">
        <span class="advice-num">${i + 1}</span>
        <span class="advice-text">${a.text}</span>
      </div>
    `).join('');

    // 心理学洞察
    if (result.psychology) {
      document.getElementById('insightCard').innerHTML = `
        <div class="insight-header">
          <span class="insight-icon">P</span>
          <span class="insight-title">${result.psychology.title}</span>
        </div>
        <div class="insight-content">${result.psychology.content}</div>
      `;
    }

    // 三联阅读卡片
    if (result.readingCards) {
      const iconMap = { quote: 'Q', history: 'H', psychology: 'P' };
      document.getElementById('readingCards').innerHTML = result.readingCards.map(c => `
        <div class="reading-card">
          <div class="reading-card-header">
            <span class="reading-card-icon ${c.type}">${iconMap[c.type] || '?'}</span>
            <span class="reading-card-type">${c.title}</span>
          </div>
          <div class="reading-card-content">${c.content}</div>
          ${c.source ? `<div class="reading-card-source">${c.source}</div>` : ''}
        </div>
      `).join('');
    }

    // 统计卡片
    if (result.stats) {
      document.getElementById('statsGrid').innerHTML = result.stats.map(s => `
        <div class="stat-card">
          <div class="stat-value">${s.value}</div>
          <div class="stat-label">${s.label}</div>
          <div class="stat-desc">${s.desc}</div>
        </div>
      `).join('');
    }

    // 渲染分析引擎结果
    if (result.analysis) {
      this.renderAnalysis(result.analysis);
    }

    // 弹出投票
    setTimeout(() => this.showVotePopup(result), 1500);

    // 保存到决策日记
    this.saveToJournal(result);
  }

  // ===== 渲染分析引擎结果 =====
  renderAnalysis(analysis) {
    const container = document.getElementById('analysisSection');
    if (!container) return;

    let html = '';

    // 推理链
    if (analysis.chain && analysis.chain.length > 0) {
      html += '<div class="section-block"><h3 class="section-title">推理链</h3><div class="analysis-chain">';
      analysis.chain.forEach((step, i) => {
        html += `
          <div class="chain-step" style="animation-delay:${i * 0.15}s">
            <div class="chain-step-num">${i + 1}</div>
            <div>
              <div class="chain-step-label">${step.label}</div>
              <div class="chain-step-content">${step.content}</div>
              ${step.sub ? `<div class="chain-step-sub">${step.sub}</div>` : ''}
            </div>
          </div>
        `;
      });
      html += '</div></div>';
    }

    // 框架洞察
    if (analysis.frameworks && analysis.frameworks.length > 0) {
      html += '<div class="section-block"><h3 class="section-title">多维透视</h3><div class="analysis-frameworks">';
      analysis.frameworks.forEach(fw => {
        if (fw.insights.length === 0) return;
        html += `<div class="analysis-fw-card">
          <div class="analysis-fw-header"><span class="analysis-fw-name">${fw.name}</span></div>`;
        fw.insights.forEach(insight => {
          html += `<div class="analysis-fw-insight severity-${insight.severity}">${insight.text}</div>`;
        });
        html += '</div>';
      });
      html += '</div></div>';
    }

    // 选项评分
    if (analysis.options && analysis.options.length > 0) {
      html += '<div class="section-block"><h3 class="section-title">选项评估</h3><div class="analysis-options">';
      analysis.options.forEach((opt, i) => {
        const rankClass = i === 0 ? 'best' : (i === analysis.options.length - 1 ? 'worst' : '');
        html += `<div class="analysis-option ${rankClass}">
          <div class="analysis-option-header">
            <span class="analysis-option-rank">#${i + 1}</span>
            <span class="analysis-option-text">${opt.text}</span>
            <span class="analysis-option-score">${opt.total > 0 ? '+' : ''}${opt.total}</span>
          </div>
          <div class="analysis-option-bars">`;

        opt.scores.forEach(score => {
          const barWidth = Math.max(5, ((score.score + 3) / 8) * 100);
          const barColor = score.score > 1 ? 'var(--green)' : score.score < -1 ? 'var(--red)' : 'var(--yellow)';
          html += `<div class="analysis-bar-row">
            <span class="analysis-bar-label">${score.dim}</span>
            <div class="analysis-bar-bg"><div class="analysis-bar-fill" style="width:${barWidth}%;background:${barColor}"></div></div>
            <span class="analysis-bar-val">${score.score > 0 ? '+' : ''}${score.score}</span>
          </div>`;
        });

        html += '</div></div>';
      });
      html += '</div></div>';
    }

    // 张力
    if (analysis.tensions && analysis.tensions.length > 0) {
      html += '<div class="section-block"><h3 class="section-title">核心张力</h3><div class="analysis-tensions">';
      analysis.tensions.forEach(t => {
        html += `<div class="analysis-tension">
          <div class="analysis-tension-label">${t.label}</div>
          <div class="analysis-tension-text">${t.text}</div>
        </div>`;
      });
      html += '</div></div>';
    }

    container.innerHTML = html;
  }

  renderPath(containerId, path, pathType) {
    const el = document.getElementById(containerId);
    let html = '';

    html += `<div class="path-section">
      <div class="path-section-title">走向概述</div>
      <div class="path-section-content">${path.title}</div>
    </div>`;

    if (path.driving_factors && path.driving_factors.length) {
      html += `<div class="path-section">
        <div class="path-section-title">核心驱动因素</div>
        <ul class="path-section-list">${path.driving_factors.map(f => `<li>${f}</li>`).join('')}</ul>
      </div>`;
    }

    if (path.timeline && path.timeline.length) {
      html += `<div class="path-section">
        <div class="path-section-title">关键发展节点</div>
        <ul class="path-section-list">${path.timeline.map(t => `<li><strong>${t.period}：</strong>${t.event}</li>`).join('')}</ul>
      </div>`;
    }

    if (path.chain_effects && path.chain_effects.length) {
      html += `<div class="path-section">
        <div class="path-section-title">连锁影响</div>
        <ul class="path-section-list">${path.chain_effects.map(e => `<li>${e}</li>`).join('')}</ul>
      </div>`;
    }

    if ((path.opportunities && path.opportunities.length) || (path.risks && path.risks.length)) {
      html += `<div class="path-section">`;
      if (path.opportunities && path.opportunities.length) {
        html += `<div class="path-section-title">潜在机遇</div>
          <ul class="path-section-list">${path.opportunities.map(o => `<li>${o}</li>`).join('')}</ul>`;
      }
      if (path.risks && path.risks.length) {
        html += `<div class="path-section-title">潜在风险</div>
          <ul class="path-section-list">${path.risks.map(r => `<li>${r}</li>`).join('')}</ul>`;
      }
      html += `</div>`;
    }

    if (path.stakeholders && path.stakeholders.length) {
      html += `<div class="path-section">
        <div class="path-section-title">各方立场</div>
        <div class="path-stakeholders">
          ${path.stakeholders.map(s => `
            <div class="stakeholder">
              <span class="stakeholder-role">${s.role}</span>
              <span class="stakeholder-view">${s.view}</span>
            </div>
          `).join('')}
        </div>
      </div>`;
    }

    el.innerHTML = html;

    // 绑定毒舌按钮
    const btn = document.getElementById(`twist${pathType.charAt(0).toUpperCase() + pathType.slice(1)}`);
    if (btn) {
      btn.onclick = () => this.toggleTwist(pathType);
    }
  }

  // ===== 毒舌转折 =====
  toggleTwist(pathType) {
    if (!this.lastResult) return;
    const twists = this.lastResult.twists || TWIST_REPLACEMENTS.default;
    const btn = document.getElementById(`twist${pathType.charAt(0).toUpperCase() + pathType.slice(1)}`);

    if (!this.twistState[pathType]) {
      const twistText = twists[Math.floor(Math.random() * twists.length)];
      const pathBody = document.getElementById(`path${pathType.charAt(0).toUpperCase() + pathType.slice(1)}`);
      const lastLi = pathBody.querySelector('.path-section:last-child .path-section-list li:last-child');
      if (lastLi) {
        lastLi.dataset.original = lastLi.innerHTML;
        lastLi.innerHTML = `<em style="color:var(--red)">${twistText}</em>`;
      }
      this.twistState[pathType] = true;
      if (btn) btn.classList.add('active');
      audioSystem.play('warning');
    } else {
      const pathBody = document.getElementById(`path${pathType.charAt(0).toUpperCase() + pathType.slice(1)}`);
      const lastLi = pathBody.querySelector('.path-section:last-child .path-section-list li:last-child');
      if (lastLi && lastLi.dataset.original) {
        lastLi.innerHTML = lastLi.dataset.original;
      }
      this.twistState[pathType] = false;
      if (btn) btn.classList.remove('active');
      audioSystem.play('click');
    }
  }

  // ===== 投票 =====
  loadVoteData() {
    try { return JSON.parse(localStorage.getItem('mf_vote_data') || '{}'); } catch (e) { return {}; }
  }

  saveVoteData() {
    try { localStorage.setItem('mf_vote_data', JSON.stringify(this.voteData)); } catch (e) {}
  }

  showVotePopup(result) {
    const overlay = document.createElement('div');
    overlay.className = 'vote-overlay';
    overlay.innerHTML = `
      <div class="vote-modal">
        <div class="vote-title">你觉得最可能发生的是哪条？</div>
        <div class="vote-options">
          <button class="vote-option" data-path="optimistic">
            <span class="vote-option-dot" style="background:var(--green)"></span>
            <span>乐观路径 (${result.optimistic.probability}%)</span>
          </button>
          <button class="vote-option" data-path="neutral">
            <span class="vote-option-dot" style="background:var(--yellow)"></span>
            <span>中性路径 (${result.neutral.probability}%)</span>
          </button>
          <button class="vote-option" data-path="pessimistic">
            <span class="vote-option-dot" style="background:var(--red)"></span>
            <span>悲观路径 (${result.pessimistic.probability}%)</span>
          </button>
        </div>
        <div id="voteResults" style="display:none">
          <div class="vote-result-bar"><div class="vote-result-fill" id="voteResultFill"></div></div>
          <div class="vote-result-label" id="voteResultLabel"></div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    audioSystem.play('click');

    overlay.querySelectorAll('.vote-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const path = opt.dataset.path;
        this.voteData[path] = (this.voteData[path] || 0) + 1;
        this.saveVoteData();

        overlay.querySelectorAll('.vote-option').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');

        const total = Object.values(this.voteData).reduce((a, b) => a + b, 0);
        const results = document.getElementById('voteResults');
        const fill = document.getElementById('voteResultFill');
        const label = document.getElementById('voteResultLabel');

        results.style.display = 'block';
        const pct = Math.round(((this.voteData[path] || 0) / total) * 100);
        fill.style.width = pct + '%';
        fill.style.background = path === 'optimistic' ? 'var(--green)' : path === 'neutral' ? 'var(--yellow)' : 'var(--red)';
        label.textContent = `${pct}% 的人选了这条 (共 ${total} 人投票)`;

        audioSystem.play('select');

        setTimeout(() => {
          overlay.style.opacity = '0';
          overlay.style.transition = 'opacity 0.3s';
          setTimeout(() => overlay.remove(), 300);
        }, 2000);
      });
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.3s';
        setTimeout(() => overlay.remove(), 300);
      }
    });
  }

  // ===== 决策日记 =====
  loadJournal() {
    try { return JSON.parse(localStorage.getItem('mf_v9_journal') || '[]'); } catch (e) { return []; }
  }

  saveToJournal(result) {
    try {
      this.journal.unshift({
        text: document.getElementById('userInput').value,
        mood: this.selectedMood || 'neutral',
        time: new Date().toLocaleString('zh-CN'),
        optimistic: result.optimistic.title,
        neutral: result.neutral.title,
        pessimistic: result.pessimistic.title,
        domain: result.domain,
      });
      if (this.journal.length > 50) this.journal.length = 50;
      localStorage.setItem('mf_v9_journal', JSON.stringify(this.journal));
    } catch (e) {}
  }

  // ===== 导出 =====
  setupExport() {
    document.getElementById('btnExport').addEventListener('click', () => {
      if (!this.lastResult) return;
      this.exportShareImage();
    });

    document.getElementById('btnShare').addEventListener('click', () => {
      if (!this.lastResult) return;
      const r = this.lastResult;
      const p = r.parsed || {};
      const share = `MiroFish 未来推演\n\n${p.fear ? '你怕的是：' + p.fear + '\n' : ''}${p.hope ? '你想要的是：' + p.hope + '\n' : ''}${p.contradiction ? '内心的矛盾：' + p.contradiction + '\n' : ''}\n${r.empathy}\n\n乐观 ${r.optimistic.probability}%：${r.optimistic.title}\n中性 ${r.neutral.probability}%：${r.neutral.title}\n悲观 ${r.pessimistic.probability}%：${r.pessimistic.title}\n\n-- MiroFish v9`;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(share).then(() => {
          audioSystem.play('success');
          this.showToast('已复制到剪贴板');
        });
      }
    });
  }

  exportShareImage() {
    const r = this.lastResult;
    const p = r.parsed || {};

    const canvas = document.createElement('canvas');
    const dpr = 2;
    const W = 375;
    const tempH = 2000;
    canvas.width = W * dpr;
    canvas.height = tempH * dpr;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // 深色背景
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, W, tempH);

    let Y = 30;

    // 标题
    ctx.fillStyle = '#e8e4de';
    ctx.font = 'bold 18px "Inter", "Noto Serif SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('MiroFish 未来推演', W / 2, Y += 30);

    ctx.fillStyle = '#5a5550';
    ctx.font = '10px "Inter", sans-serif';
    ctx.fillText(new Date().toLocaleDateString('zh-CN'), W / 2, Y += 16);
    Y += 10;

    // 解析洞察
    if (p.fear || p.hope || p.contradiction) {
      ctx.fillStyle = 'rgba(255,255,255,0.04)';
      this.roundRect(ctx, 20, Y, W - 40, 70, 4);
      ctx.fill();
      ctx.fillStyle = '#a09890';
      ctx.font = '11px "Inter", "Noto Serif SC", sans-serif';
      ctx.textAlign = 'left';
      if (p.fear) ctx.fillText('你怕的是：' + p.fear, 28, Y += 18);
      if (p.hope) ctx.fillText('你想要的是：' + p.hope, 28, Y += 18);
      if (p.contradiction) ctx.fillText('内心的矛盾：' + p.contradiction, 28, Y += 18);
      Y += 20;
    }

    // 共鸣
    ctx.fillStyle = '#e8e4de';
    ctx.font = '12px "Inter", "Noto Serif SC", sans-serif';
    ctx.textAlign = 'left';
    const empathyLines = this.wrapText(ctx, r.empathy, W - 48);
    empathyLines.forEach(line => { ctx.fillText(line, 24, Y += 18); });
    Y += 15;

    // 三路径
    const pathData = [
      { name: '乐观', prob: r.optimistic.probability, title: r.optimistic.title, color: '#6b8f71' },
      { name: '中性', prob: r.neutral.probability, title: r.neutral.title, color: '#b8a04e' },
      { name: '悲观', prob: r.pessimistic.probability, title: r.pessimistic.title, color: '#c45c4a' },
    ];

    pathData.forEach(p => {
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      this.roundRect(ctx, 20, Y, W - 40, 50, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      this.roundRect(ctx, 20, Y, W - 40, 50, 4);
      ctx.stroke();

      ctx.fillStyle = p.color;
      ctx.fillRect(20, Y, 3, 50);

      ctx.font = 'bold 12px "Inter", "Noto Serif SC", sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(p.name + '路径', 30, Y + 18);
      ctx.textAlign = 'right';
      ctx.fillText(p.prob + '%', W - 30, Y + 18);

      ctx.fillStyle = '#a09890';
      ctx.font = '11px "Inter", "Noto Serif SC", sans-serif';
      ctx.textAlign = 'left';
      const titleLines = this.wrapText(ctx, p.title, W - 68);
      titleLines.slice(0, 2).forEach((line, i) => { ctx.fillText(line, 30, Y + 36 + i * 14); });

      Y += 58;
    });

    Y += 10;

    // 免责
    ctx.fillStyle = '#5a5550';
    ctx.font = '9px "Inter", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('推演基于你的输入生成，不构成现实建议', W / 2, Y += 12);
    ctx.fillText('MiroFish v9', W / 2, Y += 14);

    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = W * dpr;
    finalCanvas.height = (Y + 30) * dpr;
    const finalCtx = finalCanvas.getContext('2d');
    finalCtx.drawImage(canvas, 0, 0);

    const url = finalCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `mirofish-${Date.now()}.png`;
    a.click();
    audioSystem.play('success');
    this.showToast('截图已保存');
  }

  wrapText(ctx, text, maxWidth) {
    const lines = [];
    let line = '';
    for (const char of text) {
      const test = line + char;
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(line);
        line = char;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  // ===== 工具 =====
  showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  goToPhase(name) {
    document.querySelectorAll('.phase').forEach(p => p.classList.remove('active'));
    document.getElementById(`phase${name.charAt(0).toUpperCase() + name.slice(1)}`).classList.add('active');
    this.currentPhase = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  reset() {
    this.selectedMood = null;
    this.selectedFactors.clear();
    this.lastResult = null;
    this.twistState = { optimistic: false, neutral: false, pessimistic: false };
    document.querySelectorAll('.mood-chip').forEach(c => c.classList.remove('selected'));
    document.querySelectorAll('.factor-chip').forEach(c => c.classList.remove('selected'));
    document.getElementById('userInput').value = '';
    this.updateInputState();
    const analysisSection = document.getElementById('analysisSection');
    if (analysisSection) analysisSection.innerHTML = '';
  }

  delay(ms) { return new Promise(r => setTimeout(r, ms)); }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
