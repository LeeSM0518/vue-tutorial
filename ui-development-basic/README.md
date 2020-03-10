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
      
    </p>
  </div>
  ```

  

