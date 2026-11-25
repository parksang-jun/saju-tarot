// 스토어 결제(RevenueCat) 플러그인을 앱 스크립트에서 쓸 수 있게 전역으로 노출한다.
import { Purchases } from '@revenuecat/purchases-capacitor';
import { SystemBars } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';
window.RCPurchases = Purchases;
window.CapSystemBars = SystemBars;
window.CapAdMob = AdMob;   // 보상형 광고
