# 학습 노트 데이터 조회

## 학습 노트 조회 API 함수 구현

1. `src/api/index.js` 에 `fetchPosts()` 라는 데이터를 조회하는 API 추가

   ```js
   import axios from 'axios';
   import { setInterceptors } from './common/interceptors';
   
   // 액시오스 초기화 함수
   function createInstance() {
     const instance = axios.create({
       baseURL: process.env.VUE_APP_API_URL,
     });
     return setInterceptors(instance);
   }
   const instance = createInstance();
   
   // 회원가입 API
   function registerUser(userData) {
     return instance.post('signup', userData);
   }
   
   // 로그인 API
   function loginUser(userData) {
     return instance.post('login', userData);
   }
   
   // 학습 노트 데이터를 조회하는 API
   function fetchPosts() {
     return instance.get('posts');
   }
   
   // fetchPosts도 export
   export { registerUser, loginUser, fetchPosts };
   ```

2. `src/views/MainPage.vue` 코드 추가

   ```vue
   <template>
     <div>
       <div class="main list-container contents">
         <h1 class="page-header">Today I Learned</h1>
       </div>
     </div>
   </template>
   
   <script>
   // fetchPosts 메서드 import
   import { fetchPosts } from '@/api/index';
   
   export default {
     methods: {
       // 데이터를 가져오는 메서드
       async fetchData() {
         const response = await fetchPosts();
         console.log(response);
       },
     },
     created() {
       this.fetchData();
     },
   };
   </script>
   ```

<br>

## 학습 노트 목록 표시를 위한 데이터 바인딩

