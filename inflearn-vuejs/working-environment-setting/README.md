# 실무 환경을 위한 프로젝트 설정

## API 설정 공통화

1. `src/api/index.js` 코드 수정

   ```js
   import axios from 'axios';
   
   // axios 를 baseURL을 잡아주고 인스턴스화 한다.
   const instance = axios.create({
     baseURL: 'http://localhost:3000/',
   });
   
   function registerUser(userData) {
     // instance에서 post를 호출하여 회원가입 URL과 데이터를 파라미터로 넘긴다.
     return instance.post('signup', userData);
   }
   
   export { registerUser };
   ```

<br>

## env 파일과 설정 방법

1. root에 `.env` 파일 생성 (환경 변수 파일)

2. 파일에 변수를 작성한다.

   ```properties
   VUE_APP_API_URL=http://localhost:3000/
   ```

3. `src/api/index.js` 코드를 수정한다.

   ```js
   import axios from 'axios';
   
   const instance = axios.create({
     // 환경 변수에서 값을 가져옴.
     baseURL: process.env.VUE_APP_API_URL,
   });
   
   function registerUser(userData) {
     return instance.post('signup', userData);
   }
   
   export { registerUser };
   ```

<br>

## Vue CLI의 env 파일 규칙과 실무 환경 구성 방법

* **/.env** : 아무 .env가 존재하지 않을 때 실행

  ```properties
  VUE_APP_API_URL=http://vue-til.com/
  ```

* **/.env.development** : 로컬에서 서버를 실행시킬 때 실행

  ```properties
  VUE_APP_API_URL=http://localhost:3000/
  ```

* **/.env.production** : 배포할 때 실행

  ```properties
  VUE_APP_API_URL=https://vue-til.com/
  ```