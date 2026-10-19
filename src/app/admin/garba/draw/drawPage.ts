import { GARBA_PUBLISHABLE_KEY, GARBA_RESULT_URL, GARBA_SUPABASE_URL } from '@/lib/garba'

/**
 * Spin-wheel draw page (admin only — served by ./route.ts).
 * Kept as plain HTML/JS in the Garba form's theme. The inner script avoids
 * template literals so it can live inside this TS template string.
 */
export const drawHtml = () => `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>गरबा Lucky Draw – स्पिन व्हील | Mbjare Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Hind:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap">
<style>
:root{
  --teal:#038084; --teal-l:#18A6AB; --deep:#0B3B3D; --deeper:#072A2B; --panel:#0E4648; --line:#1F5E60;
  --mint:#E6F4F4; --gold:#F5B814; --gold-d:#D99A00; --magenta:#D63A7A; --orange:#F2762E; --paper:#FFF8EC;
  --fg:#FFF8EC; --muted:#BFDCDC; --ok:#4BD39A; --bad:#FF8FA8;
  --f-display:"Baloo 2","Hind",system-ui,sans-serif; --f-body:"Hind",system-ui,sans-serif; --f-mono:"JetBrains Mono",ui-monospace,Menlo,monospace;
  color-scheme:dark;
}
*{box-sizing:border-box}
html,body{min-height:100%}
body{margin:0;color:var(--fg);font-family:var(--f-body);font-size:16px;line-height:1.5;
  background:radial-gradient(60% 50% at 85% 0%,rgba(214,58,122,.28),transparent 70%),radial-gradient(55% 45% at 5% 20%,rgba(24,166,171,.28),transparent 70%),linear-gradient(180deg,#0E4C4F 0%,var(--deep) 45%,var(--deeper) 100%) fixed,var(--deeper);
  padding:0 max(16px,env(safe-area-inset-right,0px)) 40px max(16px,env(safe-area-inset-left,0px))}
.toran{display:flex;justify-content:space-around;overflow:hidden;height:30px;border-top:3px solid var(--gold);margin:0 calc(-1 * max(16px,env(safe-area-inset-left,0px)))}
.toran i{flex:0 0 20px;height:24px;clip-path:polygon(0 0,100% 0,50% 100%)}
.toran i:nth-child(4n+1){background:var(--gold)}.toran i:nth-child(4n+2){background:var(--teal-l)}.toran i:nth-child(4n+3){background:var(--magenta)}.toran i:nth-child(4n+4){background:var(--orange)}
.wrap{max-width:1140px;margin:0 auto;display:flex;flex-direction:column;gap:20px;padding-top:16px}
header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}
.brand{display:flex;align-items:center;gap:14px}
.brand img{width:64px;height:auto}
h1{font-family:var(--f-display);font-weight:800;font-size:clamp(28px,5vw,42px);line-height:1;margin:0;color:#fff}
h1 span{color:var(--gold)}
.sub{color:var(--muted);margin:6px 0 0;font-size:15px}
.hbtns{display:flex;gap:8px;flex-wrap:wrap}
.btn{font-family:var(--f-body);font-weight:600;font-size:15px;border-radius:999px;border:1.5px solid var(--line);background:var(--panel);color:var(--fg);padding:9px 16px 7px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;gap:6px}
.btn:hover{border-color:var(--gold)}
.btn:focus-visible,.start:focus-visible{outline:3px solid var(--gold);outline-offset:2px}
.btn:disabled{opacity:.45;cursor:not-allowed}
.stage{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:24px;align-items:start}
@media (max-width:860px){.stage{grid-template-columns:minmax(0,1fr)}}
.wheelbox{display:flex;flex-direction:column;align-items:center;gap:18px;min-width:0}
.wheel{position:relative;width:min(100%,560px);aspect-ratio:1}
.wheel canvas{width:100%;height:100%;display:block;border-radius:50%;box-shadow:0 0 0 10px var(--gold),0 0 0 15px var(--magenta),0 20px 60px rgba(0,0,0,.55)}
.pointer{position:absolute;left:50%;top:-20px;transform:translateX(-50%);width:46px;height:60px;z-index:3;filter:drop-shadow(0 4px 4px rgba(0,0,0,.5))}
.hub{position:absolute;inset:0;margin:auto;width:23%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 35% 30%,#FFE7A1,var(--gold) 45%,var(--gold-d));
  display:grid;place-items:center;text-align:center;color:var(--deeper);font-family:var(--f-display);font-weight:800;box-shadow:inset 0 -4px 8px rgba(0,0,0,.25),0 4px 14px rgba(0,0,0,.5);z-index:2}
.hub small{display:block;font-size:clamp(10px,1.8vw,13px);font-weight:700;line-height:1.1}
.hub b{display:block;font-size:clamp(20px,4.6vw,36px);line-height:1;font-variant-numeric:tabular-nums}
.overlay{position:absolute;inset:0;display:grid;place-items:center;z-index:4;pointer-events:none}
.count{font-family:var(--f-display);font-weight:800;font-size:clamp(90px,22vw,200px);color:#fff;text-shadow:0 6px 30px rgba(0,0,0,.8),0 0 40px var(--gold);animation:pop .9s ease-out both}
@keyframes pop{from{transform:scale(1.8);opacity:0}30%{opacity:1}to{transform:scale(.9);opacity:.15}}
.start{font-family:var(--f-display);font-weight:800;font-size:26px;letter-spacing:1px;color:var(--deeper);border:0;border-radius:999px;padding:14px 52px 10px;cursor:pointer;
  background:linear-gradient(180deg,#FFCD45,var(--gold));box-shadow:0 6px 0 var(--gold-d),0 12px 30px rgba(245,184,20,.35)}
.start:active{transform:translateY(4px);box-shadow:0 2px 0 var(--gold-d)}
.start:disabled{filter:grayscale(.7);opacity:.6;cursor:not-allowed}
.hint{color:var(--muted);font-size:15px;text-align:center;margin:0;max-width:46ch}
.side{display:flex;flex-direction:column;gap:16px;min-width:0}
.card{background:var(--panel);border:1.5px solid var(--line);border-radius:18px;padding:16px}
.card h2{font-family:var(--f-display);font-size:21px;margin:0 0 4px;color:var(--gold)}
.card p{margin:0 0 10px;color:var(--muted);font-size:14px}
.seal{border-color:var(--gold);background:linear-gradient(160deg,#16585A,var(--panel))}
.code{font-family:var(--f-mono);font-size:clamp(18px,3.4vw,24px);letter-spacing:2px;color:#fff;background:var(--deeper);border:1.5px dashed var(--gold);border-radius:10px;padding:10px 12px;text-align:center;word-break:break-all}
.lbl{font-size:12px;letter-spacing:.8px;text-transform:uppercase;color:var(--muted)}
.reveal{display:flex;flex-direction:column;gap:8px;margin-top:12px;font-size:14px}
.reveal .mono{font-family:var(--f-mono);font-size:12px;word-break:break-all;background:var(--deeper);border-radius:8px;padding:8px}
.verdict{font-weight:700}.verdict.ok{color:var(--ok)}.verdict.bad{color:var(--bad)}
.list{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:6px;max-height:360px;overflow:auto}
.list{grid-template-columns:repeat(auto-fill,minmax(190px,1fr))}
.list li{display:flex;gap:8px;align-items:flex-start;background:var(--deeper);border-radius:9px;padding:7px 8px;font-size:14px;line-height:1.25;min-width:0}
.list li .t{font-family:var(--f-mono);font-size:12px;color:#fff;border-radius:5px;padding:1px 6px;flex:none;margin-top:1px}
.list li .n{min-width:0;overflow-wrap:anywhere}
.list li .n small{display:block;font-size:12px;color:var(--muted);margin-top:2px}
.list li.win{outline:2px solid var(--gold)}
.row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
.src{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.src::before{content:"";width:9px;height:9px;border-radius:50%;background:var(--muted);flex:none}
.src.live::before{background:var(--ok);box-shadow:0 0 8px var(--ok)}
.src.warn::before{background:var(--bad)}
.modal{position:fixed;inset:0;z-index:20;display:grid;place-items:center;background:rgba(4,24,25,.8);padding:20px;overflow:auto}
.modal[hidden]{display:none}
.prize{background:var(--paper);color:#173233;border-radius:26px;padding:26px 22px;text-align:center;max-width:480px;width:100%;box-shadow:0 30px 80px rgba(0,0,0,.6);border-top:8px solid var(--gold);animation:rise .5s cubic-bezier(.2,1.4,.4,1) both}
@keyframes rise{from{transform:scale(.6);opacity:0}}
.prize .lbl{color:var(--magenta);font-weight:700;font-size:13px}
.prize .tok{display:inline-block;margin-top:10px;font-family:var(--f-display);font-weight:800;font-size:30px;letter-spacing:.06em;color:var(--gold);background:var(--deeper);border-radius:14px;padding:6px 18px 2px}
.prize .biz{font-family:var(--f-display);font-weight:800;font-size:clamp(28px,7vw,40px);line-height:1.1;margin:10px 0 2px;color:var(--teal)}
.prize .nm{font-size:19px;font-weight:600;margin:0 0 16px}
.prize .btn{background:#fff;color:#173233;border-color:#E7DCC7}
.pub{margin-top:14px;padding-top:14px;border-top:2px dashed #E7DCC7}
.pubbtn{width:100%;font-family:var(--f-display);font-weight:800;font-size:19px;border:0;border-radius:14px;padding:14px 12px 11px;cursor:pointer;color:#fff;background:var(--magenta)}
.pubbtn:disabled{opacity:.6;cursor:wait}
.pubok{display:none;background:#E6F7EE;border-radius:14px;padding:12px;margin-top:6px;font-size:14.5px}
.pubok.show{display:block}
.pubok b{color:#1F8A55}
.pubok a{color:var(--teal);font-weight:700;word-break:break-all}
.puberr{color:#C62853;font-size:14px;font-weight:600;margin-top:8px}
#confetti{position:fixed;inset:0;pointer-events:none;z-index:30;width:100%;height:100%}
@media (prefers-reduced-motion:reduce){.count,.prize{animation:none}}
</style>
</head>
<body>
<div class="toran" aria-hidden="true">${'<i></i>'.repeat(40)}</div>
<div class="wrap">
  <header>
    <div class="brand">
      <img src="/garba-logo.png" alt="Mbjare">
      <div><h1>गरबा <span>Lucky Draw</span></h1><p class="sub">15 सेकंड घूमेगा · जहाँ सुई रुकेगी, वही Winner</p></div>
    </div>
    <div class="hbtns">
      <a class="btn" href="/admin/garba">← Admin</a>
      <button class="btn" id="soundBtn" type="button">🔊 आवाज़ चालू</button>
      <button class="btn" id="fsBtn" type="button">⛶ फुल स्क्रीन</button>
    </div>
  </header>

  <div class="stage">
    <div class="wheelbox">
      <div class="wheel">
        <svg class="pointer" viewBox="0 0 44 58" aria-hidden="true"><path d="M22 58 L4 14 A20 20 0 1 1 40 14 Z" fill="#F5B814" stroke="#072A2B" stroke-width="3"/><circle cx="22" cy="18" r="7" fill="#D63A7A"/></svg>
        <canvas id="cv" aria-label="लकी ड्रा पहिया"></canvas>
        <div class="hub"><div><small id="hubLbl">टाइमर</small><b id="hubNum">15</b></div></div>
        <div class="overlay" id="ov"></div>
      </div>
      <button class="start" id="startBtn" type="button" disabled>START</button>
      <p class="hint" id="hint">Entries load हो रही हैं…</p>
    </div>

    <div class="side">
      <section class="card seal">
        <h2>🔒 सीलबंद कोड</h2>
        <p>Winner स्पिन से पहले ही गुप्त रूप से तय होकर इस कोड में सील हो चुका है। ड्रा से पहले इसकी फोटो ले लें। ड्रा के बाद साबित होगा कि नतीजा बदला नहीं गया।</p>
        <div class="code" id="sealCode">…</div>
        <div class="reveal" id="reveal" hidden>
          <span class="lbl">सील खोलने की चाबी</span>
          <div class="mono" id="revealText"></div>
          <span class="lbl">इससे बना पूरा कोड (SHA-256)</span>
          <div class="mono" id="revealHash"></div>
          <div class="verdict" id="verdict"></div>
        </div>
      </section>

      <section class="card">
        <h2>Participants <span id="cnt"></span></h2>
        <p class="src" id="src">Supabase से entries ला रहे हैं…</p>
        <ul class="list" id="list"></ul>
        <div class="row">
          <button class="btn" id="syncBtn" type="button">🔄 Supabase से ताज़ा करें</button>
          <a class="btn" href="${GARBA_RESULT_URL}" target="_blank" rel="noopener">🏆 Public result link</a>
        </div>
      </section>
    </div>
  </div>
</div>

<div class="modal" id="modal" hidden>
  <div class="prize" role="dialog" aria-labelledby="wBiz">
    <div class="lbl">🎉 बधाई हो! Winner है</div>
    <div class="tok" id="wTok"></div>
    <div class="biz" id="wBiz"></div>
    <div class="nm" id="wName"></div>
    <div class="row" style="justify-content:center">
      <button class="btn" id="closeBtn" type="button">सील कोड जाँचें</button>
      <button class="btn" id="againBtn" type="button">🔁 नया ड्रा तैयार करें</button>
    </div>
    <div class="pub">
      <button class="pubbtn" id="pubBtn" type="button">✅ Winner घोषित करो (Public link पर दिखाओ)</button>
      <div class="puberr" id="pubErr" hidden></div>
      <div class="pubok" id="pubOk"><b>✓ Winner घोषित हो गया!</b><br>सबको यह link भेजें: <a href="${GARBA_RESULT_URL}" target="_blank" rel="noopener">${GARBA_RESULT_URL.replace('https://', '')}</a>
        <div class="row" style="justify-content:center"><button class="btn" id="copyBtn" type="button">📋 Link copy करें</button><a class="btn" id="waShare" target="_blank" rel="noopener">WhatsApp पर भेजें</a></div></div>
    </div>
  </div>
</div>
<canvas id="confetti"></canvas>

<script>
(function(){
var SPIN_MS=15000;
var COLORS=["#038084","#D99A00","#D63A7A","#E0631C","#0B6E70"];
var SUPABASE_URL=${JSON.stringify(GARBA_SUPABASE_URL)}, SUPABASE_KEY=${JSON.stringify(GARBA_PUBLISHABLE_KEY)}, RESULT_URL=${JSON.stringify(GARBA_RESULT_URL)};
var people=[], rot=0, spinning=false, seal=null, sound=true, lastWinner=-1;
var $=function(id){return document.getElementById(id)};
var cv=$("cv"), ctx=cv.getContext("2d");
var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};

/* ---------- सील (commit–reveal) ---------- */
function randInt(n){var a=new Uint32Array(1),lim=Math.floor(0xFFFFFFFF/n)*n;do{crypto.getRandomValues(a)}while(a[0]>=lim);return a[0]%n}
function randHex(bytes){var a=new Uint8Array(bytes);crypto.getRandomValues(a);return Array.prototype.map.call(a,function(b){return b.toString(16).padStart(2,"0")}).join("")}
async function sha(s){var h=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return Array.prototype.map.call(new Uint8Array(h),function(b){return b.toString(16).padStart(2,"0")}).join("")}
function commitStr(p,salt){return p.tok+"|"+p.name+"|"+(p.biz||"")+"|"+salt}
async function newSeal(){
  var idx=randInt(people.length), salt=randHex(8), hash=await sha(commitStr(people[idx],salt));
  seal={idx:idx,salt:salt,hash:hash};
  $("sealCode").textContent=hash.slice(0,16).toUpperCase().match(/.{4}/g).join(" ");
  $("reveal").hidden=true;
}

/* ---------- पहिया ---------- */
function size(){var r=cv.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,2);cv.width=Math.round(r.width*d);cv.height=Math.round(r.height*d);draw()}
function draw(){
  var W=cv.width,R=W/2,n=people.length;ctx.clearRect(0,0,W,W);if(!n)return;
  var seg=2*Math.PI/n;ctx.save();ctx.translate(R,R);
  for(var i=0;i<n;i++){
    var a0=rot+i*seg;
    ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,R,a0,a0+seg);ctx.closePath();
    ctx.fillStyle=COLORS[i%COLORS.length];if(n%COLORS.length===1&&i===n-1)ctx.fillStyle=COLORS[2];ctx.fill();
    ctx.strokeStyle="rgba(255,248,236,.6)";ctx.lineWidth=Math.max(1,W/400);ctx.stroke();
    ctx.save();ctx.rotate(a0+seg/2);ctx.textAlign="right";ctx.textBaseline="middle";ctx.fillStyle="#fff";
    ctx.shadowColor="rgba(0,0,0,.45)";ctx.shadowBlur=W/200;
    var fs=Math.max(7,Math.min(W*0.034,seg*R*0.42));
    if(n>40){ctx.font="800 "+Math.min(fs*1.6,W*0.03)+"px 'Baloo 2',sans-serif";ctx.fillText(people[i].tok,R*0.93,0)}
    else{
      var lines=fitName(people[i].biz||people[i].name,fs,R*0.64,n<=30);
      var top=-(fs*1.05+lines.lh*lines.text.length)/2+fs*0.5;
      ctx.font="800 "+(fs*1.05)+"px 'Baloo 2',sans-serif";ctx.fillText(people[i].tok,R*0.93,top);
      ctx.font="600 "+lines.size+"px 'Hind',sans-serif";
      lines.text.forEach(function(t,k){ctx.fillText(t,R*0.93,top+fs*0.62+lines.lh*(k+0.5))});
    }
    ctx.restore();
  }
  var bulbs=Math.max(24,Math.min(n*2,96));
  for(var b=0;b<bulbs;b++){var a=b/bulbs*2*Math.PI;ctx.beginPath();ctx.arc(Math.cos(a)*(R-W*0.012),Math.sin(a)*(R-W*0.012),W*0.0065,0,7);ctx.fillStyle=(b+Math.floor(rot*3))%2?"#FFF6C8":"#F5B814";ctx.fill()}
  ctx.restore();
}
/* पूरा नाम दिखाने के लिए: पहले font छोटा करो, फिर भी न आए तो दो लाइन, आख़िर में ही "…" */
function fitName(nm,fs,maxW,twoLines){
  var font=function(s){ctx.font="600 "+s+"px 'Hind',sans-serif"};
  var wide=function(t){return ctx.measureText(t).width>maxW};
  var cut=function(t){while(wide(t)&&t.length>3)t=t.slice(0,-2)+"…";return t};
  var size=fs*0.82;font(size);
  while(wide(nm)&&size>fs*0.62){size*=0.95;font(size)}
  if(!wide(nm))return {text:[nm],size:size,lh:size*1.1};
  var words=nm.split(/\\s+/);
  if(twoLines&&words.length>1){
    var best=null;
    for(var w=1;w<words.length;w++){
      var a=words.slice(0,w).join(" "),b=words.slice(w).join(" ");
      var m=Math.max(ctx.measureText(a).width,ctx.measureText(b).width);
      if(!best||m<best.m)best={a:a,b:b,m:m};
    }
    size=fs*0.78;font(size);
    while((wide(best.a)||wide(best.b))&&size>fs*0.5){size*=0.95;font(size)}
    return {text:[cut(best.a),cut(best.b)],size:size,lh:size*1.05};
  }
  while(wide(nm)&&size>fs*0.45){size*=0.95;font(size)}
  return {text:[cut(nm)],size:size,lh:size*1.1};
}
function underPointer(){var n=people.length,seg=2*Math.PI/n,a=(-Math.PI/2-rot)%(2*Math.PI);if(a<0)a+=2*Math.PI;return Math.floor(a/seg)%n}

/* ---------- आवाज़ ---------- */
var ac=null;
function tick(f,dur,vol){f=f||1400;dur=dur||.04;vol=vol||.25;if(!sound||!ac)return;var o=ac.createOscillator(),g=ac.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(vol,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+dur);o.connect(g).connect(ac.destination);o.start();o.stop(ac.currentTime+dur)}
function fanfare(){[523,659,784,1047].forEach(function(f,i){setTimeout(function(){tick(f,.35,.3)},i*140)})}

/* ---------- स्पिन ---------- */
var sleep=function(ms){return new Promise(function(r){setTimeout(r,ms)})};
async function start(){
  if(spinning||!seal||people.length<2)return;
  try{ac=ac||new (window.AudioContext||window.webkitAudioContext)();ac.resume&&ac.resume()}catch(e){}
  spinning=true;lock(true);$("hint").textContent="तैयार हो जाइए…";
  for(var c=3;c>=1;c--){$("ov").innerHTML='<div class="count">'+c+'</div>';tick(880,.15,.3);await sleep(1000)}
  $("ov").innerHTML="";$("hint").textContent="पहिया घूम रहा है…";
  var n=people.length,seg=2*Math.PI/n,jitter=(randInt(1000)/1000-.5)*0.7;
  var target=-Math.PI/2-(seal.idx+.5+jitter)*seg,delta=(target-rot)%(2*Math.PI);if(delta<0)delta+=2*Math.PI;
  var turns=11+randInt(4),total=delta+turns*2*Math.PI,from=rot,t0=performance.now(),last=underPointer();
  await new Promise(function(done){
    function frame(now){var t=Math.min(1,(now-t0)/SPIN_MS),e=1-Math.pow(1-t,4);rot=from+total*e;draw();
      var cur=underPointer();if(cur!==last){last=cur;tick()}
      $("hubNum").textContent=Math.ceil((1-t)*SPIN_MS/1000);
      if(t<1)requestAnimationFrame(frame);else done()}
    requestAnimationFrame(frame);
  });
  rot%=2*Math.PI;
  var w=underPointer();lastWinner=w;
  $("hubLbl").textContent="Winner";$("hubNum").textContent=people[w].tok;
  renderList();fanfare();confetti();
  $("wTok").textContent=people[w].tok;$("wBiz").textContent=people[w].biz||people[w].name;$("wName").textContent=people[w].biz?people[w].name:"";
  $("pubBtn").hidden=false;$("pubBtn").disabled=false;$("pubErr").hidden=true;$("pubOk").classList.remove("show");
  $("modal").hidden=false;$("closeBtn").focus();
  await showReveal();
  $("hint").textContent="ड्रा पूरा हुआ। सील कोड जाँचकर सबको दिखाएँ, फिर Winner घोषित करें।";
  spinning=false;
}
async function showReveal(){
  var p=people[seal.idx],s=commitStr(p,seal.salt),h=await sha(s);
  $("revealText").textContent=s;$("revealHash").textContent=h;
  var ok=h===seal.hash&&seal.idx===lastWinner,v=$("verdict");
  v.className="verdict "+(ok?"ok":"bad");
  v.textContent=ok?"✓ कोड मेल खाता है: नतीजा ड्रा से पहले ही सील था, बीच में कुछ नहीं बदला।":"✗ कोड मेल नहीं खाता।";
  $("reveal").hidden=false;
}
function lock(on){["startBtn","syncBtn"].forEach(function(id){$(id).disabled=on})}
async function reset(){
  $("modal").hidden=true;lastWinner=-1;$("hubLbl").textContent="टाइमर";$("hubNum").textContent=SPIN_MS/1000;
  renderList();await newSeal();lock(false);
  $("hint").textContent="नया सील कोड बन गया है। फोटो लें, फिर दर्शकों में से किसी से START दबवाएँ।";
}

/* ---------- Winner घोषित (public result page) ---------- */
async function publish(){
  if(lastWinner<0||!seal)return;
  var p=people[lastWinner];
  if(!confirm("Public link पर Winner दिखेगा:\\n\\n"+p.tok+" – "+(p.biz||p.name)+"\\n\\nपक्का घोषित करें?"))return;
  var b=$("pubBtn"),err=$("pubErr");b.disabled=true;b.textContent="घोषित हो रहा है…";err.hidden=true;
  try{
    var r=await fetch("/admin/garba/draw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({ticket:p.tok,salt:seal.salt,hash:seal.hash})});
    var j=await r.json().catch(function(){return {}});
    if(!r.ok||!j.ok)throw new Error(j.error||("HTTP "+r.status));
    b.hidden=true;$("pubOk").classList.add("show");
    $("waShare").href="https://wa.me/?text="+encodeURIComponent("🎉 Mbjare गरबा Lucky Draw का result आ गया! Winner: "+p.tok+" – "+(p.biz||p.name)+". पूरा result देखें: "+RESULT_URL);
  }catch(e){err.textContent="घोषित नहीं हो पाया: "+e.message;err.hidden=false;b.disabled=false;b.textContent="✅ Winner घोषित करो (Public link पर दिखाओ)"}
}

/* ---------- सूची ---------- */
function renderList(){
  $("cnt").textContent="("+people.length+")";
  $("list").innerHTML=people.map(function(p,i){return '<li class="'+(i===lastWinner?"win":"")+'"><span class="t" style="background:'+COLORS[i%COLORS.length]+'">'+esc(p.tok)+'</span><span class="n">'+esc(p.biz||p.name)+(p.biz?'<small>'+esc(p.name)+'</small>':'')+'</span></li>'}).join("");
}
function setSrc(text,cls){var s=$("src");s.textContent=text;s.className="src "+(cls||"")}
async function load(){
  if(spinning)return;
  $("syncBtn").disabled=true;$("startBtn").disabled=true;setSrc("Supabase से entries ला रहे हैं…");
  try{
    var r=await fetch(SUPABASE_URL+"/rest/v1/rpc/garba_draw_entries",{method:"POST",headers:{apikey:SUPABASE_KEY,Authorization:"Bearer "+SUPABASE_KEY,"Content-Type":"application/json"},body:"{}",cache:"no-store"});
    if(!r.ok)throw new Error("http "+r.status);
    var data=await r.json(),seen={};
    var rows=(data||[]).map(function(x){return {tok:String(x.ticket||"").trim(),name:String(x.name||"").trim(),biz:String(x.business_name||"").trim()}})
      .filter(function(x){if(!x.tok||!x.name||seen[x.tok])return false;seen[x.tok]=1;return true});
    if(rows.length<2){people=rows;renderList();size();setSrc("अभी सिर्फ़ "+rows.length+" entry है। ड्रा के लिए कम से कम 2 चाहिए।","warn");$("hint").textContent="";return}
    people=rows;rot=0;lastWinner=-1;
    setSrc("Live · "+people.length+" entries · "+new Date().toLocaleTimeString("hi-IN",{hour:"2-digit",minute:"2-digit"})+" पर अपडेट","live");
    renderList();size();await reset();
  }catch(e){setSrc("Entries नहीं आ पाईं। इंटरनेट जाँचकर 'ताज़ा करें' दबाएँ।","warn")}
  finally{$("syncBtn").disabled=spinning}
}

$("syncBtn").onclick=load;
$("startBtn").onclick=start;
$("pubBtn").onclick=publish;
$("closeBtn").onclick=function(){$("modal").hidden=true;$("reveal").scrollIntoView({behavior:"smooth",block:"center"})};
$("againBtn").onclick=reset;
$("copyBtn").onclick=function(){var b=this;(navigator.clipboard?navigator.clipboard.writeText(RESULT_URL):Promise.reject()).then(function(){b.textContent="✓ Copied"},function(){b.textContent=RESULT_URL})};
$("soundBtn").onclick=function(){sound=!sound;$("soundBtn").textContent=sound?"🔊 आवाज़ चालू":"🔇 आवाज़ बंद"};
$("fsBtn").onclick=function(){try{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen().catch(function(){})}catch(e){}};

/* ---------- कॉन्फ़ेटी ---------- */
function confetti(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  var c=$("confetti"),x=c.getContext("2d"),W=c.width=innerWidth,H=c.height=innerHeight,cols=COLORS.concat(["#FFF8EC","#F5B814"]);
  var ps=Array.from({length:180},function(){return {x:W/2+(Math.random()-.5)*W*.3,y:H*.35,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:cols[Math.floor(Math.random()*cols.length)],a:Math.random()*6,va:(Math.random()-.5)*.3}});
  var t0=performance.now();
  (function f(now){x.clearRect(0,0,W,H);ps.forEach(function(p){p.vy+=.35;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});
    if(now-t0<4500)requestAnimationFrame(f);else x.clearRect(0,0,W,H)})(t0);
}

new ResizeObserver(size).observe(cv);
(document.fonts?document.fonts.ready:Promise.resolve()).then(size);
load();
})();
</script>
</body>
</html>`
