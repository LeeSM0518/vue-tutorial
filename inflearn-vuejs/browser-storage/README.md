# 브라우저 저장소를 이용한 인증 값 관리

## 로그인 인증 값 브라우저 저장소에 저장 후 확인

1. `src/components/LoginForm.vue` 코드 수정

   ```vue
   ...
   
   <script>
   // cookies.js로부터 메소드들 import
   import { saveAuthToCookie, saveUserToCookie } from '@/utils/cookies';
   ...
   
   export default {
     ...
     methods: {
       async submitForm() {
         try {
           // 비즈니스 로직
           const userData = {
             username: this.username,
             password: this.password,
           };
           const { data } = await loginUser(userData);
           console.log(data.token);
           this.$store.commit('setToken', data.token);
           this.$store.commit('setUsername', data.user.username);
           // token 값 쿠키에 저장
           saveAuthToCookie(data.token);
           // 아이디 값 쿠키에 저장
           saveUserToCookie(data.user.username);
           this.$router.push('/main');
         ...
     },
   };
   </script>
   ...
   ```

<br>

## 브라우저 저장소로 인증 값 보존

`src/store/index.js` 에 코드 추가

```js
import Vue from 'vue';
import Vuex from 'vuex';
// cookies에서 메서드들 import
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // username과 token을 일단 쿠키에서 값을 가져온다. 없으면 빈 문자열
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
  },
  ...
```

<br>

## actions 속성을 이용한 로그인 기능 구현과 비동기 처리시 유의할 점

1. `src/store/index.js` 에 `actions` 속성 추가

   ```js
   import Vue from 'vue';
   import Vuex from 'vuex';
   import {
     getAuthFromCookie,
     getUserFromCookie,
     // 메서드 import
     saveAuthToCookie,
     saveUserToCookie,
   } from '@/utils/cookies';
   import { loginUser } from '@/api/index';
   
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     ...
     // actions 추가
     actions: {
       // LOGIN 로직 추가
       async LOGIN({ commit }, userData) {
         const { data } = await loginUser(userData);
         console.log(data.token);
         commit('setToken', data.token);
         commit('setUsername', data.user.username);
         saveAuthToCookie(data.token);
         saveUserToCookie(data.user.username);
         return data;
       },
     },
   });
   ```

2. `src/components/LoginForm.vue` 코드 수정

   ```vue
   ...
   
   <script>
   import { validateEmail } from '@/utils/validation';
   // cookies import 제거 
   
   export default {
     ...
     methods: {
       async submitForm() {
         try {
           const userData = {
             username: this.username,
             password: this.password,
           };
           // userData를 파라미터로 store의 LOGIN 로직 요청 
           await this.$store.dispatch('LOGIN', userData);
           this.$router.push('/main');
           ...
   ```