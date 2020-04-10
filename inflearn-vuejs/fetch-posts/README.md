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

`src/views/MainPage.vue` 코드를 수정

```vue
<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <ul>
        <!-- li 태그에서 v-for 속성을 사용해서 데이터 리스트를 화면에 바인딩한다. -->
        <li v-for="postItem in postItems" :key="postItem._id">
          {{ postItem.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { fetchPosts } from '@/api/index';

export default {
  // postItems 라는 데이터를 선언한다.
  data() {
    return {
      postItems: [],
    };
  },
  methods: {
    async fetchData() {
      const { data } = await fetchPosts();
      // 받은 데이터를 저장하는 코드
      this.postItems = data.posts;
    },
  },
  created() {
    this.fetchData();
  },
};
</script>

<style></style>
```

<br>

## 학습 노트 생성 및 생성된 데이터 확인

1. http://localhost:3000/api/docs 에 들어간다.
2. `/posts/` 를 POST 요청한다.

<br>

## 학습 노트 목록 마크업 및 스타일링

`src/views/MainPage.vue` 코드 수정

```vue
<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <ul>
        <li v-for="postItem in postItems" :key="postItem._id">
          <div class="post-title">
            {{ postItem.title }}
          </div>
          <div class="post-content">
            {{ postItem.contents }}
          </div>
          <div class="post-time">
            {{ postItem.createdAt }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
...
```

<br>

## 학습 노트 목록 아이템 컴포넌트화

1. `src/components/posts/PostListItem.vue` 파일을 생성 후 코드 추가

   ```vue
   <template>
     <li>
       <div class="post-title">
         {{ postItem.title }}
       </div>
       <div class="post-content">
         {{ postItem.contents }}
       </div>
       <div class="post-time">
         {{ postItem.createdAt }}
       </div>
     </li>
   </template>
   
   <script>
   export default {
     // props 설정
     props: {
       postItem: {
         type: Object,
         required: true,
       },
     },
   };
   </script>
   ```

2. `src/views/MainPage.vue` 코드 수정

   ```vue
   <template>
     <div>
       <div class="main list-container contents">
         <h1 class="page-header">Today I Learned</h1>
         <ul>
           <!-- PostListItem 컴포넌트 태그 -->
           <PostListItem
             v-for="postItem in postItems"
             :key="postItem._id"
             :postItem="postItem"
           ></PostListItem>
         </ul>
       </div>
     </div>
   </template>
   
   <script>
   // 컴포넌트 추가
   import PostListItem from '@/components/posts/PostListItem.vue';
   import { fetchPosts } from '@/api/index';
   
   export default {
     // 컴포넌트 속성 추가
     components: {
       PostListItem,
     },
     ...
   ```

<br>

## 데이터 로딩 상태 표시

`src/views/MainPage.vue` 코드 수정

```vue
<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <!-- 로딩중일때 -->
      <div v-if="isLoading">
        Loading ...
      </div>
      <!-- 로딩끝 -->
      <ul v-else>
        <PostListItem
          v-for="postItem in postItems"
          :key="postItem._id"
          :postItem="postItem"
        ></PostListItem>
      </ul>
    </div>
  </div>
</template>

<script>
import PostListItem from '@/components/posts/PostListItem.vue';
import { fetchPosts } from '@/api/index';

export default {
  components: {
    PostListItem,
  },
  data() {
    return {
      postItems: [],
      // 로딩 변수 선언
      isLoading: false,
    };
  },
  methods: {
    async fetchData() {
      // 로딩중
      this.isLoading = true;
      const { data } = await fetchPosts();
      // 로딩 완료
      this.isLoading = false;
      this.postItems = data.posts;
    },
  },
  ...
```

<br>

## 로딩 상태를 표시하는 스피너 등록

`src/views/MainPage.vue` 코드 수정

```vue
<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <!-- LoadingSpinner 태그 추가 -->
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <PostListItem
          v-for="postItem in postItems"
          :key="postItem._id"
          :postItem="postItem"
        ></PostListItem>
      </ul>
    </div>
  </div>
</template>

<script>
// 로딩 스피너 컴포넌트 추가
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
...
```