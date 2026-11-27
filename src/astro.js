/* ===== 별자리(서양 점성술) 계산 =====
   행성 위치: JPL의 근사 궤도 요소(1800~2050년, 오차 1도 미만)로 태양 중심 좌표를 구해 지구 중심 황경으로 바꾼다. 달: Meeus의 주요 항 13개(오차 약 0.1도).
   황경은 그날의 춘분점 기준(회귀 황도대)이다. 상승궁과 중천은 태어난 시각과 위도·경도가 있을 때만 구한다. */
const AST_EL = [   // a, e, I, L, 근일점 황경, 승교점 황경 (J2000 값, 100년당 변화)
  [0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593, 0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081],
  [0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255, 0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418],
  [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0, 0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
  [1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891, 0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
  [5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909, -0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
  [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448, -0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794],
  [19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503, -0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589],
  [30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574, 0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664],
  [39.48211675, 0.24882730, 17.14001206, 238.92903833, 224.06891629, 110.30393684, -0.00031596, 0.00005170, 0.00004818, 145.20780515, -0.04062942, -0.01183482]
];
const aRad = Math.PI / 180, aNorm = x => ((x % 360) + 360) % 360;
function astHelio(i, T) {
  const E0 = AST_EL[i], v = k => E0[k] + E0[k + 6] * T;
  const a = v(0), e = v(1), I = v(2) * aRad, L = v(3), wb = v(4), Om = v(5), w = (wb - Om) * aRad, O = Om * aRad;
  const M = aNorm(L - wb) * aRad; let E = M;
  for (let k = 0; k < 8; k++) E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
  const x = a * (Math.cos(E) - e), y = a * Math.sqrt(1 - e * e) * Math.sin(E);
  const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
  return [(cw * cO - sw * sO * cI) * x + (-sw * cO - cw * sO * cI) * y, (cw * sO + sw * cO * cI) * x + (-sw * sO + cw * cO * cI) * y, sw * sI * x + cw * sI * y];
}
/* ms(세계시) → 황경 10개: 태양, 달, 수성, 금성, 화성, 목성, 토성, 천왕성, 해왕성, 명왕성 */
function astLongs(ms) {
  const jd = ms / 86400000 + 2440587.5, T = (jd - 2451545) / 36525, prec = 1.396971 * T + 0.0003086 * T * T;
  const ea = astHelio(2, T), out = [];
  out[0] = aNorm(Math.atan2(-ea[1], -ea[0]) / aRad + prec);
  const D = (297.8501921 + 445267.1114034 * T) * aRad, M = (357.5291092 + 35999.0502909 * T) * aRad, Mp = (134.9633964 + 477198.8675055 * T) * aRad, F = (93.2720950 + 483202.0175233 * T) * aRad;
  out[1] = aNorm(218.3164477 + 481267.88123421 * T + 6.288774 * Math.sin(Mp) + 1.274027 * Math.sin(2 * D - Mp) + 0.658314 * Math.sin(2 * D) + 0.213618 * Math.sin(2 * Mp) - 0.185116 * Math.sin(M) - 0.114332 * Math.sin(2 * F)
    + 0.058793 * Math.sin(2 * D - 2 * Mp) + 0.057066 * Math.sin(2 * D - M - Mp) + 0.053322 * Math.sin(2 * D + Mp) + 0.045758 * Math.sin(2 * D - M) - 0.040923 * Math.sin(M - Mp) - 0.034720 * Math.sin(D) - 0.030383 * Math.sin(M + Mp));
  [0, 1, 3, 4, 5, 6, 7, 8].forEach((p, k) => { const h = astHelio(p, T); out[k + 2] = aNorm(Math.atan2(h[1] - ea[1], h[0] - ea[0]) / aRad + prec); });
  return out;
}
/* 상승궁과 중천. lat 북위 +, lon 동경 + */
function astAngles(ms, lat, lon) {
  const jd = ms / 86400000 + 2440587.5, T = (jd - 2451545) / 36525, eps = (23.4392911 - 0.0130042 * T) * aRad;
  const ramc = aNorm(280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933 * T * T + lon) * aRad, ph = lat * aRad;
  const asc = aNorm(Math.atan2(Math.cos(ramc), -(Math.sin(ramc) * Math.cos(eps) + Math.tan(ph) * Math.sin(eps))) / aRad);
  const mc = aNorm(Math.atan2(Math.sin(ramc), Math.cos(ramc) * Math.cos(eps)) / aRad);
  return { asc, mc };
}

/* ===== 풀이 표 ===== 원소: 0 불, 1 흙, 2 공기, 3 물 / 양식: 0 활동, 1 고정, 2 변통 */
const ZOD = [['양자리', 'Aries', '♈', 0, 0], ['황소자리', 'Taurus', '♉', 1, 1], ['쌍둥이자리', 'Gemini', '♊', 2, 2], ['게자리', 'Cancer', '♋', 3, 0], ['사자자리', 'Leo', '♌', 0, 1], ['처녀자리', 'Virgo', '♍', 1, 2],
  ['천칭자리', 'Libra', '♎', 2, 0], ['전갈자리', 'Scorpio', '♏', 3, 1], ['사수자리', 'Sagittarius', '♐', 0, 2], ['염소자리', 'Capricorn', '♑', 1, 0], ['물병자리', 'Aquarius', '♒', 2, 1], ['물고기자리', 'Pisces', '♓', 3, 2]];
const zName = i => ZOD[i][EN ? 1 : 0];
const A_EL = T(['불', '흙', '공기', '물'], ['Fire', 'Earth', 'Air', 'Water']), A_MODE = T(['활동궁', '고정궁', '변통궁'], ['Cardinal', 'Fixed', 'Mutable']);
const A_PL = T(['태양', '달', '수성', '금성', '화성', '목성', '토성', '천왕성', '해왕성', '명왕성'], ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto']);
const A_GL = ['☉', '☽', '☿', '♀', '♂', '♃', '♄', '♅', '♆', '♇'];
const A_SUN = EN ? [
  'You come alive when you start something. Courage and directness are your core, and you learn by acting first. Finishing what you begin is the lifelong lesson.',
  'You build slowly and keep what you build. Steadiness, taste and loyalty are your core. Your lesson is to move before comfort turns into stubbornness.',
  'You live through curiosity and conversation. Quick, versatile and witty, you connect ideas and people. Your lesson is depth: staying with one thing long enough.',
  'You protect what you love. Memory, care and intuition are your core, and home is your base. Your lesson is not to retreat into your shell when hurt.',
  'You are here to shine and to be generous. Pride, warmth and creative force are your core. Your lesson is to lead without needing applause.',
  'You improve whatever you touch. Precision, usefulness and modesty are your core. Your lesson is to stop before self-criticism eats the joy of the work.',
  'You seek balance, beauty and fairness. Tact and partnership are your core, and you see both sides. Your lesson is to decide even when someone may be displeased.',
  'You go all the way in. Intensity, loyalty and the power to transform are your core. Your lesson is to trust and to let go of control.',
  'You need a horizon. Optimism, honesty and the search for meaning are your core. Your lesson is follow-through and tact with the plain truth.',
  'You climb patiently. Responsibility, discipline and ambition are your core, and time works for you. Your lesson is to rest and to let people in.',
  'You think for yourself and for the group. Originality, principle and friendship are your core. Your lesson is closeness: not hiding in ideas.',
  'You feel what others cannot say. Compassion, imagination and faith are your core. Your lesson is boundaries, and turning dreams into form.'
] : [
  '무엇이든 시작할 때 살아나는 사람입니다. 용기와 솔직함이 중심이고, 먼저 움직이며 배웁니다. 시작한 일을 끝까지 가져가는 것이 평생의 숙제입니다.',
  '천천히 쌓고 쌓은 것을 지키는 사람입니다. 꾸준함, 안목, 의리가 중심입니다. 편안함이 고집으로 굳기 전에 움직이는 것이 숙제입니다.',
  '호기심과 대화로 사는 사람입니다. 빠르고 다재다능하며 생각과 사람을 잇습니다. 한 가지에 오래 머무는 깊이가 숙제입니다.',
  '아끼는 것을 지키는 사람입니다. 기억, 보살핌, 직감이 중심이고 집이 기반입니다. 상처받았을 때 껍질 속으로 숨지 않는 것이 숙제입니다.',
  '빛나고 베풀기 위해 온 사람입니다. 자존심, 따뜻함, 창조하는 힘이 중심입니다. 박수가 없어도 이끄는 법이 숙제입니다.',
  '손대는 것마다 더 낫게 만드는 사람입니다. 정확함, 쓸모, 겸손이 중심입니다. 자기 비판이 일의 기쁨을 갉아먹기 전에 멈추는 것이 숙제입니다.',
  '균형과 아름다움, 공정함을 찾는 사람입니다. 배려와 동반자 관계가 중심이고 양쪽을 다 봅니다. 누군가 싫어하더라도 결정하는 것이 숙제입니다.',
  '끝까지 들어가는 사람입니다. 강렬함, 의리, 바닥에서 다시 일어서는 힘이 중심입니다. 믿고 놓아 주는 것이 숙제입니다.',
  '먼 곳이 필요한 사람입니다. 낙관, 정직, 의미를 찾는 마음이 중심입니다. 끝까지 해내는 것과 바른말을 부드럽게 하는 것이 숙제입니다.',
  '참고 오르는 사람입니다. 책임, 절제, 야망이 중심이고 시간이 내 편입니다. 쉬는 것과 사람을 곁에 들이는 것이 숙제입니다.',
  '스스로 생각하고 모두를 위해 생각하는 사람입니다. 독창성, 원칙, 우정이 중심입니다. 생각 뒤에 숨지 않고 가까워지는 것이 숙제입니다.',
  '남이 말하지 못하는 것을 느끼는 사람입니다. 연민, 상상력, 믿음이 중심입니다. 경계를 세우고 꿈을 형태로 만드는 것이 숙제입니다.'
];
const A_MOON = EN ? [
  'Your feelings flare fast and pass fast. You need action and independence to feel safe.', 'You feel safe with routine, good food and physical comfort. Your moods are steady and slow to change.',
  'You process feelings by talking them through. Variety and mental stimulation keep you settled.', 'Your feelings run deep and you remember everything. You need a home and people to care for.',
  'You need warmth, attention and to be appreciated. You give affection generously and with flair.', 'You feel safe when things are in order and you are useful. Worry is how your care shows.',
  'You need harmony and company. Conflict unsettles you more than most, so you smooth things over.', 'Your feelings are intense and private. You need trust that goes all the way down.',
  'You need freedom and something to look forward to. You recover from low moods quickly.', 'You hold your feelings in and feel safe through achievement and self-control.',
  'You need space and friendship. You look at your own feelings from a step away.', 'You absorb the mood around you. You need quiet, music or water to return to yourself.'
] : [
  '감정이 빨리 타오르고 빨리 지나갑니다. 움직이고 스스로 정할 수 있을 때 마음이 놓입니다.', '익숙한 일상, 맛있는 음식, 몸의 편안함에서 안정을 느낍니다. 기분이 꾸준하고 천천히 바뀝니다.',
  '감정을 말로 풀어야 정리됩니다. 변화와 지적 자극이 있어야 마음이 편합니다.', '감정이 깊고 무엇이든 기억합니다. 집과 돌볼 사람이 있어야 합니다.',
  '따뜻함과 관심, 인정이 필요합니다. 애정을 넉넉하고 화려하게 줍니다.', '정돈되어 있고 내가 쓸모 있을 때 마음이 놓입니다. 걱정이 곧 사랑의 표현입니다.',
  '조화와 함께할 사람이 필요합니다. 갈등에 남보다 크게 흔들려 먼저 분위기를 풉니다.', '감정이 강하고 속에 감춥니다. 바닥까지 믿을 수 있는 관계가 필요합니다.',
  '자유와 기대할 일이 필요합니다. 가라앉아도 금방 회복합니다.', '감정을 안으로 누르고, 성취와 자기 통제로 안정을 찾습니다.',
  '거리와 우정이 필요합니다. 내 감정도 한 걸음 떨어져서 봅니다.', '주변의 기분을 그대로 흡수합니다. 고요함, 음악, 물가에서 자신으로 돌아옵니다.'
];
const A_ASC = EN ? [
  'You come across as direct, energetic and quick to act.', 'You come across as calm, solid and unhurried.', 'You come across as lively, talkative and curious.', 'You come across as gentle, guarded and caring.',
  'You come across as confident, warm and noticeable.', 'You come across as neat, modest and observant.', 'You come across as pleasant, graceful and diplomatic.', 'You come across as intense, reserved and magnetic.',
  'You come across as open, cheerful and frank.', 'You come across as serious, composed and capable.', 'You come across as friendly yet detached, and a little unusual.', 'You come across as soft, dreamy and hard to pin down.'
] : [
  '남에게는 솔직하고 기운차며 행동이 빠른 사람으로 보입니다.', '남에게는 차분하고 듬직하며 서두르지 않는 사람으로 보입니다.', '남에게는 생기 있고 말이 많고 호기심 많은 사람으로 보입니다.', '남에게는 부드럽지만 조심스럽고 잘 챙기는 사람으로 보입니다.',
  '남에게는 당당하고 따뜻하며 눈에 띄는 사람으로 보입니다.', '남에게는 단정하고 겸손하며 관찰력 있는 사람으로 보입니다.', '남에게는 호감 가고 우아하며 사교적인 사람으로 보입니다.', '남에게는 강렬하고 말수 적으며 끌리는 사람으로 보입니다.',
  '남에게는 열려 있고 쾌활하며 솔직한 사람으로 보입니다.', '남에게는 진지하고 침착하며 유능한 사람으로 보입니다.', '남에게는 친근하면서도 거리를 두는, 조금 독특한 사람으로 보입니다.', '남에게는 부드럽고 몽환적이며 속을 알기 어려운 사람으로 보입니다.'
];
const A_KEY = T(['직선적이고 급한', '느긋하고 감각적인', '가볍고 재빠른', '섬세하고 보호하려는', '당당하고 극적인', '꼼꼼하고 실용적인', '조화롭고 세련된', '깊고 집요한', '자유롭고 낙천적인', '절제되고 현실적인', '독창적이고 객관적인', '부드럽고 공감하는'],
  ['direct and impatient', 'unhurried and sensual', 'light and quick', 'sensitive and protective', 'proud and dramatic', 'careful and practical', 'harmonious and refined', 'deep and persistent', 'free and optimistic', 'restrained and realistic', 'original and detached', 'gentle and empathic']);
/* 행성(수성, 금성, 화성, 목성, 토성) × 원소 */
const A_PE = EN ? [
  ['Mind and speech', 'You speak before you finish thinking and go straight to the conclusion.', 'You think in facts and numbers and speak carefully.', 'You link ideas quickly and need to talk to sort them out.', 'You understand by feel and read what is left unsaid.'],
  ['Love and taste', 'You fall quickly and show it openly. You love the chase.', 'You show love through steadiness, touch and practical care.', 'You are drawn by conversation and wit, and need room to breathe.', 'You love deeply and want to merge. You are easily hurt.'],
  ['Drive and anger', 'You act at once and compete to win. Anger is hot and short.', 'You push slowly and do not stop. Anger builds for a long time.', 'You fight with words and strategy. Your energy scatters across many fronts.', 'You move by feeling and act indirectly. Anger stays hidden and lasts.'],
  ['Where luck grows', 'Luck grows when you take the lead and take risks.', 'Luck grows through patient building and real results.', 'Luck grows through people, learning and spreading ideas.', 'Luck grows when you trust your intuition and care for others.'],
  ['Duty and tests', 'Your test is to temper impulse and learn lasting courage.', 'Your test is to carry practical responsibility without becoming rigid.', 'Your test is to give your thinking and relationships structure.', 'Your test is to give your feelings boundaries and face your fears.']
] : [
  ['생각과 말', '생각이 끝나기 전에 말이 나가고 결론부터 말합니다.', '사실과 숫자로 생각하고 신중하게 말합니다.', '생각을 빠르게 잇고, 말로 풀어야 정리됩니다.', '느낌으로 이해하고 말하지 않은 것까지 읽습니다.'],
  ['사랑과 취향', '빨리 빠지고 숨기지 않습니다. 쫓는 과정을 즐깁니다.', '꾸준함과 스킨십, 실질적인 챙김으로 사랑을 보입니다.', '대화와 재치에 끌리고, 숨 쉴 거리가 필요합니다.', '깊이 사랑하고 하나가 되기를 바랍니다. 상처도 쉽게 받습니다.'],
  ['추진력과 분노', '바로 움직이고 이기려고 겨룹니다. 화는 뜨겁고 짧습니다.', '천천히 밀고 멈추지 않습니다. 화는 오래 쌓였다가 납니다.', '말과 전략으로 싸웁니다. 힘이 여러 곳으로 흩어집니다.', '감정으로 움직이고 돌려서 행동합니다. 화를 감추고 오래 품습니다.'],
  ['운이 커지는 곳', '앞장서고 모험할 때 운이 커집니다.', '꾸준히 쌓아 실물로 만들 때 운이 커집니다.', '사람, 배움, 생각을 퍼뜨리는 일에서 운이 커집니다.', '직감을 믿고 남을 돌볼 때 운이 커집니다.'],
  ['책임과 시험', '충동을 다스리고 오래 가는 용기를 배우는 것이 시험입니다.', '굳어지지 않으면서 현실의 책임을 지는 것이 시험입니다.', '생각과 관계에 틀을 세우는 것이 시험입니다.', '감정에 경계를 세우고 두려움을 마주하는 것이 시험입니다.']
];
const A_ELTXT = EN ? [
  ['Fire dominant', 'Enthusiasm, initiative and confidence lead your chart. You burn bright and burn out; pace yourself.', 'Little fire: starting and self-belief take conscious effort. Borrow momentum from deadlines and from energetic people.'],
  ['Earth dominant', 'Practicality, patience and a feel for the material world lead your chart. Guard against getting stuck.', 'Little earth: routine, money and the body need deliberate attention. Small fixed habits ground you.'],
  ['Air dominant', 'Ideas, words and relationships lead your chart. You understand quickly, but feeling and doing can lag behind thinking.', 'Little air: stepping back to see objectively takes effort. Writing things down and asking for other views helps.'],
  ['Water dominant', 'Feeling, empathy and intuition lead your chart. You sense everything; you need boundaries and time alone.', 'Little water: naming your feelings and receiving care take practice. Give your emotions a regular outlet.']
] : [
  ['불이 강함', '열정, 주도성, 자신감이 차트를 이끕니다. 환하게 타오르는 만큼 쉽게 소진되니 속도를 조절하세요.', '불이 적음: 시작하는 힘과 자기 확신을 의식해서 길러야 합니다. 마감과 기운찬 사람에게서 추진력을 빌리세요.'],
  ['흙이 강함', '현실 감각, 인내, 물질을 다루는 힘이 차트를 이끕니다. 한자리에 굳는 것을 조심하세요.', '흙이 적음: 일상의 틀, 돈, 몸 관리에 일부러 신경 써야 합니다. 작은 고정 습관이 중심을 잡아 줍니다.'],
  ['공기가 강함', '생각, 말, 관계가 차트를 이끕니다. 이해는 빠르지만 느끼고 행동하는 것이 생각보다 늦을 수 있습니다.', '공기가 적음: 한 걸음 물러나 객관적으로 보는 데 노력이 듭니다. 적어 두고 다른 사람의 시각을 묻는 것이 도움이 됩니다.'],
  ['물이 강함', '감정, 공감, 직감이 차트를 이끕니다. 무엇이든 느끼는 만큼 경계와 혼자만의 시간이 필요합니다.', '물이 적음: 감정에 이름을 붙이고 보살핌을 받는 데 연습이 필요합니다. 감정을 꺼낼 통로를 정해 두세요.']
];
const A_MODETXT = T(['시작하는 힘이 강합니다. 판을 벌이고 방향을 정하는 데 능하지만 마무리는 남에게 맡기기 쉽습니다.', '지키는 힘이 강합니다. 한번 정하면 끝까지 가지만 바꿔야 할 때 늦습니다.', '맞추는 힘이 강합니다. 변화에 빨리 적응하지만 한 방향을 오래 붙들기 어렵습니다.'],
  ['The power to begin is strong. You open things up and set direction well, but tend to leave the finishing to others.', 'The power to hold is strong. Once decided you go to the end, but you are slow when change is needed.', 'The power to adapt is strong. You adjust quickly to change, but find it hard to hold one direction for long.']);
const A_NOUN = T(['자아', '감정', '생각', '애정', '추진력', '확장', '책임', '변화', '이상', '변혁'], ['identity', 'feeling', 'thinking', 'affection', 'drive', 'expansion', 'responsibility', 'change', 'ideals', 'transformation']);
const A_ASP = [[0, 8, T('합', 'conjunction'), T('하나로 뭉쳐 강하게 드러납니다. 둘을 따로 떼어 쓰기 어렵습니다.', 'fuse and show strongly. It is hard to use one without the other.'), 0],
  [60, 4, T('육분', 'sextile'), T('서로 돕습니다. 쓰려고 마음먹으면 기회가 되는 재능입니다.', 'help each other. A talent that turns into opportunity when you choose to use it.'), 1],
  [90, 6, T('사각', 'square'), T('서로 부딪혀 긴장을 만듭니다. 불편하지만 그 긴장이 성장을 밀어 줍니다.', 'clash and create tension. Uncomfortable, but that tension drives growth.'), -1],
  [120, 6, T('삼분', 'trine'), T('자연스럽게 흐릅니다. 애쓰지 않아도 되는 타고난 재능입니다.', 'flow together naturally. An inborn gift that needs no effort.'), 1],
  [180, 8, T('충', 'opposition'), T('마주 보고 당깁니다. 양쪽을 오가며 균형을 배우게 됩니다.', 'pull from opposite sides. You learn balance by moving between the two.'), -1]];
const A_TR = EN ? [   // 오늘 지나가는 행성이 내 태양·달·상승궁과 맺는 관계
  ['clarity and vitality', 'a clash of will with others'], ['emotional ease', 'moodiness and sensitivity'], ['good news and conversation', 'miscommunication and slips of the tongue'], ['affection, pleasure and small luck with money', 'overindulgence and jealousy'],
  ['energy and courage to act', 'irritation, haste and accidents'], ['opportunity and generosity', 'overconfidence and overpromising'], ['focus and results from steady work', 'pressure, delay and tiredness'], ['a fresh idea or change', 'restlessness and sudden change'], ['inspiration and empathy', 'confusion and vagueness'], ['depth and resolve', 'power struggles and obsession']
] : [
  ['또렷함과 활력', '남과 의지가 부딪힘'], ['마음의 편안함', '기분 기복과 예민함'], ['좋은 소식과 대화', '오해와 말실수'], ['애정, 즐거움, 작은 금전운', '과소비와 질투'],
  ['움직일 힘과 용기', '짜증, 서두름, 사고'], ['기회와 넉넉함', '과신과 무리한 약속'], ['꾸준히 한 일의 결과와 집중', '압박, 지연, 피로'], ['새로운 생각과 변화', '들뜸과 갑작스러운 변동'], ['영감과 공감', '혼란과 흐릿함'], ['깊이와 결단', '주도권 다툼과 집착']
];
const A_LAT = { 'Seoul': 37.57, 'Busan': 35.18, 'Tokyo': 35.68, 'Osaka': 34.69, 'Sapporo': 43.06, 'Fukuoka': 33.59, 'New York': 40.71, 'Boston': 42.36, 'Philadelphia': 39.95, 'Washington, D.C.': 38.91, 'Atlanta': 33.75, 'Miami': 25.76, 'Detroit': 42.33, 'Toronto': 43.65, 'Montreal': 45.50, 'Chicago': 41.88, 'Houston': 29.76, 'Dallas': 32.78, 'San Antonio': 29.42, 'Minneapolis': 44.98, 'Denver': 39.74, 'Calgary': 51.05, 'Phoenix': 33.45, 'Los Angeles': 34.05, 'San Diego': 32.72, 'San Francisco': 37.77, 'San Jose': 37.34, 'Las Vegas': 36.17, 'Portland': 45.52, 'Seattle': 47.61, 'Vancouver': 49.28, 'Anchorage': 61.22, 'Honolulu': 21.31,
  'Beijing': 39.90, 'Shanghai': 31.23, 'Hong Kong': 22.32, 'Taipei': 25.03, 'Manila': 14.60, 'Hanoi': 21.03, 'Ho Chi Minh City': 10.82, 'Bangkok': 13.76, 'Singapore': 1.35, 'Kuala Lumpur': 3.14, 'Jakarta': -6.21, 'Delhi': 28.61, 'Mumbai': 19.08, 'Dubai': 25.20, 'Sydney': -33.87, 'Melbourne': -37.81, 'Perth': -31.95, 'Auckland': -36.85,
  'London': 51.51, 'Dublin': 53.35, 'Lisbon': 38.72, 'Madrid': 40.42, 'Paris': 48.86, 'Amsterdam': 52.37, 'Berlin': 52.52, 'Rome': 41.90, 'Stockholm': 59.33, 'Warsaw': 52.23, 'Athens': 37.98, 'Istanbul': 41.01, 'Moscow': 55.76, 'Cairo': 30.04, 'Lagos': 6.52, 'Nairobi': -1.29, 'Johannesburg': -26.20,
  'Mexico City': 19.43, 'Bogotá': 4.71, 'Lima': -12.05, 'Santiago': -33.45, 'Buenos Aires': -34.60, 'São Paulo': -23.55 };

/* ===== 차트 계산 ===== */
const aSign = x => Math.floor(aNorm(x) / 30), aDeg = x => Math.floor(aNorm(x) % 30);
const aPos = x => zName(aSign(x)) + ' ' + aDeg(x) + '°';
function aAspect(a, b, k) { const d = Math.abs(aNorm(a - b + 180) - 180); for (const A of A_ASP) { const orb = Math.abs(d - A[0]); if (orb <= A[1] * (k || 1)) return { A, orb }; } return null; }
function astroChart() {
  const sj = S.saju, u = S.user, L = astLongs(sj.utc), known = sj.timeKnown;
  const ang = known ? astAngles(sj.utc, u.place && A_LAT[u.place] != null ? A_LAT[u.place] : 37.5, sj.lon) : null;
  const el = [0, 0, 0, 0], mode = [0, 0, 0], w = [3, 3, 2, 2, 2, 1, 1];   // 태양·달 3, 수성·금성·화성 2, 목성·토성 1, 상승궁 3
  w.forEach((x, i) => { const z = ZOD[aSign(L[i])]; el[z[3]] += x; mode[z[4]] += x; });
  if (ang) { const z = ZOD[aSign(ang.asc)]; el[z[3]] += 3; mode[z[4]] += 3; }
  const asp = [];
  for (let i = 0; i < 7; i++) for (let j = i + 1; j < 7; j++) { const r = aAspect(L[i], L[j]); if (r && !(i === 0 && j === 1 && known === false && r.orb > 4)) asp.push({ i, j, A: r.A, orb: r.orb }); }
  asp.sort((a, b) => a.orb - b.orb);
  /* 달은 하루에 13도쯤 움직인다. 시를 모르면 그날 0시와 24시의 달 별자리가 같은지 본다 */
  let moonSure = true;
  if (!known) { const a = aSign(astLongs(sj.utc - 43200000)[1]), b = aSign(astLongs(sj.utc + 43200000)[1]); moonSure = a === b; }
  return { L, ang, el, mode, asp, known, moonSure };
}
function astroToday(ch) {
  const now = Date.now(), Tn = astLongs(now), Tt = astLongs(now + 86400000), pts = [[ch.L[0], A_PL[0]], [ch.L[1], A_PL[1]]];
  if (ch.ang) pts.push([ch.ang.asc, T('상승궁', 'Ascendant')]);
  const hits = []; let score = 62;
  for (let p = 0; p < 10; p++) pts.forEach((q, qi) => {
    if (p === 1 && !ch.moonSure && qi === 1) return;
    const r = aAspect(Tn[p], q[0], p === 1 ? 0.6 : p < 5 ? 0.45 : 0.3); if (!r) return;
    const soft = r.A[4] > 0 || (r.A[4] === 0 && [0, 1, 2, 3, 5].includes(p)), wt = (p === 5 || p === 3 ? 9 : p === 6 || p === 4 || p === 9 ? 8 : 5) * (1 - r.orb / 10);
    score += soft ? wt : -wt; hits.push({ p, q: q[1], A: r.A, orb: r.orb, soft });
  });
  hits.sort((a, b) => a.orb - b.orb);
  const retro = [2, 3, 4, 5, 6].filter(p => aNorm(Tt[p] - Tn[p] + 180) - 180 < 0);
  const ph = aNorm(Tn[1] - Tn[0]), phase = T(['초승달', '상현달', '보름달', '하현달'], ['new moon', 'first quarter', 'full moon', 'last quarter'])[Math.floor(aNorm(ph + 45) / 90) % 4];
  return { Tn, hits, retro, phase, score: Math.round(clamp(score, 28, 96)) };
}

/* ===== 화면 ===== */
function astroHTML() {
  if (!Ads.unlocked('astro')) return '<div class="block"><h2>' + T('별자리', 'Astrology') + TIER.ad + '</h2><h3>' + T('태어난 순간의 하늘로 읽는 서양 점성술', 'Western astrology read from the sky at your birth') + '</h3></div>' +
    '<div class="block"><button type="button" class="fbanner" data-astro-ad><span class="fb-t">' + T('내 별자리 차트 보기', 'See my birth chart') + '</span><span class="fb-l">' + T('태양·달·상승궁 세 기둥 · 열 행성의 자리 · 네 원소와 세 양식의 균형 · 행성끼리의 각도 · 오늘의 별자리 운세와 역행 행성', 'Sun, Moon and Rising · the ten planets by sign · balance of the four elements and three modes · aspects between planets · today\'s transits and retrogrades') + '</span><span class="fb-c">' + TIER.ad + T(' 광고 한 번에 오늘 하루', ' One ad opens it for today') + '</span></button>' + (Ads.msg ? '<p class="note warn">' + Ads.msg + '</p>' : '') + '</div>';
  const ch = astroChart(), L = ch.L, td = astroToday(ch), sun = aSign(L[0]), moon = aSign(L[1]);
  const it = (h, tag, p, why) => '<div class="it"><b>' + h + '</b>' + (tag ? '<span class="tag">' + tag + '</span>' : '') + '<p>' + p + '</p>' + (why ? '<p class="why" style="display:block">' + why + '</p>' : '') + '</div>';
  const big = it(A_GL[0] + ' ' + T('태양 · ', 'Sun · ') + zName(sun), aDeg(L[0]) + '°', T('삶의 중심과 의지. ', 'Your core and will. ') + A_SUN[sun]) +
    it(A_GL[1] + ' ' + T('달 · ', 'Moon · ') + zName(moon), ch.moonSure ? aDeg(L[1]) + '°' : T('추정', 'approx.'), T('감정과 안정의 방식. ', 'Feeling and what makes you safe. ') + A_MOON[moon] + (ch.moonSure ? '' : T(' 태어난 시를 몰라 정오 기준으로 봤습니다. 이날은 달이 별자리를 옮긴 날이라 앞뒤 별자리일 수 있습니다.', ' The birth time is unknown, so noon was used. The Moon changed signs that day, so it may be the neighboring sign.'))) +
    (ch.ang ? it('↑ ' + T('상승궁 · ', 'Rising · ') + zName(aSign(ch.ang.asc)), aDeg(ch.ang.asc) + '°', T('첫인상과 세상을 대하는 태도. ', 'First impression and how you meet the world. ') + A_ASC[aSign(ch.ang.asc)], T('중천(사회적 정점): ', 'Midheaven (public peak): ') + aPos(ch.ang.mc) + (S.user.place ? '' : T(' · 태어난 곳은 한국 중부 위도로 계산', ' · latitude of central Korea assumed')))
      : it('↑ ' + T('상승궁', 'Rising'), '', T('태어난 시를 알아야 구할 수 있습니다. 내 정보에 시를 넣으면 첫인상을 보여 주는 상승궁과 중천이 함께 나옵니다.', 'This needs your birth time. Add it to your details to see your Rising sign and Midheaven.')));
  const pl = [2, 3, 4, 5, 6].map(p => { const z = aSign(L[p]), e = ZOD[z][3], pe = A_PE[p - 2]; return it(A_GL[p] + ' ' + A_PL[p] + ' · ' + zName(z), aDeg(L[p]) + '°', pe[0] + T('. ', '. ') + pe[1 + e] + ' ' + T(zName(z) + '답게 ' + A_KEY[z] + ' 색이 더해집니다.', 'It takes on the ' + A_KEY[z] + ' color of ' + zName(z) + '.')); }).join('') +
    it(T('세대의 행성', 'Generational planets'), '', [7, 8, 9].map(p => A_GL[p] + ' ' + A_PL[p] + ' ' + aPos(L[p])).join(' · ') + T('. 느리게 움직여 같은 세대가 함께 갖는 자리입니다.', '. These move slowly and are shared by your whole generation.'));
  const tot = ch.el.reduce((a, b) => a + b, 0), topE = ch.el.indexOf(Math.max.apply(null, ch.el)), lowE = ch.el.indexOf(Math.min.apply(null, ch.el)), topM = ch.mode.indexOf(Math.max.apply(null, ch.mode));
  const bal = '<div class="panel sbars">' + ch.el.map((n, i) => '<div class="bar c' + [1, 2, 3, 4][i] + '"><span>' + A_EL[i] + '</span><span class="trk"><i style="width:' + (n / tot * 100) + '%"></i></span><b>' + Math.round(n / tot * 100) + '%</b></div>').join('') + '</div>' +
    '<div class="read">' + it(A_ELTXT[topE][0], '', A_ELTXT[topE][1]) + (ch.el[lowE] <= 1 && lowE !== topE ? it(A_EL[lowE] + T(' 원소 보완', ' to develop'), '', A_ELTXT[lowE][2]) : '') + it(A_MODE[topM] + T(' 우세', ' dominant'), '', A_MODETXT[topM]) + '</div>';
  const asp = ch.asp.slice(0, 6).map(a => it(A_GL[a.i] + ' ' + A_PL[a.i] + ' ' + a.A[2] + ' ' + A_GL[a.j] + ' ' + A_PL[a.j], T('오차 ', 'orb ') + a.orb.toFixed(1) + '°', T(A_NOUN[a.i] + ' · ' + A_NOUN[a.j] + ': 두 기운이 ', 'Your ' + A_NOUN[a.i] + ' and ' + A_NOUN[a.j] + ' ') + a.A[3])).join('');
  const good = td.hits.filter(h => h.soft).slice(0, 3), bad = td.hits.filter(h => !h.soft).slice(0, 3);
  const hl = h => A_PL[h.p] + ' ' + h.A[2] + ' ' + T('내 ', 'your ') + h.q;
  const today = '<div class="hero"><div class="arch"><small>' + T('오늘의 달 · ', 'Today\'s Moon · ') + td.phase + '</small><h2 style="font-size:clamp(22px,7vw,30px)">' + ZOD[aSign(td.Tn[1])][2] + ' ' + aPos(td.Tn[1]) + '</h2><span>' + T(A_KEY[aSign(td.Tn[1])] + ' 분위기', 'mood: ' + A_KEY[aSign(td.Tn[1])]) + '</span></div><div class="ring" style="--p:' + td.score + '"><div><b>' + td.score + '</b><small>' + T('오늘의 별자리 운', 'today') + '</small></div></div></div>' +
    '<div class="read">' + (good.length ? it(T('기회', 'Opportunity'), '', T('오늘 힘이 실리는 것: ' + good.map(h => A_TR[h.p][0]).join(', ') + '.', 'Favored today: ' + good.map(h => A_TR[h.p][0]).join(', ') + '.'), good.map(hl).join(' · ')) : '') +
    (bad.length ? it(T('조심', 'Caution'), '', T('오늘 조심할 것: ' + bad.map(h => A_TR[h.p][1]).join(', ') + '.', 'Watch for: ' + bad.map(h => A_TR[h.p][1]).join(', ') + '.'), bad.map(hl).join(' · ')) : '') +
    (!good.length && !bad.length ? it(T('잔잔한 날', 'A quiet day'), '', T('오늘 하늘의 행성이 내 태양·달과 뚜렷한 각을 맺지 않습니다. 달의 분위기를 따라 평소대로 지내면 됩니다.', 'No planet in today\'s sky makes a clear aspect to your Sun or Moon. Go about the day as usual, following the Moon\'s mood.')) : '') +
    it(T('역행 중인 행성', 'Planets in retrograde'), '', td.retro.length ? td.retro.map(p => A_GL[p] + ' ' + A_PL[p]).join(', ') + T(' 역행 중입니다. 이 행성이 맡은 영역(' + td.retro.map(p => A_PE[p - 2][0]).join(', ') + ')에서는 새로 벌이기보다 다시 살피는 편이 낫습니다.', ' in retrograde. In the matters they rule (' + td.retro.map(p => A_PE[p - 2][0].toLowerCase()).join(', ') + '), review rather than start anew.') : T('수성부터 토성까지 역행하는 행성이 없습니다. 미뤄 둔 일을 진행하기 좋습니다.', 'No planet from Mercury to Saturn is retrograde. A good time to move postponed matters forward.')) + '</div>';
  return '<div class="block"><h2>' + T('별자리', 'Astrology') + TIER.ad + '</h2><h3 style="word-break:keep-all">' + T(ZOD[sun][2] + ' ' + zName(sun) + ' 태양 · ' + ZOD[moon][2] + ' ' + zName(moon) + ' 달', ZOD[sun][2] + ' ' + zName(sun) + ' Sun · ' + ZOD[moon][2] + ' ' + zName(moon) + ' Moon') + (ch.ang ? T(' · ' + zName(aSign(ch.ang.asc)) + ' 상승', ' · ' + zName(aSign(ch.ang.asc)) + ' Rising') : '') + '</h3></div>' +
    '<div class="block"><h3>' + T('오늘의 별자리 운세', 'Today\'s transits') + '</h3>' + today + '</div>' +
    '<div class="block"><h3>' + T('세 기둥 · 태양, 달, 상승궁', 'The big three · Sun, Moon, Rising') + '</h3><div class="read">' + big + '</div></div>' +
    '<div class="block"><h3>' + T('행성의 자리', 'Planets by sign') + '</h3><div class="read">' + pl + '</div></div>' +
    '<div class="block"><h3>' + T('네 원소와 세 양식의 균형', 'Balance of elements and modes') + '</h3>' + bal + '</div>' +
    '<div class="block"><h3>' + T('행성끼리의 각도', 'Aspects between planets') + '</h3><div class="read">' + (asp || '<p class="note">' + T('뚜렷한 각을 맺는 행성 쌍이 없습니다.', 'No pair of planets forms a clear aspect.') + '</p>') + '</div>' +
    '<p class="note">' + T('회귀 황도대 기준이고 행성 위치의 오차는 1도 안쪽입니다. 별자리 경계에 걸린 행성은 다른 프로그램과 다르게 나올 수 있습니다. 별자리 풀이는 오락·참고용입니다.', 'Tropical zodiac; planetary positions are accurate to within one degree. A planet on a sign boundary may differ from other software. Astrology readings are for entertainment and reference.') + '</p></div>';
}
function renderAstro() { const v = $('v-astro'); if (v) v.innerHTML = astroHTML(); }
function astroRoute() {
  if (location.hash !== '#astro') return;
  document.querySelectorAll('section.view').forEach(s => s.classList.toggle('on', s.id === 'v-astro'));
  document.querySelectorAll('nav a').forEach(a => a.dataset.v === 'astro' ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  renderAstro();
}
window.addEventListener('hashchange', astroRoute);
document.addEventListener('click', e => { const t = e.target.closest('[data-astro-ad]'); if (!t) return; t.disabled = true; Ads.watch('astro').then(() => { renderAstro(); if (typeof countUp === 'function') countUp($('v-astro')); }); });
