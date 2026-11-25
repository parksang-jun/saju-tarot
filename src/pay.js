/* ===== 결제: 사주 한 명, 궁합 한 쌍을 열 때마다 한 번 결제(소모성 인앱 상품) =====
   앱에서는 스토어 인앱결제(RevenueCat), 웹 미리보기에서는 테스트 모드. */
const PAY_CONFIG = {
  androidKey: 'REPLACE_WITH_REVENUECAT_ANDROID_PUBLIC_KEY',   // RevenueCat > Project > API keys > Google Play
  iosKey: 'REPLACE_WITH_REVENUECAT_IOS_PUBLIC_KEY',
  productId: 'reading_1000',                                  // 플레이 콘솔의 소모성 인앱 상품 ID(내부 이름. 가격은 990원으로 등록한다)
  priceLabel: '990원',                                      // 스토어 가격을 못 불러왔을 때와 웹 미리보기에서 쓰는 표시
  termsUrl: 'https://parksang-jun.github.io/deungbul/terms.html',                      // 출시 전 실제 주소로 교체
  privacyUrl: 'https://parksang-jun.github.io/deungbul/privacy.html',
  reviewHash: '85d166ec3e32d01143550c4cbdb5c5c2845811751f675361905c9a30c18cfea5'   // 스토어 검토용 열람 코드의 SHA-256. 코드 자체는 저장소에 두지 않는다. 바꾸려면: printf '%s' '새코드' | shasum -a 256
};
const NATIVE = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
const RC = NATIVE ? window.RCPurchases : null;

/* 열람 기록: 결제한 사주와 궁합의 열쇠를 기기에 저장한다. 전체 초기화로는 지워지지 않는다. */
const profileKey = u => [u.cal, u.y, u.m, u.d, u.gender].join('-');   // 태어난 시는 열쇠에 넣지 않는다: 시를 고쳐도 다시 결제하지 않게
const pairKey = () => [profileKey(S.user), profileKey(S.partner)].sort().join('|');
const Access = {
  list: store.get('mw-unlocked') || [],
  has(k) { return Access.list.includes(k); },
  add(k) { if (!Access.has(k)) { Access.list.push(k); store.set('mw-unlocked', Access.list); } },
  refresh() { const all = store.get('mw-review') === true; S.premium = all || Access.has('s:' + profileKey(S.user)); S.matchOpen = all || Access.has('m:' + pairKey()); }
};
const Pay = {
  pkg: null, state: NATIVE ? 'loading' : 'demo',
  price() { return Pay.pkg ? Pay.pkg.product.priceString : PAY_CONFIG.priceLabel; },
  async init() {
    if (!RC) return;
    try {
      const key = window.Capacitor.getPlatform() === 'ios' ? PAY_CONFIG.iosKey : PAY_CONFIG.androidKey;
      if (key.indexOf('REPLACE_') === 0) { Pay.state = 'nokey'; return; }
      await RC.configure({ apiKey: key });
      const off = await RC.getOfferings(), all = (off && off.current && off.current.availablePackages) || [];
      Pay.pkg = all.find(p => p.product.identifier === PAY_CONFIG.productId) || all[0] || null;
      Pay.state = Pay.pkg ? 'ready' : 'empty';
    } catch (e) { Pay.state = 'error'; }
    /* 스토어 가격이 표시 가격과 다르면(아이폰 등) 화면의 가격을 스토어 값으로 맞춘다 */
    if (Pay.pkg && Pay.price() !== PAY_CONFIG.priceLabel) { document.querySelectorAll('.pp').forEach(e => { e.textContent = Pay.price(); }); renderAll(); }
    if ($('pay').open) renderPlans();
  }
};
function payTarget() {
  const u = S.user, who = x => esc(x.name || '이름 없음') + ' · ' + (x.cal === 'solar' ? '양력 ' : x.cal === 'leap' ? '음력 윤달 ' : '음력 ') + x.y + '.' + x.m + '.' + x.d + ' ' + (siOf(x) < 0 ? '시 모름' : SI_NAME[siOf(x)]) + ' · ' + (x.gender === 'M' ? '남' : '여');
  return S.payKind === 'match'
    ? { key: 'm:' + pairKey(), title: '이 궁합 열기', desc: who(u) + '<br>' + who(S.partner), blocked: u.example || S.partner.example, why: '예시 데이터로는 결제할 수 없습니다. 내 정보와 상대 정보를 먼저 입력하세요.' }
    : { key: 's:' + profileKey(u), title: '이 사주 열기', desc: who(u), blocked: u.example, why: '예시 데이터로는 결제할 수 없습니다. 내 정보를 먼저 입력하세요.' };
}
function renderPlans() {
  const t = payTarget(), go = $('payGo'), msg = { loading: '스토어에서 가격을 불러오는 중입니다.', nokey: '결제 설정이 아직 끝나지 않은 빌드입니다.', empty: '판매 중인 상품이 없습니다. 잠시 뒤 다시 열어 주세요.', error: '스토어에 연결하지 못했습니다. 인터넷 연결을 확인하고 다시 열어 주세요.' }[Pay.state];
  $('payTitle').textContent = t.title;
  $('payPerk').hidden = S.payKind === 'match'; $('payPerkMatch').hidden = S.payKind !== 'match';
  $('plans').innerHTML = '<div class="plan on"><span>' + (S.payKind === 'match' ? '궁합 1쌍' : '사주 1명') + '<small>' + t.desc + '</small></span><span class="pr">' + esc(Pay.price()) + '</span></div>';
  $('payDemo').hidden = NATIVE; $('payNote').hidden = false;
  if (NATIVE && (t.blocked || msg)) { go.hidden = true; $('payMsg').textContent = t.blocked ? t.why : msg; return; }
  go.hidden = false; go.textContent = NATIVE ? Pay.price() + ' 결제하고 열기' : '테스트 결제로 열기';
}
function openPay(kind) { S.payKind = kind === 'match' ? 'match' : 'saju'; $('payMsg').textContent = ''; renderPlans(); const d = $('pay'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); }
$('payGo').onclick = async () => {
  const t = payTarget(), go = $('payGo'), done = () => { Access.add(t.key); $('pay').close(); renderAll(); fx.burst($('editBtn'), 90); };
  if (!NATIVE) return done();
  go.disabled = true; $('payMsg').textContent = '';
  try { await RC.purchasePackage({ aPackage: Pay.pkg }); done(); }
  catch (e) { if (!(e && (e.userCancelled || e.code === '1' || e.code === 1))) $('payMsg').textContent = '결제를 마치지 못했습니다. 결제 수단을 확인하고 다시 시도해 주세요.'; }
  go.disabled = false;
};
$('payTerms').href = PAY_CONFIG.termsUrl; $('payPrivacy').href = PAY_CONFIG.privacyUrl;

/* ===== 열람 코드: 스토어 검토자가 결제 없이 유료 풀이를 볼 수 있게 한다 ===== */
async function sha256Hex(t) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)); return Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''); }
$('codeBtn').onclick = () => { $('codeMsg').textContent = ''; $('codeIn').value = ''; const d = $('codeDlg'); if (d.showModal) d.showModal(); else d.setAttribute('open', ''); };
$('codeCancel').onclick = () => $('codeDlg').close();
$('codeForm').addEventListener('submit', async e => {
  e.preventDefault();
  let ok = false; try { ok = await sha256Hex($('codeIn').value.trim().toUpperCase()) === PAY_CONFIG.reviewHash; } catch (err) {}
  if (!ok) { $('codeMsg').textContent = '코드가 맞지 않습니다.'; return; }
  store.set('mw-review', true); $('codeDlg').close(); renderAll(); fx.burst($('editBtn'), 90);
});
/* iOS에서는 열람 코드를 쓰지 않는다: 애플 심사는 샌드박스 결제로 유료 기능을 확인한다 */
if (NATIVE && window.Capacitor.getPlatform() === 'ios') $('codeBtn').hidden = true;
