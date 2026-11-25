# 애플 앱스토어 출시 절차

iOS 프로젝트(`ios/`)는 GitHub Actions의 "iOS build check"에서 시뮬레이터용으로 컴파일되는 것까지만 확인한다. 실제 아이폰 실행, 카메라, 결제, 광고는 맥에서 확인해야 한다.

붙여 넣을 문구는 `store-listing-ios.md`, 스크린샷은 `store/ios-screenshots`.

## 1. 맥에서 프로젝트 받기

```bash
cd ~ && git clone https://github.com/parksang-jun/saju-tarot.git && cd saju-tarot
npm install
npm run ios        # 빌드, ios 폴더에 반영, Xcode 열기
```

Node가 없으면 먼저 `brew install node`. 나중에 새 버전을 받을 때는 `cd ~/saju-tarot && git pull && npm install && npm run ios`.

## 2. Xcode

- [ ] 왼쪽 맨 위 App > TARGETS App > Signing & Capabilities > Team 선택(Automatically manage signing 켠 채로)
- [ ] 같은 화면 + Capability > In-App Purchase 추가
- [ ] 위쪽 기기 선택에서 내 아이폰을 고르고 ▶ 실행. 확인할 것: 탭 다섯 개, 관상 "지금 찍기"(카메라 권한 창), "사진 고르기", 상단 상태바와 겹치지 않는지, "오늘의 운세 보기"에서 테스트 광고가 뜨는지
- [ ] 기기 선택을 Any iOS Device (arm64)로 바꾸고 Product > Archive
- [ ] Organizer 창 > Distribute App > App Store Connect > Upload

## 3. App Store Connect

- [ ] 앱 > + > 새로운 앱: 플랫폼 iOS, 이름 등불사주, 기본 언어 한국어, 번들 ID `com.parksangjun.sajutarot`, SKU `deungbul-saju-001`. 번들 ID가 목록에 없으면 Xcode에서 한 번 실행한 뒤 다시 본다
- [ ] 수익화 > 앱 내 구입 > 소모품 `reading_1000` 만들기, 가격과 현지화, 심사용 스크린샷
- [ ] 계약 > 유료 앱 계약이 "활성"인지 확인(싹싹 클린이 무료 앱이면 아직 안 되어 있을 수 있다). 은행, 세금 정보가 없으면 인앱 구입이 동작하지 않는다
- [ ] 앱 개인정보, 연령 등급, 가격 및 사용 가능 여부(대한민국)
- [ ] 버전 페이지: 스크린샷 8장, 홍보 문구, 설명, 키워드, 지원 URL, 빌드 선택, 앱 내 구입 연결, 심사 메모
- [ ] 심사에 추가 > 제출

## 4. 제출 전에 받아서 앱에 넣어야 하는 값

| 값 | 어디서 | 넣는 곳 |
|---|---|---|
| RevenueCat iOS 공개 키(`appl_`로 시작) | RevenueCat > 프로젝트 > Apps > + App Store | `src/pay.js`의 `iosKey` |
| AdMob iOS 앱 ID(`~` 포함) | AdMob > 앱 > 앱 추가 > iOS | `ios/App/App/Info.plist`의 `GADApplicationIdentifier` |
| AdMob iOS 보상형 광고 단위 ID(`/` 포함) | 위 앱 > 광고 단위 > 보상형 | `src/ads.js`의 `iosRewarded`, `testingIos`는 `false`로 |

RevenueCat 키가 없으면 결제 창에 "결제 설정이 아직 끝나지 않은 빌드입니다"가 뜨고 결제가 안 된다. 이 상태로 제출하면 반려된다.
AdMob 값이 없으면 구글의 시험 광고가 나온다. 심사는 통과할 수 있지만 수익이 없다.

## 이미 넣어 둔 설정

- 아이폰 전용(아이패드 제외), 세로 고정, 최소 iOS 15, 버전 1.5.1 (7)
- 카메라·사진 사용 설명(`Info.plist`): 관상 사진은 기기 안에서만 분석한다는 문구
- 수출 규정 암호화 선언: 해당 없음(`ITSAppUsesNonExemptEncryption = false`)
- 앱 아이콘 1024와 스플래시(등불)
- "열람 코드" 버튼은 iOS에서 숨김
- 가격 표시는 스토어에 등록한 실제 가격을 받아서 쓴다(990원이 아니어도 맞게 나온다)
- 추적 허용 창(ATT)은 띄우지 않는다. 광고는 개인 맞춤 없이 나온다

## 위험

- 심사 지침 4.3(b): 운세 앱은 포화 카테고리라 반려될 수 있다. 싹싹 클린과 같은 계정이니 반려되면 같은 빌드를 반복 제출하지 않는다. 심사 메모에서 관상을 사주와 겹쳐 읽는 점을 앞세운다
- 얼굴 사진을 다루므로 심사에서 개인정보 처리 방식을 물을 수 있다. 답은 "기기 안에서만 처리, 저장·전송 없음, 식별 안 함"
- 관상 모델(약 7MB)을 처음 불러올 때 구형 아이폰에서 몇 초 걸릴 수 있다. 진행 표시가 나온다
