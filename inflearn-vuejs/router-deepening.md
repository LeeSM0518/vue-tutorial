# 라우터 심화

## 라우터 네비게이션 가드 소개

* [라우터 네비게이션 가드](https://router.vuejs.org/guide/advanced/navigation-guards.html)
  * 데이터 호출 패턴
  * 특정 URL에 접근하기 전에 검사

<br>

## 라우터 네비게이션 가드 기초 코드

`src/routes/index.js` 수정

```js
...
// router 변수에 VueRouter 저장
const router = new VueRouter({
  ...
});

// router 변수에서 beforeEach를 통해 이전 페이지 정보 출력과
//	다음 페이지 이동
// to: 이동하려는 페이지
// from: 현재 페이지
// next 페이지 이동할 때 호출하는 API
router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});

// router export
export default router;
```

<br>

## 페이지별 인증 권한 설정

`src/routes/index.js` 수정

```js
...
const router = new VueRouter({
  mode: 'history',
  routes: [
    ...
    // 권한이 필요한 페이지들은 meta에 auth 속성 추가
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      meta: { auth: true },
    },
    ...
  ],
});

router.beforeEach((to, from, next) => {
  // 만약 
  if (to.meta.auth) {
    console.log('인증이 필요합니다');
  }
  next();
});

export default router;
```

<br>

## 인증되지 않은 사용자 접근 제어

`src/routes/index.js` 수정

```js
...
router.beforeEach((to, from, next) => {
  // 로그인 정보가 존재하지 않으면 로그인 페이지로 이동시킨다.
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다');
    next('/login');
    return;
  }
  next();
});
...
```

<br>

## 로그인 상태에 따른 로고 이동 링크 처리

`src/components/common/AppHeader.vue` 수정

```vue
<template>
  <header>
    <div>
      <!-- v-bind:to로 logoLink 메서드 연결 -->
      <router-link :to="logoLink" class="logo">
        TIL
        <span v-if="isUserLogin">by {{ $store.state.username }}</span>
      </router-link>
    </div>
    <div class="navigations">
      <!-- 1 -->
      <template v-if="isUserLogin">
        <a href="javascript:;" @click="logoutUser" class="logout-button">
          Logout
        </a>
      </template>
      <!-- 2 -->
      <template v-else>
        <router-link to="/login">로그인</router-link>
        <router-link to="/signup">회원가입</router-link>
      </template>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    isUserLogin() {
      return this.$store.getters.isLogin;
    },
    // 메서드 추가
    logoLink() {
      // 로그인 여부에 따라 이동 URL 설정
      return this.$store.getters.isLogin ? '/main' : '/login';
    },
  },
  ...
```

<br>

## 로그 아웃 관련 코드 수정

1. `src/utils/cookies.js` 에 쿠키 삭제 메서드 추가

   ```js
   ...
   function deleteCookie(value) {
     document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
   }
   
   export {
     saveAuthToCookie,
     saveUserToCookie,
     getAuthFromCookie,
     getUserFromCookie,
     deleteCookie,
   };
   ```

2. `src/components/common/AppHeader.vue` 수정

   ```vue
   ...
   <script>
   import { deleteCookie } from '@/utils/cookies';
   
   export default {
     ...
     methods: {
       logoutUser() {
         this.$store.commit('clearUsername');
         // 토큰 삭제
         this.$store.commit('clearToken');
         // 로그인 쿠키 정보 삭제
         deleteCookie('til_auth');
         deleteCookie('til_user');
         this.$router.push('/login');
       },
     },
   };
   </script>
   ...
   ```

3. `src/store/index.js` 수정

   ```js
   ...
   export default new Vuex.Store({
     ...
     mutations: {
       ...
       // 토근 삭제 메서드
       clearToken(state) {
         state.token = '';
       },
     },
     ...
   });
   ```