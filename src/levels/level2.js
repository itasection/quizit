import { updateState, gameState } from '../state';
import { animateCSS, formatTime } from '../utils';
import confetti from 'canvas-confetti';
import { submitScore } from '../services/backend';

export const renderLevel2 = (container) => {
  let currentTask = 0; // 0 is door/key check
  let l2Marks = 0;

  const levelDiv = document.createElement('div');
  levelDiv.className = 'w-full max-w-4xl mx-auto horror-blink';
  container.appendChild(levelDiv);

  const renderHeader = (timerHtml = '') => `
    <div class="flex justify-between items-center mb-8 card !py-4 !px-8 glow-indigo border-yellow-500/20">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center text-xl">
           ${currentTask === 0 ? '🔑' : currentTask === 1 ? '⚡' : currentTask === 2 ? '🖼️' : '🧠'}
        </div>
        <div>
          <h2 class="text-sm font-black text-yellow-400 uppercase tracking-tighter">Level 2: The Engagement</h2>
          <p class="text-[10px] text-slate-500 font-mono uppercase">${currentTask === 0 ? 'Verification Required' : `Phase ${currentTask} of 3`}</p>
        </div>
      </div>
      <div class="flex items-center gap-6">
        ${timerHtml}
        <div id="status" class="text-xs font-black px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20 tracking-widest">ACTIVE SESSION</div>
      </div>
    </div>
  `;

  const renderKeyCheck = () => {
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate__animated animate__fadeIn">
        <div class="door-frame">
          <div class="absolute inset-0 bg-slate-950 rounded-inner shadow-inner z-0"></div>
          <div id="door-visual" class="royal-door">
              <div class="knob"></div>
          </div>
        </div>
        <div class="text-center space-y-2">
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter">LEVEL 2 ACCESS</h2>
            <p class="text-slate-400 text-sm max-w-xs mx-auto">Please enter the decrypt key acquired from the Level 1 chest.</p>
        </div>
        <div class="w-full max-w-sm space-y-6 card !p-8 border-yellow-500/20">
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Authentication Key</label>
            <input type="text" id="l1-key-input" class="input-field text-center text-2xl font-mono tracking-widest !py-5" placeholder="••••••••">
          </div>
          <button id="verify-l1-key" class="btn-primary w-full !bg-yellow-600 !hover:bg-yellow-500 !border-yellow-400/30">
            <span>UNLOCK THE DOOR</span>
          </button>
        </div>
      </div>
    `;

    const input = levelDiv.querySelector('#l1-key-input');
    const btn = levelDiv.querySelector('#verify-l1-key');
    const door = levelDiv.querySelector('#door-visual');

    const verify = () => {
      if (input.value.trim() === gameState.keys.l1) {
        btn.disabled = true;
        btn.innerText = "ACCESS GRANTED";
        door.classList.add('door-open');
        setTimeout(() => {
          animateCSS(levelDiv, 'fadeOut').then(renderBriefing);
        }, 1500);
      } else {
        animateCSS(levelDiv.querySelector('.card'), 'shakeX');
      }
    };

    btn.addEventListener('click', verify);
    input.addEventListener('keypress', (e) => { if (e.key === 'Enter') verify(); });
    input.focus();
  };

  const renderBriefing = () => {
    currentTask = 0;
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="w-24 h-24 bg-yellow-600/20 border border-yellow-500/30 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl">
            🛰️
        </div>
        <div class="text-center space-y-4">
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter">Mission Briefing: Engagement</h2>
            <div class="max-w-lg mx-auto p-6 card border-slate-800 bg-slate-900/50 space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>DOOR OPENED. Welcome to the next sector. Level 2 focuses on precision and strategic intuition:</p>
                <ul class="text-left space-y-2 list-disc list-inside text-xs">
                    <li><span class="text-yellow-400 font-bold">Timeline Speed-Run</span>: A manual typing test of core marketing terms.</li>
                    <li><span class="text-orange-400 font-bold">Pic-Connect Rebus</span>: Decode visual symbols into metrics.</li>
                    <li><span class="text-amber-400 font-bold">Concept Mastery</span>: Advanced scenario analysis.</li>
                </ul>
                <p class="pt-2 border-t border-slate-800">Speed and accuracy are vital for your synchronization score.</p>
            </div>
        </div>
        <button id="start-l2" class="btn-primary px-12 py-5 group !bg-yellow-600 !hover:bg-yellow-500">
          <span>INITIALIZE LEVEL 2</span>
        </button>
      </div>
    `;

    const startBtn = levelDiv.querySelector('#start-l2');
    const start = () => {
      animateCSS(levelDiv, 'fadeOut').then(() => {
        if (gameState.gameMode === 'quiz') renderTask3();
        else renderTask1();
      });
    };
    startBtn.addEventListener('click', start);
    window.addEventListener('keypress', function l2start(e) {
      if (e.key === 'Enter') {
        start();
        window.removeEventListener('keypress', l2start);
      }
    });
  };

  const renderTask1 = () => {
    currentTask = 1;
    const allTerms = [
      "Micro-Moments", "Attribution", "Personalization", "Programmatic", "Remarketing",
      "Omnichannel", "Hyperlocal", "Interactivity", "Localization", "Visualization",
      "Blockchain", "Metaverse", "Algorithm", "Bandwidth", "Compliance"
    ];
    // Randomize and pick only 10
    const terms = allTerms
      .sort(() => 0.5 - Math.random())
      .slice(0, 10)
      .map(t => t.split('').map(c => Math.random() > 0.5 ? c.toUpperCase() : c.toLowerCase()).join(''));

    let termIndex = 0;
    let timer = 120; // 120 seconds for the whole task
    let timerId;

    levelDiv.innerHTML = `
      ${renderHeader('<span id="captcha-timer" class="text-2xl font-black font-mono text-white bg-yellow-600 px-3 py-1 rounded-lg">120.0s</span>')}
      <div class="card space-y-10 animate__animated animate__fadeInUp horror-blink">
        <div class="space-y-2 text-center">
            <span class="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Challenge 01</span>
            <h3 class="text-3xl font-black">Captcha Speed-Run</h3>
            <p class="text-slate-400 text-sm">Decode the corrupted sequence. Click SUBMIT or press ENTER.</p>
        </div>
        
        <div class="h-32 flex items-center justify-center bg-black/80 rounded-[2.5rem] border border-red-900 border-dashed relative overflow-hidden">
          <div id="captcha-term" class="text-5xl font-black italic text-white tracking-tighter z-10 select-none confusing-text">
            ${terms[0]}
          </div>
        </div>

        <div class="space-y-6">
          <div class="flex gap-4">
            <input type="text" id="captcha-input" autocomplete="off" class="input-field !text-center !text-3xl !font-black !py-6 !rounded-3xl border-2 border-slate-700 focus:!border-yellow-500 flex-1" placeholder="...">
            <button id="captcha-submit" class="btn-primary !px-8 !rounded-3xl">SUBMIT</button>
          </div>
          <div class="flex justify-between items-center px-4">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                <span id="captcha-count" class="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">PROGRESS: 0/10</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const input = levelDiv.querySelector('#captcha-input');
    const submitBtn = levelDiv.querySelector('#captcha-submit');
    const termDisplay = levelDiv.querySelector('#captcha-term');
    const countDisplay = levelDiv.querySelector('#captcha-count');
    const timerDisplay = levelDiv.querySelector('#captcha-timer');

    input.focus();

    timerId = setInterval(() => {
      timer -= 0.1;
      if (timerDisplay) timerDisplay.innerText = `${timer.toFixed(2)}s`;
      if (timer <= 0) {
        clearInterval(timerId);
        goToTask2();
      }
    }, 100);

    const goToTask2 = () => {
      clearInterval(timerId);
      currentTask = 2;
      animateCSS(levelDiv, 'fadeOutDown').then(renderTask2);
    };

    const handleSubmission = () => {
      if (input.value.trim() === terms[termIndex]) {
        l2Marks += 2;
        animateCSS(termDisplay, 'rubberBand');
      } else {
        animateCSS(termDisplay, 'shakeX');
      }

      termIndex++;
      input.value = '';

      if (termIndex === 10) {
        clearInterval(timerId);
        goToTask2();
      } else {
        termDisplay.innerText = terms[termIndex];
        countDisplay.innerText = `PROGRESS: ${termIndex}/10`;
        input.focus();
      }
    };

    submitBtn.addEventListener('click', handleSubmission);
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleSubmission();
    });
  };

  const renderTask2 = () => {
    currentTask = 2;
    const rebuses = [
      { q: '📱 + 🏬 = ?', a: ["Mobile Store", "Hyperlocal Marketing", "Store Walk-in"], c: 1 },
      { q: '📧 + 📈 = ?', a: ["Email Marketing Analytics", "Newsletter growth", "Direct mail"], c: 0 },
      { q: '🔍 + 🌐 = ?', a: ["Global Search", "Universal SEO", "World Wide Web"], c: 1 },
      { q: '👥 + 💬 = ?', a: ["Group Chat", "Social Media Engagement", "Influencer Talk"], c: 1 },
      { q: '🎥 + 📢 = ?', a: ["Video Advertising", "Broadcasting", "Audio Marketing"], c: 0 },
      { q: '📊 + 🎯 = ?', a: ["Target Audience", "Performance Tracking", "Goal Setting"], c: 1 },
      { q: '💻 + 💳 = ?', a: ["E-commerce", "Digital Payment", "Billing"], c: 0 },
      { q: '🔗 + 👑 = ?', a: ["Backlink King", "Content is King", "Link Building"], c: 1 },
      { q: '🎨 + 📈 = ?', a: ["Graphic Growth", "Visual Analytics", "Design Sprint"], c: 1 },
      { q: '🔔 + 🕒 = ?', a: ["Real-time alerts", "Push Notifications", "Timely reminder"], c: 1 }
    ];
    let currentRebus = 0;
    let rebusMarks = 0;
    let rebusTimer = 10;
    let rebusTimerId;

    const renderCurrentRebus = () => {
      if (rebusTimerId) clearInterval(rebusTimerId);
      const r = rebuses[currentRebus];
      rebusTimer = 10;

      levelDiv.innerHTML = `
        ${renderHeader('<span id="rebus-timer" class="text-2xl font-black font-mono text-white bg-yellow-600 px-3 py-1 rounded-lg">10.0s</span>')}
        <div class="card space-y-10 text-center animate__animated animate__fadeInUp horror-blink">
          <div class="space-y-2">
            <span class="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Challenge 02</span>
            <h3 class="text-3xl font-black">Pic-Connect</h3>
            <p class="text-slate-400 text-sm">Visual Synthesis. You have 10 seconds.</p>
          </div>
          
          <div id="rebus-container" class="animate__animated animate__zoomIn">
            <div class="h-64 flex items-center justify-center text-8xl bg-slate-950/50 rounded-[2.5rem] border border-slate-800 border-dashed transition-all duration-300" id="rebus-display">${r.q}</div>
          </div>

          <div class="space-y-6 max-w-sm mx-auto">
            <div class="grid grid-cols-1 gap-3">
              ${r.a.map((opt, i) => `<button class="quiz-opt" data-idx="${i}">${opt}</button>`).join('')}
            </div>
            <div class="flex flex-col gap-4">
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div id="rebus-progress-bar" class="h-full bg-yellow-500 transition-all duration-100" style="width: 100%"></div>
                </div>
                <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest">Rebus ${currentRebus + 1} of ${rebuses.length}</p>
            </div>
          </div>
        </div>
      `;

      const progressBar = levelDiv.querySelector('#rebus-progress-bar');
      const headerTimer = levelDiv.querySelector('#rebus-timer');
      rebusTimerId = setInterval(() => {
        rebusTimer -= 0.1;
        if (headerTimer) headerTimer.innerText = `${rebusTimer.toFixed(1)}s`;
        if (progressBar) progressBar.style.width = `${(rebusTimer / 10) * 100}%`;
        if (rebusTimer <= 0) {
          nextRebus();
        }
      }, 100);

      const nextRebus = (correct = false) => {
        clearInterval(rebusTimerId);
        if (correct) rebusMarks += 2;
        currentRebus++;
        if (currentRebus === rebuses.length) {
          l2Marks += rebusMarks;
          currentTask = 3;
          animateCSS(levelDiv, 'fadeOutDown').then(renderTask3);
        } else renderCurrentRebus();
      };

      levelDiv.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          nextRebus(parseInt(btn.dataset.idx) === r.c);
        });
      });
    };

    renderCurrentRebus();
  };

  const renderTask3 = () => {
    currentTask = 3;
    const scenarios = [
      { q: "A company wants to target users who previously visited their site but didn't buy. What is this called?", a: ["Redirection", "Remarketing", "Retention"], c: 1 },
      { q: "An advertiser only pays when a user completes a specific action like a signup. What is this model?", a: ["CPC", "CPM", "CPA"], c: 2 },
      { q: "What is the primary purpose of a 'Meta Description' tag?", a: ["Improving page speed", "Describing page content to searchers", "Defining font styles"], c: 1 },
      { q: "Which tool helps in identifying broken links and crawl errors on a website?", a: ["Google Trends", "Google Search Console", "Google Ads"], c: 1 },
      { q: "A business uses GPS data to send ads to people within a 5km radius of their store. This is:", a: ["Geofencing", "Global Marketing", "Beacons"], c: 0 },
      { q: "A YouTube channel wants to know how long people watch their videos on average. They check:", a: ["View Count", "Watch Time / Retention", "Subscriber growth"], c: 1 },
      { q: "In Email Marketing, what does 'A/B Testing' usually involve?", a: ["Testing two different subject lines", "Testing emails in two languages", "Testing emails on two devices"], c: 0 },
      { q: "Which of the following is an example of 'Earned' Social Media?", a: ["Paid Facebook ad", "A fan sharing your post", "A post on your own page"], c: 1 },
      { q: "Web analytics 'Bounce Rate' refers to users who:", a: ["Click a button and leave", "Leave after viewing only one page", "Stay on the site for 10 minutes"], c: 1 },
      { q: "What is the main advantage of 'Programmatic Advertising'?", a: ["Manual ad placement", "Automated real-time bidding", "Lower image quality"], c: 1 }
    ];

    let qIdx = 0;
    let qTimer = 60; 
    let timerId;

    const renderScenario = () => {
      if (timerId) clearInterval(timerId);
      
      if (qIdx === scenarios.length) {
        finishL2();
        return;
      }
      
      const s = scenarios[qIdx];
      qTimer = 60; // 1 minute per question

      levelDiv.innerHTML = `
        ${renderHeader('<span id="t3-timer" class="text-2xl font-black font-mono text-white bg-yellow-600 px-3 py-1 rounded-lg">60s</span>')}
        <div class="card space-y-10 animate__animated animate__fadeInRight">
          <div class="space-y-2">
              <span class="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Phase 03</span>
              <h3 class="text-3xl font-black">Concept Mastery</h3>
              <p class="text-slate-400 text-sm">Question ${qIdx + 1} of ${scenarios.length}. 60s per question.</p>
          </div>

          <div class="space-y-8">
            <div class="p-8 bg-slate-900/50 rounded-3xl border border-yellow-500/10">
              <div class="flex items-start gap-4">
                <span class="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xs font-black text-yellow-500 border border-yellow-500/20">0${qIdx + 1}</span>
                <p class="text-xl font-bold text-slate-200 leading-relaxed italic">"${s.q}"</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-4">
              ${s.a.map((opt, oi) => `
                <button class="quiz-opt !py-6 !text-lg" data-idx="${oi}">
                  ${opt}
                </button>
              `).join('')}
            </div>
          </div>
          <div class="flex justify-end">
            <button id="next-q" class="btn-secondary !bg-yellow-500/10 !text-yellow-500 !border-yellow-500/30">SKIP QUESTION</button>
          </div>
        </div>
      `;

      const timerDisplay = levelDiv.querySelector('#t3-timer');
      timerId = setInterval(() => {
        qTimer--;
        if (timerDisplay) timerDisplay.innerText = `${qTimer}s`;
        if (qTimer <= 0) {
          clearInterval(timerId);
          qIdx++;
          renderScenario();
        }
      }, 1000);

      levelDiv.querySelectorAll('.quiz-opt').forEach(btn => {
        btn.addEventListener('click', () => {
          clearInterval(timerId);
          if (parseInt(btn.dataset.idx) === s.c) l2Marks += 1;
          qIdx++;
          renderScenario();
        });
      });

      levelDiv.querySelector('#next-q').addEventListener('click', () => {
        clearInterval(timerId);
        qIdx++;
        renderScenario();
      });
    };

    const finishL2 = async () => {
      clearInterval(timerId);
      window.removeEventListener('keypress', l2syncKey);
      updateState({ scores: { ...gameState.scores, l2: l2Marks } }, true);
      renderVaultAnimation();
    };

    const l2syncKey = (e) => { if (e.key === 'Enter') { /* No direct submit in one-by-one */ } };
    renderScenario();
  };

  const renderVaultAnimation = () => {
    levelDiv.innerHTML = `
      <div class="terror-screen horror-blink">
        <h1 class="text-9xl font-black text-red-600 animate-pulse">TERMINAL BREACHED</h1>
      </div>
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__zoomIn">
        <div class="relative">
            <div class="absolute inset-0 bg-yellow-500 blur-[100px] opacity-20"></div>
            <div class="text-9xl animate-float relative z-10">🔐</div>
        </div>
        <div class="text-center space-y-3">
            <h2 class="text-5xl font-black bg-gradient-to-b from-white to-yellow-400 bg-clip-text text-transparent uppercase tracking-tighter">Level 2 Complete</h2>
            <p class="text-slate-400 font-medium tracking-widest uppercase text-xs">Terminal Access Logged</p>
        </div>
        
        <div class="card !p-6 bg-yellow-500/10 border-yellow-500/30 flex flex-col items-center gap-2">
            <span class="text-[10px] font-black text-yellow-400 uppercase">ACCESS KEY FOR LEVEL 3</span>
            <span class="text-3xl font-mono text-white font-black tracking-[0.2em]">${gameState.keys.l2}</span>
            <p class="text-[9px] text-slate-500 mt-2 font-black uppercase">Memorize this key. It is required to open the final Zenith door.</p>
        </div>

        <button id="go-l3" class="btn-primary px-12 py-5 group !bg-red-600 shadow-red-500/20">
          <span>ENTER THE ZENITH</span>
        </button>
      </div>
    `;

    setTimeout(() => {
      const terror = levelDiv.querySelector('.terror-screen');
      if (terror) terror.remove();
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }, 2000);

    const btn = levelDiv.querySelector('#go-l3');
    const proceed = () => {
      window.removeEventListener('keypress', l2finishKey);
      animateCSS(levelDiv, 'fadeOut').then(() => { updateState({ level: 3 }); });
    };
    const l2finishKey = (e) => { if (e.key === 'Enter') proceed(); };
    btn.addEventListener('click', proceed);
    window.addEventListener('keypress', l2finishKey);
  };

  if (gameState.gameMode === 'quiz') renderBriefing();
  else renderKeyCheck();
};
