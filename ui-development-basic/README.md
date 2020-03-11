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

* **computed 속성과 methods 속성의 차이점**

  ```html
  ...
  <div id="app">
    <p>
      {{ message }}
    </p>
    <button v-on:click="reverseMsg">
      문자열 역순
    </button>
  </div>
  ...
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js'
      },
      methods: {
        reverseMsg: function() {
          this.message = this.message.split('').reverse().join('');
          return this.message;
        }
      }
    });
  </script>
  ```

  * methods 속성은 수행할 때마다 연산을 하기 때문에 별도로 캐싱을 하지 않는다.
  * computed 속성은 데이터가 변경되지 않는 한 이전의 계산 값을 가지고 있다가 필요할 때 바로 반환해준다.
  * 따라서 복잡한 연산을 반복 수행해서 화면에 나타내야 한다면 computed 속성을 이용하는 것이 효율적이다.

<br>

### watch 속성

watch 속성은 **데이터 변화를 감지하여 자동으로 특정 로직을 수행한다.** 이 속성은 데이터 호출과 같이 시간이 상대적으로 더 많이 소모되는 비동기 처리에 적합하다.

> **비동기 처리란?**
>
> 다른 자바스크립트 연산에 영향을 주지 못하도록 별도의 영역에서 해당 데이터를 요청하고 응답을 기다린다.

<br>

* **watch 속성 예시**

  ```html
  ...
  <div id="app">
    <input v-model="message">
  </div>
  ...
  <script>
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      },
      watch: {
        message: function(data) {
          console.log("message의 값이 바뀐다 : ", data);
        }
      }
    });
  </script>
  ```

<br>

### 예제) 앞에서 배운 뷰 템플릿 속성 중 {{ }} 문법과 v-bind 디렉티브를 이용한 데이터 바인딩, v-on 디렉티브와 v-if 디렉티브를 직접 사용해 보자.

```html
<!DOCTYPE html>
<html lang="en" xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="UTF-8">
    <title>Problem2</title>
</head>
<body>
<div id="app">
    <header>
        {{ message }},
        {{ message2 }}
        <!-- 새로 추가한 데이터 속성을 아래에 추가 -->
    </header>
    <section>
        <!-- uid 값을 변경한 후 크롬 개발자 도구의
        '요소 검사' 기능으로 아래 p 태그의 id 값 확인-->
        <p v-bind:id="uid"></p>
        <button v-on:click="clickBtn">alert</button>
        <!-- 위 코드와 아래 코드는 동이한 역할을 수행. v-on:를 간소화한 문법은 @-->
        <button @click="clickBtn2">alert</button>

        <!-- button 태그를 추가하고 새로 추가한 클릭 메서드를 연결-->

        <!-- 데이터의 flag 속성 값의 변화에 따라 아래 내용이 어떻게 변하는지 확인-->
        <ul v-if="flag">
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
    </section>
</div>
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: {
            message: 'Hello Vue.js',
            /* 새로운 데이터 속성을 1개 추가하고, {{ }} 데이터 바인딩을 이용*/
            message2: 'Example message',

            uid: '100',
            /* uid를 변경하고 해당 uid의 변경 여부를 크롬 개발자 도구로 확인*/

            flag: false
            /* flag 값을 false로 변경했을 때 화면 변화 확인*/
        },
        methods: {
            clickBtn() {
                console.log("hi");
            },
            /* eventMethod를 하나 추가하고 index.html의 해당 이벤트를 실행하는 버튼 추가 */
            clickBtn2() {
                console.log('hi2')
            },
        }
    })
</script>
</body>
</html>
```

**실행 결과**

![image](https://user-images.githubusercontent.com/43431081/76381381-ae611c00-6398-11ea-939d-824435b8b124.png)

<br>

# 05-2. 뷰 프로젝트 구성 방법

## HTML 파일에서 뷰 코드 작성 시의 한계점

```html
...
<div id="app">
  <my-component></my-component>
  <your-component></your-component>
</div>
...
<script>
  Vue.component('my-component', {
    template: '<div><h5>complex</h5><ul><li><button>...'
  });

  Vue.component('your-component', {
    template: '<div><span>...'
  });

  new Vue({
    el: '#app',
    data: {
      message: 'click this button'
    }
  });
</script>
...
```

* 파일 구조의 한계점이 존재한다.
* \<script> 태그 안에서 HTML 코드는 구문 강조가 적용되지 않기 때문에 오탈자를 찾기가 어렵다.

<br>

## 싱글 파일 컴포넌트 체계

위와 같은 문제점을 해결하는 방법이 바로 **싱글 파일 컴포넌트(Single File Components) 체계이다.**

싱글 파일 컴포넌트 체계란 **.vue 파일로 프로젝트 구조를 구성하는 방식이다.**

.vue 파일 1개는 뷰 애플리케이션을 구성하는 1개의 컴포넌트와 동일하다.

* **.vue 기본 구조**

  ```vue
  <template>
  	<!-- HTML 태그 내용 -->
  	<!-- 화면에 표시할 요소들을 정의하는 영역 -->
  </template>
  
  <script>
    export default {
      // 자바스크립트 내용
      // 뷰 컴포넌트의 내용을 정의하는 영역
    }
  </script>
  
  <style>
    /* CSS 스타일 내용 */
    /* 템플릿에 추가한 HTML 태그의 CSS 스타일을 정의하는 영역 */
  </style>
  ```

* **예시**

  ```vue
  <template>
  	<div>
  	  <span>
  	    <button>
    	    {{ message }}
    		</button>
  	  </span>
    </div>
  </template>
  
  <script>
    export default {
      data: {
        message: 'click this button'
      }
    }
  </script>
  
  <style>
    span {
      font-size: 1.2em;
    }
  </style>
  ```

  * **\<template>** : HTML 태그와 뷰 데이터 바인딩 값
  * **\<script>** : 뷰 컴포넌트에서 사용할 속성들 정의
  * **\<style>** : HTML 태그의 스타일 속성들을 정의

<br>

## 뷰  CLI

.vue 파일을 웹 브라우저가 인식할 수 있는 형태의 파일로 변환해 주는 **웹팩(Webpack)이나 브라우저리파이(Browserify)와** 같은 도구가 필요하다.

* **웹팩** : 웹 앱의 자원(HTML, CSS, 이미지)들을 자바스크립트 모듈로 변환해 하나로 묶어 웹 성능을 향상시켜 주는 자바스크립트 모듈 번들러(module bundler)이다.
* **브라우저리파이** : 웹팩과 유사한 모듈 번들러지만 웹 자원 압축이나 빌드 자동화 같은 기능이 없다.

<br>

뷰는 편하게 프로젝트를 구성할 수 있도록 **CLI(Command Line Interface) 도구를** 제공한다.

<br>

### 뷰  CLI 설치

1. 설치를 위해 터미널을 실행한 후 `npm install vue-cli -global` 을 입력한다.
2. 설치가 완료된 후 `vue` 를 입력했을 때, 에러가 발생하지 않으면 명령어를 인식한다는 의미이다.

<br>

### 뷰  CLI 명령어

뷰 개발을 시작할 때 초기 프로젝트를 쉽게 구성해 주는 명령어는 `vue init` 이다.

`vue init` 명령어를 입력할 때 사용하는 프로젝트 템플릿 종류는 6가지 이다.

* **템플릿 종류**

  | 템플릿 종류                  | 설명                                                         |
  | ---------------------------- | ------------------------------------------------------------ |
  | `vue init webpack`           | 고급 웹팩 기능을 활용한 프로젝트 구성 방식.<br />테스팅, 문법 검사 등을 지원 |
  | `vue init webpack-simple`    | 웹팩 최소 기능을 활용한 프로젝트 구성 방식.<br />빠른 화면 프로토타이핑용 |
  | `vue init browserify`        | 고급 브라우저리파이 기능을 활용한 프로젝트 구성 방식.<br />테스팅, 문법 검사 등을 지원 |
  | `vue init browserify-simple` | 브라우저파이 최소 기능을 활용한 프로젝트 구성 방식.<br />빠른 화면 프로토타이핑용 |
  | `vue init simple`            | 최소 뷰 기능만 들어간 HTML 파일 1개 생성                     |
  | `vue init pwa`               | 웹팩 기반의 프로그레시브 웹 앱(PWA, Progressive Web App)<br />기능을 지원하는 뷰 프로젝트 |

<br>

**템플릿의 내용의 전체적인 맥락**

* 웹팩이나 브라우저파이 같은 모듈 번들러를 프로젝트 자체에 포함하여 바로 사용할 수 있다
* .vue 파일을 HTML, CSS, 자바스크립트 파일로 변환해 주기 위한 뷰 로더(Vue Loader)를 포함하고 있다.

> 즉, .vue 파일 방식으로 애플리케이션을 개발하려면 **뷰 로더와 이를 지원하는 웹팩, 브라우저파이 같은 모듈 번들러가** 필요하다는 것을 알 수 있다.

<br>

기타 기능에 신경 쓰지 않고 뷰 프레임워크 자체에 가장 집중할 수 있는 템플릿은 **webpack-simple** 이다.

webpack-simple 템플릿은 **뷰로 개발하기 위한 웹팩의 최소 기능들만 있어 프로젝트 구성 자체가 간단하다.**

<br>

## 뷰  CLI로 프로젝트 생성하기

1. 뷰 프로젝트를 생성할 빈 폴더를 하나 생성하고, 빈 폴더에서 명령 프롬프트 창을 열어 `vue init webpack-simple` 을 입력한다.

2. `vue init webpack-simple` 입력 후

   ```sh
   ~/vue-tutorial/ui-development-basic/new-vue-project $ vue init webpack-simple
   
   ? Generate project in current directory? Yes
   ? Project name cli-template
   ? Project description A Vue.js project
   ? Author sangminLee <nalsm98@naver.com>
   ? License MIT
   ? Use sass? No
   
      vue-cli · Generated "new-vue-project".
   
      To get started:
      
        npm install
        npm run dev
   ```

   * **Generate project in current directory?** Yes
     * 현재 디렉터리에 프로젝트를 생성할 것인가?
   * **Project name** cli-template
     * 프로젝트 이름은?
   * **Project description** A Vue.js project
     * 프로젝트 설명은?
   * **License** MIT
     * 라이선스 유형은?
   * **Use saas?** No
     * Saas를 사용할 것인가?

3. `npm install` 을 입력하여 뷰 애플리케이션을 구동하기 위한 관련 라이브러리를 모두 다운로드한다.

   * **node_modules**

     : npm install 명령어로 다운받은 라이브러리가 존재하는 위치

   * **src**

     : .vue 파일을 비롯하여 애플리케이션이 동작하는 데 필요한 로직이 들어갈 위치

   * **index.html**

     : 뷰로 만든 웹 앱의 시작점. npm run dev 실행시 로딩되는 파일

   * **package.json**

     : npm 설정 파일. 뷰 애플리케이션이 동작하는 데 필요한 라이브러리들을 정의하는 파일

   * **webpack.config.js**

     : 웹팩 설정 파일. 웹팩 빌드를 위해 필요한 로직들을 정의하는 파일

<br>

* **package.json**

  ```json
  {
    // 프로젝트 정보
    "name": "cli-template",
    "description": "A Vue.js project",
    "version": "1.0.0",
    "author": "sangminLee <nalsm98@naver.com>",
    "license": "MIT",
    "private": true,
    
    // npm 실행 명령어
    "scripts": {
      "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
      "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
    },
    
    // 뷰, 웹팩 관련 라이브러리
    "dependencies": {
      "vue": "^2.5.11"
    },
    "browserslist": [
      "> 1%",
      "last 2 versions",
      "not ie <= 8"
    ],
    "devDependencies": {
      "babel-core": "^6.26.0",
      "babel-loader": "^7.1.2",
      "babel-preset-env": "^1.6.0",
      "babel-preset-stage-3": "^6.24.1",
      "cross-env": "^5.0.5",
      "css-loader": "^3.4.2",
      "file-loader": "^1.1.4",
      "vue-loader": "^13.0.5",
      "vue-template-compiler": "^2.4.4",
      "webpack": "^4.42.0",
      "webpack-dev-server": "^2.9.1"
    }
  }
  ```

  * npm install 명령어를 실행하면 package.json의 라이브러리 목록이 전부 프로젝트의  node_modules 폴더 밑에 설치된다.

<br>

마지막으로 `npm run dev` 를 실행하면 브라우저가 실행되면서 애플리케이션이 실행된다.

<br>

## 뷰 로더

뷰 로더(Vue Loader)는 **웹팩에서 지원하는 라이브러리입니다.** 뷰 로더는 **싱글 파일 컴포넌트 체계에서 사용하는  .vue 파일의 내용을 브라우저에서 실행 가능한 웹 페이지의 형태로 변환해준다.**

웹팩에 설정된 뷰 로더가 변환 기능을 수행한다. 웹팩은 자바스크립트 모듈만 인식할 수 있기 때문에 뷰 로더가  .vue 파일을 일단 자바스크립트 모듈로 변환한다.

필요에 따라 웹팩의 추가 플러그인을 이용하면 웹팩으로 변환된 자바스크립트 모듈을 CSS나 HTML 파일로 분리할 수 있다.

<br>

### 웹팩 설정 파일의 뷰 로더 속성 확인

* **webpack.config.js**

  ```js
  ...
    module: {
      rules: [
        {
          // 대상 파일 지정
          test: /\.vue$/,
          // 사용할 로더 지정
          loader: 'vue-loader',
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        ...
  ```

  * module과  rules는 웹팩의 **로더(Loader)를** 설정하는 속성이다.
  * **test 속성** : 로더가 적용될 대상 파일을 지정하는 속성
    * **/\\ . vue$/** : .vue 확장자를 가진 파일을 모두 선택하여 뷰 로더를 적용하는 코드이다.
  * **loader 속성** : 적용할 로더의 종류를 지정하는 속성

<br>

* **뷰 CLI로 프로젝트를 구성하는 과정**

  ![image](https://user-images.githubusercontent.com/43431081/76388956-a5c71080-63ad-11ea-9683-b1c2095b21b4.png)