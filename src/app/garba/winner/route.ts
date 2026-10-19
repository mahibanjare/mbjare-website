import { esc, garbaEntries, garbaOpen, garbaResult, GARBA_RESULT_URL } from '@/lib/garba'

/**
 * Public Garba Lucky Draw result page — the link that is sent to everyone.
 * Standalone HTML in the same theme as public/garba.html (no site chrome).
 * Before the draw it lists the participants and refreshes itself every minute.
 */
export async function GET() {
  const [entries, result] = await Promise.all([garbaEntries(), garbaResult()])
  const list = entries ?? []
  const open = garbaOpen()
  const fmt = (d: string) =>
    new Date(d).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', hour12: true,
    })

  const seal = result ? result.seal_hash.slice(0, 16).toUpperCase().match(/.{4}/g)!.join(' ') : ''

  const winnerBlock = result
    ? `<section class="win" aria-labelledby="wh">
        <div class="burst" aria-hidden="true">🎉</div>
        <p class="k" id="wh">गरबा Lucky Draw के Winner हैं</p>
        <div class="tk">${esc(result.winner_ticket)}</div>
        ${result.winner_business ? `<div class="biz">${esc(result.winner_business)}</div>` : ''}
        <div class="nm">${esc(result.winner_name)}</div>
        <p class="prize">इनाम: <b>3 Reels का FREE Mobile Shoot</b></p>
        <p class="when">Draw: ${esc(fmt(result.drawn_at))} · कुल ${result.total_entries} entries</p>
        <p class="claim">Winner 27 Oct तक 8815223300 पर call / WhatsApp करके इनाम claim करें।</p>
      </section>
      <details class="proof">
        <summary>🔒 Draw ईमानदार था — सील कोड जाँचें</summary>
        <p>स्पिन से पहले स्क्रीन पर यह सील कोड दिखाया गया था:</p>
        <div class="code">${esc(seal)}</div>
        <p>सील खोलने की चाबी (winner की जानकारी + गुप्त कोड):</p>
        <div class="mono">${esc(result.seal_reveal)}</div>
        <p>इसका SHA-256 कोड:</p>
        <div class="mono" id="hash">${esc(result.seal_hash)}</div>
        <p class="verdict" id="verdict">जाँच हो रही है…</p>
      </details>`
    : `<section class="wait">
        <div class="clock" aria-hidden="true">⏳</div>
        <h2>Winner <span>20 Oct (दशहरा), दोपहर ~3 बजे</span> घोषित होगा</h2>
        <p>यही link खुला रखें — result आते ही यहाँ दिख जाएगा।</p>
        ${open ? `<a class="cta" href="/garba?src=result">अभी Entry करें · Entries 20 Oct सुबह 11:59 तक</a>` : `<p class="closed">Entries बंद हो चुकी हैं।</p>`}
      </section>`

  const people = list
    .map((p) => {
      const won = result && p.ticket === result.winner_ticket
      return `<li${won ? ' class="won"' : ''}><span class="t">${esc(p.ticket)}</span><span class="n"><b>${esc(p.business_name || p.name)}</b>${p.business_name ? `<small>${esc(p.name)}</small>` : ''}</span>${won ? '<span class="cr" aria-label="Winner">🏆</span>' : ''}</li>`
    })
    .join('')

  const shareText = result
    ? `🎉 Mbjare गरबा Lucky Draw का result आ गया! Winner: ${result.winner_ticket} – ${result.winner_business || result.winner_name}. पूरा result देखें:`
    : `Mbjare गरबा Lucky Draw – winner 20 Oct दोपहर ~3 बजे घोषित होगा। Result यहाँ देखें:`

  const html = `<!doctype html>
<html lang="hi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0B3B3D">
<title>गरबा Lucky Draw Result | Mbjare</title>
<meta name="description" content="${result ? `Winner: ${esc(result.winner_ticket)} – ${esc(result.winner_business || result.winner_name)}` : 'Winner 20 Oct (दशहरा) दोपहर ~3 बजे घोषित होगा'} · Mbjare गरबा Lucky Draw">
<meta property="og:title" content="गरबा Lucky Draw Result | Mbjare">
<meta property="og:image" content="https://www.mbjare.com/garba-logo.png">
${result ? '' : '<meta http-equiv="refresh" content="60">'}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Hind:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  :root{--teal:#038084;--teal-l:#18A6AB;--deep:#0B3B3D;--deeper:#072A2B;--mint:#E6F4F4;--gold:#F5B814;--magenta:#D63A7A;--orange:#F2762E;
    --paper:#FFF8EC;--line:#E7DCC7;--ink:#173233;--muted:#62797A}
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Hind',system-ui,sans-serif;color:var(--ink);background:var(--paper);min-height:100dvh;font-size:16px;line-height:1.5;overflow-x:hidden}
  .hero{position:relative;color:#fff;text-align:center;padding:46px 16px 90px;overflow:hidden;
    background:radial-gradient(60% 50% at 85% 10%,rgba(214,58,122,.35),transparent 70%),radial-gradient(55% 45% at 10% 30%,rgba(24,166,171,.35),transparent 70%),linear-gradient(180deg,#0E4C4F 0%,var(--deep) 55%,var(--deeper) 100%)}
  .hero::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:46px;background:var(--paper);
    -webkit-mask:radial-gradient(28px 24px at 28px 0,#0000 98%,#000) -28px 0/56px 100% repeat-x;mask:radial-gradient(28px 24px at 28px 0,#0000 98%,#000) -28px 0/56px 100% repeat-x}
  .toran{position:absolute;top:0;left:0;right:0;height:30px;display:flex;justify-content:space-around;overflow:hidden;border-top:3px solid var(--gold)}
  .toran i{flex:0 0 20px;height:24px;clip-path:polygon(0 0,100% 0,50% 100%)}
  .toran i:nth-child(4n+1){background:var(--gold)}.toran i:nth-child(4n+2){background:var(--teal-l)}.toran i:nth-child(4n+3){background:var(--magenta)}.toran i:nth-child(4n+4){background:var(--orange)}
  .logo{width:88px;height:auto;display:block;margin:0 auto 12px}
  .eyebrow{display:inline-block;font-size:13px;font-weight:600;color:var(--deeper);background:var(--gold);border-radius:99px;padding:4px 12px 3px}
  h1{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(34px,10vw,50px);line-height:1.05;margin:14px 0 0}
  h1 span{display:block;color:var(--gold);font-size:.62em;margin-top:6px}
  .wrap{position:relative;max-width:560px;margin:-60px auto 0;padding:0 16px 36px}
  .card{background:#fff;border-radius:24px;box-shadow:0 30px 60px -28px rgba(7,42,43,.45),0 2px 0 var(--line);padding:24px 18px;text-align:center}
  .win .burst{font-size:44px;line-height:1}
  .win .k{font-weight:600;color:var(--muted);margin-top:6px}
  .win .tk{display:inline-block;margin:12px 0 8px;padding:8px 22px 4px;border-radius:16px;background:var(--deeper);color:var(--gold);font-family:'Baloo 2',sans-serif;font-weight:800;font-size:40px;letter-spacing:.06em}
  .win .biz{font-family:'Baloo 2',sans-serif;font-weight:800;font-size:clamp(26px,7vw,34px);line-height:1.15;color:var(--teal)}
  .win .nm{font-size:19px;font-weight:600;margin-top:2px}
  .win .prize{margin-top:14px;background:var(--mint);border-radius:14px;padding:10px 12px 8px}
  .win .when{font-size:14px;color:var(--muted);margin-top:10px}
  .win .claim{font-size:13.5px;color:var(--muted);margin-top:4px}
  .proof{margin-top:16px;text-align:left;border:2px dashed var(--line);border-radius:16px;padding:12px 14px;background:var(--paper)}
  .proof summary{cursor:pointer;font-weight:700;color:var(--teal)}
  .proof p{font-size:14px;color:var(--muted);margin-top:10px}
  .proof .code{font-family:ui-monospace,Menlo,monospace;font-size:20px;letter-spacing:2px;text-align:center;border:1.5px dashed var(--gold);border-radius:10px;padding:8px;margin-top:6px;background:#fff}
  .proof .mono{font-family:ui-monospace,Menlo,monospace;font-size:12px;word-break:break-all;background:#fff;border-radius:8px;padding:8px;margin-top:6px}
  .proof .verdict{font-weight:700}
  .proof .ok{color:#1F8A55}.proof .bad{color:#C62853}
  .wait .clock{font-size:42px;line-height:1}
  .wait h2{font-family:'Baloo 2',sans-serif;font-size:26px;line-height:1.2;margin-top:8px}
  .wait h2 span{display:block;color:var(--magenta)}
  .wait p{color:var(--muted);margin-top:8px}
  .cta{display:inline-block;margin-top:16px;background:linear-gradient(180deg,#FFCD45,var(--gold));color:var(--deeper);font-weight:700;text-decoration:none;border-radius:14px;padding:13px 18px 11px}
  .closed{font-weight:600}
  .share{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:16px;background:#1F9E5A;color:#fff;font-weight:700;text-decoration:none;border-radius:16px;padding:14px 12px 12px}
  .list{margin-top:22px}
  .list h3{font-family:'Baloo 2',sans-serif;font-size:21px;text-align:center}
  .list h3 small{display:block;font-family:'Hind',sans-serif;font-size:13.5px;font-weight:500;color:var(--muted)}
  .list ul{list-style:none;display:grid;gap:8px;margin-top:12px}
  .list li{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:10px 12px;min-width:0}
  .list li.won{border:2px solid var(--gold);background:#FFF6D6}
  .list .t{flex:none;font-family:'Baloo 2',sans-serif;font-weight:700;font-size:15px;color:#fff;background:var(--teal);border-radius:8px;padding:3px 8px 1px}
  .list li.won .t{background:var(--magenta)}
  .list .n{min-width:0;display:flex;flex-direction:column}
  .list .n b{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .list .n small{font-size:13px;color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .list .cr{margin-left:auto;font-size:22px}
  .empty{text-align:center;color:var(--muted);margin-top:10px}
  footer{text-align:center;color:var(--muted);font-size:13.5px;margin-top:24px;line-height:1.8}
  footer a{color:var(--teal);font-weight:600;text-decoration:none}
</style>
</head>
<body>
<header class="hero">
  <div class="toran" aria-hidden="true">${'<i></i>'.repeat(32)}</div>
  <img class="logo" src="/garba-logo.png" alt="Mbjare – आरंग मार्केटिंग एमबीजेयर" width="320" height="298">
  <span class="eyebrow">✦ नवरात्रि स्पेशल · Navratri Special</span>
  <h1>गरबा Lucky Draw<span>${result ? 'Result आ गया! 🎉' : 'Result'}</span></h1>
</header>
<main class="wrap">
  <div class="card">
    ${winnerBlock}
    <a class="share" href="https://wa.me/?text=${encodeURIComponent(`${shareText} ${GARBA_RESULT_URL}`)}" target="_blank" rel="noopener">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>
      WhatsApp पर Share करें</a>
  </div>

  <section class="list" aria-labelledby="lh">
    <h3 id="lh">इन सबने भाग लिया <small>कुल ${list.length} participants · Lucky Number के साथ</small></h3>
    ${list.length ? `<ul>${people}</ul>` : `<p class="empty">${entries ? 'अभी कोई entry नहीं है।' : 'List अभी load नहीं हो पाई, थोड़ी देर बाद page refresh करें।'}</p>`}
  </section>

  <footer>
    <a href="https://www.mbjare.com">www.mbjare.com</a> · 8815223300<br>
    Website · WhatsApp Automation · Social Media · Google Business
  </footer>
</main>
${
  result
    ? `<script>
(async function(){
  var v=document.getElementById('verdict');
  try{
    var buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(${JSON.stringify(result.seal_reveal).replace(/</g, '\\u003c')}));
    var h=[].map.call(new Uint8Array(buf),function(b){return b.toString(16).padStart(2,'0')}).join('');
    var ok=h===${JSON.stringify(result.seal_hash)};
    v.className='verdict '+(ok?'ok':'bad');
    v.textContent=ok?'✓ कोड मेल खाता है: winner spin से पहले ही सील था, बाद में कुछ नहीं बदला।':'✗ कोड मेल नहीं खाता।';
  }catch(e){v.textContent='इस browser में जाँच नहीं हो पाई।'}
})();
</script>`
    : ''
}
</body>
</html>`

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
