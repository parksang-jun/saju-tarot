/* ===== 매일·매달 운세: 오늘의 운세(날짜 이동), 이달의 운세(달 이동, 날짜별 달력) =====
   오늘의 운세(날짜 이동 포함)는 광고를 한 번 보면 그날 하루 열린다. 이번 달 요약은 무료, 다른 달과 날짜별 달력은 유료다. */
const MONTH_TIP = {
  '비견': '내 일은 내가 정하는 달입니다. 미뤄 둔 결정을 내리기 좋지만 혼자 다 떠안지는 마세요.', '겁재': '사람 만날 일과 나갈 돈이 함께 늘어나는 달입니다. 지출 한도를 미리 정해 두세요.',
  '식신': '꾸준히 한 것이 결과로 쌓이는 달입니다. 새로 벌이기보다 하던 일을 끝까지 마무리하세요.', '상관': '새로운 생각과 하고 싶은 말이 많아지는 달입니다. 표현은 살리되 윗사람과의 마찰은 피하세요.',
  '편재': '움직인 만큼 기회가 생기는 달입니다. 사람을 만나고 발품을 파세요. 무리한 투자만 조심하면 됩니다.', '정재': '성실함이 그대로 수입과 신용으로 돌아오는 달입니다. 정리, 저축, 계약에 좋습니다.',
  '편관': '책임과 압박이 커지는 달입니다. 일정을 줄이고 건강과 안전을 먼저 챙기세요.', '정관': '자리와 평판이 걸린 일이 생기는 달입니다. 규칙과 약속을 지키면 인정받습니다.',
  '편인': '혼자 생각하고 배우기 좋은 달입니다. 결정은 서두르지 말고 자료를 더 모으세요.', '정인': '도움과 배움이 들어오는 달입니다. 윗사람의 조언을 듣고 자격이나 공부를 시작하기 좋습니다.'
};
const MONTH_TIP_KID = {
  '비견': '스스로 해 보려는 마음이 커지는 달입니다. 혼자 정하고 해내는 경험을 하게 두면 좋습니다.', '겁재': '친구와 어울리는 일이 많아지는 달입니다. 친구 따라 하다 생기는 문제만 살펴 주세요.',
  '식신': '좋아하는 것에 푹 빠지는 달입니다. 만들고 그리고 몸을 쓰는 활동이 잘 맞습니다.', '상관': '말과 호기심이 늘어나는 달입니다. 질문을 막지 말고, 말대꾸는 차분히 받아 주세요.',
  '편재': '새로운 곳과 새로운 놀이에 끌리는 달입니다. 바깥 활동과 체험이 도움이 됩니다.', '정재': '차근차근 해내는 힘이 붙는 달입니다. 용돈 관리나 정리 습관을 들이기 좋습니다.',
  '편관': '규칙과 숙제가 버겁게 느껴질 수 있는 달입니다. 일정을 줄이고 다치지 않게 살펴 주세요.', '정관': '칭찬과 인정을 받기 좋은 달입니다. 약속을 지키는 습관이 자랍니다.',
  '편인': '혼자 생각하고 몰두하는 시간이 늘어나는 달입니다. 조용히 읽고 만드는 시간을 주세요.', '정인': '배우는 것이 잘 들어오는 달입니다. 책과 공부, 어른의 보살핌이 힘이 됩니다.'
};
const DAY_TIP_KID = {
  '비견': '스스로 하고 싶은 것이 분명한 날입니다. 하나쯤은 직접 정하게 해 주세요.', '겁재': '친구와 부딪히기 쉬운 날입니다. 물건을 잃어버리지 않게 챙기세요.',
  '식신': '잘 먹고 잘 노는 날입니다. 손으로 만드는 놀이가 잘 맞습니다.', '상관': '말이 많아지고 장난이 심해지는 날입니다. 에너지를 몸으로 풀게 해 주세요.',
  '편재': '새로운 것에 눈이 가는 날입니다. 바깥 나들이가 좋습니다.', '정재': '차분히 정리하고 마무리하기 좋은 날입니다.',
  '편관': '긴장하거나 다치기 쉬운 날입니다. 무리한 일정은 줄이세요.', '정관': '칭찬받을 일이 생기는 날입니다. 약속을 지키게 도와주세요.',
  '편인': '혼자 있고 싶어 하는 날입니다. 조용한 시간을 주세요.', '정인': '배운 것이 잘 들어오는 날입니다. 책 읽기와 공부에 좋습니다.'
};
const WD = ['일', '월', '화', '수', '목', '금', '토'];
function monthPillarOn(y, m, ds) { const t = calcSaju({ cal: 'solar', y, m, d: 15, si: 6, gender: 'M' }); return pillar(t.P.month.s, t.P.month.b, ds); }
function fortuneHTML() {
  const sj = S.saju, ds = sj.P.day.s, now = new Date(), tab = S.fTab || 'day', open = !!S.premium, dayOpen = Ads.unlocked('day');
  const bar = (n, v) => '<div class="sbar"><span>' + n + '</span><span class="trk"><i style="--w:' + v + '%"></i></span><b>' + v + '</b></div>';
  const bars = (sc, kid) => '<div class="sbars">' + (kid ? bar('공부·성장', sc.career) + bar('친구·관계', sc.love) : bar('재물', sc.wealth) + bar('일·명예', sc.career) + bar('애정', sc.love)) + '</div>';
  const lists = ev => (ev.good.length ? '<p class="note"><span class="c0">기회</span>: ' + ev.good.join(' / ') + '</p>' : '') + (ev.cautions.length ? '<p class="note"><span class="c1">조심</span>: ' + ev.cautions.join(' / ') + '</p>' : '');
  const tabs = '<div class="chips"><button type="button" class="chip' + (tab === 'day' ? ' on' : '') + '" data-ftab="day">오늘의 운세' + (open ? '' : TIER.ad) + '</button><button type="button" class="chip' + (tab === 'month' ? ' on' : '') + '" data-ftab="month">이달의 운세' + TIER.free + '</button></div>';
  const gate = open ? '' : tab === 'day' ? '<p class="note">광고 한 번으로 오늘 하루 동안 날짜를 바꿔 가며 볼 수 있습니다. 사주를 연 분은 광고 없이 봅니다.</p>' : '<p class="note">이번 달 요약은 무료입니다. 다른 달과 날짜별 달력(좋은 날, 조심할 날)은 ' + TIER.paid + ' 사주를 열면 볼 수 있습니다.</p>';
  const adNote = Ads.msg ? '<p class="note warn">' + Ads.msg + '</p>' : '';
  let body;
  if (tab === 'day') {
    const off = dayOpen ? (S.fDay || 0) : 0, d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + off, 12);
    const age = d.getFullYear() - sj.by, kid = age < 20, p = dayPillarOf(d.getFullYear(), d.getMonth() + 1, d.getDate(), ds), sc = luckScores(p, false), ev = evalLuck(p, false, age);
    const lucky = S.ni.johu >= 0 && sj.count[S.ni.johu] <= sj.count[sj.need] ? S.ni.johu : sj.need;
    const label = (d.getMonth() + 1) + '월 ' + d.getDate() + '일(' + WD[d.getDay()] + ')' + (off === 0 ? ' 오늘' : off === 1 ? ' 내일' : off === -1 ? ' 어제' : '');
    if (!dayOpen) body = '<p class="fnow">' + label + ' · ' + elSpan(p.sEl, p.stemH) + elSpan(p.bEl, p.branchH) + '일</p><div class="panel block" style="text-align:center"><p><b>' + DAEUN[p.sGod][0] + '의 날.</b> 오늘의 점수, 기회와 조심할 것, 행운의 색과 숫자가 준비돼 있습니다.</p><button type="button" class="goldbtn pulse" data-ad="day">광고 보고 오늘의 운세 보기</button></div>' + adNote;
    else body = adNote + '<div class="yearpick"><button type="button" class="ghost" data-fday="-1" aria-label="이전 날">◀</button><b class="fnow">' + label + ' · ' + elSpan(p.sEl, p.stemH) + elSpan(p.bEl, p.branchH) + '일</b><button type="button" class="ghost" data-fday="1" aria-label="다음 날">▶</button></div>' +
      '<div class="panel block"><div class="daily"><div class="dscore"><b' + (off === 0 ? ' data-count="' + sc.total + '"' : '') + '>' + sc.total + '</b><small>' + scoreWord(sc.total) + '</small></div><div><p><b>' + DAEUN[p.sGod][0] + '의 날.</b> ' + (kid ? DAY_TIP_KID : DAY_TIP)[p.sGod] + '</p>' + lists(ev) +
      '<p class="note">행운의 색과 방향: ' + elSpan(lucky, EL_TIP[lucky][0]) + ' · 숫자 ' + LUCKY_NUM[lucky] + '</p></div></div>' + bars(sc, kid) + '</div>' +
      (off !== 0 ? '<button type="button" class="ghost" data-fday="0" style="justify-self:start">오늘로 돌아가기</button>' : '') + (S.streak > 1 && off === 0 ? '<p class="note">연속 ' + S.streak + '일째 보고 있습니다.</p>' : '');
  } else {
    const m0 = new Date(now.getFullYear(), now.getMonth() + (open ? (S.fMon || 0) : 0), 15, 12), y = m0.getFullYear(), m = m0.getMonth() + 1, off = open ? (S.fMon || 0) : 0;
    const age = y - sj.by, kid = age < 20, p = monthPillarOn(y, m, ds), sc = luckScores(p, false), ev = evalLuck(p, false, age);
    const days = new Date(y, m, 0).getDate(), first = new Date(y, m - 1, 1).getDay(), dayScore = [];
    for (let d = 1; d <= days; d++) dayScore.push(luckScores(dayPillarOf(y, m, d, ds), false).total);
    const rank = dayScore.map((v, i) => [i + 1, v]).sort((a, b) => b[1] - a[1]), best = rank.slice(0, 3).map(x => x[0]).sort((a, b) => a - b), worst = rank.slice(-3).map(x => x[0]).sort((a, b) => a - b);
    const isNow = y === now.getFullYear() && m === now.getMonth() + 1;
    const cal = '<div class="cal" role="grid" aria-label="' + m + '월 날짜별 운세">' + WD.map(w => '<span class="wd">' + w + '</span>').join('') + Array.from({ length: first }, () => '<span></span>').join('') +
      dayScore.map((v, i) => '<button type="button" data-fdate="' + y + '-' + m + '-' + (i + 1) + '" class="' + (v >= 70 ? 'up' : v < 50 ? 'dn' : '') + (isNow && i + 1 === now.getDate() ? ' now' : '') + '" aria-label="' + (i + 1) + '일 ' + v + '점"><b>' + (i + 1) + '</b><small>' + v + '</small></button>').join('') + '</div>';
    body = '<div class="yearpick"><button type="button" class="ghost" data-fmon="-1" aria-label="이전 달">◀</button><b class="fnow">' + y + '년 ' + m + '월' + (off === 0 ? ' 이번 달' : '') + ' · ' + elSpan(p.sEl, p.stemH) + elSpan(p.bEl, p.branchH) + '월</b><button type="button" class="ghost" data-fmon="1" aria-label="다음 달">▶</button></div>' +
      '<div class="panel block"><div class="daily"><div class="dscore"><b>' + sc.total + '</b><small>' + scoreWord(sc.total) + '</small></div><div><p><b>' + DAEUN[p.sGod][0] + '의 달.</b> ' + (kid ? MONTH_TIP_KID : MONTH_TIP)[p.sGod] + '</p>' + lists(ev) + '</div></div>' + bars(sc, kid) + '</div>' +
      (open ? '<div class="panel block"><p class="kv"><span class="c0">좋은 날</span> ' + best.map(d => d + '일').join(', ') + ' · <span class="c1">조심할 날</span> ' + worst.map(d => d + '일').join(', ') + TIER.paid + '</p>' + cal + '<p class="note">날짜를 누르면 그날의 운세로 갑니다. 초록은 70점 이상, 붉은색은 50점 미만입니다.</p></div>' : '') +
      (off !== 0 ? '<button type="button" class="ghost" data-fmon="0" style="justify-self:start">이번 달로 돌아가기</button>' : '') + '<p class="why">명리 근거: 달은 절기 기준이라 매달 4~8일쯤 바뀝니다. 월 초 며칠은 앞 달의 기운이 남아 있습니다.</p>';
  }
  return '<div class="block" id="fortune"><h2>매일·매달 운세</h2>' + tabs + body + gate + '</div>';
}
function drawFortune() { const el = $('fortune'); if (el) el.outerHTML = fortuneHTML(); }
document.addEventListener('click', e => {
  const t = e.target.closest('[data-ftab],[data-fday],[data-fmon],[data-fdate],[data-ad]'); if (!t) return;
  if (t.dataset.ftab) { Ads.msg = ''; S.fTab = t.dataset.ftab; return drawFortune(); }
  if (t.dataset.ad) { t.disabled = true; return Ads.watch(t.dataset.ad).then(() => { drawFortune(); const v = $('fortune'); if (v && typeof countUp === 'function') countUp(v); }); }
  Ads.msg = '';
  if (t.dataset.fday !== undefined) { if (!Ads.unlocked('day')) return; const s = +t.dataset.fday; S.fDay = s === 0 ? 0 : (S.fDay || 0) + s; return drawFortune(); }
  if (!S.premium) return openPay();
  if (t.dataset.fmon !== undefined) { const s = +t.dataset.fmon; S.fMon = s === 0 ? 0 : (S.fMon || 0) + s; }
  else { const [y, m, d] = t.dataset.fdate.split('-').map(Number), n = new Date(); S.fDay = Math.round((new Date(y, m - 1, d, 12) - new Date(n.getFullYear(), n.getMonth(), n.getDate(), 12)) / 86400000); S.fTab = 'day'; }
  drawFortune();
});
