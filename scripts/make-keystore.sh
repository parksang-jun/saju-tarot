#!/bin/sh
# 구글플레이 업로드 키를 만든다. 한 번만 실행하고, 만들어진 .jks 파일과 비밀번호를 안전한 곳에 백업한다.
set -e
cd "$(dirname "$0")/../android"
[ -f upload-keystore.jks ] && { echo "이미 upload-keystore.jks 가 있습니다."; exit 1; }
keytool -genkeypair -v -keystore upload-keystore.jks -alias upload -keyalg RSA -keysize 2048 -validity 10000
echo "완료: android/upload-keystore.jks. 이제 keystore.properties.example 을 keystore.properties 로 복사해 비밀번호를 채우세요."
