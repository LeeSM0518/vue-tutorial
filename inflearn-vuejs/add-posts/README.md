# 학습 노트 데이터 생성

## 학습 노트 등록 페이지로 이동하기 위한 버튼 생성 및 아이콘 적용

[아이오닉 아이콘 사이트](https://ionicons.com/usage)

`src/views/MainPage.vue` 에 버튼 생성 및 아이콘 적용

```vue
<template>
  <div>
    <div class="main list-container contents">
      <h1 class="page-header">Today I Learned</h1>
      <LoadingSpinner v-if="isLoading"></LoadingSpinner>
      <ul v-else>
        <PostListItem
          v-for="postItem in postItems"
          :key="postItem._id"
          :postItem="postItem"
        ></PostListItem>
      </ul>
    </div>
    <!-- router-link 추가 및 클래스 설정 -->
    <router-link to="/add" class="create-button">
      <!-- 아이콘 추가 -->
      <i class="ion-md-add"></i>
    </router-link>
  </div>
</template>
...
```

<br>

## 학습 노트 등록 페이지 라우터 생성 및 확인

1. `src/routes/index.js` 에서 `/add` route 추가

   ```js
   import Vue from 'vue';
   import VueRouter from 'vue-router';
   // import LoginPage from '@/views/LoginPage.vue';
   // import SignupPage from '@/views/SignupPage.vue';
   
   Vue.use(VueRouter);
   
   export default new VueRouter({
     ...
     // add 라우트 추가
       {
         path: '/add',
         component: () => import('@/views/PostAddPage.vue'),
       },
   ```

2. `src/views/PostAddPage.vue` 파일 생성 및 작성

   ```vue
   <template>
     <div>
       <h1>생성 페이지</h1>
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

<br>

## 학습 노트 등록 및 마크업 및 스타일링

1. `src/components/posts/PostAddForm.vue` 코드 수정

   ```vue
   <template>
     <div class="contents">
       <h1 class="page-header">Create Post</h1>
       <div class="form-wrapper">
         <form class="form">
           <div>
             <label for="title">Title: </label>
             <input id="title" type="text" />
           </div>
           <div>
             <label for="contents">Contents: </label>
             <textarea id="contents" type="text" rows="5" />
           </div>
           <button type="submit" class="btn">Create</button>
         </form>
       </div>
     </div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style scoped>
   .form-wrapper .form {
     width: 100%;
   }
   
   .btn {
     color: white;
   }
   </style>
   ```

2. `src/views/PostAddPage.vue` 코드 수정

   ```vue
   <template>
     <div class="form-container">
       <PostAddForm></PostAddForm>
     </div>
   </template>
   ...
   ```

<br>

## 학습 노트 등록 폼의 데이터 바인딩 및 이벤트 연결

`src/components/posts/PostAddForm.vue` 코드 수정

```vue
<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <!-- @submit.prevent 를 이용해서 이벤트 연결 -->
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title: </label>
          <!-- v-model로 데이터 바인딩 -->
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents: </label>
          <!-- v-model로 데이터 바인딩 -->
          <textarea id="contents" type="text" rows="5" v-model="contents" />
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  // 데이터 속성
  data() {
    return {
      title: '',
      contents: '',
    };
  },
  // 메서드
  methods: {
    // 이벤트 연결된 메서드
    submitForm() {
      console.log('submit');
    },
  },
};
</script>
...
```

<br>

## 학습 노트 등록 API 구현 및 동작 확인

1. `src/api/index.js` 에 데이터 생성 API 추가

   ```js
   import axios from 'axios';
   import { setInterceptors } from './common/interceptors';
   
   ...
   
   // 학습 노트 데이터를 생성하는 API
   function createPost(postData) {
     return instance.post('posts', postData);
   }
   
   // createPost export
   export { registerUser, loginUser, fetchPosts, createPost };
   ```

2. `src/components/posts/PostAddForm.vue` 코드 수정

   ```vue
   ...
   <script>
   // createPost 메서드 import
   import { createPost } from '@/api/index';
   
   export default {
     data() {
       return {
         title: '',
         contents: '',
       };
     },
     methods: {
       // async 추가
       async submitForm() {
         // create 메서드를 await으로 호출하고 매개변수로 title과 contents를 가진 object를 넘긴다.
         // 요청 결과를 reponse로 저장
         const response = await createPost({
           title: this.title,
           contents: this.contents,
         });
         console.log(response);
       },
     },
   };
   </script>
   ...
   ```

<br>

## 학습 노트 등록 에러 처리

`src/components/posts/PostAddForm.vue` 코드 수정

```vue
<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title: </label>
          <input id="title" type="text" v-model="title" />
        </div>
        <div>
          <label for="contents">Contents: </label>
          <textarea id="contents" type="text" rows="5" v-model="contents" />
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/index';

export default {
  data() {
    return {
      title: '',
      contents: '',
      // 로그 메시지 데이터 추가
      logMessage: '',
    };
  },
  methods: {
    async submitForm() {
      // try-catch 추가
      try {
        const response = await createPost({
          title: this.title,
          contents: this.contents,
        });
        console.log(response);
      } catch (error) {
        // 에러 발생시 메시지를 가져와서 logMessage 데이터에 저장
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>
...
```

<br>

## 학습 노트 본문 길이 유효성 검사 기능 구현

`src/components/posts/PostAddForm.vue` 코드 수정

```vue
<template>
  <div class="contents">
    <h1 class="page-header">Create Post</h1>
    <div class="form-wrapper">
      <form class="form" @submit.prevent="submitForm">
        <div>
          <label for="title">Title: </label>
          <input id="title" type="text" v-model="title" />
          <!-- 유효성 검사 -->
          <p v-if="!isTitleValid" class="validation-text warning">
            title must be more than 0
          </p>
        </div>
        <div>
          <label for="contents">Contents: </label>
          <textarea id="contents" type="text" rows="5" v-model="contents" />
          <!-- 유효성 검사 -->
          <p v-if="!isContentsValid" class="validation-text warning">
            Contents must be less than 250
          </p>
        </div>
        <button type="submit" class="btn">Create</button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
import { createPost } from '@/api/index';

export default {
  ...
  // 속성 추가
  computed: {
    // 본문 유효성 검사
    isContentsValid() {
      return this.contents.length <= 200;
    },
    // 제목 유효성 검사
    isTitleValid() {
      return this.title !== '';
    },
  },
  ...
};
</script>
...
```