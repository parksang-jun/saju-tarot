/* ===== 점수, 인생 그래프, 오늘의 일진, 연출 ===== */
const SEASON_ADJ = EN ? EN_U.SEASON_ADJ : { '봄': '봄날의', '여름': '한여름의', '가을': '가을의', '겨울': '한겨울의' };
const GYEOK_NICK = EN ? EN_U.GYEOK_NICK : { '비견': '자수성가형', '겁재': '승부사', '식신': '장인', '상관': '혁신가', '편재': '사업가', '정재': '살림의 고수', '편관': '해결사', '정관': '원칙의 리더', '편인': '탐구자', '정인': '학자' };
const DAY_TIP = EN ? EN_U.DAY_TIP : {
  '비견': '내 페이스대로 밀고 가기 좋은 날입니다. 약속은 내가 주도해서 잡으세요.', '겁재': '지갑이 쉽게 열리는 날입니다. 큰 결제는 내일로 미루세요.',
  '식신': '손으로 만드는 일이 잘 풀리는 날입니다. 미뤄 둔 작업을 끝내세요.', '상관': '말이 날카로워지는 날입니다. 아이디어는 메모로, 지적은 한 번만 하세요.',
  '편재': '뜻밖의 제안과 돈 이야기가 오가는 날입니다. 사람을 만나세요.', '정재': '꼼꼼함이 돈이 되는 날입니다. 정산, 계약, 정리를 하세요.',
  '편관': '압박이 들어오는 날입니다. 무리한 일정과 과속을 피하세요.', '정관': '평가받는 날입니다. 약속 시간과 격식을 지키면 점수를 얻습니다.',
  '편인': '직감이 좋은 날입니다. 혼자 파고드는 공부와 기획에 쓰세요.', '정인': '도움을 받는 날입니다. 윗사람에게 묻고 문서를 챙기세요.'
};
const LUCKY_NUM = ['3, 8', '2, 7', '5, 10', '4, 9', '1, 6'];
const godGrp = g => TEN.findIndex(p => p.includes(g));
const clamp = (v, a, b) => Math.max(a, Math.min(b, Math.round(v)));

function luckScores(p, isYear) {
  const sj = S.saju, ev = evalLuck(p, isYear), gs = godGrp(p.sGod), gb = godGrp(p.bGod), sp = S.user.gender === 'M' ? 2 : 3;
  const wealth = 58 + 8 * ev.score + (gs === 2 ? 14 : gs === 1 ? 8 : gs === 0 ? -6 : 0) + (gb === 2 ? 8 : gb === 1 ? 4 : 0) - (!sj.strong && gs === 2 ? 6 : 0);
  const career = 58 + 8 * ev.score + (gs === 3 ? 14 : gs === 4 ? 8 : gs === 1 ? -2 : 0) + (gb === 3 ? 8 : gb === 4 ? 4 : 0);
  const g = sj.P.day.b % 4;
  const love = 58 + 7 * ev.score + (gs === sp ? 12 : 0) + (gb === sp ? 8 : 0) + (p.b === DOHWA[g] ? 8 : 0) + (HAP[p.b] === sj.P.day.b ? 8 : 0) - (isClash(p.b, sj.P.day.b) ? 12 : 0);
  return { ev, total: clamp(62 + 11 * ev.score, 15, 99), wealth: clamp(wealth, 15, 99), career: clamp(career, 15, 99), love: clamp(love, 15, 99) };
}
const scoreWord = n => n >= 85 ? T('대길', 'Excellent') : n >= 70 ? T('길', 'Good') : n >= 50 ? T('평', 'Fair') : T('주의', 'Caution');

function lifeSeries() {
  const sj = S.saju, raw = [];
  const dsc = sj.daeun.map(d => evalLuck(d, false).score);
  for (let age = 0; age <= 84; age++) {
    const yr = sj.by + age; let di = -1; sj.daeun.forEach((d, i) => { if (age >= d.age) di = i; });
    raw.push(60 + (di >= 0 ? 10 * dsc[di] : 0) + 4 * evalLuck(yearPillar(yr, sj.P.day.s), true).score);
  }
  return raw.map((v, i) => (raw[Math.max(0, i - 1)] + v + raw[Math.min(84, i + 1)]) / 3);
}
function graphHTML() {
  const sj = S.saju, yNow = new Date().getFullYear(), ser = lifeSeries(), W = 340, Hh = 150;
  const x = a => 12 + a / 84 * (W - 24), y = v => 128 - (clamp(v, 25, 100) - 25) / 75 * 104;
  const pts = ser.map((v, a) => x(a).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
  const ageNow = clamp(yNow - sj.by, 0, 84);
  let best = sj.daeun[0], bs = -99; sj.daeun.forEach(d => { const s = evalLuck(d, false).score; if (s > bs) { bs = s; best = d; } });
  let top = null, low = null;
  for (let yr = yNow + 1; yr <= yNow + 10; yr++) { const t = luckScores(yearPillar(yr, sj.P.day.s), true).total; if (!top || t > top[1]) top = [yr, t]; if (!low || t < low[1]) low = [yr, t]; }
  const bx = x(Math.min(84, best.age + 5)), by2 = y(ser[Math.min(84, best.age + 5)]);
  const svg = '<svg viewBox="0 0 ' + W + ' ' + Hh + '" role="img" aria-label="' + T('나이에 따른 운의 흐름 그래프', 'Graph of your luck by age') + '" style="width:100%;height:auto;display:block">' +
    [40, 60, 80].map(v => '<line x1="12" x2="' + (W - 12) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--line)" stroke-width="0.6"/>').join('') +
    '<rect x="' + x(best.age) + '" y="20" width="' + (x(Math.min(84, best.age + 10)) - x(best.age)) + '" height="108" fill="var(--gold)" opacity="0.13"/>' +
    '<polygon points="12,128 ' + pts + ' ' + (W - 12) + ',128" fill="var(--seal)" opacity="0.16"/><polyline points="' + pts + '" fill="none" stroke="var(--seal)" stroke-width="2" stroke-linejoin="round" class="draw"/>' +
    '<line x1="' + x(ageNow) + '" x2="' + x(ageNow) + '" y1="20" y2="128" stroke="var(--paper)" stroke-width="1" stroke-dasharray="3 3"/><circle cx="' + x(ageNow) + '" cy="' + y(ser[ageNow]) + '" r="4" fill="var(--paper)"/>' +
    '<text x="' + x(ageNow) + '" y="14" text-anchor="middle" font-size="10" fill="var(--paper)">' + T('지금', 'Now') + '</text>' +
    '<circle cx="' + bx + '" cy="' + by2 + '" r="4" fill="var(--gold)"/><text x="' + bx + '" y="' + (by2 - 8) + '" text-anchor="middle" font-size="10" fill="var(--gold)">' + T('황금기', 'Golden period') + '</text>' +
    [0, 20, 40, 60, 80].map(a => '<text x="' + x(a) + '" y="144" text-anchor="middle" font-size="10" fill="var(--mute)">' + T(a + '세', a) + '</text>').join('') + '</svg>';
  const tile = (cap, big, sub, cls) => '<div class="tile ' + cls + '"><small>' + cap + '</small><b>' + big + '</b><span>' + sub + '</span></div>';
  return '<div class="block" id="s-graph"><h3>' + T('인생 운 그래프 · 대운과 세운을 합친 흐름', 'Lifetime fortune graph · luck cycles and years combined') + '</h3><div class="panel">' + svg + '</div><div class="tiles">' +
    tile(T('내 인생 황금기', 'Your golden period'), T(best.age + '~' + (best.age + 9) + '세', 'Age ' + best.age + '–' + (best.age + 9)), T(theme(best.sGod, best.age + 2) + '의 10년', 'ten years of ' + theme(best.sGod, best.age + 2)), 'gold') +
    tile(T('10년 안 최고의 해', 'Best year in the next ten'), T(top[0] + '년', top[0]), T('총운 ' + top[1] + '점', 'overall ' + top[1]), 'up') + tile(T('가장 조심할 해', 'Year to be most careful'), T(low[0] + '년', low[0]), T('총운 ' + low[1] + '점', 'overall ' + low[1]), 'dn') + '</div></div>';
}
function heroHTML() {
  const sj = S.saju, ni = S.ni, yNow = new Date().getFullYear(), sc = luckScores(yearPillar(yNow, sj.P.day.s), true);
  S.heroScore = sc.total;
  const bar = (n, v) => '<div class="sbar"><span>' + n + '</span><span class="trk"><i style="--w:' + v + '%"></i></span><b data-count="' + v + '">' + v + '</b></div>';
  return '<div class="hero"><div class="arch"><small>' + SEASON_ADJ[ni.season] + '</small><h2 class="c' + sj.P.day.sEl + '">' + DAY_TXT[sj.P.day.s][0] + '</h2><span>' + T(GYEOK_NICK[ni.gyeok.god] + ' 유형', GYEOK_NICK[ni.gyeok.god]) + '</span></div>' +
    '<div class="ring" id="ring" style="--p:' + sc.total + '"><div><b data-count="' + sc.total + '">' + sc.total + '</b><small>' + yNow + T(' 총운 · ', ' overall · ') + scoreWord(sc.total) + '</small></div></div>' +
    '<div class="sbars">' + bar(T('재물', 'Money'), sc.wealth) + bar(T('일·명예', 'Work · standing'), sc.career) + bar(T('애정', 'Love'), sc.love) + '</div></div>';
}
function dailyHTML() {
  const sj = S.saju, d = new Date(), p = dayPillarOf(d.getFullYear(), d.getMonth() + 1, d.getDate(), sj.P.day.s), sc = luckScores(p, false);
  const lucky = S.ni.johu >= 0 && sj.count[S.ni.johu] <= sj.count[sj.need] ? S.ni.johu : sj.need;
  return '<div class="block"><h3>오늘의 일진 · ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일 ' + elSpan(p.sEl, p.stemH) + elSpan(p.bEl, p.branchH) + '일' + (S.streak > 1 ? ' · 연속 ' + S.streak + '일째' : '') + '</h3><div class="panel daily"><div class="dscore"><b data-count="' + sc.total + '">' + sc.total + '</b><small>' + scoreWord(sc.total) + '</small></div><div><p><b>' + DAEUN[p.sGod][0] + '의 날.</b> ' + DAY_TIP[p.sGod] + '</p>' +
    (sc.ev.good.length ? '<p class="note"><span class="c0">기회</span>: ' + sc.ev.good.join(' / ') + '</p>' : '') + (sc.ev.cautions.length > 1 ? '<p class="note"><span class="c1">조심</span>: ' + sc.ev.cautions.slice(1).join(' / ') + '</p>' : '') +
    '<p class="note">행운의 색과 방향: ' + elSpan(lucky, EL_TIP[lucky][0]) + ' · 숫자 ' + LUCKY_NUM[lucky] + '</p></div></div></div>';
}

/* 연출: 숫자 카운트업, 금가루 */
const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function countUp(root) {
  if (reduceMotion) return;
  root.querySelectorAll('[data-count]').forEach(el => {
    const to = +el.dataset.count, t0 = performance.now(), ring = el.closest('.ring');
    const step = t => { const k = Math.min(1, (t - t0) / 1100), e = 1 - Math.pow(1 - k, 3), v = Math.round(to * e); el.textContent = v; if (ring) ring.style.setProperty('--p', to * e); if (k < 1) requestAnimationFrame(step); };
    el.textContent = '0'; requestAnimationFrame(step);
  });
}
const fx = (() => {
  const cv = document.createElement('canvas'); cv.className = 'fx'; cv.setAttribute('aria-hidden', 'true'); document.body.appendChild(cv);
  const ctx = cv.getContext('2d'); let ps = [], on = false;
  const fit = () => { cv.width = innerWidth; cv.height = innerHeight; };
  addEventListener('resize', fit); fit();
  function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    ps = ps.filter(p => p.life > 0);
    ps.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.life -= 1; ctx.globalAlpha = Math.max(0, p.life / 60); ctx.fillStyle = p.c; ctx.fillRect(p.x, p.y, p.s, p.s); });
    ctx.globalAlpha = 1;
    if (ps.length) requestAnimationFrame(tick); else on = false;
  }
  return { burst(el, n) {
    if (reduceMotion || !el) return; const r = el.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < (n || 46); i++) { const a = Math.random() * Math.PI * 2, v = 1.5 + Math.random() * 4.5; ps.push({ x: cx, y: cy, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 2, life: 40 + Math.random() * 30, s: 2 + Math.random() * 3, c: ['#cfa95f', '#f1d48a', '#d8452e', '#ece6d6'][i % 4] }); }
    if (!on) { on = true; requestAnimationFrame(tick); }
    try { navigator.vibrate && navigator.vibrate(18); } catch (e) {}
  } };
})();
function celebrate() {
  const v = $('v-saju'); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter');
  countUp(v); if (S.heroScore >= 70) setTimeout(() => fx.burst($('ring'), 60), 1100);
}

/* ===== 헤더, 입력 폼 ===== */
function renderWho() {
  const u = S.user, i = S.saju.info;
  $('who').innerHTML = esc(u.name || T('이름 없음', 'No name')) + ' · ' + (u.cal === 'solar' ? T('양력 ', 'Solar ') : u.cal === 'leap' ? T('음력 윤달 ', 'Lunar leap ') : T('음력 ', 'Lunar ')) + u.y + '.' + u.m + '.' + u.d + (u.place ? ' ' + esc(u.place) : '') + (i.siName ? ' ' + i.siName : T(' 시 모름', ' hour unknown')) + ' · ' + (u.gender === 'M' ? T('남', 'M') : T('여', 'F')) +
    (u.example ? '<span class="badge">' + T('예시 데이터', 'Example') + '</span>' : '') + (S.premium ? '<span class="badge">' + T('열람 중', 'Unlocked') + '</span>' : '');
  $('editBtn').textContent = u.example ? T('내 정보 입력', 'Enter my details') : T('수정', 'Edit');
}
function correctionHTML() {
  const sj = S.saju, i = sj.info;
  const t = (i.lunarInput ? T('음력을 양력 ' + i.solar + '로 변환했습니다. ', 'Lunar date converted to solar ' + i.solar + '. ') : '') + (i.siName ? '' : T('태어난 시를 몰라 시주 없이 풀이합니다.', 'The birth hour is unknown, so this is read without the hour pillar.'));
  const w = [i.err, i.warn].filter(Boolean).map(x => '<p class="note warn">' + x + '</p>').join('');
  return (t ? '<p class="note">' + t + '</p>' : '') + w;
}
$('f-mbti').innerHTML = mbtiOptions;
$('f-si').innerHTML = siOptions(-1);
/* 영어판: 열두 시 대신 태어난 곳과 시계 시각을 받는다 */
if (EN) {
  const lab = $('f-si').parentNode; $('f-si').hidden = true;
  lab.insertAdjacentHTML('beforeend', '<input id="f-time" type="time" value="12:00">');
  lab.closest('.row').insertAdjacentHTML('afterend', '<div class="row"><label>Birthplace (nearest city)<select id="f-place">' + worldOptions(worldGuess()) + '</select></label><span></span></div>');
}
function fillForm() {
  const u = S.user;
  $('f-name').value = u.example ? '' : (u.name || ''); $('f-gender').value = u.gender; $('f-cal').value = u.cal;
  $('f-y').value = u.y; $('f-m').value = u.m; $('f-d').value = u.d;
  const si = siOf(u); $('f-si').value = si < 0 ? 5 : si; $('f-notime').checked = si < 0; $('f-si').disabled = si < 0;
  $('f-mbti').value = u.mbti || '';
  if (EN) { $('f-time').value = u.hh != null ? pad2(u.hh) + ':' + pad2(u.mm) : '12:00'; $('f-time').disabled = u.tz ? u.hh == null : si < 0; $('f-notime').checked = $('f-time').disabled; if (u.place) $('f-place').value = u.place; }
}
$('birthForm').addEventListener('submit', e => {
  e.preventDefault();
  const y = +$('f-y').value, m = +$('f-m').value, d = +$('f-d').value, msg = $('f-msg');
  if (!(y >= 1900 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31)) { msg.textContent = T('생년월일을 다시 확인하세요. 1900~2100년만 지원합니다.', 'Check the birth date again. Only 1900–2100 is supported.'); return; }
  const no = $('f-notime').checked;
  const u = { name: $('f-name').value.trim(), gender: $('f-gender').value, cal: $('f-cal').value, y, m, d, si: no ? -1 : +$('f-si').value, mbti: $('f-mbti').value };
  if (EN) withPlace(u, $('f-place').value, $('f-time').value, no);
  if (u.cal !== 'solar' && !lunarToSolar(y, m, d, u.cal === 'leap')) { msg.textContent = T('해당 음력 날짜를 찾지 못했습니다. 윤달 여부와 날짜(29일/30일)를 확인하세요.', 'That lunar date was not found. Check whether it is a leap month and the day (29 or 30).'); return; }
  msg.textContent = ''; S.user = u; S.selYear = 0; S.deepText = ''; S.matchText = ''; store.set('mw-user2', u);
  $('birthForm').hidden = true; shuffle(); renderAll(); location.hash = 'saju'; route(); scrollTo(0, 0); celebrate();
});

/* ===== 타로: 오늘의 운세 타로 (카드 세 장, 광고 보고 보기) ===== */
const T3_POS = T(['오늘의 총운', '애정·관계', '재물·일'], ['Today overall', 'Love · people', 'Money · work']);
function todaySpread() {
  const u = S.user, r = rng(hash32(todayStr() + '|t3|' + [u.cal, u.y, u.m, u.d, siOf(u), u.gender].join('-'))), ix = [];
  while (ix.length < 3) { const i = Math.floor(r() * 78); if (!ix.includes(i)) ix.push(i); }
  return ix.map((i, k) => ({ c: DECK[i], rev: r() < 0.3, pos: T3_POS[k] }));
}
function todayCard() { return todaySpread()[0]; }
function t3Open() { const s = store.get('mw-tarot3'); return s && s.d === todayStr() && s.k === profileKey(S.user) ? s.o : [false, false, false]; }
function t3ReadHTML() {
  const sp = todaySpread(), o = t3Open(), n = o.filter(Boolean).length;
  let h = sp.map((p, k) => o[k] ? readItem(p, p.pos) : '').join('');
  if (n < 3) return h + '<p class="kv">' + T('카드를 눌러 한 장씩 뒤집으세요.', 'Tap the cards to flip them one at a time.') + ' <b>' + n + ' / 3</b></p>';
  const tn = tone(sp.reduce((a, p) => a + link(p.c, p.rev).score, 0)), rv = sp.filter(p => p.rev).length;
  return h + '<div class="panel block sum"><p>' + T('오늘은 <b>' + tn[0] + '</b>입니다. ', 'Today is <b>' + tn[0] + '</b>. ') + tn[1] + (rv >= 2 ? T(' 역방향 카드가 많으니 서두르지 말고 한 번 더 확인하세요.', ' Several cards are reversed, so do not rush and check once more.') : '') + '</p></div>' +
    '<p class="note">' + T('카드는 자정에 바뀝니다.', 'The cards change at midnight.') + '</p><a class="goldbtn" href="#reading" style="display:block;text-align:center;text-decoration:none">' + T('사주와 겹쳐 읽기', 'Read with my saju') + '</a>';
}
function renderTarot() {
  const head = '<div class="block"><h2>' + T('오늘의 운세 타로', 'Today\'s fortune tarot') + TIER.ad + '</h2><h3>' + T('하루 세 장으로 오늘의 총운, 애정·관계, 재물·일을 봅니다', 'Three cards a day: today overall, love and people, money and work') + '</h3></div>';
  if (!Ads.unlocked('tarot')) { $('v-tarot').innerHTML = head + '<div class="block"><button type="button" class="fbanner" data-tarot-ad><span class="fb-t">' + T('오늘의 카드 세 장 뽑기', 'Draw today\'s three cards') + '</span><span class="fb-l">' + T('오늘의 총운 카드 · 애정·관계 카드 · 재물·일 카드 · 카드마다 내 사주에 필요한 기운과 겹친 풀이 · 오늘의 한 줄 결론', 'Today\'s overall card · love and people card · money and work card · each read against the energy your saju needs · today in one line') + '</span><span class="fb-c">' + TIER.ad + T(' 광고 한 번에 오늘 하루', ' One ad opens it for today') + '</span></button>' + (Ads.msg ? '<p class="note warn">' + Ads.msg + '</p>' : '') + '</div>'; return; }
  const sp = todaySpread(), o = t3Open();
  $('v-tarot').innerHTML = head + '<div class="block"><div class="spread">' + sp.map((p, k) => '<div><div class="pos">' + p.pos + '</div>' + cardHTML(p, o[k], o[k] ? 'tabindex="-1"' : 'data-t3="' + k + '"') + '</div>').join('') + '</div><div class="read" id="t3Read">' + t3ReadHTML() + '</div></div>';
}
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.hasAttribute('data-tarot-ad')) { t.disabled = true; Ads.watch('tarot').then(() => renderTarot()); return; }
  if (t.dataset.t3 !== undefined) {
    const o = t3Open(), k = +t.dataset.t3; if (o[k]) return;
    o[k] = true; store.set('mw-tarot3', { d: todayStr(), k: profileKey(S.user), o }); t.classList.add('open'); t.removeAttribute('data-t3'); fx.burst(t, o.every(Boolean) ? 80 : 36);
    setTimeout(() => { const r = $('t3Read'); if (r) r.innerHTML = t3ReadHTML(); }, 450);
  }
});
(function streak() {
  const t = todayStr(), s = store.get('mw-streak') || {}, y = new Date(Date.now() - 86400000), ys = y.getFullYear() + '-' + (y.getMonth() + 1) + '-' + y.getDate();
  S.streak = s.last === t ? s.n : s.last === ys ? s.n + 1 : 1; store.set('mw-streak', { last: t, n: S.streak });
  S.todayOpen = store.get('mw-today') === t;
})();

$('f-notime').addEventListener('change', e => { $('f-si').disabled = e.target.checked; if (EN) $('f-time').disabled = e.target.checked; });
document.addEventListener('change', e => { if (e.target.id === 'p-notime') { $('p-si').disabled = e.target.checked; if (EN) $('p-time').disabled = e.target.checked; } });

/* ===== 종합의견 ===== */
function summaryHTML() {
  const sj = S.saju, P = sj.P, ni = S.ni, yNow = new Date().getFullYear(), g = ni.grp;
  let best = sj.daeun[0], bs = -99; sj.daeun.forEach(d => { const s = evalLuck(d, false).score; if (s > bs) { bs = s; best = d; } });
  let top = null, low = null;
  for (let yr = yNow + 1; yr <= yNow + 10; yr++) { const t = luckScores(yearPillar(yr, P.day.s), true).total; if (!top || t > top[1]) top = [yr, t]; if (!low || t < low[1]) low = [yr, t]; }
  const cur = sj.daeun.filter(d => d.year <= yNow).pop(), sc = luckScores(yearPillar(yNow, P.day.s), true);
  const topG = g.indexOf(Math.max.apply(null, g)), zero = g.map((n, i) => n === 0 ? GROUP_PLAIN[i] : null).filter(Boolean);
  if (EN) {
    const flow = { up: 'favorable', mid: 'even', dn: 'cautious' }[cur ? evalLuck(cur, false).grade[0] : 'mid'];
    const e1 = 'You are ' + GYEOK_NICK[ni.gyeok.god].replace(/^The/, 'the') + ', ' + SEASON_ADJ[ni.season].toLowerCase() + ', with the energy of ' + DAY_TXT[P.day.s][0].toLowerCase() + '. ' + (sj.strong ? 'Your innate strength is ample, so pushing forward yourself suits you, and the surplus should be drawn off into work and results.' : 'Your innate strength is on the weak side, so working through people, credentials and preparation suits you better than holding out alone.') + ' What stands out most is the energy of ' + GROUP_PLAIN[topG] + (zero.length ? ', while the energy of ' + zero.join(', ') + ' does not show and needs conscious attention.' : ', and all five energies are present.');
    const e2 = (cur ? 'Now (age ' + cur.age + '–' + (cur.age + 9) + ') is ten years of ' + theme(cur.sGod, cur.age + 2) + ', and the flow is ' + flow + '. ' : 'Your first ten-year cycle has not begun yet. ') + 'This year\'s overall score is ' + sc.total + ' (' + scoreWord(sc.total) + '). The period of your life with the most support ' + (best.year + 9 < yNow ? 'was' : 'is') + ' age ' + best.age + '–' + (best.age + 9) + '. Within the next ten years, ' + top[0] + ' is the best and ' + low[0] + ' calls for the most care.';
    const e3 = 'In short, ' + (sc.total >= 70 ? 'this is a year when you can move.' : sc.total >= 50 ? 'this is a year for refining rather than starting anew.' : 'this is a year to put your strength into protecting what you have.') + ' Time big decisions for ' + top[0] + ', and finish preparing before ' + low[0] + ' arrives. Day to day, add the ' + EL[sj.need] + ' energy you need. ' + EL_TIP[sj.need][1];
    return '<div class="block" id="s-sum"><h3>Overall summary</h3><div class="panel block sum"><p>' + e1 + '</p><p>' + e2 + '</p><p><b>' + e3 + '</b></p></div></div>';
  }
  const p1 = SEASON_ADJ[ni.season] + ' ' + DAY_TXT[P.day.s][0] + '의 기운을 타고난 ' + GYEOK_NICK[ni.gyeok.god] + ' 유형입니다. ' +
    (sj.strong ? '타고난 힘이 넉넉해 스스로 밀고 나가는 편이 맞고, 넘치는 힘은 일과 결과물로 덜어 내야 합니다.' : '타고난 힘이 약한 편이라 혼자 버티기보다 사람, 자격, 준비로 풀어 가는 편이 맞습니다.') +
    ' 가장 두드러진 것은 ' + GROUP_PLAIN[topG] + '의 기운이고' + (zero.length ? ', ' + zero.join(', ') + '의 기운은 드러나 있지 않아 의식적으로 챙겨야 합니다.' : ', 다섯 가지 기운이 모두 갖춰져 있습니다.');
  const p2 = (cur ? '지금(' + cur.age + '~' + (cur.age + 9) + '세)은 ' + theme(cur.sGod, cur.age + 2) + '의 10년이고 흐름은 ' + ({ '순풍': '순조롭습니다', '평이': '무난합니다', '주의': '조심스럽습니다' })[evalLuck(cur, false).grade[1]] + '. ' : '아직 첫 10년 운이 시작되기 전입니다. ') +
    '올해 총운은 ' + sc.total + '점(' + scoreWord(sc.total) + ')입니다. 인생에서 가장 힘을 받는 때는 ' + best.age + '~' + (best.age + 9) + '세' + (best.year + 9 < yNow ? '였습니다.' : '입니다.') + ' 앞으로 10년 안에서는 ' + top[0] + '년이 가장 좋고 ' + low[0] + '년이 가장 조심스럽습니다.';
  const p3 = '정리하면, ' + (sc.total >= 70 ? '올해는 움직여도 좋은 해입니다.' : sc.total >= 50 ? '올해는 새로 벌이기보다 다듬는 해입니다.' : '올해는 지키는 데 힘을 써야 하는 해입니다.') + ' 큰 결정은 ' + top[0] + '년에 맞추고, ' + low[0] + '년이 오기 전에 대비를 끝내 두세요. 평소에는 나에게 필요한 ' + EL[sj.need] + ' 기운을 채우세요. ' + EL_TIP[sj.need][1];
  return '<div class="block" id="s-sum"><h3>종합의견</h3><div class="panel block sum"><p>' + p1 + '</p><p>' + p2 + '</p><p><b>' + p3 + '</b></p></div></div>';
}

/* ===== 연도 선택 ===== */
function pickYear(y) {
  const yNow = new Date().getFullYear(), sel = $('yearSel');
  if (y < S.yearRange[0] || y > S.yearRange[1]) return;
  if (!S.premium && y !== yNow) { sel.value = yNow; openPay(); return; }
  S.selYear = y; sel.value = y; $('yearBox').innerHTML = S.yearBox(y);
}
document.addEventListener('change', e => { if (e.target.id === 'yearSel') pickYear(+e.target.value); });
document.addEventListener('click', e => { const t = e.target.closest('[data-ystep]'); if (t) pickYear(+$('yearSel').value + (+t.dataset.ystep)); });

/* ===== 사용 방법 안내 ===== */
function openGuide() { const d = $('guideDlg'); if (d.open) return; if (d.showModal) d.showModal(); else d.setAttribute('open', ''); }
$('guideBtn').onclick = openGuide;
$('guideClose').onclick = () => { store.set('mw-guide', true); $('guideDlg').close(); };
$('guideStart').onclick = () => { store.set('mw-guide', true); $('guideDlg').close(); $('birthForm').hidden = false; scrollTo(0, 0); $('f-y').focus(); };
if (!store.get('mw-guide')) setTimeout(openGuide, 400);

/* ===== 전체 초기화 ===== */
$('resetBtn').onclick = () => { const d = $('resetDlg'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); };
$('resetCancel').onclick = () => $('resetDlg').close();
$('resetGo').onclick = () => {
  ['mw-user', 'mw-user2', 'mw-partner', 'mw-premium', 'mw-streak', 'mw-today', 'mw-tarot3', 'mw-guide'].forEach(k => { try { localStorage.removeItem(k); } catch (e) {} });
  Object.assign(S, { user: Object.assign({}, EXAMPLE), partner: Object.assign({}, PARTNER_EXAMPLE), selYear: 0, topic: 'all', rel: 'love', why: false, pEdit: false, deepText: '', matchText: '', todayOpen: false, streak: 1, plan: 1 });
  store.set('mw-streak', { last: todayStr(), n: 1 });
  $('resetDlg').close(); $('birthForm').hidden = true; $('f-msg').textContent = '';
  shuffle(); fillForm(); renderAll(); location.hash = 'saju'; route(); scrollTo(0, 0); celebrate(); setTimeout(openGuide, 600);
};
