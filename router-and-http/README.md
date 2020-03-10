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

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Vue Nested Router</title>
  </head>
  <body>
  <div id="app">
      <!-- router-view: User 컴포넌트가 뿌려질 영역 -->
      <router-view></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>
  <script>
      /* 컴포넌트 내용 정의 */
      var User = {
          /* router-view: 하위 컴포넌트가 뿌려질 영역 */
          template: `
          <div>
          User Component
          <router-view></router-view>
          </div>
          `
      };
      var UserProfile = { template: '<p>User Profile Component</p>'};
      var UserPost = { template: '<p>User Post Component</p>'};
  
      /* 네스티드 라우팅 정의 */
      var routes = [{
          path: '/user',
          component: User,
          children: [
              {
                  path: 'posts',
                  component: UserPost
              },
              {
                  path: 'profile',
                  component: UserProfile
              },
          ]
      }];
  
      /* 뷰 라우터 정의 */
      var router = new VueRouter({
          routes
      });
  
      /* 뷰 인스턴스에 라우터 추가 */
      var app = new Vue({
          router
      }).$mount('#app');
  </script>
  </body>
  </html>
  ```

  * User 컴포넌트의 template에 하위 컴포넌트를 표시할 \<router-view> 가 있다는 것이 주목할 점이다.
  * 네스티드 라우팅 정의에서 기본 URL은 /user로 설정하고, 다음에 올 URL에 따라 표시될 하위 컴포넌트를 정의한다.
  * 뷰 라우터를 생성하고 정의한 라우터 정보를 담은 객체를 routes를 정의한다.
  * 라우터 정보를 새로운 인스턴스에 포함시키고 app이라는 id를 가진 요소에 인스턴스를 붙인다.

<br>

네스티드 라우터와 기본 라우터의 차이점은 **최상위(루트) 컴포넌트에도 \<router-view> 가 있고, 최상위 컴포넌트의 하위 컴포넌트(User)에도 \<router-view>가 있다는 것이다.**

* **실행 결과**

  ![image](https://user-images.githubusercontent.com/43431081/76287909-e3ae3100-62e8-11ea-94eb-9272f8958599.png)

  ![image](https://user-images.githubusercontent.com/43431081/76287921-e872e500-62e8-11ea-9361-4638b4b69b57.png)

  ![image](https://user-images.githubusercontent.com/43431081/76287935-f294e380-62e8-11ea-8d05-f6344839b4aa.png)

<br>

## 네임드 뷰

네임드 뷰(Named View)는 **특정 페이지로 이동했을 때 여러 개의 컴포넌트를 동시에 표시하는 라우팅 방식이다.**

![image](https://user-images.githubusercontent.com/43431081/76288277-b3b35d80-62e9-11ea-9bc3-31a7e03451fd.png)

* **네임드 뷰 구현하기**

  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Vue Named View Sample</title>
  </head>
  <body>
  <!-- 라우팅 영역 정의-->
  <div id="app">
      <router-view name="header"></router-view>
      <!-- name이 없는 경우는 디폴트 -->
      <router-view></router-view>
      <router-view name="footer"></router-view>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
  <script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>
  <script>
      /* 컴포넌트 내용 정의 */
      var Body = {template: '<div>This is Body</div>'};
      var Header = {template: '<div>This is Header</div>'};
      var Footer = {template: '<div>This is Footer</div>'};
  
      var router = new VueRouter({
          routes: [
              {
                  path: '/',
                  /* <router-view>의 name 속성과 컴포넌트를 연결*/
                  components: {
                      default: Body,
                      header: Header,
                      footer: Footer
                  }
              }
          ]
      });
  
      var app = new Vue({
          router
      }).$mount('#app');
  </script>
  </body>
  </html>
  ```

* **실행 결과**

  ![image](https://user-images.githubusercontent.com/43431081/76288936-57e9d400-62eb-11ea-9f8d-1333f965d38b.png)

<br>

## 실습 예제

### URL 값의 끝을 '/'에서 '/login' 으로 변경하면 화면이 변경되도록 네임드 뷰 방식을 사용해 라우터 코드를 작성해 보세요.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Vue Named View Sample</title>
</head>
<body>
<!-- 라우팅 영역 정의-->
<div id="app">
    <router-view name="header"></router-view>
    <!-- name이 없는 경우는 디폴트 -->
    <router-view></router-view>
    <router-view name="footer"></router-view>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@3.0.1/dist/vue-router.js"></script>
<script>
    /* 컴포넌트 내용 정의 */
    var Body = {template: '<div>This is Body</div>'};
    var Header = {template: '<div>This is Header</div>'};
    var Footer = {template: '<div>This is Footer</div>'};

    var LoginBody = {template: '<div>This is LoginBody</div>'};
    var LoginHeader = {template: '<div>This is LoginHeader</div>'};
    var LoginFooter = {template: '<div>This is LoginFooter</div>'};
    
    var router = new VueRouter({
        routes: [
            {
                path: '/',
                /* <router-view>의 name 속성과 컴포넌트를 연결*/
                components: {
                    default: Body,
                    header: Header,
                    footer: Footer
                }
            },
            {
                path: '/login',
                components: {
                    default: LoginBody,
                    header: LoginHeader,
                    footer: LoginFooter
                }
            }
        ]
    });

    var app = new Vue({
        router
    }).$mount('#app');
</script>
</body>
</html>
```

**실행 결과**

![image](https://user-images.githubusercontent.com/43431081/76290548-be242600-62ee-11ea-9185-532f8328d12d.png)

<br>

# 04-2. 뷰 HTTP 통신

## 웹 앱의 HTTP 통신 방법

요즈음 웹 앱에서 서버에 데이터를 요청하는 HTTP(HyperText Transfer Protocol) 통신은 필수로 구현해야 하는 기능이다.

여기서 **HTTP는 브라우저와 서버 간에 데이터를 주고받는 통신 프로토콜이다.**

![image](https://user-images.githubusercontent.com/43431081/76291685-f62c6880-62f0-11ea-9041-30a4c24bb253.png)

<br>

웹 앱 HTTP 통신의 대표적인 사례로는 제이쿼리(jQuery)의 ajax가 있다. 

ajax는 **서버에서 받아온 데이터를 표시할 때 화면 전체를 갱신하지 않고도 화면의 일부분만 변경할 수 있게하는** 자바 스크림트 기법이다.

뷰에서도 ajax를 지원하기 위한 **액시오스(axios)라는** 라이브러리를 제공한다.

<br>

## 뷰 리소스

뷰 리소스를 사용하는 방법은 CDN을 이용해서 라이브러리를 로딩하는 방식과 NPM으로 라이브러리를 설치하는 방법이 있다.

* **뷰 리소스로 데이터 받아오기**

  ```html
  <!DOCTYPE html>
  <html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <head>
      <meta charset="UTF-8">
      <title>Vue Resource</title>
  </head>
  <body>
  <div id="app">
      <button v-on:click="getData">프레임워크 목록 가져오기</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
  <!-- 뷰 리소스 CDN-->
  <script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.4"></script>
  <script>
      new Vue({
          el: '#app',
          methods: {
              getData: function () {
                  // this.$http.get 을 사용해서 해당 URL에서 제공하는 데이터를 받아온다.
                  this.$http.get('https://raw.githubusercontent.com/joshua1988/doit-vuejs/master/data/demo.json')
                      // .thoen() 을 통해 응답을 콘솔에 출력한다.
                      .then(function (response) {
                          console.log(response);
                          console.log(JSON.parse(response.data));
                      });
              }
          }
      });
  </script>
  </body>
  </html>
  ```

* **실행 결과**

  ![image](https://user-images.githubusercontent.com/43431081/76293272-190c4c00-62f4-11ea-932b-816d75c6a059.png)

<br>

## 액시오스

액시오스(Axios)는 **현재 뷰 커뮤니티에서 가장 많이 사용되는 HTTP 통신라이브러리이다.**

또한 액시오스는 Promise 기반의 API 형식이 다양하게 제공되어 별도의 로직을 구현할 필요 없이 주어진 API만으로도 간편하게 원하는 로직을 구현할 수 있다.

> **Promise 기반의 API 형식이란?**
>
> Promise란 서버에 데이터를 요청하여 받아오는 동작과 같은 비동기 로직 처리에 유용한 자바스크립트 객체이다.
>
> 데이터를 요청하고 받아올 때까지 기다렸다가 화면에 나타내는 로직을 실행할 때는 주로 Promise를 활용한다.

<br>

### 액시오스 설치 및 사용하기

CDN으로 사용하는 방법

```html
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

<br>

액시오스는 뷰 리소스처럼 HTTP 통신에 대해 간단하고 직관적인 API를 제공한다.

여러 설정 값을 추가하여 함께 호출할 수도 있다.

<br>

* **액시오스의 API 형식**

```javascript
// HTTP GET 요청
axios.get('URL 주소').then().catch();

// HTTP POST 요청
axios post('URL 주소').thon().catch();

// HTTP 요청에 대한 옵션 속성 저의
axios({
  method: 'get',
  url: 'URL 주소',
  ...
});
```

| API 유형                              | 처리 결과                                                    |
| ------------------------------------- | ------------------------------------------------------------ |
| axios.get('URL 주소').then().catch()  | 해당 URL 주소에 대해 HTTP GET 요청을 보낸다. <br />서버에서 보낸 데이터를 정상적으로 받아오면<br />then() 안에 정의한 로직이 실행되고,<br />데이터를 받아올 때 오류가 발생하면<br />catch()에 정의한 로직이 수행된다. |
| axios.post('URL 주소').then().catch() | 해당 URL 주소에 대해 HTTP POST 요청을 보낸다.<br />then()과 catch()의 동작은 위에서 살펴본 내용과 동일하다. |
| axios({ 옵션 속성 })                  | HTTP 요청에 대한 자세한 속성들을 직접 정의하여 보낼 수 있다.<br />데이터 요청을 보낼 URL, HTTP 요청 방식, 보내는 데이터 유형, 등등 |

<br>

* **액시오스로 데이터 받아오기**

  ```html
  <!DOCTYPE html>
  <html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
  <head>
      <meta charset="UTF-8">
      <title>Vue with Axios Sample</title>
  </head>
  <body>
  <div id="app">
      <button v-on:click="getData">프레임워크 목록 가져오기</button>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
  <!-- 액시오스 라이브러리 로딩 -->
  <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
  <script>
      new Vue({
          el: '#app',
          methods: {
              getData: function () {
                  // 액시오스 GET 요청 API
                  axios.get('https://raw.githubusercontent.com/joshua1988/doit-vuejs/master/data/demo.json')
                      .then(function (response) {
                          console.log(response);
                      });
              }
          }
      });
  </script>
  </body>
  </html>
  ```

  