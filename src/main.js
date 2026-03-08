import './style.css';
import { gameState, setRenderCallback, updateState } from './state';
import { renderLogin } from './auth';
import { renderLevel1 } from './levels/level1';
import { renderLevel2 } from './levels/level2';
import { renderLevel3 } from './levels/level3';
import { renderResults } from './results';
import { submitScore } from './services/backend';
import { formatTime } from './utils';

const app = document.querySelector('#app');

const renderFooter = (container) => {
  const footer = document.createElement('footer');
  footer.className = 'footer mt-4';
  footer.innerHTML = `
    <p class="developer-credit">Developed with 🤍 by</p>
    <p class="dev-group">weBnovA</p>
  `;
  container.appendChild(footer);
};

const render = (state) => {
  app.innerHTML = '';
  const contentDiv = document.createElement('div');
  contentDiv.className = 'min-h-[60vh] flex flex-col justify-center';
  app.appendChild(contentDiv);

  switch (state.level) {
    case -1:
      renderTermination(contentDiv);
      break;
    case 0:
      renderLogin(contentDiv);
      break;
    case 1:
      renderLevel1(contentDiv);
      break;
    case 2:
      renderLevel2(contentDiv);
      break;
    case 3:
      renderLevel3(contentDiv);
      break;
    case 4:
      renderResults(contentDiv);
      break;
    default:
      contentDiv.innerHTML = '<h1>Error: State not found</h1>';
  }

  if (state.level >= 0) {
    renderFooter(app);
  }
};

const renderTermination = (container) => {
  container.innerHTML = `
    <div class="flex flex-col items-center justify-center min-h-[80vh] space-y-8 animate__animated animate__zoomIn text-center px-4">
      <div class="text-9xl">💀</div>
      <div class="space-y-4">
        <h1 class="text-6xl font-black text-red-600 uppercase tracking-tighter">PROTOCOL BREACHED</h1>
        <p class="text-slate-400 max-w-md font-mono uppercase text-sm">You attempted to escape the classified parameters. The system has locked your session. This incident has been logged and your access is now permanently revoked for this session.</p>
        <p class="text-red-500 font-black animate-pulse">DO NOT ATTEMPT TO BYPASS THIS SCREEN.</p>
      </div>
      <div class="card !bg-red-950/20 border-red-500/30 p-8 space-y-4">
        <p class="text-xs text-red-400 font-black uppercase tracking-widest">System Integrity: COMPROMISED</p>
        <button onclick="window.location.reload()" class="btn-primary !bg-red-600 !border-none">RETRY FROM BEGINNING</button>
      </div>
    </div>
  `;
};

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement && gameState.level > 0 && gameState.level < 4) {
    const timeStr = formatTime(Date.now() - gameState.startTime);
    submitScore({
      ...gameState.user,
      l1: gameState.scores.l1,
      l2: gameState.scores.l2,
      l3: gameState.scores.l3,
      totalTime: timeStr,
      status: 'TERMINATED_BY_FULLSCREEN_EXIT'
    }).then(() => console.log('Termination data submitted')).catch(err => console.error(err));
    
    updateState({ level: -1 });
  }
});

document.addEventListener('contextmenu', (e) => e.preventDefault());

setRenderCallback(render);
render(gameState);
