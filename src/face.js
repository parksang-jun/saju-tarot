/* ===== 관상: 정면 사진 → 얼굴 비율 측정 → 오행형·오관·십이궁·유년 풀이, 사주와 겹쳐 읽기 =====
   사진과 측정값은 메모리에만 두고 저장·전송하지 않는다. 얼굴 인식은 기기 안에서 돈다(face-api.js + 내장 모델). */
(() => {
const LIB = 'face-api.js', MODELS = 'face-models.js';
const F = { res: null, cv: null, msg: '', err: false, busy: false };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const batchim = w => { const c = w.charCodeAt(w.length - 1); return c >= 44032 && c <= 55203 && (c - 44032) % 28 > 0; };
const jo = (w, a, b) => w + (batchim(w) ? a : b);

/* 기준값(평균, 표준편차): 정면 얼굴 비율의 근사치. 편차는 (측정-평균)/표준편차를 ±2로 자른 값. */
const REF = {
  fr: ['얼굴 세로/가로', .90, .06], jr: ['턱 너비(귀밑)', .80, .045], jc: ['턱끝 너비', .50, .045],
  zr: ['중정/하정', .92, .09], ig: ['인당(눈썹 사이)', .23, .03], bl: ['눈썹/눈 길이', 1.60, .15],
  ba: ['눈썹 꼬리 기울기', -.02, .07], be: ['눈썹-눈 간격', .125, .025], el: ['눈 길이', .172, .015],
  eo: ['눈 높이/길이', .30, .05], eg: ['눈 사이/눈 길이', 1.50, .15], et: ['눈꼬리 기울기', .05, .06],
  gm: ['간문(눈꼬리 옆)', .18, .025], nl: ['코 길이', .35, .03], nw: ['콧방울 너비', .185, .022],
  mw: ['입 너비', .38, .035], lt: ['입술 두께', .30, .07], lift: ['입꼬리 높이', 0, .035],
  ph: ['인중 길이', .19, .035], ch: ['턱 길이', .46, .05]
};

function loadScript(src) {
  return new Promise((ok, no) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = () => no(new Error('lib')); document.head.appendChild(s); });
}
let ready = null;
function loadModels() {
  if (ready) return ready;
  ready = (async () => {
    if (!window.faceapi) await loadScript(LIB);
    if (!window.FACE_MODELS) await loadScript(MODELS);
    const tf = faceapi.tf;
    try { await tf.setBackend('webgl'); await tf.ready(); } catch (e) { await tf.setBackend('cpu'); await tf.ready(); }
    const dec = m => { const b = atob(m.b64), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return tf.io.decodeWeights(u.buffer, m.specs); };
    await faceapi.nets.tinyFaceDetector.loadFromWeightMap(dec(FACE_MODELS.det));
    await faceapi.nets.faceLandmark68Net.loadFromWeightMap(dec(FACE_MODELS.lm));
  })();
  ready.catch(() => { ready = null; });
  return ready;
}
async function toCanvas(file) {
  let src;
  try { src = await createImageBitmap(file, { imageOrientation: 'from-image' }); }
  catch (e) { src = await new Promise((ok, no) => { const im = new Image(); im.onload = () => ok(im); im.onerror = () => no(new Error('img')); im.src = URL.createObjectURL(file); }); }
  const w = src.width || src.naturalWidth, h = src.height || src.naturalHeight, k = Math.min(1, 1100 / Math.max(w, h));
  const c = document.createElement('canvas'); c.width = Math.round(w * k); c.height = Math.round(h * k);
  c.getContext('2d').drawImage(src, 0, 0, c.width, c.height);
  return c;
}

/* ----- 측정: 68개 기준점을 눈 선에 맞춰 돌린 뒤 비율을 잰다 ----- */
function measure(P) {
  const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
  const eL = mid(P[36], P[39]), eR = mid(P[42], P[45]);
  const a = Math.atan2(eR.y - eL.y, eR.x - eL.x), cs = Math.cos(-a), sn = Math.sin(-a);
  const p = P.map(q => ({ x: q.x * cs - q.y * sn, y: q.x * sn + q.y * cs }));
  const d = (i, j) => Math.hypot(p[i].x - p[j].x, p[i].y - p[j].y);
  const W = p[16].x - p[0].x, browL = (p[19].y + p[20].y) / 2, browR = (p[23].y + p[24].y) / 2, browY = (browL + browR) / 2;
  const H = p[8].y - browY, ewL = d(36, 39), ewR = d(42, 45), ew = (ewL + ewR) / 2;
  const eh = ((p[41].y - p[37].y) + (p[40].y - p[38].y) + (p[47].y - p[43].y) + (p[46].y - p[44].y)) / 4;
  const eyeTop = (p[37].y + p[38].y + p[43].y + p[44].y) / 4, mW = p[54].x - p[48].x, low = p[8].y - p[33].y;
  const bLen = (d(17, 21) + d(22, 26)) / 2;
  const v = {
    fr: H / W, jr: (p[12].x - p[4].x) / W, jc: (p[10].x - p[6].x) / W, zr: (p[33].y - browY) / low,
    ig: (p[22].x - p[21].x) / W, bl: bLen / ew, ba: ((p[21].y - p[17].y) + (p[22].y - p[26].y)) / 2 / bLen,
    be: (eyeTop - browY) / H, el: ew / W, eo: eh / ew, eg: (p[42].x - p[39].x) / ew,
    et: ((p[39].y - p[36].y) + (p[42].y - p[45].y)) / 2 / ew,
    gm: ((p[36].x - p[0].x) + (p[16].x - p[45].x)) / 2 / W,
    nl: (p[33].y - p[27].y) / H, nw: (p[35].x - p[31].x) / W,
    mw: mW / W, lt: ((p[62].y - p[51].y) + (p[57].y - p[66].y)) / mW,
    lift: ((p[62].y + p[66].y) / 2 - (p[48].y + p[54].y) / 2) / mW,
    ph: (p[51].y - p[33].y) / low, ch: (p[8].y - p[57].y) / low
  };
  const z = {}; for (const k in v) z[k] = clamp((v[k] - REF[k][1]) / REF[k][2], -2, 2);
  /* 표정 보정: 입이 벌어졌거나 크게 웃으면 입·인중·턱 수치가 틀어지므로 절반만 반영한다 */
  const open = (p[66].y - p[62].y) / mW, smile = open > .07 || (z.mw > 1.2 && z.lift > 1.2);
  if (smile) ['mw', 'lt', 'lift', 'ph', 'ch'].forEach(k => { z[k] *= .5; });
  const midX = (p[39].x + p[42].x) / 2, dl = p[27].x - p[0].x, dr = p[16].x - p[27].x;
  const asym = Math.abs(ewL - ewR) / ew + Math.abs(p[48].y - p[54].y) / mW + 3 * Math.abs(browL - browR) / H + 3 * Math.abs(p[33].x - midX) / W;
  const bend = Math.abs(p[30].x - p[27].x) / W;   // 콧대가 한쪽으로 휜 정도
  return { v, z, asym, bend, smile, yaw: Math.abs(dl - dr) / (dl + dr), angle: a };
}

/* ----- 오행형: 다섯 형의 점수를 매겨 주형과 겸형을 고른다 ----- */
const SHAPE = [
  ['목형', '木', '세로로 길고 선이 곧은 얼굴', '세로로 길고 선이 곧은 목형입니다. 나무처럼 위로 뻗는 기운이라 배우고 성장하는 일에 강하고, 원칙과 체면을 중시합니다. 한번 정한 방향은 오래 밀고 갑니다. 융통성이 부족하다는 말을 들을 수 있으니 한 박자 쉬어 가는 여유가 약이 됩니다.'],
  ['화형', '火', '위가 넓고 턱으로 갈수록 좁아지는 얼굴', '위쪽이 넓고 턱으로 갈수록 좁아지는 화형입니다. 머리 회전이 빠르고 감각이 예민해 기획하고 표현하는 일에서 빛납니다. 불처럼 빨리 타오르는 만큼 식기도 쉬우니, 시작한 일을 끝까지 끌고 갈 체력 관리가 관건입니다.'],
  ['토형', '土', '가로세로가 고르게 잡힌 중후한 얼굴', '가로세로 균형이 잡혀 어느 쪽으로도 치우치지 않은 토형입니다. 땅처럼 묵직하고 믿음을 주는 상이라 사람과 재물이 천천히 모입니다. 급하게 승부를 보기보다 시간을 내 편으로 만드는 쪽이 맞습니다. 변화에 반응이 느린 점만 조심하면 됩니다.'],
  ['금형', '金', '턱선이 넓고 각이 살아 있는 얼굴', '턱선이 넓고 각이 살아 있는 금형입니다. 쇠처럼 단단한 의지와 결단력이 있어 맡은 일은 끝을 봅니다. 책임지는 자리, 승부가 분명한 일에 강합니다. 말이 직선적이라 가까운 사람에게 차갑게 들릴 수 있으니 표현을 한 겹 부드럽게 하면 좋습니다.'],
  ['수형', '水', '가로가 넉넉하고 윤곽이 둥근 얼굴', '가로가 넉넉하고 윤곽이 둥근 수형입니다. 물처럼 어디에나 스며드는 친화력과 눈치가 있어 사람 사이에서 기회를 얻습니다. 재물 감각도 좋은 편입니다. 흐름에 몸을 맡기다 결정이 늦어질 수 있으니 기한을 스스로 정해 두는 습관이 도움이 됩니다.']
];
function shapeOf(z) {
  const s = [z.fr - .3 * z.jr, -.8 * z.jc - .6 * z.jr, .9 - .6 * Math.max(Math.abs(z.fr), Math.abs(z.jr), Math.abs(z.jc)), .9 * z.jr + .4 * z.jc - .2 * Math.abs(z.fr), -.9 * z.fr + .3 * z.jc];
  const ord = [0, 1, 2, 3, 4].sort((a, b) => s[b] - s[a]);
  return { main: ord[0], sub: s[ord[0]] - s[ord[1]] < .5 ? ord[1] : -1 };
}

/* ----- 부위별 풀이: q는 상법에서 좋게 보는 방향의 점수(대략 -2~2) ----- */
const pick = (x, hi, mid, lo) => x > .5 ? hi : x < -.5 ? lo : mid;
function partsOf(m) {
  const z = m.z, out = [];
  const add = (key, title, sub, q, keys, sents) => out.push({ key, title, sub, q, keys, text: sents.filter(Boolean).join(' ') });
  const sym = clamp(1.2 - m.asym / .09, -2, 2);

  add('sam', '삼정', '중년운과 말년운의 무게', 1 - Math.abs(z.zr), ['zr'], [pick(z.zr,
    '눈썹에서 코끝까지인 중정이 깁니다. 중정은 31~50세의 운과 자기 힘으로 일구는 사회적 성취를 봅니다. 한창 일할 나이에 자리를 잡는 상입니다.',
    '중정과 하정의 길이가 고르게 맞습니다. 상법은 삼정이 고른 것을 으뜸으로 칩니다. 중년과 말년의 운이 한쪽으로 기울지 않아 굴곡이 완만합니다.',
    '코끝에서 턱까지인 하정이 깁니다. 하정은 51세 이후의 운과 가정, 아랫사람 복을 봅니다. 갈수록 편안해지는 대기만성형입니다.')]);

  add('ig', '인당', '명궁 · 운이 드나드는 문', z.ig, ['ig'], [pick(z.ig,
    '눈썹 사이 인당이 넓고 시원합니다. 인당은 십이궁의 첫째인 명궁으로, 넓으면 마음이 트여 있고 기회가 들어올 자리가 넉넉하다고 읽습니다.',
    '인당의 폭이 알맞습니다. 명궁이 좁지도 벌어지지도 않아 생각과 결단의 균형이 좋고 운의 드나듦이 고릅니다.',
    '눈썹 사이 인당이 좁은 편입니다. 한 가지를 깊이 파는 집중력으로 읽지만 걱정을 오래 붙들기 쉽다고도 봅니다. 미간을 찌푸리는 버릇만 줄여도 명궁이 넓어집니다.')]);

  add('brow', '눈썹', '형제궁 · 보수관 · 사람과의 인연', z.bl, ['bl', 'ba'], [pick(z.bl,
    '눈썹이 눈보다 넉넉히 깁니다. 눈썹은 형제궁이자 보수관으로, 눈을 덮을 만큼 길면 형제와 동료의 도움이 있고 인연이 오래 간다고 봅니다.',
    '눈썹 길이가 눈과 어울려 사람 사이의 거리 조절이 무난합니다. 도움을 주고받는 양이 비슷한 형제궁입니다.',
    '눈썹이 짧은 편입니다. 형제궁이 짧으면 남에게 기대기보다 제 힘으로 해내는 독립형으로 읽습니다. 혼자 다 지려 하지 말고 도움을 청하는 연습이 약이 됩니다.'),
    pick(z.ba, '눈썹 꼬리가 올라가 기세와 결단이 앞섭니다.', '', '눈썹 꼬리가 내려가 성품이 온화하고 사람을 편하게 합니다.')]);

  add('jt', '전택궁', '눈썹과 눈 사이 · 집과 마음의 여유', z.be, ['be'], [pick(z.be,
    '눈썹과 눈 사이인 전택궁이 넓습니다. 집과 부동산, 마음의 여유를 보는 자리로, 넓으면 성품이 느긋하고 주거 복이 있다고 봅니다.',
    '전택궁의 넓이가 알맞아 신중함과 실행력이 균형을 이룹니다.',
    '전택궁이 좁은 편입니다. 판단과 행동이 빠르고 목표를 향해 곧장 움직이는 실행가형입니다. 큰 계약과 이사는 하루 묵혀서 결정하면 좋습니다.')]);

  add('eye', '눈', '감찰관 · 마음과 판단', .5 * z.el - .3 * Math.abs(z.eo) + .4 * sym, ['el', 'eo', 'eg', 'et'], [
    pick(z.el, '눈이 가로로 깁니다. 상법은 가늘고 긴 눈을 귀하게 치며, 생각이 깊고 멀리 본다고 읽습니다.', '', '눈의 가로 길이가 짧은 편이라 눈앞의 일에 빠르게 반응하는 순발력으로 읽습니다.'),
    pick(z.eo, '눈이 크고 또렷하게 열려 있어 감정이 얼굴에 잘 드러나고 표현력이 좋습니다. 첫인상에서 호감을 쉽게 얻습니다.',
      '눈의 열림이 적당해 감정과 이성의 균형이 좋습니다.',
      '눈이 가늘게 열려 있어 속을 쉽게 드러내지 않고 관찰력이 좋습니다. 판단이 신중하고 실속을 챙깁니다.'),
    pick(z.eg, '눈 사이가 넓어 마음이 너그럽고 큰 그림을 먼저 봅니다. 세세한 마무리는 따로 챙겨야 합니다.', '', '눈 사이가 가까워 집중력과 순발력이 뛰어납니다. 한 가지에 몰입하면 주변을 놓치기 쉽습니다.'),
    pick(z.et, '눈꼬리가 올라가 승부욕과 추진력이 강합니다.', '', '눈꼬리가 내려가 인상이 부드럽고 남의 말을 잘 들어 줍니다.')]);

  add('gm', '간문', '처첩궁 · 배우자와의 인연', z.gm, ['gm'], [pick(z.gm,
    '눈꼬리에서 얼굴 가장자리까지인 간문이 넓습니다. 처첩궁이라 부르는 자리로, 넓고 반반하면 배우자 인연이 순탄하고 가정에서 힘을 얻는다고 봅니다.',
    '간문의 넓이가 알맞아 배우자 인연이 무난한 편으로 읽습니다.',
    '간문이 좁은 편입니다. 가까운 사람에게 기대가 큰 만큼 서운함도 쉽게 쌓인다고 읽습니다. 고마운 것을 먼저 말하는 습관이 이 자리를 넓혀 줍니다.')]);

  add('nose', '코', '재백궁 · 심판관 · 재물과 중년', .7 * z.nw + .3 * (1 - Math.abs(z.nl)) - (m.bend > .03 ? .5 : 0), ['nw', 'nl'], [pick(z.nw,
    '콧방울이 넓고 힘이 있습니다. 코는 재물이 모이는 재백궁이고 콧방울은 곳간에 해당합니다. 넉넉하면 버는 힘과 지키는 힘이 함께 있다고 봅니다.',
    '콧방울 폭이 알맞아 수입과 지출의 균형 감각이 좋습니다. 크게 잃지 않는 살림입니다.',
    '콧방울이 좁고 날렵합니다. 돈을 쌓아 두기보다 필요한 곳에 정확히 쓰는 쪽이고, 재물보다 명예와 완성도를 중시합니다. 모으는 장치를 따로 두면 좋습니다.'),
    pick(z.nl, '코가 길어 자존심과 책임감이 강하고 원칙을 지킵니다.', '', '코가 짧은 편이라 성격이 밝고 상황 적응이 빠릅니다.'),
    m.bend > .03 ? '콧대가 한쪽으로 살짝 기울어 보입니다. 고개 각도 탓일 수 있으니 정면에서 다시 확인해 보세요.' : '콧대가 곧게 내려와 중년의 중심이 흔들리지 않는다고 읽습니다.']);

  add('mouth', '입', '출납관 · 수성 · 말과 애정', .4 * z.mw + .5 * z.lift + .2 * (1 - Math.abs(z.lt)), ['mw', 'lt', 'lift'], [pick(z.mw,
    '입이 큽니다. 옛 기준으로 입 끝이 두 눈동자 사이보다 넓으면 큰 입으로 치며, 배포가 크고 사람을 이끄는 힘이 있다고 봅니다.',
    '입 크기가 얼굴과 조화로워 말과 행동의 균형이 좋습니다.',
    '입이 작고 단정해 말을 아끼고 꼼꼼합니다. 믿을 만한 소수와 깊게 지냅니다.'),
    pick(z.lt, '입술이 도톰해 정이 많고 애정 표현이 풍부합니다.', '', '입술이 얇아 이성적이고 말이 정확합니다.'),
    pick(z.lift, '입꼬리가 올라가 복이 들어오는 입이라고 합니다. 주변에 사람이 모입니다.', '', '입꼬리가 수평보다 내려가 진중한 인상을 줍니다. 입꼬리만 살짝 올려도 상이 달라집니다.'),
    m.smile ? '웃는 표정으로 찍혀 입 수치는 절반만 반영했습니다.' : '']);

  add('ph', '인중', '끈기와 건강, 51세의 자리', z.ph, ['ph'], [pick(z.ph,
    '인중이 길어 끈기가 있고 오래 건강을 유지하는 상입니다. 중년에서 말년으로 넘어가는 물길이 넉넉합니다.',
    '인중 길이가 알맞아 중년에서 말년으로 넘어가는 흐름이 순합니다.',
    '인중이 짧아 반응이 빠르고 젊은 감각을 오래 유지합니다. 쉬지 않고 달리는 버릇이 있으니 50대 전후에는 속도를 조절하세요.')]);

  add('chin', '턱', '지각 · 노복궁 · 말년과 따르는 사람', .5 * z.ch + .4 * z.jc + .3 * z.jr, ['ch', 'jc', 'jr'], [pick(.5 * z.ch + .4 * z.jc + .3 * z.jr,
    '턱이 넓고 든든합니다. 우리 상법은 오악 가운데 턱을 특히 귀하게 봅니다. 말년으로 갈수록 기반이 단단해지고 따르는 사람이 많다고 읽습니다.',
    '턱의 길이와 너비가 알맞아 말년운이 안정적입니다.',
    '턱이 갸름한 편입니다. 감각이 섬세하고 혼자 하는 일에 강합니다. 말년을 위한 기반과 사람은 일찍부터 의식해서 쌓아 두면 좋습니다.')]);

  add('sym', '좌우 균형', '상법의 첫 원칙, 조화', sym, [], [pick(sym,
    '좌우가 고르게 맞습니다. 상법은 부위 하나하나보다 전체의 조화와 균형을 먼저 봅니다. 균형이 좋으면 운의 기복이 작다고 읽습니다.',
    '좌우 균형은 보통입니다. 큰 치우침 없이 무난합니다.',
    '좌우 차이가 조금 있습니다. 사진 각도와 표정의 영향이 크니 정면에서 다시 찍어 확인해 보세요. 한쪽으로만 씹거나 자는 습관이 차이를 키웁니다.')]);
  return out;
}

/* ----- 유년: 마의상법 유년운기부위가의 나이별 자리(세는나이). 정면 사진으로 잴 수 있는 자리만 평가한다 ----- */
const YUN = [
  [1, 14, '귀', '', '어린 시절의 운은 귀에서 봅니다.'],
  [15, 27, '이마', '', '15~30세의 운은 이마(상정)에서 봅니다. 부모와 윗사람의 덕, 공부와 출발을 읽는 자리입니다.'],
  [28, 28, '인당', 'ig', '28세는 인당의 자리입니다. 상정의 끝이자 명궁이라 인생의 방향이 정해지는 해로 봅니다.'],
  [29, 30, '이마 양옆', '', '29~30세는 이마 양옆(산림)의 자리로 터전을 옮기고 넓히는 운을 봅니다.'],
  [31, 34, '눈썹', 'brow', '31~34세의 운은 눈썹에서 봅니다. 사람과의 인연이 일의 성패를 가르는 때입니다.'],
  [35, 40, '눈', 'eye', '35~40세는 눈의 자리입니다. 판단력으로 승부하는 때로, 눈에 힘이 있으면 가장 크게 뻗습니다.'],
  [41, 43, '산근', '', '41~43세는 산근과 그 양옆(눈 사이 콧대 뿌리)의 자리입니다. 중년으로 넘어가는 고개라 건강과 자리 이동을 살피는 때로 봅니다.'],
  [44, 45, '콧대', 'nose', '44~45세는 콧대(연상·수상)의 자리입니다. 중년의 한가운데로, 건강과 자기 중심을 지키는 힘을 봅니다.'],
  [46, 47, '광대', '', '46~47세는 광대(관골)의 자리입니다. 사회적 힘과 사람을 움직이는 권한을 보는 때입니다.'],
  [48, 50, '코끝과 콧방울', 'nose', '48~50세는 코끝과 콧방울(준두·난대·정위)의 자리입니다. 재백궁의 중심이라 평생 재물의 정점을 여기서 봅니다.'],
  [51, 55, '인중과 그 양옆', 'ph', '51~55세는 인중과 그 양옆의 자리입니다. 중년에서 말년으로 넘어가는 물길이고 먹고사는 곳간을 봅니다.'],
  [56, 59, '법령과 뺨', '', '56~59세는 법령(입가로 내려오는 선)과 뺨의 자리입니다. 일의 권위와 마무리를 보는 때입니다.'],
  [60, 60, '입', 'mouth', '60세는 입(수성)의 자리입니다. 말과 먹을 복, 식구를 거느리는 힘을 봅니다.'],
  [61, 67, '입 아래와 턱 양옆', 'chin', '61~67세는 입 아래에서 턱 양옆으로 이어지는 자리(승장·지고)입니다. 모아 둔 것을 지키는 힘을 봅니다.'],
  [68, 75, '턱끝과 턱선', 'chin', '68~75세는 턱끝과 턱선(지각·노복·시골)의 자리입니다. 말년의 터전과 따르는 사람을 봅니다.'],
  [76, 120, '얼굴 둘레', 'sym', '76세부터는 얼굴 둘레를 두 해에 한 자리씩 돌아가며 봅니다. 전체의 균형이 곧 운입니다.']
];
function yunOf(age, parts) {
  const y = YUN.find(r => age >= r[0] && age <= r[1]) || YUN[YUN.length - 1], p = y[3] ? parts.find(x => x.key === y[3]) : null;
  return { name: y[2], lead: y[4], q: p ? p.q : null, key: y[3] };
}
const grade = q => q == null ? ['자리만 안내', 'gmid'] : q > .5 ? ['힘 받는 해', 'gup'] : q < -.5 ? ['관리하는 해', 'gdn'] : ['무난한 해', 'gmid'];

/* ----- 사주와 겹쳐 읽기: 얼굴의 오행형과 일간·필요한 기운의 생극 ----- */
function sajuLink(f) {
  const sj = S.saju; if (!sj || !sj.P) return null;
  const d = sj.P.day.sEl, n = sj.need, gen = a => (a + 1) % 5, ctl = a => (a + 2) % 5, E = EL;
  let a;
  if (f === d) a = '얼굴도 ' + E[f] + ', 타고난 일간도 ' + E[d] + '입니다. 안팎이 같은 기운이라 겉과 속이 같고 색이 뚜렷합니다. 넘치기 쉬우니 반대 기운으로 덜어 내면 좋습니다.';
  else if (gen(f) === d) a = '얼굴의 ' + jo(E[f], '이', '가') + ' 일간 ' + jo(E[d], '을', '를') + ' 낳아 줍니다. 겉모습과 첫인상이 나를 도와주는 배합이라 사람 덕, 윗사람 덕을 보기 쉽습니다.';
  else if (gen(d) === f) a = '일간 ' + jo(E[d], '이', '가') + ' 얼굴의 ' + jo(E[f], '을', '를') + ' 낳습니다. 속에 있는 것을 밖으로 잘 드러내는 배합으로 표현력과 재주가 얼굴에 실립니다. 기운을 많이 쓰니 쉬는 날을 따로 챙기세요.';
  else if (ctl(f) === d) a = '얼굴의 ' + jo(E[f], '이', '가') + ' 일간 ' + jo(E[d], '을', '를') + ' 누릅니다. 겉으로 보이는 모습이 속마음보다 엄격해서 책임을 맡기 쉽고 스스로를 단련하는 배합입니다. 긴장을 푸는 시간이 필요합니다.';
  else a = '일간 ' + jo(E[d], '이', '가') + ' 얼굴의 ' + jo(E[f], '을', '를') + ' 다스립니다. 현실 감각과 실속이 얼굴에 드러나는 배합으로 일과 재물을 다루는 힘이 좋습니다.';
  let b = '', fit = 0;
  if (n != null && n >= 0) {
    if (f === n) { b = '사주에서 보완이 필요한 ' + E[n] + ' 기운이 얼굴에 실려 있어, 타고난 부족을 생김새가 채워 주는 좋은 짝입니다.'; fit = 2; }
    else if (gen(f) === n) { b = '얼굴의 기운이 사주에 필요한 ' + jo(E[n], '을', '를') + ' 낳아 주어 간접적으로 보탭니다.'; fit = 1; }
    else if (ctl(f) === n) { b = '다만 얼굴의 기운이 사주에 필요한 ' + jo(E[n], '을', '를') + ' 누르는 쪽이라, 생활에서 ' + E[n] + ' 기운을 의식해서 채우면 좋습니다.' + (typeof EL_TIP !== 'undefined' && EL_TIP[n] ? ' ' + EL_TIP[n][1] : ''); fit = -1; }
    else b = '사주에 필요한 ' + E[n] + ' 기운과는 얼굴이 직접 부딪히지 않습니다.';
  }
  return { a, b, fit, d, n };
}

function read(m) {
  const z = m.z, sh = shapeOf(z), parts = partsOf(m), P = k => parts.find(x => x.key === k).q;
  const b = (...k) => k.includes(sh.main) ? 3 : 0, sc = x => Math.round(clamp(74 + x, 52, 98));
  const luck = [
    ['재물', sc(5 * z.nw + 3 * z.nl + 2 * z.mw + 3 * z.ch + b(2, 4)), '돈이 새는 구멍을 막는 기록 습관'],
    ['대인', sc(5 * z.lift + 3 * z.eo + 2 * z.lt + 3 * z.eg + 3 * z.ig + b(4)), '먼저 연락하고 표정을 여는 작은 노력'],
    ['추진력', sc(5 * z.jr - 4 * z.be + 4 * z.et + 3 * z.ba + 2 * z.nl + b(3, 0)), '작더라도 마감이 있는 목표를 세우는 일'],
    ['애정', sc(4 * z.lt + 3 * z.eo + 4 * z.lift + 4 * z.gm + b(1)), '마음을 말로 꺼내는 연습'],
    ['말년', sc(5 * z.ch - 3 * z.zr + 3 * z.jr + 3 * z.jc + 3 * z.ph + b(2)), '건강과 저축처럼 오래 가는 것에 미리 들이는 투자']
  ];
  const total = Math.round(clamp(70 + 9 * parts.reduce((s, p) => s + clamp(p.q, -1.5, 1.5), 0) / parts.length + luck.reduce((s, l) => s + l[1] - 74, 0) / 10, 50, 97));
  const link = sajuLink(sh.main);
  const yNow = new Date().getFullYear(), age = S.user && S.user.y ? yNow - S.user.y + 1 : 0;
  const years = age > 0 ? [0, 1, 2, 3, 4].map(i => Object.assign({ year: yNow + i, age: age + i }, yunOf(age + i, parts))) : [];
  return { sh, parts, luck, total, link, age, years };
}

/* ----- 화면 ----- */
const DIAGRAM = '<svg viewBox="0 0 560 400" role="img" aria-label="관상에서 보는 부위"><ellipse class="ft" cx="280" cy="200" rx="122" ry="162"/><path class="ft" d="M208 158q28-16 52 0M300 158q28-16 52 0"/><path class="ft" d="M214 186q21-13 42 0q-21 11-42 0zM304 186q21-13 42 0q-21 11-42 0z"/><path class="ft" d="M280 186v60M263 250q17 11 34 0"/><path class="ft" d="M246 292q34 15 68 0M246 292q34 28 68 0"/><path class="ax" d="M124 150h312M124 256h312M124 362h312"/><text x="70" y="104">상정</text><text x="70" y="208">중정</text><text x="70" y="314">하정</text><text x="446" y="162">눈썹 · 형제궁</text><text x="446" y="192">눈 · 감찰관</text><text x="446" y="250">코 · 재백궁</text><text x="446" y="304">입 · 출납관</text><text x="446" y="366">턱 · 지각</text></svg>';
const sig = x => (x > 0 ? '+' : '') + x.toFixed(1);
function resultHTML() {
  const r = F.res.r, m = F.res.m, S5 = SHAPE[r.sh.main], word = r.total >= 85 ? '아주 좋음' : r.total >= 75 ? '좋음' : r.total >= 65 ? '무난' : '보완 필요';
  const bar = (n, v) => '<div class="sbar"><span>' + n + '</span><span class="trk"><i style="--w:' + v + '%"></i></span><b data-count="' + v + '">' + v + '</b></div>';
  const hero = '<div class="hero"><div class="arch"><small>얼굴의 오행</small><h2 class="c' + r.sh.main + '">' + S5[0] + ' ' + S5[1] + '</h2><span>' + (r.sh.sub >= 0 ? SHAPE[r.sh.sub][0] + '이 섞인 겸형' : S5[2]) + '</span></div>' +
    '<div class="ring" id="fRing" style="--p:' + r.total + '"><div><b data-count="' + r.total + '">' + r.total + '</b><small>관상 총점 · ' + word + '</small></div></div><div class="sbars">' + r.luck.map(l => bar(l[0], l[1])).join('') + '</div></div>';
  const it = (t, sub, body, tag, why) => '<div class="it"><b>' + t + '</b>' + (tag ? '<span class="tag ' + tag[1] + '">' + tag[0] + '</span>' : '') + (sub ? ' <span class="note">' + sub + '</span>' : '') + '<p>' + body + '</p>' + (why ? '<small>측정: ' + why + '</small>' : '') + '</div>';
  const tagOf = q => q > .5 ? ['강점', 'gup'] : q < -.5 ? ['보완', 'gdn'] : ['보통', 'gmid'];
  const why = p => p.keys.map(k => REF[k][0] + ' ' + sig(m.z[k]) + 'σ').join(' · ');
  const shapeTxt = S5[3] + (r.sh.sub >= 0 ? ' ' + SHAPE[r.sh.sub][0] + '의 기운이 섞여 있어 ' + SHAPE[r.sh.sub][2] + '의 성향도 함께 나타납니다.' : '');
  const free = '<div class="block"><h3>얼굴형 · 오행형</h3><div class="read">' + it(S5[0], S5[2], shapeTxt, null, ['fr', 'jr', 'jc'].map(k => REF[k][0] + ' ' + sig(m.z[k]) + 'σ').join(' · ')) + '</div></div>' +
    (r.link ? '<div class="block"><h3>사주와 겹쳐 보기 · 일간 ' + elSpanSafe(r.link.d) + ' × 얼굴 ' + elSpanSafe(r.sh.main) + '</h3><div class="panel block"><p>' + r.link.a + '</p>' + (r.link.b ? '<p>' + r.link.b + '</p>' : '') + (S.user && S.user.example ? '<p class="note">지금은 예시 사주 기준입니다. 내 생년월일을 넣으면 내 사주와 겹쳐 읽습니다.</p>' : '') + '</div></div>' : '');
  const strong = r.parts.filter(p => p.q > .5).sort((a, b) => b.q - a.q), weak = r.parts.filter(p => p.q < -.5).sort((a, b) => a.q - b.q);
  const top = [...r.luck].sort((a, b) => b[1] - a[1]), y0 = r.years[0];
  const sum = ['<p>' + S5[0] + (r.sh.sub >= 0 ? '에 ' + SHAPE[r.sh.sub][0] + '이 섞인' : '의') + ' 얼굴이고 관상 총점은 ' + r.total + '점입니다. ' + (strong.length ? '가장 잘 갖춰진 자리는 ' + strong.slice(0, 3).map(p => p.title).join(', ') + '입니다. ' : '어느 한 부위가 튀기보다 전체가 고른 상입니다. ') + '다섯 가지 운에서는 ' + top[0][0] + '(' + top[0][1] + ')이 가장 강하고 ' + top[1][0] + '(' + top[1][1] + ')이 뒤를 받칩니다.</p>',
    '<p>' + (weak.length ? '보완할 자리는 ' + weak.slice(0, 2).map(p => p.title).join(', ') + '입니다. ' : '') + '상대적으로 약한 ' + top[4][0] + '운(' + top[4][1] + ')은 ' + jo(top[4][2], '이', '가') + ' 채워 줍니다.' + (r.link ? ' 사주와는 ' + (r.link.fit > 0 ? '서로 보태는 짝입니다.' : r.link.fit < 0 ? '필요한 기운을 따로 챙겨야 하는 짝입니다.' : '무난하게 어울립니다.') : '') + '</p>',
    y0 ? '<p>올해 ' + y0.age + '세는 ' + y0.name + '의 자리이고 ' + (y0.q == null ? '사진으로 재기 어려운 자리라 빛깔과 살집으로 봐야 합니다.' : '사진으로는 ' + grade(y0.q)[0] + '로 읽습니다.') + '</p>' : '',
    '<p><b>마의상법은 생김새가 좋은 것이 몸 좋은 것만 못하고, 몸 좋은 것이 마음 좋은 것만 못하다고 했습니다. 표정과 기색이 골격보다 운을 더 크게 바꿉니다.</b></p>'].join('');
  const yun = r.years.length ? '<div class="block"><h3>나이의 자리 · 올해 ' + r.age + '세(세는나이)</h3><div class="panel block"><p>' + y0.lead + ' ' + (y0.q == null ? '정면 사진으로는 재기 어려워 점수는 매기지 않습니다. 이 자리는 살집과 빛깔로 보며, 맑고 밝으면 좋게 읽습니다.' : y0.q > .5 ? '이 자리가 잘 갖춰져 있어 올해는 힘을 받는 해로 읽습니다.' : y0.q < -.5 ? '이 자리가 약한 편이라 올해는 무리한 확장보다 관리에 무게를 두라고 읽습니다.' : '이 자리가 무난해 올해는 큰 기복 없이 가는 해로 읽습니다.') + '</p>' +
    '<div class="fyear">' + r.years.map(y => { const g = grade(y.q); return '<div><span>' + y.year + ' · ' + y.age + '세</span><span>' + y.name + '</span><span class="tag ' + g[1] + '">' + g[0] + '</span></div>'; }).join('') + '</div><p class="note">나이별 자리는 마의상법의 유년운기부위가를 따랐고, 평가는 이번 사진의 측정값 기준입니다.</p></div></div>' : '';
  const tbl = '<details class="block"><summary class="note">측정값 보기</summary><div class="ftbl"><table><thead><tr><th>항목</th><th>측정</th><th>기준</th><th>편차</th></tr></thead><tbody>' + Object.keys(REF).map(k => '<tr><td>' + REF[k][0] + '</td><td>' + m.v[k].toFixed(3) + '</td><td>' + REF[k][1].toFixed(3) + '</td><td>' + sig(m.z[k]) + 'σ</td></tr>').join('') + '</tbody></table></div></details>';
  const inner = '<div class="block"><h3>부위별 풀이 · 삼정, 오관, 십이궁</h3><div class="read">' + r.parts.map(p => it(p.title, p.sub, p.text, tagOf(p.q), why(p))).join('') + '</div></div>' + yun +
    '<div class="block"><h3>종합의견</h3><div class="panel block sum">' + sum + '</div></div>' + tbl;
  const locked = !S.premium;
  return hero + free + '<div class="lock' + (locked ? ' locked' : '') + '"><div class="inner">' + inner + '</div><div class="gate"><span>부위별 풀이, 나이의 자리, 종합의견은 사주를 열면 함께 열립니다</span><button type="button" class="goldbtn" id="fUnlock">열기</button></div></div>';
}
function elSpanSafe(i) { return typeof elSpan === 'function' ? elSpan(i, EL[i] + EL_H[i]) : EL[i]; }

function renderFace() {
  const v = $('v-face'); if (!v) return;
  const has = !!F.res;
  v.innerHTML = '<div class="block"><h2>관상</h2><h3>정면 사진 한 장으로 얼굴 비율을 재고 사주와 겹쳐 읽습니다</h3></div>' +
    '<div class="panel fstage" id="fStage">' + (has ? '' : DIAGRAM) + '</div>' +
    '<div class="row"><label class="primary flbl" aria-disabled="' + F.busy + '">' + (has ? '다시 찍기' : '지금 찍기') + '<input type="file" id="fShot" accept="image/*" capture="user"></label><label class="ghost flbl" aria-disabled="' + F.busy + '">' + (has ? '다른 사진' : '사진 고르기') + '<input type="file" id="fPick" accept="image/*"></label></div>' +
    '<p class="note' + (F.err ? ' warn' : '') + '" id="fMsg" role="status" aria-live="polite">' + F.msg + '</p>' +
    (has ? resultHTML() : '<ul class="ftips note"><li>카메라를 눈높이에 두고 정면을 봅니다. 고개가 돌아가면 비율이 틀어집니다.</li><li>무표정이 가장 정확합니다. 웃으면 입과 눈 수치가 달라집니다.</li><li>앞머리와 안경이 눈썹을 가리지 않게 하고, 조명은 얼굴 정면에서 밝게 합니다.</li></ul>') +
    '<p class="note">사진은 이 기기 안에서만 분석하고 저장하거나 전송하지 않습니다. 이마와 귀, 광대의 높이, 피부 빛깔은 정면 사진으로 재지 않습니다. 관상 풀이는 오락·참고용입니다.</p>';
  if (has && F.cv) $('fStage').appendChild(F.cv);
}
function say(t, err) { F.msg = t || ''; F.err = !!err; const e = $('fMsg'); if (e) { e.textContent = F.msg; e.classList.toggle('warn', F.err); } }
function setBusy(b) { F.busy = b; document.querySelectorAll('#v-face .flbl').forEach(l => l.setAttribute('aria-disabled', b)); }

function draw(src, P, m, r) {
  const xs = P.map(q => q.x), ys = P.map(q => q.y), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const side = Math.max(x1 - x0, y1 - y0) * 1.75, sx = (x0 + x1) / 2 - side / 2, sy = (y0 + y1) / 2 - (y1 - y0) * .12 - side / 2 + side * .09, sw = side, sh = side * .82;
  const cv = document.createElement('canvas'), ctx = cv.getContext('2d'); cv.width = 840; cv.height = Math.round(840 * sh / sw);
  cv.setAttribute('aria-label', '측정선을 그린 얼굴 사진');
  const k = cv.width / sw, L = P.map(q => ({ x: (q.x - sx) * k, y: (q.y - sy) * k }));
  const u = { x: Math.cos(m.angle), y: Math.sin(m.angle) }, n = { x: -u.y, y: u.x }, W = Math.hypot(L[16].x - L[0].x, L[16].y - L[0].y), c0 = L[27];
  const level = q => { const t = (q.x - c0.x) * n.x + (q.y - c0.y) * n.y; return { x: c0.x + n.x * t, y: c0.y + n.y * t }; };
  const along = (c, t) => ({ x: c.x + u.x * t, y: c.y + u.y * t });
  const lines = [level({ x: (L[19].x + L[24].x) / 2, y: (L[19].y + L[20].y + L[23].y + L[24].y) / 4 }), level(L[33]), level(L[8])];
  const polys = [[0, 16, 0], [17, 21, 0], [22, 26, 0], [27, 30, 0], [31, 35, 0], [36, 41, 1], [42, 47, 1], [48, 59, 1]];
  const mid = (a, b) => ({ x: (L[a].x + L[b].x) / 2, y: (L[a].y + L[b].y) / 2 });
  const spot = { ig: [mid(21, 22)], brow: [L[19], L[24]], eye: [mid(36, 39), mid(42, 45)], nose: [r.years[0] && r.years[0].name === '콧대' ? mid(28, 29) : L[30]], ph: [mid(33, 51)], mouth: [mid(62, 66)], chin: [L[8]] }[r.years[0] && r.years[0].key] || [];
  const serif = getComputedStyle(document.documentElement).getPropertyValue('--serif') || 'serif';
  const t0 = performance.now(), dur = (typeof reduceMotion !== 'undefined' && reduceMotion) ? 0 : 1300;
  function frame(now) {
    const f = dur ? Math.min(1, (now - t0) / dur) : 1;
    ctx.fillStyle = '#12152a'; ctx.fillRect(0, 0, cv.width, cv.height); ctx.drawImage(src, sx, sy, sw, sh, 0, 0, cv.width, cv.height);
    ctx.fillStyle = 'rgba(12,14,32,.34)'; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.lineWidth = 2; ctx.lineJoin = 'round'; ctx.strokeStyle = '#e9cd8c'; ctx.setLineDash([]);
    polys.forEach(([a, b, close], pi) => {
      const g = clamp(f * 1.6 - pi * .07, 0, 1); if (!g) return;
      const upto = Math.floor(g * (b - a + close)); ctx.beginPath(); ctx.moveTo(L[a].x, L[a].y);
      for (let i = 1; i <= upto; i++) { const q = L[a + (i % (b - a + 1))]; ctx.lineTo(q.x, q.y); }
      ctx.stroke();
    });
    if (f > .45) {
      const g = Math.min(1, (f - .45) / .55);
      ctx.setLineDash([8, 7]); ctx.strokeStyle = '#ff8468';
      lines.forEach(c => { const a = along(c, -W * .62 * g), b = along(c, W * .62 * g); ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
      ctx.setLineDash([]);
      if (g === 1) {
        ctx.font = '900 26px ' + serif; ctx.textBaseline = 'middle'; ctx.textAlign = 'right'; ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 4;
        [['중정', 0, 1], ['하정', 1, 2]].forEach(([t, i, j]) => { const q = along({ x: (lines[i].x + lines[j].x) / 2, y: (lines[i].y + lines[j].y) / 2 }, -W * .62); ctx.strokeText(t, q.x - 10, q.y); ctx.fillText(t, q.x - 10, q.y); });
        ctx.strokeStyle = '#ffd76a'; ctx.lineWidth = 3;
        spot.forEach(q => { ctx.beginPath(); ctx.arc(q.x, q.y, W * .055, 0, Math.PI * 2); ctx.stroke(); });
        if (spot.length) { ctx.textAlign = 'left'; ctx.font = '500 22px ' + serif; ctx.fillStyle = '#ffd76a'; ctx.strokeStyle = 'rgba(0,0,0,.6)'; ctx.lineWidth = 4; const q = spot[spot.length - 1]; ctx.strokeText('올해의 자리', q.x + W * .07, q.y); ctx.fillText('올해의 자리', q.x + W * .07, q.y); }
      }
    }
    if (f < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  return cv;
}

async function handle(file) {
  if (!file || F.busy) return;
  setBusy(true); say('얼굴을 찾는 중입니다. 처음에는 몇 초 걸립니다.');
  try {
    await loadModels();
    const c = await toCanvas(file);
    let dets = await faceapi.detectAllFaces(c, new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: .3 })).withFaceLandmarks();
    if (!dets.length) dets = await faceapi.detectAllFaces(c, new faceapi.TinyFaceDetectorOptions({ inputSize: 320, scoreThreshold: .25 })).withFaceLandmarks();
    if (!dets.length) { say('얼굴을 찾지 못했습니다. 밝은 곳에서 얼굴이 화면의 절반쯤 차도록 정면으로 다시 찍어 주세요.', true); return; }
    dets.sort((a, b) => b.detection.box.area - a.detection.box.area);
    const P = dets[0].landmarks.positions.map(q => ({ x: q.x, y: q.y })), m = measure(P), r = read(m);
    F.res = { m, r, P, src: c }; F.cv = draw(c, P, m, r);
    F.msg = m.yaw > .13 ? '고개가 한쪽으로 돌아가 있어 정확도가 떨어집니다. 정면 사진으로 다시 보면 결과가 달라질 수 있습니다.' : dets.length > 1 ? '여러 얼굴 중 가장 크게 찍힌 얼굴을 봤습니다.' : ''; F.err = m.yaw > .13;
    F.busy = false; renderFace();
    const v = $('v-face'); v.classList.remove('enter'); void v.offsetWidth; v.classList.add('enter');
    if (typeof countUp === 'function') countUp(v);
    if (r.total >= 80 && typeof fx !== 'undefined') setTimeout(() => fx.burst($('fRing'), 50), 1100);
    $('fStage').scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (e) {
    say(e && e.message === 'lib' ? '얼굴 인식 엔진을 불러오지 못했습니다. 잠시 뒤 다시 시도해 주세요.' : e && e.message === 'img' ? '이 사진 파일을 열 수 없습니다. JPG나 PNG 사진으로 다시 시도해 주세요.' : '분석 중 오류가 났습니다. 다른 사진으로 다시 시도해 주세요.', true);
    if (window.console) console.error(e);
  } finally { setBusy(false); }
}
/* 사주가 바뀌거나 잠금이 풀리면 측정값은 그대로 두고 풀이만 다시 만든다 */
function refresh() { if (F.res) { F.res.r = read(F.res.m); F.cv = draw(F.res.src, F.res.P, F.res.m, F.res.r); } renderFace(); }

document.addEventListener('change', e => { if (e.target.id === 'fShot' || e.target.id === 'fPick') { const f = e.target.files[0]; e.target.value = ''; handle(f); } });
document.addEventListener('click', e => { const t = e.target.closest('#fUnlock'); if (t && typeof openPay === 'function') openPay(); });
function faceRoute() {
  if (location.hash !== '#face') return;
  document.querySelectorAll('section.view').forEach(s => s.classList.toggle('on', s.id === 'v-face'));
  document.querySelectorAll('nav a').forEach(a => a.dataset.v === 'face' ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  refresh();
}
window.addEventListener('hashchange', faceRoute);
const pay = $('pay'); if (pay) pay.addEventListener('close', () => setTimeout(() => { if (location.hash === '#face') refresh(); }, 0));
window.FaceRead = { measure, read, state: F };
setTimeout(() => { renderFace(); faceRoute(); }, 0);
})();
