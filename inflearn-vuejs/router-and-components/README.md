# 라우터 & 컴포넌트 설계

## 깃헙 리포지토리 안내 및 클론

1. `git clone git@github.com:joshua1988/vue-til.git` 을 실행
2. `git checkout 1_setup` 실행
3. `npm i` 실행

<br>

## 뷰 라우터 설치 및 연결

1. `npm i vue-router` 를 통해 뷰 라우터 설치

2. `src/routes/index.js` 파일 생성

3. 코드 작성

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   
   // 플러그인 초기화
   Vue.use(VueRouter);
   
   export default new VueRouter();
   ```

4. `main.js` 에서 사용 코드 작성

   ```js
   import Vue from 'vue';
   import App from './App.vue';
   import router from '@/routes/index';
   
   Vue.config.productionTip = false;
   
   new Vue({
     render: h => h(App),
     router,
   }).$mount('#app');
   ```

<br>

## 페이지 컴포넌트 생성 및 연결

1. `index.js` 에 코드 작성

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   import LoginPage from '@/views/LoginPage.vue';
   import SignupPage from '@/views/SignupPage.vue';
   
   // 플러그인 초기화
   Vue.use(VueRouter);
   
   export default new VueRouter({
     // 뷰 라우터로 제어되는 라우팅 정보
     routes: [
     ],
   });
   ```

2. `src/views` 폴더 생성

3. `src/views/LoginPage.vue` 생성

   ```vue
   <template>
     <div>
       login
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

4. `src/views/SignupPage.vue` 생성

   ```vue
   <template>
     <div>
       signup
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

5. `src/routes/index.js` 에서 라우트 정보 추가

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   import LoginPage from '@/views/LoginPage.vue';
   import SignupPage from '@/views/SignupPage.vue';
   
   // 플러그인 초기화
   Vue.use(VueRouter);
   
   export default new VueRouter({
     // 뷰 라우터로 제어되는 라우팅 정보
     routes: [
       {
         // URL
         path: '/login',
         // URL을 이동했을 때 페이지 컴포넌트
         component: LoginPage,
       },
       {
         path: '/signup',
         component: SignupPage,
       },
     ],
   });
   ```

<br>

## 라우팅 동작 확인

1. `src/App.vue` 에 코드 작성

   ```vue
   <template>
     <div>
       <header>
         <router-link to="/login">로그인</router-link> |
         <router-link to="/signup">회원가입</router-link>
       </header>
       <router-view></router-view>
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

2. `npm run dev` 으로 서버 실행

<br>

## 코드 스플리팅 소개 및 적용

* **코드 스플리팅** : 해당 URL을 요청했을 때 페이지를 가져오는 것

1. `src/routes/index.js` 에서 코드를 수정

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   // import를 지운다.
   
   Vue.use(VueRouter);
   
   export default new VueRouter({
     routes: [
       {
         path: '/login',
         // 해당 URL이 요청됬을 때 import 한다.
         component: () => import('@/views/LoginPage.vue'),
       },
       {
         path: '/signup',
         component: () => import('@/views/SignupPage.vue'),
       },
     ],
   });
   ```

<br>

## 초기 진입 페이지 설정

1. `src/routes/index.js` 에서 routes 옵션에 `'/'` 경로와 `redirect` 옵션을 추가한다.

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   
   // 플러그인 초기화
   Vue.use(VueRouter);
   
   export default new VueRouter({
     // 뷰 라우터로 제어되는 라우팅 정보
     routes: [
       {
         path: '/',
         redirect: '/login',
       },
       {
         // URL
         path: '/login',
         // URL을 이동했을 때 페이지 컴포넌트
         component: () => import('@/views/LoginPage.vue'),
       },
       {
         path: '/signup',
         component: () => import('@/views/SignupPage.vue'),
       },
     ],
   });
   ```

<br>

## 없는 페이지를 접근할 때의 라우터 처리

* **라우터 폴백** : 라우터 속성에 없는 경로를 처리하는 것

1. `src/routes/index.js` 에 모든 경로를 처리하는 코드 추가

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   
   Vue.use(VueRouter);
   
   export default new VueRouter({
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
       // 나머지 모든 경로에 대한 처리
       {
         path: '*',
         component: () => import('@/views/NotFoundPage.vue'),
       },
     ],
   });
   ```

2. `src/views/NotFoundPage.vue` 파일 추가

   ```vue
   <template>
     <div>
       Page is not found
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

<br>

## history mode 설정 및 싱글 페이지 애플리케이션 배포할 때 주의사항

* url에 #이 들어가는 것을 방지하기 위해 하는 설정

1. `src/routes/index.js` 에 mode 속성 추가

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   
   Vue.use(VueRouter);
   
   export default new VueRouter({
     // 모드 속성 추가
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
       {
         path: '*',
         component: () => import('@/views/NotFoundPage.vue'),
       },
     ],
   });
   ```

> 실제 배포할 때는 https://router.vuejs.org/guide/essentials/history-mode.html 에서 서버 설정하는 방법을 보고 배포해야 함.