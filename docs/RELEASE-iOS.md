# 애플 앱스토어 출시 절차

iOS 프로젝트(`ios/`)는 리눅스에서 틀만 만든 상태다. Xcode 빌드, 시뮬레이터, 실제 기기에서는 한 번도 돌려 보지 않았다.

## 맥에서 처음 한 번

```bash
git clone https://github.com/parksang-jun/saju-tarot.git && cd saju-tarot
npm install
npm run ios        # 빌드, ios 폴더에 반영, Xcode 열기
```

Xcode에서
- [ ] App 타깃 > Signing & Capabilities > Team 선택 (자동 서명)
- [ ] Bundle Identifier `com.parksangjun.sajutarot` 확인. App Store Connect에 올린 뒤에는 바꿀 수 없다
- [ ] In-App Purchase capability 추가
- [ ] 시뮬레이터와 실제 아이폰에서 실행: 탭 다섯 개, 관상의 "지금 찍기"(카메라 권한 안내가 뜨는지)와 "사진 고르기", 상단 상태바 여백

## 이미 넣어 둔 설정

- 아이폰 전용(아이패드 제외), 세로 고정, 최소 iOS 15
- 카메라·사진 사용 설명(`Info.plist`): 관상 사진은 기기 안에서만 분석한다는 문구
- 수출 규정 암호화 선언: 해당 없음(`ITSAppUsesNonExemptEncryption = false`)
- 앱 아이콘 1024와 스플래시(등불)
- "열람 코드" 버튼은 iOS에서 숨김

## App Store Connect

- [ ] 새 앱: 이름 등불사주, 기본 언어 한국어, 번들 ID 위와 동일, SKU 임의
- [ ] 인앱 구입 > 소모성 `reading_1000` (1,000원 등급), 심사용 스크린샷 첨부
- [ ] RevenueCat에 iOS 앱 추가, App Store Connect 공유 암호/키 연결, 공개 키를 `src/pay.js`의 `iosKey`에 입력
- [ ] 앱 개인정보: 구매 내역, 기기 ID(앱 기능 목적, 추적 안 함). 생년월일과 얼굴 사진은 수집 안 함
- [ ] 연령 등급 설문, 카테고리 라이프스타일
- [ ] 개인정보처리방침 URL: https://parksang-jun.github.io/deungbul/privacy.html
- [ ] 스크린샷: 6.9인치(1320x2868 등 애플 규격)로 다시 만들어야 한다. `store/screenshots`는 안드로이드용 1080x1920이라 그대로 못 쓴다
- [ ] 심사 메모: 사주와 관상을 겹쳐 읽는 점, 얼굴 측정을 기기 안에서만 하는 점, 유료 기능은 샌드박스 결제로 확인 가능하다는 점

## 위험

- 심사 지침 4.3(b): 운세 앱은 포화 카테고리라 반려될 수 있다. 싹싹 클린과 같은 계정이니 반려되면 같은 빌드를 반복 제출하지 않는다.
- 얼굴 사진을 다루므로 심사에서 개인정보 처리 방식을 물을 수 있다. 답은 "기기 안에서만 처리, 저장·전송 없음".
