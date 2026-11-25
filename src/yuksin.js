/* ===== 육신(십성) 분석: 일간을 기준으로 본 열 가지 기운과 육친 ===== */
const TEN_ALL = ['비견', '겁재', '식신', '상관', '편재', '정재', '편관', '정관', '편인', '정인'];
const TEN_KEY = EN ? EN_Y.TEN_KEY : { '비견': '자존·독립·동료', '겁재': '경쟁·승부·나눔', '식신': '재능·여유·먹을 복', '상관': '표현·비판·재주', '편재': '큰돈·사업·활동', '정재': '월급·저축·성실', '편관': '압박·권력·결단', '정관': '규칙·직장·명예', '편인': '직관·특수 분야·고독', '정인': '학문·문서·보살핌' };
const TEN_NATAL = EN ? EN_Y.TEN_NATAL : {
  '비견': '내 힘으로 서려는 마음이 강하고 남에게 기대지 않습니다. 동료, 형제와 대등하게 겨루며 큽니다.',
  '겁재': '승부욕과 추진력이 강합니다. 사람을 잘 모으지만 재물을 나누거나 빼앗기는 일이 따릅니다.',
  '식신': '꾸준히 만들고 즐기는 힘입니다. 한 가지 기술을 오래 닦아 먹고사는 바탕을 만듭니다.',
  '상관': '머리 회전이 빠르고 말과 재주가 뛰어납니다. 틀과 권위를 그대로 받아들이지 않습니다.',
  '편재': '돈과 사람을 크게 굴리는 감각입니다. 한곳에 묶이기보다 넓게 움직이며 기회를 잡습니다.',
  '정재': '성실하게 벌어 차곡차곡 모으는 힘입니다. 현실적이고 계산이 정확합니다.',
  '편관': '강한 책임과 압박을 견디는 힘입니다. 위기에 강하고 결단이 빠르지만 스스로를 몰아붙입니다.',
  '정관': '원칙과 책임을 지키는 힘입니다. 조직에서 신뢰받고 반듯하게 자리를 잡습니다.',
  '편인': '남다른 시각과 직감입니다. 한 분야를 깊이 파지만 생각이 많고 변덕이 따릅니다.',
  '정인': '배우고 받아들이는 힘입니다. 윗사람의 도움과 자격, 문서의 덕을 봅니다.'
};
const KIN = EN ? EN_Y.KIN : {
  M: { '비견': '형제·친구', '겁재': '형제자매·경쟁자', '식신': '손아랫사람·제자', '상관': '손아랫사람·후배', '편재': '아버지·애인', '정재': '아내', '편관': '아들', '정관': '딸', '편인': '어머니 외의 보호자', '정인': '어머니' },
  F: { '비견': '자매·친구', '겁재': '형제자매·경쟁자', '식신': '딸', '상관': '아들', '편재': '아버지', '정재': '시어머니', '편관': '애인', '정관': '남편', '편인': '어머니 외의 보호자', '정인': '어머니' }
};
const GROUP_SHORT = ['비겁', '식상', '재성', '관성', '인성'];
const GROUP_GLOSS = EN ? EN_Y.GROUP_GLOSS : { M: ['나·형제·경쟁자', '표현·재능·아랫사람', '돈·아버지·아내', '직장·명예·자녀', '공부·문서·어머니'], F: ['나·자매·경쟁자', '표현·재능·자녀', '돈·아버지', '직장·명예·남편', '공부·문서·어머니'] };
const POS_NOTE = EN ? EN_Y.POS_NOTE : { '년간': '조상과 어린 시절 자리', '년지': '조상과 어린 시절 자리', '월간': '부모와 사회생활 자리', '월지': '사주에서 힘이 가장 센 월지', '일지': '배우자 자리', '시간': '자녀와 노년 자리', '시지': '자녀와 노년 자리' };

function yuksin() {
  const sj = S.saju, P = sj.P, ds = P.day.s, t = {};
  TEN_ALL.forEach(g => { t[g] = { vis: 0, hid: 0, where: [] }; });
  sj.keys.forEach(k => {
    const p = P[k];
    if (k !== 'day') { t[p.sGod].vis++; t[p.sGod].where.push(PNAME2[k] + '간'); }
    t[p.bGod].vis++; t[p.bGod].where.push(PNAME2[k] + '지');
    HIDDEN[p.b].slice(0, -1).forEach(s => { t[tenGod(ds, s)].hid++; });
  });
  return t;
}
function yuksinActions(t) {
  const sj = S.saju, has = g => t[g].vis > 0, grp = i => t[TEN[i][0]].vis + t[TEN[i][1]].vis, out = [];
  if (grp(3) && grp(4)) out.push(['관인상생', '관성이 인성을 낳아 줍니다. 직장과 책임이 자격과 실력으로 이어져, 조직 안에서 단계를 밟아 올라가는 데 유리합니다.']);
  if (grp(1) && grp(2)) out.push(['식상생재', '식상이 재성을 낳아 줍니다. 내 재능과 결과물이 돈으로 바뀌는 통로가 열려 있습니다.']);
  if (grp(2) && grp(3)) out.push(['재생관', '재성이 관성을 낳아 줍니다. 번 돈과 실적이 직책과 명예로 이어지지만, 힘이 약하면 책임이 무겁게 느껴집니다.']);
  if (has('상관') && has('정관')) out.push(['상관견관', '상관이 정관을 칩니다. 윗사람, 규정과 부딪히기 쉬우니 직장에서는 말과 글을 한 번 걸러야 합니다.']);
  if (has('식신') && has('편관')) out.push(['식신제살', '식신이 편관을 다스립니다. 압박과 어려운 과제를 실력으로 눌러 이기는 구조입니다.']);
  if (has('편인') && has('식신')) out.push(['편인도식', '편인이 식신을 누릅니다. 생각이 많아 실행이 막히기 쉬우니 일단 손을 움직이는 습관이 필요합니다.']);
  if (has('편관') && has('정관')) out.push(['관살혼잡', '정관과 편관이 섞여 있습니다. 직장이나 이성 문제에서 갈림길이 잦으니 하나를 정해 밀고 가야 합니다.']);
  if (grp(0) >= 3 && grp(2)) out.push(['군겁쟁재', '비견·겁재가 많아 재성을 두고 다툽니다. 동업, 보증, 돈거래에서 손해를 보기 쉽습니다.']);
  if (!sj.strong && sj.amt[2] / sj.tot >= 0.28) out.push(['재다신약', '재성은 무거운데 일간이 약합니다. 돈과 일의 기회는 많지만 혼자 감당하기 벅차니 사람과 자격으로 힘을 보태야 합니다.']);
  if (grp(4) >= 3) out.push(['인성과다', '인성이 지나치게 많습니다. 준비와 생각이 길어져 실행이 늦어지고, 받는 데 익숙해지기 쉽습니다.']);
  if (sj.strong && !grp(1) && !grp(3)) out.push(['설기처 부족', '강한 기운을 덜어 줄 식상과 관성이 드러나 있지 않습니다. 힘을 쏟을 일과 목표를 스스로 만들어야 합니다.']);
  return EN ? out.map(a => EN_Y.ACTS[a[0]] || a) : out;
}
/* 무료: 육신 분포와 지장간 */
function yuksinHTML() {
  const sj = S.saju, P = sj.P, t = yuksin(), gl = GROUP_GLOSS[S.user.gender], pct = sj.amt.map(a => Math.round(a / sj.tot * 100)), max = Math.max.apply(null, pct);
  const bars = '<div class="bars yk">' + GROUP_SHORT.map((n, i) => '<div class="ykrow"><div class="bar c' + mod(sj.me + i, 5) + '"><span>' + G(n) + '</span><span class="trk"><i style="width:' + (pct[i] / max * 100) + '%"></i></span><b>' + pct[i] + '%</b></div><small>' + gl[i] + ' · ' + TEN[i].map(g => G(g) + ' ' + t[g].vis + (t[g].hid ? '(+' + t[g].hid + ')' : '')).join(', ') + '</small></div>').join('') + '</div>';
  const hid = '<div class="hidrow">' + [[T('시', 'Hour'), P.hour], [T('일', 'Day'), P.day], [T('월', 'Month'), P.month], [T('년', 'Year'), P.year]].map(([n, p]) => '<div><small>' + n + T('지 지장간', ' branch · hidden stems') + '</small>' + (p ? HIDDEN[p.b].map(s => '<span>' + elSpan(stemEl(s), STEMS_H[s]) + ' ' + G(tenGod(P.day.s, s)) + '</span>').join('') : '<span>' + T('모름', 'unknown') + '</span>') + '</div>').join('') + '</div>';
  const top = pct.indexOf(max), none = GROUP_SHORT.filter((n, i) => t[TEN[i][0]].vis + t[TEN[i][1]].vis === 0);
  return '<div class="block" id="s-yuk"><h3>' + T('육신(십성) 분석 · 일간 ' + P.day.stemH + '을 기준으로 본 열 가지 기운', 'The ten gods · ten energies seen from your Day Master ' + P.day.stemH) + '</h3><div class="panel block">' + bars + hid +
    '<p>' + T('가장 무거운 육신은 <b>' + GROUP_SHORT[top] + '</b>(' + gl[top] + ')으로 전체의 ' + pct[top] + '%입니다.' + (none.length ? ' 겉으로 드러나지 않은 육신은 <b>' + none.join(', ') + '</b>입니다.' : ' 다섯 육신이 모두 겉으로 드러나 있습니다.'), 'Your heaviest group is <b>' + G(GROUP_SHORT[top]) + '</b> (' + gl[top] + ') at ' + pct[top] + '% of the whole.' + (none.length ? ' Not showing on the surface: <b>' + none.map(G).join(', ') + '</b>.' : ' All five groups show on the surface.')) + '</p>' +
    '<p class="note">' + T('비율은 자리별 힘(월지 30, 일지·시지 15, 나머지 10)과 지장간을 반영한 값입니다. 개수 옆 괄호는 지장간에 숨은 수입니다.', 'Percentages reflect the weight of each seat (month branch 30, day and hour branches 15, the rest 10) and the hidden stems. The number in brackets is the count hidden inside the branches.') + '</p></div></div>';
}
/* 유료: 육신별 풀이와 육신끼리의 작용 */
function yuksinDetailHTML() {
  const t = yuksin(), kin = KIN[S.user.gender], gl = GROUP_GLOSS[S.user.gender];
  const items = TEN_ALL.filter(g => t[g].vis || t[g].hid).map(g => {
    const x = t[g];
    let s = TEN_NATAL[g] + T(' 육친으로는 ' + kin[g] + '에 해당합니다.', ' Among your relations it stands for ' + kin[g] + '.');
    if (x.vis >= 3) s += T(' 세 개 이상이라 이 기운이 삶 전체를 끌고 가며, 지나치면 단점이 먼저 드러납니다.', ' With three or more, this energy pulls your whole life along, and in excess its downside shows first.');
    if (x.where.includes('월지')) s += T(' 사주에서 힘이 가장 센 월지에 있어 직업과 사회생활의 성격을 정합니다.', ' It sits in the month branch, the strongest seat in the chart, so it sets the character of your work and social life.');
    if (x.where.includes('일지')) s += T(' 배우자 자리에 있어 배우자의 성향과 결혼 생활에 이 기운이 나타납니다.', ' It sits in the partner\'s seat, so it shows in your partner\'s nature and in married life.');
    const rest = x.where.filter(w => w !== '월지' && w !== '일지');
    if (rest.length) s += T(' ' + rest.map(w => w + '(' + POS_NOTE[w] + ')').join(', ') + '에 놓여 있습니다.', ' It is placed in the ' + rest.map(w => PW(w) + ' (' + POS_NOTE[w] + ')').join(', ') + '.');
    if (!x.vis) s += T(' 겉에는 없고 지장간에만 숨어 있어, 운에서 같은 글자가 들어올 때 비로소 드러납니다.', ' It is absent on the surface and only hidden inside the branches, so it shows itself when the same character arrives in a luck cycle.');
    return '<div class="it"><b>' + G(g) + ' · ' + TEN_KEY[g] + '</b><span class="tag">' + (x.vis ? T(x.vis + '개', '×' + x.vis) : T('지장간', 'hidden')) + '</span><p>' + s + '</p></div>';
  }).join('');
  const none = GROUP_SHORT.map((n, i) => t[TEN[i][0]].vis + t[TEN[i][1]].vis === 0 ? '<div class="it"><b>' + T(n + ' 없음', 'No ' + G(n)) + ' · ' + gl[i] + '</b><p>' + GROUP_TXT[i][1] + (t[TEN[i][0]].hid + t[TEN[i][1]].hid ? T(' 지장간에는 있어 완전히 없는 것은 아닙니다.', ' It exists among the hidden stems, so it is not entirely absent.') : T(' 지장간에도 없어, 이 육신이 들어오는 대운과 세운에 삶이 크게 달라집니다.', ' It is absent even among the hidden stems, so life changes a great deal in the luck cycles and years when it arrives.')) + '</p></div>' : '').join('');
  const acts = yuksinActions(t);
  return '<div class="block"><h3>' + T('육신별 풀이', 'Reading by ten god') + '</h3><div class="read">' + items + none + '</div></div>' +
    '<div class="block"><h3>' + T('육신끼리의 작용', 'How the ten gods act on each other') + '</h3>' + (acts.length ? '<div class="read">' + acts.map(a => '<div class="it"><b>' + a[0] + '</b><p>' + a[1] + '</p></div>').join('') + '</div>' : '<p class="note">' + T('서로 뚜렷하게 돕거나 치는 육신의 짝이 없습니다.', 'No pair of ten gods clearly helps or strikes the other.') + '</p>') + '</div>';
}
/* 운에서 들어오는 육신 한 줄 */
function luckYuksin(p) {
  const kin = KIN[S.user.gender];
  return '<p class="note"><span class="c2">' + T('들어오는 육신', 'Incoming ten gods') + '</span>: ' + T('천간 ' + p.sGod + '(' + TEN_KEY[p.sGod] + '), 지지 ' + p.bGod + '(' + TEN_KEY[p.bGod] + '). 육친으로는 ' + kin[p.sGod] + (kin[p.bGod] !== kin[p.sGod] ? ', ' + kin[p.bGod] : '') + '의 일이 두드러집니다.', 'stem ' + G(p.sGod) + ' (' + TEN_KEY[p.sGod] + '), branch ' + G(p.bGod) + ' (' + TEN_KEY[p.bGod] + '). Among your relations, matters of ' + kin[p.sGod] + (kin[p.bGod] !== kin[p.sGod] ? ' and ' + kin[p.bGod] : '') + ' stand out.') + '</p>';
}
