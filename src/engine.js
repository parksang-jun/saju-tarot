/* ===== 명리 엔진: 절기(태양 황경), 한국 표준시 변천·서머타임, 경도 보정(평균태양시), 음력 변환 ===== */
const STEMS = T(['갑','을','병','정','무','기','경','신','임','계'], ['Gap','Eul','Byeong','Jeong','Mu','Gi','Gyeong','Sin','Im','Gye']);   // 화면 표시용
const STEMS_H = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const BRANCHES = T(['자','축','인','묘','진','사','오','미','신','유','술','해'], ['Ja','Chuk','In','Myo','Jin','Sa','O','Mi','Sin','Yu','Sul','Hae']);
const BRANCHES_H = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];
const ANIMALS = T(['쥐','소','호랑이','토끼','용','뱀','말','양','원숭이','닭','개','돼지'], ['Rat','Ox','Tiger','Rabbit','Dragon','Snake','Horse','Sheep','Monkey','Rooster','Dog','Pig']);
const EL = T(['목','화','토','금','수'], ['Wood','Fire','Earth','Metal','Water']);
const EL_H = ['木','火','土','金','水'];
const BRANCH_EL = [4,2,0,0,2,1,1,2,3,3,2,4];
const BRANCH_MAIN = [9,5,0,1,4,2,3,5,6,7,4,8];
const HIDDEN = [[8,9],[9,7,5],[4,2,0],[0,1],[1,9,4],[4,6,2],[2,5,3],[3,1,5],[4,8,6],[6,7],[7,3,4],[4,0,8]]; // 여기, 중기, 정기
const TEN = [['비견','겁재'],['식신','상관'],['편재','정재'],['편관','정관'],['편인','정인']];
// 시청·군청 기준 경도(근사값, 0.05도 = 시각 12초 이내)
const REGIONS = [
  ['특별·광역시', [['서울',126.98],['부산',129.08],['대구',128.60],['인천',126.71],['광주',126.85],['대전',127.38],['울산',129.31],['세종',127.29]]],
  ['경기', [['수원',127.03],['성남',127.13],['용인',127.18],['고양',126.83],['화성',126.83],['부천',126.77],['남양주',127.22],['안산',126.83],['평택',127.11],['안양',126.96],['시흥',126.80],['파주',126.78],['김포',126.72],['의정부',127.03],['광주',127.26],['하남',127.21],['광명',126.86],['군포',126.94],['양주',127.05],['오산',127.08],['이천',127.44],['안성',127.28],['구리',127.13],['의왕',126.97],['포천',127.20],['양평',127.49],['여주',127.64],['동두천',127.06],['과천',126.99],['가평',127.51],['연천',127.07]]],
  ['인천·대구 군 지역', [['강화',126.49],['옹진(백령도)',124.71],['군위',128.57],['달성',128.43]]],
  ['강원', [['춘천',127.73],['원주',127.92],['강릉',128.88],['동해',129.11],['태백',128.99],['속초',128.59],['삼척',129.17],['홍천',127.89],['횡성',127.98],['영월',128.46],['평창',128.39],['정선',128.66],['철원',127.31],['화천',127.71],['양구',127.99],['인제',128.17],['고성',128.47],['양양',128.62]]],
  ['충북', [['청주',127.49],['충주',127.93],['제천',128.19],['보은',127.73],['옥천',127.57],['영동',127.78],['증평',127.58],['진천',127.44],['괴산',127.79],['음성',127.69],['단양',128.37]]],
  ['충남', [['천안',127.15],['공주',127.12],['보령',126.61],['아산',127.00],['서산',126.45],['논산',127.10],['계룡',127.25],['당진',126.63],['금산',127.49],['부여',126.91],['서천',126.69],['청양',126.80],['홍성',126.66],['예산',126.85],['태안',126.30]]],
  ['전북', [['전주',127.15],['군산',126.74],['익산',126.96],['정읍',126.86],['남원',127.39],['김제',126.88],['완주',127.16],['진안',127.42],['무주',127.66],['장수',127.52],['임실',127.28],['순창',127.14],['고창',126.70],['부안',126.73]]],
  ['전남', [['목포',126.39],['여수',127.66],['순천',127.49],['나주',126.71],['광양',127.70],['담양',126.99],['곡성',127.29],['구례',127.46],['고흥',127.28],['보성',127.08],['화순',126.99],['장흥',126.91],['강진',126.77],['해남',126.60],['영암',126.70],['무안',126.48],['함평',126.52],['영광',126.51],['장성',126.78],['완도',126.76],['진도',126.26],['신안',126.35]]],
  ['경북', [['포항',129.34],['경주',129.22],['김천',128.11],['안동',128.73],['구미',128.34],['영주',128.62],['영천',128.94],['상주',128.16],['문경',128.19],['경산',128.74],['의성',128.70],['청송',129.06],['영양',129.11],['영덕',129.37],['청도',128.73],['고령',128.26],['성주',128.28],['칠곡',128.40],['예천',128.45],['봉화',128.73],['울진',129.40],['울릉',130.91]]],
  ['경남', [['창원',128.68],['진주',128.11],['통영',128.43],['사천',128.06],['김해',128.89],['밀양',128.75],['거제',128.62],['양산',129.04],['의령',128.26],['함안',128.41],['창녕',128.49],['고성',128.32],['남해',127.89],['하동',127.75],['산청',127.87],['함양',127.73],['거창',127.91],['합천',128.17]]],
  ['제주', [['제주',126.53],['서귀포',126.56]]],
  ['북한', [['평양',125.75],['개성',126.55],['해주',125.71],['신의주',124.40],['원산',127.44],['함흥',127.54],['청진',129.78]]],
  ['기타', [['모름(전국 평균)',127.50]]]
];
const CITY_LON = {};
REGIONS.forEach(g => g[1].forEach(c => { CITY_LON[g[0] + '|' + c[0]] = c[1]; }));
const cityKeyOf = u => u.city && CITY_LON[u.city] != null ? u.city : (Object.keys(CITY_LON).find(k => CITY_LON[k] === u.lon) || '특별·광역시|서울');
const cityLabel = key => { const p = key.split('|'); return (['경기', '강원', '경남'].includes(p[0]) && ['광주', '고성'].includes(p[1]) ? p[0] + ' ' : '') + p[1]; };
const cityOptions = sel => REGIONS.map(g => '<optgroup label="' + g[0] + '">' + g[1].map(c => { const k = g[0] + '|' + c[0]; return '<option value="' + k + '"' + (k === sel ? ' selected' : '') + '>' + c[0] + '</option>'; }).join('') + '</optgroup>').join('');

const stemEl = s => Math.floor(s / 2);
const mod = (a, n) => ((a % n) + n) % n;
const pad2 = n => String(n).padStart(2, '0');

function jdn(y, m, d) {
  const a = Math.floor((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}
// 태양 시황경 (Meeus 간이식, 오차 약 0.01도 = 절입 시각 기준 약 15분 이내)
function sunLon(jd) {
  const T = (jd - 2451545.0) / 36525;
  const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  const M = (357.52911 + 35999.05029 * T - 0.0001537 * T * T) * Math.PI / 180;
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
  const om = (125.04 - 1934.136 * T) * Math.PI / 180;
  return mod(L0 + C - 0.00569 - 0.00478 * Math.sin(om), 360);
}
function termJD(jd, target) {
  for (let i = 0; i < 8; i++) jd += (mod(target - sunLon(jd) + 180, 360) - 180) / 360 * 365.2422;
  return jd;
}
// 역학시와 세계시의 차(초), 근사
function deltaT(y) { const t = [[1900,-3],[1950,29],[1980,51],[2000,64],[2020,69],[2100,120]]; for (let i = 1; i < t.length; i++) if (y <= t[i][0]) return t[i-1][1] + (t[i][1] - t[i-1][1]) * (y - t[i-1][0]) / (t[i][0] - t[i-1][0]); return 120; }
const msToJD = (ms, y) => ms / 86400000 + 2440587.5 + deltaT(y) / 86400;

// 한국 표준시의 실제 UTC 오프셋(분). 1954~61년 UTC+8:30, 1948~60·1987~88 서머타임을 시간대 데이터베이스에서 읽는다.
let _seoulFmt = null;
function seoulOffsetMin(ms) {
  try {
    _seoulFmt = _seoulFmt || new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', hourCycle: 'h23', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
    const p = {}; _seoulFmt.formatToParts(new Date(ms)).forEach(x => { p[x.type] = +x.value; });
    return Math.round((Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - ms) / 60000);
  } catch (e) { return 540; }
}
function seoulToUTC(y, m, d, h, mi) {
  const wall = Date.UTC(y, m - 1, d, h, mi);
  let ms = wall - 540 * 60000;
  ms = wall - seoulOffsetMin(ms) * 60000;
  return wall - seoulOffsetMin(ms) * 60000;
}
// 음력(한국식) -> 양력. 브라우저의 단기력(dangi) 달력을 이용해 역산한다.
let _dangi = null;
function lunarOf(ms) {
  _dangi = _dangi || new Intl.DateTimeFormat('en-u-ca-dangi', { timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' });
  const p = {}; _dangi.formatToParts(new Date(ms)).forEach(x => { p[x.type] = x.value; });
  return { y: +p.relatedYear, m: parseInt(p.month, 10), leap: /bis|L|윤/i.test(p.month), d: +p.day };
}
function lunarToSolar(y, m, d, leap) {
  try {
    let ms = Date.UTC(y, 0, 15);
    for (let i = 0; i < 420; i++, ms += 86400000) {
      const l = lunarOf(ms);
      if (l.y === y && l.m === m && l.d === d && l.leap === !!leap) { const D = new Date(ms); return { y: D.getUTCFullYear(), m: D.getUTCMonth() + 1, d: D.getUTCDate() }; }
    }
  } catch (e) {}
  return null;
}

function tenGod(dayStem, otherStem) {
  return TEN[mod(stemEl(otherStem) - stemEl(dayStem), 5)][(dayStem % 2) === (otherStem % 2) ? 0 : 1];
}
function pillar(s, b, dayStem, isDay) {
  return { s, b, stem: STEMS[s], stemH: STEMS_H[s], branch: BRANCHES[b], branchH: BRANCHES_H[b], sEl: stemEl(s), bEl: BRANCH_EL[b],
    sGod: isDay ? '일간' : tenGod(dayStem, s), bGod: tenGod(dayStem, BRANCH_MAIN[b]) };
}

const SI_LABEL = EN ? ['Ja 子 · 00:00–01:30 (after midnight)', 'Chuk 丑 · 01:30–03:30', 'In 寅 · 03:30–05:30', 'Myo 卯 · 05:30–07:30', 'Jin 辰 · 07:30–09:30', 'Sa 巳 · 09:30–11:30', 'O 午 · 11:30–13:30', 'Mi 未 · 13:30–15:30', 'Sin 申 · 15:30–17:30', 'Yu 酉 · 17:30–19:30', 'Sul 戌 · 19:30–21:30', 'Hae 亥 · 21:30–23:30', 'Late Ja 子 · 23:30–24:00 (before midnight)'] : ['자시 子 · 00:00~01:30 (자정 이후)', '축시 丑 · 01:30~03:30', '인시 寅 · 03:30~05:30', '묘시 卯 · 05:30~07:30', '진시 辰 · 07:30~09:30', '사시 巳 · 09:30~11:30', '오시 午 · 11:30~13:30', '미시 未 · 13:30~15:30', '신시 申 · 15:30~17:30', '유시 酉 · 17:30~19:30', '술시 戌 · 19:30~21:30', '해시 亥 · 21:30~23:30', '야자시 子 · 23:30~24:00 (자정 이전)'];
const SI_NAME = EN ? ['Ja hour', 'Chuk hour', 'In hour', 'Myo hour', 'Jin hour', 'Sa hour', 'O hour', 'Mi hour', 'Sin hour', 'Yu hour', 'Sul hour', 'Hae hour', 'late Ja hour'] : ['자시', '축시', '인시', '묘시', '진시', '사시', '오시', '미시', '신시', '유시', '술시', '해시', '야자시'];
// 시 번호(0~11, 12=야자시, -1=모름). 예전에 시계 시각으로 저장된 정보는 30분 보정 구간으로 옮긴다.
function siOf(u) {
  if (u.si != null) return u.si;
  if (u.hh == null) return -1;
  const t = u.hh * 60 + u.mm;
  return t >= 1410 ? 12 : Math.floor(mod(t + 30, 1440) / 120);
}
const siOptions = sel => SI_LABEL.map((l, i) => '<option value="' + i + '"' + (i === sel ? ' selected' : '') + '>' + l + '</option>').join('');
/* user: {cal:'solar'|'lunar'|'leap', y,m,d, hh,mm (null=모름), lon, yaja:boolean, gender} */
function calcSaju(u) {
  let sol = { y: u.y, m: u.m, d: u.d }, err = null;
  if (u.cal !== 'solar') { const r = lunarToSolar(u.y, u.m, u.d, u.cal === 'leap'); if (r) sol = r; else err = T('음력 날짜를 양력으로 바꾸지 못했습니다. 날짜와 윤달 여부를 확인하세요.', 'Could not convert the lunar date to a solar date. Check the date and whether it is a leap month.'); }
  const si = siOf(u), known = si >= 0;                             // 시는 사주의 열두 시로 직접 받는다
  const LON = 127.5;
  const utc = known ? Date.UTC(sol.y, sol.m - 1, sol.d, si === 12 ? 23 : si * 2, si === 12 || si === 0 ? 30 : 0) - LON * 240000 : seoulToUTC(sol.y, sol.m, sol.d, 12, 0);
  const lst = new Date(utc + LON * 240000);
  const yajaOn = si === 12;
  const Y = lst.getUTCFullYear(), Mo = lst.getUTCMonth() + 1, D = lst.getUTCDate(), H = lst.getUTCHours(), Mi = lst.getUTCMinutes();
  const jd = msToJD(utc, sol.y), lon = sunLon(jd);
  const sy = (Mo <= 2 && lon >= 270 && lon < 315) ? Y - 1 : (Mo === 12 && lon >= 315 ? Y + 1 : Y);
  const ys = mod(sy - 4, 10), yb = mod(sy - 4, 12);
  const mi = Math.floor(mod(lon - 315, 360) / 30);
  const ms = mod((ys % 5) * 2 + 2 + mi, 10), mb = mod(mi + 2, 12);
  const late = known && H >= 23;                                   // 자시 초입(23시 이후)
  const dj = jdn(Y, Mo, D) + (late && !yajaOn ? 1 : 0);
  const di = mod(dj + 49, 60), ds = di % 10, db = di % 12;
  const P = { year: pillar(ys, yb, ds), month: pillar(ms, mb, ds), day: pillar(ds, db, ds, true), hour: null };
  let hourIdx = -1;
  if (known) {
    hourIdx = Math.floor(mod(H * 60 + Mi + 60, 1440) / 120);
    const hs = late && yajaOn ? mod(dj + 1 + 49, 60) % 10 : ds;    // 야자시는 시간만 다음 날 기준
    P.hour = pillar(mod((hs % 5) * 2 + hourIdx, 10), hourIdx, ds);
  }
  const keys = ['year', 'month', 'day', 'hour'].filter(k => P[k]);
  const count = [0, 0, 0, 0, 0];
  keys.forEach(k => { count[P[k].sEl]++; count[P[k].bEl]++; });

  // 신강·신약: 자리별 가중치(월지 30, 일지·시지 15, 나머지 10)와 지장간 비율로 일간을 돕는 세력을 계산
  const me = stemEl(ds), helper = e => e === me || e === mod(me - 1, 5);
  const amt = [0, 0, 0, 0, 0]; let tot = 0;
  const addS = (s, w) => { amt[mod(stemEl(s) - me, 5)] += w; tot += w; };
  const addB = (b, w) => { const h = HIDDEN[b], r = h.length === 3 ? [0.1, 0.3, 0.6] : [0.3, 0.7]; h.forEach((s, i) => addS(s, w * r[i])); };
  addS(P.year.s, 10); addS(P.month.s, 10); addB(P.year.b, 10); addB(P.month.b, 30); addB(P.day.b, 15);
  if (P.hour) { addS(P.hour.s, 10); addB(P.hour.b, 15); }
  const ratio = (amt[0] + amt[4]) / tot;
  const others = [P.year.sEl, P.month.sEl, P.year.bEl].concat(P.hour ? [P.hour.sEl, P.hour.bEl] : []);
  const basis = { ryeong: helper(P.month.bEl), ji: HIDDEN[P.day.b].some(s => helper(stemEl(s))), se: others.filter(helper).length * 2 >= others.length };
  const strong = ratio >= 0.5 || (ratio >= 0.42 && basis.ryeong && (basis.ji || basis.se));
  // 억부용신: 신약이면 재성이 가장 무거울 때 비겁, 그 밖에는 인성. 신강이면 비겁이 주도할 때 관성(없으면 식상), 인성이 주도할 때 재성.
  let need;
  if (!strong) need = (amt[2] > amt[1] && amt[2] > amt[3]) ? me : mod(me - 1, 5);
  else if (amt[0] >= amt[4]) need = amt[3] > 0 || amt[1] === 0 ? mod(me + 3, 5) : mod(me + 1, 5);
  else need = mod(me + 2, 5);

  // 대운: 순역, 대운수(절기까지 날수 / 3)
  const forward = (ys % 2 === 0) === (u.gender === 'M');
  const cur = 315 + mi * 30;
  const tPrev = termJD(jd - 15, mod(cur, 360)), tNext = termJD(jd + 15, mod(cur + 30, 360));
  const startExact = Math.abs((forward ? tNext : tPrev) - jd) / 3;
  const startAge = Math.max(1, Math.round(startExact));
  const mIdx60 = (() => { for (let i = 0; i < 60; i++) if (i % 10 === ms && i % 12 === mb) return i; })();
  const daeun = [];
  for (let k = 1; k <= 8; k++) {
    const idx = mod(mIdx60 + (forward ? k : -k), 60), p = pillar(idx % 10, idx % 12, ds);
    p.age = startAge + (k - 1) * 10; p.year = sol.y + p.age; daeun.push(p);
  }
  const nearMin = Math.min(jd - tPrev, tNext - jd) * 1440;
  const info = {
    solar: sol.y + '.' + sol.m + '.' + sol.d, lunarInput: u.cal !== 'solar',
    siName: known ? SI_NAME[si] : null,
    warn: nearMin < 90 ? T('태어난 날이 절기가 바뀌는 날입니다. 절기 시각 전후로 월주(입춘이면 년주도)가 달라지니, 평소 보던 만세력과 월주를 비교해 보세요.', 'You were born on a day when the solar term changes. The month pillar (and the year pillar, at the Start of Spring) differs before and after that moment, so compare the month pillar with a chart you trust.') : '',
    err
  };
  return { P, keys, count, me, strong, ratio, amt, tot, basis, need, forward, startAge, startExact, daeun, sajuYear: sy, by: sol.y, animal: ANIMALS[yb], lon, hourIdx, info };
}
function yearPillar(year, dayStem) { return pillar(mod(year - 4, 10), mod(year - 4, 12), dayStem); }
function dayPillarOf(y, m, d, dayStem) { const i = mod(jdn(y, m, d) + 49, 60); return pillar(i % 10, i % 12, dayStem); }
const isClash = (a, b) => mod(a - b, 12) === 6;
