/* ===== 언어: 한국어(기본)와 영어 =====
   T(ko, en)으로 문장을 고른다. 표는 LANG에 따라 한국어 표나 영어 표를 통째로 고른다.
   표의 열쇠(비견, 목 같은 내부 이름)는 언어와 상관없이 한국어 그대로 두고, 화면에 보일 때만 이름표를 바꾼다.
   기기 언어가 한국어면 한국어, 그 밖에는 영어로 뜬다. 화면 맨 아래 단추로 바꿀 수 있고, 고른 언어는 기기에 저장된다.
   EN_READY를 false로 돌리면 앱이 항상 한국어로 뜬다(영어는 주소 끝에 ?lang=en 을 붙여야만 보인다). */
const EN_READY = true;
const LANG = (() => {
  let q = null, saved = null;
  try { q = new URLSearchParams(location.search).get('lang'); saved = localStorage.getItem('mw-lang'); } catch (e) {}
  if (q === 'en' || q === 'ko') return q;
  if (!EN_READY) return 'ko';
  if (saved === 'en' || saved === 'ko') return saved;
  return /^ko\b/i.test(navigator.language || 'ko') ? 'ko' : 'en';
})();
const EN = LANG === 'en';
const T = (ko, en) => EN ? en : ko;
function setLang(l) { try { localStorage.setItem('mw-lang', l); } catch (e) {} location.reload(); }

/* 화면 틀(head.html)의 고정 글자를 영어로 바꾼다. 단추의 id와 동작은 그대로 둔다. */
(function applyLang() {
  if (!EN) return;
  document.documentElement.lang = 'en';
  const q = s => document.querySelector(s), id = s => document.getElementById(s);
  const html = (el, h) => { if (el) el.innerHTML = h; };
  const tx = (el, t, last) => {   // 안에 든 입력칸은 두고 글자만 바꾼다
    if (!el) return; const ns = [...el.childNodes].filter(n => n.nodeType === 3 && n.nodeValue.trim());
    const n = last ? ns[ns.length - 1] : ns[0]; if (n) n.nodeValue = t; else el.insertBefore(document.createTextNode(t), last ? null : el.firstChild);
  };
  const opt = (sel, map) => { const s = id(sel); if (s) [...s.options].forEach(o => { if (map[o.value]) o.textContent = map[o.value]; }); };
  document.title = 'Deungbul Saju';
  html(q('header h1'), 'Deungbul Saju');
  tx(id('f-name').parentNode, 'Name (optional)'); tx(id('f-gender').parentNode, 'Sex'); opt('f-gender', { M: 'Male', F: 'Female' });
  tx(id('f-cal').parentNode, 'Calendar'); opt('f-cal', { solar: 'Solar', lunar: 'Lunar', leap: 'Lunar (leap month)' });
  tx(id('f-y').parentNode, 'Year'); tx(id('f-m').parentNode, 'Month'); tx(id('f-d').parentNode, 'Day');
  tx(id('f-si').parentNode, 'Birth time (clock)'); tx(id('f-notime').parentNode, " I don't know the hour", true);
  tx(id('f-mbti').parentNode, 'MBTI type (optional)');
  html(q('#birthForm .hint'), 'Enter the clock time where you were born. The app converts it with that city\'s time zone (daylight saving included) and its longitude to find your hour pillar. Choose the nearest listed city in the same time zone.');
  html(q('#birthForm button.primary'), 'See my chart');
  const nav = { saju: 'Saju', tarot: 'Tarot', match: 'Match', face: 'Face', astro: 'Stars', reading: 'Combo' };
  document.querySelectorAll('nav a[data-v]').forEach(a => { if (nav[a.dataset.v]) a.textContent = nav[a.dataset.v]; });
  html(q('.wrap > p.note'), 'Saju, tarot, compatibility, face and astrology readings are for entertainment and reference only. Do not use them as a basis for health, legal or investment decisions.');
  html(id('guideBtn'), 'How it works · Pricing'); html(id('resetBtn'), 'Erase all saved data'); html(id('codeBtn'), 'Access code');

  html(q('#guideDlg h2'), 'How it works');
  html(q('#guideDlg ol.guide'),
    '<li><b>Enter your details</b> Your birth date (solar or lunar) and birth time. Add the city nearest your birthplace. If you don\'t know the time, tick "I don\'t know the hour".</li>' +
    '<li><b>Saju</b> Tap "See today\'s fortune" at the top; it opens after one ad. Pick a year to read that year\'s fortune. The overall summary is at the bottom. Tap the ? next to a heading for a plain explanation of the term.</li>' +
    '<li><b>Tarot</b> Today\'s fortune tarot. After one ad, flip three cards yourself: today overall, love and people, money and work.</li>' +
    '<li><b>Stars</b> Western astrology from the sky at your birth: Sun, Moon and Rising, the planets by sign, and today\'s transits, opened with one ad.</li>' +
    '<li><b>Match</b> Enter the other person\'s birth date to see your scores and reading as a pair.</li>' +
    '<li><b>Face</b> Take or choose a front-facing photo. The app measures facial proportions and reads them together with your saju. The photo is not saved.</li>' +
    '<li><b>Combo</b> Reads your saju and the cards you drew together.</li>');
  html(q('#guideDlg h3'), 'What is free and what is paid');
  html(q('#guideDlg table.tiers'),
    '<tr><th><span class="tier free" style="margin:0">Free</span></th><td>Your saju chart, five-element and ten-gods summary, this year\'s overall fortune, compatibility total score, face type and total score, glossary</td></tr>' +
    '<tr><th><span class="tier ad" style="margin:0">Watch an ad</span></th><td>Daily fortune (score, money, work and love luck, opportunities and cautions, lucky color and number, yesterday and tomorrow), today\'s fortune tarot (three cards), and your astrology chart with today\'s transits. One ad opens each for the day</td></tr>' +
    '<tr><th><span class="tier paid" style="margin:0">Paid <span class="pp">₩990</span></span></th><td><b>One person\'s saju</b>: the full detailed reading (monthly flow and year-by-year fortune included), detailed face reading (what each feature means and how to use it), the combined reading, and a PDF document of your saju and face readings. Daily fortune, tarot and astrology open without ads<br><b>One couple\'s match</b>: the reading for each part and the overall summary</td></tr>');
  html(q('#guideDlg p.note'), 'Nothing renews automatically. Locked content opens for <span class="pp">₩990</span> per person\'s saju or per couple. What you enter is stored on this device only, and you can erase it all from the bottom of the screen. Readings are for entertainment and reference.');
  html(id('guideStart'), 'Enter my details and start'); html(id('guideClose'), 'Look around the example first');

  html(q('#codeDlg h2'), 'Access code'); html(q('#codeDlg p.note'), 'If you have an access code, enter it here. Detailed readings will open on this device.');
  tx(id('codeIn').parentNode, 'Code'); html(q('#codeForm button.primary'), 'Confirm'); html(id('codeCancel'), 'Cancel');

  html(q('#resetDlg h2'), 'Erase everything?');
  html(q('#resetDlg p'), 'Your birth date and personality type, your match partner\'s details, today\'s card and your visit streak stored on this device will all be erased, and the app returns to the example screen. This cannot be undone. The record of readings you have purchased is kept, so entering the same details again opens them as before.');
  html(id('resetGo'), 'Erase everything'); html(id('resetCancel'), 'Cancel');

  html(id('payPerk'),
    '<li>Reading for each of the ten gods and how they act on each other</li><li>Lifetime fortune graph, your golden period and best year</li>' +
    '<li>Year-by-year fortune for any year you pick, with its twelve months</li><li>Your innate type and stars, and readings by area (temperament, work, money, partner)</li>' +
    '<li>Past, present and upcoming luck cycles, and the overall summary</li><li>The combined reading of your saju and today\'s tarot</li><li>A PDF document of your saju and face readings</li>' +
    '<li>Face reading by feature, changes that improve it, the age positions and a summary</li>');
  html(id('payPerkMatch'), '<li>Reading for each part of the outer, inner and daily-life match</li><li>An overall summary for the two of you</li>');
  html(id('payDemo'), 'Prototype mode. No real payment is made; the button only unlocks the content on this device.');
  html(id('payNote'), 'After one payment, the reading for the birth date above stays open on this device. You can correct the birth hour later without paying again. Changing the birth date or sex counts as a different person and needs a new payment. Deleting the app may remove your purchase record. <a id="payTerms" href="#">Terms of Use</a> · <a id="payPrivacy" href="#">Privacy Policy</a>');
  html(id('payClose'), 'Close');
})();
