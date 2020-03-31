# 06. 실전 애플리케이션 만들기

<br>

# 06-1.  할 일 관리 앱 살펴보기

## 애플리케이션 컴포넌트 구조도

![image](https://user-images.githubusercontent.com/43431081/77997763-eab9e380-736a-11ea-83db-d30e61d9c131.png)

* 이처럼 여러 컴포넌트로 쪼개는 이유는 대부분의 컴포넌트 기반 프레임워크(앵귤러, 리액트)에서 추구하는 재사용성과 연관이 있다.

<br>

# 06-2. 프로젝트 생성하고 구조 확인하기

1. 뷰 CLI로 프로젝트를 생성한다.

   ```bash
   ~/vue-tutorial/create-application$ vue init webpack-simple
   
   ? Generate project in current directory? Yes
   ? Project name vue-todo
   ? Project description A Vue.js project
   ? Author sangminlee <nalsm0518@gmail.com>
   ? License MIT
   ? Use sass? No
   
      vue-cli · Generated "create-application".
   
      To get started:
      
        npm install
        npm run dev
   ```

2. `npm install` 명령어를 입력하여 package.json 파일에 등록된 자바스크립트 라이브러리를 모두 다운로드한다.

   ```bash
   ~/vue-tutorial/create-application$ npm install
   ...
   ```

3. `npm run dev` 를 실행하여 애플리케이션이 정상적으로 실행되는지 확인한다.

   ```bash
   ~/vue-tutorial/create-application$ npm run dev
   
   ```

<br>

## 프로젝트 초기 설정

#### 반응형 웹 디자인 태그 설정

반응형 웹 디자인(Responsive Web Design)은 어느 기기에서도 깨지지 않는 자연스러운 레이아웃을 제공하는 웹 디자인 방법이다.

반응형 웹 디자인으로 만들어주기 위해서 **\<head> 태그에 아래와 같이 \<meta> 태그를 추가한다.**

```html
<haed>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vue.js Todo</title>
</haed>
```

* **width=device-width** : 기기의 너비만큼 웹 페이지의 너비를 지정하라는 의미이다.
* **initial-scale=1.0** : 페이지의 배율로, 페이지가 로딩되었을 때 줌(zoom) 레벨을 의미한다.

<br>

### 어썸 아이콘 CSS 설정

버튼은 일반 문자열 대신 **어썸 아이콘(Awesome Icon)을** 활용한다.

어썸 아이콘을 사용하려면 다음과 같이 **\<head> 태그에 \<link> 태그를 추가한다.**

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css">
  <title>Vue.js Todo</title>
</head>
```

<br>

### 폰트와 파비콘 설정

애플리케이션에서 사용할 폰트(font)와 파비콘(favicon)을 설정한다.

**파비콘은** 브라우저로 웹 앱을 실행했을 때 **웹 사이트 제목의 왼쪽에 표시되는 로그를 의미한다.** 

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css">
  <link rel="shortcut icon" href="src/assets/favicon.ico" type="image/x-icon">
  <link rel="icon" href="src/assets/favicon.ico" type="image/x-icon">
  <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
  <title>vue-todo</title>
</head>
```

<br>

# 06-3. 컴포넌트 생성하고 등록하기

## 컴포넌트 생성

컴포넌트 같은 경우에는 관례상 **src/components 폴더에 관리를 한다.** 이렇게 한 곳에 모아 노으면 폴더 구조도 깔끔하고 추후에 재활용할 때도 접근하기 쉽다.

> 애플리케이션의 규모가 커서 기능별로 관리를 해야 할 경우에는 'components/기능/컴포넌트.vue'와 같은 형식으로 관리하는게 좋다.
>
> ex) components/login/LoginForm.vue, components/login/LoginSNS.vue

<br>

각 컴포넌트를 한 눈에 구분할 수 있도록 간단한 코드를 삽입한다.

* **TodoHeader.vue**

  ```vue
  <template>
  <div>header</div>
  </template>
  
  <script>
    export default {
      name: "TodoHeader"
    }
  </script>
  
  <style scoped>
  
  </style>
  ```

* **TodoInput.vue**

  ```vue
  <template>
    <div>input</div>
  </template>
  
  <script>
    export default {
      name: "TodoInput"
    }
  </script>
  
  <style scoped>
  
  </style>
  ```

* **TodoList.vue**

  ```vue
  <template>
  <div>list</div>
  </template>
  
  <script>
    export default {
      name: "TodoList"
    }
  </script>
  
  <style scoped>
  
  </style>
  ```

* **TodoFooter.vue**

  ```vue
  <template>
  <div>footer</div>
  </template>
  
  <script>
    export default {
      name: "TodoFooter"
    }
  </script>
  
  <style scoped>
  
  </style>
  ```

.vue 파일의 기본 구조에서 \<template> 영역에 \<div> 태그를 추가했다. 이렇게 하면 **컴포넌트를 등록했을 때 다른 컴포넌트와의 구분이 쉬워진다.**

<br>

## 컴포넌트 등록

앞에서 생성한 4개의 컴포넌트를 등록하여 화면에 나타내보자.

* **src/App.vue**

  ```vue
  <template>
    <div id="app"></div>
  </template>
  
  <script>
    export default {
      
    }
  </script>
  
  <style>
  </style>
  ```

<br>

* **지역 컴포넌트 등록 형식**

  ```js
  components: {
  	'컴포넌트 이름': 컴포넌트 이름
  }
  ```

* 지역 컴포넌트 등록 형식을 App.vue 파일에 적용

  ```vue
  <script>
    export default {
      components: {
        'TodoHeader': TodoHeader,
        'TodoInput': TodoInput,
        'TodoList': TodoList,
        'TodoFooter': TodoFooter
      }
    }
  </script>
  ```

  * 아직 4개의 컴포넌트 파일 내용을 불러오는 코드를 추가하지 않았기 때문에 App.vue 파일에서 TodoHeader.vue 등을 인식하지 못 한다.

<br>

**싱글 파일 컴포넌트 체계(.vue 파일 체계)에서는** 특정 컴포넌트에서 다른 위치에 있는 컴포넌트의 내용을 불러올 때 아래 형식을 사용한다.

* 컴포넌트 내용을 불러오기 위한 ES6 import 구문

  ```js
  import 불러온 파일의 내용이 담긴 객체 from '불러올 파일 위치';
  ```

<br>

App.vue 파일에서 다른 컴포넌트의 내용을 import from 구문으로 다 받아와서 components 속성에 연결해 주면 된다.

* **src/App.vue**

  ```vue
  <template>
    <div id="app"></div>
  </template>
  
  <script>
    import TodoHeader from "./component/TodoHeader";
    import TodoFooter from "./component/TodoFooter";
    import TodoInput from "./component/TodoInput";
    import TodoList from "./component/TodoList";
    
    export default {
      components: {
        'TodoHeader': TodoHeader,
        'TodoInput': TodoInput,
        'TodoList': TodoList,
        'TodoFooter': TodoFooter
      }
    }
  </script>
  
  <style>
  </style>
  ```

<br>

마지막으로 컴포넌트 태그 4개를 App.vue의 \<div id="app"> 태그 안에 추가한다.

* **src/App.vue**

  ```vue
  <template>
  	<div id="app">
      <TodoHeader></TodoHeader>
      <TodoInput></TodoInput>
      <TodoList></TodoList>
      <TodoFooter></TodoFooter>
    </div>
  </template>
  
  ...
  ```

<br>

# 06-4. 컴포넌트 내용 구현하기

* **컴포넌트별로 구현할 기능**
  * TodoHeader: 애플리케이션 이름 표시
  * TodoInput: 할 일 입력 및 추가
  * TodoList: 할 일 목록 표시 및 특정 할 일 삭제
  * TodoFooter: 할 일 모두 삭제

<br>

## 애플리케이션 제목을 보여주는 TodoHeader 컴포넌트

### 애플리케이션 제목 추가하기

* **src/component/TodoHeader.vue**

  ```vue
  <template>
    <header>
      <h1>TODO it!</h1>
    </header>
  </template>
  
  <script>
    export default {
      name: "TodoHeader"
    }
  </script>
  
  <style scoped>
  
  </style>
  ```

<br>

### CSS로 제목 꾸미기

제목의 스타일링을 위해 최상위 컴포넌트인 App.vue와 TodoHeader.vue에 다음과 같이 CSS를 추가한다.

* **src/App.vue의 CSS 스타일**

  ```vue
  <style>
    body {
      text-align: center;
      background-color: #F6F6F8;
    }
    input {
      border-style: groove;
      width: 200px;
    }
    button {
      border-style: groove;
    }
    .shadow {
      box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03);
    }
  </style>
  ```

* **src/components/TodoHeader.vue의 CSS 스타일**

  ```vue
  <style scoped>
    h1 {
      color: #2F3B52;
      font-weight: 900;
      margin: 2.5rem 0 1.5rem;
    }
  </style>
  ```

<br>

App.vue와 TodoHeader.vue에 추가한 스타일

| 컴포넌트       | CSS 속성         | 설명                                                         |
| -------------- | ---------------- | ------------------------------------------------------------ |
| App.vue        | background-color | 애플리케이션 전체의 배경 색을 꾸미기 위해 지정               |
| "              | text-align       | 애플리케이션 전체에서 사용하는 텍스트의 정렬 방식 선택       |
| "              | border-style     | 할 일을 입력하는 인풋 박스의 테두리 모양을 정의              |
| "              | box-shadow       | 할 일을 입력하는 인풋 박스와 할 일 아이템의 아래 그림자 정의 |
| TodoHeader.vue | color            | 애플리케이션 제목의 텍스트 색깔을 지정                       |
| "              | font-weight      | 애플리케이션 제목의 텍스트 굵기를 지정                       |
| "              | margin           | 애플리케이션 제목의 텍스트 여백을 지정                       |

* \<style> 태그에 사용된 **scoped는** 뷰에서 지원하는 속성이며, **스타일 정의를 해당 컴포넌트에만 적용하겠다는 의미이다.**

<br>

## 할 일을 입력하는 TodoInput 컴포넌트

### 인풋 박스와 버튼 추가하기

* **src/component/TodoInput.vue**

  ```vue
  <template>
    <div>
      <input type="text" v-model="newTodoItem">
      <button>추가</button>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          newTodoItem: ''
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  ```

  * 인풋 박스에 텍스트를 입력했을 때 **뷰 인스턴스에서 텍스트 값을 인식할 수 있게 v-model 디렉티브와 데이터 속성 newTodoItem을** 추가한다.

<br>

### 텍스트를 저장하기 위한 버튼 이벤트 추가하기

입력한 텍스트 값을 데이터 저장소인 로컬 스토리지에 저장해보자.

즉, [추가] 버튼을 클릭했을 때 특정 동작을 수행할 수 있게 **v-on:click에 버튼 이벤트 addTodo를 지정한다.**

그리고 버튼 이벤트 **addTodo()의 로직은 methods에 정의한다.**

* **src/component/TodoInput.vue**

  ```vue
  <template>
    <div>
      <input type="text" v-model="newTodoItem">
      <button v-on:click="addTodo">추가</button>
    </div>
  </template>
  
  <script>
    export default {
      data() {
        return {
          newTodoItem: ''
        }
      },
      methods: {
        addTodo() {
          console.log(this.newTodoItem);
        }
      }
    }
  </script>
  
  <style scoped>
  
  </style>
  ```