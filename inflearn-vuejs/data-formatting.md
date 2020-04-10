# 데이터 포맷팅

## 뷰 필터 소개 및 적용

[뷰 필터 안내 문서](https://vuejs.org/v2/guide/filters.html#ad)

**필터 사용법**

```html
<!-- in mustaches -->
{{ message | capitalize }}

<!-- in v-bind -->
<div v-bind:id="rawId | formatId"></div>
```

You can define local filters in a component’s options:

```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

or define a filter globally before creating the Vue instance:

```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```

<br>

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
      <!-- 필터 적용 -->
      {{ postItem.createdAt | formatDate }}
      <i class="icon ion-md-create" @click="routeEditPage"></i>
      <i class="icon ion-md-trash" @click="deleteItem"></i>
    </div>
  </li>
</template>

<script>
import { deletePost } from '@/api/posts';

export default {
  ...
  // 필터 추가
  filters: {
    // 필터 메서드
    formatDate(value) {
      return new Date(value);
    },
  },
  ...
```

<br>

## 전역 필터 소개 및 설정

1. `src/utils/filters.js` 생성 후 수정

   ```js
   // 필터 관련 함수가 존재하는 파일
   export function formatDate(value) {
     const date = new Date(value);
     const year = date.getFullYear();
     let month = date.getMonth() + 1;
     month = month > 9 ? month : `0${month}`;
     const day = date.getDate();
     let hours = date.getHours();
     hours = hours > 9 ? hours : `0${hours}`;
     const minutes = date.getMinutes();
     return `${year}-${month}-${day} ${hours}:${minutes}`;
   }
   ```

2. `src/main.js` 에 `formatDate` 를 전역 설정

   ```js
   ...
   import { formatDate } from '@/utils/filters';
   
   Vue.filter('formatDate', formatDate);
   ...
   ```

3. `src/components/posts/PostListItem.vue` 수정

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
         <!-- 지역 필터를 제거해도 전역 필터로 적용된다. -->
         {{ postItem.createdAt | formatDate }}
         <i class="icon ion-md-create" @click="routeEditPage"></i>
         <i class="icon ion-md-trash" @click="deleteItem"></i>
       </div>
     </li>
   </template>
   
   <script>
   import { deletePost } from '@/api/posts';
   
   export default {
     ...
     // 이전의 지역 필터 제거
     // filters: {
     //   formatDate(value) {
     //     return new Date(value);
     //   },
     // },
     ...
   };
   </script>
   ...
   ```