# 등불사주

명리학(사주)과 타로를 함께 보는 앱. 사주 원국, 10년 단위 운과 연도별 운세, 궁합, 타로, 통합 리딩을 제공한다.

## 구조

| 경로 | 내용 |
| --- | --- |
| `src/head.html` | 화면 뼈대와 스타일 |
| `src/engine.js` | 명리 계산(절기, 음력 변환, 사주 네 기둥, 신강·신약, 대운) |
| `src/app.js` | 풀이 문구, 타로 덱, 화면 전환 |
| `src/deep.js` | 십이운성, 신살, 합충, 나이대별 풀이, 사주 탭 |
| `src/match.js` | 성격유형, 궁합 |
| `src/face.js`, `src/face.css` | 관상: 정면 사진의 얼굴 비율 측정, 오행형·삼정·오관·십이궁·나이의 자리 풀이, 사주와 겹쳐 읽기 |
| `src/vendor/` | 얼굴 인식 엔진(@vladmandic/face-api, MIT)과 모델. 빌드 때 `dist/`로 복사되고 관상 탭에서 처음 쓸 때만 불러온다 |
| `src/pay.js` | 결제(앱: RevenueCat 인앱결제, 웹: 테스트 모드) |
| `src/ui2.js` | 점수, 인생 그래프, 입력 폼, 연도 선택, 안내, 초기화 |
| `scripts/build.mjs` | 위 파일을 `dist/index.html` 하나로 합침 |
| `android/` | Capacitor 안드로이드 프로젝트 |
| `docs/` | 출시 절차, 스토어 등록정보, 개인정보처리방침·이용약관 초안 |
| `store/` | 스토어용 아이콘, 그래픽 이미지, 스크린샷 |
| `.github/workflows/` | 서명된 AAB를 만드는 빌드 워크플로 |

Vite를 쓰지 않는다. 스크립트가 전역 변수를 공유하는 단일 페이지라서 번들러 대신 파일을 순서대로 이어 붙인다. 결제 플러그인만 esbuild로 묶는다.

## 명령

```bash
npm install
npm run dev       # 빌드 후 http://localhost:5173 에서 웹으로 확인(결제는 테스트 모드)
npm run sync      # 빌드 후 android 폴더에 반영
npm run android   # 빌드, 반영 후 Android Studio 열기
npm run aab       # 서명된 출시용 번들(.aab) 만들기
npm run apk       # 기기 테스트용 디버그 APK
```

## 출시 전에 바꿀 값

- `src/pay.js`의 `PAY_CONFIG`: RevenueCat 공개 키, 이용약관·개인정보처리방침 주소
- `capacitor.config.json`의 `appId`, `appName`: 스토어에 처음 올린 뒤에는 `appId`를 바꿀 수 없다
- `android/app/build.gradle`의 `versionCode`, `versionName`: 올릴 때마다 `versionCode`를 1씩 올린다

자세한 순서는 `docs/RELEASE.md`.
