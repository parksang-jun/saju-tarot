/* ===== 영어판 사주 문장 조립 =====
   한국어 조사에 맞춰 조립하는 문장은 치환이 안 되므로, deep.js의 fields()와 palaces()를 영어 어순으로 다시 쓴 것이다. 판단 조건은 한국어판과 같아야 한다. */
function fieldsEN() {
  const sj = S.saju, P = sj.P, ni = S.ni, g = ni.grp, male = S.user.gender === 'M';
  const dm = DAY_TXT[P.day.s], us = ni.us('day'), top = g.indexOf(Math.max.apply(null, g));
  const person = dm[1] + ' ' + SEASON_TXT[mod(P.month.bEl - sj.me, 5)] + ' In the grain of your innate energy, ' + US_TXT[us] + '. ' + (g[top] >= 3 ? 'You carry a lot of the energy of ' + GROUP_PLAIN[top] + '. ' + GROUP_TXT[top][0] : '');
  let work = ni.gyeok.g[1], workWhy = ni.gyeok.g[0] + ' (' + ni.gyeok.how + ')';
  if (g[3] >= 2 && g[4] >= 1) work += ' The power to carry responsibility and the power to learn are linked, so rising through credentials and titles inside an organization favors you.';
  else if (g[1] >= 2 && g[2] >= 1) work += ' Your talent leads to money, so selling your own skill and work directly favors you.';
  else if (g[3] === 0) work += ' The energy that ties you to a frame is weak, so you get results in a position with wide discretion rather than a big organization.';
  let money, moneyWhy = 'Wealth ×' + g[2] + ', ' + (sj.strong ? 'strong chart' : 'weak chart');
  if (g[2] === 0) money = 'The energy of money does not show on the surface of your chart. ' + GROUP_TXT[2][1] + ' The flow of income changes greatly in periods when the energy of money arrives.';
  else if (!sj.strong && g[2] >= 2) { money = 'You see many chances to earn, but your own strength to hold them is weak. Trying to catch them all alone wears you out. Build strength first through credentials, connections and colleagues, and take on only what you can carry.'; moneyWhy += ', much Wealth and a weak self'; }
  else if (sj.strong) money = 'You were born with the strength to handle money. You can be active about widening your earnings; just set up a way to protect what you earn.';
  else money = 'The energy of money is there but your own strength is on the weak side, so pushing hard to earn harms your body and relationships first. Build on a fixed income and widen little by little.';
  if (g[1] >= 1 && g[2] >= 1) { money += ' Talent gives birth to money in your chart, so skill and content become income.'; moneyWhy += ', Output feeds Wealth'; }
  if (g[0] >= 3) money += ' Many people have a claim on your money in this structure, so avoid guarantees and joint investments.';
  const sp = male ? g[2] : g[3], spName = male ? 'Wealth' : 'Authority';
  let love = SPOUSE[P.day.bGod];
  love += sp === 0 ? ' The partner\'s energy does not show on the surface, so a partner tends to appear late or in a period when that luck arrives.' : sp >= 3 ? ' Connections are many, but choosing and settling is your homework.' : '';
  if (ni.rel.some(r => r[0] === '충' && r[3].indexOf('day branch') >= 0)) love += ' The partner\'s seat clashes with another seat, so even together you each need your own time and distance.';
  if (ni.ss['도화']) love += ' You have the star of charm, so you tend to attract interest.';
  const over = sj.count.map((n, e) => n >= 3 ? e : -1).filter(e => e >= 0), lack = sj.count.map((n, e) => n === 0 ? e : -1).filter(e => e >= 0);
  let care = '';
  if (over.length) care += 'You have a lot of ' + over.map(e => EL[e]).join(', ') + ' energy, which saju reads as a load on the ' + over.map(e => ORGAN[e]).join(' / ') + '. ';
  if (lack.length) care += 'You have no ' + lack.map(e => EL[e]).join(', ') + ' energy, which is read as a reminder to look after the ' + lack.map(e => ORGAN[e]).join(' / ') + '. ';
  if (!care) care = 'The five energies are evenly present, with nothing especially lopsided. ';
  if (ni.johu >= 0) care += 'Born in ' + SEASON_EN[ni.season] + ', you do well to add ' + (ni.johu === 1 ? 'warm' : 'cool') + ' ' + EL[ni.johu] + ' energy. ' + EL_TIP[ni.johu][1] + ' ';
  care += 'These are traditional correspondences, not a medical diagnosis.';
  return [['What kind of person am I', person, 'Day Master ' + P.day.stemH + ', month branch ' + P.month.branchH + ', day-branch life stage ' + US_NAME[us]], ['Work and aptitude', work, workWhy], ['Money', money, moneyWhy], ['Love and partner', love, 'day branch ' + P.day.branchH + ' ' + G(P.day.bGod) + ', ' + spName + ' ×' + sp], ['Body and daily life', care, 'five elements ' + sj.count.join('/') + (ni.johu >= 0 ? ', seasonal need ' + EL[ni.johu] : '')]];
}
function palacesEN() {
  const P = S.saju.P, ni = S.ni, th = g => DAEUN[g][0], u = k => ' In its mood, ' + US_TXT[ni.us(k)] + '.';
  const pn = { year: 'Year', month: 'Month', day: 'Day', hour: 'Hour' };
  const why = k => pn[k] + ' pillar ' + P[k].stemH + P[k].branchH + ' · ' + G(P[k].sGod) + '/' + G(P[k].bGod) + ' · life stage ' + US_NAME[ni.us(k)];
  const out = [
    ['The seat of ancestors and childhood', 'Your family background carries the energy of ' + th(P.year.sGod) + ', with a current of ' + th(P.year.bGod) + ' beneath it. As for childhood: ' + STAGE[P.year.bGod][0] + u('year'), why('year')],
    ['The seat of parents and social life', 'In your relationship with your parents and in your working environment, ' + th(P.month.sGod) + ' shows on the surface and ' + th(P.month.bGod) + ' holds the center. It is the strongest seat in the chart, so it shows directly in your choice of work.' + u('month'), why('month')],
    ['The seat of self and partner', 'The seat of yourself and the person closest to you. The energy of ' + th(P.day.bGod) + ' sits here and sets how you live in midlife.' + u('day'), P.day.stemH + P.day.branchH + ' day pillar · day branch ' + G(P.day.bGod) + ' · life stage ' + US_NAME[ni.us('day')]]
  ];
  if (P.hour) out.push(['The seat of children and old age', 'The seat of children, juniors, the results of your work, and old age. ' + th(P.hour.sGod) + ' shows and it closes with ' + th(P.hour.bGod) + '. As for old age: ' + STAGE[P.hour.bGod][4] + u('hour'), why('hour')]);
  return out;
}
