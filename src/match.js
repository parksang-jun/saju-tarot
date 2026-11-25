/* ===== 성격유형(MBTI)과 궁합 ===== */
const MBTI_TYPES = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
const MBTI_TXT = EN ? EN_M.MBTI_TXT : {
  INTJ: '혼자 큰 그림을 그리고 끝까지 밀고 가는 전략가형', INTP: '원리를 끝까지 파고드는 분석가형', ENTJ: '목표를 세우고 사람을 이끄는 지휘관형', ENTP: '새 아이디어로 판을 흔드는 발명가형',
  INFJ: '조용히 사람을 깊이 살피는 조언자형', INFP: '자기만의 가치와 이상을 지키는 이상가형', ENFJ: '사람을 북돋우며 앞에서 이끄는 선도자형', ENFP: '열정과 호기심이 넘치는 활동가형',
  ISTJ: '맡은 일을 원칙대로 해내는 관리자형', ISFJ: '묵묵히 챙기고 지키는 수호자형', ESTJ: '체계를 세우고 실행하는 경영자형', ESFJ: '사람을 살뜰히 돌보는 친화형',
  ISTP: '손으로 문제를 푸는 장인형', ISFP: '조용하고 감각이 좋은 예술가형', ESTP: '몸으로 부딪히는 승부사형', ESFP: '분위기를 살리는 연예인형'
};
const AXIS_GAP = EN ? EN_M.AXIS_GAP : {
  EI: '속에는 사람과 무대를 좋아하는 기운이 있는데, 지금은 혼자 충전하는 쪽으로 살고 있습니다.', IE: '바탕은 조용히 안으로 모으는 기질인데, 일과 환경이 사람 앞에 서는 습관을 길렀습니다.',
  NS: '타고난 것은 상상과 직감인데, 현실 감각을 훈련해 온 사람입니다.', SN: '바탕은 현실적이고 꼼꼼한데, 가능성과 아이디어를 보는 눈을 키워 왔습니다.',
  TF: '바탕은 따지고 가르는 기질인데, 사람 마음을 먼저 살피는 법을 익혔습니다.', FT: '바탕은 정이 많은데, 일에서는 논리로 판단하는 습관을 들였습니다.',
  JP: '바탕은 계획과 규칙인데, 지금은 유연하게 흘러가는 쪽을 택하고 있습니다.', PJ: '바탕은 자유로운 기질인데, 책임 때문에 계획적으로 사는 법을 익혔습니다.'
};
const mbtiOptions = '<option value="">' + T('모름', 'Not sure') + '</option>' + MBTI_TYPES.map(t => '<option>' + t + '</option>').join('');
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
    cmp = '<p>' + T('<b>실제 유형 ' + real + '</b> · ' + MBTI_TXT[real] + '. 사주로 본 바탕과 <b>4글자 중 ' + same + '글자</b>가 같습니다.', '<b>Your actual type ' + real + '</b> · ' + MBTI_TXT[real] + '. <b>' + same + ' of 4 letters</b> match the base read from your saju.') + '</p>' + (diff.length ? '<div class="read">' + diff.map(t => '<div class="it"><p>' + t + '</p></div>').join('') + '</div><p class="note">' + T('사주는 타고난 바탕을, 성격유형 검사는 지금의 행동 습관을 보여 줍니다. 다른 글자는 살면서 만들어진 부분으로 볼 수 있습니다.', 'Saju shows your innate base; a personality test shows your present habits. The letters that differ can be read as what life has shaped.') + '</p>' : '<p class="note">' + T('타고난 바탕 그대로 살고 있는 편입니다.', 'You are living much as your innate base would suggest.') + '</p>');
  } else cmp = '<p class="note">' + T('내 정보에 실제 성격유형을 넣으면 타고난 바탕과 지금의 나를 비교해 줍니다.', 'Add your actual personality type to your details to compare your innate base with who you are now.') + '</p>';
  return '<div class="block"><h3>' + T('사주로 본 성격유형', 'Personality type read from your saju') + '</h3><div class="panel block"><p class="kv" style="font-size:18px"><b class="mbti">' + est.type + '</b>' + T(' 쪽 · ', ' · ') + MBTI_TXT[est.type] + '</p><div class="axes">' + bars + '</div>' + cmp + '<p class="why">' + T('다섯 기운과 십성 개수로 추정한 이 앱의 자체 규칙입니다. 명리학에 성격유형 대응 규칙은 없습니다.', 'This is the app\'s own rule, estimated from the five elements and the ten-gods counts. Saju has no rule that maps to personality types.') + '</p></div></div>';
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
  if (EN) return gunghapEN();
  const A = S.saju, B = S.psaju, ua = S.user, ub = S.partner, lover = S.rel === 'love';
  const an = esc(ua.name || '나'), bn = esc(ub.name || '상대'), items = [];
  /* 항목: [제목, 점수, 풀이, 명리 근거, 비중, 짧은 이름, 묶음(out 겉궁합 / in 속궁합 / life 살림)] */
  const add = (grp, short, title, sc, tx, why, w) => items.push([title, clamp(sc, 30, 98), tx, why, w, short, grp]);
  const as = A.P.day.s, bs = B.P.day.s, ae = A.me, be = B.me, d = mod(be - ae, 5), ga5 = groupCount(A), gb5 = groupCount(B);

  /* ===== 겉궁합: 남들 눈에 보이는 궁합 ===== */
  const r5 = branchRel(A.P.year.b, B.P.year.b);
  add('out', '띠', '띠 궁합', r5[1], A.animal + '띠와 ' + B.animal + '띠는 ' + (r5[1] >= 80 ? '예부터 잘 맞는다고 보는 짝입니다. 처음 만났을 때부터 편하게 어울립니다.' : r5[1] <= 52 ? '예부터 부딪힌다고 보는 짝입니다. 띠는 궁합에서 비중이 가장 작으니 참고만 하세요.' : '무난한 사이입니다.'), '년지 ' + A.P.year.branchH + ' · ' + B.P.year.branchH + ' ' + r5[0], 8);
  const r4 = branchRel(A.P.month.b, B.P.month.b);
  add('out', lover ? '집안·사회' : '일하는 방식', lover ? '집안과 사회생활' : '일하는 방식', r4[1], r4[1] >= 80 ? '자라 온 환경과 일하는 방식이 잘 맞습니다. 양쪽 집안이나 직장 문제로 부딪힐 일이 적습니다.' : r4[1] <= 52 ? '자라 온 환경과 일하는 방식이 다릅니다. 집안 행사, 직장 문제는 각자의 방식을 인정하고 선을 정하세요.' : '환경의 차이가 크지 않습니다. 평범하게 맞춰 갈 수 있습니다.', '월지 ' + A.P.month.branchH + ' · ' + B.P.month.branchH + ' ' + r4[0], lover ? 10 : 14);
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
  add('out', '성격', lover ? '성격과 끌림' : '성격과 기질', sc, tx, '일간 ' + STEMS_H[as] + ' · ' + STEMS_H[bs] + ' ' + tag, lover ? 17 : 20);

  /* ===== 속궁합: 둘만 아는 궁합 ===== */
  const r2 = branchRel(A.P.day.b, B.P.day.b);
  if (lover) {
    const yy = as % 2 !== bs % 2;
    const warm = sj => 2 * sj.count[1] + sj.count[0] - 2 * sj.count[4] - sj.count[3] + ({ '여름': 3, '봄': 1, '가을': -1, '겨울': -3 })[seasonOf(sj.P.month.b)];
    const wa = warm(A), wb = warm(B), comp = wa * wb < 0 && Math.abs(wa - wb) >= 4, same = wa * wb > 0 && Math.min(Math.abs(wa), Math.abs(wb)) >= 4;
    const tword = w => w >= 4 ? '뜨거움' : w >= 1 ? '따뜻함' : w <= -4 ? '차가움' : w <= -1 ? '서늘함' : '중간';
    const b1 = { '육합': '배우자 자리끼리 합을 이뤄 몸과 마음이 자연스럽게 가까워집니다. 스킨십과 애정 표현의 박자가 잘 맞습니다.', '삼합': '배우자 자리가 같은 편이라 함께 있을 때 편안하고 갈수록 정이 깊어집니다.', '충': '배우자 자리끼리 부딪혀 끌림은 강하지만 박자가 어긋나기 쉽습니다. 원하는 것을 말로 맞춰야 합니다.', '원진': '가까워질수록 사소한 서운함이 쌓이기 쉬운 배치입니다. 애정 표현을 미루지 않는 것이 약입니다.', '형': '서로의 방식을 고치려 들어 애정 표현에서 삐걱거릴 수 있습니다. 상대가 편해하는 방식을 먼저 물어보세요.', '같은 글자': '애정을 주고받는 방식이 닮았습니다. 편안하지만 새로움은 일부러 만들어야 합니다.', '무난': '강하게 당기지도 밀어내지도 않습니다. 함께 보내는 시간이 쌓일수록 정이 깊어지는 사이입니다.' }[r2[0]];
    const b2 = yy ? '일간의 음양이 달라 서로에게 자연스럽게 끌립니다.' : '일간의 음양이 같아 연인보다 친구 같은 편안함이 앞섭니다.';
    const b3 = comp ? '한쪽은 따뜻하고 한쪽은 서늘한 사주라 함께 있으면 온도가 맞춰집니다. 예부터 속궁합이 좋다고 보는 짝입니다.' : same ? (wa > 0 ? '둘 다 뜨거운 사주라 금방 달아오르고 금방 부딪힙니다. 식히는 시간을 두세요.' : '둘 다 서늘한 사주라 표현이 적어 서로 외로워지기 쉽습니다. 먼저 다가가는 쪽을 정해 두세요.') : '사주의 온도 차가 크지 않아 무난합니다.';
    add('in', '몸과 정', '몸과 정의 궁합', 0.5 * r2[1] + 0.25 * (yy ? 88 : 62) + 0.25 * (comp ? 90 : same ? 54 : 72), b1 + ' ' + b2 + ' ' + b3, '일지 ' + A.P.day.branchH + ' · ' + B.P.day.branchH + ' ' + r2[0] + ' · 음양 ' + (yy ? '다름' : '같음') + ' · 사주의 온도 ' + tword(wa) + ' · ' + tword(wb), 20);
  }
  const talkA = ga5[1], talkB = gb5[1], hearA = ga5[4], hearB = gb5[4];
  if ((talkA >= 2 && hearB >= 2) || (talkB >= 2 && hearA >= 2)) { const sp = talkA >= 2 && hearB >= 2 ? an : bn, li = sp === an ? bn : an; sc = 86; tx = sp + ' 쪽이 말을 꺼내고 ' + li + ' 쪽이 받아 주는 구도라 대화가 잘 이어집니다. 속마음을 터놓기 좋은 사이입니다.'; }
  else if (talkA >= 3 && talkB >= 3) { sc = 58; tx = '둘 다 표현이 강해 말이 많고, 서로 자기 말을 하느라 듣는 사람이 없어지기 쉽습니다. 한 사람씩 끝까지 말하는 규칙이 도움이 됩니다.'; }
  else if (talkA === 0 && talkB === 0) { sc = 56; tx = '둘 다 속마음을 잘 꺼내지 않습니다. 침묵이 오해로 굳기 전에, 정해 둔 시간에 이야기하는 습관이 필요합니다.'; }
  else { sc = 70; tx = '대화의 박자가 크게 어긋나지 않습니다. 중요한 이야기는 미루지 않고 그날 하는 것이 좋습니다.'; }
  if (STEM_HAP(as, bs)) { sc += 6; tx += ' 중심 기운이 합을 이뤄 말하지 않아도 통하는 순간이 많습니다.'; }
  add('in', '마음·대화', '마음과 대화', sc, tx, '표현(식상) ' + talkA + ' · ' + talkB + '개, 받아들임(인성) ' + hearA + ' · ' + hearB + '개', lover ? 12 : 20);
  const give = (to, from) => clamp(46 + 11 * from.count[to.need] + (from.me === to.need ? 16 : 0), 30, 98);
  const ga = give(A, B), gb = give(B, A);
  add('in', '채워 주는 힘', '서로 채워 주는 힘', (ga + gb) / 2, bn + '의 사주에는 ' + an + '에게 필요한 ' + EL[A.need] + ' 기운이 ' + B.count[A.need] + '개, ' + an + '의 사주에는 ' + bn + '에게 필요한 ' + EL[B.need] + ' 기운이 ' + A.count[B.need] + '개 있습니다. ' + (ga >= 75 && gb >= 75 ? '서로에게 힘이 되는 사이입니다.' : ga >= 75 ? an + ' 쪽이 더 많이 받는 관계입니다.' : gb >= 75 ? bn + ' 쪽이 더 많이 받는 관계입니다.' : '서로의 부족함을 사주가 직접 채워 주지는 않아, 함께하는 활동으로 보완해야 합니다.'), '용신 ' + EL[A.need] + ' · ' + EL[B.need], lover ? 13 : 18);

  /* ===== 살림 궁합: 함께 꾸리는 생활 ===== */
  const t2 = { '충': '생활 리듬과 습관이 정면으로 부딪힙니다. 같이 살면 잠, 돈 쓰는 법, 집안일에서 다투기 쉬우니 규칙을 미리 정하세요.', '육합': '생활 궁합이 아주 좋습니다. 같이 있으면 편하고 살림이 자연스럽게 맞춰집니다.', '삼합': '같은 방향을 보는 사이입니다. 함께 무언가를 도모할 때 힘이 납니다.', '원진': '이유 없이 서운하고 미운 마음이 들기 쉬운 배치입니다. 오해가 생기면 그날 풀어야 합니다.', '형': '서로 고치려 들어 삐걱거립니다. 상대의 방식을 그대로 두는 연습이 필요합니다.', '같은 글자': '생활 방식이 닮았습니다. 편한 대신 단점도 같아 서로 거울이 됩니다.', '무난': '크게 끌어당기지도 부딪히지도 않습니다. 함께하는 습관을 만들면 정이 쌓입니다.' }[r2[0]];
  add('life', '생활', lover ? '함께 사는 궁합' : '함께 지내는 궁합', r2[1], t2, '일지 ' + A.P.day.branchH + ' · ' + B.P.day.branchH + ' ' + r2[0], 8);
  const ma = ga5[2], mb2 = gb5[2];
  if (ma >= 2 && mb2 >= 2) { sc = 84; tx = '둘 다 돈과 기회를 보는 눈이 있습니다. 함께 벌고 불리는 데 강하지만, 큰돈은 한 사람이 정리해서 관리하세요.'; }
  else if ((ma >= 2 && mb2 === 0) || (mb2 >= 2 && ma === 0)) { const k = ma >= 2 ? an : bn; sc = 74; tx = k + ' 쪽이 돈 감각이 좋습니다. 살림과 저축은 ' + k + ' 쪽이 맡고 다른 쪽은 믿고 맡기는 편이 낫습니다.'; }
  else if (ma === 0 && mb2 === 0) { sc = 58; tx = '둘 다 돈에 무심한 편이라 모이는 속도가 느립니다. 자동이체처럼 신경 쓰지 않아도 모이는 장치를 먼저 만드세요.'; }
  else { sc = 70; tx = '돈을 대하는 태도가 크게 다르지 않습니다. 큰 지출만 미리 상의하면 다툴 일이 적습니다.'; }
  if (ga5[0] >= 3 || gb5[0] >= 3) { sc -= 8; tx += ' 한쪽은 사람에게 쓰는 돈이 큰 사주이니 보증과 빌려주는 돈은 함께 정하세요.'; }
  add('life', '돈', lover ? '돈 궁합' : '돈 거래와 동업', sc, tx, '돈(재성) ' + ma + ' · ' + mb2 + '개, 내 편(비겁) ' + ga5[0] + ' · ' + gb5[0] + '개', 6);
  let nClash = 0, nHap = 0, nSore = 0;
  ['year', 'month', 'day', 'hour'].forEach(k => { if (A.P[k] && B.P[k]) { const r = branchRel(A.P[k].b, B.P[k].b)[0]; if (r === '충') nClash++; else if (r === '육합' || r === '삼합') nHap++; else if (r === '원진' || r === '형') nSore++; } });
  tx = (nClash + nSore === 0 ? '같은 자리의 기둥끼리 크게 부딪히는 곳이 없어 다툼이 잦지 않습니다.' : '같은 자리의 기둥끼리 부딪히는 곳이 ' + (nClash + nSore) + '곳 있어 ' + (nClash ? '한 번 다투면 크게 다툽니다.' : '사소한 일로 자주 토라집니다.')) + ' ' + (nHap ? '끌어당기는 자리가 ' + nHap + '곳 있어 다퉈도 금방 풀립니다.' : '끌어당기는 자리가 적어 다투면 오래 갑니다. 먼저 사과하는 순서를 정해 두세요.');
  add('life', '다툼·화해', '다툼과 화해', 70 - 9 * nClash - 6 * nSore + 7 * nHap, tx, '네 기둥의 충 ' + nClash + ' · 원진·형 ' + nSore + ' · 합 ' + nHap, 6);

  const avg = list => Math.round(list.reduce((s, it) => s + it[1] * it[4], 0) / list.reduce((s, it) => s + it[4], 0));
  const saju = avg(items), grp = { out: avg(items.filter(i => i[6] === 'out')), in: avg(items.filter(i => i[6] === 'in')), life: avg(items.filter(i => i[6] === 'life')) };
  const mb = null;
  const total = mb ? Math.round(saju * 0.7 + mb.score * 0.3) : saju;
  return { items, saju, mb, total, an, bn, grp, lover };
}
const matchWord = n => n >= 85 ? T('천생연분', 'A match made in heaven') : n >= 72 ? T('잘 맞는 사이', 'A good match') : n >= 58 ? T('맞춰 가면 좋은 사이', 'Good with adjusting') : T('다름을 인정해야 하는 사이', 'Differences to accept');
function partnerSheet() {
  const B = S.psaju, f = p => p ? p.stemH + p.branchH : '모름', g = gunghap();
  return '상대(' + (S.partner.gender === 'M' ? '남' : '여') + ', ' + B.by + '년생): 년 ' + f(B.P.year) + ' 월 ' + f(B.P.month) + ' 일 ' + f(B.P.day) + ' 시 ' + f(B.P.hour) + ', ' + (B.strong ? '신강' : '신약') + ', 용신 ' + EL[B.need] + ', 오행 ' + B.count.join('/') +
    '\n관계: ' + (S.rel === 'love' ? '연인·부부' : '친구·동료') + '\n궁합 항목: ' + g.items.map(i => i[0] + ' ' + i[1] + '점 (' + i[3] + ')').join(' | ') + (g.mb ? ' | 성격유형 궁합 ' + g.mb.score + '점' : '') + '\n종합 ' + g.total + '점';
}
function renderMatch() {
  const ub = S.partner;
  Access.refresh(); S.psaju = calcSaju(ub);
  const A = S.saju, B = S.psaju, g = gunghap(), why = t => '<p class="why">' + T('명리 근거: ', 'Basis: ') + t + '</p>';
  const who = (sj, name, mb) => '<div class="duo"><small>' + SEASON_ADJ[seasonOf(sj.P.month.b)] + '</small><b class="c' + sj.P.day.sEl + '">' + DAY_TXT[sj.P.day.s][0] + '</b><span>' + name + (mb ? ' · ' + mb : '') + '</span><span class="han4">' + sj.keys.slice().reverse().map(k => elSpan(sj.P[k].sEl, sj.P[k].stemH) + elSpan(sj.P[k].bEl, sj.P[k].branchH)).join(' ') + '</span></div>';
  const hero = '<div class="hero match"><div class="pair">' + who(A, g.an) + '<div class="ring" id="mring" style="--p:' + g.total + '"><div><b data-count="' + g.total + '">' + g.total + '</b><small>' + matchWord(g.total) + '</small></div></div>' + who(B, g.bn) + '</div>' +
    '<div class="sbars">' + g.items.map(i => '<div class="sbar"><span>' + i[5] + '</span><span class="trk"><i style="--w:' + i[1] + '%"></i></span><b data-count="' + i[1] + '">' + i[1] + '</b></div>').join('') + (g.mb ? '<div class="sbar"><span>성격유형</span><span class="trk"><i style="--w:' + g.mb.score + '%"></i></span><b data-count="' + g.mb.score + '">' + g.mb.score + '</b></div>' : '') + '</div></div>';
  const gw = n => n >= 80 ? T('아주 좋음', 'Very good') : n >= 70 ? T('좋음', 'Good') : n >= 60 ? T('무난', 'Fair') : T('맞춰 가기', 'To work on');
  const tile = (cap, n, cls) => '<div class="tile ' + cls + '"><small>' + cap + '</small><b>' + n + '</b><span>' + gw(n) + '</span></div>';
  const GN = EN ? (g.lover ? { out: ['Outer match', 'what others can see'], in: ['Inner match', 'what only the two of you know'], life: ['Daily-life match', 'the life you run together'] } : { out: ['Outward fit', 'how you look together'], in: ['Inward fit', 'how far your hearts connect'], life: ['Getting along', 'daily life, money and conflict'] }) : g.lover ? { out: ['겉궁합', '남들 눈에 보이는 궁합'], in: ['속궁합', '둘만 아는 궁합'], life: ['살림 궁합', '함께 꾸리는 생활'] } : { out: ['겉으로 맞는 점', '함께 있을 때 보이는 모습'], in: ['속으로 맞는 점', '마음이 통하는 정도'], life: ['함께 지내는 법', '생활과 돈, 다툼'] };
  const tiles = '<div class="tiles">' + tile(GN.out[0], g.grp.out, g.grp.out >= 72 ? 'up' : '') + tile(GN.in[0], g.grp.in, g.grp.in >= 72 ? 'gold' : '') + tile(GN.life[0], g.grp.life, g.grp.life >= 72 ? 'up' : '') + '</div>';
  const inOut = g.grp.out >= 70 && g.grp.in >= 70 ? T('겉과 속이 다 맞는 사이입니다.', 'You fit both outwardly and inwardly.') : g.grp.out >= 70 ? T('겉으로는 잘 맞는데 속은 맞춰 가야 하는 사이입니다.', 'You fit well outwardly, while the inner side needs adjusting.') : g.grp.in >= 70 ? T('겉으로는 달라 보여도 속이 깊이 맞는 사이입니다.', 'You look different outwardly but fit deeply inside.') : T('겉과 속 모두 노력으로 맞춰 가는 사이입니다.', 'Both the outer and inner sides are fitted through effort.');
  const good = g.items.filter(i => i[1] >= 80), bad = g.items.filter(i => i[1] <= 55);
  const sum = tiles + '<div class="panel"><p><b>' + inOut + '</b> ' + (good.length ? T('<b class="c0">잘 맞는 점</b>은 ' + good.map(i => i[0]).join(', ') + '입니다. ', '<b class="c0">Where you fit</b>: ' + good.map(i => i[0]).join(', ') + '. ') : '') + (bad.length ? T('<b class="c1">부딪히는 점</b>은 ' + bad.map(i => i[0]).join(', ') + '입니다. ', '<b class="c1">Where you collide</b>: ' + bad.map(i => i[0]).join(', ') + '. ') : T('크게 부딪히는 자리가 없습니다. ', 'Nothing collides strongly. ')) + '</p><p class="note" style="margin-top:6px">' + T('점수가 낮은 항목은 헤어지라는 뜻이 아니라 미리 알고 맞춰 갈 지점입니다.', 'A low score does not mean you should part; it marks a point to know in advance and adjust.') + '</p></div>';
  const detail = ['out', 'in', 'life'].map(k => '<div class="block"><h3>' + GN[k][0] + ' ' + g.grp[k] + T('점 · ', ' · ') + GN[k][1] + '</h3><div class="read">' + g.items.filter(i => i[6] === k).map(i => '<div class="it"><b>' + i[0] + ' · ' + i[1] + T('점', '') + '</b><p>' + i[2] + '</p>' + why(i[3] + T(' · 비중 ', ' · weight ') + i[4] + '%') + '</div>').join('') + '</div></div>').join('') +
    (g.mb ? '<div class="block"><h3>성격유형 궁합 · ' + S.user.mbti + ' × ' + ub.mbti + ' · ' + g.mb.score + '점</h3><div class="read">' + g.mb.pts.map(t => '<div class="it"><p>' + t + '</p></div>').join('') + '</div><p class="why">성격유형 궁합 점수는 이 앱의 자체 규칙이며 검증된 이론이 아닙니다.</p></div>' : '') +
    '<div class="block needs-ai"' + (S.ai ? '' : ' hidden') + '><h3>' + T('AI 궁합 풀이', 'AI compatibility reading') + '</h3><div class="panel block"><p class="note">' + T('두 사람의 사주를 함께 읽고, 잘 지내는 법을 쉬운 말로 풀어 줍니다.', 'Reads both charts together and explains how to get along, in plain words.') + '</p><button type="button" class="primary" id="matchGo">' + T('AI 궁합 풀이 받기', 'Get the AI reading') + '</button><div class="ai-out" id="matchOut" aria-live="polite">' + esc(S.matchText || '') + '</div></div></div>';
  const hi = g.items.slice().sort((a, b) => b[1] - a[1])[0], lo = g.items.slice().sort((a, b) => a[1] - b[1])[0];
  const tip = EN ? EN_M.TIP[lo[5]] : { '성격': '서로를 바꾸려 들지 말고 잘하는 일로 역할을 나누세요.', '생활': '돈, 집안일, 잠처럼 같이 지내는 규칙을 미리 정해 두세요.', '채워 주는 힘': '함께하는 취미나 운동으로 서로에게 없는 기운을 채우세요.', '집안·사회': '집안 일과 직장 문제는 각자의 방식을 인정하고 선을 정하세요.', '일하는 방식': '일하는 방식의 차이는 역할을 나눠서 풀어 가세요.', '띠': '띠는 비중이 가장 작으니 마음에 두지 않아도 됩니다.', '몸과 정': '애정 표현은 짐작하지 말고 서로 원하는 방식을 말로 맞추세요.', '마음·대화': '일주일에 한 번, 정해 둔 시간에 속 이야기를 나누세요.', '돈': '큰 지출과 빌려주는 돈은 반드시 함께 정하세요.', '다툼·화해': '다툰 날은 넘기지 말고, 먼저 사과하는 순서를 정해 두세요.' }[lo[5]];
  const opinion = EN ? '<div class="block"><h3>Overall summary</h3><div class="panel block sum"><p>' + g.an + ' and ' + g.bn + ' score ' + g.total + ' overall: <b>' + matchWord(g.total).toLowerCase() + '</b>. ' + GN.out[0] + ' ' + g.grp.out + ', ' + GN.in[0].toLowerCase() + ' ' + g.grp.in + '. ' + inOut + ' Your greatest strength is ' + hi[0].toLowerCase() + ' (' + hi[1] + '), and the place to mind most is ' + lo[0].toLowerCase() + ' (' + lo[1] + ').</p><p><b>In short, ' + (g.total >= 72 ? 'the foundation between you is good. Not taking the good for granted is how it lasts.' : g.total >= 58 ? 'you fit in some places and differ in others. Knowing the differences in advance and adjusting is enough to make it good.' : 'your innate grain differs a great deal. It gets easier when you settle differences as rules rather than trying to fix each other.') + ' ' + tip + '</b></p></div></div>' : '<div class="block"><h3>종합의견</h3><div class="panel block sum"><p>' + josa(g.an, '과', '와') + ' ' + josa(g.bn, '은', '는') + ' 종합 ' + g.total + '점으로 <b>' + matchWord(g.total) + '</b>입니다. ' + GN.out[0] + ' ' + g.grp.out + '점, ' + GN.in[0] + ' ' + g.grp.in + '점으로 ' + inOut + ' 가장 큰 강점은 ' + hi[0] + '(' + hi[1] + '점)이고, 가장 신경 쓸 곳은 ' + lo[0] + '(' + lo[1] + '점)입니다.</p><p><b>정리하면, ' + (g.total >= 72 ? '기본 바탕이 좋은 사이입니다. 좋은 점을 당연하게 여기지 않는 것이 오래가는 길입니다.' : g.total >= 58 ? '맞는 곳과 다른 곳이 섞인 사이입니다. 다른 곳을 미리 알고 맞춰 가면 충분히 좋아집니다.' : '타고난 결이 많이 다른 사이입니다. 상대를 고치려 하기보다 다름을 규칙으로 정리해야 편해집니다.') + ' ' + tip + '</b></p></div></div>';
  const form = '<form class="birth" id="partnerForm"' + (S.pEdit ? '' : ' hidden') + '><div class="row"><label>' + T('상대 이름(선택)', 'Partner\'s name (optional)') + '<input id="p-name" maxlength="12" autocomplete="off" value="' + (ub.example ? '' : esc(ub.name || '')) + '"></label><label>' + T('성별', 'Sex') + '<select id="p-gender"><option value="M"' + (ub.gender === 'M' ? ' selected' : '') + '>' + T('남', 'Male') + '</option><option value="F"' + (ub.gender === 'F' ? ' selected' : '') + '>' + T('여', 'Female') + '</option></select></label></div>' +
    '<div class="row4"><label>' + T('달력', 'Calendar') + '<select id="p-cal">' + [['solar', T('양력', 'Solar')], ['lunar', T('음력', 'Lunar')], ['leap', T('음력 윤달', 'Lunar (leap month)')]].map(c => '<option value="' + c[0] + '"' + (ub.cal === c[0] ? ' selected' : '') + '>' + c[1] + '</option>').join('') + '</select></label><label>' + T('년', 'Year') + '<input id="p-y" type="number" inputmode="numeric" min="1900" max="2100" required value="' + ub.y + '"></label><label>' + T('월', 'Month') + '<input id="p-m" type="number" inputmode="numeric" min="1" max="12" required value="' + ub.m + '"></label><label>' + T('일', 'Day') + '<input id="p-d" type="number" inputmode="numeric" min="1" max="31" required value="' + ub.d + '"></label></div>' +
    (EN ? '<div class="row"><label>Birthplace (nearest city)<select id="p-place">' + worldOptions(ub.place || (S.user && S.user.place) || worldGuess()) + '</select></label><span></span></div>' : '') + '<div class="row"><label>' + T('태어난 시', 'Birth time (clock)') + '<select id="p-si"' + (EN ? ' hidden' : '') + (siOf(ub) < 0 ? ' disabled' : '') + '>' + siOptions(siOf(ub) < 0 ? 5 : siOf(ub)) + '</select>' + (EN ? '<input id="p-time" type="time" value="' + (ub.hh != null ? pad2(ub.hh) + ':' + pad2(ub.mm) : '12:00') + '"' + ((ub.tz ? ub.hh == null : siOf(ub) < 0) ? ' disabled' : '') + '>' : '') + '</label><label class="chk" style="align-self:end;padding-bottom:10px"><input id="p-notime" type="checkbox"' + (siOf(ub) < 0 ? ' checked' : '') + '>' + T(' 시를 모릅니다', ' I don\'t know the hour') + '</label></div>' +
    '<p class="hint">' + T('시를 모르면 체크하세요. 생년월일만으로도 궁합을 봅니다.', 'Tick this if the hour is unknown. The birth date alone is enough for a match.') + '</p><p class="note warn" id="p-msg" role="alert"></p><button class="primary" type="submit">' + T('궁합 보기', 'See the match') + '</button></form>';
  const detailAll = detail + opinion;
  const chips = '<div class="chips"><button type="button" class="chip' + (S.rel === 'love' ? ' on' : '') + '" data-rel="love">' + T('연인·부부', 'Couple') + '</button><button type="button" class="chip' + (S.rel === 'friend' ? ' on' : '') + '" data-rel="friend">' + T('친구·동료', 'Friends · coworkers') + '</button><button type="button" class="chip" data-pedit>' + (ub.example ? T('상대 정보 입력', 'Enter partner\'s details') : T('상대 정보 수정', 'Edit partner\'s details')) + '</button></div>';
  $('v-match').classList.toggle('show-why', !!S.why);
  $('v-match').innerHTML = '<div class="block"><h2>' + T('궁합', 'Compatibility') + TIER.free + '</h2><h3>' + g.an + ' × ' + g.bn + (ub.example ? '<span class="badge">' + T('상대는 예시 데이터', 'Partner is an example') + '</span>' : '') + '</h3>' + chips + form + '</div>' + hero + (B.info.err ? '<p class="note warn">' + B.info.err + '</p>' : '') + '<div class="block"><h3>' + T('한눈에 보기 · 총점과 묶음 점수는 무료', 'At a glance · the total and group scores are free') + '</h3>' + sum + '</div>' + lockWrap(detailAll, T('겉궁합·속궁합·살림 궁합의 항목별 풀이와 종합의견이 한 번 결제로 열립니다', 'One payment opens the reading for each part and the overall summary'), 'match');
}
let matchBusy = false;
async function askMatch() {
  const out = $('matchOut'), btn = $('matchGo');
  if (!S.ai || matchBusy) return;
  matchBusy = true; btn.disabled = true; out.textContent = T('두 사람의 사주를 읽는 중입니다.', 'Reading both charts.');
  const prompt = '당신은 30년 경력의 명리 상담가입니다. 아래 두 사람의 자료만을 근거로 한국어 궁합 풀이를 쓰세요. 자료에 없는 간지를 지어내지 마세요.\n\n말투: 명리를 모르는 사람이 읽습니다. 쉬운 말로 쓰고 전문 용어는 괄호 안 근거로만 짧게 적습니다.\n형식: 소제목 【두 사람의 첫인상】【잘 맞는 점】【부딪히는 점】【다툴 때 푸는 법】【함께하면 좋은 것】【종합의견】을 쓰고 각 3~5문장. 마지막 【종합의견】은 전체를 정리하고 두 사람이 지금 가장 먼저 할 일 하나로 끝냅니다. 목록 기호 없이 문단으로.\n규칙: 헤어지라거나 반드시 결혼하라는 식의 단정은 하지 않습니다. 점수가 낮은 항목은 맞춰 가는 방법으로 풀어 줍니다.\n\n[나]\n' + factSheet().split('\n').slice(0, 9).join('\n') + '\n\n[상대와 궁합]\n' + partnerSheet();
  try { const r = await S.ai(prompt, { onText: ({ text }) => { out.textContent = text; } }); S.matchText = r.text; out.textContent = r.text; }
  catch (err) { out.textContent = err && err.code === 'rate_limited' ? T('요청이 많습니다. 잠시 뒤에 다시 눌러 주세요.', 'Too many requests. Please try again in a moment.') : T('AI 풀이를 불러오지 못했습니다. 위의 항목별 풀이는 그대로 볼 수 있습니다.', 'Could not load the AI reading. The readings above are still available.'); }
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
  if (!(y >= 1900 && y <= 2100 && m >= 1 && m <= 12 && d >= 1 && d <= 31)) { msg.textContent = T('생년월일을 다시 확인하세요.', 'Check the birth date again.'); return; }
  if (cal !== 'solar' && !lunarToSolar(y, m, d, cal === 'leap')) { msg.textContent = T('해당 음력 날짜를 찾지 못했습니다. 윤달 여부를 확인하세요.', 'That lunar date was not found. Check whether it is a leap month.'); return; }
  S.partner = { name: $('p-name').value.trim(), gender: $('p-gender').value, cal, y, m, d, si: no ? -1 : +$('p-si').value };
  if (EN) withPlace(S.partner, $('p-place').value, $('p-time').value, no);
  store.set('mw-partner', S.partner);
  S.pEdit = false; S.matchText = ''; renderMatch();
  const v = $('v-match'); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter'); countUp(v);
  if (gunghap().total >= 72) setTimeout(() => fx.burst($('mring'), 70), 1100);
});
const PARTNER_EXAMPLE = { name: T('예시 상대', 'Example partner'), gender: 'M', cal: 'solar', y: 1988, m: 8, d: 23, si: 7, example: true };
S.partner = store.get('mw-partner') || Object.assign({}, PARTNER_EXAMPLE);
S.rel = 'love';
