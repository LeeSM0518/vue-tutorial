# 로그인 상태 관리와 스토어

## 메인 페이지 라우팅 구현 및 확인

1. `src/views/MainPage.vue` 파일 추가

   ```vue
   <template>
     <div>
       <h1>Main</h1>
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

2. `src/routes/validation.js` 에 코드 추가

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   // import LoginPage from '@/views/LoginPage.vue';
   // import SignupPage from '@/views/SignupPage.vue';
   
   Vue.use(VueRouter);
   
   export default new VueRouter({
     mode: 'history',
     routes: [
       {
         path: '/',
         redirect: '/login',
       },
       {
         path: '/login',
         component: () => import('@/views/LoginPage.vue'),
       },
       {
         path: '/signup',
         component: () => import('@/views/SignupPage.vue'),
       },
       // 메인 path 추가
       {
         path: '/main',
         component: () => import('@/views/MainPage.vue'),
       },
       {
         path: '*',
         component: () => import('@/views/NotFoundPage.vue'),
       },
     ],
   });
   ```

<br>

## 자바스크립트로 페이지 이동하기 구현 및 설명

[뷰 라우터 Programmatic Navigation 문서](https://router.vuejs.org/guide/essentials/navigation.html#programmatic-navigation)

* **router.push(location, onComplete?, onAbort?)**
  * 경로 이동

* `src/components/LoginForm.vue` 코드 수정

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
          // 비즈니스 로직
          const userData = {
            username: this.username,
            password: this.password,
          };
          const { data } = await loginUser(userData);
          console.log(data.user.username);
          // router 코드 추가 (경로 이동)
          this.$router.push('/main');
          ...
  ```

<br>

## 뷰엑스 설치 및 연결

1. `npm i vuex` 로 뷰엑스 설치

2. `src/store/index.js` 폴더 및 파일 추가 및 코드 작성

   ```js
   import Vue from 'vue';
   import Vuex from 'vuex';
   
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     state: {
       username: '',
     },
   });
   ```

3. `src/main.js` 코드 수정

   ```js
   import Vue from 'vue';
   import App from './App.vue';
   import router from '@/routes/index';
   import store from '@/store/index';
   
   Vue.config.productionTip = false;
   
   new Vue({
     render: h => h(App),
     router,
     store,
   }).$mount('#app');
   ```

<br>

## 로그인 아이디 헤더에 표시하기

1. `src/store/index.js` 에 mutations 속성 추가

   ```js
   import Vue from 'vue';
   import Vuex from 'vuex';
   
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     state: {
       username: '',
     },
     // mutations 추가 
     mutations: {
       setUsername(state, username) {
         state.username = username;
       },
     },
   });
   ```

2. `src/components/common/AppHeader.vue` 에 코드 추가

   ```vue
   <template>
     <header>
       <div>
         <router-link to="/" class="logo">
           TIL
         </router-link>
       </div>
       <div class="navigations">
         <span>{{ $store.state.username }}</span>
         <router-link to="/login">로그인</router-link>
         <router-link to="/signup">회원가입</router-link>
       </div>
     </header>
   </template>
   
   ...
   ```

<br>

## 로그인 했을 때의 헤더 버튼 보기 처리

1. `src/store/index.js` 에 `getters` 속성 추가

   ```js
   import Vue from 'vue';
   import Vuex from 'vuex';
   
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     state: {
       username: '',
     },
     // 스테이트 값이 변경됬을 때
     getters: {
       isLogin(state) {
         return state.username !== '';
       },
     },
     mutations: {
       setUsername(state, username) {
         state.username = username;
       },
     },
   });
   ```

2. `src/components/common/AppHeader.vue` 코드 수정

   ```vue
   <template>
     <header>
       ...
       <div class="navigations">
         <!-- 로그인 되었을 시 -->
         <template v-if="isUserLogin">
           <span class="username">{{ $store.state.username }}</span>
         </template>
   			<!-- 로그인이 안됬을 시 -->
         <template v-else>
           <router-link to="/login">로그인</router-link>
           <router-link to="/signup">회원가입</router-link>
         </template>
       </div>
     </header>
   </template>
   
   <script>
   export default {
     // 속성 추가
     computed: {
       isUserLogin() {
         return this.$store.getters.isLogin;
       },
     },
   };
   </script>
   
   <style scoped>
   /* 스타일 추가 */
   .username {
     color: white;
   }
   ...
   </style>
   ```

<br>

## 로그 아웃 기능 구현

1. `src/store/index.js` 에 `clearUsername()` 메서드 추가

   ```js
   import Vue from 'vue';
   import Vuex from 'vuex';
   
   Vue.use(Vuex);
   
   export default new Vuex.Store({
     state: {
       username: '',
     },
     // 스테이트 값이 변경됬을 때
     getters: {
       isLogin(state) {
         return state.username !== '';
       },
     },
     mutations: {
       setUsername(state, username) {
         state.username = username;
       },
       clearUsername(state) {
         state.username = '';
       },
     },
   });
   ```

2. `src/components/common/AppHeader.vue` 에 a 태그 추가

   ```vue
   <template>
     <header>
       <div>
         <router-link to="/" class="logo">
           TIL
         </router-link>
       </div>
       <div class="navigations">
         <template v-if="isUserLogin">
           <span class="username">{{ $store.state.username }}</span>
           <!-- a 태그 추가 -->
           <a href="javascript:;" @click="logoutUser">Logout</a>
         </template>
         <template v-else>
           <router-link to="/login">로그인</router-link>
           <router-link to="/signup">회원가입</router-link>
         </template>
       </div>
     </header>
   </template>
   
   <script>
   export default {
     ...
     methods: {
       logoutUser() {
         // store의 clearUsername 호출 및 /login 경로로 이동
         this.$store.commit('clearUsername');
         this.$router.push('/login');
       },
     },
   };
   </script>
   
   ...
   ```