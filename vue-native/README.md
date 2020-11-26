# Vue Native Guide

1. Vue Native CLI 설치

   ```bash
   $ npm install --global vue-native-cli
   ```

2. Expo CLI 설치

   ```bash
   $ npm install --global expo-cli
   ```

3. Vue native 환경 구성

   ```bash
   $ vue-native init attendance-check-app
   ```

4. Android Stdio 세팅

   1. Android Studio 3.0+ 설치

   2. 시스템 설정으로 들어가서 Android SDK의 `SDK Tools` 로 이동한다. 그 후 `Android SDK Build-Tools` 를 설치한다.

      <img src="https://docs.expo.io/static/images/android-studio-build-tools.png">

   3. `Android SDK Location` 을 복사한다.

      <img src="https://docs.expo.io/static/images/android-studio-sdk-location.png">

5. vue-native를 실행시켰을 때 안드로이드 에뮬레이터를 실행시킬 수 있도록 환경 세팅

   1. `~/.bashrc` 에 안드로이드 SDK 경로를 추가한다.

      ```bash
      export ANDROID_SDK=/Users/myuser/Library/Android/sdk.
      export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
      ```

      > zsh 을 사용할 경우 `.zshrc` 에도 추가한다.

6. 안드로이드 스튜디오를 통해 에뮬레이터를 실행시킨다.

   <img src="https://user-images.githubusercontent.com/43431081/84582013-7fd46080-ae21-11ea-9197-2df225cdb5c2.png" alt="image" style="zoom:30%;" />

7. `npm run android` 를 실행

   > DateTimePicker, StatusBar 에 대한 에러가 발생하여서 일단은 그냥 무시하였다.

   <img src="https://user-images.githubusercontent.com/43431081/84582050-e22d6100-ae21-11ea-913a-adf07d4fbee7.png" alt="image" style="zoom:33%;" />