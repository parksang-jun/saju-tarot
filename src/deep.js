/* ===== 심화 명리: 지장간, 십이운성, 격국, 신살, 합충, 조후 ===== */
const US_NAME = EN ? EN_P.US_NAME : ['장생', '목욕', '관대', '건록', '제왕', '쇠', '병', '사', '묘', '절', '태', '양'];
const US_TXT = EN ? EN_P.US_TXT : ['새로 시작하는 기운이라 배우고 뻗어 나가기 좋습니다', '감정과 유행에 흔들리기 쉬워 시행착오가 따릅니다', '자신감이 붙고 사회로 나서는 기운입니다', '제 힘으로 서는 기운이라 자립과 실속이 따릅니다', '기세가 정점이라 주도권을 쥐지만 꺾이지 않게 조절이 필요합니다', '기세가 한풀 꺾여 지키고 다듬는 쪽이 맞습니다', '기운이 약해져 무리하면 탈이 나니 속도를 늦춰야 합니다', '한 흐름이 멈추는 자리라 정리와 마무리에 맞습니다', '안으로 갈무리하는 기운이라 저축, 연구, 내실에 맞습니다', '끊기고 새로 이어지는 자리라 단절과 전환이 함께 옵니다', '씨앗이 잉태되는 기운이라 구상과 준비에 맞습니다', '보호받으며 자라는 기운이라 후원을 받는 준비 기간입니다'];
const US_START = [11, 6, 2, 9, 2, 9, 5, 0, 8, 3];
const unseong = (stem, b) => stem % 2 === 0 ? mod(b - US_START[stem], 12) : mod(US_START[stem] - b, 12);
const GUIIN = { 0: [1, 7], 4: [1, 7], 6: [1, 7], 1: [0, 8], 5: [0, 8], 2: [11, 9], 3: [11, 9], 7: [2, 6], 8: [5, 3], 9: [5, 3] };
const DOHWA = [9, 6, 3, 0], YEOKMA = [2, 11, 8, 5], HWAGAE = [4, 1, 10, 7];
const YANGIN = { 0: 3, 2: 6, 4: 6, 6: 9, 8: 0 };
const MUNCHANG = [5, 6, 8, 9, 8, 9, 11, 0, 2, 3];
const gongmang = (ds, db) => { const x = mod(db - ds, 12); return [mod(x + 10, 12), mod(x + 11, 12)]; };
const GOEGANG = ['6-4', '6-10', '8-4', '4-10'], BAEKHO = ['0-4', '1-7', '2-10', '3-1', '4-4', '8-10', '9-1'];
const SS_TXT = EN ? EN_P.SS_TXT : {
  '천을귀인': '어려운 고비마다 돕는 사람이 나타나는 별입니다. 사람을 통해 일이 풀리니 인연을 가볍게 넘기지 마세요.',
  '도화': '사람을 끄는 매력과 인기의 별입니다. 대중 앞에 서는 일에 유리하고, 이성 문제와 구설은 선을 분명히 해야 합니다.',
  '역마': '이동과 변화의 별입니다. 출장, 이사, 해외와 인연이 깊고 한곳에 오래 묶이면 답답해합니다.',
  '화개': '예술, 학문, 종교 쪽으로 깊이 파고드는 별입니다. 혼자 몰입하는 시간이 재능을 키우지만 고독을 함께 줍니다.',
  '양인': '칼을 쥔 듯한 추진력과 결단의 별입니다. 큰일을 해내는 힘이지만 과격함, 사고, 다툼을 조심해야 합니다.',
  '문창귀인': '글과 공부, 시험에 강한 별입니다. 기록하고 발표하는 일에서 평가를 받습니다.',
  '공망': '그 자리의 인연이 비어 있다고 보는 별입니다. 그 영역은 기대와 집착을 줄일수록 편해집니다.',
  '괴강': '일주가 괴강이라 기세가 강하고 승부가 분명합니다. 지도자 기질이 있지만 굽히지 않아 굴곡이 큽니다.',
  '백호': '일주가 백호라 밀어붙이는 힘이 셉니다. 큰 성취의 동력이지만 사고, 수술, 과로를 평소에 조심하라고 봅니다.'
};
const GROUP_NAME = EN ? EN_P.GROUP_NAME : ['비견·겁재', '식신·상관', '재성', '관성', '인성'];
const GROUP_TXT = EN ? EN_P.GROUP_TXT : [
  ['자존심과 독립심이 강합니다. 경쟁에 강하지만 재물이 사람을 따라 흩어지기 쉬워 동업과 돈거래에 선을 그어야 합니다.', '혼자 밀어붙이기보다 믿을 만한 동료와 조직의 힘을 빌릴 때 성과가 커집니다.'],
  ['재주와 표현력이 넘칩니다. 말과 아이디어가 앞서 윗사람, 규정과 부딪히기 쉬우니 끝맺음을 챙기세요.', '속에 든 것을 밖으로 내놓는 통로가 좁습니다. 글, 발표, 결과물로 드러내는 연습이 운을 엽니다.'],
  ['돈과 일의 기회가 많이 보입니다. 다 잡으려다 힘이 흩어지니 감당할 수 있는 것만 고르세요.', '돈 자체보다 기술, 명예, 사람을 따라갈 때 재물이 뒤따르는 구조입니다. 저축은 자동이체 같은 장치로 해 두세요.'],
  ['책임과 압박을 많이 지는 구조입니다. 조직에서 인정받지만 긴장이 쌓이니 쉬는 날을 일정에 넣으세요.', '틀에 매이지 않는 자유로운 기질입니다. 스스로 규칙과 마감을 만들어야 성과가 모입니다.'],
  ['생각이 깊고 배움이 빠릅니다. 준비만 하다 실행이 늦어지기 쉬우니 70%에서 시작하세요.', '기대기보다 부딪히며 배우는 편입니다. 자격, 문서, 멘토를 일부러 챙기면 시행착오가 줄어듭니다.']
];
const GYEOK = EN ? EN_P.GYEOK : {
  '비견': ['건록격', '내 이름을 걸고 하는 일이 맞습니다. 전문직, 자영업, 프리랜서처럼 실력이 곧 간판이 되는 분야에서 힘을 씁니다.'],
  '겁재': ['양인격', '승부와 경쟁이 있는 분야가 맞습니다. 영업, 스포츠, 군경, 수술이나 위기 대응처럼 결단이 필요한 일에 강합니다.'],
  '식신': ['식신격', '꾸준히 만들고 가르치는 일이 맞습니다. 연구, 기술, 요리, 교육, 콘텐츠처럼 쌓일수록 값이 오르는 분야입니다.'],
  '상관': ['상관격', '기존 방식을 바꾸는 일이 맞습니다. 기획, 예술, 언론, 컨설팅, 개발처럼 새 답을 내는 분야입니다.'],
  '편재': ['편재격', '판을 움직이는 일이 맞습니다. 사업, 무역, 영업, 투자처럼 사람과 돈이 크게 도는 분야입니다.'],
  '정재': ['정재격', '안정적으로 쌓는 일이 맞습니다. 재무, 회계, 관리, 공공 분야처럼 정확함과 성실함이 평가받는 자리입니다.'],
  '편관': ['편관격', '압박 속에서 문제를 푸는 일이 맞습니다. 군경, 법조, 의료, 엔지니어링, 위기 관리처럼 책임이 무거운 분야입니다.'],
  '정관': ['정관격', '조직 안에서 책임을 지는 일이 맞습니다. 공공기관, 대기업, 행정, 관리직처럼 절차와 신뢰가 중요한 자리입니다.'],
  '편인': ['편인격', '남다른 전문성으로 승부하는 일이 맞습니다. 연구, IT, 의약, 철학, 특수 기술처럼 깊이가 무기인 분야입니다.'],
  '정인': ['정인격', '배움과 자격이 바탕이 되는 일이 맞습니다. 교육, 학문, 문서와 인허가를 다루는 전문직에 어울립니다.']
};
const SPOUSE = EN ? EN_P.SPOUSE : {
  '비견': '친구처럼 대등한 관계를 맺습니다. 서로 고집이 세서 양보의 순서를 정해 두면 오래갑니다.',
  '겁재': '정이 깊지만 주도권과 돈 문제로 다투기 쉽습니다. 통장과 역할을 분명히 나누세요.',
  '식신': '편안하게 챙겨 주고받는 관계입니다. 같이 먹고 쉬는 시간이 관계의 힘입니다.',
  '상관': '매력과 자극이 큰 관계입니다. 말로 상처를 주기 쉬우니 표현의 수위를 조절해야 합니다.',
  '편재': '활동적이고 사교적인 상대와 인연이 있습니다. 서로 바깥 활동을 인정해야 편합니다.',
  '정재': '성실하고 살림을 챙기는 상대와 인연이 있습니다. 안정적이지만 잔소리가 쌓이지 않게 하세요.',
  '편관': '카리스마 있는 상대와 인연이 있습니다. 긴장과 간섭이 따르니 각자의 영역을 지켜 주세요.',
  '정관': '반듯하고 책임감 있는 상대와 인연이 있습니다. 격식보다 속마음을 나누는 시간이 필요합니다.',
  '편인': '독특하고 생각이 깊은 상대와 인연이 있습니다. 속을 알기 어려우니 추측 대신 물어보세요.',
  '정인': '보살펴 주는 상대와 인연이 있습니다. 기대다 보면 의존이 되니 내 몫은 스스로 하세요.'
};
const SEASON_TXT = EN ? EN_P.SEASON_TXT : [
  '태어난 달이 일간과 같은 기운이라 기세를 타고났습니다(득령). 자기 주장이 뚜렷하고 버티는 힘이 좋습니다.',
  '태어난 달로 일간의 기운이 빠져나가는 구조입니다(실령). 재주는 많지만 쉽게 지치니 체력 안배가 중요합니다.',
  '태어난 달이 일간이 다스려야 할 기운이라 일복과 재물 기회가 많은 대신 힘에 부치기 쉽습니다(실령).',
  '태어난 달이 일간을 누르는 기운이라 일찍부터 책임과 규율 속에서 단련되는 구조입니다(실령).',
  '태어난 달이 일간을 낳아 주는 기운이라 도움을 받으며 자라는 구조입니다(득령). 배움과 후원의 덕이 있습니다.'
];
const ORGAN = EN ? EN_P.ORGAN : ['간, 담, 눈, 근육', '심장, 혈관, 소장', '위장, 비장, 소화기', '폐, 대장, 피부, 호흡기', '신장, 방광, 귀, 생식기'];
const PNAME2 = { year: '년', month: '월', day: '일', hour: '시' };
const STEM_HAP = (a, b) => mod(a - b, 10) === 5;

/* ===== 나이대별 쉬운 풀이 ===== */
const stageIdx = age => age < 13 ? 0 : age < 20 ? 1 : age < 35 ? 2 : age < 55 ? 3 : 4;
const STAGE = EN ? EN_P.STAGE : {
  '비견': ['또래 친구, 형제와 어울리며 자기 고집이 생기는 시기입니다. 제 것은 제가 하겠다는 아이로 자랍니다.', '친구가 가장 중요하고 경쟁심이 커지는 시기입니다. 남에게 지기 싫어 스스로 길을 정하려 합니다.', '내 힘으로 서려는 시기입니다. 독립, 창업, 혼자 내리는 결정이 많아집니다.', '내 이름을 걸고 판을 벌이는 시기입니다. 독립이나 내 사업에 힘이 실리지만 혼자 다 지려 하면 지칩니다.', '내 방식대로 살고 싶어지는 시기입니다. 친구, 동년배와 함께하는 활동이 삶의 중심이 됩니다.'],
  '겁재': ['형제나 친구와 나누고 다투며 크는 시기입니다. 집안 살림이나 환경에 변화가 있기 쉽습니다.', '경쟁이 치열하고 친구 따라 움직이는 시기입니다. 어울리는 사람에 따라 성적과 방향이 크게 달라집니다.', '사람도 많이 만나고 돈도 많이 나가는 시기입니다. 동업, 보증, 큰 지출은 조심해야 합니다.', '경쟁자와 동업자가 늘어나는 시기입니다. 사람을 얻는 대신 돈이 새기 쉬우니 한도를 정해 두세요.', '주변에 돈 쓸 일이 많아지는 시기입니다. 자녀나 지인에게 가는 돈은 줄 수 있는 만큼만 정하세요.'],
  '식신': ['잘 먹고 잘 놀며 손재주와 호기심이 자라는 시기입니다. 비교적 편안하게 보살핌을 받습니다.', '좋아하는 과목이나 취미에 푹 빠지는 시기입니다. 이때 익힌 재주가 나중에 직업의 바탕이 됩니다.', '기술과 실력을 꾸준히 쌓는 시기입니다. 손에 익힌 것이 수입으로 이어지기 시작합니다.', '내가 만든 것이 돈이 되는 시기입니다. 전문성, 콘텐츠, 좋은 생활 습관에 들인 만큼 남습니다.', '여유를 즐기며 취미와 재능을 살리는 시기입니다. 가르치거나 나누는 일이 잘 맞습니다.'],
  '상관': ['말이 빠르고 끼가 많은 아이로 자라는 시기입니다. 하지 말라는 것을 더 해 보고 싶어 합니다.', '규칙이 답답하고 하고 싶은 말이 많은 시기입니다. 예체능이나 글, 말에서 재능이 드러납니다.', '틀을 깨고 싶은 시기입니다. 직장을 옮기거나 진로를 바꾸고, 윗사람과 부딪히기 쉽습니다.', '재능을 밖으로 드러내고 일하는 방식을 바꾸는 시기입니다. 새 분야에 도전하기 좋지만 조직과의 마찰을 조심해야 합니다.', '하고 싶은 말을 하고 사는 시기입니다. 새 취미와 활동을 시작하되 말로 생기는 오해를 조심하세요.'],
  '편재': ['집안에 돈이나 사업의 움직임이 큰 시기입니다. 아버지의 일이나 이사로 환경이 바뀌기 쉽습니다.', '공부보다 바깥 활동과 사람에 관심이 가는 시기입니다. 일찍 세상 물정에 눈을 뜹니다.', '활동 반경이 넓어지고 돈이 크게 들어오고 나가는 시기입니다. 연애와 사업 기회도 함께 옵니다.', '사업, 투자, 큰 거래의 기회가 오는 시기입니다. 판을 키우되 한 번에 거는 금액의 한도를 정해 두세요.', '모아 둔 것을 굴리고 쓰는 시기입니다. 큰 투자보다 지키는 쪽에 무게를 두세요.'],
  '정재': ['집안 살림이 안정되고 규칙적인 생활 속에서 자라는 시기입니다.', '성실하게 제 할 일을 하는 시기입니다. 현실적인 계획과 용돈 관리에 일찍 눈을 뜹니다.', '취업하고 월급을 모으며 생활 기반을 잡는 시기입니다. 결혼이나 내 집 마련 같은 일이 따라옵니다.', '꾸준한 수입과 재산이 쌓이는 시기입니다. 무리한 확장보다 관리와 꼼꼼한 계약이 힘이 됩니다.', '모은 것으로 안정되게 사는 시기입니다. 아끼고 관리하는 습관이 노후를 편하게 합니다.'],
  '편관': ['엄한 환경이나 잔병치레, 이사처럼 아이에게 버거운 일을 겪으며 일찍 철이 드는 시기입니다.', '입시와 경쟁의 압박이 큰 시기입니다. 엄격한 선생님이나 규율 속에서 단련됩니다.', '일이 고되고 책임이 무거운 시기입니다. 힘든 만큼 실력과 버티는 힘이 붙습니다.', '무거운 과제와 책임이 주어지는 시기입니다. 넘기면 권한과 자리가 오지만 과로는 피해야 합니다.', '몸과 마음에 부담이 오기 쉬운 시기입니다. 일을 줄이고 쉬는 시간을 챙기세요.'],
  '정관': ['예의와 규칙을 중요하게 여기는 집에서 반듯하게 자라는 시기입니다. 어른 말을 잘 듣는 모범적인 아이로 큽니다.', '학교생활을 성실히 하고 선생님께 인정받는 시기입니다. 반장 같은 책임을 맡기도 합니다.', '안정된 직장에 들어가 자리를 잡는 시기입니다. 취업, 승진, 결혼처럼 공식적인 일이 생깁니다.', '직책과 평판이 올라가는 시기입니다. 원칙을 지킬수록 인정받습니다.', '명예와 체면이 지켜지는 시기입니다. 모임이나 단체에서 어른 역할을 맡게 됩니다.'],
  '편인': ['혼자 노는 시간이 많고 상상력이 풍부한 시기입니다. 낯을 가리거나 예민한 아이로 자라기 쉽습니다.', '학교 공부보다 내가 꽂힌 분야를 파는 시기입니다. 진로를 두고 고민이 많습니다.', '남다른 공부나 기술을 익히는 시기입니다. 방향을 여러 번 바꾸며 내 길을 찾습니다.', '전문 지식과 직감이 깊어지는 시기입니다. 연구, 자격, 새 분야 공부에 좋지만 생각만 하다 때를 놓치기 쉽습니다.', '혼자만의 공부, 종교, 취미에 깊이 빠지는 시기입니다. 사람과 너무 멀어지지 않게 하세요.'],
  '정인': ['어머니와 어른들의 보살핌을 듬뿍 받으며 자라는 시기입니다.', '공부할 여건이 좋고 선생님 복이 있는 시기입니다. 성적과 시험에서 덕을 봅니다.', '공부, 자격증, 윗사람의 도움이 따르는 시기입니다. 배운 것으로 자리를 잡습니다.', '문서, 자격, 도와주는 사람이 따르는 시기입니다. 배운 것을 실행으로 옮겨야 결과가 남습니다.', '마음이 편안하고 배우는 즐거움이 있는 시기입니다. 자녀나 주변의 보살핌을 받습니다.']
};
const BABY = EN ? EN_P.BABY : { '비견': '고집이 생기고 제 뜻대로 하려는 때입니다.', '겁재': '동생이 생기거나 집안에 돈 쓸 일이 많은 때입니다.', '식신': '잘 먹고 잘 자라는 순한 때입니다.', '상관': '말이 트이고 떼가 느는 때입니다.', '편재': '집안의 일이나 사는 곳이 바뀌기 쉬운 때입니다.', '정재': '집안 살림이 안정되는 때입니다.', '편관': '잔병치레나 낯선 환경으로 손이 많이 가는 때입니다.', '정관': '규칙적인 생활이 잡히는 때입니다.', '편인': '낯가림이 있고 예민해 손이 가는 때입니다.', '정인': '어른들의 보살핌을 듬뿍 받는 때입니다.' };
const stageText = (g, age) => age < 6 ? T('아기 때는 집안 분위기와 아이의 기질로 봅니다. ', EN_P.BABY_PRE) + BABY[g] : STAGE[g][stageIdx(age)];
const THEME_KID = EN ? EN_P.THEME_KID : { '비견': '또래와 자기 고집', '겁재': '경쟁과 나눔', '식신': '재주와 호기심', '상관': '끼와 반항', '편재': '바깥 활동', '정재': '성실과 안정', '편관': '단련과 압박', '정관': '모범과 규칙', '편인': '상상과 몰두', '정인': '보살핌과 공부' };
const KID_CAUTION = EN ? EN_P.KID_CAUTION : { '비견': '고집, 친구와의 다툼', '겁재': '친구 따라 하다 생기는 문제, 물건 잃어버리기', '식신': '과식과 늦잠, 놀다가 미루는 숙제', '상관': '말대꾸, 선생님이나 어른과의 충돌', '편재': '산만함, 공부보다 노는 데 쏠림', '정재': '지나친 소심함, 작은 것에 대한 집착', '편관': '잔병치레, 다치는 일, 지나친 긴장', '정관': '눈치와 부담감, 잘해야 한다는 압박', '편인': '외로움, 편식, 혼자 끙끙대기', '정인': '지나친 의존, 스스로 하지 않는 습관' };
const PAL_KID = EN ? EN_P.PAL_KID : { year: '집안 어른과 주변 환경', month: '부모와 집안 사정', day: '사는 곳과 생활 리듬', hour: '형제나 또래 관계' };
const PSHORT = EN ? EN_P.PSHORT : { year: '집안·윗사람', month: '직장·부모', day: '나·배우자', hour: '자녀·미래' };
const GROUP_PLAIN = EN ? EN_P.GROUP_PLAIN : ['내 편과 경쟁자', '표현과 재능', '돈과 기회', '책임과 직장', '공부와 도움'];
const SS_PLAIN = EN ? EN_P.SS_PLAIN : { '천을귀인': '귀인 복', '도화': '매력과 인기', '역마': '이동과 변화', '화개': '몰입과 예술', '양인': '강한 추진력', '문창귀인': '공부와 글재주', '공망': '비어 있는 자리', '괴강': '강한 기세', '백호': '센 기운' };
const theme = (g, age) => age != null && age < 20 ? THEME_KID[g] : DAEUN[g][0];
const plainSeason = i => SEASON_TXT[i].replace(/\((득령|실령)\)/, '');

function natalInfo() {
  const sj = S.saju, P = sj.P, ds = P.day.s, db = P.day.b, keys = sj.keys;
  const grp = [0, 0, 0, 0, 0];
  keys.forEach(k => { if (k !== 'day') grp[mod(P[k].sEl - sj.me, 5)]++; grp[mod(P[k].bEl - sj.me, 5)]++; });
  const gm = gongmang(ds, db), ss = {};
  const add = (n, k) => { ss[n] = ss[n] || []; if (!ss[n].includes(PNAME2[k] + '지')) ss[n].push(PNAME2[k] + '지'); };
  keys.forEach(k => {
    const b = P[k].b;
    if (GUIIN[ds].includes(b)) add('천을귀인', k);
    [['day', db], ['year', P.year.b]].forEach(([base, bb]) => {
      if (k === base) return; const g = bb % 4;
      if (b === DOHWA[g]) add('도화', k); if (b === YEOKMA[g]) add('역마', k); if (b === HWAGAE[g]) add('화개', k);
    });
    if (YANGIN[ds] === b) add('양인', k);
    if (MUNCHANG[ds] === b) add('문창귀인', k);
    if (k !== 'day' && gm.includes(b)) add('공망', k);
  });
  if (GOEGANG.includes(ds + '-' + db)) ss['괴강'] = ['일주'];
  if (BAEKHO.includes(ds + '-' + db)) ss['백호'] = ['일주'];
  // rel: [종류, 쉬운 제목, 풀이, 명리 근거]
  const rel = [], pair = (i, j, verb) => T(PSHORT[keys[i]] + ' 자리와 ' + PSHORT[keys[j]] + ' 자리가 ' + verb, 'The ' + PSHORT[keys[i]] + ' seat and the ' + PSHORT[keys[j]] + ' seat ' + verb);
  for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
    const a = P[keys[i]], b = P[keys[j]], na = PNAME[keys[i]] + ' ' + a.branchH, nb = PNAME[keys[j]] + ' ' + b.branchH;
    const sa = PW(PNAME2[keys[i]] + '간') + ' ' + a.stemH, sb = PW(PNAME2[keys[j]] + '간') + ' ' + b.stemH, withMe = keys[i] === 'day' || keys[j] === 'day';
    if (isClash(a.b, b.b)) rel.push(['충', pair(i, j, T('부딪힘', 'collide')), T('두 영역 사이에 변동과 이동이 잦습니다. 한쪽을 택하기보다 일정과 거리를 조절하는 편이 낫습니다.', 'Change and movement are frequent between the two areas. Adjusting schedule and distance works better than choosing one side.'), na + ' · ' + nb + T(' 충', ' clash')]);
    if (HAP[a.b] === b.b) rel.push(['합', pair(i, j, T('서로 끌어당김', 'pull toward each other')), T('두 영역의 인연이 깊고 쉽게 떨어지지 않습니다.', 'The tie between the two areas is deep and does not come apart easily.'), na + ' · ' + nb + T(' 합', ' bond')]);
    if (isHyeong(a.b, b.b)) rel.push(['형', pair(i, j, T('삐걱거림', 'grate on each other')), T('두 영역 사이에 조정과 마찰이 반복됩니다. 약속과 서류를 분명히 해 두면 줄어듭니다.', 'Adjustment and friction repeat between the two areas. Clear promises and paperwork reduce it.'), na + ' · ' + nb + T(' 형', ' friction')]);
    if (STEM_HAP(a.s, b.s)) rel.push(['합', withMe ? T('나와 ' + PSHORT[keys[i] === 'day' ? keys[j] : keys[i]] + ' 자리가 정으로 묶임', 'You and the ' + PSHORT[keys[i] === 'day' ? keys[j] : keys[i]] + ' seat are tied by affection') : pair(i, j, T('서로를 따라감', 'follow each other')), withMe ? T('그 자리의 사람이나 일에 마음이 쏠립니다. 정이 깊은 대신 결단이 늦어질 수 있습니다.', 'Your heart leans toward the people and matters of that seat. Affection is deep, but decisions may come late.') : T('두 기운이 묶여 본래 성질이 누그러집니다.', 'The two energies are tied together and their original nature softens.'), sa + ' · ' + sb + T(' 합', ' bond')]);
    if (['0-6', '1-7', '2-8', '3-9'].includes(Math.min(a.s, b.s) + '-' + Math.max(a.s, b.s))) rel.push(['충', pair(i, j, T('생각이 엇갈림', 'think at cross purposes')), T('방침과 생각이 자주 바뀝니다. 중요한 결정은 하루 묵혀서 하세요.', 'Plans and thinking change often. Sleep on important decisions for a day.'), sa + ' · ' + sb + T(' 충', ' clash')]);
    if (a.b === b.b && [4, 6, 9, 11].includes(a.b)) rel.push(['형', T('같은 기운이 겹쳐 스스로를 볶음', 'The same energy doubles up and you wear yourself down'), T('혼자 끙끙대기 쉽습니다. 고민은 밖으로 꺼내 놓으세요.', 'You tend to struggle alone. Bring your worries out into the open.'), PNAME[keys[i]] + ' · ' + PNAME[keys[j]] + ' ' + a.branchH + a.branchH + T(' 자형', ' self-friction')]);
  }
  const bs = keys.map(k => P[k].b);
  [[8, 0, 4, 4], [11, 3, 7, 0], [2, 6, 10, 1], [5, 9, 1, 3]].forEach(t => {
    const has = t.slice(0, 3).filter(b => bs.includes(b));
    if (has.length === 3) rel.push(['합', T(EL[t[3]] + ' 기운이 하나로 뭉침', EL[t[3]] + ' energy gathers into one'), T(EL[t[3]] + ' 기운이 사주 전체를 이끕니다. 이 기운이 가리키는 분야에서 일이 크게 벌어집니다.', EL[t[3]] + ' energy leads the whole chart. Things happen on a large scale in the field this energy points to.'), has.map(b => BRANCHES_H[b]).join('') + T(' 삼합 ' + EL[t[3]] + '국', ' triple bond · ' + EL[t[3]])]);
    else if (has.length === 2 && bs.includes(t[1])) rel.push(['합', T(EL[t[3]] + ' 기운이 반쯤 뭉쳐 있음', EL[t[3]] + ' energy is half gathered'), T('나머지 한 글자가 들어오는 해에 ' + EL[t[3]] + ' 기운이 크게 움직입니다.', 'In a year when the missing character arrives, ' + EL[t[3]] + ' energy moves strongly.'), has.map(b => BRANCHES_H[b]).join('') + T(' 반합 ' + EL[t[3]] + '국', ' half bond · ' + EL[t[3]])]);
  });
  [[2, 3, 4, 0], [5, 6, 7, 1], [8, 9, 10, 3], [11, 0, 1, 4]].forEach(t => { if (t.slice(0, 3).every(b => bs.includes(b))) rel.push(['합', T(EL[t[3]] + ' 기운이 매우 강함', EL[t[3]] + ' energy is very strong'), T('한 계절의 글자가 모두 모여 있습니다.', 'All the characters of one season are gathered.'), t.slice(0, 3).map(b => BRANCHES_H[b]).join('') + T(' 방합 ' + EL[t[3]] + '국', ' seasonal bond · ' + EL[t[3]])]); });
  const outs = [P.year.s, P.month.s].concat(P.hour ? [P.hour.s] : []), hid = HIDDEN[P.month.b].slice().reverse();
  let gp = hid[0], how = T('월지 ' + P.month.branchH + '의 정기 ' + STEMS_H[hid[0]], 'main hidden stem ' + STEMS_H[hid[0]] + ' of the month branch ' + P.month.branchH);
  for (const s of hid) if (outs.includes(s)) { gp = s; how = T('월지 ' + P.month.branchH + '의 지장간 ' + STEMS_H[s] + '이 천간에 투출', 'hidden stem ' + STEMS_H[s] + ' of the month branch ' + P.month.branchH + ' shows among the heavenly stems'); break; }
  const gGod = tenGod(ds, gp), gg = GYEOK[gGod].slice(); if (gGod === '겁재' && ds % 2 === 1) gg[0] = T('월겁격', EN_P.GYEOK_ALT);
  const mb = P.month.b, season = [11, 0, 1].includes(mb) ? '겨울' : [5, 6, 7].includes(mb) ? '여름' : [2, 3, 4].includes(mb) ? '봄' : '가을';
  const johu = season === '겨울' ? 1 : season === '여름' ? 4 : -1;
  return { keys, grp, ss, rel, gm, season, johu, gyeok: { god: gGod, how, g: gg }, us: k => unseong(ds, P[k].b) };
}

/* 운(대운·세운·월운·일진) 한 기둥 평가. age를 주면 나이에 맞는 말로 바꾼다. */
function evalLuck(p, isYear, age) {
  const sj = S.saju, P = sj.P, need = sj.need, ni = S.ni, ds = P.day.s, kid = age != null && age < 20, baby = age != null && age < 6;
  const es = e => (e === need ? 1 : mod(e + 1, 5) === need ? 0.5 : mod(e + 2, 5) === need ? -1 : 0) + (e === ni.johu && e !== need ? 0.5 : 0);
  const help = es(p.sEl) + es(p.bEl);
  let score = help;
  const c = [baby ? T('잔병치레와 안전사고', 'small illnesses and safety accidents') : (kid ? KID_CAUTION : GOD_CAUTION)[p.sGod]], good = [], tech = [];
  [['year', 0.5], ['month', 1], ['day', 1], ['hour', 0.5]].forEach(([k, w]) => {
    const n = P[k]; if (!n || !isClash(p.b, n.b)) return;
    score -= w; c.push(T((kid ? PAL_KID : PALACE)[k] + ' 쪽의 변동', 'changes around ' + (kid ? PAL_KID : PALACE)[k])); tech.push(PNAME[k] + T(' 충', ' clash'));
  });
  if (isHyeong(p.b, P.day.b)) { score -= 0.5; c.push(kid ? T('다툼, 무리한 일정', 'quarrels, an overfull schedule') : T('다툼, 서류 문제, 무리한 일정', 'quarrels, paperwork trouble, an overfull schedule')); tech.push(T('일지 형', 'day-branch friction')); }
  if (HAP[p.b] === P.day.b) { score += 0.5; good.push(kid ? T('가까운 사람과의 정, 안정된 생활', 'affection from those close, a settled life') : T('가까운 사람과의 결속, 정착', 'closeness with those near you, settling down')); tech.push(T('일지 합', 'day-branch bond')); }
  if (GUIIN[ds].includes(p.b)) { score += 0.5; good.push(T('돕는 사람과 뜻밖의 연결', 'helpers and unexpected connections')); tech.push(SSN('천을귀인')); }
  if (MUNCHANG[ds] === p.b) { if (!baby) good.push(kid ? T('공부, 시험, 글짓기와 발표', 'study, tests, writing and presenting') : T('시험, 자격, 글과 발표', 'exams, credentials, writing and presenting')); tech.push(SSN('문창귀인')); }
  const g = P.day.b % 4, gy = P.year.b % 4;
  if (p.b === YEOKMA[g] || p.b === YEOKMA[gy]) { good.push(baby ? T('이사, 여행', 'a move, travel') : kid ? T('이사, 전학, 여행', 'a move, a new school, travel') : T('이동, 출장, 이사, 해외 인연', 'movement, business trips, a move, ties abroad')); tech.push(SSN('역마')); }
  if (p.b === DOHWA[g] || p.b === DOHWA[gy]) { if (!baby) good.push(kid ? T('친구들 사이의 인기', 'popularity among friends') : T('인기와 새 인연', 'popularity and new connections')); if (!kid) c.push(T('이성 문제와 구설', 'romantic trouble and gossip')); tech.push(SSN('도화')); }
  if (YANGIN[ds] === p.b) { if (!baby) c.push(kid ? T('다치는 일, 과격한 장난', 'injuries, rough play') : T('과속, 다툼, 다치는 일', 'speeding, quarrels, injuries')); tech.push(SSN('양인')); }
  if (ni.gm.includes(p.b)) { score -= 0.25; if (!baby) c.push(T('기대만큼 결과가 따르지 않는 일', 'results that fall short of expectations')); tech.push(SSN('공망')); }
  if (STEM_HAP(p.s, ds)) { if (!baby) good.push(kid ? T('마음이 쏠리는 사람이나 관심사', 'a person or interest that captures their heart') : T('사람이나 일과 깊게 묶이는 인연', 'a deep tie to a person or to work')); tech.push(T('일간 합', 'Day Master bond')); }
  if (isYear) { const sm = samjae(P.year.b, p.b); if (sm) { score -= 0.5; c.push(kid ? T('삼재라 큰 환경 변화', 'a big change of surroundings (three-year trial)') : T('삼재라 큰 변동과 무리한 확장', 'big upheaval and overexpansion (three-year trial)')); tech.push(sm); } }
  return { score, cautions: c, good, tech, help, us: unseong(ds, p.b), grade: score >= 1 ? ['up', T('순풍', 'Fair wind')] : score <= -1 ? ['dn', T('주의', 'Caution')] : ['mid', T('평이', 'Even')] };
}
function monthPillars(yr, ds) {
  const ys = mod(yr - 4, 10);
  return Array.from({ length: 12 }, (_, i) => { const p = pillar(mod((ys % 5) * 2 + 2 + i, 10), mod(i + 2, 12), ds); p.label = T(((i + 1) % 12 + 1) + '월', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][(i + 1) % 12]); return p; });
}

/* ===== 분야별 풀이: [제목, 쉬운 풀이, 명리 근거] ===== */
function fields() {
  if (EN) return fieldsEN();
  const sj = S.saju, P = sj.P, ni = S.ni, g = ni.grp, male = S.user.gender === 'M';
  const dm = DAY_TXT[P.day.s], us = ni.us('day'), top = g.indexOf(Math.max.apply(null, g));
  const person = dm[1] + ' ' + plainSeason(mod(P.month.bEl - sj.me, 5)) + ' 타고난 기운의 결을 보면, ' + US_TXT[us] + '. ' + (g[top] >= 3 ? GROUP_PLAIN[top] + '의 기운이 많아 ' + GROUP_TXT[top][0] : '');
  let work = '직업으로 보면 ' + GYEOK_NICK[ni.gyeok.god] + ' 유형입니다. ' + ni.gyeok.g[1], workWhy = ni.gyeok.g[0] + ' (' + ni.gyeok.how + ')';
  if (g[3] >= 2 && g[4] >= 1) work += ' 책임을 지는 힘과 배우는 힘이 이어져 있어, 조직 안에서 자격과 직책으로 올라가는 길이 유리합니다.';
  else if (g[1] >= 2 && g[2] >= 1) work += ' 재능이 돈으로 이어지는 구조라, 내 기술과 결과물을 직접 파는 길이 유리합니다.';
  else if (g[3] === 0) work += ' 틀에 매이는 기운이 약해, 큰 조직보다 재량이 넓은 자리에서 성과가 납니다.';
  let money, moneyWhy = '재성 ' + g[2] + '개, ' + (sj.strong ? '신강' : '신약');
  if (g[2] === 0) money = '타고난 사주에 돈의 기운이 겉으로 드러나 있지 않습니다. ' + GROUP_TXT[2][1] + ' 돈의 기운이 들어오는 시기에 수입의 흐름이 크게 바뀝니다.';
  else if (!sj.strong && g[2] >= 2) { money = '돈을 벌 기회는 많이 보이는데, 그것을 쥘 내 힘이 약한 구조입니다. 혼자 다 잡으려 하면 지칩니다. 자격, 인맥, 동료로 힘을 먼저 키우고 감당할 만큼만 벌이세요.'; moneyWhy += ', 재다신약'; }
  else if (sj.strong) money = '돈을 감당할 힘을 타고났습니다. 벌이를 넓히는 데 적극적이어도 좋고, 번 것을 지키는 장치만 만들어 두면 됩니다.';
  else money = '돈의 기운은 있지만 내 힘이 약한 편이라, 무리해서 벌면 몸과 관계가 먼저 상합니다. 고정 수입을 바탕에 두고 조금씩 넓히세요.';
  if (g[1] >= 1 && g[2] >= 1) { money += ' 재능이 돈을 낳는 구조라 기술과 콘텐츠가 수입이 됩니다.'; moneyWhy += ', 식상생재'; }
  if (g[0] >= 3) money += ' 돈을 나눠야 하는 사람이 많은 구조라 보증과 공동 투자는 피하세요.';
  const sp = male ? g[2] : g[3], spName = male ? '재성' : '관성';
  let love = SPOUSE[P.day.bGod];
  love += sp === 0 ? ' 배우자의 기운이 겉으로 드러나 있지 않아, 인연이 늦게 나타나거나 운이 들어오는 시기에 맺어지는 편입니다.' : sp >= 3 ? ' 인연은 많지만 고르고 정리하는 것이 숙제입니다.' : '';
  if (ni.rel.some(r => r[0] === '충' && r[3].indexOf('일지') >= 0)) love += ' 배우자 자리가 다른 자리와 부딪혀, 함께 있어도 각자의 시간과 거리가 필요합니다.';
  if (ni.ss['도화']) love += ' 매력의 별이 있어 이성에게 호감을 사는 편입니다.';
  const over = sj.count.map((n, e) => n >= 3 ? e : -1).filter(e => e >= 0), lack = sj.count.map((n, e) => n === 0 ? e : -1).filter(e => e >= 0);
  let care = '';
  if (over.length) care += over.map(e => EL[e]).join(', ') + ' 기운이 많아 명리에서는 ' + over.map(e => ORGAN[e]).join(' / ') + ' 쪽에 부담이 실린다고 봅니다. ';
  if (lack.length) care += lack.map(e => EL[e]).join(', ') + ' 기운이 없어 ' + lack.map(e => ORGAN[e]).join(' / ') + ' 쪽을 평소에 챙기라고 봅니다. ';
  if (!care) care = '다섯 기운이 고르게 있어 특별히 치우친 곳이 없습니다. ';
  if (ni.johu >= 0) care += ni.season + '에 태어나 ' + (ni.johu === 1 ? '따뜻한' : '시원한') + ' ' + EL[ni.johu] + ' 기운을 채우면 좋습니다. ' + EL_TIP[ni.johu][1] + ' ';
  care += '전통적인 대응 관계이며 의학적 진단이 아닙니다.';
  return [['나는 어떤 사람인가', person, '일간 ' + P.day.stemH + ', 월지 ' + P.month.branchH + ', 일지 십이운성 ' + US_NAME[us]], ['일과 적성', work, workWhy], ['돈', money, moneyWhy], ['연애와 배우자', love, '일지 ' + P.day.branchH + ' ' + P.day.bGod + ', ' + spName + ' ' + sp + '개'], ['몸과 생활', care, '오행 ' + sj.count.join('/') + (ni.johu >= 0 ? ', 조후 ' + EL[ni.johu] : '')]];
}
function palaces() {
  if (EN) return palacesEN();
  const P = S.saju.P, ni = S.ni, th = g => DAEUN[g][0], u = k => ' 분위기를 보면, ' + US_TXT[ni.us(k)] + '.', why = k => PNAME2[k] + '주 ' + P[k].stemH + P[k].branchH + ' · ' + P[k].sGod + '/' + P[k].bGod + ' · 십이운성 ' + US_NAME[ni.us(k)];
  const out = [
    ['조상과 어린 시절 자리', '집안 배경에는 ' + th(P.year.sGod) + '의 기운이 깔려 있고, 그 밑에는 ' + th(P.year.bGod) + '의 흐름이 있습니다. 어린 시절로 보면, ' + STAGE[P.year.bGod][0] + u('year'), why('year')],
    ['부모와 사회생활 자리', '부모와의 관계와 직업 환경에서는 ' + th(P.month.sGod) + '이 겉으로 드러나고 ' + th(P.month.bGod) + '이 중심을 잡습니다. 사주에서 가장 힘이 센 자리라 직업 선택에 그대로 반영됩니다.' + u('month'), why('month')],
    ['나와 배우자 자리', '나 자신과 가장 가까운 사람의 자리입니다. ' + th(P.day.bGod) + '의 기운이 앉아 중년의 생활 방식을 정합니다.' + u('day'), P.day.stemH + P.day.branchH + ' 일주 · 일지 ' + P.day.bGod + ' · 십이운성 ' + US_NAME[ni.us('day')]]
  ];
  if (P.hour) out.push(['자녀와 노년 자리', '자녀, 아랫사람, 일의 결과물과 노년의 자리입니다. ' + th(P.hour.sGod) + '이 드러나고 ' + th(P.hour.bGod) + '으로 마무리됩니다. 노년으로 보면, ' + STAGE[P.hour.bGod][4] + u('hour'), why('hour')]);
  return out;
}

/* ===== AI에 넘기는 명식 요약 ===== */
function factSheet() {
  const sj = S.saju, P = sj.P, ni = S.ni, yNow = new Date().getFullYear(), by = sj.by, f = p => p.stemH + p.branchH;
  const lines = ['성별: ' + (S.user.gender === 'M' ? '남' : '여') + ', ' + by + '년생, 올해 ' + yNow + '년(' + (yNow - by) + '세)'];
  ni.keys.forEach(k => { const p = P[k]; lines.push(PNAME2[k] + '주 ' + f(p) + ': 천간 ' + p.sGod + ', 지지 ' + p.bGod + ', 지장간 ' + HIDDEN[p.b].map(s => STEMS_H[s]).join('') + ', 십이운성 ' + US_NAME[ni.us(k)]); });
  if (!P.hour) lines.push('시주: 모름');
  if (S.user.mbti) lines.push('본인이 밝힌 성격유형(MBTI): ' + S.user.mbti);
  lines.push('일간 ' + P.day.stemH + EL[sj.me] + ', ' + (sj.strong ? '신강' : '신약') + '(돕는 세력 ' + Math.round(sj.ratio * 100) + '%, 득령 ' + (sj.basis.ryeong ? 'O' : 'X') + ' 득지 ' + (sj.basis.ji ? 'O' : 'X') + ' 득세 ' + (sj.basis.se ? 'O' : 'X') + '), 오행 개수 목화토금수 ' + sj.count.join('/'));
  lines.push('억부용신 ' + EL[sj.need] + (ni.johu >= 0 ? ', 조후 ' + EL[ni.johu] + ' (' + ni.season + '생)' : ', ' + ni.season + '생'));
  lines.push('격국: ' + ni.gyeok.g[0] + ' (' + ni.gyeok.how + ') / 십성 개수 ' + GROUP_NAME.map((n, i) => n + ' ' + ni.grp[i]).join(', '));
  lines.push('신살: ' + (Object.keys(ni.ss).map(k => k + '(' + ni.ss[k].join(',') + ')').join(', ') || '없음'));
  lines.push('원국 합충형: ' + (ni.rel.map(r => r[3]).join(', ') || '없음'));
  lines.push('대운(' + (sj.forward ? '순행' : '역행') + ', 대운 시작 전 ' + '0~' + (sj.startAge - 1) + '세는 월주로 봄): ' + sj.daeun.map(d => d.age + '~' + (d.age + 9) + '세 ' + f(d) + ' ' + d.sGod + '/' + d.bGod + ' ' + evalLuck(d, false).grade[1]).join(' | '));
  const ys = []; for (let yr = yNow - 3; yr <= yNow + 6; yr++) { const yp = yearPillar(yr, P.day.s), ev = evalLuck(yp, true); ys.push(yr + ' ' + f(yp) + ' ' + yp.sGod + '/' + yp.bGod + ' ' + US_NAME[ev.us] + ' ' + ev.grade[1] + ' [' + (ev.tech.join(', ') || '-') + ']'); }
  lines.push('세운:\n' + ys.join('\n'));
  return lines.join('\n');
}
function contextText() {
  return factSheet() + '\n타로 주제: ' + TOPICS[S.topic] + '\n뽑은 카드: ' + currentCards().map(c => c.pos + ' = ' + c.c.name + '(' + (c.rev ? '역방향' : '정방향') + ', 오행 ' + EL[c.c.el] + ')').join('; ');
}

/* ===== 사주 탭 ===== */
function renderSaju() {
  const sj = S.saju, P = sj.P, ni = S.ni, yNow = new Date().getFullYear(), by = sj.by;
  const gz = p => elSpan(p.sEl, p.stemH) + elSpan(p.bEl, p.branchH), gzT = p => p.stemH + p.branchH;
  const chip = ev => '<span class="tag g' + ev.grade[0] + '">' + ev.grade[1] + '</span>';
  const why = t => t ? '<p class="why">' + T('명리 근거: ', 'Basis: ') + t + '</p>' : '';
  const cols = [[T('시주', 'Hour'), P.hour, 'hour'], [T('일주', 'Day'), P.day, 'day'], [T('월주', 'Month'), P.month, 'month'], [T('년주', 'Year'), P.year, 'year']];
  const table = '<div class="pillars">' + cols.map(([cap, p, k], i) => p
    ? '<div class="col' + (i === 1 ? ' me' : '') + '"><span class="cap">' + cap + '</span><span class="god ten">' + G(p.sGod) + '</span><span class="han c' + p.sEl + '">' + p.stemH + '</span><span class="rd">' + p.stem + ' · ' + EL[p.sEl] + '</span><span class="god ten">' + G(p.bGod) + '</span><span class="han c' + p.bEl + '">' + p.branchH + '</span><span class="rd">' + p.branch + ' · ' + EL[p.bEl] + '</span><span class="god">' + PSHORT[k] + '</span></div>'
    : '<div class="col"><span class="cap">' + cap + '</span><span class="god">&nbsp;</span><span class="han" style="color:var(--line)">?</span><span class="rd">' + T('시 모름', 'unknown') + '</span></div>').join('') + '</div>';
  const max = Math.max.apply(null, sj.count);
  const bars = '<div class="bars">' + sj.count.map((n, e) => '<div class="bar c' + e + '"><span>' + EL[e] + ' ' + EL_H[e] + '</span><span class="trk"><i style="width:' + (n / max * 100) + '%"></i></span><b>' + n + '</b></div>').join('') + '</div>';
  const dm = DAY_TXT[P.day.s], cur = sj.daeun.filter(d => d.year <= yNow).pop();
  const strip = '<div class="daeun">' + sj.daeun.map(d => '<div class="d' + (d === cur ? ' now' : '') + '"><small>' + T(d.age + '세', 'age ' + d.age) + '</small><span class="han c' + d.sEl + '">' + d.stemH + '</span><span class="han c' + d.bEl + '">' + d.branchH + '</span><small>' + d.year + '~</small></div>').join('') + '</div>';
  const extra = (ev, past) => (ev.good.length ? '<p class="note"><span class="c0">' + (past ? T('좋았을 만한 것', 'What likely went well') : T('기회', 'Opportunity')) + '</span>: ' + ev.good.join(' / ') + '</p>' : '') + '<p class="note"><span class="c1">' + (past ? T('힘들었을 만한 것', 'What was likely hard') : T('조심할 것', 'Caution')) + '</span>: ' + ev.cautions.join(' / ') + '</p>';
  const dItem = (d, past) => {
    const a1 = d.age + 2, a2 = d.age + 7, ev = evalLuck(d, false, a1);
    const flow = ev.help > 0 ? T(' 나에게 필요한 기운이 들어와 ' + (past ? '일이 비교적 수월하게 풀렸을 때입니다.' : '힘을 받는 때입니다.'), ' The energy you need comes in, so ' + (past ? 'things went relatively smoothly.' : 'you are given strength.')) : ev.help < 0 ? T(' 나에게 필요한 기운이 눌려 ' + (past ? '애쓴 만큼 풀리지 않았을 때입니다.' : '속도보다 관리가 중요한 때입니다.'), ' The energy you need is pressed down, so ' + (past ? 'effort did not pay off as much as it should have.' : 'management matters more than speed.')) : '';
    return '<div class="it' + (d === cur ? ' cur' : '') + '"><b>' + T(d.age + '~' + (d.age + 9) + '세', 'Age ' + d.age + '–' + (d.age + 9)) + ' · ' + d.year + '~' + (d.year + 9) + ' · ' + gz(d) + ' ' + G(d.sGod) + '/' + G(d.bGod) + ' · ' + theme(d.sGod, a1) + '</b>' + chip(ev) +
      '<p><span class="lead">' + T(d.age + '~' + (d.age + 4) + '세', 'Age ' + d.age + '–' + (d.age + 4)) + '</span> ' + stageText(d.sGod, a1) + '</p><p><span class="lead">' + T((d.age + 5) + '~' + (d.age + 9) + '세', 'Age ' + (d.age + 5) + '–' + (d.age + 9)) + '</span> ' + (d.sGod === d.bGod && stageIdx(a1) === stageIdx(a2) && a1 >= 6 ? T('앞 시기와 같은 흐름이 이어지며 더 짙어집니다.', 'The same flow as the earlier half continues and deepens.') : stageText(d.bGod, a2)) + T(' 전체 분위기를 보면, ', ' In its overall mood, ') + US_TXT[ev.us] + '.' + flow + '</p>' + luckYuksin(d) + extra(ev, past) +
      why(gzT(d) + T(' 대운 · ', ' luck cycle · ') + G(d.sGod) + '/' + G(d.bGod) + T(' · 십이운성 ', ' · life stage ') + US_NAME[ev.us] + (ev.tech.length ? ' · ' + ev.tech.join(', ') : '')) + '</div>';
  };
  const yItem = yr => {
    const age = yr - by, yp = yearPillar(yr, P.day.s), ev = evalLuck(yp, true, age), past = yr < yNow, si = stageIdx(age);
    const st = stageText(yp.sGod, age), half = age < 6 ? '' : T(' 하반기' + (past ? '에는 ' : '로 갈수록 ') + theme(yp.bGod, age) + ' 쪽 일이 ' + (past ? '겹쳤습니다.' : '겹칩니다.'), (past ? ' In the second half, matters of ' : ' Toward the second half, matters of ') + theme(yp.bGod, age) + (past ? ' were added.' : ' are added.'));
    const body = EN ? (past ? st.replace(/^A (time|period)/, 'A year') + half : (age < 20 || age >= 60 ? st.replace(/^A (time|period)/, 'A year') : GOD_YEAR[yp.sGod]) + half + ' In its overall mood, ' + US_TXT[ev.us] + '.')
      : past ? st.replace('시기입니다', '해였습니다').replace('때입니다', '해였습니다') + half
      : (age < 20 || age >= 60 ? st.replace('시기입니다', '해입니다').replace('때입니다', '해입니다') : GOD_YEAR[yp.sGod]) + half + ' 전체 분위기를 보면, ' + US_TXT[ev.us] + '.';
    return '<div class="it' + (yr === yNow ? ' cur' : '') + '"><b>' + T(yr + '년 · ' + age + '세', yr + ' · age ' + age) + ' · ' + gz(yp) + ' ' + G(yp.sGod) + '/' + G(yp.bGod) + ' · ' + T(theme(yp.sGod, age) + '의 해', 'a year of ' + theme(yp.sGod, age)) + '</b>' + chip(ev) + (yr === yNow ? '<span class="tag">' + T('올해', 'This year') + '</span>' : '') + '<p>' + body + '</p>' + luckYuksin(yp) + extra(ev, past) +
      why(gzT(yp) + T('년 · ', ' year · ') + G(yp.sGod) + '/' + G(yp.bGod) + T(' · 십이운성 ', ' · life stage ') + US_NAME[ev.us] + (ev.tech.length ? ' · ' + ev.tech.join(', ') : '')) + '</div>';
  };
  const months = yr => '<div class="months">' + monthPillars(yr, P.day.s).map(p => { const ev = evalLuck(p, false); return '<div class="mo"><b>' + p.label + '</b>' + chip(ev) + '<small>' + DAEUN[p.sGod][0] + '</small></div>'; }).join('') + '</div>';
  const pickYears = []; for (let yr = by; yr <= by + 90; yr++) pickYears.push(yr);
  const selY = S.premium && S.selYear >= by && S.selYear <= by + 90 ? S.selYear : yNow;
  const yearBox = yr => { const sc = luckScores(yearPillar(yr, P.day.s), true), b = (n, v) => '<div class="sbar"><span>' + n + '</span><span class="trk"><i style="--w:' + v + '%"></i></span><b>' + v + '</b></div>';
    return '<div class="panel sbars">' + b(T('총운', 'Overall'), sc.total) + (yr - by < 20 ? b(T('공부·성장', 'Study · growth'), sc.career) + b(T('친구·관계', 'Friends'), sc.love) : b(T('재물', 'Money'), sc.wealth) + b(T('일·명예', 'Work · standing'), sc.career) + b(T('애정', 'Love'), sc.love)) + '</div><div class="read">' + yItem(yr) + '</div><h3>' + T(yr + '년 월별 흐름', yr + ' month by month') + '</h3>' + months(yr); };
  S.yearBox = yearBox; S.yearRange = [by, by + 90];
  const pastD = sj.daeun.filter(d => d.year + 9 < yNow), futD = sj.daeun.filter(d => d.year > yNow);
  const earlyAll = '<div class="it"><b>' + T('0~' + (sj.startAge - 1) + '세', 'Age 0–' + (sj.startAge - 1)) + ' · ' + THEME_KID[P.month.bGod] + '</b><p>' + STAGE[P.month.bGod][0] + T(' 겉으로 드러난 집안 분위기로 보면, ', ' Seen through the mood of the home: ') + STAGE[P.month.sGod][0] + '</p>' + why(T('대운이 시작되기 전이라 부모 자리인 월주 ' + gzT(P.month) + '(' + P.month.sGod + '/' + P.month.bGod + ')로 봄', 'Before the first luck cycle begins, read from the month pillar ' + gzT(P.month) + ' (' + G(P.month.sGod) + '/' + G(P.month.bGod) + '), the parents\' seat')) + '</div>', early = by + sj.startAge > yNow ? '' : earlyAll;
  const years = []; for (let yr = Math.max(by, yNow - 3); yr <= yNow + 10; yr++) years.push(yr);
  const its = arr => '<div class="read">' + arr.map(a => '<div class="it"><b>' + a[0] + '</b><p>' + a[1] + '</p>' + why(a[2]) + '</div>').join('') + '</div>';
  const grpTxt = ni.grp.map((n, i) => n >= 3 ? [T(GROUP_PLAIN[i] + '의 기운이 많음', 'Plenty of the energy of ' + GROUP_PLAIN[i]), GROUP_TXT[i][0], GROUP_NAME[i] + T(' ' + n + '개', ' ×' + n)] : n === 0 ? [T(GROUP_PLAIN[i] + '의 기운이 드러나지 않음', 'The energy of ' + GROUP_PLAIN[i] + ' does not show'), GROUP_TXT[i][1], T(GROUP_NAME[i] + ' 없음', 'No ' + GROUP_NAME[i])] : null).filter(Boolean);
  const ssArr = Object.keys(ni.ss).map(k => [EN ? SS_PLAIN[k].charAt(0).toUpperCase() + SS_PLAIN[k].slice(1) : SS_PLAIN[k], SS_TXT[k], SSN(k) + ' · ' + ni.ss[k].map(PW).join(', ')]);
  const str = sj.ratio > 0.42 && sj.ratio < 0.58 ? (sj.strong ? T('균형에 가깝지만 조금 강한 편', 'close to balanced, slightly strong') : T('균형에 가깝지만 조금 약한 편', 'close to balanced, slightly weak')) : sj.strong ? T('강한 편', 'on the strong side') : T('약한 편', 'on the weak side');
  const prem = graphHTML() + yuksinDetailHTML() +
    '<div class="block" id="s-struct"><h3>' + T('타고난 유형', 'Your innate type') + '</h3>' + its([[T(GYEOK_NICK[ni.gyeok.god] + ' 유형', GYEOK_NICK[ni.gyeok.god]), ni.gyeok.g[1], ni.gyeok.g[0] + ' (' + ni.gyeok.how + ')']].concat(grpTxt)) + '</div>' +
    '<div class="block"><h3>' + T('타고난 별', 'Your innate stars') + '</h3>' + (ssArr.length ? its(ssArr) : '<p class="note">' + T('두드러진 별이 없습니다.', 'No star stands out.') + '</p>') + '</div>' +
    '<div class="block"><h3>' + T('삶의 영역끼리의 관계', 'How the areas of your life relate') + '</h3>' + (ni.rel.length ? its(ni.rel.map(r => [r[1], r[2], r[3]])) : '<p class="note">' + T('서로 부딪히는 자리가 없어 구조가 안정적입니다.', 'No seats clash, so the structure is stable.') + '</p>') + '</div>' +
    '<div class="block" id="s-field"><h3>' + T('분야별 풀이', 'Reading by area') + '</h3>' + its(fields()) + '</div>' +
    '<div class="block"><h3>' + T('자리별 풀이', 'Reading by seat') + '</h3>' + its(palaces()) + '</div>' +
    '<div class="block needs-ai"' + (S.ai ? '' : ' hidden') + '><h3>' + T('AI 정밀 풀이', 'AI in-depth reading') + '</h3><div class="panel block"><p class="note">' + T('내 사주 전체를 AI가 읽고 지나온 운, 지금, 앞으로의 운을 쉬운 말로 이어서 풀어 줍니다. 1분쯤 걸립니다.', 'The AI reads your whole chart and explains your past, present and coming luck in plain words. It takes about a minute.') + '</p><button type="button" class="primary" id="deepGo">' + T('정밀 풀이 받기', 'Get the in-depth reading') + '</button><div class="ai-out" id="deepOut" aria-live="polite">' + esc(S.deepText || '') + '</div></div></div>' +
    '<div class="block" id="s-daeun"><h3>' + T('10년 단위 운 한눈에', 'Ten-year luck cycles at a glance') + '</h3>' + strip + why(T('대운 ' + (sj.forward ? '순행' : '역행') + ', 대운수 ' + sj.startAge + ' (절기까지 ' + (sj.startExact * 3).toFixed(1) + '일)', 'Luck cycles run ' + (sj.forward ? 'forward' : 'backward') + ', starting at age ' + sj.startAge + ' (' + (sj.startExact * 3).toFixed(1) + ' days to the solar term)')) + '</div>' +
    '<div class="block"><h3>' + T('지나온 운', 'Luck so far') + '</h3><div class="read">' + early + pastD.map(d => dItem(d, true)).join('') + (!early && !pastD.length ? '<p>' + T('아직 지나온 시기가 없습니다.', 'No period has passed yet.') + '</p>' : '') + '</div></div>' +
    '<div class="block"><h3>' + T('지금의 운', 'Luck now') + '</h3><div class="read">' + (cur ? dItem(cur, false) : earlyAll) + '</div></div>' +
    '<div class="block"><h3>' + T('다가올 운', 'Luck ahead') + '</h3><div class="read">' + futD.map(d => dItem(d, false)).join('') + '</div></div>' +
    '<div class="block" id="s-month"><h3>' + T(yNow + '년 월별 흐름', yNow + ' month by month') + '</h3>' + months(yNow) + '<h3>' + T((yNow + 1) + '년 월별 흐름', (yNow + 1) + ' month by month') + '</h3>' + months(yNow + 1) + '<p class="why">' + T('명리 근거: 월은 절기 기준(2월은 입춘부터)', 'Basis: months follow the solar terms (February begins at the Start of Spring)') + '</p></div>' +
    '<div class="block" id="s-year"><h3>' + T('해마다 조심할 것', 'Cautions year by year') + ' · ' + years[0] + '~' + years[years.length - 1] + '</h3><div class="read">' + years.map(yItem).join('') + '</div></div>' + summaryHTML();
  const jump = '<div class="chips">' + (S.premium ? [['s-yuk', T('육신', 'Ten gods')], ['s-pick', T('연도 선택', 'Pick a year')], ['s-graph', T('인생 그래프', 'Life graph')], ['s-field', T('분야별', 'By area')], ['s-daeun', T('지나온 운·다가올 운', 'Luck cycles')], ['s-month', T('월별', 'Monthly')], ['s-year', T('연도별', 'Yearly')], ['s-sum', T('종합의견', 'Summary')]].map(j => '<button type="button" class="chip" data-jump="' + j[0] + '">' + j[1] + '</button>').join('') : '') + '<button type="button" class="chip' + (S.why ? ' on' : '') + '" data-why>' + (S.why ? T('명리 근거 숨기기', 'Hide the basis') : T('명리 근거 보기', 'Show the basis')) + '</button></div>';
  $('v-saju').classList.toggle('show-why', !!S.why);
  $('v-saju').innerHTML = heroHTML() + fortuneHTML() +
    '<div class="block"><h2>' + T('사주 원국', 'Your saju chart') + TIER.free + '</h2><h3>' + T(sj.sajuYear + '년생 ' + sj.animal + '띠 · ' + ni.season + '에 태어난 ' + P.day.stem + EL[P.day.sEl] + '(' + P.day.stemH + ')', 'Born in ' + sj.sajuYear + ', year of the ' + sj.animal + ' · ' + P.day.stem + ' ' + EL[P.day.sEl] + ' (' + P.day.stemH + ') born in ' + SEASON_EN[ni.season]) + '</h3>' + table + '<p class="note">' + T('네 기둥은 태어난 해, 달, 날, 시각입니다. 가운데 일주의 윗글자가 나 자신입니다.', 'The four pillars are the year, month, day and hour of your birth. The upper character of the Day pillar is you.') + '</p>' + correctionHTML() + jump + '</div>' +
    '<div class="block"><h3>' + T('다섯 기운(오행)의 분포', 'Balance of the five elements') + '</h3><div class="panel">' + bars + '</div></div>' + yuksinHTML() +
    '<div class="block"><h3>' + T('나는 어떤 사람인가', 'What kind of person am I') + '</h3><div class="panel"><p class="kv"><b>' + elSpan(P.day.sEl, P.day.stemH + ' ' + dm[0]) + '</b></p><p>' + dm[1] + ' ' + plainSeason(mod(P.month.bEl - sj.me, 5)) + '</p></div></div>' + mbtiHTML() +
    '<div class="block"><h3>' + T('타고난 힘과 나에게 필요한 기운', 'Your innate strength and the energy you need') + '</h3><div class="panel"><p>' + T('타고난 내 힘은 <b>' + str + '</b>입니다(나를 돕는 힘 ' + Math.round(sj.ratio * 100) + '%). ' + (sj.strong ? '힘이 넉넉하니 쓰고 덜어 내는 쪽이 좋습니다.' : '혼자 버티기보다 도움과 준비가 힘이 됩니다.') + ' 나에게 가장 필요한 기운은 <b>' + elSpan(sj.need, EL[sj.need] + ' ' + EL_H[sj.need]) + '</b>입니다.' + (ni.johu < 0 ? '' : ni.johu === sj.need ? ' 태어난 계절로 봐도 같은 기운이 필요해 채웠을 때 효과가 큽니다.' : ' ' + ni.season + '에 태어나 <b>' + elSpan(ni.johu, EL[ni.johu] + ' ' + EL_H[ni.johu]) + '</b> 기운도 함께 필요합니다.'), 'Your innate strength is <b>' + str + '</b> (' + Math.round(sj.ratio * 100) + '% of the chart supports you). ' + (sj.strong ? 'You have strength to spare, so using it and drawing it off works best.' : 'Help and preparation serve you better than holding out alone.') + ' The energy you need most is <b>' + elSpan(sj.need, EL[sj.need] + ' ' + EL_H[sj.need]) + '</b>.' + (ni.johu < 0 ? '' : ni.johu === sj.need ? ' Your birth season calls for the same energy, so adding it has a strong effect.' : ' Born in ' + SEASON_EN[ni.season] + ', you also need <b>' + elSpan(ni.johu, EL[ni.johu] + ' ' + EL_H[ni.johu]) + '</b> energy.')) + '</p><p class="note" style="margin-top:6px">' + T('채우는 방법: ', 'How to add it: ') + EL_TIP[sj.need][0] + '. ' + EL_TIP[sj.need][1] + '</p>' + why(T((sj.strong ? '신강' : '신약') + ' · 득령 ' + (sj.basis.ryeong ? '○' : '×') + ' 득지 ' + (sj.basis.ji ? '○' : '×') + ' 득세 ' + (sj.basis.se ? '○' : '×') + ' · 억부용신 ' + EL[sj.need] + (ni.johu >= 0 ? ' · 조후 ' + EL[ni.johu] : ''), (sj.strong ? 'Strong' : 'Weak') + ' chart · season ' + (sj.basis.ryeong ? '○' : '×') + ' roots ' + (sj.basis.ji ? '○' : '×') + ' allies ' + (sj.basis.se ? '○' : '×') + ' · balancing element ' + EL[sj.need] + (ni.johu >= 0 ? ' · seasonal need ' + EL[ni.johu] : ''))) + '</div></div>' +
    '<div class="block" id="s-pick"><h3>' + T('연도별 운세 · 보고 싶은 해를 고르세요', 'Year-by-year fortune · pick the year you want') + '</h3><div class="yearpick"><button type="button" class="ghost" data-ystep="-1" aria-label="' + T('이전 해', 'Previous year') + '">◀</button><select id="yearSel" aria-label="' + T('연도 선택', 'Pick a year') + '">' + pickYears.map(y => '<option value="' + y + '"' + (y === selY ? ' selected' : '') + '>' + T(y + '년 · ' + (y - by) + '세' + (y === yNow ? ' (올해)' : ''), y + ' · age ' + (y - by) + (y === yNow ? ' (this year)' : '')) + '</option>').join('') + '</select><button type="button" class="ghost" data-ystep="1" aria-label="' + T('다음 해', 'Next year') + '">▶</button></div><div id="yearBox" class="block">' + yearBox(selY) + '</div>' + (S.premium ? '' : '<p class="note">' + T('올해 말고 다른 해는 이 사주를 열면 볼 수 있습니다.', 'Years other than this one open when you open this saju.') + '</p>') + '</div>' +
    lockWrap(prem, T('육신별 풀이, 인생 그래프, 지나온 운과 다가올 운, 연도별 운세, 종합의견이 한 번 결제로 모두 열립니다', 'One payment opens the ten-gods reading, life graph, luck cycles, year-by-year fortune and summary'));
}
function renderAll() { Access.refresh(); S.saju = calcSaju(S.user); S.ni = natalInfo(); renderWho(); renderSaju(); renderTarot(); renderMatch(); renderReading(); }

let deepBusy = false;
async function askDeep() {
  const out = $('deepOut'), btn = $('deepGo');
  if (!S.ai || deepBusy) return;
  deepBusy = true; btn.disabled = true; out.textContent = T('사주를 읽는 중입니다.', 'Reading your chart.');
  const prompt = '당신은 30년 경력의 명리 상담가입니다. 아래 명식 자료만을 근거로 한국어 감명문을 쓰세요. 자료에 없는 간지나 신살을 지어내지 마세요.\n\n말투: 명리를 전혀 모르는 사람이 읽습니다. 중학생도 이해할 쉬운 말로 쓰고, 십성·십이운성·신살 같은 전문 용어는 문장 끝 괄호 안에 근거로만 짧게 적습니다. 예: "돈이 크게 들어오고 나가는 시기였습니다(편재 대운)."\n\n나이에 맞게: 각 시기는 그때의 나이에 맞는 삶으로 풀이합니다. 12세 이하는 가정, 부모, 건강, 성격 형성으로, 13~19세는 학교, 친구, 진로 고민으로 풀이하고 직장, 승진, 사업, 투자 이야기는 20세 이후에만 씁니다.\n\n형식: 아래 아홉 개 소제목을 【 】로 표시하고 각 항목을 4~6문장으로 씁니다. 목록 기호는 쓰지 않습니다.\n【나는 어떤 사람인가】【일과 적성】【돈】【연애와 배우자】【지나온 운】【지금의 운】【앞으로 5년】【해마다 조심할 것】【종합의견】\n\n규칙: 마지막 【종합의견】은 앞의 내용을 3~4문장으로 정리하고, 지금 가장 먼저 할 일 하나로 끝냅니다. 【지나온 운】은 어린 시절부터 지난 10년 단위 운을 나이대별로 짚고 최근 3년을 연도별로 언급합니다. 【앞으로 5년】과 【해마다 조심할 것】은 반드시 연도를 하나씩 들어 씁니다. 누구에게나 맞는 일반론을 피하고 이 사주에서만 나오는 말을 하세요. 건강, 법률, 투자에 대한 확답과 단정적 예언은 하지 말고 참고용 조언의 어조를 지킵니다.\n\n' + factSheet();
  try {
    const r = await S.ai(prompt, { modelTier: 'complex', onText: ({ text }) => { out.textContent = text; } });
    S.deepText = r.text; out.textContent = r.text;
  } catch (err) {
    out.textContent = err && err.code === 'rate_limited' ? T('요청이 많습니다. 잠시 뒤에 다시 눌러 주세요.', 'Too many requests. Please try again in a moment.') : T('AI 풀이를 불러오지 못했습니다. 아래 풀이는 그대로 볼 수 있습니다.', 'Could not load the AI reading. The reading below is still available.');
  }
  deepBusy = false; const b = $('deepGo'); if (b) b.disabled = false;
}
document.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return;
  if (t.id === 'deepGo') askDeep();
  if (t.dataset.jump) { const el = $(t.dataset.jump); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  if (t.hasAttribute('data-why')) { S.why = !S.why; renderSaju(); renderMatch(); }
});
