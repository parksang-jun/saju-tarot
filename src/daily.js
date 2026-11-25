/* ===== 오늘의 운세: 광고를 한 번 보면 그날 하루 열린다(날짜 이동 포함). 사주를 연 사람은 광고 없이 본다. =====
   열기 전에는 운세 내용을 전혀 보여 주지 않고, 무엇을 볼 수 있는지만 적힌 단추 하나를 둔다. */
const DAY_TIP_KID = EN ? {
  '비견': 'A day when they know what they want. Let them decide at least one thing themselves.', '겁재': 'A day when clashes with friends come easily. Help them keep track of their things.',
  '식신': 'A day for eating well and playing well. Hands-on crafts suit it.', '상관': 'A talkative, mischievous day. Let them burn the energy off physically.',
  '편재': 'A day when new things catch the eye. An outing is a good idea.', '정재': 'A good day for tidying up calmly and finishing things.',
  '편관': 'A day when tension and bumps come easily. Trim an overfull schedule.', '정관': 'A day that brings something to be praised for. Help them keep their promises.',
  '편인': 'A day when they want to be alone. Give them quiet time.', '정인': 'A day when learning sinks in. Good for reading and study.'
} : {
  '비견': '스스로 하고 싶은 것이 분명한 날입니다. 하나쯤은 직접 정하게 해 주세요.', '겁재': '친구와 부딪히기 쉬운 날입니다. 물건을 잃어버리지 않게 챙기세요.',
  '식신': '잘 먹고 잘 노는 날입니다. 손으로 만드는 놀이가 잘 맞습니다.', '상관': '말이 많아지고 장난이 심해지는 날입니다. 에너지를 몸으로 풀게 해 주세요.',
  '편재': '새로운 것에 눈이 가는 날입니다. 바깥 나들이가 좋습니다.', '정재': '차분히 정리하고 마무리하기 좋은 날입니다.',
  '편관': '긴장하거나 다치기 쉬운 날입니다. 무리한 일정은 줄이세요.', '정관': '칭찬받을 일이 생기는 날입니다. 약속을 지키게 도와주세요.',
  '편인': '혼자 있고 싶어 하는 날입니다. 조용한 시간을 주세요.', '정인': '배운 것이 잘 들어오는 날입니다. 책 읽기와 공부에 좋습니다.'
};
const WD = T(['일', '월', '화', '수', '목', '금', '토'], ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']), MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
function fortuneHTML() {
  const sj = S.saju, ds = sj.P.day.s, now = new Date(), open = Ads.unlocked('day');
  const adNote = Ads.msg ? '<p class="note warn">' + Ads.msg + '</p>' : '';
  if (!open) return '<div class="block" id="fortune"><button type="button" class="fbanner" data-ad="day"><span class="fb-t">' + T('오늘의 운세 보기', 'See today\'s fortune') + '</span><span class="fb-l">' + T('오늘의 점수 · 재물, 일, 애정 운 · 기회와 조심할 것 · 행운의 색과 숫자 · 어제와 내일의 운세', 'Today\'s score · money, work and love luck · opportunities and cautions · lucky color and number · yesterday and tomorrow') + '</span><span class="fb-c">' + TIER.ad + T(' 광고 한 번에 오늘 하루', ' One ad opens it for today') + '</span></button>' + adNote + '</div>';
  const bar = (n, v) => '<div class="sbar"><span>' + n + '</span><span class="trk"><i style="--w:' + v + '%"></i></span><b>' + v + '</b></div>';
  const off = S.fDay || 0, d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + off, 12);
  const age = d.getFullYear() - sj.by, kid = age < 20, p = dayPillarOf(d.getFullYear(), d.getMonth() + 1, d.getDate(), ds), sc = luckScores(p, false), ev = evalLuck(p, false, age);
  const lucky = S.ni.johu >= 0 && sj.count[S.ni.johu] <= sj.count[sj.need] ? S.ni.johu : sj.need;
  const rel = off === 0 ? T(' 오늘', ' · today') : off === 1 ? T(' 내일', ' · tomorrow') : off === -1 ? T(' 어제', ' · yesterday') : '';
  const label = T((d.getMonth() + 1) + '월 ' + d.getDate() + '일(' + WD[d.getDay()] + ')', WD[d.getDay()] + ', ' + MON[d.getMonth()] + ' ' + d.getDate()) + rel;
  return '<div class="block" id="fortune"><h2>' + T('오늘의 운세', 'Today\'s fortune') + '</h2>' + adNote +
    '<div class="yearpick"><button type="button" class="ghost" data-fday="-1" aria-label="' + T('이전 날', 'Previous day') + '">◀</button><b class="fnow">' + label + ' · ' + elSpan(p.sEl, p.stemH) + elSpan(p.bEl, p.branchH) + T('일', ' day') + '</b><button type="button" class="ghost" data-fday="1" aria-label="' + T('다음 날', 'Next day') + '">▶</button></div>' +
    '<div class="panel block"><div class="daily"><div class="dscore"><b' + (off === 0 ? ' data-count="' + sc.total + '"' : '') + '>' + sc.total + '</b><small>' + scoreWord(sc.total) + '</small></div><div><p><b>' + T(DAEUN[p.sGod][0] + '의 날.', 'A day of ' + DAEUN[p.sGod][0] + '.') + '</b> ' + (kid ? DAY_TIP_KID : DAY_TIP)[p.sGod] + '</p>' +
    (ev.good.length ? '<p class="note"><span class="c0">' + T('기회', 'Opportunity') + '</span>: ' + ev.good.join(' / ') + '</p>' : '') + (ev.cautions.length ? '<p class="note"><span class="c1">' + T('조심', 'Caution') + '</span>: ' + ev.cautions.join(' / ') + '</p>' : '') +
    '<p class="note">' + T('행운의 색과 방향: ', 'Lucky color and direction: ') + elSpan(lucky, EL_TIP[lucky][0]) + T(' · 숫자 ', ' · numbers ') + LUCKY_NUM[lucky] + '</p></div></div>' +
    '<div class="sbars">' + (kid ? bar(T('공부·성장', 'Study · growth'), sc.career) + bar(T('친구·관계', 'Friends'), sc.love) : bar(T('재물', 'Money'), sc.wealth) + bar(T('일·명예', 'Work · standing'), sc.career) + bar(T('애정', 'Love'), sc.love)) + '</div></div>' +
    (off !== 0 ? '<button type="button" class="ghost" data-fday="0" style="justify-self:start">' + T('오늘로 돌아가기', 'Back to today') + '</button>' : '') + (S.streak > 1 && off === 0 ? '<p class="note">' + T('연속 ' + S.streak + '일째 보고 있습니다.', 'Day ' + S.streak + ' in a row.') + '</p>' : '') + '</div>';
}
function drawFortune() { const el = $('fortune'); if (el) el.outerHTML = fortuneHTML(); }
document.addEventListener('click', e => {
  const t = e.target.closest('[data-fday],[data-ad]'); if (!t) return;
  if (t.dataset.ad) { t.disabled = true; return Ads.watch(t.dataset.ad).then(() => { drawFortune(); const v = $('fortune'); if (v && typeof countUp === 'function') countUp(v); }); }
  Ads.msg = '';
  if (!Ads.unlocked('day')) return;
  const s = +t.dataset.fday; S.fDay = s === 0 ? 0 : (S.fDay || 0) + s; drawFortune();
});
