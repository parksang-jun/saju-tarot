/* ===== 풀이 데이터 ===== */
const DAY_TXT = EN ? EN_D.DAY_TXT : [
  ['큰 나무', '곧게 위로 뻗는 성장형입니다. 원칙과 방향이 분명해 앞에 서는 일에 강하고, 한번 정한 길은 잘 굽히지 않습니다. 굽혀야 할 때를 아는 것이 숙제입니다.'],
  ['덩굴과 화초', '환경을 읽고 휘어지며 자라는 적응형입니다. 사람 사이의 결을 잘 읽어 협업과 조율에 강합니다. 기댈 곳을 고르는 안목이 곧 운입니다.'],
  ['한낮의 태양', '숨김없이 드러내는 발산형입니다. 표현력과 추진력이 좋아 사람을 모읍니다. 열이 빨리 오르는 만큼 식히는 시간을 일정에 넣어야 합니다.'],
  ['등불', '한 곳을 오래 밝히는 집중형입니다. 섬세하고 따뜻해 깊이 파는 일과 사람을 돌보는 일에 강합니다. 스스로를 태워 가며 일하지 않도록 연료를 챙겨야 합니다.'],
  ['큰 산', '묵직하게 자리를 지키는 중심형입니다. 믿음직하고 포용력이 커 사람이 기대어 옵니다. 움직임이 늦어 기회를 보내는 일만 조심하면 됩니다.'],
  ['논밭', '씨를 받아 길러 내는 실속형입니다. 꼼꼼하게 챙기고 조율하는 힘이 좋습니다. 남의 일을 떠안다가 내 밭이 묵지 않게 경계를 정하세요.'],
  ['원석과 쇠', '맺고 끊는 결단형입니다. 의리와 실행이 분명해 판을 바꾸는 일에 강합니다. 날이 서 있는 말이 관계를 베지 않게 다듬는 과정이 필요합니다.'],
  ['보석과 칼날', '기준이 높은 정밀형입니다. 완성도와 미감에 예민해 전문 분야에서 빛납니다. 스스로에게 들이대는 잣대를 조금 낮추면 속도가 붙습니다.'],
  ['큰 바다', '넓게 받아들이고 흐르는 지략형입니다. 판 전체를 보는 눈과 융통성이 좋습니다. 벌여 놓은 일의 물길을 하나로 모으는 것이 관건입니다.'],
  ['비와 이슬', '조용히 스며드는 직관형입니다. 감수성과 통찰이 깊어 기획과 연구, 상담에 강합니다. 생각이 고이지 않게 밖으로 흘려보내는 습관이 필요합니다.']
];
const GOD_YEAR = EN ? EN_D.GOD_YEAR : {
  '비견': '내 힘으로 서는 해입니다. 독립, 창업, 홀로서기 같은 주제가 올라옵니다. 동업과 지분 문제는 문서로 분명히 해 두세요.',
  '겁재': '경쟁과 지출이 함께 커지는 해입니다. 사람을 얻는 대신 돈이 나가기 쉽습니다. 보증과 충동 투자는 피하는 편이 좋습니다.',
  '식신': '꾸준히 만든 것이 쌓여 먹거리가 되는 해입니다. 기술, 콘텐츠, 건강 관리에 들인 시간이 그대로 돌아옵니다.',
  '상관': '표현과 변화 욕구가 강해지는 해입니다. 새 시도에는 좋지만 윗사람이나 규정과 부딪히기 쉽습니다. 말보다 결과물로 보여 주세요.',
  '편재': '돈과 기회가 크게 오가는 해입니다. 사업 확장이나 투자 제안이 들어옵니다. 들어오는 폭만큼 나가는 폭도 커지니 한도를 먼저 정하세요.',
  '정재': '성실한 만큼 안정적으로 쌓이는 해입니다. 급여, 저축, 계약처럼 예측 가능한 수입에 유리합니다. 무리한 한 방보다 관리가 이깁니다.',
  '편관': '압박과 책임이 갑자기 실리는 해입니다. 버거운 과제를 넘기면 자리와 권한이 따라옵니다. 체력과 일정에 여유를 남겨 두세요.',
  '정관': '자리와 평판이 정돈되는 해입니다. 승진, 자격, 조직 안의 인정에 유리합니다. 규칙을 지키는 쪽이 결국 이득입니다.',
  '편인': '낯선 공부와 방향 전환이 들어오는 해입니다. 직관이 날카로워지는 대신 생각이 많아집니다. 하나를 골라 끝까지 파 보세요.',
  '정인': '배움과 후원이 따르는 해입니다. 문서, 자격, 윗사람의 도움에 유리합니다. 받기만 하다 실행이 늦어지지 않게 하세요.'
};
const EL_TIP = EN ? EN_D.EL_TIP : [
  ['푸른색과 녹색, 동쪽', '아침 시간, 새 공부, 숲길 걷기처럼 자라나는 기운을 들이세요.'],
  ['붉은색, 남쪽', '사람 앞에 서는 일, 발표, 햇볕 아래 운동으로 밖으로 드러내세요.'],
  ['노란색과 흙빛, 중앙', '정해진 루틴, 정리 정돈, 약속 지키기로 중심을 잡으세요.'],
  ['흰색과 금속빛, 서쪽', '마감 정하기, 끊을 것 끊기, 규칙 세우기로 매듭을 지으세요.'],
  ['검정과 남색, 북쪽', '충분한 잠, 기록, 혼자 생각하는 시간으로 속을 채우세요.']
];
const DAEUN = EN ? EN_D.DAEUN : {
  '비견': ['독립과 자립', '내 힘으로 서려는 마음이 강했던 시기입니다. 독립, 경쟁, 혼자 내린 결정이 많았을 수 있습니다.', '내 이름으로 판을 벌이게 되는 시기입니다. 독립과 자기 사업에 힘이 실리지만 혼자 다 지려 하면 지칩니다.'],
  '겁재': ['경쟁과 나눔', '사람과 돈이 함께 드나들던 시기입니다. 동료나 경쟁자 때문에 얻은 것도 잃은 것도 있었을 수 있습니다.', '사람을 얻고 돈이 나가는 시기입니다. 동업, 보증, 큰 지출은 문서와 한도를 먼저 정해야 합니다.'],
  '식신': ['기술과 생산', '좋아하는 일을 꾸준히 익히고 만들던 시기입니다. 먹고사는 기술의 바탕이 이때 쌓였을 가능성이 큽니다.', '손으로 만든 것이 수입으로 이어지는 시기입니다. 전문성, 콘텐츠, 생활 습관에 들인 만큼 남습니다.'],
  '상관': ['표현과 변화', '틀을 깨고 싶은 마음이 컸던 시기입니다. 진로를 바꾸거나 윗사람과 부딪힌 일이 있었을 수 있습니다.', '재능을 드러내고 방식을 바꾸는 시기입니다. 새 분야 진출에는 좋지만 조직, 규정과의 마찰을 관리해야 합니다.'],
  '편재': ['기회와 확장', '활동 반경이 넓어지고 돈이 크게 오갔던 시기입니다. 벌기도 쓰기도 크게 했을 수 있습니다.', '사업, 투자, 큰 거래의 기회가 들어오는 시기입니다. 판을 키우되 한 번에 거는 금액의 상한을 정해 두세요.'],
  '정재': ['안정과 축적', '성실하게 모으고 생활 기반을 다진 시기입니다. 직장, 가정, 저축 같은 틀이 잡혔을 수 있습니다.', '꾸준한 수입과 자산이 쌓이는 시기입니다. 무리한 확장보다 관리와 계약의 꼼꼼함이 힘이 됩니다.'],
  '편관': ['시험과 압박', '버거운 책임과 압박을 견딘 시기입니다. 힘들었던 만큼 버티는 힘과 실력이 이때 만들어졌을 수 있습니다.', '무거운 과제와 책임이 주어지는 시기입니다. 넘기면 권한과 자리가 오지만 과로와 무리한 승부는 피해야 합니다.'],
  '정관': ['자리와 명예', '조직과 규칙 안에서 자리를 잡은 시기입니다. 진학, 취업, 승진처럼 공식적인 인정을 받았을 수 있습니다.', '직책과 평판이 올라가는 시기입니다. 원칙을 지킬수록 인정받고, 편법은 크게 되돌아옵니다.'],
  '편인': ['탐구와 전환', '남다른 공부나 관심사에 빠졌던 시기입니다. 방향을 여러 번 바꾸며 고민이 많았을 수 있습니다.', '전문 지식과 직관이 깊어지는 시기입니다. 연구, 자격, 새 분야 공부에 좋지만 생각만 하다 때를 놓치기 쉽습니다.'],
  '정인': ['배움과 후원', '공부와 보살핌의 덕을 본 시기입니다. 부모, 스승, 윗사람의 도움이 컸을 수 있습니다.', '문서, 자격, 후원자의 도움이 따르는 시기입니다. 배운 것을 실행으로 옮겨야 결과가 남습니다.']
};
const GOD_CAUTION = EN ? EN_D.GOD_CAUTION : {
  '비견': '동업·지분 다툼, 고집 때문에 끊기는 관계', '겁재': '보증, 돈 빌려주기, 충동 투자와 과소비',
  '식신': '느슨함과 과식·과음, 벌여 놓고 끝내지 않는 일', '상관': '말실수와 구설, 상사·기관과의 충돌, 성급한 퇴사',
  '편재': '무리한 확장과 투기, 큰돈이 오가는 계약', '정재': '몸을 사리다 놓치는 기회, 작은 돈에 얽힌 다툼',
  '편관': '과로, 사고와 부상, 소송이나 강압적인 사람과의 마찰', '정관': '책임 과부하, 체면 때문에 떠안는 일, 규정 위반',
  '편인': '고립과 생각 과잉, 계약서 확인 소홀, 잦은 진로 변경', '정인': '의존과 미루기, 실행 없는 계획, 문서·보증 서명'
};
const PNAME = EN ? EN_D.PNAME : { year: '년지', month: '월지', day: '일지', hour: '시지' };
const PALACE = EN ? EN_D.PALACE : { year: '윗사람과 대외 환경', month: '직장, 부모, 사회적 기반', day: '배우자, 거주, 생활 리듬', hour: '자녀, 아랫사람, 장기 계획' };
const HAP = { 0: 1, 1: 0, 2: 11, 11: 2, 3: 10, 10: 3, 4: 9, 9: 4, 5: 8, 8: 5, 6: 7, 7: 6 };
const HYEONG = [[2, 5], [5, 8], [8, 2], [1, 10], [10, 7], [7, 1], [0, 3]];
const isHyeong = (a, b) => HYEONG.some(p => (p[0] === a && p[1] === b) || (p[0] === b && p[1] === a));
function samjae(natalYearBranch, b) {
  const k = mod(b - { 0: 2, 3: 5, 2: 8, 1: 11 }[natalYearBranch % 4], 12);
  return k < 3 ? T(['들삼재', '눌삼재', '날삼재'], EN_D.SAMJAE)[k] : null;
}
const GOD_DOMAIN = EN ? EN_D.GOD_DOMAIN : ['나 자신과 주도권', '표현과 결과물', '돈과 현실 성과', '책임과 자리', '배움과 후원'];

/* ===== 타로 덱 (78장) ===== */
const ROMAN = ['0','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX','XXI'];
const MAJOR = [
  ['바보','The Fool','愚',0,'가볍게 내딛는 새 출발입니다. 계산보다 호기심이 길을 엽니다.','준비 없이 뛰어드는 무모함을 경계하세요.'],
  ['마법사','The Magician','術',1,'가진 재료로 바로 시작할 수 있습니다. 실행이 답입니다.','재주만 믿고 미루거나 부풀리고 있지 않은지 보세요.'],
  ['여사제','The High Priestess','巫',4,'아직 드러나지 않은 정보가 있습니다. 직관을 믿고 기다리세요.','속마음을 외면하거나 숨기는 것이 문제를 키웁니다.'],
  ['여황제','The Empress','后',0,'가꾼 것이 풍성하게 자랍니다. 돌봄과 결실의 때입니다.','과한 보살핌이나 느슨함이 성장을 막습니다.'],
  ['황제','The Emperor','帝',3,'구조와 책임을 세울 때입니다. 기준을 분명히 하세요.','고집과 통제가 사람을 밀어냅니다.'],
  ['교황','The Hierophant','敎',2,'검증된 방식과 좋은 조언자가 도움이 됩니다.','형식에 갇혀 있다면 틀을 다시 볼 때입니다.'],
  ['연인','The Lovers','戀',1,'끌림이 분명합니다. 가치에 맞는 선택을 하세요.','엇갈린 마음과 우유부단이 관계를 흔듭니다.'],
  ['전차','The Chariot','車',4,'의지로 밀고 나가면 이깁니다. 방향만 놓치지 마세요.','속도는 나는데 방향을 잃었습니다. 고삐를 다시 잡으세요.'],
  ['힘','Strength','力',1,'밀어붙이는 힘보다 부드러운 인내가 통합니다.','조급함과 자기 의심이 힘을 깎습니다.'],
  ['은둔자','The Hermit','隱',2,'혼자 깊이 들여다볼 시간이 필요합니다.','고립이 길어졌습니다. 밖으로 나올 때입니다.'],
  ['운명의 수레바퀴','Wheel of Fortune','輪',0,'흐름이 바뀝니다. 온 기회는 바로 잡으세요.','때가 어긋났습니다. 같은 패턴의 반복을 끊으세요.'],
  ['정의','Justice','義',3,'한 만큼 돌아옵니다. 공정하게 판단하세요.','치우친 판단이나 책임 회피를 돌아보세요.'],
  ['매달린 사람','The Hanged Man','懸',4,'멈춰서 뒤집어 보면 답이 보입니다.','소득 없는 희생과 정체가 이어집니다.'],
  ['죽음','Death','死',4,'한 장이 끝나고 다음이 열립니다. 정리가 먼저입니다.','놓지 못해 변화가 늦어지고 있습니다.'],
  ['절제','Temperance','節',2,'섞고 조절하면 균형이 잡힙니다. 중간값을 찾으세요.','한쪽으로 쏠렸습니다. 과한 것을 덜어 내세요.'],
  ['악마','The Devil','惡',2,'집착과 유혹에 묶여 있습니다. 무엇에 끌려가는지 보세요.','묶인 것에서 풀려나기 시작합니다.'],
  ['탑','The Tower','塔',1,'버티던 것이 한 번에 무너지며 진실이 드러납니다.','큰 충격은 피했지만 고칠 것은 남았습니다.'],
  ['별','The Star','星',0,'회복과 희망의 카드입니다. 멀리 보고 가세요.','낙담으로 믿음이 흔들립니다. 기대치를 다시 맞추세요.'],
  ['달','The Moon','月',4,'분명하지 않은 것이 많습니다. 불안에 끌려 결정하지 마세요.','안개가 걷히며 사실이 보이기 시작합니다.'],
  ['태양','The Sun','日',1,'밝고 분명한 성공의 카드입니다. 드러내세요.','잠깐 흐립니다. 과신만 줄이면 됩니다.'],
  ['심판','Judgement','審',3,'다시 평가받고 새로 일어설 기회입니다.','자책하며 결정을 미루고 있습니다.'],
  ['세계','The World','世',2,'한 주기가 완성됩니다. 마무리하고 다음 판으로 가세요.','마지막 한 걸음이 남았습니다.']
];
const SUITS = [['완드','Wands','杖',1,'일과 의욕'],['컵','Cups','杯',4,'감정과 관계'],['소드','Swords','劍',3,'생각과 판단'],['펜타클','Pentacles','錢',2,'돈과 건강']];
const RANKS = [
  ['에이스','A','새 씨앗이 싹틉니다. 시작하기 좋은 때입니다.','시작이 막혀 있습니다. 준비를 다시 점검하세요.'],
  ['2','2','둘 사이의 균형과 선택이 주제입니다.','균형이 깨졌습니다. 한쪽을 정리해야 합니다.'],
  ['3','3','함께해서 첫 성과가 납니다.','손발이 맞지 않습니다. 역할을 다시 나누세요.'],
  ['4','4','안정과 휴식의 구간입니다.','안주가 정체로 바뀌고 있습니다.'],
  ['5','5','갈등과 손실을 겪는 구간입니다.','최악은 지났습니다. 회복이 시작됩니다.'],
  ['6','6','주고받으며 한 걸음 나아갑니다.','지난 일에 묶여 걸음이 느립니다.'],
  ['7','7','시험대에 올랐습니다. 버티면 넘어갑니다.','흔들립니다. 지킬 것과 버릴 것을 가르세요.'],
  ['8','8','몰입과 속도가 붙습니다.','애쓰는 만큼 나아가지 않습니다. 방식을 바꾸세요.'],
  ['9','9','결실 바로 앞입니다. 끝까지 가세요.','지치고 불안합니다. 쉬어야 끝낼 수 있습니다.'],
  ['10','10','한 주기가 꽉 찼습니다. 매듭을 지을 때입니다.','짐이 너무 많습니다. 내려놓을 것을 고르세요.'],
  ['시종','P','배움과 소식이 들어옵니다.','서툴고 산만합니다. 기본부터 다지세요.'],
  ['기사','Kn','추진력이 붙고 움직임이 생깁니다.','성급합니다. 속도를 늦추세요.'],
  ['여왕','Q','성숙하게 품고 돌볼 수 있습니다.','감정이 넘칩니다. 거리를 조금 두세요.'],
  ['왕','K','숙련된 솜씨로 판을 이끕니다.','독선에 빠지기 쉽습니다. 다른 의견을 들으세요.']
];
const DECK = [];
MAJOR.forEach((c, i) => DECK.push({ name: EN ? c[1] : c[0], en: c[1], sym: c[2], el: c[3], up: EN ? EN_D.MAJOR_TXT[i][0] : c[4], rev: EN ? EN_D.MAJOR_TXT[i][1] : c[5], no: ROMAN[i], major: true }));
SUITS.forEach((s, si) => RANKS.forEach((r, ri) => DECK.push(EN
  ? { name: EN_D.RANK_NAME[ri] + ' of ' + s[1], en: r[0] + ' of ' + s[1], sym: s[2], el: s[3], up: 'In ' + EN_D.SUIT_AREA[si] + ', ' + EN_D.RANK_TXT[ri][0], rev: 'In ' + EN_D.SUIT_AREA[si] + ', ' + EN_D.RANK_TXT[ri][1], no: r[1] }
  : { name: s[0] + ' ' + r[0], en: r[0] + ' of ' + s[1], sym: s[2], el: s[3], up: s[4] + '에서 ' + r[2], rev: s[4] + '에서 ' + r[3], no: r[1] })));
const TOPICS = EN ? EN_D.TOPICS : { all: '종합운', love: '연애·관계', money: '재물', work: '일·진로' };
const POS = EN ? EN_D.POS : ['지나온 흐름', '지금', '다가올 흐름'];

/* ===== 상태 ===== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const EXAMPLE = { name: T('예시', 'Example'), gender: 'F', cal: 'solar', y: 1990, m: 5, d: 15, si: 3, example: true };
const S = { user: store.get('mw-user2') || EXAMPLE, premium: false, matchOpen: false, topic: 'all', deck: [], picks: [], rev: [false, false, false], saju: null, plan: 1, ai: null };

function hash32(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const todayStr = () => { const d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); };
function shuffle() {
  const idx = DECK.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  S.deck = idx.slice(0, 12).map(i => ({ c: DECK[i], rev: Math.random() < 0.3 }));
  S.picks = []; S.rev = [false, false, false];
}

/* ===== 사주와 카드 겹쳐 읽기 ===== */
function link(card, rev) {
  const sj = S.saju, e = card.el, need = sj.need;
  let score = 0, txt;
  if (e === need) { score = 2; txt = T('사주에서 보완이 필요한 ' + EL[need] + '(' + EL_H[need] + ') 기운을 이 카드가 그대로 가져옵니다. 카드가 말하는 방향으로 움직여도 좋습니다.', 'This card brings exactly the ' + EL[need] + ' (' + EL_H[need] + ') energy your saju needs. You can move the way the card points.'); }
  else if (mod(e + 1, 5) === need) { score = 1; txt = T('카드의 ' + EL[e] + ' 기운이 필요한 ' + EL[need] + ' 기운을 낳아 줍니다. 돌아가는 길이지만 도움이 됩니다.', 'The card\'s ' + EL[e] + ' energy feeds the ' + EL[need] + ' energy you need. It is the long way round, but it helps.'); }
  else if (mod(e + 2, 5) === need) { score = -1; txt = T('카드의 ' + EL[e] + ' 기운이 필요한 ' + EL[need] + ' 기운을 누릅니다. 속도를 줄이고 한 번 더 확인하세요.', 'The card\'s ' + EL[e] + ' energy presses down the ' + EL[need] + ' energy you need. Slow down and check once more.'); }
  else { txt = T('카드의 ' + EL[e] + ' 기운은 사주의 균형을 크게 흔들지 않습니다. 카드 뜻 그대로 읽으면 됩니다.', 'The card\'s ' + EL[e] + ' energy does not disturb the balance of your saju much. Read the card as it stands.'); }
  if (rev) score -= 1;
  const dom = GOD_DOMAIN[mod(e - sj.me, 5)];
  return { score, txt, dom };
}
function tone(total) {
  if (total >= 3) return T(['밀어도 되는 때', '사주가 필요로 하는 기운과 카드가 같은 쪽을 가리킵니다. 미뤄 둔 결정을 실행으로 옮기기 좋습니다.'], ['a time you can push', 'The energy your saju needs and the cards point the same way. A good time to act on a decision you have been putting off.']);
  if (total >= 0) return T(['다듬으며 가는 때', '크게 막는 것은 없지만 저절로 풀리지도 않습니다. 범위를 좁혀 하나씩 끝내는 방식이 맞습니다.'], ['a time to refine as you go', 'Nothing blocks you badly, but nothing resolves by itself either. Narrow the scope and finish one thing at a time.']);
  return T(['지키는 때', '카드와 사주가 서로 엇갈립니다. 새 판을 벌이기보다 가진 것을 점검하고 지키는 쪽이 낫습니다.'], ['a time to hold what you have', 'The cards and your saju pull in different directions. Checking and protecting what you have is better than starting something new.']);
}

/* ===== 렌더 ===== */
const elSpan = (e, t) => '<span class="c' + e + '">' + t + '</span>';
function cardHTML(pick, open, extra, sel) {
  const c = pick.c;
  return '<button type="button" class="card' + (open ? ' open' : '') + (sel ? ' sel' : '') + '" ' + (extra || '') + ' aria-label="' + (open ? esc(c.name) + (pick.rev ? T(' 역방향', ' reversed') : T(' 정방향', ' upright')) : T('뒤집힌 카드', 'Face-down card')) + '"><span class="flip">' +
    '<span class="f back"></span><span class="f face fc' + c.el + (pick.rev ? ' rev' : '') + '"><span class="no">' + c.no + '</span><span class="sym">' + c.sym + '</span><span class="nm">' + esc(c.name) + '</span></span></span></button>';
}
const dirTag = rev => '<span class="tag">' + (rev ? T('역방향', 'Reversed') : T('정방향', 'Upright')) + '</span>';
function lockWrap(inner, label, kind) {
  const open = kind === 'match' ? S.matchOpen : S.premium;
  return '<div class="lock' + (open ? '' : ' locked') + '"><div class="inner">' + inner + '</div><div class="gate">' + TIER.paid + '<span>' + label + '</span><button class="goldbtn" type="button" data-pay="' + (kind || 'saju') + '">' + T(Pay.price() + '에 열기', 'Open for ' + Pay.price()) + '</button></div></div>';
}

function readItem(pick, pos) {
  const l = link(pick.c, pick.rev);
  return '<div class="it"><b class="c' + pick.c.el + '">' + (pos ? pos + ' · ' : '') + esc(pick.c.name) + '</b>' + dirTag(pick.rev) + '<p>' + (pick.rev ? pick.c.rev : pick.c.up) + '</p><p class="note">' + l.txt + T(' 닿는 영역은 ' + l.dom + '입니다.', ' It touches ' + l.dom + '.') + '</p></div>';
}
function currentCards() {
  return todaySpread();   // 통합 리딩은 오늘의 운세 타로 세 장을 쓴다
}
function renderReading() {
  const sj = S.saju, cards = currentCards();
  const total = cards.reduce((a, c) => a + link(c.c, c.rev).score, 0), tn = tone(total);
  const yNow = new Date().getFullYear(), yp = yearPillar(yNow + 1, sj.P.day.s);
  const inner = '<div class="panel"><h3>' + TOPICS[S.topic] + T(' · 한 줄 결론', ' · in one line') + '</h3><p class="kv" style="font-size:18px"><b>' + (EN ? tn[0].charAt(0).toUpperCase() + tn[0].slice(1) : tn[0]) + '</b></p><p>' + tn[1] + '</p></div>' +
    '<div class="block"><h3>' + T('명리가 말하는 바탕', 'What your saju says') + '</h3><div class="panel"><p>' + T(elSpan(sj.P.day.sEl, sj.P.day.stemH) + ' 일간, ' + (sj.strong ? '신강' : '신약') + '. 보완할 기운은 ' + elSpan(sj.need, EL[sj.need]) + '입니다. ' + (yNow + 1) + '년은 ' + yp.sGod + '의 해입니다. ', 'Day Master ' + elSpan(sj.P.day.sEl, sj.P.day.stemH) + ', a ' + (sj.strong ? 'strong' : 'weak') + ' chart. The energy to add is ' + elSpan(sj.need, EL[sj.need]) + '. ' + (yNow + 1) + ' is a ' + G(yp.sGod) + ' year. ') + GOD_YEAR[yp.sGod] + '</p></div></div>' +
    '<div class="block"><h3>' + T('오늘의 타로가 말하는 지금', 'What today\'s tarot says') + '</h3><div class="read">' + cards.map(c => readItem(c, c.pos)).join('') + '</div></div>' +
    '<div class="block"><h3>' + T('종합의견', 'Overall') + '</h3><div class="panel block sum"><p>' + T('사주의 바탕과 뽑은 카드를 겹쳐 보면 지금은 <b>' + tn[0] + '</b>입니다. ', 'Reading your saju and the cards together, this is <b>' + tn[0] + '</b>. ') + tn[1] + '</p><p><b>' + T('정리하면, 나에게 필요한 ' + EL[sj.need] + ' 기운을 채우는 쪽으로 움직이세요. ', 'In short, move toward filling up the ' + EL[sj.need] + ' energy you need. ') + EL_TIP[sj.need][1] + '</b></p></div></div>' +
    '<div class="block needs-ai" id="aiBox"' + (S.ai ? '' : ' hidden') + '><h3>' + T('AI 상담', 'Ask the AI') + '</h3><div class="panel block"><label for="aiQ">' + T('내 사주와 뽑은 카드를 바탕으로 묻고 싶은 것', 'What you want to ask, based on your saju and cards') + '</label><textarea id="aiQ" maxlength="300" placeholder="' + T('예: 내년에 이직해도 될까요?', 'e.g. Should I change jobs next year?') + '"></textarea><button type="button" class="primary" id="aiGo">' + T('상담 받기', 'Ask') + '</button><div class="ai-out" id="aiOut" aria-live="polite"></div></div></div>';
  $('v-reading').innerHTML = '<div class="block"><h2>' + T('통합 리딩', 'Combined reading') + TIER.paid + '</h2><h3>' + T('사주의 바탕 위에 카드를 겹쳐 읽습니다', 'The cards read on top of your saju') + '</h3></div>' + lockWrap(inner, T('통합 리딩은 이 사주를 열면 함께 열립니다', 'The combined reading opens when you open this saju'));
}
/* ===== 라우팅과 이벤트 ===== */
function route() {
  const v = ['saju', 'tarot', 'match', 'reading'].includes(location.hash.slice(1)) ? location.hash.slice(1) : 'saju';
  document.querySelectorAll('section.view').forEach(s => s.classList.toggle('on', s.id === 'v-' + v));
  document.querySelectorAll('nav a').forEach(a => a.dataset.v === v ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current'));
  if (v === 'reading') renderReading();
}
window.addEventListener('hashchange', route);


document.addEventListener('click', e => {
  const t = e.target.closest('button,a'); if (!t) return;
  if (t.hasAttribute('data-pay')) return openPay(t.dataset.pay);
  if (t.dataset.topic) { S.topic = t.dataset.topic; shuffle(); return renderTarot(); }
  if (t.hasAttribute('data-reshuffle')) { shuffle(); return renderTarot(); }
  if (t.dataset.pick !== undefined) {
    if (!S.premium) return openPay();
    const i = +t.dataset.pick, at = S.picks.indexOf(i);
    if (at >= 0) S.picks.splice(at, 1); else if (S.picks.length < 3) S.picks.push(i);
    return renderTarot();
  }
  if (t.id === 'aiGo') return askAI();
});
$('payClose').onclick = () => $('pay').close();
$('editBtn').onclick = () => { const f = $('birthForm'); f.hidden = !f.hidden; };
/* ===== AI 상담 (지원되는 환경에서만 표시) ===== */
let aiBusy = false;
async function askAI() {
  const q = $('aiQ').value.trim(), out = $('aiOut');
  if (!S.ai || aiBusy) return;
  if (!q) { out.textContent = T('질문을 먼저 적어 주세요.', 'Write your question first.'); return; }
  aiBusy = true; $('aiGo').disabled = true; out.textContent = T('풀이를 쓰는 중입니다.', 'Writing your reading.');
  const prompt = (EN ? 'You are a counselor who reads Korean saju (four pillars) together with tarot. Answer the question in English, using only the saju information and tarot result below.\nRules: 6 to 9 sentences, in paragraphs with no heading or list. Point clearly to one piece of saju evidence and one piece of card evidence. Begin the last paragraph with \'Overall:\', sum up in two or three sentences, and end with one concrete action. Make no definite predictions and give no firm answers on health, legal or investment matters; keep the tone of advice for reference.\n\n' + contextText() + '\n\nQuestion: ' + q : '') || '당신은 명리학과 타로를 함께 보는 상담가입니다. 아래 사주 정보와 타로 결과만을 근거로 질문에 한국어로 답하세요.\n규칙: 6~9문장, 머리말이나 목록 없이 문단으로. 명리 근거 하나와 카드 근거 하나를 분명히 짚고, 마지막 문단은 \'종합의견:\'으로 시작해 두세 문장으로 정리하고 구체적인 행동 한 가지로 끝내세요. 단정적인 예언, 건강·법률·투자에 대한 확답은 하지 말고 참고용 조언의 어조를 유지하세요.\n\n' + contextText() + '\n\n질문: ' + q;
  try {
    const r = await S.ai(prompt, { onText: ({ text }) => { out.textContent = text; } });
    out.textContent = r.text;
  } catch (err) {
    out.textContent = err && err.code === 'rate_limited' ? T('요청이 많습니다. 잠시 뒤에 다시 눌러 주세요.', 'Too many requests. Please try again in a moment.') : T('AI 상담을 불러오지 못했습니다. 위의 통합 리딩은 그대로 볼 수 있습니다.', 'Could not load the AI answer. The combined reading above is still available.');
    if (err && err.code === 'not_granted') { S.ai = null; const b = $('aiBox'); if (b) b.hidden = true; }
  }
  aiBusy = false; const g = $('aiGo'); if (g) g.disabled = false;
}
(async () => {
  try { S.ai = (window.claude && window.claude.use) ? await window.claude.use('sample') : null; } catch (e) { S.ai = null; }
  if (S.ai) document.querySelectorAll('.needs-ai').forEach(b => { b.hidden = false; });
})();

