/* ===== 영어판 풀이 표 =====
   한국어 표와 모양(순서, 열쇠)이 같다. 열쇠(비견 등)는 한국어 그대로다. 한국어 표를 고치면 여기도 같이 고친다. */
const GOD_EN = { '비견': 'Friend', '겁재': 'Rob Wealth', '식신': 'Eating God', '상관': 'Hurting Officer', '편재': 'Indirect Wealth', '정재': 'Direct Wealth', '편관': 'Seven Killings', '정관': 'Direct Officer', '편인': 'Indirect Resource', '정인': 'Direct Resource', '일간': 'Day Master',
  '비겁': 'Peers', '식상': 'Output', '재성': 'Wealth', '관성': 'Authority', '인성': 'Resource' };
const G = k => EN ? (GOD_EN[k] || k) : k;   // 육신 이름을 화면에 보일 때 쓴다
const EN_D = {
  DAY_TXT: [
    ['A tall tree', 'You grow straight upward. Your principles and direction are clear, so you do well out in front, and once you choose a road you rarely bend. Your homework is knowing when to bend.'],
    ['Vines and flowers', 'You grow by reading your surroundings and bending with them. You sense the grain between people, which makes you strong at teamwork and mediation. Your luck is your eye for what to lean on.'],
    ['The midday sun', 'You shine openly and hold nothing back. Your expressiveness and drive gather people. You heat up fast, so schedule time to cool down.'],
    ['A lantern', 'You light one place for a long time. Delicate and warm, you are strong at deep work and at caring for people. Keep yourself fueled so you do not burn yourself up working.'],
    ['A great mountain', 'You hold your place with weight. People lean on you because you are dependable and broad-minded. Just watch that slow movement does not let chances pass.'],
    ['Farmland', 'You take in seeds and raise them. You are good at careful looking-after and coordination. Set boundaries so your own field does not lie fallow while you carry other people\'s work.'],
    ['Ore and iron', 'You are decisive and clean-cut. Loyal and quick to act, you are strong at changing the game. Your edge needs polishing so sharp words do not cut relationships.'],
    ['Gems and blades', 'You are precise, with high standards. Sensitive to finish and beauty, you shine in a specialty. Lower the ruler you hold to yourself a little and you will gain speed.'],
    ['The open sea', 'You take things in widely and flow. You see the whole board and adapt well. The key is gathering the currents of everything you have started into one.'],
    ['Rain and dew', 'You seep in quietly and work by intuition. Deep sensitivity and insight suit planning, research and counseling. Make a habit of letting your thoughts flow outward so they do not pool.']
  ],
  GOD_YEAR: {
    '비견': 'A year of standing on your own strength. Independence, starting a business and going solo come up. Put partnerships and shares in writing.',
    '겁재': 'A year when competition and spending grow together. You gain people but money tends to leave. Avoid guarantees and impulse investments.',
    '식신': 'A year when what you have steadily made piles up into a living. Time put into skills, content and looking after your body comes straight back.',
    '상관': 'A year of stronger urges to express and to change. Good for new attempts, but friction with superiors and rules comes easily. Show results rather than words.',
    '편재': 'A year when money and chances move in large amounts. Proposals to expand or invest arrive. What flows in can flow out just as widely, so set your limit first.',
    '정재': 'A year when steady effort builds up reliably. Good for predictable income such as salary, savings and contracts. Management beats a big gamble.',
    '편관': 'A year when pressure and responsibility land suddenly. Clear a heavy task and position and authority follow. Leave slack in your stamina and schedule.',
    '정관': 'A year when your position and reputation settle into order. Good for promotion, credentials and recognition inside an organization. Keeping the rules pays off in the end.',
    '편인': 'A year of unfamiliar study and changes of direction. Your intuition sharpens, but you think more. Choose one thing and dig to the end.',
    '정인': 'A year of learning and backing. Good for documents, credentials and help from seniors. Do not let receiving delay acting.'
  },
  EL_TIP: [
    ['Blue and green, the east', 'Bring in growing energy: morning hours, new study, walks among trees.'],
    ['Red, the south', 'Show yourself outwardly: stand in front of people, present, exercise in the sun.'],
    ['Yellow and earth tones, the center', 'Find your center with fixed routines, tidying up and keeping promises.'],
    ['White and metallic tones, the west', 'Tie things off: set deadlines, cut what should be cut, make rules.'],
    ['Black and navy, the north', 'Fill yourself inwardly with enough sleep, note-taking and time alone to think.']
  ],
  DAEUN: {
    '비견': ['independence and self-reliance', 'A period when you wanted to stand on your own. There may have been much independence, competition and deciding alone.', 'A period when you set things up under your own name. Independence and your own business gain strength, but carrying everything alone will wear you out.'],
    '겁재': ['competition and sharing', 'A period when people and money came and went together. You may have both gained and lost through colleagues or rivals.', 'A period when you gain people and money goes out. For partnerships, guarantees and large spending, settle the paperwork and limits first.'],
    '식신': ['skill and making', 'A period of steadily learning and making what you like. The base of the skills you live on was probably laid here.', 'A period when what you make with your hands turns into income. What you put into expertise, content and daily habits is what remains.'],
    '상관': ['expression and change', 'A period of wanting to break the mold. You may have changed course or clashed with superiors.', 'A period of showing your talent and changing your methods. Good for entering new fields, but manage the friction with organizations and rules.'],
    '편재': ['opportunity and expansion', 'A period when your range widened and money moved in large amounts. You may have both earned and spent big.', 'A period when chances in business, investment and big deals arrive. Grow the game, but cap how much you stake at one time.'],
    '정재': ['stability and saving', 'A period of saving diligently and building a base for living. Frames like a job, a household and savings may have taken shape.', 'A period when steady income and assets build up. Careful management and contracts serve you better than overreaching.'],
    '편관': ['trials and pressure', 'A period of enduring heavy responsibility and pressure. As hard as it was, your staying power and ability may have been forged here.', 'A period when heavy tasks and responsibility are handed to you. Get through and authority and position come, but avoid overwork and reckless bets.'],
    '정관': ['position and honor', 'A period of finding your place within organizations and rules. You may have received formal recognition such as admission, employment or promotion.', 'A period when your title and reputation rise. The more you keep your principles the more you are recognized, and shortcuts come back hard.'],
    '편인': ['inquiry and turning', 'A period of being absorbed in unusual study or interests. You may have changed direction several times and worried a great deal.', 'A period when specialist knowledge and intuition deepen. Good for research, credentials and studying a new field, but thinking too long can miss the moment.'],
    '정인': ['learning and backing', 'A period when you benefited from study and care. Help from parents, teachers and seniors may have been large.', 'A period when documents, credentials and backers help you. Results remain only when you turn what you learned into action.']
  },
  GOD_CAUTION: {
    '비견': 'disputes over partnerships and shares, relationships cut off by stubbornness', '겁재': 'guarantees, lending money, impulse investment and overspending',
    '식신': 'slackness, overeating and drinking, things started and left unfinished', '상관': 'slips of the tongue and gossip, clashes with bosses and institutions, quitting in haste',
    '편재': 'overexpansion and speculation, contracts involving large sums', '정재': 'chances missed by playing too safe, quarrels over small money',
    '편관': 'overwork, accidents and injury, lawsuits or friction with forceful people', '정관': 'responsibility overload, taking things on to save face, breaking rules',
    '편인': 'isolation and overthinking, skimming contracts, changing course too often', '정인': 'dependence and putting things off, plans without action, signing documents and guarantees'
  },
  PNAME: { year: 'year branch', month: 'month branch', day: 'day branch', hour: 'hour branch' },
  PALACE: { year: 'seniors and the outside world', month: 'work, parents and your social base', day: 'partner, home and daily rhythm', hour: 'children, juniors and long-term plans' },
  SAMJAE: ['entering three-year trial', 'middle of the three-year trial', 'leaving the three-year trial'],
  GOD_DOMAIN: ['yourself and taking the lead', 'expression and what you produce', 'money and practical results', 'responsibility and position', 'learning and backing'],
  MAJOR_TXT: [
    ['A light first step into something new. Curiosity opens the way more than calculation.', 'Watch out for the recklessness of jumping in unprepared.'],
    ['You can start right now with what you have. Action is the answer.', 'Check whether you are relying on talent alone and putting things off or inflating them.'],
    ['Some information has not surfaced yet. Trust your intuition and wait.', 'Ignoring or hiding what you really feel makes the problem grow.'],
    ['What you have tended grows abundantly. A time of care and harvest.', 'Too much looking-after or too much slack blocks growth.'],
    ['Time to build structure and responsibility. Make your standards clear.', 'Stubbornness and control push people away.'],
    ['Proven methods and a good adviser help.', 'If you are trapped in form, it is time to look at the frame again.'],
    ['The attraction is clear. Choose what fits your values.', 'Crossed feelings and indecision shake the relationship.'],
    ['Push on with willpower and you win. Just do not lose your direction.', 'You have speed but have lost direction. Take the reins again.'],
    ['Gentle patience works better than force.', 'Impatience and self-doubt wear your strength down.'],
    ['You need time alone to look deeply.', 'The isolation has gone on long enough. Time to come out.'],
    ['The flow is changing. Take the chance as soon as it comes.', 'The timing is off. Break the repeating pattern.'],
    ['What you did comes back in kind. Judge fairly.', 'Look again at a lopsided judgment or a dodged responsibility.'],
    ['Stop and turn it upside down, and the answer shows.', 'Sacrifice without return and stagnation continue.'],
    ['One chapter ends and the next opens. Clear out first.', 'Change is late because you cannot let go.'],
    ['Mix and adjust, and balance returns. Find the middle value.', 'You have tilted to one side. Take away what is too much.'],
    ['You are tied up in attachment and temptation. See what is pulling you.', 'You are starting to get free of what bound you.'],
    ['What was holding up collapses at once and the truth shows.', 'You avoided the big shock, but there is still something to fix.'],
    ['A card of recovery and hope. Look far ahead as you go.', 'Discouragement shakes your faith. Reset your expectations.'],
    ['Much is unclear. Do not decide while anxiety is pulling you.', 'The fog is lifting and the facts are starting to show.'],
    ['A card of bright, clear success. Show yourself.', 'Briefly overcast. Just dial back the overconfidence.'],
    ['A chance to be judged anew and rise again.', 'You are blaming yourself and putting the decision off.'],
    ['A cycle is completed. Wrap up and move to the next round.', 'One last step remains.']
  ],
  SUIT_AREA: ['work and drive', 'feelings and relationships', 'thinking and judgment', 'money and health'],
  RANK_NAME: ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Page', 'Knight', 'Queen', 'King'],
  RANK_TXT: [
    ['a new seed sprouts. A good time to begin.', 'the start is blocked. Check your preparation again.'],
    ['balance and choice between two things is the theme.', 'the balance is broken. One side has to be settled.'],
    ['working together brings the first results.', 'you are out of step. Divide the roles again.'],
    ['a stretch of stability and rest.', 'comfort is turning into stagnation.'],
    ['a stretch of conflict and loss.', 'the worst has passed. Recovery begins.'],
    ['you move a step forward through give and take.', 'you are slow because the past holds you.'],
    ['you are being tested. Hold on and you will get through.', 'you are wavering. Decide what to keep and what to drop.'],
    ['focus and speed pick up.', 'effort is not turning into progress. Change your method.'],
    ['the harvest is right ahead. Go all the way.', 'you are tired and anxious. You have to rest to finish.'],
    ['a cycle is full. Time to tie it off.', 'the load is too heavy. Choose what to put down.'],
    ['learning and news come in.', 'you are clumsy and scattered. Start again from the basics.'],
    ['drive builds and things start moving.', 'you are being hasty. Slow down.'],
    ['you can hold and care for things with maturity.', 'feelings are overflowing. Step back a little.'],
    ['you lead with practiced skill.', 'self-righteousness comes easily. Listen to other views.']
  ],
  TOPICS: { all: 'Overall', love: 'Love · relationships', money: 'Money', work: 'Work · career' },
  POS: ['The flow so far', 'Now', 'The flow ahead']
};
const POS_EN = { '년간': 'year stem', '년지': 'year branch', '월간': 'month stem', '월지': 'month branch', '일간': 'day stem', '일지': 'day branch', '시간': 'hour stem', '시지': 'hour branch' };
const PW = w => EN ? (POS_EN[w] || w) : w;   // 자리 이름(월지 등)을 화면에 보일 때 쓴다
const EN_Y = {
  TEN_KEY: { '비견': 'self-respect · independence · peers', '겁재': 'rivalry · contest · sharing', '식신': 'talent · ease · plenty', '상관': 'expression · critique · skill', '편재': 'big money · business · activity', '정재': 'salary · savings · diligence', '편관': 'pressure · power · decisiveness', '정관': 'rules · career · honor', '편인': 'intuition · niche fields · solitude', '정인': 'study · documents · care' },
  TEN_NATAL: {
    '비견': 'A strong wish to stand on your own without leaning on others. You grow by competing as an equal with peers and siblings.',
    '겁재': 'Strong competitiveness and drive. You gather people well, but sharing or losing money comes with it.',
    '식신': 'The power to make things steadily and enjoy them. You polish one skill for a long time and build a living on it.',
    '상관': 'A quick mind with outstanding speech and skill. You do not accept frames and authority as given.',
    '편재': 'A feel for moving money and people on a large scale. You catch chances by moving widely rather than staying tied to one place.',
    '정재': 'The power to earn diligently and save bit by bit. Practical, with exact calculation.',
    '편관': 'The power to bear heavy responsibility and pressure. Strong in a crisis and quick to decide, but you drive yourself hard.',
    '정관': 'The power to keep principles and responsibility. You are trusted in organizations and settle into your place properly.',
    '편인': 'An unusual viewpoint and intuition. You dig deep into one field, but overthinking and changeability come with it.',
    '정인': 'The power to learn and take in. You benefit from seniors, credentials and documents.'
  },
  KIN: {
    M: { '비견': 'brothers and friends', '겁재': 'siblings and rivals', '식신': 'juniors and students', '상관': 'juniors', '편재': 'father and girlfriend', '정재': 'wife', '편관': 'son', '정관': 'daughter', '편인': 'guardians other than mother', '정인': 'mother' },
    F: { '비견': 'sisters and friends', '겁재': 'siblings and rivals', '식신': 'daughter', '상관': 'son', '편재': 'father', '정재': 'mother-in-law', '편관': 'boyfriend', '정관': 'husband', '편인': 'guardians other than mother', '정인': 'mother' }
  },
  GROUP_GLOSS: { M: ['self · siblings · rivals', 'expression · talent · juniors', 'money · father · wife', 'career · honor · children', 'study · documents · mother'], F: ['self · sisters · rivals', 'expression · talent · children', 'money · father', 'career · honor · husband', 'study · documents · mother'] },
  POS_NOTE: { '년간': 'the seat of ancestors and childhood', '년지': 'the seat of ancestors and childhood', '월간': 'the seat of parents and social life', '월지': 'the strongest seat in the chart', '일지': 'the partner\'s seat', '시간': 'the seat of children and old age', '시지': 'the seat of children and old age' },
  ACTS: {
    '관인상생': ['Authority feeds Resource', 'Authority gives birth to Resource. Job and responsibility turn into credentials and ability, which favors climbing step by step inside an organization.'],
    '식상생재': ['Output feeds Wealth', 'Output gives birth to Wealth. The channel that turns your talent and work into money is open.'],
    '재생관': ['Wealth feeds Authority', 'Wealth gives birth to Authority. Money earned and results lead to title and honor, but if you are weak the responsibility feels heavy.'],
    '상관견관': ['Hurting Officer meets Direct Officer', 'Hurting Officer strikes Direct Officer. Clashes with superiors and rules come easily, so filter what you say and write at work.'],
    '식신제살': ['Eating God controls Seven Killings', 'Eating God governs Seven Killings. A structure that beats pressure and hard tasks with ability.'],
    '편인도식': ['Indirect Resource upsets Eating God', 'Indirect Resource presses on Eating God. Too much thinking blocks doing, so build the habit of moving your hands first.'],
    '관살혼잡': ['Officer and Killings mixed', 'Direct Officer and Seven Killings are mixed. Forks come often in work and romance, so pick one and push.'],
    '군겁쟁재': ['Peers fight over Wealth', 'Many Friend and Rob Wealth stars contend over Wealth. Losses come easily in partnerships, guarantees and money dealings.'],
    '재다신약': ['Much Wealth, weak self', 'Wealth is heavy but the Day Master is weak. Chances in money and work are many, but they are hard to carry alone, so add strength through people and credentials.'],
    '인성과다': ['Too much Resource', 'Resource is excessive. Preparing and thinking run long, action comes late, and receiving becomes a habit.'],
    '설기처 부족': ['No outlet', 'Output and Authority, which would draw off your strong energy, do not show. You have to create the work and goals to pour your strength into.']
  }
};
const SS_EN = { '천을귀인': 'Noble Helper', '도화': 'Peach Blossom', '역마': 'Traveling Horse', '화개': 'Canopy', '양인': 'Blade', '문창귀인': 'Literary Star', '공망': 'Void', '괴강': 'Goegang', '백호': 'White Tiger' };
const SSN = k => EN ? (SS_EN[k] || k) : k;
const REL_EN = { '충': 'clash', '합': 'bond', '형': 'friction' };
const SEASON_EN = { '봄': 'spring', '여름': 'summer', '가을': 'autumn', '겨울': 'winter' };
const EN_P = {
  US_NAME: ['Birth', 'Bath', 'Coming of age', 'Prime', 'Peak', 'Decline', 'Illness', 'Death', 'Tomb', 'Severance', 'Conception', 'Nurture'],
  US_TXT: ['it is the energy of a fresh start, good for learning and reaching out', 'it is easily swayed by feelings and trends, so trial and error follows', 'confidence builds and you step out into society', 'it is the energy of standing on your own, bringing independence and substance', 'momentum is at its height, so you take the lead but must pace yourself so as not to snap', 'momentum has eased, so keeping and refining suits it', 'energy weakens and overdoing causes trouble, so slow down', 'one flow comes to a stop, which suits tidying up and finishing', 'it gathers inward, which suits saving, research and inner substance', 'things break off and reconnect, so endings and turns come together', 'a seed is conceived, which suits planning and preparing', 'it grows under protection, a preparation period with backing'],
  SS_TXT: {
    '천을귀인': 'A star of helpers who appear at each hard turn. Things work out through people, so do not take your connections lightly.',
    '도화': 'A star of charm and popularity that draws people. It favors work in front of the public; with romance and gossip, keep the lines clear.',
    '역마': 'A star of movement and change. Business trips, moving house and overseas ties run deep, and being tied to one place for long feels stifling.',
    '화개': 'A star that digs deep into art, scholarship and religion. Time absorbed alone grows your talent but brings solitude with it.',
    '양인': 'A star of drive and decision, like holding a blade. It is the strength to do big things, but watch for harshness, accidents and quarrels.',
    '문창귀인': 'A star that is strong in writing, study and exams. You are well regarded in work that involves recording and presenting.',
    '공망': 'A star that reads the ties of that seat as empty. That area becomes easier the less you expect from it and cling to it.',
    '괴강': 'Your day pillar is Goegang, so your momentum is strong and your contests are clear-cut. You have a leader\'s temperament, but because you do not bend the ups and downs are large.',
    '백호': 'Your day pillar is White Tiger, so your pushing power is strong. It drives big achievement, but it is read as a reminder to watch for accidents, surgery and overwork.'
  },
  GROUP_NAME: ['Friend · Rob Wealth', 'Eating God · Hurting Officer', 'Wealth', 'Authority', 'Resource'],
  GROUP_TXT: [
    ['Strong pride and independence. You are good in competition, but money tends to scatter along with people, so draw lines in partnerships and money dealings.', 'Results grow when you borrow the strength of trustworthy colleagues and organizations rather than pushing alone.'],
    ['Overflowing skill and expressiveness. Words and ideas run ahead and clash with superiors and rules, so look after the finish.', 'The channel for bringing out what is inside you is narrow. Practicing showing it through writing, presenting and finished work opens your luck.'],
    ['You see many chances in money and work. Trying to catch them all scatters your strength, so choose only what you can carry.', 'Wealth follows when you pursue skill, reputation and people rather than money itself. Save through devices such as automatic transfers.'],
    ['A structure that carries much responsibility and pressure. You are recognized in organizations, but tension builds, so put rest days in your schedule.', 'A free temperament not bound to frames. Results gather when you make your own rules and deadlines.'],
    ['Deep thought and quick learning. Action tends to come late while you prepare, so start at 70 percent.', 'You learn by running into things rather than leaning on others. Deliberately securing credentials, documents and a mentor cuts the trial and error.']
  ],
  GYEOK: {
    '비견': ['Self-reliant structure (Geonrok)', 'Work done under your own name suits you. You do well where ability is your signboard: the professions, self-employment, freelancing.'],
    '겁재': ['Blade structure (Yangin)', 'Fields with contest and competition suit you. You are strong in sales, sports, the military and police, surgery or crisis response, where decisiveness is needed.'],
    '식신': ['Eating God structure', 'Work of steadily making and teaching suits you. Research, craft, cooking, education and content: fields whose value rises as it accumulates.'],
    '상관': ['Hurting Officer structure', 'Work that changes existing ways suits you. Planning, art, the press, consulting and development: fields that produce new answers.'],
    '편재': ['Indirect Wealth structure', 'Work that moves the board suits you. Business, trade, sales and investment: fields where people and money circulate widely.'],
    '정재': ['Direct Wealth structure', 'Work that builds up steadily suits you. Finance, accounting, administration and the public sector: positions where accuracy and diligence are valued.'],
    '편관': ['Seven Killings structure', 'Work that solves problems under pressure suits you. The military and police, law, medicine, engineering and crisis management: fields of heavy responsibility.'],
    '정관': ['Direct Officer structure', 'Work that carries responsibility inside an organization suits you. Public bodies, large companies, administration and management: positions where procedure and trust matter.'],
    '편인': ['Indirect Resource structure', 'Work that competes on unusual expertise suits you. Research, IT, medicine and pharmacy, philosophy and special techniques: fields where depth is the weapon.'],
    '정인': ['Direct Resource structure', 'Work founded on learning and credentials suits you. Education, scholarship and professions that handle documents and licensing.']
  },
  GYEOK_ALT: 'Month-rival structure',
  SPOUSE: {
    '비견': 'You form an equal, friend-like relationship. Both of you are stubborn, so deciding whose turn it is to give way helps it last.',
    '겁재': 'Affection runs deep, but quarrels over control and money come easily. Divide accounts and roles clearly.',
    '식신': 'A comfortable relationship of looking after each other. Time spent eating and resting together is its strength.',
    '상관': 'A relationship of strong attraction and stimulation. Words can wound easily, so adjust how strongly you put things.',
    '편재': 'You are drawn to an active, sociable partner. It is easier when each accepts the other\'s outside life.',
    '정재': 'You are drawn to a diligent partner who looks after the household. Stable, but do not let nagging pile up.',
    '편관': 'You are drawn to a partner with charisma. Tension and interference come with it, so protect each other\'s territory.',
    '정관': 'You are drawn to an upright, responsible partner. You need time to share what you really feel rather than formalities.',
    '편인': 'You are drawn to an unusual, deep-thinking partner. Their inner mind is hard to read, so ask instead of guessing.',
    '정인': 'You are drawn to a partner who takes care of you. Leaning turns into dependence, so do your own share yourself.'
  },
  SEASON_TXT: [
    'Your birth month carries the same energy as your Day Master, so you were born with momentum. Your views are clear and you have good staying power.',
    'Your Day Master\'s energy drains into your birth month. You have many talents but tire easily, so pacing your stamina matters.',
    'Your birth month is the energy your Day Master has to manage, so there are many chances for work and money, but they easily exceed your strength.',
    'Your birth month presses on your Day Master, so you are tempered early by responsibility and discipline.',
    'Your birth month gives birth to your Day Master, so you grow up with help. You benefit from learning and backing.'
  ],
  ORGAN: ['liver, gallbladder, eyes, muscles', 'heart, blood vessels, small intestine', 'stomach, spleen, digestion', 'lungs, large intestine, skin, breathing', 'kidneys, bladder, ears, reproductive organs'],
  STAGE: {
    '비견': ['A time of mixing with peers and siblings and developing a will of their own. They grow into a child who wants to do their own things themselves.', 'Friends matter most and competitiveness grows. Hating to lose, they try to set their own course.', 'A time of trying to stand on your own. Independence, starting a business and deciding alone increase.', 'A time of setting things up under your own name. Independence and your own business gain strength, but carrying it all alone wears you out.', 'A time of wanting to live your own way. Activities with friends and people your age become the center of life.'],
    '겁재': ['A time of growing up sharing and quarreling with siblings and friends. The household or surroundings tend to change.', 'Competition is fierce and they move with their friends. Grades and direction vary greatly with the company they keep.', 'You meet many people and much money goes out. Be careful with partnerships, guarantees and large spending.', 'Rivals and partners multiply. You gain people but money leaks, so set a limit.', 'More calls on your money from those around you. Decide what you give to children and acquaintances by what you can afford.'],
    '식신': ['A time of eating well, playing well and growing dexterity and curiosity. They are looked after in relative comfort.', 'A time of being absorbed in a favorite subject or hobby. The skill learned now later becomes the base of a career.', 'A time of steadily building skill and ability. What your hands have learned begins to turn into income.', 'A time when what you make becomes money. What you put into expertise, content and good habits is what remains.', 'A time of enjoying leisure and making use of hobbies and talents. Teaching and sharing suit you.'],
    '상관': ['A time of growing into a quick-talking, lively child. They want to try exactly what they are told not to.', 'Rules feel stifling and they have much to say. Talent shows in the arts, sports, writing and speech.', 'A time of wanting to break the mold. Changing jobs or course, and clashing with superiors, come easily.', 'A time of showing your talent and changing how you work. Good for taking on new fields, but watch the friction with organizations.', 'A time of saying what you want to say. Start new hobbies and activities, but watch for misunderstandings caused by words.'],
    '편재': ['Money or business moves a great deal in the household. Surroundings tend to change with the father\'s work or a move.', 'More interest in outside activities and people than in study. They learn the ways of the world early.', 'Your range widens and money comes in and goes out in large amounts. Romance and business chances come with it.', 'A time when chances in business, investment and big deals arrive. Grow the game, but cap how much you stake at one time.', 'A time of using and spending what you have saved. Put the weight on protecting rather than big investments.'],
    '정재': ['The household is stable and they grow up in a regular routine.', 'A time of diligently doing what they should. They learn realistic planning and handling pocket money early.', 'A time of getting a job, saving your salary and laying a base for living. Marriage or buying a home may follow.', 'A time when steady income and property build up. Management and careful contracts serve you better than overreaching.', 'A time of living steadily on what you have saved. Habits of thrift and management make old age comfortable.'],
    '편관': ['A time of growing up early through things that are hard on a child, such as a strict environment, frequent small illnesses or moving house.', 'The pressure of exams and competition is heavy. They are tempered by strict teachers and discipline.', 'Work is tough and responsibility heavy. As hard as it is, ability and staying power grow.', 'A time when heavy tasks and responsibility are handed to you. Get through and authority and position come, but avoid overwork.', 'A time when strain on body and mind comes easily. Cut back on work and make time to rest.'],
    '정관': ['A time of growing up properly in a home that values manners and rules. They grow into a model child who listens to adults.', 'A time of diligent school life and recognition from teachers. They may take on a responsibility such as class leader.', 'A time of joining a stable workplace and settling in. Formal events such as employment, promotion and marriage occur.', 'A time when your title and reputation rise. The more you keep your principles, the more you are recognized.', 'A time when honor and standing are kept. You come to play the elder\'s role in groups and associations.'],
    '편인': ['Much time playing alone, with a rich imagination. They tend to grow into a shy or sensitive child.', 'A time of digging into what has caught them rather than schoolwork. There is much worry over which path to take.', 'A time of learning unusual studies or skills. You find your path by changing direction several times.', 'A time when specialist knowledge and intuition deepen. Good for research, credentials and studying a new field, but thinking too long can miss the moment.', 'A time of sinking deep into solitary study, religion or hobbies. Do not drift too far from people.'],
    '정인': ['A time of growing up with plenty of care from mother and other adults.', 'Good conditions for study and good luck with teachers. They benefit in grades and exams.', 'A time when study, certificates and help from seniors follow. You settle in through what you have learned.', 'A time when documents, credentials and helpers follow. Results remain only when you turn what you learned into action.', 'A time of ease of mind and the pleasure of learning. You are cared for by children and those around you.']
  },
  BABY: { '비견': 'A time when a will of their own appears and they want things their way.', '겁재': 'A time when a younger sibling arrives or the household has many expenses.', '식신': 'An easy time of eating well and growing well.', '상관': 'A time when speech opens up and tantrums increase.', '편재': 'A time when the family\'s work or home tends to change.', '정재': 'A time when the household becomes stable.', '편관': 'A time that needs much care because of small illnesses or unfamiliar surroundings.', '정관': 'A time when a regular routine takes hold.', '편인': 'A time of shyness and sensitivity that needs care.', '정인': 'A time of receiving plenty of care from adults.' },
  BABY_PRE: 'For a baby this is read through the mood of the home and the child\'s temperament. ',
  THEME_KID: { '비견': 'peers and a will of their own', '겁재': 'competition and sharing', '식신': 'skill and curiosity', '상관': 'flair and rebellion', '편재': 'outside activity', '정재': 'diligence and stability', '편관': 'tempering and pressure', '정관': 'good example and rules', '편인': 'imagination and absorption', '정인': 'care and study' },
  KID_CAUTION: { '비견': 'stubbornness, quarrels with friends', '겁재': 'trouble from following friends, losing things', '식신': 'overeating and oversleeping, homework put off for play', '상관': 'talking back, clashes with teachers or adults', '편재': 'distraction, leaning toward play over study', '정재': 'excessive timidity, fixation on small things', '편관': 'small illnesses, injuries, too much tension', '정관': 'over-watchfulness and the pressure to do well', '편인': 'loneliness, picky eating, struggling alone', '정인': 'too much dependence, a habit of not doing things themselves' },
  PAL_KID: { year: 'the family elders and surroundings', month: 'parents and the family\'s circumstances', day: 'home and daily rhythm', hour: 'siblings and peers' },
  PSHORT: { year: 'family · seniors', month: 'work · parents', day: 'self · partner', hour: 'children · future' },
  GROUP_PLAIN: ['allies and rivals', 'expression and talent', 'money and chances', 'responsibility and work', 'study and help'],
  SS_PLAIN: { '천을귀인': 'luck with helpers', '도화': 'charm and popularity', '역마': 'movement and change', '화개': 'absorption and art', '양인': 'strong drive', '문창귀인': 'study and writing', '공망': 'an empty seat', '괴강': 'strong momentum', '백호': 'forceful energy' }
};
