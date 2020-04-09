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

<br>

## 에러가 났을 때의 대처 방법과 로그 분석하는 방법

* 틀린 비밀번호를 입력했을 때의 에러

![image](https://user-images.githubusercontent.com/43431081/78842940-5b809000-7a3c-11ea-9520-e7031ddef227.png)

![image](https://user-images.githubusercontent.com/43431081/78842996-8539b700-7a3c-11ea-8039-628793bbcb63.png)

<br>

## 네트워크 에러 확인 방법과 에러 처리 코드 구현

* `src/components/LoginForm.vue` 코드 수정

  ```vue
  ...
  
  <script>
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
          this.logMessage = `${data.user.username} 님 환영합니다`;
          this.initForm();
        } catch (error) {
          // 에러 핸들링할 코드
          console.log(error.response.data);
        }
      },
    ...
  </script>
  
  ...
  ```

<br>

## 에러 메시지 출력 및 에러 피드백 표시 방법

* `src/components/LoginForm.vue` 수정

  ```vue
  ...
  
  <script>
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
          this.logMessage = `${data.user.username} 님 환영합니다`;
        } catch (error) {
          // 에러 핸들링할 코드
          // 화면에 에러 출력
          this.logMessage = error.response.data;
        } finally {
          // 문자열 초기화
          this.initForm();
        }
      },
      initForm() {
        this.username = '';
        this.password = '';
      },
    },
    ...
  </script>
  
  ...
  ```

<br>

## 사용자 폼 유효성 검사 안내

* [Email Validation 정규 표현식 코드](https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript)

1. 정규 표현식 코드를 복사해서 `src/utils/validation.js` 파일을 만들어주고 코드 작성

   ```js
   function validateEmail(email) {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(String(email).toLowerCase());
   }
   
   export { validateEmail };
   ```

2. `src/components/LoginForm.vue` 에서 `validateEmail` 를 import

   ```vue
   ...
   <script>
   import { loginUser } from '@/api/index';
   import { validateEmail } from '@/utils/validation';
   ...
   ```

<br>

## computed 속성을 이용한 이메일 형식 검사

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
      <!-- 이메일 Valid 체크 및 비밀번호 존재 여부 -->
      <button :disabled="!isUsernameValid || !password" type="submit">
        로그인
      </button>
      <p>{{ logMessage }}</p>
    </form>
  </template>
  
  <script>
  import { loginUser } from '@/api/index';
  import { validateEmail } from '@/utils/validation';
  
  export default {
    ...
    computed: {
      isUsernameValid() {
        return validateEmail(this.username);
      },
    },
    ...
  };
  </script>
  
  <style></style>
  ```

<br>

## [퀴즈] 회원 가입 컴포넌트 유효성 검사

* `src/components/SignupForm.vue` 수정

  ```vue
  <template>
    <form @submit.prevent="submitForm">
      ... 생략
      <!-- disabled 속성 추가 -->
      <button
        :disabled="!isUsernameValid || !password || !nickname"
        type="submit"
      >
        회원 가입
      </button>
      <p>{{ logMessage }}</p>
    </form>
  </template>
  
  <script>
  import { registerUser } from '@/api/index';
  import { validateEmail } from '../utils/validation';
  
  export default {
    ...
    // computed 메서드 추가
    computed: {
      isUsernameValid() {
        return validateEmail(this.username);
      },
    },
    ...
  };
  </script>
  ```

<br>

