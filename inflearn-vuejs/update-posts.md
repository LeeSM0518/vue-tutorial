# 학습 노트 데이터 수정

## 학습 노트 수정 아이콘 이벤트 연결 및 구현 방향 안내

`src/components/posts/PostListItem.vue` 수정

```vue
<template>
  <li>
    <div class="post-title">
      {{ postItem.title }}
    </div>
    <div class="post-contents">
      {{ postItem.contents }}
    </div>
    <div class="post-time">
      {{ postItem.createdAt }}
      <!-- routeEditPage 클릭 메서드 연결 -->
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </li>
</template>

<script>
...
  methods: {
    async deleteItem() {
      if (confirm('You want to delete it?')) {
        await deletePost(this.postItem._id);
        this.$emit('refresh');
      }
      // console.log('deleted');
    },
    // 수정 아이콘 클릭 시 실행할 메서드
    editItem() {
      // 라우트 이동
      this.$router.push('/post/${id}');
    },
  },
};
</script>
...
```

<br>

## 학습 노트 수정 페이지 생성 및 라우터 연결

* **Dynamic Route Matching**

  ```js
  const User = {
    template: '<div>User</div>'
  }
  
  const router = new VueRouter({
    routes: [
      path: '/user/:id',
      component: User
    ]
  })
  ```

1. `src/routes/index.js` 에서 `/post/:id` 경로 추가

   ```js
   ...
   export default new VueRouter({
     mode: 'history',
     routes: [
       ...
       {
         path: '/post/:id',
         component: () => import('@/views/PostEditPage.vue'),
       },
       ...
   ```

2. `src/views/PostEditPage.vue` 생성 후 코드 추가

   ```vue
   <template>
     <div class="form-container">
       <PostEditForm></PostEditForm>
     </div>
   </template>
   
   <script>
   import PostEditForm from '@/components/posts/PostEditForm.vue';
   
   export default {
     components: {
       PostEditForm,
     },
   };
   </script>
   ...
   ```

3. `src/components/posts/PostEditForm.vue` 생성 후 코드 추가

   ```vue
   <template>
     <div>edit</div>
   </template>
   
   <script>
   export default {};
   </script>
   
   <style></style>
   ```

4. `src/components/posts/PostListItem.vue` 수정

   ```vue
   <template>
     <li>
       <div class="post-title">
         {{ postItem.title }}
       </div>
       <div class="post-contents">
         {{ postItem.contents }}
       </div>
       <div class="post-time">
         {{ postItem.createdAt }}
         <!-- 수정 아이콘에 클릭 메서드 연결 -->
         <i class="icon ion-md-create" @click="routeEditPage"></i>
         <i class="icon ion-md-trash" @click="deleteItem"></i>
       </div>
     </li>
   </template>
   
   <script>
   import { deletePost } from '@/api/posts';
   
   export default {
     props: {
       postItem: {
         type: Object,
         required: true,
       },
     },
     methods: {
       ...
       // 클릭 메서드 추가
       routeEditPage() {
         this.$router.push('/post/qwdqwdq');
       },
     },
   };
   </script>
   
   <style></style>
   ```

<br>

## 학습 노트 수정 페이지 마크업 및 라우터 파라미터 연결

1. `src/components/posts/PostEditForm.vue` 코드 수정

   ```vue
   <template>
     <div class="contents">
       <h1 class="page-header">Edit Post</h1>
       <div class="form-wrapper">
         <form class="form" @submit.prevent="submitForm">
           <div>
             <label for="title">Title:</label>
             <input id="title" type="text" v-model="title" />
           </div>
           <div>
             <label for="contents">Contents:</label>
             <textarea id="contents" type="text" rows="5" v-model="contents" />
             <p
               v-if="!isContentsValid"
               class="validation-text warning isContentTooLong"
             >
               Contents length must be less than 250
             </p>
           </div>
           <button type="submit" class="btn">Edit</button>
         </form>
         <p class="log">
           {{ logMessage }}
         </p>
       </div>
     </div>
   </template>
   
   <script>
   export default {
     data() {
       return {
         title: '',
         contents: '',
         logMessage: '',
       };
     },
     computed: {
       isContentsValid() {
         return this.contents.length <= 200;
       },
     },
     methods: {
       submitForm() {},
     },
   };
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

2. `src/components/posts/PostListItem.vue` 수정

   ```vue
   ...
   <script>
   import { deletePost } from '@/api/posts';
   
   export default {
     props: {
       postItem: {
         type: Object,
         required: true,
       },
     },
     methods: {
       async deleteItem() {
         if (confirm('You want to delete it?')) {
           await deletePost(this.postItem._id);
           this.$emit('refresh');
         }
         // console.log('deleted');
       },
       routeEditPage() {
         // id를 가져와서 요청 라우트의 URL에 연결
         const id = this.postItem._id;
         this.$router.push(`/post/${id}`);
       },
     },
   };
   </script>
   
   <style></style>
   ```

<br>

## 학습 노트 수정을 위한 특정 게시물 조회 기능 구현

먼저 API 문서에서 특정 학습 노트를 조회하는 API의 필요한 데이터를 확인한다.

1. `src/api/posts.js` 수정

   ```js
   ...
   
   // 특정 학습 노트를 조회하는 API
   function fetchPost(postId) {
     return posts.get(postId);
   }
   
   // fetchPost export
   export { fetchPosts, fetchPost, createPost, deletePost };
   ```

2. `src/components/posts/PostEditForm.vue` 수정

   ```vue
   ...
   <script>
   // 메서드 import
   import { fetchPost } from '@/api/posts';
   
   export default {
     ...
     async created() {
   	  // 라우트 정보에 존재하는 데이터 꺼내서 저장
       const id = this.$route.params.id;
       // import 한 메서드 호출
       const { data } = await fetchPost(id);
       // 데이터 바인딩
       this.title = data.title;
       this.contents = data.contents;
     },
   };
   </script>
   ...
   ```

<br>

## 학습 노트 수정 API 및 기능 구현

먼저  API 문서에서 수정 요청에 필요한 데이터를 확인한다.

1. `src/api/post.js` 에 API 추가

   ```js
   ...
   // 학습 노트 데이터를 수정하는 API
   function editPost(postId, postData) {
     return posts.put(postId, postData);
   }
   
   export { fetchPosts, fetchPost, createPost, deletePost, editPost };
   ```

2. `src/components/posts/PostEditForm.vue` 수정

   ```vue
   ...
   <script>
   import { fetchPost, editPost } from '@/api/posts';
   
   export default {
     ...
     methods: {
       async submitForm() {
         // 라우트로부터 id 정보 가져옴
         const id = this.$route.params.id;
         // try-catch 처리
         try {
           // id 정보와 제목 및 내용을 파라미터로 넘김
           await editPost(id, {
             title: this.title,
             contents: this.contents,
           });
           // 메인 페이지로 이동
           this.$router.push('/main');
         } catch (error) {
           console.log(error);
           // error를 화면에 데이터 바인딩
           this.logMessage = error;
         }
       },
     },
     ...
   };
   </script>
   ...
   ```