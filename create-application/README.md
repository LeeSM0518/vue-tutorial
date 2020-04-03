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

<br>

### 입력받은 텍스트를 로컬 스토리지에 저장하기

입력받은 텍스트를 로컬 스토리지의 **setItem()** API를 이용하여 저장한다.

setItem()는 **로컬 스토리지에 데이터를 추가하는 API이다.** API 형식은 키, 값 형태이며 저장 기능을 최대한 단순하게 하기 위해 키, 값 모두 입력받은 텍스트로 지정한다.

```js
methods: {
  addTodo() {
    localStorage.setItem(this.newTodoItem, this.newTodoItem)
  }
}
```

<br>

크롬 개발자 도구의 [Application => Local Storage => http://localhost:8080]을 클릭해 확인한다.

![image](https://user-images.githubusercontent.com/43431081/78099386-b30b7400-741c-11ea-87fa-02cbbf551998.png)

<br>

### addTodo() 안에 예외 처리 코드 넣기

인풋 박스에 입력된 텍스트가 없을 경우 로컬 스토리지에 데이터가 저장되지 않게 예외 처리 코드를 추가해 보자.

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
          // 인풋 박스의 입력 값이 있을 때만 저장
          if (this.newTodoItem !== "") {
            // 인풋 박스에 입력된 텍스트의 앞뒤 공백 문자열 제거
            var value = this.newTodoItem && this.newTodoItem.trim();
            localStorage.setItem(value, value);
            // 인풋 박스의 입력 값을 초기화
            this.clearInput();
          }
        },
        clearInput() {
          this.newTodoItem = '';
        }
      }
    }
  </script>
  
  <style scoped>
  </style>
  ```

  * addTodo() 메서드 안에서  **this를** 사용하면 해당 컴포넌트(여기서는 App)를 가리킨다.
  * addTodo() 에서  this를 사용하면 clearInput() 메서드에 접근할 수 있다.

<br>

> **디자인 패턴: 단일 책임 원칙**
>
> 단일 책임 원칙(Single Responsibility Principle)이란 함수 하나가 하나의 기능만 담당하도록 설계하는 객체 지향 프로그래밍의 디자인 패턴이다.

<br>

### 아이콘 이용해 직관적인 버튼 모양 만들기

앞에서 설치한 어썸 아이콘의 + 아이콘을 이용하면 더 직관적인 버튼 모양을 만들 수 있다.

* **src/components/TodoInput.vue**

  ```vue
  <template>
    <div class="inputBox shadow">
      <!-- placeholder: 인풋 박스의 힌트 속성 -->
      <!-- v-on:keyup.enter: 인풋 박스에서 enter를 눌렀을 때 동작하는 속성 -->
      <input type="text" v-model="newTodoItem" placeholder="Type what you have to do"
             v-on:keyup.enter="addTodo">
      <!-- <span>: <button> 대신 클릭 이벤트를 받을 태그 -->
      <span class="addContainer" v-on:click="addTodo">
        <!-- <i class="fa fa-plus">: 어썸 아이콘의 + 아이콘을 추가 -->
        <i class="addBtn fas fa-plus" aria-hidden="true"/>
      </span>
    </div>
  </template>
  
  ...
  ```

<br>

TodoInput 컴포넌트의 CSS 코드를 추가해보자.

* **src/components/TodoInput.vue**

  ```vue
  ...
  
  <style scoped>
    input:focus {
      outline: none;
    }
    .inputBox {
      background: white;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
    }
    .inputBox input {
      border-style: none;
      font-size: 0.9rem;
    }
    .addContainer {
      float: right;
      background: linear-gradient(to right, #6478FB, #8763FB);
      display: block;
      width: 3rem;
      border-radius: 0 5px 5px 0;
    }
    .addBtn {
      color: white;
      vertical-align: middle;
    }
  </style>
  ```

<br>

**\<style> 변경 내용**

| CSS 속성      | 설명                                                |
| ------------- | --------------------------------------------------- |
| outline       | 할 일을 입력하는 인풋 박스의 선 스타일 지정         |
| background    | 인풋 박스의 배경색 지정                             |
| height        | 인풋 박스의 높이 설정                               |
| line-height   | 인풋 박스에 입력되는 텍스트의 중앙 정렬을 위해 설정 |
| border-radius | 인풋 박스의 둥근 테두리 속성 설정                   |
| float         | 할 일 추가 버튼이 표시될 위치 정의                  |
| vertial-align | 할 일 추가 아이콘의 수직 정렬 정의                  |

<br>

**실행 결과**

<img src="https://user-images.githubusercontent.com/43431081/78100215-1d251880-741f-11ea-8ed3-d2b3cc91f7c4.png" alt="image" style="zoom:50%;" />

<br>

## 저장된 할 일 목록을 표시하는  TodoList 컴포넌트

현재 로컬 스토리지에 저장된 할 일이 몇 개든 모두 불러와 화면에 보여준다.

<br>

### 할 일 목록 만들기

HTML에서 일반적으로 **목록 아이템(list item)을 나타낼 때 사용하는 기본 태그는 \<ul>** 이다.

\<ul> 태그 안에 **\<li> 태그를 추가하면 추가한 숫자만큼 목록에 아이템이 추가된다.** 

* **src/components/TodoList.vue**

  ```vue
  <template>
    <section>
      <ul>
        <li>할일 1</li>
        <li>할일 2</li>
        <li>할일 3</li>
      </ul>
    </section>
  </template>
  
  ...
  ```

  > \<li> 태그에 텍스트 값을 직접 다 일일이 추가하여 출력하는 방식은 실제로 사용하지 않는 방법이다.

<br>

로컬 스토리지의 데이터(아이템) 개수만큼 목록에 추가하여 표시해 보자.

* **목록을 표시하는 방법**
  1. 로컬 스토리지 데이터를 뷰 데이터에 저장
  2. 뷰 데이터의 아이템 개수만큼 리스트 아이템 표시

<br>

### 로컬 스토리지 데이터를 뷰 데이터에 저장하기

* **src/component/TodoList.vue**

  ```vue
  ...
  
  <script>
    export default {
      data() {
        return {
          todoItems: []
        }
      },
      created() {
        if (localStorage.length > 0) {
          for (var i = 0; i < localStorage.length; i++) {
            this.todoItems.push(localStorage.key(i));
          }
        }
      }
    }
  </script>
  ```

  * 로컬 스토리지의 데이터를 담을 todoItems 데이터 속성을 빈 배열로 선언한다.
  * **created() 라이프 사이클 훅에** for 반복문과 push()로 로컬 스토리지의 모든 데이터를 todoItems에 담는 로직을 추가한다.
  * todoItems를 배열로 선언한 이유는 **v-for 목록 렌더링에** 활용하기 위해서이다.

뷰의 인스턴스가 생성되자마자 뷰 데이터에 접근할 수 있도록 **created() 라이프 사이클 훅에서 로컬 스토리지의 데이터를 뷰데이터로 옮긴다.**

<br>

### 뷰 데이터의 아이템 개수만큼 화면에 표시하기

* **src/components/TodoList.vue**

  ```vue
  <template>
    <section>
      <ul>
        <li v-for="todoItem in todoItems"> {{ todoItem }} </li>
      </ul>
    </section>
  </template>
  
  ...
  ```

  * v-for 디렉티브는 뷰 데이터 속성  todoItems의 내용물 개수만큼 반복해서 \<li> 태그를 출력하는 디렉티브이다.

<br>

여기서 문제점은 할 일을 추가해도 화면이 바로 갱신되지 않는 문제이다. 할 일을 추가하고 나서 추가된 할일을 확인하려면 브라우저를 새로 고침해야 한다. 사용자 입장에서는 상당히 불편한 **UX(User Experience) 이다.**

<br>

## TodoList.vue에 할 일 삭제 기능 추가하기

* **할 일을 삭제하는 기능의 동작**
  1. 선택한 할 일을 뷰에서 인식
  2. 선택한 할 일을 로컬 스토리지에서 삭제
  3. 선택한 할 일을 뷰 데이터에서 삭제

<br>

### 할 일 목록 & 삭제 버튼 마크업 작업하기

삭제 기능을 구현하기 전에 먼저 간단한 마크업(HTML, CSS) 작업을 수행해 보자.

* **src/components/TodoList.vue**

  ```vue
  <template>
    <section>
      <ul>
        <li v-for="todoItem in todoItems" class="shadow">
          <i class="checkBtn fas fa-check" aria-hidden="true"/>
          {{ todoItem }}
          <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
            <i class="far fa-trash-alt" aria-hidden="true"/>
          </span>
        </li>
      </ul>
    </section>
  </template>
  
  ...
  
  <style scoped>
    ul {
      /* 목록 아이템의 스타일을 지정 */
      list-style-type: none;
      padding-left: 0;
      margin-top: 0;
      text-align: left;
    }
    li {
      /* 비율 기준의 레이아웃 방식인 flex 로 지정*/
      display: flex;
      min-height: 50px;
      height: 50px;
      line-height: 50px;
      margin: 0.5rem 0;
      padding: 0 0.9rem;
      background: white;
      border-radius: 5px;
    }
    .checkBtn {
      line-height: 45px;
      color: #62acde;
      margin-right: 5px;
    }
    .removeBtn {
      margin-left: auto;
      color: #de4343;
    }
  </style>
  ```

  * \<i> 태그로 할 일 체크 버튼과 삭제 버튼에 사용할 체크 아이콘과 휴지 아이콘을 추가한다.

<br>

### 할 일 삭제 버튼에 클릭 이벤트 추가하기

휴지통 아이콘을 클릭했을 때 삭제하는 기능이 실행되도록 클릭 이벤트를 추가해 보자.

아이콘의 근처 영역을 클릭해도 클릭 이벤트가 실행될 수 있게 **\<span> 태그에 클릭 이벤트를 추가한다.**

**@click은 v-on:click과 동일하게 동작한다.**

* **클릭 이벤트 removeTodo를 추가한 코드**

  ```vue
  <span class="removeBtn" type="button" @click="removeTodo">
  ```

<br>

클릭 이벤트가 잘 실행되는지 확인해 보자.

* **src/components/TodoList.vue**

  ```vue
  ...
  
  <script>
    export default {
      data() {
        return {
          todoItems: []
        }
      },
      created() {
        if (localStorage.length > 0) {
          for (var i = 0; i < localStorage.length; i++) {
            this.todoItems.push(localStorage.key(i));
          }
        }
      },
      methods: {
        removeTodo() {
          console.log('clicked');
        }
      }
    }
  </script>
  
  ...
  ```

<br>

### 선택한 할 일을 뷰에서 인식하도록 만들기

휴지통 아이콘을 클릭했을 때 선택한 할 일의 텍스트 값과 인덱스를 가져오는 코드를 추가해 보자.

* **src/components/TodoList.vue**

  ```vue
  <template>
    <section>
      <ul>
        <!-- v-for 디렉티브에 index를 추가함 -->
        <li v-for="(todoItem, index) in todoItems" class="shadow">
          <i class="checkBtn fas fa-check" aria-hidden="true"/>
          {{ todoItem }}
          <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
            <i class="far fa-trash-alt" aria-hidden="true"/>
          </span>
        </li>
      </ul>
    </section>
  </template>
  
  <script>
    export default {
      data() {
        return {
          todoItems: []
        }
      },
      created() {
        if (localStorage.length > 0) {
          for (var i = 0; i < localStorage.length; i++) {
            this.todoItems.push(localStorage.key(i));
          }
        }
      },
      methods: {
        removeTodo(todoItem, index) {
          console.log(todoItem, index);
        }
      }
    }
  </script>
  
  ...
  ```

  * v-for 디렉티브로 반복한 요소는 모두 뷰에서 내부적으로 인덱스를 부여하기 때문에 이 인덱스를 사용한다.

<br>

### 선택한 할 일 로컬 스토리지와 뷰 데이터에서 삭제하기

* **src/components/TodoList.vue**

  ```vue
  ...
  
  <script>
    export default {
      data() {
        return {
          todoItems: []
        }
      },
      created() {
        if (localStorage.length > 0) {
          for (var i = 0; i < localStorage.length; i++) {
            this.todoItems.push(localStorage.key(i));
          }
        }
      },
      methods: {
        removeTodo(todoItem, index) {
          localStorage.removeItem(todoItem);
          this.todoItems.splice(index, 1);
        }
      }
    }
  </script>
  
  ...
  ```

  * **splice()** : 배열의 특정 인덱스에서 부여한 숫자만큼의 인덱스를 삭제한다.

여기서 주목할 부분은 뷰 데이터 속성인 **todoItems의 배열 요소를 제거하자마자 바로 뷰에서 자동으로 화면을 다시 갱신한다.** 이는 데이터의 속성이 변하면 화면에 즉시 반영하는 **뷰의 반응성 때문이다.**

<br>

## 모두 삭제하기 버튼을 포함하는 TodoFooter 컴포넌트

### 모두 삭제하기 버튼 추가하기

* **src/components/TodoFooter.vue**

  ```vue
  <template>
    <div class="clearAllContainer">
      <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
  </template>
  
  <script>
      export default {
        methods: {
          clearTodo() {
            localStorage.clear();
          }
        }
      }
  </script>
  
  <style scoped>
    .clearAllContainer {
      width: 8.5rem;
      height: 50px;
      line-height: 50px;
      background-color: white;
      border-radius: 5px;
      margin: 0 auto;
    }
    .clearAllBtn {
      color: #e20303;
      display: block;
    }
  </style>
  ```

  * clearTodo() 메서드에는 로컬 스토리지의 데이터를 모두 삭제하는 **localStorage.clear()를** 정의한다.

<br>

모두 삭제 버튼을 클릭하고 브라우저를 새로 고침해야만 결과를 확인할 수 있습니다. 이 문제는 로컬 스토리지의 데이터만 지우고, 할 일 목록에 표시되는 할 일 데이터를 제거하지 않았기 때문이다. 그러면 TodoFooter 컴포넌트가 TodoList 컴포넌트에 어떻게 접근할 수 있는지 살펴보자.

<br>

# 06-5. 기존 애플리케이션 구조의 문제점 해결하기

## 현재 애플리케이션 구조의 문제점

* 할 일을 입력했을 때 할 일 목록에 바로 반영되지 않는 점
* 할 일을 모두 삭제했을 때 할 일 목록에 바로 반영되지 않는 점

<br>

현재 화면을 4개의 영역(컴포넌트)으로 분리해 놓았기 때문에 한 영역의 처리 결과를 다른 영역에서 감지하지 못 한다는 것이다.

![image](https://user-images.githubusercontent.com/43431081/78103260-6d07dd80-7427-11ea-8ea3-30fd2136f111.png)

<br>

## 문제 해결을 위한 애플리케이션 구조 개선

* 데이터 추가와 삭제가 일어날 때 현재 애플리케이션의 구조

  ![image](https://user-images.githubusercontent.com/43431081/78103809-c4f31400-7428-11ea-9d46-c28734177b17.png)

  * 만약 모든 컴포넌트가 **'같은 데이터 속성(할 일)'을 조작한다면** 화면을 매번 새로 고침해야 하는 문제점은 해결할 수 있을 것이다.

<br>

같은 데이터 속성을 사용하기 위해 **최상위(루트) 컴포넌트인 App 컴포넌트에 todoItems라는 데이터를 정의하고,** 하위 컴포넌트 TodoLis에 props로 전달해 보자.

* **변경된 애플리케이션 구조**

  ![image](https://user-images.githubusercontent.com/43431081/78104063-6bd7b000-7429-11ea-94c1-51d8fc9291fe.png)

  * 이제는 뷰 데이터 속성 todoItems와 로컬 스토리지의 데이터 조회, 추가, 삭제를 모두 App 컴포넌트에서 한다.
  * 하위 컴포넌트들은 그 데이터를 표현하거나 데이터 조작에 대한 요청(이벤트 발생)만 한다.
  * 이러한 **중앙 집중 관리 방식은** 상태 관리 라이브러리인 **뷰엑스와** 비슷한 구조이다.

<br>

## props와 이벤트 전달을 이용해 할 일 입력 기능 개선하기

* **src/App.vue**

  ```vue
  <template>
    <div id="app">
      <TodoHeader></TodoHeader>
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList v-bind:propsdata="todoItems"></TodoList>
      <TodoFooter></TodoFooter>
    </div>
  </template>
  
  <script>
    import TodoHeader from "./components/TodoHeader";
    import TodoFooter from "./components/TodoFooter";
    import TodoInput from "./components/TodoInput";
    import TodoList from "./components/TodoList";
  
    export default {
      components: {
        'TodoHeader': TodoHeader,
        'TodoInput': TodoInput,
        'TodoList': TodoList,
        'TodoFooter': TodoFooter
      },
      data() {
        return {
          todoItems: []
        }
      },
      methods: {
        addTodo() {
          // 로컬 스토리지에 데이터를 추가하는 로직
        }
      },
    }
  </script>
  
  ...
  ```

  * 최상위 컴포넌트인 App 컴포넌트(App.vue)에 데이터 속성 todoItems를 선언한다.
  * 선언한 todoItems 속성을 TodoList 컴포넌트에 props로 전달한다.

<br>

TodoInput 컴포넌트 태그에는 할 일 추가 버튼을 클릭했을 때 App 컴포넌트로 이벤트를 전달할 수 있게 v-on 디랙티브를 추가한다.

* **src/components/TodoList.vue**

  ```vue
  ...
  
  <script>
    export default {
      props: ['propsdata'],
      
      ...
  ```

<br>

App.vue 파일에 todoItems 데이터 속성을 선언하고, TodoList 컴포넌트의 **propsdata 속성에 props로 전달한다.**

<img src="https://user-images.githubusercontent.com/43431081/78214565-86289100-74f0-11ea-85d8-28c9211f90f2.png" alt="image" style="zoom:50%;" />

<br>

TodoInput 컴포넌트 태그에서 버튼을 클릭했을 때 발생하는 이벤트 이름을 addTodo로 정한다.

해당 이벤트를 받아서 실행할 App 컴포넌트의 메서드도 addTodo()로 한다.

![image](https://user-images.githubusercontent.com/43431081/78214876-3ac2b280-74f1-11ea-9009-a1510e13fdad.png)

<br>

### TodoInput 컴포넌트와 TodoList 컴포넌트 수정하기

* **src/components/TodoInput.vue**

  ```vue
  ...
  
  <script>
    export default {
      data() {
        return {
          newTodoItem: ''
        }
      },
      methods: {
        addTodo() {
          var value = this.newTodoItem && this.newTodoItem.trim();
          this.$emit('addTodo', value);
          this.clearInput();
        }
      },
      clearInput() {
        this.newTodoItem = '';
      }
    }
  </script>
  
  ...
  ```

  * 로컬 스토리지에 데이터를 저장하는 기존 코드 **localStorage.setItem(value, value);** 를 삭제하고 **this.$emit('addTodo', value);** 추가한다.
  * 이벤트를 전달할 때 할 일 텍스트 값인 value 객체를 인자 값으로 전달한다.

* **src/App.vue**

  ```vue
  ...
  
  <script>
    import TodoHeader from "./components/TodoHeader";
    import TodoFooter from "./components/TodoFooter";
    import TodoInput from "./components/TodoInput";
    import TodoList from "./components/TodoList";
  
    export default {
      components: {
        'TodoHeader': TodoHeader,
        'TodoInput': TodoInput,
        'TodoList': TodoList,
        'TodoFooter': TodoFooter
      },
      data() {
        return {
          todoItems: []
        }
      },
      methods: {
        addTodo(todoItem) {
          localStorage.setItem(todoItem, todoItem);
          this.todoItems.push(todoItem);
        }
      },
    }
  </script>
  
  ...
  ```

  * addTodo() 메서드의 인자 값 todoItem은 TodoInput 컴포넌트에서 올려 보낸 할 일 텍스트 값이다.
  * 이 값을 로컬 스토리지에 저장하고, App 컴포넌트의 todoItems 데이터 속성에도 추가한다.

<br>

TodoList 컴포넌트의 \<template> 내용을 수정해 보자.

* **src/components/TodoList.vue**

  ```vue
  <template>
    <section>
      <ul>
        <li v-for="(todoItem, index) in propsdata" class="shadow">
          <i class="checkBtn fas fa-check" aria-hidden="true"/>
          {{ todoItem }}
          <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
            <i class="far fa-trash-alt" aria-hidden="true"/>
          </span>
        </li>
      </ul>
    </section>
  </template>
  
  ...
  ```

  * \<li> 태그에서 v-for 디렉티브의 반복 대상을 **propsdata로** 변경하였다.

<br>

할 일을 추가하면 새로 고침을 하지 않고도 목록이 갱신되는 것을 확인할 수 있다.

<br>

### TodoList에서 불필요한 코드 제거하기

* **src/components/TodoList.vue**

  ```vue
  ...
  
  <script>
    export default {
      props: ['propsdata'],
      methods: {
        removeTodo(todoItem, index) {
          localStorage.removeItem(todoItem);
          this.todoItems.splice(index, 1);
        }
      }
    }
  </script>
  
  ...
  ```

  * TodoList 컴포넌트에서 사용하던 데이터 속성 todoItems는 이제 불필요하므로 제거한다.
  * 컴포넌트가 생성될 때 로컬 스토리지에 저장된 데이터를 모두 불러와 배열에 담아 주던 created() 로직도 App 컴포넌트로 옮긴다.

* **src/components/App.vue**

  ```vue
  ...
  
  <script>
    import TodoHeader from "./components/TodoHeader";
    import TodoFooter from "./components/TodoFooter";
    import TodoInput from "./components/TodoInput";
    import TodoList from "./components/TodoList";
  
    export default {
      components: {
        'TodoHeader': TodoHeader,
        'TodoInput': TodoInput,
        'TodoList': TodoList,
        'TodoFooter': TodoFooter
      },
      data() {
        return {
          todoItems: []
        }
      },
      created() {
        if (localStorage.length > 0) {
          for (var i = 0; i < localStorage.length; i++) {
            this.todoItems.push(localStorage.key(i));
          }
        }
      },
      methods: {
        addTodo(todoItem) {
          localStorage.setItem(todoItem, todoItem);
          this.todoItems.push(todoItem);
        }
      },
    }
  </script>
  
  ...
  ```

<br>

## 이벤트 전달을 이용해 Clear All 버튼 기능 개선하기

이벤트 전달 방식을 사용해서 Clear All 버튼을 개선해 보자.

애플리케이션에서는 하위 컴포넌트인 **TodoFooter에서 발생시킬 이벤트 이름을 removeAll로 하고,** 상위 컴포넌트인 App에서 받아 실행시킬 **메서드 이름을 clearAll()로** 정하자.

* **TodoFooter에서 App으로 전달한 이벤트를 처리하는 과정**

  ![image](https://user-images.githubusercontent.com/43431081/78244367-67da8980-7520-11ea-9147-bb083fb70a03.png)

<br>

### 상위 컴포넌트 코드 수정하기

* **src/components/App.vue**

  ```vue
  <template>
    <div id="app">
      <TodoHeader></TodoHeader>
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList v-bind:propsdata="todoItems"></TodoList>
      <!-- App.vue의 이벤트 전달 속성 추가 -->
      <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
    </div>
  </template>
  
  <script>
    ...  
      methods: {
        addTodo(todoItem) {
          localStorage.setItem(todoItem, todoItem);
          this.todoItems.push(todoItem);
        },
        //  method 추가
        clearAll() {
          localStorage.clear();
          this.todoItems = [];
        }
      },
    }
  </script>
  ```

<br>

### 하위 컴포넌트 코드 수정하기

* **src/components/TodoFooter.vue**

  ```vue
  ...
  
  <script>
      export default {
        methods: {
          clearTodo() {
            this.$emit('removeAll');
          }
        }
      }
  </script>
  
  ...
  ```

  * [Clear All] 버튼을 클릭하면 removeAll 이벤트를 발생시켜 상위 컴포넌트(App.vue)로 전달한다.
  * 상위 컴포넌트에서는 removeAll을 받아 상위 컴포넌트에 정의된 clearAll() 메서드를 실행한다.

<br>

## 이벤트 전달을 이용해 할 일 삭제 기능 개선하기

* **src/App.vue**

  ```vue
  <template>
    <div id="app">
      <TodoHeader></TodoHeader>
      <TodoInput v-on:addTodo="addTodo"></TodoInput>
      <TodoList v-bind:propsdata="todoItems" @removeTodo="removeTodo"></TodoList>
      <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
    </div>
  </template>
  
  ...
  ```

  * **@removeTodo** : 이벤트 전달 디렉티브인 v-on:removeTodo의 약식 문법이다.

* **src/components/TodoList.vue**

  ```vue
  ...
  
  <script>
    export default {
      props: ['propsdata'],
      methods: {
        removeTodo(todoItem, index) {
          this.$emit('removeTodo', todoItem, index);
        }
      }
    }
  </script>
  
  ...
  ```

  * 휴지통 아이콘을 클릭하면  TodoList 컴포넌트의 removeTodo() 메서드에서 removeTodo라는 이벤트를 발생시켜 App 컴포넌트로 전달한다.
  * 이벤트를 전달할 때 선택한 할 일의 텍스트(todoItem)와 인덱스(index)를 같이 보낸다.

<br>

> **$emit() API 형식과 전달 인자의 규칙**
>
> $emit()은 하위 컴포넌트에서 이벤트를 발생시켜 상위 컴포넌트로 신호를 보낼 때 사용한다.
>
> API의 기본 형식은 <u>\$emit('이벤트 이름')</u> 이지만 <u>\$emit('이벤트 이름', 인자1, 인자2, ...)</u> 와 같은 형식으로 하위 컴포넌트의 특정 데이터를 전달할 수 있다.
>
> 하지만 <u>전달받은 인자 값은 상위 컴포넌트에서 참고용으로만 활용하고, 데이터 값은 변경하지 말아야 한다.</u>
>
> 상위 컴포넌트에서 값을 갱신해도 하위 컴포넌트에서 반영되지 않는다.

<br>

# 06-6. 더 나은 사용자 경험을 위한 기능 추가하기

## 뷰 애니메이션

뷰 애니메이션은 **뷰 프레임워크 자체에서 지원하는 애니메이션 기능으로, 데이터 추가, 변경, 삭제에 대해서 페이드 인(fade in), 페이드 아웃(fade out)** 등의 여러 가지 애니메이션 효과를 지원한다.

간단한 데이터부터 목록 아이템, 기타 자바스크립트 애니메이션, CSS 애니메이션 라이브러리 등 지원

<br>

TodoList 컴포넌트에 애니메이션을 추가하기 위해 약간 변경해 보자.

* **src/components/TodoList.vue**

  ```vue
  <template>
    <section>
      <transition-group name="list" tag="ul">
        <li v-for="(todoItem, index) in propsdata" :key="todoItem" class="shadow">
          <i class="checkBtn fas fa-check" aria-hidden="true"/>
          {{ todoItem }}
          <span class="removeBtn" type="button" @click="removeTodo(todoItem, index)">
            <i class="far fa-trash-alt" aria-hidden="true"/>
          </span>
        </li>
      </transition-group>
    </section>
  </template>
  ```

  * 기존에 있던 \<ul> 태그를 제거하고 \<transition-group> 태그를 추가한다.
  * **\<transition-group>** : 목록에 애니메이션을 추가할 때 사용되는 태그
    * **tag 속성** : 애니메이션이 들어갈 HTML 태그 이름(p, ul, section 등등)을 지정
  * \<li> 태그에 **v-bind:key 를 간략하게 표현한 :key를 추가한다.** 목록에 애니메이션을 적용하려면 \<transition-group> 안의 대상 태그에 :key 속성을 꼭 지정해야 한다.
  * :key 속성에는 유일하게 구분되는 값을 넣어야 한다.

<br>

> **:key 속성은 v-for 디렉티브를 사용할 때 지정하는 게 좋다.**
>
> 뷰는 목록의 특정 아이템이 삭제되거나 추가되었을 때, 돔에서 나머지 아이템의 순서를 다시 조정하지 않고 프레임워크 내부적으로 전체 아이템의 순서를 제어한다. 이렇게 프레임워크에서 목록 아이템의 순서를 제어하는 이유는 브라우저가 돔을 조작하는 데 소요되는 시간들을 최소화하기 위해서이다.
>
> 따라서 :key 속성을 사용하면 브라우저에서 화면을 더 빨리 그릴 수 있도록 해준다.

<br>

이제 \<transition-group> 태그에 적용할 CSS 속성을 추가하자.

* **src/components/TodoList.vue**

  ```vue
  ...
  
  <style scoped>
    ul {
      /* 목록 아이템의 스타일을 지정 */
      list-style-type: none;
      padding-left: 0;
      margin-top: 0;
      text-align: left;
    }
    li {
      /* 비율 기준의 레이아웃 방식인 flex 로 지정*/
      display: flex;
      min-height: 50px;
      height: 50px;
      line-height: 50px;
      margin: 0.5rem 0;
      padding: 0 0.9rem;
      background: white;
      border-radius: 5px;
    }
    .checkBtn {
      line-height: 45px;
      color: #62acde;
      margin-right: 5px;
    }
    .removeBtn {
      margin-left: auto;
      color: #de4343;
    }
    .list-enter-active, .list-leave-active {
      transition: all 1s;
    }
    .list-enter, .list-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
  </style>
  ```

  * 설정한 name 속성 값(list)을 접두사로 갖고 있다.
  * enter-active, leave-active, leave-to는 데이터가 들어오고 나가는 동작을 정의하는 CSS 이다.

<br>

## 뷰 모달

자바스크립트의 기본 경고 창을 활용해서 예외 처리를 할 수도 있지만 좀 더 보기 좋은 UI를 위해 **뷰 공식 사이트에서 제공하는 팝업 대화상자인 모달(modal)을 활용해 보자.**

<br>

먼저 components 폴더 안에 common 폴더를 만들고 Modal.vue 파일을 생성한다.

https://vuejs.org/v2/examples/modal.html 에서 HTML 부분의 \<trasition> 태그 코드와 CSS 부분을 복사해 가져온다.

\<transition> 코드는 \<template> 태그에 넣고, CSS 코드는 \<style> 태그에 넣는다.

<br>

* **src/components/common/Modal.vue**

  ```vue
  <template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
  
          <div class="modal-header">
            <slot name="header">
              default header
    </slot>
    </div>
  
          <div class="modal-body">
            <slot name="body">
              default body
    </slot>
    </div>
  
          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
    </button>
    </slot>
    </div>
    </div>
    </div>
    </div>
    </transition>
  </template>
  
  <script>
    export default {
      name: "Modal"
    }
  </script>
  
  <style scoped>
    .modal-mask {
      position: fixed;
      z-index: 9998;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: table;
      transition: opacity 0.3s ease;
    }
  
    .modal-wrapper {
      display: table-cell;
      vertical-align: middle;
    }
  
    .modal-container {
      width: 300px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
      transition: all 0.3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
  
    .modal-header h3 {
      margin-top: 0;
      color: #42b983;
    }
  
    .modal-body {
      margin: 20px 0;
    }
  
    .modal-default-button {
      float: right;
    }
  
    /*
    * The following styles are auto-applied to elements with
    * transition="modal" when their visibility is toggled
    * by Vue.js.
    *
    * You can easily play with the modal transition by editing
    * these styles.
    */
  
    .modal-enter {
      opacity: 0;
    }
  
    .modal-leave-active {
      opacity: 0;
    }
  
    .modal-enter .modal-container,
    .modal-leave-active .modal-container {
      -webkit-transform: scale(1.1);
      transform: scale(1.1);
    }
  </style>
  ```

* **src/components/TodoInpute.vue**

  ```vue
  <template>
    <div class="inputBox shadow">
      <input type="text" v-model="newTodoItem" placeholder="Type what you have to do"
             v-on:keyup.enter="addTodo">
      <span class="addContainer" v-on:click="addTodo">
        <i class="addBtn fas fa-plus" aria-hidden="true"/>
      </span>
  
      <modal v-if="showModal" @close="showModal = false">
        <h3 slot="header">경고</h3>
        <span slot="footer" @click="showModal = false">
          할 일을 입력하세요.
          <i class="closeModalBtn fas fa-times" aria-hidden="true"/>
        </span>
      </modal>
    </div>
  </template>
  
  <script>
    import Modal from "./common/Modal";
  
    export default {
      components: {Modal},
      data() {
        return {
          newTodoItem: '',
          showModal: false
        }
      },
      methods: {
        addTodo() {
          if (this.newTodoItem !== "") {
            var value = this.newTodoItem && this.newTodoItem.trim();
            this.$emit('addTodo', value);
            this.clearInput();
          } else {
            this.showModal = !this.showModal;
          }
        },
        clearInput() {
          this.newTodoItem = '';
        },
        components: {
          Modal: Modal
        }
      }
    }
  </script>
  
  <style scoped>
    input:focus {
      outline: none;
    }
  
    .inputBox {
      background: white;
      height: 50px;
      line-height: 50px;
      border-radius: 5px;
    }
  
    .inputBox input {
      border-style: none;
      font-size: 0.9rem;
    }
  
    .addContainer {
      float: right;
      background: linear-gradient(to right, #6478FB, #8763FB);
      display: block;
      width: 3rem;
      border-radius: 0 5px 5px 0;
    }
  
    .addBtn {
      color: white;
      vertical-align: middle;
    }
  
    .modal-header h3 {
      margin-top: 0;
      color: #42b983;
    }
  
  </style>
  ```

<br>

* **실행 결과**

  <img src="https://user-images.githubusercontent.com/43431081/78252202-74b1aa00-752d-11ea-9272-0ce397f8dc66.png" alt="image" style="zoom:50%;" />

