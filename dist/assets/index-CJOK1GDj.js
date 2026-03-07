(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const x of document.querySelectorAll('link[rel="modulepreload"]'))s(x);new MutationObserver(x=>{for(const M of x)if(M.type==="childList")for(const R of M.addedNodes)R.tagName==="LINK"&&R.rel==="modulepreload"&&s(R)}).observe(document,{childList:!0,subtree:!0});function d(x){const M={};return x.integrity&&(M.integrity=x.integrity),x.referrerPolicy&&(M.referrerPolicy=x.referrerPolicy),x.crossOrigin==="use-credentials"?M.credentials="include":x.crossOrigin==="anonymous"?M.credentials="omit":M.credentials="same-origin",M}function s(x){if(x.ep)return;x.ep=!0;const M=d(x);fetch(x.href,M)}})();const P={user:{name:"",email:"",enrollNo:"",regNo:"",department:"",year:"",section:""},level:0,gameMode:"campaign",scores:{l1:0,l2:0,l3:0},startTime:null,totalTime:0,keys:{l1:"SEO_MASTER_77",l2:"VAULT_SECRET_99"},inventory:[],hasSubmitted:!1},Y=(T,a=!1)=>{Object.assign(P,T),a||Le()};let ue=()=>{};const Me=T=>{ue=T},Le=()=>{ue(P)},_=(T,a,d="animate__")=>new Promise(s=>{const x=`${d}${a}`,M=typeof T=="string"?document.querySelector(T):T;M.classList.add(`${d}animated`,x);function R(N){N.stopPropagation(),M.classList.remove(`${d}animated`,x),s("Animation ended")}M.addEventListener("animationend",R,{once:!0})}),me=T=>{const a=Math.floor(T/1e3%60);return`${Math.floor(T/(1e3*60)%60).toString().padStart(2,"0")}:${a.toString().padStart(2,"0")}`},pe="https://script.google.com/macros/s/AKfycby9bBV-lEg5XQ8Rrwfx-kpBVW-eEd2o4wtU7EnR3G3Rf_WwDHoF0UnEOHXs_118Jnux9w/exec",he=async T=>{if(pe.includes("YOUR_SCRIPT_ID"))return console.warn("Backend Sync Skip: SCRIPT_URL is still the placeholder. Please deploy your Google Apps Script and update src/services/backend.js"),!1;try{const a=await fetch(pe,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify(T)});return!0}catch(a){return console.error("Error submitting score to Google Sheet:",a),!1}},qe=T=>{const a=document.createElement("div");a.className="flex flex-col items-center justify-center min-h-[80vh] py-10",a.innerHTML=`
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
  `,T.appendChild(a);const d=a.querySelector("#login-form");d.addEventListener("submit",async s=>{s.preventDefault();const x={name:a.querySelector("#student-name").value,email:a.querySelector("#student-email").value,enrollNo:a.querySelector("#enroll-no").value,regNo:a.querySelector("#reg-no").value,department:a.querySelector("#dept").value,year:a.querySelector("#year").value,section:a.querySelector("#section").value,mode:"campaign"},M=d.querySelector("button");M.disabled=!0,M.innerHTML='<span class="animate-pulse italic">INITIALIZING...</span>';try{document.documentElement.requestFullscreen&&await document.documentElement.requestFullscreen()}catch(R){console.warn("Fullscreen request denied",R)}_(a,"fadeOut").then(()=>{Y({user:x,level:1,startTime:Date.now(),gameMode:"campaign"})})})};var se={};(function T(a,d,s,x){var M=!!(a.Worker&&a.Blob&&a.Promise&&a.OffscreenCanvas&&a.OffscreenCanvasRenderingContext2D&&a.HTMLCanvasElement&&a.HTMLCanvasElement.prototype.transferControlToOffscreen&&a.URL&&a.URL.createObjectURL),R=typeof Path2D=="function"&&typeof DOMMatrix=="function",N=(function(){if(!a.OffscreenCanvas)return!1;try{var t=new OffscreenCanvas(1,1),e=t.getContext("2d");e.fillRect(0,0,1,1);var u=t.transferToImageBitmap();e.createPattern(u,"no-repeat")}catch{return!1}return!0})();function O(){}function F(t){var e=d.exports.Promise,u=e!==void 0?e:a.Promise;return typeof u=="function"?new u(t):(t(O,O),null)}var L=(function(t,e){return{transform:function(u){if(t)return u;if(e.has(u))return e.get(u);var g=new OffscreenCanvas(u.width,u.height),b=g.getContext("2d");return b.drawImage(u,0,0),e.set(u,g),g},clear:function(){e.clear()}}})(N,new Map),m=(function(){var t=Math.floor(16.666666666666668),e,u,g={},b=0;return typeof requestAnimationFrame=="function"&&typeof cancelAnimationFrame=="function"?(e=function(y){var k=Math.random();return g[k]=requestAnimationFrame(function f(E){b===E||b+t-1<E?(b=E,delete g[k],y()):g[k]=requestAnimationFrame(f)}),k},u=function(y){g[y]&&cancelAnimationFrame(g[y])}):(e=function(y){return setTimeout(y,t)},u=function(y){return clearTimeout(y)}),{frame:e,cancel:u}})(),h=(function(){var t,e,u={};function g(b){function y(k,f){b.postMessage({options:k||{},callback:f})}b.init=function(f){var E=f.transferControlToOffscreen();b.postMessage({canvas:E},[E])},b.fire=function(f,E,q){if(e)return y(f,null),e;var A=Math.random().toString(36).slice(2);return e=F(function(C){function $(D){D.data.callback===A&&(delete u[A],b.removeEventListener("message",$),e=null,L.clear(),q(),C())}b.addEventListener("message",$),y(f,A),u[A]=$.bind(null,{data:{callback:A}})}),e},b.reset=function(){b.postMessage({reset:!0});for(var f in u)u[f](),delete u[f]}}return function(){if(t)return t;if(!s&&M){var b=["var CONFETTI, SIZE = {}, module = {};","("+T.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join(`
`);try{t=new Worker(URL.createObjectURL(new Blob([b])))}catch(y){return typeof console<"u"&&typeof console.warn=="function"&&console.warn("🎊 Could not load worker",y),null}g(t)}return t}})(),o={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function n(t,e){return e?e(t):t}function v(t){return t!=null}function r(t,e,u){return n(t&&v(t[e])?t[e]:o[e],u)}function w(t){return t<0?0:Math.floor(t)}function i(t,e){return Math.floor(Math.random()*(e-t))+t}function p(t){return parseInt(t,16)}function l(t){return t.map(c)}function c(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:p(e.substring(0,2)),g:p(e.substring(2,4)),b:p(e.substring(4,6))}}function I(t){var e=r(t,"origin",Object);return e.x=r(e,"x",Number),e.y=r(e,"y",Number),e}function B(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function j(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function X(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}function Q(t,e,u,g,b,y,k,f,E){t.save(),t.translate(e,u),t.rotate(y),t.scale(g,b),t.arc(0,0,1,k,f,E),t.restore()}function J(t){var e=t.angle*(Math.PI/180),u=t.spread*(Math.PI/180);return{x:t.x,y:t.y,wobble:Math.random()*10,wobbleSpeed:Math.min(.11,Math.random()*.1+.05),velocity:t.startVelocity*.5+Math.random()*t.startVelocity,angle2D:-e+(.5*u-Math.random()*u),tiltAngle:(Math.random()*(.75-.25)+.25)*Math.PI,color:t.color,shape:t.shape,tick:0,totalTicks:t.ticks,decay:t.decay,drift:t.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:t.gravity*3,ovalScalar:.6,scalar:t.scalar,flat:t.flat}}function ne(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.velocity*=e.decay,e.flat?(e.wobble=0,e.wobbleX=e.x+10*e.scalar,e.wobbleY=e.y+10*e.scalar,e.tiltSin=0,e.tiltCos=0,e.random=1):(e.wobble+=e.wobbleSpeed,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble),e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2);var u=e.tick++/e.totalTicks,g=e.x+e.random*e.tiltCos,b=e.y+e.random*e.tiltSin,y=e.wobbleX+e.random*e.tiltCos,k=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-u)+")",t.beginPath(),R&&e.shape.type==="path"&&typeof e.shape.path=="string"&&Array.isArray(e.shape.matrix))t.fill(ge(e.shape.path,e.shape.matrix,e.x,e.y,Math.abs(y-g)*.1,Math.abs(k-b)*.1,Math.PI/10*e.wobble));else if(e.shape.type==="bitmap"){var f=Math.PI/10*e.wobble,E=Math.abs(y-g)*.1,q=Math.abs(k-b)*.1,A=e.shape.bitmap.width*e.scalar,C=e.shape.bitmap.height*e.scalar,$=new DOMMatrix([Math.cos(f)*E,Math.sin(f)*E,-Math.sin(f)*q,Math.cos(f)*q,e.x,e.y]);$.multiplySelf(new DOMMatrix(e.shape.matrix));var D=t.createPattern(L.transform(e.shape.bitmap),"no-repeat");D.setTransform($),t.globalAlpha=1-u,t.fillStyle=D,t.fillRect(e.x-A/2,e.y-C/2,A,C),t.globalAlpha=1}else if(e.shape==="circle")t.ellipse?t.ellipse(e.x,e.y,Math.abs(y-g)*e.ovalScalar,Math.abs(k-b)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):Q(t,e.x,e.y,Math.abs(y-g)*e.ovalScalar,Math.abs(k-b)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if(e.shape==="star")for(var S=Math.PI/2*3,W=4*e.scalar,H=8*e.scalar,U=e.x,G=e.y,K=5,V=Math.PI/K;K--;)U=e.x+Math.cos(S)*H,G=e.y+Math.sin(S)*H,t.lineTo(U,G),S+=V,U=e.x+Math.cos(S)*W,G=e.y+Math.sin(S)*W,t.lineTo(U,G),S+=V;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(b)),t.lineTo(Math.floor(y),Math.floor(k)),t.lineTo(Math.floor(g),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}function ee(t,e,u,g,b){var y=e.slice(),k=t.getContext("2d"),f,E,q=F(function(A){function C(){f=E=null,k.clearRect(0,0,g.width,g.height),L.clear(),b(),A()}function $(){s&&!(g.width===x.width&&g.height===x.height)&&(g.width=t.width=x.width,g.height=t.height=x.height),!g.width&&!g.height&&(u(t),g.width=t.width,g.height=t.height),k.clearRect(0,0,g.width,g.height),y=y.filter(function(D){return ne(k,D)}),y.length?f=m.frame($):C()}f=m.frame($),E=C});return{addFettis:function(A){return y=y.concat(A),q},canvas:t,promise:q,reset:function(){f&&m.cancel(f),E&&E()}}}function z(t,e){var u=!t,g=!!r(e||{},"resize"),b=!1,y=r(e,"disableForReducedMotion",Boolean),k=M&&!!r(e||{},"useWorker"),f=k?h():null,E=u?B:j,q=t&&f?!!t.__confetti_initialized:!1,A=typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion)").matches,C;function $(S,W,H){for(var U=r(S,"particleCount",w),G=r(S,"angle",Number),K=r(S,"spread",Number),V=r(S,"startVelocity",Number),be=r(S,"decay",Number),ye=r(S,"gravity",Number),we=r(S,"drift",Number),le=r(S,"colors",l),ke=r(S,"ticks",Number),oe=r(S,"shapes"),Ee=r(S,"scalar"),Se=!!r(S,"flat"),ce=I(S),de=U,te=[],Te=t.width*ce.x,Ie=t.height*ce.y;de--;)te.push(J({x:Te,y:Ie,angle:G,spread:K,startVelocity:V,color:le[de%le.length],shape:oe[i(0,oe.length)],ticks:ke,decay:be,gravity:ye,drift:we,scalar:Ee,flat:Se}));return C?C.addFettis(te):(C=ee(t,te,E,W,H),C.promise)}function D(S){var W=y||r(S,"disableForReducedMotion",Boolean),H=r(S,"zIndex",Number);if(W&&A)return F(function(V){V()});u&&C?t=C.canvas:u&&!t&&(t=X(H),document.body.appendChild(t)),g&&!q&&E(t);var U={width:t.width,height:t.height};f&&!q&&f.init(t),q=!0,f&&(t.__confetti_initialized=!0);function G(){if(f){var V={getBoundingClientRect:function(){if(!u)return t.getBoundingClientRect()}};E(V),f.postMessage({resize:{width:V.width,height:V.height}});return}U.width=U.height=null}function K(){C=null,g&&(b=!1,a.removeEventListener("resize",G)),u&&t&&(document.body.contains(t)&&document.body.removeChild(t),t=null,q=!1)}return g&&!b&&(b=!0,a.addEventListener("resize",G,!1)),f?f.fire(S,U,K):$(S,U,K)}return D.reset=function(){f&&f.reset(),C&&C.reset()},D}var Z;function ie(){return Z||(Z=z(null,{useWorker:!0,resize:!0})),Z}function ge(t,e,u,g,b,y,k){var f=new Path2D(t),E=new Path2D;E.addPath(f,new DOMMatrix(e));var q=new Path2D;return q.addPath(E,new DOMMatrix([Math.cos(k)*b,Math.sin(k)*b,-Math.sin(k)*y,Math.cos(k)*y,u,g])),q}function ve(t){if(!R)throw new Error("path confetti are not supported in this browser");var e,u;typeof t=="string"?e=t:(e=t.path,u=t.matrix);var g=new Path2D(e),b=document.createElement("canvas"),y=b.getContext("2d");if(!u){for(var k=1e3,f=k,E=k,q=0,A=0,C,$,D=0;D<k;D+=2)for(var S=0;S<k;S+=2)y.isPointInPath(g,D,S,"nonzero")&&(f=Math.min(f,D),E=Math.min(E,S),q=Math.max(q,D),A=Math.max(A,S));C=q-f,$=A-E;var W=10,H=Math.min(W/C,W/$);u=[H,0,0,H,-Math.round(C/2+f)*H,-Math.round($/2+E)*H]}return{type:"path",path:e,matrix:u}}function xe(t){var e,u=1,g="#000000",b='"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';typeof t=="string"?e=t:(e=t.text,u="scalar"in t?t.scalar:u,b="fontFamily"in t?t.fontFamily:b,g="color"in t?t.color:g);var y=10*u,k=""+y+"px "+b,f=new OffscreenCanvas(y,y),E=f.getContext("2d");E.font=k;var q=E.measureText(e),A=Math.ceil(q.actualBoundingBoxRight+q.actualBoundingBoxLeft),C=Math.ceil(q.actualBoundingBoxAscent+q.actualBoundingBoxDescent),$=2,D=q.actualBoundingBoxLeft+$,S=q.actualBoundingBoxAscent+$;A+=$+$,C+=$+$,f=new OffscreenCanvas(A,C),E=f.getContext("2d"),E.font=k,E.fillStyle=g,E.fillText(e,D,S);var W=1/u;return{type:"bitmap",bitmap:f.transferToImageBitmap(),matrix:[W,0,0,W,-A*W/2,-C*W/2]}}d.exports=function(){return ie().apply(this,arguments)},d.exports.reset=function(){ie().reset()},d.exports.create=z,d.exports.shapeFromPath=ve,d.exports.shapeFromText=xe})((function(){return typeof window<"u"?window:typeof self<"u"?self:this||{}})(),se,!1);const re=se.exports;se.exports.create;const Ce=T=>{let a=0,d=0;const s=document.createElement("div");s.className="w-full max-w-4xl mx-auto horror-blink",T.appendChild(s);const x=(L="")=>`
    <div class="flex justify-between items-center mb-8 card !py-4 !px-8 glow-indigo border-indigo-500/20">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-xl">
           ${a===1?"🧩":a===2?"🖼️":"📝"}
        </div>
        <div>
          <h2 class="text-sm font-black text-indigo-400 uppercase tracking-tighter">Level 1: The Foundation</h2>
          <p class="text-[10px] text-slate-500 font-mono uppercase">${a===0?"Briefing":`Phase ${a} of 3`}</p>
        </div>
      </div>
      <div class="flex items-center gap-6">
        ${L}
        <div id="status" class="text-xs font-black px-3 py-1 bg-indigo-500/10 text-indigo-500 rounded-full border border-indigo-500/20 tracking-widest">ACTIVE SESSION</div>
      </div>
    </div>
  `,M=()=>{a=0,s.innerHTML=`
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
    `;const L=s.querySelector("#start-l1"),m=()=>{window.removeEventListener("keypress",h),_(s,"fadeOut").then(R)},h=o=>{o.key==="Enter"&&m()};L.addEventListener("click",m),window.addEventListener("keypress",h)},R=()=>{a=1;const L=[{q:"I am the process of improving the quality and quantity of website traffic from search engines. Who am I?",a:["SMM","SEO","PPC"],c:1},{q:"I am a metric that measures the percentage of users who perform a desired action. What am I?",a:["Conversion Rate","Bounce Rate","CTR"],c:0},{q:"I am the practice of using social media platforms to connect with your audience. What am I?",a:["SEM","SMM","Display Ads"],c:1},{q:"I am a short-range wireless technology that allows mobile marketing in physical stores. What am I?",a:["GPS","NFC","Beacons"],c:2},{q:"I am a type of marketing where you pay a fee each time one of your ads is clicked. What am I?",a:["SEO","Content Marketing","PPC"],c:2},{q:"I am the digital file that a browser stores on a user's machine to track behavior. What am I?",a:["Cache","Cookie","Pixel"],c:1},{q:"I am a non-linear way of marketing where consumers find the brand themselves. What am I?",a:["Outbound","Inbound","Direct"],c:1},{q:"I am the practice of creating and distributing valuable, relevant content to attract a defined audience. What am I?",a:["SEO","Content Marketing","SEM"],c:1},{q:"I am the specific page a user arrives at after clicking a link in an ad or email. What am I?",a:["Homepage","Landing Page","Sitemap"],c:1},{q:"I am the number of times an ad is displayed to a user. What am I?",a:["Reach","Impressions","Clicks"],c:1}];let m=600;s.innerHTML=`
      ${x('<span id="task1-timer" class="text-2xl font-black font-mono text-white bg-indigo-600 px-3 py-1 rounded-lg">10:00</span>')}
      <div class="card space-y-8 animate__animated animate__fadeInUp">
        <div class="space-y-2">
            <span class="badge bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Challenge 01</span>
            <h3 class="text-3xl font-black">Twisted Riddles</h3>
            <p class="text-slate-400 text-sm">Decode the marketing jargon. Select the correct term for each clue.</p>
        </div>

        <div id="riddle-list" class="space-y-6">
          ${L.map((i,p)=>`
            <div class="p-6 bg-slate-800/20 rounded-2xl border border-slate-700/30 space-y-4">
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-lg bg-indigo-600/20 flex items-center justify-center text-[10px] font-black text-indigo-400 border border-indigo-500/20">${p+1}</span>
                <p class="text-slate-200 text-sm font-medium leading-relaxed">${i.q}</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${i.a.map((l,c)=>`
                  <button class="quiz-opt" data-q="${p}" data-idx="${c}">
                    ${l}
                  </button>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
        
        <button id="submit-riddles" class="btn-primary w-full group py-5">
          <span>VALIDATE ANSWERS</span>
        </button>
      </div>
    `;const h=new Array(L.length).fill(null);s.querySelectorAll(".quiz-opt").forEach(i=>{i.addEventListener("click",()=>{const p=parseInt(i.dataset.q),l=parseInt(i.dataset.idx);h[p]=l,s.querySelectorAll(`.quiz-opt[data-q="${p}"]`).forEach(c=>c.classList.remove("selected")),i.classList.add("selected")})});const o=s.querySelector("#task1-timer"),n=setInterval(()=>{m--;const i=Math.floor(m/60),p=m%60;o.innerText=`${i}:${p.toString().padStart(2,"0")}`,m<=0&&(clearInterval(n),r())},1e3),v=s.querySelector("#submit-riddles"),r=()=>{clearInterval(n),window.removeEventListener("keypress",w);let i=0;h.forEach((p,l)=>{p===L[l].c&&i++}),d=i,_(s,"fadeOutDown").then(()=>{N()})},w=i=>{i.key==="Enter"&&r()};v.addEventListener("click",r),window.addEventListener("keypress",w)},N=()=>{a=2;let L=300;s.innerHTML=`
      ${x('<span id="task2-timer" class="text-2xl font-black font-mono text-white bg-purple-600 px-3 py-1 rounded-lg">5:00</span>')}
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
    `;const m=s.querySelector("#puzzle-grid");[...Array.from({length:16},(l,c)=>c)].sort(()=>Math.random()-.5).forEach((l,c)=>{const I=document.createElement("div");I.className="puzzle-piece",I.draggable=!0,I.dataset.current=c,I.dataset.original=l,I.style.backgroundImage="url(/puzzle.png)",I.style.backgroundSize="410% 410%",I.style.backgroundPosition=`${l%4/3*100}% ${Math.floor(l/4)/3*100}%`,I.style.aspectRatio="1/1",m.appendChild(I)});let n=null;m.addEventListener("dragstart",l=>{n=l.target.closest(".puzzle-piece")}),m.addEventListener("dragend",l=>{n&&(n.style.opacity="1")}),m.addEventListener("dragover",l=>l.preventDefault()),m.addEventListener("drop",l=>{l.preventDefault();const c=l.target.closest(".puzzle-piece");if(c&&n&&c!==n){const I=c.style.backgroundPosition,B=c.dataset.original;c.style.backgroundPosition=n.style.backgroundPosition,c.dataset.original=n.dataset.original,n.style.backgroundPosition=I,n.dataset.original=B}});const v=s.querySelector("#task2-timer"),r=setInterval(()=>{L--;const l=Math.floor(L/60),c=L%60;v.innerText=`${l}:${c.toString().padStart(2,"0")}`,L<=0&&(clearInterval(r),i())},1e3),w=s.querySelector("#verify-puzzle"),i=()=>{clearInterval(r),window.removeEventListener("keypress",p);const c=Array.from(m.querySelectorAll(".puzzle-piece")).filter(j=>parseInt(j.dataset.current)===parseInt(j.dataset.original)).length,I=Math.floor(c/16*10),B=L>150?5:L>0?2:0;d+=I+B,_(s,"fadeOutDown").then(O)},p=l=>{l.key==="Enter"&&i()};w.addEventListener("click",i),window.addEventListener("keypress",p)},O=()=>{a=3;const L=[{q:"What is the primary goal of Search Engine Optimization (SEO)?",a:["Increasing paid traffic","Increasing organic visibility","Buying backlinks"],c:1},{q:"Which tool is used for tracking and analyzing website traffic?",a:["Google Search Console","Google Analytics","Google Keyword Planner"],c:1},{q:"Which of the following is an 'Off-Page' SEO factor?",a:["Meta tags","Website speed","Backlinks"],c:2},{q:"What does the 'P' in PPC stand for?",a:["Position","Pay","Preview"],c:1},{q:"Which of these is a social media platform used primarily for B2B marketing?",a:["Snapchat","TikTok","LinkedIn"],c:2},{q:"What is the 'Churn Rate' in digital marketing?",a:["Rate of customer loss","Rate of website loading","Rate of new leads"],c:0},{q:"Which type of email campaign is sent automatically after a user action?",a:["Newsletter","Transactional Email","Blast Email"],c:1},{q:"What does SERP stand for?",a:["Search Engine Result Page","Site Entry Ratio Plan","Social Engagement Response Page"],c:0},{q:"Which of the following is a key component of Content Marketing?",a:["Keyword stuffing","Storytelling","Pop-up ads"],c:1},{q:"What is 'Responsive Design'?",a:["Design that reacts to clicks","Layout that adapts to screen size","Design with many animations"],c:1}];let m=600;s.innerHTML=`
      ${x('<span id="task3-timer" class="text-2xl font-black font-mono text-white bg-cyan-600 px-3 py-1 rounded-lg">10:00</span>')}
      <div class="card space-y-10 animate__animated animate__fadeInUp">
        <div class="space-y-2">
            <span class="badge bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Final Challenge</span>
            <h3 class="text-3xl font-black">Technical Direct 10</h3>
            <p class="text-slate-400 text-sm">Select the most appropriate technical answer. Responses are auto-submitted on timeout.</p>
        </div>

        <div id="quiz" class="space-y-8">
          ${L.map((i,p)=>`
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <span class="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-black pointer-events-none">${p+1}</span>
                <p class="font-bold text-slate-200">${i.q}</p>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                ${i.a.map((l,c)=>`
                  <button class="quiz-opt" data-idx="${c}" data-q="${p}">
                    ${l}
                  </button>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
        
        <button id="finish-l1" class="btn-primary w-full py-6 group">
            <span class="group-hover:animate-pulse">SYNCHRONIZE LEVEL 1 DATA</span>
        </button>
      </div>
    `;const h=new Array(L.length).fill(null);s.querySelectorAll(".quiz-opt").forEach(i=>{i.addEventListener("click",()=>{const p=parseInt(i.dataset.q),l=parseInt(i.dataset.idx);h[p]=l,s.querySelectorAll(`.quiz-opt[data-q="${p}"]`).forEach(c=>c.classList.remove("selected")),i.classList.add("selected")})});const o=s.querySelector("#task3-timer"),n=setInterval(()=>{m--;const i=Math.floor(m/60),p=m%60;o.innerText=`${i}:${p.toString().padStart(2,"0")}`,m<=0&&(clearInterval(n),r())},1e3),v=s.querySelector("#finish-l1"),r=async()=>{clearInterval(n),window.removeEventListener("keypress",w);let i=0;h.forEach((p,l)=>{p===L[l].c&&i++}),d+=i,Y({scores:{...P.scores,l1:d}},!0),F()},w=i=>{i.key==="Enter"&&!v.disabled&&r()};v.addEventListener("click",r),window.addEventListener("keypress",w)},F=()=>{s.innerHTML=`
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
            <span class="text-3xl font-mono text-white font-black tracking-[0.2em]">${P.keys.l1}</span>
            <p class="text-[9px] text-slate-500 mt-2 font-black uppercase">Memorize this key. It is required to open the Level 2 door.</p>
        </div>

        <button id="go-l2" class="btn-primary px-12 py-5 group">
          <span>PROCEED TO LEVEL 2</span>
        </button>
      </div>
    `,re({particleCount:150,spread:70,origin:{y:.6}});const L=s.querySelector("#go-l2"),m=()=>{window.removeEventListener("keypress",h),_(s,"fadeOut").then(()=>{Y({level:2})})},h=o=>{o.key==="Enter"&&m()};L.addEventListener("click",m),window.addEventListener("keypress",h)};M()},Re=T=>{let a=0,d=0;const s=document.createElement("div");s.className="w-full max-w-4xl mx-auto horror-blink",T.appendChild(s);const x=(m="")=>`
    <div class="flex justify-between items-center mb-8 card !py-4 !px-8 glow-indigo border-yellow-500/20">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-yellow-600/20 border border-yellow-500/30 flex items-center justify-center text-xl">
           ${a===0?"🔑":a===1?"⚡":a===2?"🖼️":"🧠"}
        </div>
        <div>
          <h2 class="text-sm font-black text-yellow-400 uppercase tracking-tighter">Level 2: The Engagement</h2>
          <p class="text-[10px] text-slate-500 font-mono uppercase">${a===0?"Verification Required":`Phase ${a} of 3`}</p>
        </div>
      </div>
      <div class="flex items-center gap-6">
        ${m}
        <div id="status" class="text-xs font-black px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full border border-yellow-500/20 tracking-widest">ACTIVE SESSION</div>
      </div>
    </div>
  `,M=()=>{s.innerHTML=`
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="door-container">
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
    `;const m=s.querySelector("#l1-key-input"),h=s.querySelector("#verify-l1-key"),o=s.querySelector("#door-visual"),n=()=>{m.value.trim()===P.keys.l1?(h.disabled=!0,h.innerText="ACCESS GRANTED",o.classList.add("door-open"),setTimeout(()=>{_(s,"fadeOut").then(R)},1500)):_(s.querySelector(".card"),"shakeX")};h.addEventListener("click",n),m.addEventListener("keypress",v=>{v.key==="Enter"&&n()}),m.focus()},R=()=>{a=0,s.innerHTML=`
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
    `;const m=s.querySelector("#start-l2"),h=()=>{_(s,"fadeOut").then(()=>{P.gameMode==="quiz"?F():N()})};m.addEventListener("click",h),window.addEventListener("keypress",function o(n){n.key==="Enter"&&(h(),window.removeEventListener("keypress",o))})},N=()=>{a=1;const h=["Micro-Moments","Attribution","Personalization","Programmatic","Remarketing","Omnichannel","Hyperlocal","Interactivity","Localization","Visualization","Blockchain","Metaverse","Algorithm","Bandwidth","Compliance"].map(B=>B.split("").map(j=>Math.random()>.5?j.toUpperCase():j.toLowerCase()).join(""));let o=0,n=120,v;s.innerHTML=`
      ${x('<span id="captcha-timer" class="text-2xl font-black font-mono text-white bg-yellow-600 px-3 py-1 rounded-lg">120.0s</span>')}
      <div class="card space-y-10 animate__animated animate__fadeInUp horror-blink">
        <div class="space-y-2 text-center">
            <span class="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Challenge 01</span>
            <h3 class="text-3xl font-black">Captcha Speed-Run</h3>
            <p class="text-slate-400 text-sm">Decode the corrupted sequence. Click SUBMIT or press ENTER.</p>
        </div>
        
        <div class="h-32 flex items-center justify-center bg-black/80 rounded-[2.5rem] border border-red-900 border-dashed relative overflow-hidden">
          <div id="captcha-term" class="text-5xl font-black italic text-white tracking-tighter z-10 select-none confusing-text">
            ${h[0]}
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
                <span id="captcha-count" class="text-[10px] font-black font-mono text-slate-500 uppercase tracking-widest">PROGRESS: 0/${h.length}</span>
            </div>
          </div>
        </div>
      </div>
    `;const r=s.querySelector("#captcha-input"),w=s.querySelector("#captcha-submit"),i=s.querySelector("#captcha-term"),p=s.querySelector("#captcha-count"),l=s.querySelector("#captcha-timer");r.focus(),v=setInterval(()=>{n-=.1,l.innerText=`${n.toFixed(2)}s`,n<=0&&(clearInterval(v),c())},100);const c=()=>{a=2,_(s,"fadeOutDown").then(O)},I=()=>{r.value.trim()===h[o]?(d+=2,_(i,"rubberBand")):_(i,"shakeX"),o++,r.value="",o===h.length?(clearInterval(v),c()):(i.innerText=h[o],p.innerText=`PROGRESS: ${o}/${h.length}`,r.focus())};w.addEventListener("click",I),r.addEventListener("keypress",B=>{B.key==="Enter"&&I()})},O=()=>{a=2;const m=[{q:"📱 + 🏬 = ?",a:["Mobile Store","Hyperlocal Marketing","Store Walk-in"],c:1},{q:"📧 + 📈 = ?",a:["Email Marketing Analytics","Newsletter growth","Direct mail"],c:0},{q:"🔍 + 🌐 = ?",a:["Global Search","Universal SEO","World Wide Web"],c:1},{q:"👥 + 💬 = ?",a:["Group Chat","Social Media Engagement","Influencer Talk"],c:1},{q:"🎥 + 📢 = ?",a:["Video Advertising","Broadcasting","Audio Marketing"],c:0},{q:"📊 + 🎯 = ?",a:["Target Audience","Performance Tracking","Goal Setting"],c:1},{q:"💻 + 💳 = ?",a:["E-commerce","Digital Payment","Billing"],c:0},{q:"🔗 + 👑 = ?",a:["Backlink King","Content is King","Link Building"],c:1},{q:"🎨 + 📈 = ?",a:["Graphic Growth","Visual Analytics","Design Sprint"],c:1},{q:"🔔 + 🕒 = ?",a:["Real-time alerts","Push Notifications","Timely reminder"],c:1}];let h=0,o=0,n=10,v;const r=()=>{v&&clearInterval(v);const w=m[h];n=10,s.innerHTML=`
        ${x('<span id="rebus-timer" class="text-2xl font-black font-mono text-white bg-yellow-600 px-3 py-1 rounded-lg">10.0s</span>')}
        <div class="card space-y-10 text-center animate__animated animate__fadeInUp horror-blink">
          <div class="space-y-2">
            <span class="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Challenge 02</span>
            <h3 class="text-3xl font-black">Pic-Connect</h3>
            <p class="text-slate-400 text-sm">Visual Synthesis. You have 10 seconds.</p>
          </div>
          
          <div id="rebus-container" class="animate__animated animate__zoomIn">
            <div class="h-64 flex items-center justify-center text-8xl bg-slate-950/50 rounded-[2.5rem] border border-slate-800 border-dashed transition-all duration-300" id="rebus-display">${w.q}</div>
          </div>

          <div class="space-y-6 max-w-sm mx-auto">
            <div class="grid grid-cols-1 gap-3">
              ${w.a.map((c,I)=>`<button class="quiz-opt" data-idx="${I}">${c}</button>`).join("")}
            </div>
            <div class="flex flex-col gap-4">
                <div class="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div id="rebus-progress-bar" class="h-full bg-yellow-500 transition-all duration-100" style="width: 100%"></div>
                </div>
                <p class="text-[10px] text-slate-500 font-black uppercase tracking-widest">Rebus ${h+1} of ${m.length}</p>
            </div>
          </div>
        </div>
      `;const i=s.querySelector("#rebus-progress-bar"),p=s.querySelector("#rebus-timer");v=setInterval(()=>{n-=.1,p&&(p.innerText=`${n.toFixed(1)}s`),i.style.width=`${n/10*100}%`,n<=0&&l()},100);const l=(c=!1)=>{clearInterval(v),c&&(o+=2),h++,h===m.length?(d+=o,a=3,_(s,"fadeOutDown").then(F)):r()};s.querySelectorAll(".quiz-opt").forEach(c=>{c.addEventListener("click",()=>{l(parseInt(c.dataset.idx)===w.c)})})};r()},F=()=>{a=3;const m=[{q:"A company wants to target users who previously visited their site but didn't buy. What is this called?",a:["Redirection","Remarketing","Retention"],c:1},{q:"An advertiser only pays when a user completes a specific action like a signup. What is this model?",a:["CPC","CPM","CPA"],c:2},{q:"What is the primary purpose of a 'Meta Description' tag?",a:["Improving page speed","Describing page content to searchers","Defining font styles"],c:1},{q:"Which tool helps in identifying broken links and crawl errors on a website?",a:["Google Trends","Google Search Console","Google Ads"],c:1},{q:"A business uses GPS data to send ads to people within a 5km radius of their store. This is:",a:["Geofencing","Global Marketing","Beacons"],c:0},{q:"A YouTube channel wants to know how long people watch their videos on average. They check:",a:["View Count","Watch Time / Retention","Subscriber growth"],c:1},{q:"In Email Marketing, what does 'A/B Testing' usually involve?",a:["Testing two different subject lines","Testing emails in two languages","Testing emails on two devices"],c:0},{q:"Which of the following is an example of 'Earned' Social Media?",a:["Paid Facebook ad","A fan sharing your post","A post on your own page"],c:1},{q:"Web analytics 'Bounce Rate' refers to users who:",a:["Click a button and leave","Leave after viewing only one page","Stay on the site for 10 minutes"],c:1},{q:"What is the main advantage of 'Programmatic Advertising'?",a:["Manual ad placement","Automated real-time bidding","Lower image quality"],c:1}];let h=0,o=600,n;const v=()=>{if(h===m.length){r();return}const i=m[h];s.innerHTML=`
        ${x('<span id="t3-timer" class="text-2xl font-black font-mono text-white bg-yellow-600 px-3 py-1 rounded-lg">10:00</span>')}
        <div class="card space-y-10 animate__animated animate__fadeInRight">
          <div class="space-y-2">
              <span class="badge bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Phase 03</span>
              <h3 class="text-3xl font-black">Concept Mastery</h3>
              <p class="text-slate-400 text-sm">Question ${h+1} of ${m.length}. Auto-submits on timeout.</p>
          </div>

          <div class="space-y-8">
            <div class="p-8 bg-slate-900/50 rounded-3xl border border-yellow-500/10">
              <div class="flex items-start gap-4">
                <span class="w-8 h-8 rounded-xl bg-yellow-500/20 flex items-center justify-center text-xs font-black text-yellow-500 border border-yellow-500/20">0${h+1}</span>
                <p class="text-xl font-bold text-slate-200 leading-relaxed italic">"${i.q}"</p>
              </div>
            </div>
            <div class="grid grid-cols-1 gap-4">
              ${i.a.map((p,l)=>`
                <button class="quiz-opt !py-6 !text-lg" data-idx="${l}">
                  ${p}
                </button>
              `).join("")}
            </div>
          </div>
          <div class="flex justify-end">
            <button id="next-q" class="btn-secondary !bg-yellow-500/10 !text-yellow-500 !border-yellow-500/30">SKIPPED QUESTION</button>
          </div>
        </div>
      `,s.querySelector("#t3-timer"),n||(n=setInterval(()=>{o--;const p=Math.floor(o/60),l=o%60,c=s.querySelector("#t3-timer");c&&(c.innerText=`${p}:${l.toString().padStart(2,"0")}`),o<=0&&(clearInterval(n),r())},1e3)),s.querySelectorAll(".quiz-opt").forEach(p=>{p.addEventListener("click",()=>{parseInt(p.dataset.idx)===i.c&&(d+=1),h++,v()})}),s.querySelector("#next-q").addEventListener("click",()=>{h++,v()})},r=async()=>{clearInterval(n),window.removeEventListener("keypress",w),Y({scores:{...P.scores,l2:d}},!0),L()},w=i=>{i.key};v()},L=()=>{s.innerHTML=`
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
            <span class="text-3xl font-mono text-white font-black tracking-[0.2em]">${P.keys.l2}</span>
            <p class="text-[9px] text-slate-500 mt-2 font-black uppercase">Memorize this key. It is required to open the final Zenith door.</p>
        </div>

        <button id="go-l3" class="btn-primary px-12 py-5 group !bg-red-600 shadow-red-500/20">
          <span>ENTER THE ZENITH</span>
        </button>
      </div>
    `,setTimeout(()=>{const n=s.querySelector(".terror-screen");n&&n.remove(),re({particleCount:150,spread:70,origin:{y:.6}})},2e3);const m=s.querySelector("#go-l3"),h=()=>{window.removeEventListener("keypress",o),_(s,"fadeOut").then(()=>{Y({level:3})})},o=n=>{n.key==="Enter"&&h()};m.addEventListener("click",h),window.addEventListener("keypress",o)};P.gameMode==="quiz"?R():M()},Ae=T=>{let a=0,d=0;const s=document.createElement("div");s.className="w-full max-w-4xl mx-auto horror-blink",T.appendChild(s);const x=(o="")=>`
    <div class="flex justify-between items-center mb-8 card !py-4 !px-8 glow-indigo border-red-500/20 bg-red-950/10">
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/30 flex items-center justify-center text-xl">
           ${a===0?"🔑":a===1?"🔍":a===2?"⚡":"👾"}
        </div>
        <div>
          <h2 class="text-sm font-black text-red-500 uppercase tracking-tighter">Level 3: The Zenith</h2>
          <p class="text-[10px] text-slate-500 font-mono uppercase">${a===0?"Restricted Access":`Phase ${a} of 3`}</p>
        </div>
      </div>
      <div class="flex items-center gap-6">
        ${o}
        <div id="status" class="text-xs font-black px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 tracking-widest animate-pulse">CRITICAL OVERRIDE</div>
      </div>
    </div>
  `,M=()=>{s.innerHTML=`
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="key-box-container mb-12">
          <div id="key-box" class="key-box">
            <div class="key-box-lid"></div>
            <div class="key-inside">🔑</div>
          </div>
        </div>
        <div class="door-container">
          <div id="door-visual" class="haunted-door"></div>
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
    `;const o=s.querySelector("#l2-key-input"),n=s.querySelector("#verify-l2-key"),v=s.querySelector("#door-visual"),r=s.querySelector("#key-box");setTimeout(()=>{r&&r.classList.add("open")},1e3);const w=()=>{o.value.trim()===P.keys.l2?(window.removeEventListener("keypress",i),n.disabled=!0,n.innerText="ACCESS GRANTED",v.classList.add("door-open"),setTimeout(()=>{_(s,"fadeOut").then(R)},1500)):_(s.querySelector(".card"),"shakeX")},i=p=>{p.key==="Enter"&&w()};n.addEventListener("click",w),o.addEventListener("keypress",i),o.focus()},R=()=>{a=0,s.innerHTML=`
      <div class="flex flex-col items-center justify-center min-h-[70vh] space-y-8 animate__animated animate__fadeIn">
        <div class="w-24 h-24 bg-red-600/20 border border-red-500/30 rounded-[2.5rem] flex items-center justify-center text-5xl shadow-2xl shadow-red-500/10">
            ☢️
        </div>
        <div class="text-center space-y-4">
            <h2 class="text-4xl font-black text-white uppercase tracking-tighter">Mission Briefing: Zenith</h2>
            <div class="max-w-lg mx-auto p-6 card border-red-900/30 bg-black/40 space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>AUTHORIZATION GRANTED. Ultimate evaluation initialized:</p>
                <ul class="text-left space-y-2 list-disc list-inside text-xs font-mono">
                    <li><span class="text-red-500 font-bold">Dot Neutralizer</span>: 2-minute survival. 100 Marks.</li>
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
    `;const o=s.querySelector("#start-l3"),n=()=>{_(s,"fadeOut").then(N)};o.addEventListener("click",n),window.addEventListener("keypress",function v(r){r.key==="Enter"&&(n(),window.removeEventListener("keypress",v))})},N=()=>{a=1;let o=120;s.innerHTML=`
      ${x('<span id="arena-timer" class="text-2xl font-black font-mono text-white bg-red-600 px-3 py-1 rounded-lg">120s</span>')}
      <div class="card h-[600px] !p-0 border-red-500/20 bg-black relative cursor-crosshair overflow-hidden animate__animated animate__fadeInUp" id="final-arena">
        <div id="arena-progress-bar" class="absolute top-0 left-0 h-1.5 bg-red-600 transition-all duration-100 shadow-[0_0_20px_#ff0000]" style="width: 100%"></div>
        <canvas id="matrix-canvas" class="absolute inset-0 opacity-40 pointer-events-none"></canvas>
        <div class="relative z-10 p-12 text-center h-full flex flex-col justify-between pointer-events-none">
          <div class="space-y-4">
            <h3 class="text-5xl font-black text-red-600 tracking-tighter uppercase italic drop-shadow-[0_0_30px_rgba(220,38,38,0.5)]">Algorithm Neutralizer</h3>
            <p class="text-slate-500 text-sm font-mono uppercase tracking-[0.2em]">NEUTRALIZE THE PIXEL. [VAL: 100 MARKS]</p>
          </div>
          
          <div class="bg-red-950/60 p-6 border border-red-500/50 text-red-500 font-mono text-[10px] text-left rounded-2xl backdrop-blur-md max-w-xs">
            <p class="animate-pulse">>> [WARNING] SYSTEM_OVERHEAT</p>
            <p>>> [CORE] SCORE: 100 MARKS POSSIBLE</p>
            <p>>> [TIMER] 120.0s REMAINING</p>
          </div>
        </div>

        <div id="boss-target" class="absolute w-8 h-8 pointer-events-auto bg-white rounded-full shadow-[0_0_50px_#ffffff] cursor-pointer" style="top: 50%; left: 50%;">
            <div class="absolute inset-0 animate-ping bg-white rounded-full opacity-70"></div>
        </div>
      </div>
    `;const n=s.querySelector("#arena-timer"),v=s.querySelector("#arena-progress-bar"),r=setInterval(()=>{o--,n.innerText=`${o}s`,v.style.width=`${o/120*100}%`,o<=0&&(clearInterval(r),clearInterval(j),clearInterval(ee),O())},1e3),w=s.querySelector("#matrix-canvas"),i=w.getContext("2d");w.width=s.querySelector(".card").offsetWidth,w.height=s.querySelector(".card").offsetHeight;const p="10",l=16,c=w.width/l,I=new Array(Math.floor(c)).fill(1),j=setInterval(()=>{i.fillStyle="rgba(0, 0, 0, 0.1)",i.fillRect(0,0,w.width,w.height),i.fillStyle="#ff0000",i.font=l+"px monospace";for(let z=0;z<I.length;z++){const Z=p.charAt(Math.floor(Math.random()*p.length));i.fillText(Z,z*l,I[z]*l),I[z]*l>w.height&&Math.random()>.95&&(I[z]=0),I[z]++}},40),X=s.querySelector("#boss-target"),Q=s.querySelector("#final-arena");let J=600;const ee=setInterval(()=>{const z=Q.clientWidth-40,Z=Q.clientHeight-40;X.style.transition=`all ${J}ms cubic-bezier(0.19, 1, 0.22, 1)`,X.style.left=`${Math.random()*z}px`,X.style.top=`${Math.random()*Z}px`,J=Math.max(80,J-30),_(Q,"shakeX")},600);X.addEventListener("click",z=>{z.stopPropagation(),clearInterval(j),clearInterval(ee),clearInterval(r),d+=100,a=2,_(s,"fadeOut").then(O)})},O=()=>{a=2;const o=[{p:"A global E-commerce brand noticed that their Organic Traffic increased by 40% after implementing schema markup and fixing canonical issues, but their ROI decreased. Investigation revealed that the traffic was coming from countries where they don't ship.",q:"Identify the primary technical failure:",a:["Lack of Hreflang tags","Incorrect canonicals","Javascript errors","CDN latency"],c:0},{p:"An insurance provider saw a surge in mobile users but a high bounce rate on their application form. Heatmaps showed users clicking on non-interactive decorative icons, thinking they were buttons.",q:"What is the core issue?",a:["Poor UI/UX Design","Slow Server Speed","Broken Link","High CPC"],c:0},{p:"A local bakery's search ranking dropped significantly after a website redesign. The new site uses a single-page application (SPA) architecture, and search engines are struggling to index individual product pages.",q:"Recommended solution:",a:["Implement SSR/Prerendering","Buy more backlinks","Change domain name","Increase font size"],c:0},{p:"A SaaS startup is running LinkedIn ads but getting very low CTR. The ads feature detailed technical diagrams of the product's backend architecture.",q:"What is the likely problem?",a:["Ad creative not suitable for platform","Wrong target audience","Budget is too low","LinkedIn is down"],c:0},{p:"A fashion retailer noticed that their email open rates are high, but click-through rates from mobile users have plummeted since a new template was introduced.",q:"Suspected cause:",a:["Non-responsive email layout","Boring subject lines","Server downtime","Unsubscribe button too large"],c:0}];let n=0,v=300,r,w=!1;const i=()=>{if(n===o.length){clearInterval(r),F();return}if(n===2&&!w){w=!0;const c=document.createElement("div");c.className="sudden-off",document.body.appendChild(c),setTimeout(()=>{c.className="windows-update",c.innerHTML=`
            <div class="update-loader"></div>
            <h1 class="text-3xl font-light mb-4 text-white">Working on updates 27% complete</h1>
            <p class="text-xl text-white">Don't turn off your computer. This will take a while.</p>
            <p class="text-sm text-white/50 mt-12 font-mono">Your computer may restart several times</p>
          `,setTimeout(()=>{c.remove()},1e4)},5e3)}const p=o[n];s.innerHTML=`
        ${x('<span id="t2-timer" class="text-2xl font-black font-mono text-white bg-red-600 px-3 py-1 rounded-lg">5:00</span>')}
        <div class="card space-y-8 animate__animated animate__fadeInUp !bg-black/90 border-red-500/40 thunder-blink">
          <div class="space-y-4 text-center">
              <span class="badge bg-red-500/20 text-red-500 border border-red-500/40">Challenge 02</span>
              <h3 class="text-3xl font-black text-white italic">Technical Failure Analysis (${n+1}/5)</h3>
              <p class="text-slate-500 text-xs font-mono uppercase tracking-[0.2em] animate-pulse">Thunder Mode Active</p>
          </div>

          <div class="p-8 bg-black/60 rounded-[2rem] border border-red-900 font-mono text-sm leading-relaxed text-slate-100 relative overflow-hidden">
            <p class="mb-6 text-lg italic border-l-8 border-red-600 pl-6">${p.p}</p>
            <p class="text-xl font-black text-red-600 uppercase tracking-tighter mt-8">${p.q}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${p.a.map((c,I)=>`
              <button class="quiz-opt !bg-red-950/20 !border-red-900/40 !py-5 hover:!border-red-500 text-lg font-bold" data-idx="${I}">
                ${c}
              </button>
            `).join("")}
          </div>
        </div>
      `;const l=s.querySelector("#t2-timer");r||(r=setInterval(()=>{v--;const c=Math.floor(v/60),I=v%60;l&&(l.innerText=`${c}:${I.toString().padStart(2,"0")}`),v<=0&&(clearInterval(r),F())},1e3)),s.querySelectorAll(".quiz-opt").forEach(c=>{c.addEventListener("click",()=>{parseInt(c.dataset.idx)===p.c&&(d+=2),n++,i()})})};i()},F=()=>{a=3,s.innerHTML=`
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
    `,s.querySelector("#start-t3").addEventListener("click",()=>{_(s,"fadeOut").then(L)})},L=()=>{a=3;const o=[{q:"What is the primary purpose of 'Google Search Console'?",a:["Ad management","Website health & indexing","Video editing"],c:1},{q:"What does 'LTV' stand for in Digital Marketing?",a:["Long Term Visibility","Lifetime Value","Lead Tracking Variable"],c:1},{q:"Which model describes the customer journey?",a:["AIDA","REACH","SMART"],c:0},{q:"What is a 'Breadcrumb' in web design?",a:["Navigation aid","Error log","Cookie type"],c:0},{q:"Which tool is used for measuring Social listening?",a:["Hootsuite","Excel","Notepad"],c:0},{q:"What is 'Alt-Text' primarily used for?",a:["Styling images","Accessibility/SEO","Image encryption"],c:1},{q:"Which protocol is used for secure transmission?",a:["HTTP","SSH","HTTPS"],c:2},{q:"What is 'Native Advertising'?",a:["Ads that match site content","Pop-up ads","Radio ads"],c:0},{q:"Which metric defines 'Stickiness'?",a:["Bounce Rate","Time on Site","Initial load time"],c:1},{q:"What is 'GTM' used for?",a:["Mail management","Tag management","Transaction Monitoring"],c:1},{q:"What does 'CTR' stand for?",a:["Cost Through Rate","Click Through Rate","Conversion Target Ratio"],c:1},{q:"Which is a 'Pull' marketing strategy?",a:["Billboards","SEO","TV Commercials"],c:1},{q:"What is 'Viral Marketing'?",a:["Infected code","Rapid social sharing","Slow growth"],c:1},{q:"Define 'Remarketing'.",a:["Selling used goods","Targeting past visitors","Removing ads"],c:1},{q:"What is a 'Sitemap'?",a:["Office map","List of website URLs","GPS coordinates"],c:1},{q:"What's the goal of 'A/B Testing'?",a:["Testing servers","Comparing version performance","Writing code"],c:1},{q:"Which platform is best for B2B leads?",a:["Instagram","Snapchat","LinkedIn"],c:2},{q:"What is 'Churn Rate'?",a:["New users","Lost customers","Ad clicks"],c:1},{q:"What is 'Influencer Marketing'?",a:["Paying robots","Using expert authority","Radio spots"],c:1},{q:"What is 'Web Analytics'?",a:["Writing text","Data measurement","Editing CSS"],c:1}],n=[5,10,15],v=o.map(l=>({...l,t:n[Math.floor(Math.random()*n.length)]}));let r=0,w=10,i;const p=()=>{if(r===v.length){m();return}const l=v[r];w=l.t,s.innerHTML=`
        ${x('<span id="q-header-timer" class="text-2xl font-black font-mono text-white bg-red-600 px-3 py-1 rounded-lg">10.0s</span>')}
        <div class="card !p-0 border-red-500/20 !bg-black/80 relative overflow-hidden animate__animated animate__zoomIn thunder-blink">
          <div id="q-progress" class="absolute top-0 left-0 h-2 bg-red-600 transition-all duration-[100ms] shadow-[0_0_20px_#ff0000]" style="width: 100%"></div>
          <div class="p-12 space-y-12">
            <div class="flex justify-between items-center">
                <span class="badge bg-red-500/20 text-red-500 border border-red-500/40">ZENITH 0${r+1}</span>
            </div>
            <h3 class="text-3xl font-black text-white leading-tight ${r%3===0?"glitch-text":""}">${l.q}</h3>
            <div class="grid ${r%2===0?"grid-cols-1":"grid-cols-1 md:grid-cols-2"} gap-4">
              ${l.a.map((B,j)=>`
                <button class="quiz-opt !bg-red-950/20 !border-red-900/40 !rounded-[2rem] !py-6 !px-10 hover:!border-red-500 group" data-idx="${j}">
                    <span class="text-xl font-bold text-slate-300 group-hover:text-white transition-colors">${B}</span>
                </button>
              `).join("")}
            </div>
          </div>
        </div>
      `;const c=s.querySelector("#q-header-timer"),I=s.querySelector("#q-progress");i=setInterval(()=>{w-=.1,c&&(c.innerText=`${w.toFixed(1)}s`),I.style.width=`${w/l.t*100}%`,w<=0&&(clearInterval(i),r++,p())},100),s.querySelectorAll(".quiz-opt").forEach(B=>{B.addEventListener("click",()=>{clearInterval(i),parseInt(B.dataset.idx)===l.c&&(d+=1),r++,p()})})};p()},m=async()=>{Y({scores:{...P.scores,l3:d}},!0),he({...P.user,l1:P.scores.l1,l2:P.scores.l2,l3:d,totalTime:me(Date.now()-P.startTime)}).catch(o=>console.error("Final sync failed",o)),h()},h=()=>{s.innerHTML=`
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
    `,Y({scores:{...P.scores,l3:d}},!0),setTimeout(()=>{const r=s.querySelector(".terror-screen");r&&r.remove(),re({particleCount:300,spread:100,origin:{y:.5},colors:["#ff0000","#ffffff"]})},2500);const o=s.querySelector("#view-results"),n=()=>{window.removeEventListener("keypress",v),_(s,"fadeOut").then(()=>{Y({level:4})})},v=r=>{r.key==="Enter"&&n()};o.addEventListener("click",n),window.addEventListener("keypress",v)};a===0?M():N()},$e=T=>{const{scores:a,user:d,totalTime:s,gameMode:x}=P,M=a.l1+a.l2+a.l3,R=me(s),N=document.createElement("div");N.className="w-full max-w-4xl mx-auto py-10",N.innerHTML=`
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
                <p class="text-2xl font-bold text-white print:text-black">${d.name}</p>
                <div class="flex flex-wrap justify-center md:justify-start gap-2 text-[10px] font-mono text-slate-500 print:text-black">
                  <span>${d.regNo}</span> | <span>${d.department}</span> | <span>${d.year}</span>
                </div>
            </div>
            <div class="h-12 w-[1px] bg-slate-800 hidden md:block"></div>
            <div class="space-y-1 text-center">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Section</p>
                <span class="text-xl font-bold text-white">${d.section}</span>
            </div>
            <div class="h-12 w-[1px] bg-slate-800 hidden md:block"></div>
            <div class="space-y-1 text-center md:text-right">
                <p class="text-[10px] font-black text-slate-500 uppercase tracking-widest print:text-slate-700">Elapsed Time</p>
                <p class="text-2xl font-black text-white font-mono tracking-tighter print:text-black">${R}</p>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10 text-center space-y-2">
                <p class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Foundation</p>
                <p class="text-5xl font-black text-white">${a.l1}<span class="text-lg text-slate-600">/35</span></p>
                <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-indigo-500" style="width: ${a.l1/35*100}%"></div>
                </div>
            </div>
            
            <div class="p-8 rounded-[2.5rem] bg-yellow-500/5 border border-yellow-500/10 text-center space-y-2">
                <p class="text-[10px] font-black text-yellow-400 uppercase tracking-widest">Engagement</p>
                <p class="text-5xl font-black text-white">${a.l2}<span class="text-lg text-slate-600">/60</span></p>
                <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-yellow-500" style="width: ${a.l2/60*100}%"></div>
                </div>
            </div>

            <div class="p-8 rounded-[2.5rem] bg-red-500/5 border border-red-500/10 text-center space-y-2">
                <p class="text-[10px] font-black text-red-500 uppercase tracking-widest">Zenith</p>
                <p class="text-5xl font-black text-white">${a.l3}<span class="text-lg text-slate-600">/130</span></p>
                <div class="w-full h-1 bg-slate-800 rounded-full mt-4 overflow-hidden">
                    <div class="h-full bg-red-500" style="width: ${a.l3/130*100}%"></div>
                </div>
            </div>
        </div>

        <div class="bg-slate-950/50 rounded-3xl p-10 flex flex-col items-center justify-center border border-white/5 relative overflow-hidden print:border-black/20 print:bg-white">
            <div class="absolute inset-0 bg-indigo-500/5 pointer-events-none print:hidden"></div>
            <p class="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-4 print:text-slate-700">Cumulative Score</p>
            <div class="relative">
                <div class="absolute inset-0 bg-white blur-[60px] opacity-10 print:hidden"></div>
                <p class="text-8xl font-black text-white relative z-10 print:text-black">${M}<span class="text-3xl text-slate-700 ml-2">/225</span></p>
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
  `,T.appendChild(N);const O=N.querySelector("#sync-status"),F=N.querySelector("#download-report"),L={...d,l1:a.l1,l2:a.l2,l3:a.l3,totalTime:R,mode:x};F.addEventListener("click",()=>{const h=`
DIGITAL MARKETING TREASURE HUNT - FINAL REPORT
----------------------------------------------
Student Name  : ${d.name}
Enrollment No : ${d.enrollNo}
Register No   : ${d.regNo}
Department    : ${d.department}
Year of Study : ${d.year}
Section       : ${d.section}
Email         : ${d.email}

PERFORMANCE SUMMARY:
Level 1 (Foundation) : ${a.l1}/35
Level 2 (Engagement) : ${a.l2}/60
Level 3 (Zenith)     : ${a.l3}/130
----------------------------------------------
TOTAL SCORE          : ${M}/225
ELAPSED TIME         : ${R}
----------------------------------------------
Verification Status  : Synchronized
Generated on         : ${new Date().toLocaleString()}

Developed with 🤍 by weBnovA
      `,o=new Blob([h],{type:"text/plain"}),n=window.URL.createObjectURL(o),v=document.createElement("a");v.href=n,v.download=`Report_${d.name.replace(/\s+/g,"_")}.txt`,v.click()});const m=document.createElement("div");m.className="hidden print:block font-mono text-sm leading-relaxed p-10 border-2 border-slate-300 rounded-3xl",m.innerHTML=`
        <h1 class="text-3xl font-black mb-10 text-center uppercase tracking-tighter">Official Intelligence Dossier</h1>
        <div class="grid grid-cols-2 gap-10 mb-10 border-b pb-10">
            <div>
                <p class="font-black text-xs uppercase text-slate-500">Subject Information</p>
                <p class="text-xl font-bold">${d.name}</p>
                <p>${d.regNo} | ${d.enrollNo}</p>
                <p>${d.department} | Year ${d.year}</p>
                <p>Section: ${d.section}</p>
            </div>
            <div class="text-right">
                <p class="font-black text-xs uppercase text-slate-500">Metric Summary</p>
                <p class="text-xl font-bold">Total Score: ${M}/225</p>
                <p>Time Taken: ${R}</p>
                <p>Status: Synchronized with Backend</p>
            </div>
        </div>
        <div class="space-y-6">
            <p class="font-black text-xs uppercase text-slate-500 mb-4">Phase Breakdown</p>
            <div class="flex justify-between border-b py-2"><span>Phase 1 (Foundation):</span> <span class="font-bold">${a.l1}/35</span></div>
            <div class="flex justify-between border-b py-2"><span>Phase 2 (Engagement):</span> <span class="font-bold">${a.l2}/60</span></div>
            <div class="flex justify-between border-b py-2"><span>Phase 3 (Zenith):</span> <span class="font-bold">${a.l3}/130</span></div>
        </div>
        <div class="mt-20 pt-10 border-t text-center">
            <p class="text-xs uppercase text-slate-500 mb-2">Developed with 🤍 by</p>
            <p class="dev-group" style="background: linear-gradient(135deg, #f97316, #ea580c) !important; -webkit-background-clip: text !important; color: transparent !important; font-family: 'Pacifico' !important; font-size: 1.5rem !important;">weBnovA</p>
        </div>
    `,N.appendChild(m),P.hasSubmitted?(O.innerHTML='<span class="w-2 h-2 rounded-full bg-green-500"></span> TERMINAL STATUS: DATA PREVIOUSLY LOGGED √',O.classList.remove("text-slate-400"),O.classList.add("text-green-400","border-green-500/20")):(updateState({hasSubmitted:!0},!0),he(L).then(()=>{O.innerHTML='<span class="w-2 h-2 rounded-full bg-green-500"></span> TERMINAL STATUS: SYNCHRONIZED √',O.classList.remove("text-slate-400"),O.classList.add("text-green-400","border-green-500/20")}).catch(h=>{O.innerHTML='<span class="w-2 h-2 rounded-full bg-red-500"></span> TERMINAL STATUS: OFFLINE MODE ACTIVE',O.classList.remove("text-slate-400"),O.classList.add("text-red-400","border-red-500/20")}))},ae=document.querySelector("#app"),Pe=T=>{const a=document.createElement("footer");a.className="footer mt-20",a.innerHTML=`
    <p class="developer-credit">Developed with 🤍 by</p>
    <p class="dev-group">weBnovA</p>
  `,T.appendChild(a)},fe=T=>{ae.innerHTML="";const a=document.createElement("div");switch(a.className="min-h-[80vh]",ae.appendChild(a),T.level){case-1:_e(a);break;case 0:qe(a);break;case 1:Ce(a);break;case 2:Re(a);break;case 3:Ae(a);break;case 4:$e(a);break;default:a.innerHTML="<h1>Error: State not found</h1>"}T.level>=0&&Pe(ae)},_e=T=>{T.innerHTML=`
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
  `};document.addEventListener("fullscreenchange",()=>{!document.fullscreenElement&&P.level>0&&P.level<4&&Y({level:-1})});Me(fe);fe(P);
