# 회원 가입 페이지 개발

## 회원 가입 페이지 개발을 위한 준비

1. `vue-til-server` 는 `npm run dev` 로 서버 실행
2. 실행이 안될 시에는 `nvm install 10.16.3` 으로 노드 버젼을 맞춰주고
3. `npm i` 로 모듈을 설치해준다.

<br>

## 헤더 컴포넌트 마크업 및 회원 가입 컴포넌트 생성

* **헤더 컴포넌트 마크업**

  1. `src/components/common/AppHeader.vue` 작성

     ```vue
     <template>
       <header>
         <router-link to="/login">로그인</router-link> |
         <router-link to="/signup">회원가입</router-link>
       </header>
     </template>
     
     <script>
     export default {};
     </script>
     
     <style></style>
     ```

  2. `src/App.vue` 작성

     ```vue
     <template>
       <div>
         <AppHeader></AppHeader>
         <router-view></router-view>
       </div>
     </template>
     
     <script>
     import AppHeader from '@/components/common/AppHeader.vue';
     
     export default {
       components: {
         AppHeader,
       },
     };
     </script>
     
     <style></style>
     ```

<br>

* **회원 가입 컴포넌트 생성**

  1. `src/components/SignupForm.vue` 생성 및 코드 작성

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

  2. `src/views/SignupPage.vue` 코드 수정

     ```vue
     <template>
       <div>
         <SignupForm></SignupForm>
       </div>
     </template>
     
     <script>
     import SignupForm from '@/components/SignupForm.vue';
     
     export default {
       components: {
         SignupForm,
       },
     };
     </script>
     
     <style></style>
     ```

  <br>

  ## 회원 가입 폼 마크업

  1. `src/components/SignupForm.vue` 코드 수정

     ```vue
     <template>
       <!-- form 추가 -->
       <form>
         <div>
           <label for="username">id: </label>
           <input id="username" type="text" />
         </div>
         <div>
           <label for="password">pw: </label>
           <input id="password" type="text" />
         </div>
         <div>
           <label for="nickname">nickname: </label>
           <input id="nickname" type="text" />
         </div>
         <button type="submit">login</button>
       </form>
     </template>
     
     <script>
     export default {};
     </script>
     
     <style></style>
     ```

  <br>

## 회원 가입 폼 데이터 바인딩 및 이벤트 연결

* `src/components/SignupForm.vue` 코드 작성

  ```vue
  <template>
  	<!-- form 태그 및 이벤트 연결과 input 연결 -->
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">id: </label>
        <input id="username" type="text" v-model="username" />
      </div>
      <div>
        <label for="password">pw: </label>
        <input id="password" type="text" v-model="password" />
      </div>
      <div>
        <label for="nickname">nickname: </label>
        <input id="nickname" type="text" v-model="nickname" />
      </div>
      <button type="submit">login</button>
    </form>
  </template>
  
  <script>
  export default {
    // 데이터 추가
    data() {
      return {
        username: '',
        password: '',
        nickname: '',
      };
    },
    // 메서드 추가
    methods: {
      submitForm() {
        console.log('폼 제출');
      },
    },
  };
  </script>
  
  <style></style>
  ```

<br>

## API 폴더와 회원 가입 API 함수 생성

1. `npm i axios` 를 통해 axios 설치

2. `src/api` 폴더 생성 후 `src/api/index.js` 파일 생성 및 코드 작성

   ```js
   import axios from 'axios';
   
   function registerUser() {
     const url = 'http://localhost:3000/signup';
     return axios.post(url);
   }
   
   export { registerUser };
   ```

3. `src/components/SignupForm.vue` 코드 작성

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
       <div>
         <label for="nickname">nickname: </label>
         <input id="nickname" type="text" v-model="nickname" />
       </div>
       <button type="submit">login</button>
     </form>
   </template>
   
   <script>
   import { registerUser } from '@/api/index';
   
   export default {
     data() {
       return {
         username: '',
         password: '',
         nickname: '',
       };
     },
     methods: {
       submitForm() {
         console.log('폼 제출');
         registerUser();
       },
     },
   };
   </script>
   
   <style></style>
   ```

<br>

## 회원 가입 API 호출과 주의 사항

1. `src/api/index.js` 에서 `registerUser()` 에 파라미터로 `userData` 를 넣고 post 요청에 파라미터로 추가한다.

   ```js
   import axios from 'axios';
   
   function registerUser(userData) {
     const url = 'http://localhost:3000/signup';
     return axios.post(url, userData);
   }
   
   export { registerUser };
   ```

2. `src/components/SignupForm.vue` 에서 `submitForm()` 메서드에서 userData 변수를 추가하고 `registerUser()` 메서드를 호출할 때 userData를 넘겨준다.

   ```vue
   ...
   
   <script>
   import { registerUser } from '@/api/index';
   
   export default {
     data() {
       return {
         username: '',
         password: '',
         nickname: '',
       };
     },
     methods: {
       submitForm() {
         console.log('폼 제출');
         const userData = {
           username: this.username,
           password: this.password,
           nickname: this.nickname,
         };
         registerUser(userData);
       },
     },
   };
   </script>
   
   <style></style>
   ```

   > userData의 값 들은 API 문서에 적혀있는 이름들로(ex. username, password, nickname) 구성해야 한다.

<br>

## 회원 가입 이후의 동작 구현

1. `src/components/SignupForm.vue` 코드 수정

   ```vue
   <template>
     <form @submit.prevent="submitForm">
       ... 생략
       <button type="submit">회원 가입</button>
       <!-- 회원 가입 성공을 알리기 위한 태그 추가 -->
       <p>{{ logMessage }}</p>
     </form>
   </template>
   
   <script>
   // index.js 에서 registerUser 메서드 가져옴
   import { registerUser } from '@/api/index';
   
   export default {
     data() {
       return {
         // Form values
         username: '',
         password: '',
         nickname: '',
         // log 
         logMessage: '',
       };
     },
     methods: {
       // async 를 붙여서 비동기 처리
       async submitForm() {
         console.log('폼 제출');
         const userData = {
           username: this.username,
           password: this.password,
           nickname: this.nickname,
         };
         // registerUser 메서드의 결과를 받아와서 data를 꺼낸다.
         const { data } = await registerUser(userData);
         console.log(data.username);
         // data 에서 username을 꺼내와서 문자열로 변환
         this.logMessage = `${data.username} 님이 가입되었습니다`;
         this.initForm();
       },
       // 문자열 초기화
       initForm() {
         this.username = '';
         this.password = '';
         this.nickname = '';
       },
     },
   };
   </script>
   ```