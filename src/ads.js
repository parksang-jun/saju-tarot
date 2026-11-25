/* ===== 보상형 광고(AdMob): 오늘의 운세와 타로 오늘의 카드는 광고를 한 번 보면 그날 하루 열린다 =====
   사주를 연(결제한) 사람은 광고 없이 본다. 웹 미리보기에는 광고가 없어 바로 열린다. */
const ADS_CONFIG = {
  // Android: AdMob에서 만든 실제 보상형 광고 단위(등불사주 "오늘의 운세"). 앱 ID는 android/app/src/main/res/values/strings.xml 의 admob_app_id.
  androidRewarded: 'ca-app-pub-5724346706486152/6660428955',
  // iOS: 아직 AdMob에 iOS 앱을 만들지 않아 구글의 데모 광고 단위를 쓴다. 앱 ID는 ios/App/App/Info.plist 의 GADApplicationIdentifier(데모 값).
  iosRewarded: 'ca-app-pub-3940256099942544/1712485313',
  testingIos: true
};
const TIER = { free: '<span class="tier free">무료</span>', ad: '<span class="tier ad">광고 보고 보기</span>', paid: '<span class="tier paid">유료 ' + PAY_CONFIG.priceLabel + '</span>' };
const Ads = {
  ok: false, busy: false, msg: '',
  testing() { return window.Capacitor.getPlatform() === 'ios' && ADS_CONFIG.testingIos; },
  async init() { if (!NATIVE || !window.CapAdMob) return; try { await window.CapAdMob.initialize({ initializeForTesting: this.testing() }); this.ok = true; } catch (e) {} },
  unlocked(kind) { return !!S.premium || store.get('mw-ad-' + kind) === todayStr(); },
  grant(kind) { store.set('mw-ad-' + kind, todayStr()); },
  /* 광고를 끝까지 보면 true, 중간에 닫으면 false. 광고를 불러오지 못하면 사용자를 막지 않고 연다. */
  async watch(kind) {
    this.msg = '';
    if (this.unlocked(kind)) return true;
    if (this.busy) return false;
    if (!NATIVE || !this.ok) { this.grant(kind); if (!NATIVE) this.msg = '미리보기에서는 광고 없이 열립니다. 앱에서는 광고가 먼저 나옵니다.'; return true; }
    this.busy = true;
    const A = window.CapAdMob, subs = []; let rewarded = false;
    const on = (ev, fn) => A.addListener(ev, fn).then(h => subs.push(h));
    const result = await new Promise(async res => {
      const timer = setTimeout(() => res('fail'), 20000), end = v => { clearTimeout(timer); res(v); };
      try {
        await on('onRewardedVideoAdReward', () => { rewarded = true; });
        await on('onRewardedVideoAdDismissed', () => end(rewarded ? 'ok' : 'closed'));
        await on('onRewardedVideoAdFailedToLoad', () => end('fail'));
        await on('onRewardedVideoAdFailedToShow', () => end('fail'));
        await A.prepareRewardVideoAd({ adId: window.Capacitor.getPlatform() === 'ios' ? ADS_CONFIG.iosRewarded : ADS_CONFIG.androidRewarded, isTesting: this.testing() });
        clearTimeout(timer);   // 광고가 준비됐으면 시간 제한을 풀고 닫힐 때까지 기다린다
        await A.showRewardVideoAd();
      } catch (e) { end('fail'); }
    });
    subs.forEach(h => { try { h.remove(); } catch (e) {} });
    this.busy = false;
    if (result === 'closed') { this.msg = '광고를 끝까지 봐야 열립니다. 다시 눌러 주세요.'; return false; }
    if (result === 'fail') this.msg = '지금은 광고를 불러올 수 없어 바로 열었습니다.';
    this.grant(kind); return true;
  }
};
