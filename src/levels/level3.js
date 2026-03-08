import { updateState, gameState } from '../state';
import { animateCSS, formatTime, shuffleOptions } from '../utils';
import confetti from 'canvas-confetti';
import { submitScore } from '../services/backend';

export const renderLevel3 = (container) => {
  let currentTask = 0; // 0 is door/key check
  let l3Marks = 0;

  const levelDiv = document.createElement('div');
  levelDiv.className = 'w-full max-w-4xl mx-auto horror-blink';
  container.appendChild(levelDiv);

  const renderHeader = (timerHtml = '') => `
    <div class="flex justify-between items-center mb-8 card !py-4 !px-8 glow-indigo border-red-500/20 bg-red-950/10">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-xl">
           ${currentTask === 0 ? '🔑' : currentTask === 1 ? '🔍' : currentTask === 2 ? '⚡' : '👾'}
        </div>
        <div>
          <h2 class="text-sm font-black text-red-500 uppercase tracking-tighter">Level 3: The Zenith</h2>
          <p class="text-[10px] text-slate-500 font-mono uppercase">${currentTask === 0 ? 'Restricted Access' : `Phase ${currentTask} of 3`}</p>
        </div>
      </div>
      <div class="flex items-center gap-6">
        ${timerHtml}
        <div id="status" class="text-xs font-black px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 tracking-widest animate-pulse">CRITICAL OVERRIDE</div>
      </div>
    </div>
  `;

  const renderKeyCheck = () => {
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-12 animate__animated animate__fadeIn">
        <div class="door-frame !border-red-900/50 !bg-red-950/20">
          <div class="absolute inset-0 bg-black rounded-inner z-0"></div>
          <div id="door-visual" class="haunted-door flex items-center justify-center">
            <div class="text-6xl animate-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">💀</div>
          </div>
        </div>
        <div class="text-center space-y-2">
            <h2 class="text-4xl font-black text-red-600 uppercase italic tracking-tighter">RESTRICTED TERMINAL</h2>
            <p class="text-slate-400 text-sm max-w-xs mx-auto font-mono uppercase tracking-tighter">Input Secret Key 2.</p>
        </div>
        <div class="w-full max-w-sm space-y-6 card !p-8 !bg-black/40 border-red-500/20">
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-red-900 uppercase tracking-[0.2em] ml-1">Authorization Code</label>
            <input type="text" id="l2-key-input" class="input-field text-center text-2xl font-mono tracking-[0.3em] !py-5 !bg-black/60 focus:!border-red-500 text-red-500" placeholder="••••••••">
          </div>
          <button id="verify-l2-key" class="btn-primary w-full !bg-red-700 !hover:bg-red-600 !border-red-500/30 shadow-red-500/30">
            <span>OVERRIDE LOCK</span>
          </button>
        </div>
      </div>
    `;

    const input = levelDiv.querySelector('#l2-key-input');
    const btn = levelDiv.querySelector('#verify-l2-key');
    const door = levelDiv.querySelector('#door-visual');
    const box = levelDiv.querySelector('#key-box');

    // Trigger box opening on focus or after a delay
    setTimeout(() => { if (box) box.classList.add('open'); }, 1000);

    const verify = () => {
      if (input.value.trim() === gameState.keys.l2) {
        window.removeEventListener('keypress', l3keyPress);
        btn.disabled = true;
        btn.innerText = "ACCESS GRANTED";
        door.classList.add('door-open');
        setTimeout(() => { animateCSS(levelDiv, 'fadeOut').then(renderBriefing); }, 1500);
      } else {
        animateCSS(levelDiv.querySelector('.card'), 'shakeX');
      }
    };
    const l3keyPress = (e) => { if (e.key === 'Enter') verify(); };

    btn.addEventListener('click', verify);
    input.addEventListener('keypress', l3keyPress);
    input.focus();
  };

  const renderBriefing = () => {
    currentTask = 0;
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="w-24 h-24 bg-red-600/20 border border-red-500/30 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl shadow-red-500/10">
            ☢️
        </div>
        <div class="text-center space-y-4">
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter">Mission Briefing: Zenith</h2>
            <div class="max-w-lg mx-auto p-6 card border-red-900/30 bg-black/40 space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>AUTHORIZATION GRANTED. Ultimate evaluation initialized:</p>
                <ul class="text-left space-y-2 list-disc list-inside text-xs font-mono">
                    <li><span class="text-red-500 font-bold">Dot Neutralizer</span>: 2-minute survival. 50 Marks.</li>
                    <li><span class="text-red-600 font-bold">Thunder Logic</span>: Case study under pressure.</li>
                    <li><span class="text-red-700 font-bold">Zenith Protocol</span>: 20 technical questions.</li>
                </ul>
                <p class="pt-2 border-t border-red-900/20 italic">The system is unstable. Thunder effects detected.</p>
            </div>
        </div>
        <button id="start-l3" class="btn-primary px-12 py-5 group !bg-red-700 !hover:bg-red-600">
          <span>INITIALIZE ZENITH PROTOCOL</span>
        </button>
      </div>
    `;

    const startBtn = levelDiv.querySelector('#start-l3');
    const start = () => {
      animateCSS(levelDiv, 'fadeOut').then(renderTask1);
    };
    startBtn.addEventListener('click', start);
    window.addEventListener('keypress', function l3start(e) {
      if (e.key === 'Enter') {
        start();
        window.removeEventListener('keypress', l3start);
      }
    });
  };

  const renderTask1 = () => {
    currentTask = 1;
    let task1Timer = 120;

    levelDiv.innerHTML = `
      ${renderHeader('<span id="arena-timer" class="text-2xl font-black font-mono text-white bg-red-600 px-3 py-1 rounded-lg">120s</span>')}
      <div class="card h-[600px] !p-0 border-red-500/20 bg-black relative cursor-crosshair overflow-hidden animate__animated animate__fadeInUp" id="final-arena">
        <div id="arena-progress-bar" class="absolute top-0 left-0 h-1.5 bg-red-600 transition-all duration-100 shadow-[0_0_20px_#ff0000]" style="width: 100%"></div>
        <canvas id="matrix-canvas" class="absolute inset-0 opacity-40 pointer-events-none"></canvas>
        <div class="relative z-10 p-12 text-center h-full flex flex-col justify-between pointer-events-none">
          <div class="space-y-4">
            <h3 class="text-5xl font-black text-red-600 tracking-tighter uppercase italic drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">Algorithm Neutralizer</h3>
            <p class="text-slate-500 text-sm font-mono uppercase tracking-[0.2em]">NEUTRALIZE THE PIXEL. [VAL: 50 MARKS]</p>
          </div>
          
          <div class="bg-red-950/60 p-6 border border-red-500/50 text-red-500 font-mono text-[10px] text-left rounded-2xl backdrop-blur-md max-w-xs">
            <p class="animate-pulse">>> [WARNING] SYSTEM_OVERHEAT</p>
            <p>>> [CORE] SCORE: 50 MARKS POSSIBLE</p>
            <p>>> [TIMER] 120.0s REMAINING</p>
          </div>
        </div>

        <div id="boss-target" class="absolute w-8 h-8 pointer-events-auto bg-white rounded-full shadow-[0_0_50px_#ffffff] cursor-pointer" style="top: 50%; left: 50%;">
            <div class="absolute inset-0 animate-ping bg-white rounded-full opacity-70"></div>
        </div>
      </div>
    `;

    const timerDisplay = levelDiv.querySelector('#arena-timer');
    const arenaProgress = levelDiv.querySelector('#arena-progress-bar');
    const timerId = setInterval(() => {
      task1Timer--;
      timerDisplay.innerText = `${task1Timer}s`;
      arenaProgress.style.width = `${(task1Timer / 120) * 100}%`;
      if (task1Timer <= 0) {
        clearInterval(timerId);
        clearInterval(matrixInterval);
        clearInterval(targetInterval);
        renderTask2();
      }
    }, 1000);

    const canvas = levelDiv.querySelector('#matrix-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = levelDiv.querySelector('.card').offsetWidth;
    canvas.height = levelDiv.querySelector('.card').offsetHeight;
    const chars = "10";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = new Array(Math.floor(columns)).fill(1);

    const drawMatrix = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff0000";
      ctx.font = fontSize + "px monospace";
      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) drops[i] = 0;
        drops[i]++;
      }
    };
    const matrixInterval = setInterval(drawMatrix, 40);

    const target = levelDiv.querySelector('#boss-target');
    const arena = levelDiv.querySelector('#final-arena');

    let targetSpeed = 600; // Faster initial speed
    const moveTarget = () => {
      const maxX = arena.clientWidth - 40;
      const maxY = arena.clientHeight - 40;
      target.style.transition = `all ${targetSpeed}ms cubic-bezier(0.19, 1, 0.22, 1)`;
      target.style.left = `${Math.random() * maxX}px`;
      target.style.top = `${Math.random() * maxY}px`;
      targetSpeed = Math.max(80, targetSpeed - 30); // Higher speed ceiling
      animateCSS(arena, 'shakeX');
    };

    const targetInterval = setInterval(moveTarget, 600); // More frequent moves

    target.addEventListener('click', (e) => {
      e.stopPropagation();
      clearInterval(matrixInterval);
      clearInterval(targetInterval);
      clearInterval(timerId);
      l3Marks += 50;
      currentTask = 2;
      animateCSS(levelDiv, 'fadeOut').then(renderTask2);
    }, { once: true });
  };

  const renderTask2 = () => {
    currentTask = 2;
    const passages = [
      { p: "A global E-commerce brand noticed that their Organic Traffic increased by 40% after implementing schema markup and fixing canonical issues, but their ROI decreased. Investigation revealed that the traffic was coming from countries where they don't ship.", q: "Identify the primary technical failure:", a: ["Lack of Hreflang tags", "Incorrect canonicals", "Javascript errors", "CDN latency"], c: 0 },
      { p: "An insurance provider saw a surge in mobile users but a high bounce rate on their application form. Heatmaps showed users clicking on non-interactive decorative icons, thinking they were buttons.", q: "What is the core issue?", a: ["Poor UI/UX Design", "Slow Server Speed", "Broken Link", "High CPC"], c: 0 },
      { p: "A local bakery's search ranking dropped significantly after a website redesign. The new site uses a single-page application (SPA) architecture, and search engines are struggling to index individual product pages.", q: "Recommended solution:", a: ["Implement SSR/Prerendering", "Buy more backlinks", "Change domain name", "Increase font size"], c: 0 },
      { p: "A SaaS startup is running LinkedIn ads but getting very low CTR. The ads feature detailed technical diagrams of the product's backend architecture.", q: "What is the likely problem?", a: ["Ad creative not suitable for platform", "Wrong target audience", "Budget is too low", "LinkedIn is down"], c: 0 },
      { p: "A fashion retailer noticed that their email open rates are high, but click-through rates from mobile users have plummeted since a new template was introduced.", q: "Suspected cause:", a: ["Non-responsive email layout", "Boring subject lines", "Server downtime", "Unsubscribe button too large"], c: 0 }
    ];

    let pIdx = 0;
    let timer = 300; // 5 minutes
    let timerId;

    let prankTriggered = false;

    const renderCurrentPassage = () => {
      if (pIdx === passages.length) {
        clearInterval(timerId);
        renderTask3Briefing();
        return;
      }

      const originalPassage = passages[pIdx];
      const { options, correctIdx } = shuffleOptions(originalPassage.a, originalPassage.c);
      const passage = { ...originalPassage, a: options, c: correctIdx };

      // Prank Logic: On 3rd passage
      if (pIdx === 2 && !prankTriggered) {
        prankTriggered = true;

        const overlay = document.createElement('div');
        overlay.className = 'sudden-off';
        document.body.appendChild(overlay);

        setTimeout(() => {
          overlay.className = 'windows-update';
          overlay.innerHTML = `
            <div class="update-loader"></div>
            <h1 class="text-3xl font-light mb-4 text-white">Working on updates 27% complete</h1>
            <p class="text-xl text-white">Don't turn off your computer. This will take a while.</p>
            <p class="text-sm text-white/50 mt-12 font-mono">Your computer may restart several times</p>
          `;

          setTimeout(() => {
            overlay.remove();
          }, 15000); // 15s update screen
        }, 5000); // 5s black screen
      }


      levelDiv.innerHTML = `
        ${renderHeader('<span id="t2-timer" class="text-2xl font-black font-mono text-white bg-red-600 px-3 py-1 rounded-lg">5:00</span>')}
        <div class="card space-y-8 animate__animated animate__fadeInUp !bg-black/90 border-red-500/40 thunder-blink">
          <div class="space-y-4 text-center">
              <span class="badge bg-red-500/20 text-red-500 border border-red-500/40">Challenge 02</span>
              <h3 class="text-3xl font-black text-white italic">Technical Failure Analysis (${pIdx + 1}/5)</h3>
              <p class="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] animate-pulse">Thunder Mode Active</p>
          </div>

          <div class="p-8 bg-black/60 rounded-[2rem] border border-red-900 font-mono text-sm leading-relaxed text-slate-100 relative overflow-hidden">
            <p class="mb-6 text-lg italic border-l-8 border-red-600 pl-6">${passage.p}</p>
            <p class="text-xl font-black text-red-600 uppercase tracking-tighter mt-8">${passage.q}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${passage.a.map((opt, i) => `
              <button class="quiz-opt !bg-red-950/20 !border-red-900/40 !py-5 hover:!border-red-500 text-lg font-bold" data-idx="${i}">
                ${opt}
              </button>
            `).join('')}
          </div>
        </div>
      `;

      const timerDisplay = levelDiv.querySelector('#t2-timer');
      if (!timerId) {
        timerId = setInterval(() => {
          timer--;
          const mins = Math.floor(timer / 60);
          const secs = timer % 60;
          if (timerDisplay) timerDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
          if (timer <= 0) {
            clearInterval(timerId);
            renderTask3Briefing();
          }
        }, 1000);
      }

      levelDiv.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          if (parseInt(btn.dataset.idx) === passage.c) l3Marks += 2; // 2 marks per passage = 10 total
          pIdx++;
          renderCurrentPassage();
        });
      });
    };
    renderCurrentPassage();
  };

  const renderTask3Briefing = () => {
    currentTask = 3;
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="w-24 h-24 bg-red-600/20 border border-red-500/30 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl">
            📈
        </div>
        <div class="text-center space-y-4">
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter">Mission Phase: Final Zenith</h2>
            <div class="max-w-lg mx-auto p-6 card border-slate-800 bg-slate-900/50 space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>Strategic analysis complete. You are now entering the final testing phase of the Zenith sector.</p>
                <p class="font-bold text-red-500 uppercase tracking-widest text-xs">WARNING: Rapid response required. Timers vary per question.</p>
                <p class="pt-2 border-t border-slate-800">Synchronize your logic. The expedition concludes here.</p>
            </div>
        </div>
        <button id="start-t3" class="btn-primary px-12 py-5 group !bg-red-600">
          <span>INITIALIZE FINAL ASSESSMENT</span>
        </button>
      </div>
    `;

    const btn = levelDiv.querySelector('#start-t3');
    btn.addEventListener('click', () => {
      animateCSS(levelDiv, 'fadeOut').then(renderTask3);
    });
  };

  const renderTask3 = () => {
    currentTask = 3;
    const allQuestions = [
      { q: "What is the primary purpose of 'Google Search Console'?", a: ["Ad management", "Website health & indexing", "Video editing"], c: 1 },
      { q: "What does 'LTV' stand for in Digital Marketing?", a: ["Long Term Visibility", "Lifetime Value", "Lead Tracking Variable"], c: 1 },
      { q: "Which model describes the customer journey?", a: ["AIDA", "REACH", "SMART"], c: 0 },
      { q: "What is a 'Breadcrumb' in web design?", a: ["Navigation aid", "Error log", "Cookie type"], c: 0 },
      { q: "Which tool is used for measuring Social listening?", a: ["Hootsuite", "Excel", "Notepad"], c: 0 },
      { q: "What is 'Alt-Text' primarily used for?", a: ["Styling images", "Accessibility/SEO", "Image encryption"], c: 1 },
      { q: "Which protocol is used for secure transmission?", a: ["HTTP", "SSH", "HTTPS"], c: 2 },
      { q: "What is 'Native Advertising'?", a: ["Ads that match site content", "Pop-up ads", "Radio ads"], c: 0 },
      { q: "Which metric defines 'Stickiness'?", a: ["Bounce Rate", "Time on Site", "Initial load time"], c: 1 },
      { q: "What is 'GTM' used for?", a: ["Mail management", "Tag management", "Transaction Monitoring"], c: 1 },
      { q: "What does 'CTR' stand for?", a: ["Cost Through Rate", "Click Through Rate", "Conversion Target Ratio"], c: 1 },
      { q: "Which is a 'Pull' marketing strategy?", a: ["Billboards", "SEO", "TV Commercials"], c: 1 },
      { q: "What is 'Viral Marketing'?", a: ["Infected code", "Rapid social sharing", "Slow growth"], c: 1 },
      { q: "Define 'Remarketing'.", a: ["Selling used goods", "Targeting past visitors", "Removing ads"], c: 1 },
      { q: "What is a 'Sitemap'?", a: ["Office map", "List of website URLs", "GPS coordinates"], c: 1 },
      { q: "What's the goal of 'A/B Testing'?", a: ["Testing servers", "Comparing version performance", "Writing code"], c: 1 },
      { q: "Which platform is best for B2B leads?", a: ["Instagram", "Snapchat", "LinkedIn"], c: 2 },
      { q: "What is 'Churn Rate'?", a: ["New users", "Lost customers", "Ad clicks"], c: 1 },
      { q: "What is 'Influencer Marketing'?", a: ["Paying robots", "Using expert authority", "Radio spots"], c: 1 },
      { q: "What is 'Web Analytics'?", a: ["Writing text", "Data measurement", "Editing CSS"], c: 1 }
    ];
    // Mix timings: 5s, 10s, 15s shuffled
    const possibleTimings = [5, 10, 15];
    const questions = allQuestions.map(q => ({ ...q, t: possibleTimings[Math.floor(Math.random() * possibleTimings.length)] }));
    let qIdx = 0;
    let timer = 10;
    let timerId;

    const renderQuestion = () => {
      if (qIdx === questions.length) {
        finishLevel3();
        return;
      }
      const originalQuestion = questions[qIdx];
      const { options, correctIdx } = shuffleOptions(originalQuestion.a, originalQuestion.c);
      const q = { ...originalQuestion, a: options, c: correctIdx };
      timer = q.t;

      levelDiv.innerHTML = `
        ${renderHeader('<span id="q-header-timer" class="text-2xl font-black font-mono text-white bg-red-600 px-3 py-1 rounded-lg">10.0s</span>')}
        <div class="card !p-0 border-red-500/20 !bg-black/80 relative overflow-hidden animate__animated animate__zoomIn thunder-blink">
          <div id="q-progress" class="absolute top-0 left-0 h-2 bg-red-600 transition-all duration-[100ms] shadow-[0_0_20px_#ff0000]" style="width: 100%"></div>
          <div class="p-12 space-y-12">
            <div class="flex justify-between items-center">
                <span class="badge bg-red-500/20 text-red-500 border border-red-500/40">ZENITH 0${qIdx + 1}</span>
            </div>
            <h3 class="text-3xl font-black text-white leading-tight ${qIdx % 3 === 0 ? 'glitch-text' : ''}">${q.q}</h3>
            <div class="grid ${qIdx % 2 === 0 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4">
              ${q.a.map((opt, i) => `
                <button class="quiz-opt !bg-red-950/20 !border-red-900/40 !rounded-[2rem] !py-6 !px-10 hover:!border-red-500 group" data-idx="${i}">
                    <span class="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">${opt}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      const headerTimer = levelDiv.querySelector('#q-header-timer');
      const timerBar = levelDiv.querySelector('#q-progress');

      timerId = setInterval(() => {
        timer -= 0.1;
        if (headerTimer) headerTimer.innerText = `${timer.toFixed(1)}s`;
        timerBar.style.width = `${(timer / q.t) * 100}%`;
        if (timer <= 0) {
          clearInterval(timerId);
          qIdx++;
          renderQuestion();
        }
      }, 100);

      levelDiv.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          clearInterval(timerId);
          if (parseInt(btn.dataset.idx) === q.c) l3Marks += 1; // 1 mark per question = 20 total
          qIdx++;
          renderQuestion();
        });
      });
    };
    renderQuestion();
  };

  const finishLevel3 = async () => {
    updateState({ scores: { ...gameState.scores, l3: l3Marks } }, true);
    submitScore({
      ...gameState.user,
      l1: gameState.scores.l1,
      l2: gameState.scores.l2,
      l3: l3Marks,
      totalTime: formatTime(Date.now() - gameState.startTime)
    }).catch(err => console.error("Final sync failed", err));
    renderFinalVictory();
  };

  const renderFinalVictory = () => {
    levelDiv.innerHTML = `
      <div class="terror-screen horror-blink">
        <h1 class="text-9xl font-black text-red-600 animate-pulse uppercase">Victorious</h1>
      </div>
      <div class="flex flex-col items-center justify-center min-vh-[70vh] space-y-12 animate__animated animate__zoomIn">
        <div class="text-[12rem] animate-float drop-shadow-[0_0_50px_rgba(239,68,68,0.5)]">🔥</div>
        <div class="text-center space-y-4">
            <h2 class="text-7xl font-black italic uppercase tracking-tighter text-white">Dominance Confirmed</h2>
            <p class="text-slate-500 font-mono tracking-[0.5em] uppercase text-sm">Strategic analytics finalized</p>
        </div>
        <button id="view-results" class="btn-primary !py-8 !px-20 !text-2xl !bg-white !text-black border-none hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]">
          <span class="font-black">GENERATE FINAL REPORT</span>
        </button>
      </div>
    `;
    updateState({ scores: { ...gameState.scores, l3: l3Marks } }, true);

    setTimeout(() => {
      const terror = levelDiv.querySelector('.terror-screen');
      if (terror) terror.remove();
      confetti({ particleCount: 300, spread: 100, origin: { y: 0.5 }, colors: ['#ff0000', '#ffffff'] });
    }, 2500);

    const btn = levelDiv.querySelector('#view-results');
    const proceed = () => {
      window.removeEventListener('keypress', l3finishKey);
      animateCSS(levelDiv, 'fadeOut').then(() => { updateState({ level: 4 }); });
    };
    const l3finishKey = (e) => { if (e.key === 'Enter') proceed(); };
    btn.addEventListener('click', proceed);
    window.addEventListener('keypress', l3finishKey);
  };

  if (currentTask === 0) renderKeyCheck();
  else renderTask1();
};
