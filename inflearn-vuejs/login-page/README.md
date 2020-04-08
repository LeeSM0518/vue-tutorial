# 로그인 페이지 개발

## 로그인 폼 컴포넌트 생성 및 마크업

1. `src/views/LoginPage.vue` 생성 및 작성

   ```vue
   <template>
     <div>
       <h1>로그인 페이지</h1>
       <LoginForm></LoginForm>
     </div>
   </template>
   
   <script>
   import LoginForm from '@/components/LoginForm.vue';
   
   export default {
     components: {
       LoginForm,
     },
   };
   </script>
   ```

2. `src/components/LoginForm.vue` 생성 및 작성

   ```vue
   <template>
     <form>
       <div>
         <label for="username">id: </label>
         <input id="username" type="text" />
       </div>
       <div>
         <label for="password">pw: </label>
         <input id="password" type="text" />
       </div>
       <button type="submit">로그인</button>
     </form>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

<br>

## 로그인 폼 데이터 바인딩과 이벤트 연결

`src/components/LoginForm.vue` 수정

```vue
<template>
	<!-- submit 속성 추가 -->
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <!-- v-model 속성 추가 -->
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <!-- v-model 속성 추가 -->
      <label for="password">pw: </label>
      <input id="password" type="text" v-model="password" />
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<script>
export default {
  // 데이터 추가
  data() {
    return {
      username: '',
      password: '',
    };
  },
  // 메서드 추가
  methods: {
    submitForm() {
      axios.post();	// 아직 axios 추가 안함
    },
  },
};
</script>

<style></style>
```

<br>

## 로그인 API 문서 확인 및 API 함수

* **login API 확인** : http://localhost:3000/api/docs/#/%2Flogin/post_login
  * username : 아이디
  * password : 비밀번호

* `src/api/index.js` 에 로그인 처리 메서드 추가

  ```js
  import axios from 'axios';
  
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
  
  function registerUser(userData) {
    return instance.post('signup', userData);
  }
  
  // 로그인 메서드 추가
  function loginUser(userData) {
    return instance.post('login', userData);
  }
  
  // loginUser 메서드 export
  export { registerUser, loginUser };
  ```

<br>

## 로그인 기능 구현

* `src/components/LoginForm.vue` 코드 수정

  ```vue
  <template>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id: </label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">pw: </label>
        <input id="password" type="text" v-model="password" />
      </div>
      <button type="submit">로그인</button>
      <!-- 로그인 결과 출력 -->
      <p>{{ logMessage }}</p>
    </form>
  </template>
  
  <script>
  // index.js 로 부터 loginUser 메서드 import
  import { loginUser } from '@/api/index';
  
  export default {
    data() {
      return {
        // form values
        username: '',
        password: '',
        // log, 로그 메시지 추가
        logMessage: '',
      };
    },
    methods: {
      // async 로 비동기 처리
      async submitForm() {
        // 데이터 저장
        const userData = {
          username: this.username,
          password: this.password,
        };
        // 로그인 데이터로 로그인 요청
        const { data } = await loginUser(userData);
        console.log(data.user.username);
        // data 에서 username을 꺼내서 문자열로 만듬
        this.logMessage = `${data.user.username} 님 환영합니다`;
        this.initForm();
      },
      // 문자열 초기화 메서드 추가
      initForm() {
        this.username = '';
        this.password = '';
      },
    },
  };
  </script>
  ```

  