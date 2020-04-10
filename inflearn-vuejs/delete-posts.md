# 학습 노트 데이터 삭제

## 삭제 기능 마크업 및 이벤트 연결

`src/components/posts/PostListItem.vue` 편집

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
      <!-- 편집 및 삭제 아이콘 추가, 클릭 메서드 등록-->
      <i class="icon ion-md-create"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    postItem: {
      type: Object,
      required: true,
    },
  },
  // 메서드 추가
  methods: {
    deleteItem() {},
  },
};
</script>
...
```

<br>

## 삭제 API 함수 및 기능 구현

먼저 API 문서를 보고 데이터를 삭제하는데 필요한 값은 무엇인지 확인한다.

1. `src/api/posts.js` 에 삭제 API 함수 구현

   ```js
   ...
   // 학습 노트 데이터를 삭제하는 API
   function deletePost(postId) {
     return posts.delete(postId);
   }
   
   // deletePost export
   export { fetchPosts, createPost, deletePost };
   ```

2. `src/components/posts/PostListItem.vue` 에 `methods` 추가

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
     // methods 추가
     methods: {
       async deleteItem() {
         await deletePost(this.postItem._id);
         console.log('deleted');
       },
     },
   };
   </script>
   ...
   ```

<br>

## 삭제 기능 UX 개선

1. `src/components/posts/PostListItem.vue` 편집

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
         // 데이터를 지울껀지 메시지 박스로 물어본다
         if (confirm('You want to delete it?')) {
           await deletePost(this.postItem._id);
           // refresh 메서드를 발생시킨다.
           this.$emit('refresh');
         }
       },
     },
   };
   </script>
   ...
   ```

2. `src/views/MainPage.vue` 편집

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
             @refresh="fetchData"
           ></PostListItem>
         </ul>
       </div>
       <router-link to="/add" class="create-button">
         <i class="ion-md-add"></i>
       </router-link>
     </div>
   </template>
   
   ...
   ```

<br>

## 학습 노트 생성 기능 관련 UX 수정

`src/components/posts/PostAddForm.vue` 수정

```vue
...
<script>
import { createPost } from '@/api/posts';

export default {
  ...
  methods: {
    async submitForm() {
      try {
        const response = await createPost({
          title: this.title,
          contents: this.contents,
        });
        this.$router.push('/main');
        console.log(response);
      } catch (error) {
        console.log(error.response.data.message);
        this.logMessage = error.response.data.message;
      }
    },
  },
};
</script>
...
```