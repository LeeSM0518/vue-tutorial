# 04. 상용 웹 앱을 개발하기 위한 필수 기술들 - 라우터 & HTTP 통신

# 04-1. 뷰 라우터

## 라우팅이란?

* **라우팅** : 웹 페이지 간의 이동 방법
  * 싱글 페이지 애플리케이션(SPA, Single Page Application)에서 주로 사용된다.

<br>

라우팅으로 사용자의 웹 페이지 요청을 처리하면 깜빡거림 없이 화면을 매끄럽게 전환할 수 있을 뿐만 아니라 더 빠르게 화면을 조작할 수 있다.

<br>

## 뷰 라우터

* **뷰 라우터** : 뷰에서 라우팅 기능을 구현할 수 있도록 지원하는 공식 라이브러리이다.

<br>

**뷰 라우터를 구현할 때 필요한 특수 태그와 기능**

| 태그                       | 설명                                                         |
| -------------------------- | ------------------------------------------------------------ |
| \<router-link to="URL 값"> | 페이지 이동 태그, 화면에서는 \<a>로 표시되며<br />클릭하면 to에 지정한 URL로 이동한다. |
| \<router-view>             | 페이지 표시 태그. 변경되는 URL에 따라 해당 컴포넌트를<br />뿌려주는 영역이다. |

<br>

* **뷰 라우터 실습**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Vue Router Sample</title>
  </head>
  <body>
  <div id="app">
      <h1>뷰 라우터 예제</h1>
      <p>
          <!-- URL 값을 변경하는 태그 -->
          <router-link to="/main">Main 컴포넌트로 이동</router-link>
          <router-link to="/login">Login 컴포넌트로 이동</router-link>
      </p>
      <!-- URL 값에 따라 갱신되는 화면 영역-->
      <router-view></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
  
  <!-- 라우터 CDN 추가-->
  <script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>
  <script>
      /* Main, Login 컴포넌트 정의*/
      var Main = {template: '<div>main</div>'};
      var Login = {template: '<div>login</div>'}
  
      /* 각 URL에 맞춰 표시할 컴포넌트 지정*/
      var routes = [
          {path: '/main', component: Main},
          {path: '/login', component: Login}
      ];
  
      /* 뷰 라우터 정의 */
      var router = new VueRouter({
          routes
      });
  
      /* 뷰 인스턴스에 라우터 추가*/
      var app = new Vue({
          router
      }).$mount('#app');
  
  </script>
  </body>
  </html>
  ```

  * 각 **\<router-link>는 화면 상에서 \<a> 버튼 태그로 변환되어** 표시된다. 버튼을 클릭하면 to="" 에 정의된 텍스트 값이 브라우저 URL 끝에 추가된다.

  * **\<router-view>는 갱신된 URL에 해당하는 화면을** 보여주는 영역이다.
  * **routes 변수에는 URL 값에 따른 해당 컴포넌트를** 정의한다.
  * router 변수에 뷰 라우터를 하나 생성하고 , routes를 삽입해 URL에 따라 화면이 전환될 수 있게 정의한다.
  * 마지막으로 새 인스턴스를 생성하고 라우터의 정보가 담긴 router를 추가한다.
  * $mount()는 el 속성과 같이 인스턴스를 화면에 붙여주는 역할을 한다.

* **실행 결과**

  ![image](https://user-images.githubusercontent.com/43431081/76212325-8dd77b80-624b-11ea-8872-d02c91f63926.png)

  ![image](https://user-images.githubusercontent.com/43431081/76212333-92039900-624b-11ea-8f47-7cf05f107c38.png)

  ![image](https://user-images.githubusercontent.com/43431081/76212341-9760e380-624b-11ea-9d1d-74bfea609e37.png)

<br>

### 라우터 URL의 해시 값(#)을 없애는 방법

```javascript
var router = new VueRouter({
  mode: 'history',
  routes
});
```

<br>

## 네스티드 라우터

네스티드 라우터(Nested Router, 중첩 라우터)는 라우터로 페이지를 이동할 때 최소 2개 이상의 컴포넌트를 화면에 나타낼 수 있다.

* **네스티드 라우터 구현하기**

  ```vue
  
  ```

  