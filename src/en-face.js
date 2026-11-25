/* ===== 영어판 관상 문장 =====
   face.js의 표와 partsOf(), sajuLink()를 영어로 다시 쓴 것이다. 점수 식(q)과 판단 조건은 한국어판과 같아야 한다. */
const EN_F = {
  REF: { fr: 'face height/width', jr: 'jaw width (below ears)', jc: 'chin width', zr: 'middle/lower zone', ig: 'between the brows', bl: 'brow/eye length', ba: 'brow tail slope', be: 'brow-to-eye gap', el: 'eye length', eo: 'eye height/length', eg: 'eye spacing/eye length', et: 'eye corner slope', gm: 'temple (beside the eye)', nl: 'nose length', nw: 'nostril width', mw: 'mouth width', lt: 'lip thickness', lift: 'mouth corner height', ph: 'philtrum length', ch: 'chin length' },
  SHAPE: [
    ['Wood type', '木', 'a long face with straight lines', 'A Wood-type face: long, with straight lines. Like a tree it reaches upward, so you are strong at learning and growing, and you value principle and dignity. Once you set a direction you push it for a long time. You may be told you lack flexibility, so the ease to pause for a beat is your remedy.'],
    ['Fire type', '火', 'a face wide at the top and narrowing to the chin', 'A Fire-type face: wide at the top and narrowing toward the chin. A quick mind and sharp senses make you shine at planning and expressing. As quickly as fire flares it also cools, so looking after the stamina to carry things through is the key.'],
    ['Earth type', '土', 'a solid face balanced in height and width', 'An Earth-type face: balanced in height and width, leaning to neither. Like the ground it is weighty and inspires trust, so people and wealth gather slowly. Making time your ally suits you better than a quick contest. Just watch a slow response to change.'],
    ['Metal type', '金', 'a face with a wide, angular jawline', 'A Metal-type face: a wide jawline with clear angles. With will and decisiveness as hard as iron, you see what you take on through to the end. You are strong in positions of responsibility and work with clear outcomes. Your words are direct and may sound cold to those close to you, so soften the expression by a layer.'],
    ['Water type', '水', 'a broad face with a rounded outline', 'A Water-type face: broad, with a rounded outline. Like water you seep in anywhere, with affinity and tact that win chances among people. Your sense for money is good too. Going with the flow can delay decisions, so the habit of setting your own deadlines helps.']
  ],
  YUN: [
    [1, 14, 'Ears', '', 'The luck of childhood is read from the ears.'],
    [15, 27, 'Forehead', '', 'The luck of ages 15 to 30 is read from the forehead (the upper zone): the benefit of parents and seniors, study and the start in life.'],
    [28, 28, 'Between the brows', 'ig', 'Age 28 is the seat between the brows. It ends the upper zone and is the Life Palace, read as the year the direction of life is set.'],
    [29, 30, 'Sides of the forehead', '', 'Ages 29 to 30 are the sides of the forehead, read for moving and widening your ground.'],
    [31, 34, 'Eyebrows', 'brow', 'The luck of ages 31 to 34 is read from the eyebrows. A time when ties with people decide success in work.'],
    [35, 40, 'Eyes', 'eye', 'Ages 35 to 40 are the seat of the eyes. A time of competing on judgment; with strength in the eyes you reach furthest.'],
    [41, 43, 'Root of the nose', '', 'Ages 41 to 43 are the root of the nose between the eyes and its sides. It is the pass into midlife, read as a time to watch health and changes of position.'],
    [44, 45, 'Nose bridge', 'nose', 'Ages 44 to 45 are the bridge of the nose. The very middle of midlife, read for health and the strength to keep your center.'],
    [46, 47, 'Cheekbones', '', 'Ages 46 to 47 are the cheekbones. A time read for social strength and the authority to move people.'],
    [48, 50, 'Nose tip and nostrils', 'nose', 'Ages 48 to 50 are the tip of the nose and the nostrils. The center of the Wealth Palace, where the peak of lifetime wealth is read.'],
    [51, 55, 'Philtrum and its sides', 'ph', 'Ages 51 to 55 are the philtrum and its sides. The channel from midlife into later life, and the storehouse you live on.'],
    [56, 59, 'Laugh lines and cheeks', '', 'Ages 56 to 59 are the lines running down beside the mouth and the cheeks. A time read for authority in work and for finishing.'],
    [60, 60, 'Mouth', 'mouth', 'Age 60 is the seat of the mouth: speech, plenty to eat, and the strength to lead a household.'],
    [61, 67, 'Below the mouth and sides of the chin', 'chin', 'Ages 61 to 67 run from below the mouth to the sides of the chin, read for the strength to keep what you have gathered.'],
    [68, 75, 'Chin tip and jawline', 'chin', 'Ages 68 to 75 are the tip of the chin and the jawline: your ground in later life and the people who follow you.'],
    [76, 120, 'Around the face', 'sym', 'From age 76 the reading moves around the outline of the face, one seat every two years. The balance of the whole is your luck.']
  ],
  CH: [
    ['Lift the corners of your mouth', 'Mouth', 'Keep the corners of your mouth slightly raised even when you are not speaking. The fastest practice is one minute a day at the mirror, holding the corners up for ten seconds at a time. Face reading sees raised corners as a mouth that lets fortune in.'],
    ['Smooth the space between your brows', 'Between the brows', 'Notice the habit of frowning when you concentrate, and release it. When looking at a screen, lightly smooth the space between your brows with a fingertip. A wider Life Palace is read as an open door for luck.'],
    ['Shape your eyebrows', 'Eyebrows', 'Draw or grow the brow tail slightly longer than the corner of the eye, and tidy stray hairs. Neat brows long enough to cover the eye are read as bringing the Siblings Palace to life.'],
    ['Brighten the eyelid area', 'Property Palace', 'Tidy the fine hairs under the brow, and reduce the habit of raising or scrunching your eyes. When the space between brow and eye shows clearly, the Property Palace looks wider.'],
    ['Even out left and right', 'Left-right balance', 'Fix habits such as chewing on one side or propping your chin, and hold your head straight. Face reading looks at the balance of the whole before any single feature.']
  ]
};
function facePartsEN(m) {
  const z = m.z, out = [], pick = (x, hi, mid, lo) => x > .5 ? hi : x < -.5 ? lo : mid;
  const add = (key, title, sub, q, keys, sents) => out.push({ key, title, sub, q, keys, text: sents.filter(Boolean).join(' ') });
  const sym = clamp(1.2 - m.asym / .09, -2, 2);
  add('sam', 'Three zones', 'the weight of midlife and later-life luck', 1 - Math.abs(z.zr), ['zr'], [pick(z.zr,
    'Your middle zone, from the brows to the tip of the nose, is long. It is read for the luck of ages 31 to 50 and what you achieve in society by your own strength. A face that finds its place in the prime working years.',
    'Your middle and lower zones are even in length. Face reading rates evenly matched zones highest. Midlife and later-life luck lean to neither side, so the ups and downs are gentle.',
    'Your lower zone, from the tip of the nose to the chin, is long. It is read for luck after 51, the home and the blessing of juniors. A late bloomer whose life grows easier with time.')]);
  add('ig', 'Between the brows', 'Life Palace · the door luck passes through', z.ig, ['ig'], [pick(z.ig,
    'The space between your brows is wide and open. This is the Life Palace, first of the twelve palaces; when it is wide, the mind is read as open and there is ample room for chances to enter.',
    'The space between your brows is well proportioned. With the Life Palace neither narrow nor spread, thought and decision are balanced and luck comes and goes evenly.',
    'The space between your brows is on the narrow side. It is read as the focus to dig deep into one thing, but also as holding on to worries. Simply frowning less widens the Life Palace.')]);
  add('brow', 'Eyebrows', 'Siblings Palace · ties with people', z.bl, ['bl', 'ba'], [pick(z.bl,
    'Your eyebrows are comfortably longer than your eyes. The brows are the Siblings Palace; when they are long enough to cover the eye, help from siblings and colleagues and long-lasting ties are read.',
    'Your brow length suits your eyes, so you handle distance between people well. A Siblings Palace where help given and received are about equal.',
    'Your eyebrows are on the short side. A short Siblings Palace is read as the independent type who does things by their own strength. Practice asking for help rather than carrying it all alone.'),
    pick(z.ba, 'The brow tails rise, so momentum and decision come first.', '', 'The brow tails fall, giving a gentle nature that puts people at ease.')]);
  add('jt', 'Property Palace', 'between brow and eye · home and ease of mind', z.be, ['be'], [pick(z.be,
    'The space between brow and eye, the Property Palace, is wide. It is read for home, property and ease of mind; when wide, the nature is relaxed and there is luck with housing.',
    'The Property Palace is well proportioned, so caution and action are in balance.',
    'The Property Palace is on the narrow side. Judgment and action are quick: the doer who moves straight toward a goal. Sleep on big contracts and moves for a day before deciding.')]);
  add('eye', 'Eyes', 'the Inspector · heart and judgment', .5 * z.el - .3 * Math.abs(z.eo) + .4 * sym, ['el', 'eo', 'eg', 'et'], [
    pick(z.el, 'Your eyes are long. Face reading prizes long, narrow eyes and reads deep thought and a long view.', '', 'Your eyes are on the short side, read as quick reaction to what is in front of you.'),
    pick(z.eo, 'Your eyes are large and clearly open, so feelings show on your face and you are expressive. You easily make a good first impression.',
      'Your eyes open moderately, so feeling and reason are well balanced.',
      'Your eyes open narrowly, so you do not readily show what is inside and you observe well. Your judgment is careful and practical.'),
    pick(z.eg, 'Your eyes are set wide, so you are generous and see the big picture first. The fine finishing needs separate attention.', '', 'Your eyes are set close, giving outstanding focus and quickness. Absorbed in one thing, you can miss what is around you.'),
    pick(z.et, 'The outer corners rise, giving a strong competitive drive.', '', 'The outer corners fall, giving a soft impression and a good listener.')]);
  add('gm', 'Temples', 'Spouse Palace · ties with a partner', z.gm, ['gm'], [pick(z.gm,
    'The area from the outer corner of the eye to the edge of the face is wide. This is the Spouse Palace; when wide and smooth, ties with a partner are read as smooth and the home as a source of strength.',
    'The Spouse Palace is well proportioned, read as easy enough ties with a partner.',
    'The Spouse Palace is on the narrow side. It is read as expecting much from those close to you, so hurt builds easily. The habit of saying thanks first widens this seat.')]);
  add('nose', 'Nose', 'Wealth Palace · money and midlife', .7 * z.nw + .3 * (1 - Math.abs(z.nl)) - (m.bend > .03 ? .5 : 0), ['nw', 'nl'], [pick(z.nw,
    'Your nostrils are wide and strong. The nose is the Wealth Palace where money gathers, and the nostrils are its storehouse. When ample, the power to earn and the power to keep are read together.',
    'Your nostril width is well proportioned, giving a good sense of balance between income and spending. A household that does not lose big.',
    'Your nostrils are narrow and sleek. You spend precisely where needed rather than piling money up, and value reputation and finish over wealth. Set up a separate way to save.'),
    pick(z.nl, 'Your nose is long: strong pride and responsibility, and you keep to principle.', '', 'Your nose is on the short side: a bright nature that adapts quickly.'),
    m.bend > .03 ? 'The bridge of your nose appears to lean slightly to one side. This may be the angle of your head, so check again from straight on.' : 'The bridge of your nose runs straight down, read as a steady center in midlife.']);
  add('mouth', 'Mouth', 'the Treasurer · speech and affection', .4 * z.mw + .5 * z.lift + .2 * (1 - Math.abs(z.lt)), ['mw', 'lt', 'lift'], [pick(z.mw,
    'Your mouth is large. By the old standard, a mouth wider than the distance between the pupils counts as large, read as a big heart and the power to lead people.',
    'Your mouth is in harmony with your face, so speech and action are balanced.',
    'Your mouth is small and neat: sparing with words and careful. You keep a trusted few close.'),
    pick(z.lt, 'Your lips are full: warm-hearted and rich in showing affection.', '', 'Your lips are thin: rational, with precise speech.'),
    pick(z.lift, 'The corners of your mouth rise, called a mouth that lets fortune in. People gather around you.', '', 'The corners of your mouth sit below level, giving a serious impression. Raising them just slightly changes the face.'),
    m.smile ? 'The photo was taken smiling, so the mouth measurements were counted at half weight.' : '']);
  add('ph', 'Philtrum', 'stamina and health, the seat of age 51', z.ph, ['ph'], [pick(z.ph,
    'Your philtrum is long: a face of stamina and lasting health. The channel from midlife into later life is ample.',
    'Your philtrum is well proportioned, so the passage from midlife to later life is smooth.',
    'Your philtrum is short: quick to react, keeping a young sensibility for long. You tend to run without resting, so pace yourself around your fifties.')]);
  add('chin', 'Chin', 'later life and those who follow you', .5 * z.ch + .4 * z.jc + .3 * z.jr, ['ch', 'jc', 'jr'], [pick(.5 * z.ch + .4 * z.jc + .3 * z.jr,
    'Your chin is wide and sturdy. Korean face reading holds the chin in especially high regard. It is read as a base that grows firmer toward later life, with many who follow you.',
    'The length and width of your chin are well proportioned, so later-life luck is stable.',
    'Your chin is on the slender side: fine senses, and strength in work done alone. It helps to build your base and your people for later life consciously and early.')]);
  add('sym', 'Left-right balance', 'the first principle of face reading: harmony', sym, [], [pick(sym,
    'Left and right match evenly. Face reading looks at the harmony and balance of the whole before any one feature. Good balance is read as small swings in luck.',
    'Left-right balance is average. Fine, with no great lean.',
    'There is a slight difference between left and right. Photo angle and expression affect this a great deal, so retake from straight on to check. Habits such as chewing or sleeping on one side widen the difference.')]);
  return out;
}
function sajuLinkEN(f) {
  const sj = S.saju; if (!sj || !sj.P) return null;
  const d = sj.P.day.sEl, n = sj.need, gen = a => (a + 1) % 5, ctl = a => (a + 2) % 5, E = EL;
  let a;
  if (f === d) a = 'Your face is ' + E[f] + ' and your Day Master is ' + E[d] + ' too. Inside and out share the same energy, so what you seem is what you are, and your color is distinct. It easily runs to excess, so draw it off with the opposite energy.';
  else if (gen(f) === d) a = 'The ' + E[f] + ' of your face gives birth to your Day Master ' + E[d] + '. Your looks and first impression work for you, so you easily benefit from people and seniors.';
  else if (gen(d) === f) a = 'Your Day Master ' + E[d] + ' gives birth to the ' + E[f] + ' of your face. A pairing that brings what is inside out well; expressiveness and skill show in the face. It uses a lot of energy, so set rest days aside.';
  else if (ctl(f) === d) a = 'The ' + E[f] + ' of your face presses on your Day Master ' + E[d] + '. How you appear is stricter than how you feel, so responsibility comes to you easily and you temper yourself. You need time to release the tension.';
  else a = 'Your Day Master ' + E[d] + ' governs the ' + E[f] + ' of your face. Practical sense and substance show in the face, with good strength for handling work and money.';
  let b = '', fit = 0;
  if (n != null && n >= 0) {
    if (f === n) { b = 'The ' + E[n] + ' energy your saju needs is carried in your face, a good pairing in which your looks fill an innate lack.'; fit = 2; }
    else if (gen(f) === n) { b = 'The energy of your face gives birth to the ' + E[n] + ' your saju needs, adding to it indirectly.'; fit = 1; }
    else if (ctl(f) === n) { b = 'However, the energy of your face presses on the ' + E[n] + ' your saju needs, so it helps to add ' + E[n] + ' energy consciously in daily life.' + (typeof EL_TIP !== 'undefined' && EL_TIP[n] ? ' ' + EL_TIP[n][1] : ''); fit = -1; }
    else b = 'Your face does not directly collide with the ' + E[n] + ' energy your saju needs.';
  }
  return { a, b, fit, d, n };
}
function faceSumEN(r, S5, SHAPE, strong, weak, top, y0, grade) {
  return ['<p>Your face is ' + S5[0] + (r.sh.sub >= 0 ? ' mixed with ' + SHAPE[r.sh.sub][0] : '') + ', and your face-reading total is ' + r.total + '. ' + (strong.length ? 'Your best-formed seats are ' + strong.slice(0, 3).map(p => p.title).join(', ') + '. ' : 'No single feature stands out; the whole is even. ') + 'Of the five kinds of luck, ' + top[0][0] + ' (' + top[0][1] + ') is strongest, backed by ' + top[1][0] + ' (' + top[1][1] + ').</p>',
    '<p>' + (weak.length ? 'The seats to work on are ' + weak.slice(0, 2).map(p => p.title).join(', ') + '. ' : '') + 'Your relatively weaker ' + top[4][0] + ' luck (' + top[4][1] + ') is filled in by ' + top[4][2] + '.' + (r.link ? ' With your saju, ' + (r.link.fit > 0 ? 'face and chart add to each other.' : r.link.fit < 0 ? 'the energy you need has to be looked after separately.' : 'the two sit together easily.') : '') + '</p>',
    r.better.list.length ? '<p>The change with the biggest effect right now: ' + r.better.list[0].title.toLowerCase() + '.' + (r.better.after > r.total ? ' Making all the suggested changes raises your total to ' + r.better.after + '.' : '') + '</p>' : '',
    y0 ? '<p>This year, at age ' + y0.age + ', is the seat of the ' + y0.name.toLowerCase() + ', and ' + (y0.q == null ? 'it is hard to measure from a photo, so it is read from color and fullness.' : 'from the photo it reads as ' + grade(y0.q)[0].toLowerCase() + '.') + '</p>' : '',
    '<p><b>The classic Mayi face-reading text says good looks are not as good as a good body, and a good body not as good as a good heart. Expression and complexion change your luck more than bone structure does.</b></p>'].join('');
}
