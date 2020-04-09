# 토큰을 이용한 API 인증 처리

## 학습 노트 조회 API를 호출하는 방법과 확인 사항

1. http://localhost:3000/api/docs/ 에서 `/login` 을 누르고 존재하는 아이디와 비밀번호를 입력하고 요청한 뒤, 응답으로 온 토큰 값을 복사한다.
2. API 문서의 맨 위의 오른쪽에 `Authorize` 를 클릭한다.
3. value에 복사한 값을 넣고 `Authorize` 버튼을 클릭한다.
4. 그 후 `/posts` 를 클릭한다.
5. `200` 코드가 반환되어 성공적으로 GET 요청이 완료된 것을 확인할 수 있다.

<br>

## 로그인 토큰 값 확인

1. `src/components/LoginForm.vue` 에서 토큰을 출력하는 코드 추가

   ```vue
   ...
   
   <script>
   import { loginUser } from '@/api/index';
   import { validateEmail } from '@/utils/validation';
   
   export default {
     data() {
       return {
         // form values
         username: '',
         password: '',
         // log
         logMessage: '',
       };
     },
     computed: {
       isUsernameValid() {
         return validateEmail(this.username);
       },
     },
     methods: {
       async submitForm() {
         try {
           // 비즈니스 로직
           const userData = {
             username: this.username,
             password: this.password,
           };
           const { data } = await loginUser(userData);
           console.log(data.token);	// 회원 토근 출력
           ...
     },
   };
   </script>
   
   ...
   ```

<br>

## HTTP 헤더에 토큰 값을 실는 방법

* `src/api/index.js` 에서 `axios.create()` 에 `headers` 을 추가하고, 그 안에 `Autorization` 속성을 추가

  ```js
  import axios from 'axios';
  
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Authorization: 'test1234',
    },
  });
  ...
  ```

<br>

## 스토어를 이용한 토큰 저장 및 활용

1. `src/store/index.js` 에 토큰 코드 추가

   ```js
   import Vue from 'vue';
   import Vuex from 'vuex';
   
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     state: {
       username: '',
       token: '', // 토큰 추가
     },
     ...
     mutations: {
       ...
       // 토큰을 설정하는 메서드 추가
       setToken(state, token) {
         state.token = token;
       },
     },
   });
   ```

2. `src/components/LoginForm.vue` 에 `setToken()` 메서드를 호출하는 코드 추가

   ```vue
   ...
   <script>
   import { loginUser } from '@/api/index';
   import { validateEmail } from '@/utils/validation';
   
   export default {
     ...
     methods: {
       async submitForm() {
         try {
           ...
           // setToken() 메서드를 호출
           this.$store.commit('setToken', data.token);
           this.$store.commit('setUsername', data.user.username);
           this.$router.push('/main');
         } catch (error) {
           console.log(error.response.data);
           this.logMessage = error.response.data;
         } finally {
           this.initForm();
         }
       },
       initForm() {
         this.username = '';
         this.password = '';
       },
     },
   };
   </script>
   ...
   ```

3. `src/api/index.js` 에서 `headers` 의 `Authorization` 값 변경

   ```js
   import axios from 'axios';
   import store from '../store';
   
   const instance = axios.create({
     baseURL: process.env.VUE_APP_API_URL,
     headers: {
       // store로부터 토큰을 가져옴
       Authorization: store.state.token,
     },
   });
   
   ...
   ```

<br>

## 저장된 토큰 값을 이용한 API 요청 및 의도치 않은 동작 확인

1. `src/api/index.js` 에서 `store` 를 `import` 하는 부분을 변경

   ```js
   import axios from 'axios';
   import store from '@/store/index';	// @를 사용하여 접근
   ```

2. 로그인을 실행한 다음에 개발자 도구의 Network 부분을 보면 login 요청의 Header에 `Authorization` 이 비어 있는 것을 확인할 수 있다.

<br>

## 문제가 되는 동작 분석 및 해결 방향 안내

현재는 API 함수를 사용하기 전에 `Authorization` 이 `store.state.token` 을 저장했기 때문에 비어 있는 것이다.

* **해결책**
  * 인터셉터를 활용한다.

<br>

## 액시오스 인터셉터 소개

* **인터셉터(Interceptors)** : 요청이나 반환을 처리하기 전에 미리 처리

  ```js
  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  
  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  ```

<br>

## 액시오스 인터셉터 모듈화 및 인스턴스에 연결하는 방법

1. `api/common/interceptors.js` 를 생성하고 코드를 작성한다.

   ```js
   export function setInterceptors(instance) {
     // Add a request interceptor
     instance.interceptors.request.use(
       function(config) {
         // Do something before request is sent
         return config;
       },
       function(error) {
         // Do something with request error
         return Promise.reject(error);
       },
     );
   
     // Add a response interceptor
     instance.interceptors.response.use(
       function(response) {
         // Any status code that lie within the range of 2xx cause this function to trigger
         // Do something with response data
         return response;
       },
       function(error) {
         // Any status codes that falls outside the range of 2xx cause this function to trigger
         // Do something with response error
         return Promise.reject(error);
       },
     );
     return instance;
   }
   ```

   * `instance` 매개변수를 받아서 액시오스 문서로부터 가져온 코드에서 `axios` 를 `instance` 로 변경하고 `export function setInterceptors(instance)` 로 함수를 생성하고 그 안에 문서에 있는 코드를 삽입한다.

2. `src/api/index.js` 에서 코드를 수정한다.

   ```js
   import axios from 'axios';
   import store from '@/store/index';
   import { setInterceptors } from './common/interceptors';
   
   function createInstance() {
     const instance = axios.create({
       baseURL: process.env.VUE_APP_API_URL,
       headers: {
         Authorization: store.state.token,
       },
     });
     return setInterceptors(instance);
   }
   
   const instance = createInstance();
   
   function registerUser(userData) {
     return instance.post('signup', userData);
   }
   
   function loginUser(userData) {
     return instance.post('login', userData);
   }
   
   export { registerUser, loginUser };
   ```

   * `import { setInterceptors } from './common/interceptors'` 를 추가하여 인터셉터 메서드를 import 한다.
   * 이전의 axios를 만들어 저장한 instance를 `setInterceptors()` 메서드의 매개변수로 넘긴 후 반환 값을 반환하는 함수를 만든다.
   * 만든 함수를 호출하여 instance에 새롭게 저장한다.

<br>

## 인터셉터를 이용한 HTTP 헤더 설정

`src/api/common/interceptors.js` 에 `Authorization` 에 `token` 값을 저장하는 코드를 추가한다.

```js
import store from '@/store/index';

export function setInterceptors(instance) {
  // Add a request interceptor
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      config.headers.Authorization = store.state.token;
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );
  ...
```