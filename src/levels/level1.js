import { updateState, gameState } from '../state';
import { animateCSS, formatTime, shuffleOptions } from '../utils';
import confetti from 'canvas-confetti';
import { submitScore } from '../services/backend';

export const renderLevel1 = (container) => {
  let currentTask = 0; // 0 is briefing
  let l1Marks = 0;
  let task2StartTime = 0;

  const levelDiv = document.createElement('div');
  levelDiv.className = 'w-full max-w-4xl mx-auto horror-blink';
  container.appendChild(levelDiv);

  const renderHeader = (timerHtml = '') => `
    <div class="flex justify-between items-center mb-8 card !py-4 !px-8 glow-indigo border-indigo-500/20">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl">
           ${currentTask === 1 ? '🧩' : currentTask === 2 ? '🖼️' : '📝'}
        </div>
        <div>
          <h2 class="text-sm font-black text-indigo-400 uppercase tracking-tighter">Level 1: The Foundation</h2>
          <p class="text-[10px] text-slate-500 font-mono uppercase">${currentTask === 0 ? 'Briefing' : `Phase ${currentTask} of 3`}</p>
        </div>
      </div>
      <div class="flex items-center gap-6">
        ${timerHtml}
        <div id="status" class="text-xs font-black px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20 tracking-widest">ACTIVE SESSION</div>
      </div>
    </div>
  `;

  const startGlobalTimer = () => {
    const timerElement = levelDiv.querySelector('#timer');
    if (!timerElement) return;

    const updateTimer = () => {
      const elapsed = Date.now() - gameState.startTime;
      const remaining = 20 * 60 * 1000 - elapsed;
      if (remaining <= 0) {
        timerElement.innerText = "00:00";
        // Handle timeout
        return;
      }
      timerElement.innerText = formatTime(remaining);
      requestAnimationFrame(updateTimer);
    };
    updateTimer();
  };

  const renderBriefing = () => {
    currentTask = 0;
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="w-24 h-24 bg-indigo-600/20 border border-indigo-500/30 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl">
            📡
        </div>
        <div class="text-center space-y-4">
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter">Mission Briefing: Foundation</h2>
            <div class="max-w-lg mx-auto p-6 card border-slate-800 bg-slate-900/50 space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>Welcome, Candidate. Level 1 will test your fundamental grasp of digital marketing. You have three phases:</p>
                <ul class="text-left space-y-2 list-disc list-inside text-xs">
                    <li><span class="text-indigo-400 font-bold">Twisted Riddles</span>: Identify 10 core terms from cryptic clues.</li>
                    <li><span class="text-purple-400 font-bold">Strategy Fragments</span>: Reconstruct a marketing roadmap puzzle.</li>
                    <li><span class="text-cyan-400 font-bold">Technical Direct</span>: A rapid-fire 10-question assessment.</li>
                </ul>
                <p class="pt-2 border-t border-slate-800">Your results will be synchronized in real-time. Good luck.</p>
            </div>
        </div>
        <button id="start-l1" class="btn-primary px-12 py-5 group">
          <span>INITIALIZE LEVEL 1</span>
        </button>
      </div>
    `;

    const startBtn = levelDiv.querySelector('#start-l1');
    const start = () => {
      window.removeEventListener('keypress', l1startKey);
      animateCSS(levelDiv, 'fadeOut').then(renderTask1);
    };
    const l1startKey = (e) => { if (e.key === 'Enter') start(); };
    startBtn.addEventListener('click', start);
    window.addEventListener('keypress', l1startKey);
  };

  const renderTask1 = () => {
    currentTask = 1;
    const riddles = [
      { q: "I am the process of improving the quality and quantity of website traffic from search engines. Who am I?", a: ["SMM", "SEO", "PPC"], c: 1 },
      { q: "I am a metric that measures the percentage of users who perform a desired action. What am I?", a: ["Conversion Rate", "Bounce Rate", "CTR"], c: 0 },
      { q: "I am the practice of using social media platforms to connect with your audience. What am I?", a: ["SEM", "SMM", "Display Ads"], c: 1 },
      { q: "I am a short-range wireless technology that allows mobile marketing in physical stores. What am I?", a: ["GPS", "NFC", "Beacons"], c: 2 },
      { q: "I am a type of marketing where you pay a fee each time one of your ads is clicked. What am I?", a: ["SEO", "Content Marketing", "PPC"], c: 2 },
      { q: "I am the digital file that a browser stores on a user's machine to track behavior. What am I?", a: ["Cache", "Cookie", "Pixel"], c: 1 },
      { q: "I am a non-linear way of marketing where consumers find the brand themselves. What am I?", a: ["Outbound", "Inbound", "Direct"], c: 1 },
      { q: "I am the practice of creating and distributing valuable, relevant content to attract a defined audience. What am I?", a: ["SEO", "Content Marketing", "SEM"], c: 1 },
      { q: "I am the specific page a user arrives at after clicking a link in an ad or email. What am I?", a: ["Homepage", "Landing Page", "Sitemap"], c: 1 },
      { q: "I am the number of times an ad is displayed to a user. What am I?", a: ["Reach", "Impressions", "Clicks"], c: 1 }
    ];

    let timer = 600; // 10 minutes
    levelDiv.innerHTML = `
      ${renderHeader('<span id="task1-timer" class="text-2xl font-black font-mono text-white bg-indigo-600 px-3 py-1 rounded-lg">10:00</span>')}
      <div class="card space-y-8 animate__animated animate__fadeInUp">
        <div class="space-y-2">
            <span class="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Challenge 01</span>
            <h3 class="text-3xl font-black">Twisted Riddles</h3>
            <p class="text-slate-400 text-sm">Decode the marketing jargon. Select the correct term for each clue.</p>
        </div>

        <div id="riddle-list" class="space-y-6">
          ${riddles.map((r_orig, i) => {
            const { options, correctIdx } = shuffleOptions(r_orig.a, r_orig.c);
            const r = { ...r_orig, a: options, c: correctIdx };
            riddles[i] = r; // Update local array to keep track of new correct index
            return `
            <div class="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/30 space-y-4">
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-indigo-600/20 flex items-center justify-center text-[10px] font-black text-indigo-400 border border-indigo-500/20">${i + 1}</span>
                <p class="text-slate-200 text-sm font-medium leading-relaxed">${r.q}</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${r.a.map((opt, oi) => `
                  <button class="quiz-opt" data-q="${i}" data-idx="${oi}">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          `}).join('')}
        </div>
        
        <button id="submit-riddles" class="btn-primary w-full group py-5">
          <span>VALIDATE ANSWERS</span>
        </button>
      </div>
    `;

    const answers = new Array(riddles.length).fill(null);
    levelDiv.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.dataset.q);
        const optIdx = parseInt(btn.dataset.idx);
        answers[qIdx] = optIdx;
        levelDiv.querySelectorAll(`.quiz-opt[data-q="${qIdx}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    const timerDisplay = levelDiv.querySelector('#task1-timer');
    const timerId = setInterval(() => {
      timer--;
      const mins = Math.floor(timer / 60);
      const secs = timer % 60;
      timerDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
      if (timer <= 0) {
        clearInterval(timerId);
        submit();
      }
    }, 1000);

    const submitBtn = levelDiv.querySelector('#submit-riddles');
    const submit = () => {
      clearInterval(timerId);
      window.removeEventListener('keypress', l1t1Key);
      let correct = 0;
      answers.forEach((ans, i) => { if (ans === riddles[i].c) correct++; });
      l1Marks = correct;
      animateCSS(levelDiv, 'fadeOutDown').then(() => {
        renderTask2();
      });
    };
    const l1t1Key = (e) => { if (e.key === 'Enter') submit(); };
    submitBtn.addEventListener('click', submit);
    window.addEventListener('keypress', l1t1Key);
  };

  const renderTask2 = () => {
    currentTask = 2;
    let timer = 300; // 5 minutes
    levelDiv.innerHTML = `
      ${renderHeader('<span id="task2-timer" class="text-2xl font-black font-mono text-white bg-purple-600 px-3 py-1 rounded-lg">5:00</span>')}
      <div class="card space-y-8 animate__animated animate__fadeInUp">
        <div class="space-y-2 text-center">
            <span class="badge bg-purple-500/10 text-purple-400 border border-purple-500/20">Challenge 02</span>
            <h3 class="text-3xl font-black">Strategy Fragments</h3>
            <p class="text-slate-400 text-sm">Reconstruct the Marketing Roadmap. Time remaining boosts score!</p>
        </div>

        <div id="puzzle-grid" class="grid grid-cols-4 gap-2 w-full max-w-[400px] mx-auto aspect-square bg-slate-950/50 p-3 rounded-[2rem] border border-slate-800">
          <!-- Puzzle cubes -->
        </div>

        <div class="flex flex-col items-center gap-4">
            <button id="verify-puzzle" class="btn-primary w-full max-w-sm">SUBMIT RECONSTRUCTION</button>
        </div>
      </div>
    `;

    const grid = levelDiv.querySelector('#puzzle-grid');
    const positions = Array.from({ length: 16 }, (_, i) => i);
    const shuffled = [...positions].sort(() => Math.random() - 0.5);

    shuffled.forEach((pos, i) => {
      const piece = document.createElement('div');
      piece.className = 'puzzle-piece';
      piece.draggable = true;
      piece.dataset.current = i;
      piece.dataset.original = pos;

      const row = Math.floor(pos / 4);
      const col = pos % 4;

      piece.style.backgroundImage = `url(${import.meta.env.BASE_URL}puzzle.png)`;
      piece.style.backgroundSize = '410% 410%'; // Slight overfill for better fit
      piece.style.backgroundPosition = `${((pos % 4) / 3) * 100}% ${(Math.floor(pos / 4) / 3) * 100}%`;
      piece.style.aspectRatio = "1/1";

      grid.appendChild(piece);
    });

    let dragged = null;
    grid.addEventListener('dragstart', (e) => { dragged = e.target.closest('.puzzle-piece'); });
    grid.addEventListener('dragend', (e) => {
      if (dragged) dragged.style.opacity = '1';
    });
    grid.addEventListener('dragover', (e) => e.preventDefault());
    grid.addEventListener('drop', (e) => {
      e.preventDefault();
      const target = e.target.closest('.puzzle-piece');
      if (target && dragged && target !== dragged) {
        const tempBg = target.style.backgroundPosition;
        const tempOrig = target.dataset.original;

        target.style.backgroundPosition = dragged.style.backgroundPosition;
        target.dataset.original = dragged.dataset.original;

        dragged.style.backgroundPosition = tempBg;
        dragged.dataset.original = tempOrig;
      }
    });

    const timerDisplay = levelDiv.querySelector('#task2-timer');
    const timerId = setInterval(() => {
      timer--;
      const mins = Math.floor(timer / 60);
      const secs = timer % 60;
      timerDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
      if (timer <= 0) {
        clearInterval(timerId);
        verify();
      }
    }, 1000);

    const verifyBtn = levelDiv.querySelector('#verify-puzzle');
    const verify = () => {
      clearInterval(timerId);
      window.removeEventListener('keypress', l1t2Key);
      const pieces = Array.from(grid.querySelectorAll('.puzzle-piece'));
      const correctPieces = pieces.filter(p => parseInt(p.dataset.current) === parseInt(p.dataset.original)).length;

      const accuracyMarks = Math.floor((correctPieces / 16) * 10);
      const speedBonus = timer > 150 ? 5 : timer > 0 ? 2 : 0; // Speed bonus for completing fast

      l1Marks += (accuracyMarks + speedBonus);
      animateCSS(levelDiv, 'fadeOutDown').then(renderTask3);
    };
    const l1t2Key = (e) => { if (e.key === 'Enter') verify(); };
    verifyBtn.addEventListener('click', verify);
    window.addEventListener('keypress', l1t2Key);
  };

  const renderTask3 = () => {
    currentTask = 3;
    const questions = [
      { q: "What is the primary goal of Search Engine Optimization (SEO)?", a: ["Increasing paid traffic", "Increasing organic visibility", "Buying backlinks"], c: 1 },
      { q: "Which tool is used for tracking and analyzing website traffic?", a: ["Google Search Console", "Google Analytics", "Google Keyword Planner"], c: 1 },
      { q: "Which of the following is an 'Off-Page' SEO factor?", a: ["Meta tags", "Website speed", "Backlinks"], c: 2 },
      { q: "What does the 'P' in PPC stand for?", a: ["Position", "Pay", "Preview"], c: 1 },
      { q: "Which of these is a social media platform used primarily for B2B marketing?", a: ["Snapchat", "TikTok", "LinkedIn"], c: 2 },
      { q: "What is the 'Churn Rate' in digital marketing?", a: ["Rate of customer loss", "Rate of website loading", "Rate of new leads"], c: 0 },
      { q: "Which type of email campaign is sent automatically after a user action?", a: ["Newsletter", "Transactional Email", "Blast Email"], c: 1 },
      { q: "What does SERP stand for?", a: ["Search Engine Result Page", "Site Entry Ratio Plan", "Social Engagement Response Page"], c: 0 },
      { q: "Which of the following is a key component of Content Marketing?", a: ["Keyword stuffing", "Storytelling", "Pop-up ads"], c: 1 },
      { q: "What is 'Responsive Design'?", a: ["Design that reacts to clicks", "Layout that adapts to screen size", "Design with many animations"], c: 1 }
    ];

    let timer = 600; // 10 minutes
    levelDiv.innerHTML = `
      ${renderHeader('<span id="task3-timer" class="text-2xl font-black font-mono text-white bg-cyan-600 px-3 py-1 rounded-lg">10:00</span>')}
      <div class="card space-y-10 animate__animated animate__fadeInUp">
        <div class="space-y-2">
            <span class="badge bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Final Challenge</span>
            <h3 class="text-3xl font-black">Technical Direct 10</h3>
            <p class="text-slate-400 text-sm">Select the most appropriate technical answer. Responses are auto-submitted on timeout.</p>
        </div>

        <div id="quiz" class="space-y-8">
          ${questions.map((q_orig, i) => {
            const { options, correctIdx } = shuffleOptions(q_orig.a, q_orig.c);
            const q = { ...q_orig, a: options, c: correctIdx };
            questions[i] = q; // Update local array
            return `
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black pointer-events-none">${i + 1}</span>
                <p class="font-bold text-slate-200">${q.q}</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${q.a.map((opt, oi) => `
                  <button class="quiz-opt" data-idx="${oi}" data-q="${i}">
                    ${opt}
                  </button>
                `).join('')}
              </div>
            </div>
          `}).join('')}
        </div>
        
        <button id="finish-l1" class="btn-primary w-full py-6 group">
            <span class="group-hover:animate-pulse">SYNCHRONIZE LEVEL 1 DATA</span>
        </button>
      </div>
    `;

    const answers = new Array(questions.length).fill(null);
    levelDiv.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const qIdx = parseInt(btn.dataset.q);
        const optIdx = parseInt(btn.dataset.idx);
        answers[qIdx] = optIdx;

        levelDiv.querySelectorAll(`.quiz-opt[data-q="${qIdx}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

    const timerDisplay = levelDiv.querySelector('#task3-timer');
    const timerId = setInterval(() => {
      timer--;
      const mins = Math.floor(timer / 60);
      const secs = timer % 60;
      timerDisplay.innerText = `${mins}:${secs.toString().padStart(2, '0')}`;
      if (timer <= 0) {
        clearInterval(timerId);
        finish();
      }
    }, 1000);

    const finishBtn = levelDiv.querySelector('#finish-l1');
    const finish = async () => {
      clearInterval(timerId);
      window.removeEventListener('keypress', l1t3Key);
      let quizCorrect = 0;
      answers.forEach((ans, i) => { if (ans === questions[i].c) quizCorrect++; });
      l1Marks += quizCorrect;
      updateState({ scores: { ...gameState.scores, l1: l1Marks } }, true);
      renderChestAnimation();
    };
    const l1t3Key = (e) => { if (e.key === 'Enter' && !finishBtn.disabled) finish(); };
    finishBtn.addEventListener('click', finish);
    window.addEventListener('keypress', l1t3Key);
  };

  const renderChestAnimation = () => {
    levelDiv.innerHTML = `
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__zoomIn">
        <div class="relative">
            <div class="absolute inset-0 bg-indigo-500 blur-[100px] opacity-20"></div>
            <div class="text-9xl animate-float relative z-10">🎁</div>
        </div>
        <div class="text-center space-y-3">
            <h2 class="text-5xl font-black bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tighter">Level 1 Complete</h2>
            <p class="text-slate-500 font-mono tracking-widest uppercase text-xs">Credential Generated</p>
        </div>
        
        <div class="card !p-6 bg-indigo-500/10 border-indigo-500/30 flex flex-col items-center gap-2">
            <span class="text-[10px] font-black text-indigo-400 uppercase">ACCESS KEY FOR LEVEL 2</span>
            <span class="text-3xl font-mono text-white font-black tracking-[0.2em]">${gameState.keys.l1}</span>
            <p class="text-[9px] text-slate-500 mt-2 font-black uppercase">Memorize this key. It is required to open the Level 2 door.</p>
        </div>

        <button id="go-l2" class="btn-primary px-12 py-5 group">
          <span>PROCEED TO LEVEL 2</span>
        </button>
      </div>
    `;
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    const goL2Btn = levelDiv.querySelector('#go-l2');
    const proceed = () => {
      window.removeEventListener('keypress', l1finishKey);
      animateCSS(levelDiv, 'fadeOut').then(() => { updateState({ level: 2 }); });
    };
    const l1finishKey = (e) => { if (e.key === 'Enter') proceed(); };
    goL2Btn.addEventListener('click', proceed);
    window.addEventListener('keypress', l1finishKey);
  };

  renderBriefing();
};
