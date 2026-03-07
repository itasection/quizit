import { gameState } from './state';
import { formatTime } from './utils';
import { submitScore } from './services/backend';

export const renderResults = (container) => {
    const { scores, user, totalTime, gameMode } = gameState;
    const totalMarks = scores.l1 + scores.l2 + scores.l3;
    const timeStr = formatTime(totalTime);

    const div = document.createElement('div');
    div.className = 'w-full max-w-4xl mx-auto py-10';

    div.innerHTML = `
    <div class="card !p-0 overflow-hidden animate__animated animate__zoomIn">
      <div class="bg-indigo-600 p-10 text-center relative print:!bg-indigo-600 print:!text-white" style="-webkit-print-color-adjust: exact;">
        <div class="absolute inset-0 bg-black/20 print:hidden"></div>
        <div class="relative z-10">
            <h1 class="text-xs font-black tracking-[0.5em] text-indigo-200 uppercase mb-4 print:text-indigo-800">Final Intelligence Report</h1>
            <h2 class="text-6xl font-black text-white italic tracking-tighter uppercase whitespace-nowrap print:text-indigo-900">Expedition Complete</h2>
        </div>
      </div>

      <div class="p-12 space-y-12">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="space-y-1 text-center md:text-left">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest print:text-slate-700">Candidate</p>
                <p class="text-2xl font-bold text-white print:text-black">${user.name}</p>
                <div class="flex flex-wrap justify-center md:justify-start gap-2 text-[10px] font-mono text-slate-500 print:text-black">
                  <span>${user.regNo}</span> | <span>${user.department}</span> | <span>${user.year}</span>
                </div>
            </div>
            <div class="h-12 w-[1px] bg-slate-800 hidden md:block"></div>
            <div class="space-y-1 text-center">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Section</p>
                <span class="text-xl font-bold text-white">${user.section}</span>
            </div>
            <div class="h-12 w-[1px] bg-slate-800 hidden md:block"></div>
            <div class="space-y-1 text-center md:text-right">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest print:text-slate-700">Elapsed Time</p>
                <p class="text-2xl font-black text-white font-mono tracking-tighter print:text-black">${timeStr}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 text-center space-y-2">
                <p class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Foundation</p>
                <p class="text-5xl font-black text-white">${scores.l1}<span class="text-lg text-slate-600">/35</span></p>
                <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-indigo-500" style="width: ${(scores.l1 / 35) * 100}%"></div>
                </div>
            </div>
            
            <div class="p-8 rounded-[2.5rem] bg-yellow-500/5 border border-yellow-500/10 text-center space-y-2">
                <p class="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Engagement</p>
                <p class="text-5xl font-black text-white">${scores.l2}<span class="text-lg text-slate-600">/60</span></p>
                <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-yellow-500" style="width: ${(scores.l2 / 60) * 100}%"></div>
                </div>
            </div>

            <div class="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 text-center space-y-2">
                <p class="text-[10px] font-black text-red-500 uppercase tracking-widest">Zenith</p>
                <p class="text-5xl font-black text-white">${scores.l3}<span class="text-lg text-slate-600">/130</span></p>
                <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-red-500" style="width: ${(scores.l3 / 130) * 100}%"></div>
                </div>
            </div>
        </div>

        <div class="bg-slate-950/50 rounded-3xl p-10 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden print:border-black/20 print:bg-white">
            <div class="absolute inset-0 bg-indigo-500/5 pointer-events-none print:hidden"></div>
            <p class="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-4 print:text-slate-700">Cumulative Score</p>
            <div class="relative">
                <div class="absolute inset-0 bg-white blur-[60px] opacity-10 print:hidden"></div>
                <p class="text-8xl font-black text-white relative z-10 print:text-black">${totalMarks}<span class="text-3xl text-slate-700 ml-2">/225</span></p>
            </div>
        </div>

        <div id="sync-status" class="flex items-center justify-center gap-3 py-4 px-6 bg-slate-900/50 rounded-2xl border border-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">
           <span class="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
           Finalizing data synchronization...
        </div>

        <div class="flex flex-col md:flex-row gap-4">
            <button onclick="window.location.reload()" class="btn-primary flex-1 group !py-6">
                <span>NEW SESSION</span>
            </button>
            <button id="download-report" class="btn-secondary flex-1 !rounded-2xl !py-6 group">
                <span>DOWNLOAD REPORT</span>
            </button>
            <button onclick="window.print()" class="btn-secondary flex-1 !rounded-2xl !py-6 group">
                <span>PRINT EXPORT</span>
            </button>
        </div>
      </div>
    </div>
  `;

    container.appendChild(div);

    const statusEl = div.querySelector('#sync-status');
    const downloadBtn = div.querySelector('#download-report');

    const data = {
        ...user,
        l1: scores.l1,
        l2: scores.l2,
        l3: scores.l3,
        totalTime: timeStr,
        mode: gameMode
    };

    downloadBtn.addEventListener('click', () => {
        const reportText = `
DIGITAL MARKETING TREASURE HUNT - FINAL REPORT
----------------------------------------------
Student Name  : ${user.name}
Enrollment No : ${user.enrollNo}
Register No   : ${user.regNo}
Department    : ${user.department}
Year of Study : ${user.year}
Section       : ${user.section}
Email         : ${user.email}

PERFORMANCE SUMMARY:
Level 1 (Foundation) : ${scores.l1}/35
Level 2 (Engagement) : ${scores.l2}/60
Level 3 (Zenith)     : ${scores.l3}/130
----------------------------------------------
TOTAL SCORE          : ${totalMarks}/225
ELAPSED TIME         : ${timeStr}
----------------------------------------------
Verification Status  : Synchronized
Generated on         : ${new Date().toLocaleString()}

Developed with 🤍 by weBnovA
      `;
        const blob = new Blob([reportText], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Report_${user.name.replace(/\s+/g, '_')}.txt`;
        a.click();
    });

    // Add explicit printable report text for print media
    const printReport = document.createElement('div');
    printReport.className = 'hidden print:block font-sans text-sm p-4';
    printReport.innerHTML = `
        <div class="border-4 border-double border-black p-8">
            <div class="text-center mb-8 border-b-2 border-black pb-6">
                <h1 class="text-4xl font-black uppercase tracking-tighter mb-2">QuizIt: Zenith Accomplishment</h1>
                <p class="text-sm font-mono uppercase tracking-widest text-slate-600">Official Performance Intelligence Report</p>
            </div>

            <div class="grid grid-cols-2 gap-8 mb-8">
                <div class="space-y-3">
                    <p class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1">CANDIDATE INFORMATION</p>
                    <div class="space-y-1">
                        <p class="text-2xl font-bold">${user.name}</p>
                        <p class="font-mono text-xs">REG: ${user.regNo} | ENROLL: ${user.enrollNo}</p>
                        <p class="font-mono text-xs">${user.department} | YEAR ${user.year} | SEC ${user.section}</p>
                        <p class="font-mono text-xs">${user.email}</p>
                    </div>
                </div>
                <div class="text-right space-y-3">
                    <p class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-1">MISSION LOGS</p>
                    <div class="space-y-1">
                        <p class="text-2xl font-bold">Total: ${totalMarks}/225</p>
                        <p class="font-mono text-xs">COMPLETION TIME: ${timeStr}</p>
                        <p class="font-mono text-xs">DATE: ${new Date().toLocaleDateString()}</p>
                        <p class="font-mono text-xs">STATUS: <span class="text-green-700 font-bold">VERIFIED</span></p>
                    </div>
                </div>
            </div>

            <div class="mb-10">
                <p class="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] mb-4">PHASE BREAKDOWN</p>
                <div class="grid grid-cols-1 gap-4">
                    <div class="flex justify-between items-center bg-slate-50 p-3 border border-slate-200">
                        <span class="font-bold">Level 1: Foundation (SEO & Basics)</span>
                        <span class="font-mono">${scores.l1}/35</span>
                    </div>
                    <div class="flex justify-between items-center bg-slate-50 p-3 border border-slate-200">
                        <span class="font-bold">Level 2: Engagement (Analysis & Connnect)</span>
                        <span class="font-mono">${scores.l2}/60</span>
                    </div>
                    <div class="flex justify-between items-center bg-slate-50 p-3 border border-slate-200">
                        <span class="font-bold">Level 3: Zenith (Advanced Protocol)</span>
                        <span class="font-mono">${scores.l3}/130</span>
                    </div>
                </div>
            </div>

            <div class="bg-black text-white p-6 text-center mb-6">
                <p class="text-xs uppercase tracking-widest mb-1">Final Performance Rating</p>
                <p class="text-4xl font-black italic tracking-tighter">${totalMarks >= 200 ? 'LEGENDARY' : totalMarks >= 150 ? 'EXCEPTIONAL' : 'QUALIFIED'}</p>
            </div>

            <div class="mt-8 pt-8 border-t border-dashed border-slate-300 text-center">
                <p class="text-[9px] uppercase text-slate-400 tracking-widest mb-2 italic">Authentication valid only when signed by monitoring authority</p>
                <div class="flex justify-between items-end mt-12 px-10">
                    <div class="w-48 border-t border-black pt-2 text-center text-[10px] font-bold">CANDIDATE SIGNATURE</div>
                    <div class="w-48 border-t border-black pt-2 text-center text-[10px] font-bold">SUPERVISOR SEAL</div>
                </div>
            </div>

            <div class="mt-12 text-center flex flex-col items-center">
                <p class="text-[10px] font-bold uppercase text-slate-500 mb-2">Developed with 🤍 by</p>
                <p class="dev-group" style="background: none !important; -webkit-background-clip: initial !important; color: #ea580c !important; font-family: 'Pacifico' !important; font-size: 1.5rem !important;">weBnovA</p>
            </div>
        </div>
    `;
    div.appendChild(printReport);

    if (!gameState.hasSubmitted) {
        updateState({ hasSubmitted: true }, true);
        submitScore(data)
            .then(() => {
                statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-green-500"></span> TERMINAL STATUS: SYNCHRONIZED √`;
                statusEl.classList.remove('text-slate-400');
                statusEl.classList.add('text-green-400', 'border-green-500/20');
            })
            .catch((err) => {
                statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-red-500"></span> TERMINAL STATUS: OFFLINE MODE ACTIVE`;
                statusEl.classList.remove('text-slate-400');
                statusEl.classList.add('text-red-400', 'border-red-500/20');
            });
    } else {
        statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-green-500"></span> TERMINAL STATUS: DATA PREVIOUSLY LOGGED √`;
        statusEl.classList.remove('text-slate-400');
        statusEl.classList.add('text-green-400', 'border-green-500/20');
    }
};
