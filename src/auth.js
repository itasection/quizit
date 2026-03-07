import { updateState } from './state';
import { animateCSS } from './utils';
import { submitScore } from './services/backend';

export const renderLogin = (container) => {
  const div = document.createElement('div');
  div.className = 'flex flex-col items-center justify-center min-h-[80vh] py-10';

  div.innerHTML = `
    <div class="card w-full max-w-xl animate__animated animate__zoomIn relative">
      <div class="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-indigo-600 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-indigo-500/50 glow-indigo">
        <span class="text-4xl text-white -rotate-12 font-black">DX</span>
      </div>

      <div class="text-center mt-8 mb-10">
        <h1 class="text-5xl font-black mb-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-tighter">
          TREASURE HUNT
        </h1>
        <div class="flex items-center justify-center gap-3">
          <span class="h-[1px] w-8 bg-slate-700"></span>
          <p class="text-slate-500 text-xs font-black uppercase tracking-[0.3em]">Digital Marketing Edition v2.0</p>
          <span class="h-[1px] w-8 bg-slate-700"></span>
        </div>
      </div>
      
      <form id="login-form" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Student Name</label>
            <input type="text" id="student-name" required placeholder="Full Name" class="input-field">
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <input type="email" id="student-email" required placeholder="email@university.com" class="input-field">
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Enrollment Number</label>
            <input type="text" id="enroll-no" required placeholder="Enroll No" class="input-field">
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Register Number</label>
            <input type="text" id="reg-no" required placeholder="Reg No" class="input-field">
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Department</label>
            <select id="dept" required class="input-field bg-slate-900">
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
              <option value="CIVIL">CIVIL</option>
              <option value="MBA">MBA</option>
            </select>
          </div>
          <div class="space-y-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Year of Study</label>
            <select id="year" required class="input-field bg-slate-900">
              <option value="">Select Year</option>
              <option value="First Year">First Year</option>
              <option value="Second Year">Second Year</option>
              <option value="Third Year">Third Year</option>
              <option value="Final Year">Final Year</option>
            </select>
          </div>
          <div class="space-y-2 md:col-span-2">
            <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Section</label>
            <input type="text" id="section" required placeholder="e.g. A or B" class="input-field">
          </div>
        </div>
        
        <button type="submit" class="btn-primary w-full shadow-indigo-500/40 !py-6">
          <span>START EXPEDITION</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </form>
    </div>
  `;

  container.appendChild(div);

  const form = div.querySelector('#login-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: div.querySelector('#student-name').value,
      email: div.querySelector('#student-email').value,
      enrollNo: div.querySelector('#enroll-no').value,
      regNo: div.querySelector('#reg-no').value,
      department: div.querySelector('#dept').value,
      year: div.querySelector('#year').value,
      section: div.querySelector('#section').value,
      mode: 'campaign'
    };

    const btn = form.querySelector('button');
    btn.disabled = true;
    btn.innerHTML = '<span class="animate-pulse italic">INITIALIZING...</span>';

    // Data will be captured and submitted only at the final results screen

    // Request Fullscreen on transition
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request denied", err);
    }

    animateCSS(div, 'fadeOut').then(() => {
      updateState({
        user: data,
        level: 1,
        startTime: Date.now(),
        gameMode: 'campaign'
      });
    });
  });
};
