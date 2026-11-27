// 스토어 결제(RevenueCat) 플러그인을 앱 스크립트에서 쓸 수 있게 전역으로 노출한다.
import { Purchases } from '@revenuecat/purchases-capacitor';
import { SystemBars } from '@capacitor/core';
import { AdMob } from '@capacitor-community/admob';
window.RCPurchases = Purchases;
window.CapSystemBars = SystemBars;
window.CapAdMob = AdMob;
import { Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
window.CapFilesystem = Filesystem;   // 풀이 문서(PDF)를 기기에 쓰고
window.CapShare = Share;             // 공유 창으로 저장하거나 보낸다   // 보상형 광고
