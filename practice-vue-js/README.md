# 지금 당장 실무에서 써먹는 Vue.js

# Tip 1. 뷰와 제이쿼리를 같이 사용해도 되나요?

## 뷰에서 제이쿼리가 과연 필요할까?

많은 웹 개발자들이 제이쿼리를 선호하는 이유는 순수 자바스크립트에 비해 화면 돔 요소 조작과 ajax 같은 데이터 요청을 쉽게할 수 있기 때문이다.

정답은 '뷰에서 제이쿼리는 필요 없다' 이다. 제이쿼리처럼 **뷰에서도 화면의 요소를 쉽게 접근할 수 있는 ref 속성을 제공한다.** 또한 **화면의 특정 요소 이벤트도 v-on 디렉티브로 처리할 수 있다.** 

* **제이쿼리 코드**

  ```xquery
  // HTML 코드
  <button id="btn">시작</button>
  <p id="pEl"></p>
  
  // 스크립트 코드
  $('#btn').click(function() {
  	$('#pEl').text('jQuery');
  });
  ```

* **뷰 코드**

  ```vue
  // HTML 코드
  <button v-on:click="clickBtn">시작</button>
  <p ref="pEl"></p>
  // 스크립트 코드
  methods: {
  	clickBtn: function() {
  		this.$refs.pEl.innerText = 'Vue';
  	}
  }
  ```

결론적으로, 제이쿼리에서 구현할 수 있는 기능이라면 뷰에서도 모두 구현할 수 있다.

<br>

## 뷰와 제이쿼리의 잘못된 동거

뷰의 template 속성으로 화면을 렌더링하면 중간 과정에서 가상 돔이 개입한다. 따라서 **인스턴스 라이프 사이클을 정확히 이해하지 못한 상태에서** 제이쿼리를 함께 사용하면 오류가 발생하기 쉽다.

* **싱글 파일 컴포넌트 체계에서 잘못 구현한 제이쿼리 코드**

  ```vue
  <template>
  	<div id="app">
  		{{ msg }}
  		<button id="btn">시작</button>
  		<p id="pEl"></p>
    </div>
  </template>
  
  <script>
  	export default {
      data() {
        return {
          msg: 'Hello Vue.js!'
        }
      },
      created() {
        $('#btn').click(function() {
          $('#pEl').text('jQuery');
        });
      }
    }
  </script>
  ```

  * 동작을 시키고 버튼을 클릭해 보면 아무런 반응도 일어나지 않는다.

<br>

버튼이 정상적으로 동작하지 않는 이유는 무엇일까?

인스턴스가 생성된 시점인 **created 라이프 사이클 훅에서는 아직 화면의 돔 요소에 접근할 수 없다고 했다.**

따라서 \$('#btn')는 \<template> 상에 \<button id="btn"> 가 있더라도 코드를 실행하는 시점에서는 \<button> 태그를 인식하지 못한다. 따라서 .click() 이벤트가 수행되지 않는다.

즉, 뷰와 제이쿼리의 화면 요소 접근 방식에는 서로 차이가 있기 때문에 혼용하지 않는 것이 좋다.

<br>

# Tip 2. 개발 기간이 너무 짧은데 기존 레거시 코드에 어떻게 뷰를 바로 적용하죠?

제이쿼리 UI(jQuery UI) 같은 제이쿼리 기반의 라이브러리를 어쩔 수 없이 사용해야 하는 상황이 있을 수 있다.

그렇다면 기존 라이브러리를 안전하게 뷰에서 사용할 수 있도록 통합할 줄 알아야 한다.

이번 팁에서는 제이쿼리 UI 라이브러리 중 날짜 선택기(Date Picker)를 뷰 프로젝트에 통합해 보자.

날짜 선택기 라이브러리는 꽤 많은 곳에서 사용되고 있는 제이쿼리 플러그인이다.

<br>

## 제이쿼리와 제이쿼리 UI 라이브러리 연동

webpack-simple 프로젝트에 제이쿼리 라이브러리를 연동하는 방법은 크게 2가지이다.

* **CDN을 이용하는 방법: index.html 파일에 \<script> 추가**
* **웹팩 추가 플러그인을 사용하는 방법: 웹팩 설정 파일(webpack.config.js)에 ProvidePlugin 설정 추가**

<br>

첫 번째 방법을 사용해보자.

* **제이쿼리와 제이쿼리 UI의 CDN 주소**

  * 제이쿼리의 CDN 목록

    : https://jquery.com/download/#other-cdns

  * 제이쿼리 UI의 CDN 목록

    : https://code.jquery.com/ui/

  * 제이쿼리의 CDN 주소

    : https://ajax.googleapis/ajax/libs/jquery/3.2.1/jquery.min.js

  * 제이쿼리 UI의 CDN 주소

    : https://code.jquery.com/ui/1.12.1/jquery-ui.js

  * 제이쿼리 UI CSS의 CDN 주소

    : https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css

<br>

1. 프로젝트의 index.html 파일에 제이쿼리 CDN 주소와 제이쿼리 UI CDN 주소로 \<script> 태그를 추가한다.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <title>practice-vue-js</title>
       <!-- 제이쿼리 UI CSS의 CDN 주소-->
       <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
     </head>
     <body>
       <div id="app"></div>
       <!-- 제이쿼리 CDN 주소 -->
       <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
       <!-- 제이쿼리 UI의 CDN 주소 -->
       <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
       <script src="/dist/build.js"></script>
     </body>
   </html>
   ```

   * CDN으로 제이쿼리와 제이쿼리 UI 라이브러리를 추가한 코드

2. 이제 CDN을 이용하여 로딩한 제이쿼리와 제이쿼리 UI 라이브러리가 정상적으로 동작하는지 확인해보자.

   **App.vue**

   ```vue
   <template>
   	<div id="app">
     	App 컴포넌트
     </div>
   </template>
   
   <script>
     export default {
       created() {
         console.log($.fn.jquery);
         console.log($.ui.version);
       }
     }
   </script>
   ```

3. 개발자 도구의 콘솔의 결과를 확인한다.

   ![image](https://user-images.githubusercontent.com/43431081/78465003-65984b00-772b-11ea-889d-16605d55d35c.png)

<br>

## 제이쿼리 UI 라이브러리의 날짜 선택기 위젯 구현

4. App.vue 파일에 인풋 박스를 1개 추가하고, 클릭했을 때 .datepicker()를 호출하는 로직을 mounted() 안에 추가한다. 기존 라이브러리 버전을 확인하는 created() 코드는 삭제한다.

   ```vue
   <template>
     <div id="app">
       App 컴포넌트 <br>
       <input id="calendar">
     </div>
   </template>
   
   <script>
   export default {
     name: 'app',
     mounted() {
       $('#calendar').datepicker();
     }
   }
   </script>
   ```

   * \<input> 태그에 id 값으로 calendar를 주고, 제이쿼리 선택자 \$()를 이용하여 datepicker()를 호출하는 코드이다.
   * 여기서 중요한 점은 인스턴스 라이프 사이클 훅 중 **mounted에 제이쿼리 로직을 추가했다는 것이다.**
     * \<template> 안의 HTML 태그에 접근할 수 있는 시점이 뷰의 가상 돔이 화면의 특정 요소에 부착되고 난 시점인 **mounted()이기 때문에 제이쿼리 로직을 수행할 때는 mounted()를 사용한다.**
     * created에서는 \<template>에 정의한 돔 요소에 접근할 수 없다.

<br>

## 날짜 선택기 위젯 컴포넌트화

날짜 선택기 위젯 부분만 컴포넌트로 분리하여 관리할 수 있게 코드를 구조화해보자.

6. src 폴더 밑에 DatePicker.vue 파일을 하나 생성하고, 4번에서 제작한 날짜 선택기 코드 부분을 가져와서 코드를 구성한다.

   ```vue
   <template>
     <input id="calendar">
   </template>
   
   <script>
     export default {
       mounted() {
         $('#calendar').datepicker();
       }
     }
   </script>
   ```

<br>

7. DatePicker.vue 파일을 App.vue 파일의 지역 컴포넌트로 등록한다.

   ```vue
   <template>
     <div id="app">
       App 컴포넌트 <br>
       <DatePicker></DatePicker>
     </div>
   </template>
   
   <script>
     import DatePicker from "./DatePicker";
     export default {
       components: {
         DatePicker
       }
     }
   </script>
   ```

   * 여기서 components 속성 부분을 보면 DatePicker라고 선언하였는데 이것은 **'DatePicker': DatePicker와 동일한 동작을 한다.**
   * 그리고 \<DatePicker> 컴포넌트 태그를 추가한다.

8. 동일한 결과가 나타나는 것을 알 수 있다.

<br>

# Tip 3. 뷰에 UI 라이브러리와 차트를 어떻게 연동할까요?

부트스트랩(Bootstrap) 같은 UI 라이브러리는 뷰가 나오기 전부터 사용되던 라이브러리이기 때문에 일반적으로 제이쿼리 기반의 CDN 방식으로 제공된다.

하지만 요즘에는 앵귤러, 리액트, 뷰와 같은 프런트엔드 프레임워크의 사용이 대중화되면서 특정 프레임워크와 더 잘 결합할 수 있는 라이브러리 형태로 제공된다. **(ex. '앵귤러-부트스트랩', '리액트-부트스트랩')**

각 개발 프레임워크 커뮤니티에서 잘 겹하되어 있는 형태의 UI 라이브러리를 제공하고 있다.

<br>

## 뷰-부트스트랩 라이브러리 사용하기

https://bootstrap-vue.js.org

* 위의 홈페이지에서 [Get Started] 버튼을 클릭하여 [Getting Started](https://bootstrap-vue.js.org/docs) 페이지로 가면 뷰에 특화된 설치 방법이 나온다.

  ![image](https://user-images.githubusercontent.com/43431081/78465436-a8a8ed00-7730-11ea-94c9-9b5dd08b0fc7.png)

<br>

## 뷰와 일반 부트스트랩 라이브러리 연동하기

먼저 외부 라이브러리를 연동하기 위한 뷰 프로젝트를 생성한다. 그리고 부트스트랩 라이브러리는 CDN으로 로딩한다.

* **부트스트랩 라이브러리 CDN 주소** : https://getbootstrap.com/docs/4.0/getting-started/introduction

| CDN 용도                | URL 이름                                                     |
| ----------------------- | ------------------------------------------------------------ |
| 부트스트랩 CSS          | https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css |
| 부트스트랩 자바스크립트 | https://code.jquery.com/jquery-3.2.1.slim.min.js<br />https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js<br />https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js |

<br>

1. index.html에 부트스트랩 CSS CDN, 자바스크립트 CDN을 각각 추가한다.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="utf-8">
       <title>vue-ui-chart</title>
       <!-- 제이쿼리 UI CSS의 CDN 주소-->
       <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
     </head>
     <body>
       <div id="app"></div>
       <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
       <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
       <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
       <script src="/dist/build.js"></script>
     </body>
   </html>
   ```

2. App.vue에 있는 기존 코드를 모두 정리하고 부트스트랩의 간단한 버튼을 추가하는 코드를 삽입한다.

   ```vue
   <template>
     <div id="app">
       <button type="button" class="btn btn-primary btn-lg">
         Large button
       </button>
     </div>
   </template>
   
   <script>
   export default {
     name: 'app',
     data() {
       return {
         msg: 'Welcome to Your Vue.js App'
       }
     }
   }
   </script>
   ```

3. 실행 결과

   <img src="https://user-images.githubusercontent.com/43431081/78466021-b31ab500-7737-11ea-8968-121396979bff.png" alt="image" style="zoom:53%;" />

<br>

## 뷰와 차트 라이브러리 연동하기

기존의 차트 라이브러리 역시 뷰와 함께 사용할 줄 알아야 실무 레벨에서의 애플리케이션 개발이 가능합니다.

차트 라이브러리는 **하이 차트(HighChart)를** 사용해보자.

<br>

4. 앞에서 구축한 프로젝트의 index.html에 하이 차트의 CDN 주소를 추가하자.

   ```html
   <body>
     <div id="app"></div>
     <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
     <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"></script>
     <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"></script>
     <!-- 하이 차트 CDN 주소 -->
     <script src="https://code.highcharts.com/highcharts.js"></script>
     <script src="/dist/build.js"></script>
   </body>
   ```

5. src 폴더 밑에 Chart.vue 파일을 새로 생성하고 코딩한다.

   ```vue
   <template>
       <div id="container" style="width: 100%; height: 400px"></div>
   </template>
   
   <script>
       export default {
           name: "Chart",
           mounted() {
             Highcharts.chart('container', {
               chart: {
                 type: 'bar'
               },
               title: {
                 text: 'Fruit Consumption'
               },
               xAxis: {
                 categories: ['Apples', 'Bananas', 'Oranges']
               },
               yAxis: {
                 title: {
                   text: 'Fruit eaten'
                 }
               },
               series: [{
                 name: 'Jane',
                 data: [1, 0, 4]
               }, {
                 name: 'John',
                 data: [5, 7, 3]
               }]
             });
         }
       }
   </script>
   ```

   * 차트를 연동하기 위해 \<template> 안에는 차트를 표시할 간단한 \<div> 태그를 지정하고 너비와 높이를 지정한다.
   * \<script>에는 mounted()를 추가하고 하이 차트에서 제공하는 막대 차트 예제 코드를 추가한다.

   <br>

6. App.vue에서 Chart.vue를 컴포넌트로 등록하고 \<template>에 컴포넌트 태그를 추가한다.

   ```vue
   <template>
   <div id="app">
     <button type="button" class="btn btn-primary btn-lg">
       Large button
     </button>
     <!-- 차트 표시 -->
     <Chart></Chart>
     </div>
   </template>
   
   <script>
     // 차트 컴포넌트 로딩
     import Chart from "./Chart";
     export default {
       name: 'app',
       data() {
         return {
           msg: 'Welcome to Your Vue.js App'
         }
       },
       // 차트 컴포넌트 등록
       components: {
         Chart
       }
     }
   </script>
   ```

<br>

# Tip 4. 뷰로 프로그레시브 웹 앱을 개발하려면 어떻게 시작해야 하죠?

프로그레시브 웹 앱(PWA, Progressive Web App)이 뭔지 그리고 뷰로 어떻게 프로그레시브 웹 앱을 개발할 수 있는지 살펴보자.

<br>

## 프로그레시브 웹 앱이란?

기존의 브라우저에서 웹 앱을 나타내는 방식에서 한 걸음 나아가 사용자들에게 편의성과 접근성을 제공하는 웹 앱이 바로 프로그레시브 웹 앱입니다.

<br>

## 뷰로 어떻게 프로그레시브 웹 앱을 구현할 수 있을까요?

뷰 CLI에서 프로그레시브 웹 앱을 잘 몰라도 뷰와 프로그레시브 웹으로 구성된 프로젝트를 생성할 수 있는 프로젝트 템플릿을 제공한다 **(vue init pwa 옵션)** .

그럼 뷰 CLI를 이용하여 뷰와 프로그레시브 웹 앱 프로젝트를 구성해보자.

<br>

먼저 빈 폴더를 하나 생성한다.

1. vue-pwa 폴더를 만들고 뷰 프로그레시브 웹 앱 프로젝트를 생성한다.

   ```bash
   bash $ vue init pwa           
   
   // 현재 디렉터리에 프로젝트를 생성?
   ? Generate project in current directory? Yes
   // 프로젝트 이름은?
   ? Project name vue-pwa
   // PWA 시작 화면에 표시될 프로젝트 이름은?
   ? Project short name: fewer than 12 characters to not be truncated on homescreens (default: same as name) 
   // 프로젝트 정보?
   ? Project description A Vue.js project
   // 제작자 이름?
   ? Author sangminLee <nalsm98@naver.com>
   // 빌드 방식?
   ? Vue build standalone
   // 뷰 라우터 설치 여부?
   ? Install vue-router? No
   // 문법 검사 라이브러리를 설치할까요?
   ? Use ESLint to lint your code? No
   // 단위 테스트 라이브러리를 설치할까요?
   ? Setup unit tests with Karma + Mocha? No
   // End to End 테스트 라이브러리를 설치할까요?
   ? Setup e2e tests with Nightwatch? No
   ```

2. `npm install` 을 이용해 package.json 파일에 설정된 라이브러리를 설치한다.

3. `npm run dev` 명령어를 입력해 프로젝틀를 실행한다.