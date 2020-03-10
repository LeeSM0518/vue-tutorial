# 05. 화면을 개발하기 위한 기본 지식과 팁 - 템플릿 & 프로젝트 구성

# 05-1. 뷰 템플릿

## 뷰 템플릿이란?

뷰의 템플릿(Template)은 **HTML, CSS 등의 마크업 속성과 뷰 인스턴스에서 정의한 데이터 및 로직들을 연결하여 사용자가 브라우저에서 볼 수 있는 형태의 HTML로 변환해 주는 속성이다.**

<br>

* **템플릿 속성**
  * 라이브러리 내부적으로 template 속성에서 정의한 마크업 + 뷰 데이터를 **가상 돔 기반의 render() 함수로** 변환한다.
    * render() 함수를 직접 구현할 수 있다.
    * 직접 구현하면 화면 요소의 동작 하나 하나에 직접 관여할 수 있기 때문에 더 빠르게 화면을 렌더링할 수도 있다.
  * 변환된 render() 함수는 최종적으로 사용자가 볼 수 있게 화면을 그리는 역할을 한다.
  * 변환 과정에서 뷰의 반응성(Reactivity)이 더해진다.

<br>

* **템플릿 속성 사용 방법**

  * ES5에서 뷰 인스턴스의 template 속성을 활용하는 방법

    ```html
    <script>
      new Vue({
        template: '<p>Hello {{ message }}</p>'
      });
    </script>
    ```

    * **template 속성을 사용하지 않은 경우**

      ```html
      <div id="app">
        <h3>
          {{ message }}
        </h3>
      </div>
      ...
      <script>
        new Vue({
          el: '#app',
          data: {
            message: 'Hello Vue.js!'
          }
        });
      </script>
      ```

    * **template 속성을 사용한 경우**

      ```html
      <div id="app">
      </div>
      ...
      <script>
        new Vue({
          el: '#app',
          data: {
            message: 'Hello Vue.js!'
          },
          template: '<h3>{{ message }}</h3>'
        })
      </script>
      ```

  * 싱글 파일 컴포넌트 체계의 \<template> 코드를 활용하는 방법

    * **사용 방법**

      ```html
      <!-- ES6: 싱글 파일 컴포넌트 체계 -->
      <template>
        <p>
          Hello {{ message }}
        </p>
      </template>
      ```

<br>

**템플릿에서 사용하는 뷰의 속성과 문법**

* 데이터 바인딩
* 자바스크림트 표현식
* 디렉티브
* 이벤트 처리
* 고급 템플릿 기법

<br>

## 데이터 바인딩

데이터 바인딩(Data Binding)은 **HTML 화면 요소를 뷰 인스턴스의 데이터와 연결하는 것을 의미한다.** 

주요 문법은 **{{ }}** 문법과 **v-bind** 속성이 있다.

<br>

### {{ }} - 콧수염 괄호

{{ }}는 뷰 인스턴스의 **데이터를 HTML 태그에 연결하는 가장 기본적인 텍스트 삽입 방식이다.**

* **예시**

  ```html
  <div id="app">
    {{ message }}
  </div>
  
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      }
    });
  </script>
  ```

  * data 속성의 message 값이 바뀌면 뷰 반응성에 의해 화면이 자동으로 갱신된다.

* **데이터 반응성 제거**

  만약 뷰 데이터가 변경되어도 값을 바꾸고 싶지 않다면 v-once 속성을 사용하면 된다.

  ```html
  <div id="app" v-once>
    {{ message }}
  </div>
  ```

<br>

### v-bind

v-bind는 아이디, 클래스, 스타일 등의 **HTML 속성(attributes)값에 뷰 데이터 값을 연결할 때 사용하는 데이터 연결 방식이다.**

* **예시**

  ```html
  ...
  <div id="app">
    <p v-bind:id="idA">
      아이디 바인딩
    </p>
    <p v-bind:class="classA">
      클래스 바인딩
    </p>
    <p v-bind:style="styleA">
      스타일 바인딩
    </p>
  </div>
  ...
  <script>
    new Vue({
      el: '#app',
      data: {
        idA: 10,
        classA: 'contatiner',
        styleA: 'color Blue'
      }
    })
  </script>
  ```

  * id, class, style의 앞에 v-bind를 붙여서 뷰 인스턴스에 정의한 데이터 속성과 연결한다.

<br>

## 자바스크립트 표현식

{{ }} 안에 자바스크립트 표현식을 사용할 수 있다.

* **예제**

  ```html
  <div id="app">
    <p>
      {{ message }}
    </p>
    <p>
      {{ message + "!!!" }}
    </p>
    <p>
      {{ message.split('').reverse().join('') }}
    </p>
  </div>
  ...
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      }
    });
  </script>
  ```

* **실행 결과**

  ![image](https://user-images.githubusercontent.com/43431081/76318143-9b126a00-6320-11ea-855b-4f1f731676c3.png)

<br>

### 자바스크립트 표현식에서 주의할 점

1. 자바스크림트의 선언문과 분기 구문은 사용할 수 없다.
2. 복잡한 연산은 인스턴스 안에서 처리하고 화면에는 간단한 연산 결과만 표시한다.

<br>

* **예제**

  ```html
  ...
  <div id="app">
    <!-- X, 선언문은 사용 불가능 -->
    {{ var a = 10; }}
    <!-- X, 분기 구문은 사용 불가능 -->
    {{ if (true) {return 100} }}
    <!-- O, 삼항 연산자로 표현 가능 -->
    {{ true ? 100 : 0 }}
    
    <!-- X, 복잡한 연산은 인스턴스 안에서 수행 -->
    {{ message.split('').reverse().join('') }}
    <!-- O, 스크립트에서 computed 속성으로 계산한 후 최종 값만 표현 -->
    {{ reverseMessage }}
  </div>
  ...
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      },
      // 데이터 속성을 자동으로 계산해 주는 속성
      computed: {
        // {{reversedMessage}}에 표현되기 전에 연산을 수행하는 함수
        reversedMessage: function() {
          return this.message.split('').reverse().join('');
        }
      }
    });
  </script>
  ```

  * 데이터의 기본 연산은 자바스크립트 단에서 함으로써 화면단 코드의 가독성을 높일 수 있다.
  * computed 속성을 통해 반복적인 연산에 대해서는 미리 계산하여 저장해 놓고, 필요할 때 바로 불러오는 캐싱(caching) 효과를 얻을 수 있다.

<br>

## 디렉티브

뷰 디렉티브(Directive, 지시어)란 **HTML 태그 안에 v- 접두사를 가지는 모든 속성들을 의미한다.**

* **예시**

  ```vue
  <a v-if="flag">두잇 Vue.js</a>
  ```

  * flag 값이 참이면 텍스트가 화면에 보이고 거짓이면 보이지 않는다.

<br>

디렉티브는 화면의 요소를 더 쉽게 조작하기 위해 사용하는 기능이다.

화면의 요소들이 리액티브(Reactive)하게 반응하여 변경된 데이터 값에 따라 갱신된다.

<br>

* **자주 사용하는 주요 디렉티브**

  | 디렉티브 이름 | 역할                                                         |
  | ------------- | ------------------------------------------------------------ |
  | v-if          | 지정한 뷰 데이터의 값의 참, 거짓 여부에 따라 해당 태그를 화면에 표시하거나 하지 않는다. |
  | v-for         | 지정한 뷰 데이터의 개수만큼 해당 HTML 태그를 반복 출력한다.  |
  | v-show        | v-if와 유사하게 데이터의 진위 여부에 따라 해당 태그를 화면에 표시하거나 하지 않는다.<br />v-if와 다른점은 v-if는 완전히 삭제하지만, v-show는 css 효과만 display:none으로 변경한다. |
  | v-bind        | 태그의 기본 속성과 뷰 데이터 속성을 연결한다.                |
  | v-on          | 화면 요소의 이벤트를 감지하여 처리할 때 사용한다.<br />ex) v-on:click 은 해당 태그의 클릭 이벤트를 감지한다. |
  | v-model       | 폼에 입력한 값을 뷰 인스턴스의 데이터와 즉시 동기화한다.<br />\<input>, \<select>, \<textarea> 태그에만 사용 가능하다. |

<br>

* **예시**

  ```html
  <!DOCTYPE html>
  <html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <head>
      <meta charset="UTF-8">
      <title>Vue Template - Directives</title>
    </head>
    <body>
      <div id="app">
        <a v-if="flag">두잇 Vue.js</a>
        <ul>
          <li v-for="system in systems">{{ system }}</li>
        </ul>
        <p v-show="flag">두잇 Vue.js</p>
        <h5 v-bind:id="uid">뷰 입문서</h5>
        <button v-on:click="popupAlert">경고 창 버튼</button>
      </div>
  
      <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
      <script>
        new Vue({
          el: '#app',
          data: {
            flag: true,
            systems: ['android', 'ios', 'window'],
            uid: 10
          },
          methods: {
            popupAlert: function () {
              return alert('경고 창 표시')
            }
          }
        });
      </script>
    </body>
  </html>
  ```

* **실행 결과**

  ![image](https://user-images.githubusercontent.com/43431081/76322502-d1eb7e80-6326-11ea-87bb-ba320bd1b5b8.png)

<br>

> **앵귤러 디렉티브와 뷰 디렉티브**
>
> 앵귤러와 뷰 모두 개발자가 직접 디렉티브 형식과 기능을 제작해서 사용할 수 있다.

<br>

## 이벤트 처리

뷰는 화면에서 발생한 이벤트를 처리하기 위해 **v-on 디렉티브와 methods 속성을 활용한다.**

* **v-on 디렉티브를 이용해 버튼 클릭 이벤트 처리 예시**

  ```html
  ...
  <button v-on:click="clickBtn">
    클릭
  </button>
  ...
  <script>
    methods: {
      clickBtn: function() {
        alert('clicked');
      }
    }
  </script>
  ```

* **v-on 디렉티브로 메서드 호출할 때 인자 값 넘기기**

  ```html
  ...
  <button v-on:click="clickBtn(10)">
    클릭
  </button>
  ...
  <script>
    methods: {
      clickBtn: function(num) {
        alert('clicked ' + num + ' times');
      }
    }
  </script>
  ```

* **event 인자를 이용해 돔 이벤트에 접근하기**

  ```html
  ...
  <button v-on:click="clickBtn">
    클릭
  </button>
  ...
  <script>
    methods: {
      clickBtn: function(event) {
        console.log(event);
      }
    }
  </script>
  ```

  * 콘솔을 확인해 보면 마우스 이벤트 객체가 출력되는 것을 확인할 수 있다.

    ```
    MouseEvent {isTrusted: true, screenX: 123, screeenY: 123, client:X 32, clientY: -12}
    ```

<br>

## 고급 템플릿 기법

실제 애플리케이션을 개발할 때 유용한 속성들(데이터 바인딩, 디렉티브)

<br>

### computed 속성

computed 속성은 데이터 연산들을 정의하는 영역이다.

* **예시**

  ```html
  ...
  <div id="app">
    <p>
      {{ reversedMessage }}
    </p>
  </div>
  ...
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      },
      computed: {
        reversedMessage: function() {
          return this.message.split('').reversed().join('');
        }
      }
    });
  </script>
  ```

* **computed 속성의 장점**

  * data 속성 **값의 변화에 따라 자동으로** 다시 연산한다.
  * 동일한 연산을 반복해서 하지 않고 연산의 결과 값을 미리 저장하고 있다가 필요할 때 불러오는 **캐싱 동작을 한다.**

<br>

### computed 속성과 methods 속성의 차이점

가장 큰 차이점은 methods 속성은 호출할 때만 해당 로직이 수행되고, computed 속성은 대상 데이터의 값이 변경되면 자동적으로 수행된다.

즉, 수동적으로 데이터를 갱신하느냐, 능동적으로 데이터를 갱신하느냐의 차이점이다.