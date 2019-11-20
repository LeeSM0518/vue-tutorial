# 03. 화면을 개발하기 위한 필수 단위 - 인스턴스 & 컴포넌트

## 03-1. 뷰 인스턴스

### 뷰 인스턴스의 정의와 속성

뷰 인스턴스(Instance)는 <u>뷰로 화면을 개발하기 위해 필수적으로 생성해야 하는 기본 단위입니다.</u>

<br>

#### *뷰 인스턴스 생성*

* **뷰 인스턴스 형식**

  ```vue
  new Vue({
  	...
  });
  ```

* **index.html**

  ```vue
  <html>
  <head>
      <title>Vue Sample</title>
  </head>
  <body>
  <div id="app">
      {{ message }}
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
  <!-- 인스턴스 -->
      new Vue({
          // el 속성
          el: '#app',
          // data 속성
          data: {
              message: 'Hello Vue.js!'
          }
      });
  </script>
  </body>
  </html>
  ```

  * **new Vue()** : 뷰 인스턴스 생성
    * **el 속성** : 뷰 인스턴스가 그려질 지점
    * **data 속성** : message 값을 정의하여 화면의 {{ message }} 에 연결

<br>

#### *뷰 인스턴스 생성자*

<u>new Vue()</u>

* **Vue** : 생성자로써, 뷰 라이브러리를 로딩하고 나면 접근할 수 있다. 생성자를 사용하는 이유는 **뷰로 개발할 때 필요한 기능들을 생성자에 미리 정의해 놓고** 사용자가 그 기능을 재정의하여 편리하게 사용.

<br>

### 뷰 인스턴스 옵션 속성

뷰 인스턴스 옵션 속성은 **인스턴스를 생성할 때 재정의할 data, el, template 등의** 속성을 의미한다.

* **Vue 인스턴스**

  ```vue
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      }
    });
  </script>
  ```

  * data라는 미리 정의되어 있는 속성을 사용하여, **message 라는 새로운 속성을 추가하고** 'Hello Vue.js!' 라는 값을 주었다.
  * el 속성은 **뷰로 만든 화면이 그려지는 시작점을** 의미한다.
  * 뷰 인스턴스로 화면을 렌더링할 때 화면이 그려질 위치의 돔 요소를 지정해 주어야 한다.

<br>

* **인스턴스의 el 속성**

  <img src="../capture/스크린샷 2019-11-21 오전 1.40.14.png">

  * **\#app** : 화면의 돔 요소 중 app이라는 아이디를 가진 요소를 의미
    * **\# 선택자** : CSS 선택자 규칙과 같다, [반드시 기억해야 하는 CSS 선택자 30개](https://code.tutsplus.com/ko/tutorials/the-30-css-selectors-you-must-memorize--net-16048)

<br>

* **이외의 속성들**

| 속성     | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| template | 화면에 표시할 HTML, CSS 등의 마크업 요소를 정의하는 속성     |
| methods  | 화면 로직 제어와 관계된 메서드를 정의하는 속성(이벤트 처리)  |
| created  | 뷰 인스턴스가 생성되자마자 실행할 로직을 정의할 수 있는 속성 |

<br>

### 뷰 인스턴스의 유효 범위

#### *인스턴스의 유효 범위란?*

뷰 인스턴스를 생성하면 HTML의 특정 범위 안에서만 옵션 속성들이 적용되어 나타난다.

* **인스턴스가 화면에 적용되는 과정**

  <img src="../capture/스크린샷 2019-11-21 오전 1.50.40.png" width=500>

* **코드**

  ```vue
  new Vue({
  	el: '#app',
  	data: {
  		message: 'Hello Vue.js!'
  	}
  });
  ```

<br>

#### *과정 설명*

1. 인스턴스 옵션 속성 **el과 data를 인스턴스에 정의하고** new Vue()로 **인스턴스를 생성한다.**
2. el 속성에 지정한 화면 요소에 인스턴스가 부착된다.                                               

