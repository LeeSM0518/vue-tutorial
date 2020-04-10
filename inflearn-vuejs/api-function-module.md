# API 함수 모듈화

## 인스턴스 생성 함수 분할

`src/api/index.js` 코드 수정

```js
import axios from 'axios';
import { setInterceptors } from './common/interceptors';

function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}

function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

const instance = createInstance();
const posts = createInstanceWithAuth('posts');
...
```

<br>

## 계정 관련 API 분활 및 실습 안내

1. `src/api/auth.js` 파일 생성 후 편집

   ```js
   // 로그인, 회원 가입, 회월 탈퇴 API 관리
   import { instance } from './index';
   
   // 회원가입 API
   function registerUser(userData) {
     return instance.post('signup', userData);
   }
   
   // 로그인 API
   function loginUser(userData) {
     return instance.post('login', userData);
   }
   
   export { registerUser, loginUser };
   ```

2. `src/api/index.js` 편집

   ```js
   import axios from 'axios';
   import { setInterceptors } from './common/interceptors';
   
   function createInstance() {
     return axios.create({
       baseURL: process.env.VUE_APP_API_URL,
     });
   }
   
   // 액시오스 초기화 함수
   function createInstanceWithAuth(url) {
     const instance = axios.create({
       baseURL: `${process.env.VUE_APP_API_URL}${url}`,
     });
     return setInterceptors(instance);
   }
   
   export const instance = createInstance();
   const posts = createInstanceWithAuth('posts');
   ...
   ```

<br>

## [실습 답안] API 함수 모듈화 정리

1. `src/api/posts.js` 생성 후 편집

   ```js
   // 학습 노트 조작과 관련된 CRUD API 함수 파일
   import { posts } from './index';
   
   // 학습 노트 데이터를 조회하는 API
   function fetchPosts() {
     return posts.get('/');
   }
   
   // 학습 노트 데이터를 생성하는 API
   function createPost(postData) {
     return posts.post('/', postData);
   }
   
   export { fetchPosts, createPost };
   ```

2. 이전의 `@/api/index` 로 import 하던 부분들을 auth와 posts로 변경