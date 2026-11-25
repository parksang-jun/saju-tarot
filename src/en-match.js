/* ===== 영어판 궁합 문장 조립 =====
   match.js의 gunghap()을 영어 어순으로 다시 쓴 것이다. 점수 계산과 판단 조건은 한국어판과 같아야 한다. */
const EN_M = {
  MBTI_TXT: {
    INTJ: 'the strategist who draws the big picture alone and pushes it to the end', INTP: 'the analyst who digs into principles to the end', ENTJ: 'the commander who sets goals and leads people', ENTP: 'the inventor who shakes things up with new ideas',
    INFJ: 'the counselor who quietly looks deeply into people', INFP: 'the idealist who keeps their own values and ideals', ENFJ: 'the guide who encourages people and leads from the front', ENFP: 'the campaigner overflowing with passion and curiosity',
    ISTJ: 'the manager who does the job by the book', ISFJ: 'the guardian who quietly looks after and protects', ESTJ: 'the executive who builds systems and gets things done', ESFJ: 'the warm one who takes good care of people',
    ISTP: 'the craftsperson who solves problems by hand', ISFP: 'the quiet artist with fine senses', ESTP: 'the competitor who throws their whole body in', ESFP: 'the entertainer who lifts the mood'
  },
  AXIS_GAP: {
    EI: 'Inside you is an energy that loves people and the stage, but you now live on the side of recharging alone.', IE: 'Your base is a quiet temperament that gathers inward, but work and surroundings have trained you to stand in front of people.',
    NS: 'What you were born with is imagination and intuition, but you have trained your sense of reality.', SN: 'Your base is practical and careful, but you have grown an eye for possibilities and ideas.',
    TF: 'Your base is a temperament that weighs and sorts, but you have learned to look to people\'s feelings first.', FT: 'Your base is warm-hearted, but at work you have formed the habit of judging by logic.',
    JP: 'Your base is plans and rules, but you now choose to go with the flow.', PJ: 'Your base is a free temperament, but responsibility has taught you to live by plan.'
  },
  REL: { '충': 'clash', '육합': 'six bond', '삼합': 'triple bond', '원진': 'resentment', '형': 'friction', '같은 글자': 'same branch', '무난': 'neutral' },
  TIP: { 'Personality': 'Do not try to change each other; divide roles by what each does well.', 'Daily life': 'Set the rules of living together in advance: money, housework, sleep.', 'Completing': 'Fill in the energy each lacks through a shared hobby or exercise.', 'Family · society': 'For family matters and work issues, accept each other\'s way and set a line.', 'Working style': 'Resolve differences in working style by dividing roles.', 'Zodiac': 'The zodiac carries the least weight, so there is no need to dwell on it.', 'Body · affection': 'Do not guess at affection; agree in words on what each of you wants.', 'Heart · talk': 'Once a week, at a set time, share what is really on your minds.', 'Money': 'Always decide big spending and lending together.', 'Conflict': 'Do not let a quarrel carry over to the next day, and agree on who apologizes first.' }
};
function gunghapEN() {
  const A = S.saju, B = S.psaju, ua = S.user, ub = S.partner, lover = S.rel === 'love';
  const an = esc(ua.name || 'Me'), bn = esc(ub.name || 'Partner'), items = [], R = k => EN_M.REL[k];
  const add = (grp, short, title, sc, tx, why, w) => items.push([title, clamp(sc, 30, 98), tx, why, w, short, grp]);
  const as = A.P.day.s, bs = B.P.day.s, ae = A.me, be = B.me, d = mod(be - ae, 5), ga5 = groupCount(A), gb5 = groupCount(B);
  const r5 = branchRel(A.P.year.b, B.P.year.b);
  add('out', 'Zodiac', 'Zodiac match', r5[1], 'The ' + A.animal + ' and the ' + B.animal + ' are ' + (r5[1] >= 80 ? 'a pair long said to suit each other. You are at ease together from the first meeting.' : r5[1] <= 52 ? 'a pair long said to clash. The zodiac carries the least weight in compatibility, so treat it as a reference only.' : 'an easy enough pair.'), 'year branches ' + A.P.year.branchH + ' · ' + B.P.year.branchH + ' ' + R(r5[0]), 8);
  const r4 = branchRel(A.P.month.b, B.P.month.b);
  add('out', lover ? 'Family · society' : 'Working style', lover ? 'Family and social life' : 'Working style', r4[1], r4[1] >= 80 ? 'The surroundings you grew up in and the way you work fit well. There is little to clash over with either family or at work.' : r4[1] <= 52 ? 'The surroundings you grew up in and the way you work differ. For family events and work issues, accept each other\'s way and set a line.' : 'The difference in background is not large. You can adjust in the ordinary way.', 'month branches ' + A.P.month.branchH + ' · ' + B.P.month.branchH + ' ' + R(r4[0]), lover ? 10 : 14);
  let sc, tx, tag;
  if (STEM_HAP(as, bs)) { sc = 95; tag = 'stem bond'; tx = 'Your two core energies form a pair. An arrangement where you are drawn from the start and affection attaches easily.'; }
  else if (d === 0) { sc = as === bs ? 66 : 70; tag = 'same element'; tx = 'You resemble each other. Easy and talkative like friends, but neither backs down, so stubbornness collides.'; }
  else if (d === 1 || d === 4) { sc = 83; tag = 'nourishing'; const giver = d === 1 ? an : bn, taker = d === 1 ? bn : an; tx = giver + ' nourishes ' + taker + ' in this relationship. The one who receives should say so often, so the giver does not tire.'; }
  else {
    const ctrl = d === 2 ? ua : ub, clash = ['0-6', '1-7', '2-8', '3-9'].includes(Math.min(as, bs) + '-' + Math.max(as, bs));
    const lead = d === 2 ? an : bn, follow = d === 2 ? bn : an;
    if (lover && ctrl.gender === 'M' && ua.gender !== ub.gender) { sc = 74; tag = 'spouse arrangement'; tx = lead + ' leads and ' + follow + ' adjusts, an arrangement traditionally read as a marriage tie. The one who leads should take care not to be one-sided.'; }
    else { sc = clash ? 46 : 58; tag = clash ? 'stem clash' : 'controlling'; tx = lead + ' presses on ' + follow + ' in this arrangement. Tension can be part of the attraction, but talk things through so it does not become a relationship where one side endures.'; }
  }
  add('out', 'Personality', lover ? 'Personality and attraction' : 'Personality and temperament', sc, tx, 'Day Masters ' + STEMS_H[as] + ' · ' + STEMS_H[bs] + ' ' + tag, lover ? 17 : 20);
  const r2 = branchRel(A.P.day.b, B.P.day.b);
  if (lover) {
    const yy = as % 2 !== bs % 2;
    const warm = sj => 2 * sj.count[1] + sj.count[0] - 2 * sj.count[4] - sj.count[3] + ({ '여름': 3, '봄': 1, '가을': -1, '겨울': -3 })[seasonOf(sj.P.month.b)];
    const wa = warm(A), wb = warm(B), comp = wa * wb < 0 && Math.abs(wa - wb) >= 4, same = wa * wb > 0 && Math.min(Math.abs(wa), Math.abs(wb)) >= 4;
    const tword = w => w >= 4 ? 'hot' : w >= 1 ? 'warm' : w <= -4 ? 'cold' : w <= -1 ? 'cool' : 'neutral';
    const b1 = { '육합': 'Your partner seats bond, so body and heart draw close naturally. The rhythm of touch and affection fits well.', '삼합': 'Your partner seats are on the same side, so you are at ease together and affection deepens with time.', '충': 'Your partner seats clash, so the pull is strong but the rhythm slips easily. Agree in words on what you each want.', '원진': 'An arrangement where small hurts pile up the closer you get. The remedy is not putting off showing affection.', '형': 'Each tries to correct the other\'s way, so showing affection can grate. Ask first what the other is comfortable with.', '같은 글자': 'You give and receive affection in similar ways. Comfortable, but newness has to be made on purpose.', '무난': 'Neither a strong pull nor a push. Affection deepens as time together adds up.' }[r2[0]];
    const b2 = yy ? 'Your Day Masters differ in yin and yang, so you are drawn to each other naturally.' : 'Your Day Masters share the same yin or yang, so friend-like ease comes before romance.';
    const b3 = comp ? 'One chart is warm and the other cool, so the temperature evens out when you are together. A pair long said to have good inner compatibility.' : same ? (wa > 0 ? 'Both charts run hot, so you heat up fast and collide fast. Leave time to cool down.' : 'Both charts run cool, so little is expressed and loneliness comes easily. Decide who reaches out first.') : 'The difference in temperature between your charts is not large, so this is easy enough.';
    add('in', 'Body · affection', 'Body and affection', 0.5 * r2[1] + 0.25 * (yy ? 88 : 62) + 0.25 * (comp ? 90 : same ? 54 : 72), b1 + ' ' + b2 + ' ' + b3, 'day branches ' + A.P.day.branchH + ' · ' + B.P.day.branchH + ' ' + R(r2[0]) + ' · yin-yang ' + (yy ? 'different' : 'same') + ' · chart temperature ' + tword(wa) + ' · ' + tword(wb), 20);
  }
  const talkA = ga5[1], talkB = gb5[1], hearA = ga5[4], hearB = gb5[4];
  if ((talkA >= 2 && hearB >= 2) || (talkB >= 2 && hearA >= 2)) { const sp = talkA >= 2 && hearB >= 2 ? an : bn, li = sp === an ? bn : an; sc = 86; tx = sp + ' opens the talk and ' + li + ' takes it in, so conversation flows. A good pair for opening up.'; }
  else if (talkA >= 3 && talkB >= 3) { sc = 58; tx = 'Both of you express strongly and talk a lot, and with each saying their own piece there may be no listener. A rule of letting one finish before the other starts helps.'; }
  else if (talkA === 0 && talkB === 0) { sc = 56; tx = 'Neither of you readily brings out what is inside. Before silence hardens into misunderstanding, make a habit of talking at a set time.'; }
  else { sc = 70; tx = 'The rhythm of your conversation is not far off. Important things are best said the same day rather than put off.'; }
  if (STEM_HAP(as, bs)) { sc += 6; tx += ' Your core energies bond, so there are many moments of understanding without words.'; }
  add('in', 'Heart · talk', 'Heart and conversation', sc, tx, 'Output ' + talkA + ' · ' + talkB + ', Resource ' + hearA + ' · ' + hearB, lover ? 12 : 20);
  const give = (to, from) => clamp(46 + 11 * from.count[to.need] + (from.me === to.need ? 16 : 0), 30, 98);
  const ga = give(A, B), gb = give(B, A);
  add('in', 'Completing', 'How you complete each other', (ga + gb) / 2, bn + '\'s chart has ' + B.count[A.need] + ' of the ' + EL[A.need] + ' energy ' + an + ' needs, and ' + an + '\'s chart has ' + A.count[B.need] + ' of the ' + EL[B.need] + ' energy ' + bn + ' needs. ' + (ga >= 75 && gb >= 75 ? 'You are a strength to each other.' : ga >= 75 ? an + ' receives more in this relationship.' : gb >= 75 ? bn + ' receives more in this relationship.' : 'Your charts do not directly fill each other\'s lack, so make up for it through shared activities.'), 'needed elements ' + EL[A.need] + ' · ' + EL[B.need], lover ? 13 : 18);
  const t2 = { '충': 'Your daily rhythms and habits collide head-on. Living together, quarrels come easily over sleep, spending and housework, so set rules in advance.', '육합': 'Your daily-life match is very good. Being together is easy and the household falls into place naturally.', '삼합': 'You look in the same direction. You gain strength when you plan something together.', '원진': 'An arrangement where hurt and dislike arise for no reason. Clear up a misunderstanding the day it happens.', '형': 'Each tries to correct the other and it grates. You need practice leaving the other\'s way as it is.', '같은 글자': 'Your ways of living resemble each other. Easy, but you share the same faults and become each other\'s mirror.', '무난': 'Neither a strong pull nor a collision. Affection builds when you form shared habits.' }[r2[0]];
  add('life', 'Daily life', lover ? 'Living together' : 'Getting along day to day', r2[1], t2, 'day branches ' + A.P.day.branchH + ' · ' + B.P.day.branchH + ' ' + R(r2[0]), 8);
  const ma = ga5[2], mb2 = gb5[2];
  if (ma >= 2 && mb2 >= 2) { sc = 84; tx = 'Both of you have an eye for money and chances. You are strong at earning and growing it together, but let one person keep the big money in order.'; }
  else if ((ma >= 2 && mb2 === 0) || (mb2 >= 2 && ma === 0)) { const k = ma >= 2 ? an : bn; sc = 74; tx = k + ' has the better feel for money. It works better for ' + k + ' to handle the household and savings and for the other to trust and leave it.'; }
  else if (ma === 0 && mb2 === 0) { sc = 58; tx = 'Both of you are indifferent to money, so it gathers slowly. First set up something that saves without attention, such as an automatic transfer.'; }
  else { sc = 70; tx = 'Your attitudes to money are not far apart. Discuss only the big spending beforehand and there is little to quarrel over.'; }
  if (ga5[0] >= 3 || gb5[0] >= 3) { sc -= 8; tx += ' One of your charts spends heavily on people, so decide guarantees and loans together.'; }
  add('life', 'Money', lover ? 'Money match' : 'Money dealings and partnership', sc, tx, 'Wealth ' + ma + ' · ' + mb2 + ', Peers ' + ga5[0] + ' · ' + gb5[0], 6);
  let nClash = 0, nHap = 0, nSore = 0;
  ['year', 'month', 'day', 'hour'].forEach(k => { if (A.P[k] && B.P[k]) { const r = branchRel(A.P[k].b, B.P[k].b)[0]; if (r === '충') nClash++; else if (r === '육합' || r === '삼합') nHap++; else if (r === '원진' || r === '형') nSore++; } });
  tx = (nClash + nSore === 0 ? 'No pillars in the same seat collide strongly, so quarrels are not frequent.' : (nClash + nSore) + ' pillar seat' + (nClash + nSore > 1 ? 's collide' : ' collides') + ', so ' + (nClash ? 'when you quarrel, you quarrel hard.' : 'you sulk often over small things.')) + ' ' + (nHap ? nHap + ' seat' + (nHap > 1 ? 's pull' : ' pulls') + ' you together, so you make up quickly.' : 'Few seats pull you together, so quarrels last. Agree on who apologizes first.');
  add('life', 'Conflict', 'Quarrels and making up', 70 - 9 * nClash - 6 * nSore + 7 * nHap, tx, 'four pillars: clash ' + nClash + ' · resentment and friction ' + nSore + ' · bond ' + nHap, 6);
  const avg = list => Math.round(list.reduce((s, it) => s + it[1] * it[4], 0) / list.reduce((s, it) => s + it[4], 0));
  const saju = avg(items), grp = { out: avg(items.filter(i => i[6] === 'out')), in: avg(items.filter(i => i[6] === 'in')), life: avg(items.filter(i => i[6] === 'life')) };
  return { items, saju, mb: null, total: saju, an, bn, grp, lover };
}
