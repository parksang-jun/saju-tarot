/* ===== 성격유형(MBTI)과 궁합 ===== */
const MBTI_TYPES = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
const MBTI_TXT = {
  INTJ: '혼자 큰 그림을 그리고 끝까지 밀고 가는 전략가형', INTP: '원리를 끝까지 파고드는 분석가형', ENTJ: '목표를 세우고 사람을 이끄는 지휘관형', ENTP: '새 아이디어로 판을 흔드는 발명가형',
  INFJ: '조용히 사람을 깊이 살피는 조언자형', INFP: '자기만의 가치와 이상을 지키는 이상가형', ENFJ: '사람을 북돋우며 앞에서 이끄는 선도자형', ENFP: '열정과 호기심이 넘치는 활동가형',
  ISTJ: '맡은 일을 원칙대로 해내는 관리자형', ISFJ: '묵묵히 챙기고 지키는 수호자형', ESTJ: '체계를 세우고 실행하는 경영자형', ESFJ: '사람을 살뜰히 돌보는 친화형',
  ISTP: '손으로 문제를 푸는 장인형', ISFP: '조용하고 감각이 좋은 예술가형', ESTP: '몸으로 부딪히는 승부사형', ESFP: '분위기를 살리는 연예인형'
};
const AXIS_GAP = {
  EI: '속에는 사람과 무대를 좋아하는 기운이 있는데, 지금은 혼자 충전하는 쪽으로 살고 있습니다.', IE: '바탕은 조용히 안으로 모으는 기질인데, 일과 환경이 사람 앞에 서는 습관을 길렀습니다.',
  NS: '타고난 것은 상상과 직감인데, 현실 감각을 훈련해 온 사람입니다.', SN: '바탕은 현실적이고 꼼꼼한데, 가능성과 아이디어를 보는 눈을 키워 왔습니다.',
  TF: '바탕은 따지고 가르는 기질인데, 사람 마음을 먼저 살피는 법을 익혔습니다.', FT: '바탕은 정이 많은데, 일에서는 논리로 판단하는 습관을 들였습니다.',
  JP: '바탕은 계획과 규칙인데, 지금은 유연하게 흘러가는 쪽을 택하고 있습니다.', PJ: '바탕은 자유로운 기질인데, 책임 때문에 계획적으로 사는 법을 익혔습니다.'
};
const mbtiOptions = '<option value="">모름</option>' + MBTI_TYPES.map(t => '<option>' + t + '</option>').join('');
const seasonOf = mb => [11, 0, 1].includes(mb) ? '겨울' : [5, 6, 7].includes(mb) ? '여름' : [2, 3, 4].includes(mb) ? '봄' : '가을';
function groupCount(sj) { const g = [0, 0, 0, 0, 0]; sj.keys.forEach(k => { if (k !== 'day') g[mod(sj.P[k].sEl - sj.me, 5)]++; g[mod(sj.P[k].bEl - sj.me, 5)]++; }); return g; }

/* 사주로 추정한 성향 축 (앱 자체 규칙, 재미로 보는 추정) */
function sajuMBTI(sj) {
  const c = sj.count, g = groupCount(sj), yang = sj.P.day.s % 2 === 0 ? 1 : 0;
  const ax = [
    ['E', 'I', c[1] * 2 + c[0] + g[1] * 1.5 + g[0] + yang, c[4] * 2 + c[3] + g[4] * 1.5 + g[3] * 0.5 + (1 - yang)],
    ['N', 'S', c[4] + c[0] + g[4] * 1.5 + g[1] * 0.5, c[2] * 2 + c[3] + g[2] * 1.5],
    ['T', 'F', c[3] * 2 + g[3] * 1.5 + c[2] * 0.5 + c[4] * 0.5, c[1] * 1.5 + c[0] * 1.5 + g[1] + g[4] * 0.5],
    ['J', 'P', g[3] * 1.5 + c[2] + c[3] + g[2] * 0.5, g[1] * 1.5 + c[4] + c[1] * 0.5 + g[0] * 0.5]
  ].map(a => { const p = Math.round((a[2] + 0.5) / (a[2] + a[3] + 1) * 100); return { a: a[0], b: a[1], p, pick: p >= 50 ? a[0] : a[1] }; });
  return { ax, type: ax.map(x => x.pick).join('') };
}
function mbtiHTML() {
  const est = sajuMBTI(S.saju), real = S.user.mbti;
  const bars = est.ax.map(x => '<div class="axis"><b class="' + (x.pick === x.a ? 'on' : '') + '">' + x.a + '</b><span class="trk"><i style="width:' + x.p + '%"></i></span><b class="' + (x.pick === x.b ? 'on' : '') + '">' + x.b + '</b><small>' + Math.max(x.p, 100 - x.p) + '%</small></div>').join('');
  let cmp;
  if (real) {
    const diff = est.ax.map((x, i) => real[i] === x.pick ? null : AXIS_GAP[x.pick + real[i]]).filter(Boolean), same = 4 - diff.length;
    cmp = '<p><b>실제 유형 ' + real + '</b> · ' + MBTI_TXT[real] + '. 사주로 본 바탕과 <b>4글자 중 ' + same + '글자</b>가 같습니다.</p>' + (diff.length ? '<div class="read">' + diff.map(t => '<div class="it"><p>' + t + '</p></div>').join('') + '</div><p class="note">사주는 타고난 바탕을, 성격유형 검사는 지금의 행동 습관을 보여 줍니다. 다른 글자는 살면서 만들어진 부분으로 볼 수 있습니다.</p>' : '<p class="note">타고난 바탕 그대로 살고 있는 편입니다.</p>');
  } else cmp = '<p class="note">내 정보에 실제 성격유형을 넣으면 타고난 바탕과 지금의 나를 비교해 줍니다.</p>';
  return '<div class="block"><h3>사주로 본 성격유형</h3><div class="panel block"><p class="kv" style="font-size:18px"><b class="mbti">' + est.type + '</b> 쪽 · ' + MBTI_TXT[est.type] + '</p><div class="axes">' + bars + '</div>' + cmp + '<p class="why">다섯 기운과 십성 개수로 추정한 이 앱의 자체 규칙입니다. 명리학에 성격유형 대응 규칙은 없습니다.</p></div></div>';
}
function mbtiMatch(a, b) {
  const same = i => a[i] === b[i];
  const score = 45 + (same(1) ? 22 : 6) + (same(3) ? 13 : 5) + (same(2) ? 8 : 12) + (same(0) ? 8 : 10);
  const pts = [
    same(1) ? '세상을 보는 방식(' + a[1] + ')이 같아 말이 잘 통합니다.' : '한 사람은 현실을, 한 사람은 가능성을 봅니다. 대화가 엇갈릴 때는 예시를 들어 말하세요.',
    same(3) ? '생활 방식(' + a[3] + ')이 같아 일정과 살림에서 덜 부딪힙니다.' : '계획형과 즉흥형이 만났습니다. 여행과 집안일은 역할을 나눠 두세요.',
    same(2) ? '판단 기준(' + a[2] + ')이 같아 결정이 빠릅니다.' : '논리와 감정이 서로를 채워 줍니다. 다툴 때는 사실과 기분을 따로 말하세요.',
    same(0) ? '에너지를 쓰는 방식이 같아 쉬는 방법이 비슷합니다.' : '한 사람은 밖에서, 한 사람은 혼자 충전합니다. 주말 계획에 각자의 시간을 넣으세요.'
  ];
  return { score: clamp(score, 20, 99), pts };
}

/* 궁합: 일간, 일지, 서로 채워 주는 기운, 월지, 띠 */
const josa = (w, a, b) => { const c = w.charCodeAt(w.length - 1); return w + (c >= 0xAC00 && c <= 0xD7A3 ? ((c - 0xAC00) % 28 ? a : b) : b); };
const WONJIN = ['0-7', '1-6', '2-9', '3-8', '4-11', '5-10'];
const sameTri = (a, b) => a !== b && a % 4 === b % 4;
function branchRel(a, b) {
  const key = Math.min(a, b) + '-' + Math.max(a, b);
  if (isClash(a, b)) return ['충', 42]; if (HAP[a] === b) return ['육합', 92]; if (sameTri(a, b)) return ['삼합', 86];
  if (WONJIN.includes(key)) return ['원진', 46]; if (a !== b && isHyeong(a, b)) return ['형', 52]; if (a === b) return ['같은 글자', [4, 6, 9, 11].includes(a) ? 62 : 72];
  return ['무난', 67];
}
function gunghap() {
  const A = S.saju, B = S.psaju, ua = S.user, ub = S.partner, lover = S.rel === 'love';
  const an = esc(ua.name || '나'), bn = esc(ub.name || '상대'), items = [];
  // 1. 일간
  const as = A.P.day.s, bs = B.P.day.s, ae = A.me, be = B.me, d = mod(be - ae, 5);
  let sc, tx, tag;
  if (STEM_HAP(as, bs)) { sc = 95; tag = '천간합'; tx = '두 사람의 중심 기운이 짝을 이룹니다. 처음부터 끌리고 정이 쉽게 붙는 배치입니다.'; }
  else if (d === 0) { sc = as === bs ? 66 : 70; tag = '같은 오행'; tx = '서로 닮은 꼴입니다. 친구처럼 편하고 말이 통하지만, 둘 다 물러서지 않아 고집이 부딪힙니다.'; }
  else if (d === 1 || d === 4) { sc = 83; tag = '상생'; const giver = d === 1 ? an : bn, taker = d === 1 ? bn : an; tx = giver + ' 쪽이 ' + taker + ' 쪽을 키워 주는 관계입니다. 주는 사람이 지치지 않게 받는 쪽이 표현을 자주 해야 합니다.'; }
  else {
    const ctrl = d === 2 ? ua : ub, clash = ['0-6', '1-7', '2-8', '3-9'].includes(Math.min(as, bs) + '-' + Math.max(as, bs));
    const lead = d === 2 ? an : bn, follow = d === 2 ? bn : an;
    if (lover && ctrl.gender === 'M' && ua.gender !== ub.gender) { sc = 74; tag = '부부성 배치'; tx = lead + ' 쪽이 이끌고 ' + follow + ' 쪽이 맞춰 주는 구도로, 전통적으로 부부 인연으로 보는 배치입니다. 이끄는 쪽이 일방적이지 않게 하세요.'; }
    else { sc = clash ? 46 : 58; tag = clash ? '천간충' : '상극'; tx = lead + ' 쪽이 ' + follow + ' 쪽을 누르는 구도입니다. 긴장이 매력이 되기도 하지만, 한쪽이 참는 관계가 되지 않게 말로 풀어야 합니다.'; }
  }
  items.push(['끌림과 기질', sc, tx, '일간 ' + STEMS_H[as] + ' · ' + STEMS_H[bs] + ' ' + tag, 25]);
  // 2. 일지
  const r2 = branchRel(A.P.day.b, B.P.day.b);
  const t2 = { '충': '생활 리듬과 습관이 정면으로 부딪힙니다. 같이 살면 잠, 돈 쓰는 법, 집안일에서 다투기 쉬우니 규칙을 미리 정하세요.', '육합': '생활 궁합이 아주 좋습니다. 같이 있으면 편하고 살림이 자연스럽게 맞춰집니다.', '삼합': '같은 방향을 보는 사이입니다. 함께 무언가를 도모할 때 힘이 납니다.', '원진': '이유 없이 서운하고 미운 마음이 들기 쉬운 배치입니다. 오해가 생기면 그날 풀어야 합니다.', '형': '서로 고치려 들어 삐걱거립니다. 상대의 방식을 그대로 두는 연습이 필요합니다.', '같은 글자': '생활 방식이 닮았습니다. 편한 대신 단점도 같아 서로 거울이 됩니다.', '무난': '크게 끌어당기지도 부딪히지도 않습니다. 함께하는 습관을 만들면 정이 쌓입니다.' }[r2[0]];
  items.push([lover ? '함께 사는 궁합' : '함께 지내는 궁합', r2[1], t2, '일지 ' + A.P.day.branchH + ' · ' + B.P.day.branchH + ' ' + r2[0], 25]);
  // 3. 서로 채워 주는 기운
  const give = (to, from) => clamp(46 + 11 * from.count[to.need] + (from.me === to.need ? 16 : 0), 30, 98);
  const ga = give(A, B), gb = give(B, A);
  items.push(['서로 채워 주는 힘', Math.round((ga + gb) / 2), bn + '의 사주에는 ' + an + '에게 필요한 ' + EL[A.need] + ' 기운이 ' + B.count[A.need] + '개, ' + an + '의 사주에는 ' + bn + '에게 필요한 ' + EL[B.need] + ' 기운이 ' + A.count[B.need] + '개 있습니다. ' + (ga >= 75 && gb >= 75 ? '서로에게 힘이 되는 사이입니다.' : ga >= 75 ? an + ' 쪽이 더 많이 받는 관계입니다.' : gb >= 75 ? bn + ' 쪽이 더 많이 받는 관계입니다.' : '서로의 부족함을 사주가 직접 채워 주지는 않아, 함께하는 활동으로 보완해야 합니다.'), '용신 ' + EL[A.need] + ' · ' + EL[B.need], 25]);
  // 4. 월지
  const r4 = branchRel(A.P.month.b, B.P.month.b);
  items.push([lover ? '집안과 사회생활' : '일하는 방식', r4[1], r4[1] >= 80 ? '자라 온 환경과 일하는 방식이 잘 맞습니다. 양쪽 집안이나 직장 문제로 부딪힐 일이 적습니다.' : r4[1] <= 52 ? '자라 온 환경과 일하는 방식이 다릅니다. 집안 행사, 직장 문제는 각자의 방식을 인정하고 선을 정하세요.' : '환경의 차이가 크지 않습니다. 평범하게 맞춰 갈 수 있습니다.', '월지 ' + A.P.month.branchH + ' · ' + B.P.month.branchH + ' ' + r4[0], 15]);
  // 5. 띠
  const r5 = branchRel(A.P.year.b, B.P.year.b);
  items.push(['띠 궁합', r5[1], A.animal + '띠와 ' + B.animal + '띠는 ' + (r5[1] >= 80 ? '예부터 잘 맞는다고 보는 짝입니다.' : r5[1] <= 52 ? '예부터 부딪힌다고 보는 짝입니다. 띠는 궁합에서 비중이 가장 작으니 참고만 하세요.' : '무난한 사이입니다.'), '년지 ' + A.P.year.branchH + ' · ' + B.P.year.branchH + ' ' + r5[0], 10]);
  const saju = Math.round(items.reduce((s, it) => s + it[1] * it[4], 0) / 100);
  const mb = null;
  const total = mb ? Math.round(saju * 0.7 + mb.score * 0.3) : saju;
  return { items, saju, mb, total, an, bn };
}
const matchWord = n => n >= 85 ? '천생연분' : n >= 72 ? '잘 맞는 사이' : n >= 58 ? '맞춰 가면 좋은 사이' : '다름을 인정해야 하는 사이';
function partnerSheet() {
  const B = S.psaju, f = p => p ? p.stemH + p.branchH : '모름', g = gunghap();
  return '상대(' + (S.partner.gender === 'M' ? '남' : '여') + ', ' + B.by + '년생): 년 ' + f(B.P.year) + ' 월 ' + f(B.P.month) + ' 일 ' + f(B.P.day) + ' 시 ' + f(B.P.hour) + ', ' + (B.strong ? '신강' : '신약') + ', 용신 ' + EL[B.need] + ', 오행 ' + B.count.join('/') +
    '\n관계: ' + (S.rel === 'love' ? '연인·부부' : '친구·동료') + '\n궁합 항목: ' + g.items.map(i => i[0] + ' ' + i[1] + '점 (' + i[3] + ')').join(' | ') + (g.mb ? ' | 성격유형 궁합 ' + g.mb.score + '점' : '') + '\n종합 ' + g.total + '점';
}
function renderMatch() {
  const ub = S.partner;
  Access.refresh(); S.psaju = calcSaju(ub);
  const A = S.saju, B = S.psaju, g = gunghap(), why = t => '<p class="why">명리 근거: ' + t + '</p>';
  const who = (sj, name, mb) => '<div class="duo"><small>' + SEASON_ADJ[seasonOf(sj.P.month.b)] + '</small><b class="c' + sj.P.day.sEl + '">' + DAY_TXT[sj.P.day.s][0] + '</b><span>' + name + (mb ? ' · ' + mb : '') + '</span><span class="han4">' + sj.keys.slice().reverse().map(k => elSpan(sj.P[k].sEl, sj.P[k].stemH) + elSpan(sj.P[k].bEl, sj.P[k].branchH)).join(' ') + '</span></div>';
  const hero = '<div class="hero match"><div class="pair">' + who(A, g.an) + '<div class="ring" id="mring" style="--p:' + g.total + '"><div><b data-count="' + g.total + '">' + g.total + '</b><small>' + matchWord(g.total) + '</small></div></div>' + who(B, g.bn) + '</div>' +
    '<div class="sbars">' + g.items.map((i, k) => '<div class="sbar"><span>' + ['끌림', '생활', '채워 주는 힘', '집안·사회', '띠'][k] + '</span><span class="trk"><i style="--w:' + i[1] + '%"></i></span><b data-count="' + i[1] + '">' + i[1] + '</b></div>').join('') + (g.mb ? '<div class="sbar"><span>성격유형</span><span class="trk"><i style="--w:' + g.mb.score + '%"></i></span><b data-count="' + g.mb.score + '">' + g.mb.score + '</b></div>' : '') + '</div></div>';
  const good = g.items.filter(i => i[1] >= 80), bad = g.items.filter(i => i[1] <= 55);
  const sum = '<div class="panel"><p>' + (good.length ? '<b class="c0">잘 맞는 점</b>은 ' + good.map(i => i[0]).join(', ') + '입니다. ' : '') + (bad.length ? '<b class="c1">부딪히는 점</b>은 ' + bad.map(i => i[0]).join(', ') + '입니다. ' : '크게 부딪히는 자리가 없습니다. ') + '</p><p class="note" style="margin-top:6px">점수가 낮은 항목은 헤어지라는 뜻이 아니라 미리 알고 맞춰 갈 지점입니다.' + (g.mb ? ' 종합 점수는 사주 궁합 70%와 성격유형 궁합 30%를 합친 값입니다.' : '') + '</p></div>';
  const detail = '<div class="block"><h3>항목별 풀이</h3><div class="read">' + g.items.map(i => '<div class="it"><b>' + i[0] + ' · ' + i[1] + '점</b><p>' + i[2] + '</p>' + why(i[3] + ' · 비중 ' + i[4] + '%') + '</div>').join('') + '</div></div>' +
    (g.mb ? '<div class="block"><h3>성격유형 궁합 · ' + S.user.mbti + ' × ' + ub.mbti + ' · ' + g.mb.score + '점</h3><div class="read">' + g.mb.pts.map(t => '<div class="it"><p>' + t + '</p></div>').join('') + '</div><p class="why">성격유형 궁합 점수는 이 앱의 자체 규칙이며 검증된 이론이 아닙니다.</p></div>' : '') +
    '<div class="block needs-ai"' + (S.ai ? '' : ' hidden') + '><h3>AI 궁합 풀이</h3><div class="panel block"><p class="note">두 사람의 사주를 함께 읽고, 잘 지내는 법을 쉬운 말로 풀어 줍니다.</p><button type="button" class="primary" id="matchGo">AI 궁합 풀이 받기</button><div class="ai-out" id="matchOut" aria-live="polite">' + esc(S.matchText || '') + '</div></div></div>';
  const hi = g.items.slice().sort((a, b) => b[1] - a[1])[0], lo = g.items.slice().sort((a, b) => a[1] - b[1])[0], loIdx = g.items.indexOf(lo);
  const tip = ['서로를 바꾸려 들지 말고 잘하는 일로 역할을 나누세요.', '돈, 집안일, 잠처럼 같이 지내는 규칙을 미리 정해 두세요.', '함께하는 취미나 운동으로 서로에게 없는 기운을 채우세요.', '집안 일과 직장 문제는 각자의 방식을 인정하고 선을 정하세요.', '띠는 비중이 가장 작으니 마음에 두지 않아도 됩니다.'][loIdx];
  const opinion = '<div class="block"><h3>종합의견</h3><div class="panel block sum"><p>' + josa(g.an, '과', '와') + ' ' + josa(g.bn, '은', '는') + ' 종합 ' + g.total + '점으로 <b>' + matchWord(g.total) + '</b>입니다. 가장 큰 강점은 ' + hi[0] + '(' + hi[1] + '점)이고, 가장 신경 쓸 곳은 ' + lo[0] + '(' + lo[1] + '점)입니다.</p><p><b>정리하면, ' + (g.total >= 72 ? '기본 바탕이 좋은 사이입니다. 좋은 점을 당연하게 여기지 않는 것이 오래가는 길입니다.' : g.total >= 58 ? '맞는 곳과 다른 곳이 섞인 사이입니다. 다른 곳을 미리 알고 맞춰 가면 충분히 좋아집니다.' : '타고난 결이 많이 다른 사이입니다. 상대를 고치려 하기보다 다름을 규칙으로 정리해야 편해집니다.') + ' ' + tip + '</b></p></div></div>';
  const form = '<form class="birth" id="partnerForm"' + (S.pEdit ? '' : ' hidden') + '><div class="row"><label>상대 이름(선택)<input id="p-name" maxlength="12" autocomplete="off" value="' + (ub.example ? '' : esc(ub.name || '')) + '"></label><label>성별<select id="p-gender"><option value="M"' + (ub.gender === 'M' ? ' selected' : '') + '>남</option><option value="F"' + (ub.gender === 'F' ? ' selected' : '') + '>여</option></select></label></div>' +
    '<div class="row4"><label>달력<select id="p-cal">' + [['solar', '양력'], ['lunar', '음력'], ['leap', '음력 윤달']].map(c => '<option value="' + c[0] + '"' + (ub.cal === c[0] ? ' selected' : '') + '>' + c[1] + '</option>').join('') + '</select></label><label>년<input id="p-y" type="number" inputmode="numeric" min="1900" max="2100" required value="' + ub.y + '"></label><label>월<input id="p-m" type="number" inputmode="numeric" min="1" max="12" required value="' + ub.m + '"></label><label>일<input id="p-d" type="number" inputmode="numeric" min="1" max="31" required value="' + ub.d + '"></label></div>' +
    '<div class="row"><label>태어난 시<select id="p-si"' + (siOf(ub) < 0 ? ' disabled' : '') + '>' + siOptions(siOf(ub) < 0 ? 5 : siOf(ub)) + '</select></label><label class="chk" style="align-self:end;padding-bottom:10px"><input id="p-notime" type="checkbox"' + (siOf(ub) < 0 ? ' checked' : '') + '> 시를 모릅니다</label></div>' +
    '<p class="hint">시를 모르면 체크하세요. 생년월일만으로도 궁합을 봅니다.</p><p class="note warn" id="p-msg" role="alert"></p><button class="primary" type="submit">궁합 보기</button></form>';
  const detailAll = detail + opinion;
  const chips = '<div class="chips"><button type="button" class="chip' + (S.rel === 'love' ? ' on' : '') + '" data-rel="love">연인·부부</button><button type="button" class="chip' + (S.rel === 'friend' ? ' on' : '') + '" data-rel="friend">친구·동료</button><button type="button" class="chip" data-pedit>' + (ub.example ? '상대 정보 입력' : '상대 정보 수정') + '</button></div>';
  $('v-match').classList.toggle('show-why', !!S.why);
  $('v-match').innerHTML = '<div class="block"><h2>궁합</h2><h3>' + g.an + ' × ' + g.bn + (ub.example ? '<span class="badge">상대는 예시 데이터</span>' : '') + '</h3>' + chips + form + '</div>' + hero + (B.info.err ? '<p class="note warn">' + B.info.err + '</p>' : '') + '<div class="block"><h3>한눈에 보기</h3>' + sum + '</div>' + lockWrap(detailAll, '이 궁합의 항목별 풀이와 종합의견이 한 번 결제로 열립니다', 'match');
}
let matchBusy = false;
async function askMatch() {
  const out = $('matchOut'), btn = $('matchGo');
  if (!S.ai || matchBusy) return;
  matchBusy = true; btn.disabled = true; out.textContent = '두 사람의 사주를 읽는 중입니다.';
  const prompt = '당신은 30년 경력의 명리 상담가입니다. 아래 두 사람의 자료만을 근거로 한국어 궁합 풀이를 쓰세요. 자료에 없는 간지를 지어내지 마세요.\n\n말투: 명리를 모르는 사람이 읽습니다. 쉬운 말로 쓰고 전문 용어는 괄호 안 근거로만 짧게 적습니다.\n형식: 소제목 【두 사람의 첫인상】【잘 맞는 점】【부딪히는 점】【다툴 때 푸는 법】【함께하면 좋은 것】【종합의견】을 쓰고 각 3~5문장. 마지막 【종합의견】은 전체를 정리하고 두 사람이 지금 가장 먼저 할 일 하나로 끝냅니다. 목록 기호 없이 문단으로.\n규칙: 헤어지라거나 반드시 결혼하라는 식의 단정은 하지 않습니다. 점수가 낮은 항목은 맞춰 가는 방법으로 풀어 줍니다.\n\n[나]\n' + factSheet().split('\n').slice(0, 9).join('\n') + '\n\n[상대와 궁합]\n' + partnerSheet();
  try { const r = await S.ai(prompt, { onText: ({ text }) => { out.textContent = text; } }); S.matchText = r.text; out.textContent = r.text; }
  catch (err) { out.textContent = err && err.code === 'rate_limited' ? '요청이 많습니다. 잠시 뒤에 다시 눌러 주세요.' : 'AI 풀이를 불러오지 못했습니다. 위의 항목별 풀이는 그대로 볼 수 있습니다.'; }
  matchBusy = false; const b = $('matchGo'); if (b) b.disabled = false;
}
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.id === 'matchGo') askMatch();
  if (t.dataset.rel) { S.rel = t.dataset.rel; S.matchText = ''; renderMatch(); }
  if (t.hasAttribute('data-pedit')) { S.pEdit = !S.pEdit; renderMatch(); }
});
document.addEventListener('submit', e => {
  if (e.target.id !== 'partnerForm') return;
  e.preventDefault();
  const y = +$('p-y').value, m = +$('p-m').value, d = +$('p-d').value, msg = $('p-msg'), cal = $('p-cal').value, no = $('p-notime').checked;
  if (!(y >= 1900 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31)) { msg.textContent = '생년월일을 다시 확인하세요.'; return; }
  if (cal !== 'solar' && !lunarToSolar(y, m, d, cal === 'leap')) { msg.textContent = '해당 음력 날짜를 찾지 못했습니다. 윤달 여부를 확인하세요.'; return; }
  S.partner = { name: $('p-name').value.trim(), gender: $('p-gender').value, cal, y, m, d, si: no ? -1 : +$('p-si').value };
  store.set('mw-partner', S.partner);
  S.pEdit = false; S.matchText = ''; renderMatch();
  const v = $('v-match'); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter'); countUp(v);
  if (gunghap().total >= 72) setTimeout(() => fx.burst($('mring'), 70), 1100);
});
const PARTNER_EXAMPLE = { name: '예시 상대', gender: 'M', cal: 'solar', y: 1988, m: 8, d: 23, si: 7, example: true };
S.partner = store.get('mw-partner') || Object.assign({}, PARTNER_EXAMPLE);
S.rel = 'love';
