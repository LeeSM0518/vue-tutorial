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

2. el 속성에 지정한 화면 요소(돔)에 인스턴스가 부착된다.

   * **뷰 인스턴스가 화면에 부착되는 모습**

   <img src="../capture/스크린샷 2019-11-23 오후 4.59.55.png" width=500>

3. el 속성에 인스턴스가 부착되고 나면 인스턴스에 정의한 **객체의 내용(data 속성)이** el 속성에 지정한 화면 요소와 그 이하 레벨의 **화면 요소에 적용되어 값이 치환된다.**

   * **뷰 인스턴스의 내용이 화면에 정의된 HTML 태그에 적용되는 모습**

   <img src="../capture/스크린샷 2019-11-23 오후 5.02.02.png" width=500>

4. 결과

   <img src="../capture/스크린샷 2019-11-23 오후 5.03.01.png" width=300>

<br>

#### *인스턴스의 유효 범위 확인*

만약 인스턴스의 유효 범위를 벗어나면?

```vue
<div id="app">
  
</div>
{{ message }}
```

<img src="../capture/스크린샷 2019-11-23 오후 5.12.39.png" width=500>

* message 속성 값이 Hello Vue.js!로 바뀌지 않고 그대로 출력이된다.

이와 같은 결과가 발생하는 이유는 **\<div> 태그 즉, 인스턴스의 유효 범위 밖을 벗어나서** {{ message }}가 뷰에서 인식하지 못 하기 때문이다.

<br>

## 뷰 인스턴스 라이프 사이클

**인스턴스의 상태에 따라 호출할 수 있는 속성들을** 라이프 사이클(life cycle) 속성이라고 한다.

> **라이프 사이클** : 일반적으로 애플리케이션이 가지는 생명주기

<br>

**각 라이프 사이클 속성에서 실행되는 커스텀 로직을** 라이프 사이클 훅(hook) 이라고 한다.

> **커스텀 로직** : 개발자가 임의로 작성한 추가 로직

<br>

* **뷰 라이프 사이클 다이어그램**

  <img src="https://joshua1988.github.io/vue-camp/assets/img/lifecycle.dcbe29f6.png">

  * 이 그림은 인스턴스가 생성되고 나서 화면에 인스턴스가 부착된 후 소멸되기까지의 전체적인 흐름이다.
  * **라이프 사이클 단계** : 생성 => 부착 => 갱신 => 소멸

<br>

#### *beforeCreate*

인스턴스가 생성되고 나서 가장 처음으로 실행되는 라이프 사이클 단계이다.

data 속성과 methods 속성이 아직 인스턴스에 **정의되어 있지 않고,** 돔과 같은 화면 요소에도 접근할 수 없다.

<br>

#### *created*

data 속성과 methods 속성이 정의되었기 때문에 이제 **정의된 값에 접근하여** 로직을 생성할 수 있다. 다만, 아직 인스턴스가 화면 요소에 부착되기 전이기 때문에 template 속성에 **정의된 돔 요소로 접근할 수 없다.**

<br>

#### *beforeMount*

template 속성에 지정한 마크업 속성을 render() 함수로 변환한 후 el 속성에 **지정한 화면 요소(돔)에 인스턴스를 부착하기 전에** 호출되는 단계이다.

* **render()** : 자바스크립트로 화면의 돔을 그리는 함수이다.

<br>

#### *mounted*

el 속성에서 지정한 화면 요소에 **인스턴스가 부착되고 나면 호출되는 단계.** template 속성에 정의한 화면 요소(돔)에 접근할 수 있어 화면 요소를 제어하는 로직을 수행하기 좋은 단계이다.

* $nextTick()을 사용하여 변환이 완료될 때까지 기다렸다가 로직을 추가한다.

<br>

#### *beforeUpdate*

el 속성에서 지정한 화면 요소에 인스턴스가 부착되고 나면 인스턴스에 정의한 속성들이 화면에 치환된다. 치환된 값은 뷰의 반응성(Reactivity)을 제공하기 위해 **$watch 속성으로 감시한다. 이를 데이터 관찰이라고 한다.**

이 단계는 관찰하고 있는 데이터가 변경되면 **가상 돔으로 화면을 다시 그리기 전에 호출되는 단계이다.**

* **뷰의 반응성** : 코드의 변화에 따라 화면이 반사적으로 반응하여 갱신

<br>

#### *updated*

데이터가 변경되고 나서 **가상 돔으로 다시 화면을 그리고 나면 실행되는 단계이다.** 이 단계에서 데이터 값을 변경하면 무한 루프에 빠질 수 있기 때문에 **값을 변경하려면 computed, watch와 같은 속성을 사용해야 한다,** 이 단계에서는 updated에서는 변경 **데이터의 화면 요소(돔)의 관련된 로직을 추가하는 것이 좋다.**

* $nextTick()을 사용하여 변환이 완료될 때까지 기다렸다가 로직을 추가한다.

<br>

#### *beforeDestroy*

**뷰 인스턴스가 파괴되기 직전에** 호출되는 단계이다. 이 단계에서는 아직 인스턴스에 접근할 수 있다.

<br>

#### *destroyed*

뷰 인스턴스가 파괴되고 나서 호출되는 단계이다.

<br>

#### *라이프 사이클 실습 예제*

* **코드**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Vue Instance Lifecycle</title>
    </head>
    <body>
      <div id="app">
        {{ message }}
      </div>
  
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        new Vue({
          el: '#app',
          data: {
            message: 'Hello Vue.js!'
          },
          beforeCreate: function () {
            console.log("beforeCreate");
          } ,
          created: function () {
            console.log("created")
          },
          mounted: function () {
            console.log("mounted");
            this.message = 'Hello Vue!'
          },
          updated: function () {
            console.log("updated");
          }
        })
      </script>
    </body>
  </html>
  ```

* **실행결과**

  <img src="../capture/스크린샷 2019-11-23 오후 7.32.56.png" width=500>

  * updated 속성 함수는 호출되지 않았다. 그 이유는 뷰 인스턴스에서 데이터 변경이 일어나지 않았기 때문이다.

<br>

**message 값을 변경한 라이프 사이클 실습 예제**

* **코드**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Vue Instance Lifecycle</title>
    </head>
    <body>
      <div id="app">
        {{ message }}
      </div>
  
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        new Vue({
          el: '#app',
          data: {
            message: 'Hello Vue.js!'
          },
          beforeCreate: function () {
            console.log("beforeCreate");
          } ,
          created: function () {
            console.log("created")
          },
          mounted: function () {
            console.log("mounted");
            this.message = 'Hello Vue!'
          },
          updated: function () {
            console.log("updated");
          }
        })
      </script>
    </body>
  </html>
  ```

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-23 오후 7.35.38.png" width=500>

  * mounted 단계에서 데이터를 변경했기 때문에 beforeUpdate, updated 단계에 정의한 로직이 모두 동작하여 log에 출력된것을 확인할 수 있다.

<br>

## 03-2. 뷰 컴포넌트

### 컴포넌트란?

컴포넌트(Component)란 조합하여 화면을 구성할 수 있는 블록(화면의 특정 영역)을 의미한다.

* **컴포넌트로 구분한 화면 영역 간의 관계도**

  <img src="https://t1.daumcdn.net/cfile/tistory/9997ED4F5C7CB30E29">

  * 왼쪽은 웹 페이지 한 화면의 영역을 각각 역할별로 분할한 그림이다.
  * 오른쪽은 각각 분할된 영역 간의 관계를 도식화한 그림이다.
  * 웹 페이지 화면을 설계할 때는 이와 같이 컴포넌트 간의 관계를 **트리(Tree) 모양과 유사하게 구성한다.**

<br>

### 컴포넌트 등록하기

* **컴포넌트**
  * **지역(Local) 컴포넌트** : 특정 인스턴스에서만 유효한 범위를 갖는다.
  * **전역(Global) 컴포넌트** : 여러 인스턴스에서 공통으로 사용할 수 있다.

<br>

#### *전역 컴포넌트 등록*

전역 컴포넌트는 뷰 라이브러리를 로딩하고 나면 접근 가능한 Vue 변수를 이용하여 등록한다.

* **전역 컴포넌트 등록 형식**

  ```vue
  Vue.component('컴포넌트 이름', {
  	// 컴포넌트 내용
  });
  ```

  * **컴포넌트 이름** : template 속성에서 사용할 HTML 사용자 정의 태그(custom tag) 이름을 의미
  * **컴포넌트 내용** : template, data, methods 등 인스턴스 옵션 속성을 정의할 수 있다.

* **전역 컴포넌트 등록 예제**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Vue Component Registration</title>
    </head>
    <body>
      <div id="app">
        <button>컴포넌트 등록</button>
        
        <!-- 전역 컴포넌트 표시-->
        <my-component></my-component>
      </div>
  
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        
        <!--전역 컴포넌트 등록-->
          Vue.component('my-component', {
          template: '<div>전역 컴포넌트가 등록되었습니다!</div>'
        });
  
        new Vue({
          el: '#app'
        });
      </script>
    </body>
  </html>
  ```

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-23 오후 8.41.22.png" width=500>

<br>

* **전역 컴포넌트가 화면에 나타나기까지의 처리 과정**

  <img src="../capture/스크린샷 2019-11-23 오후 8.47.35.png">

  * 인스턴스가 생성되고, 인스턴스 내용이 화면 요소로 변환될 때 컴포넌트 태그도 함께 변환된다.

<br>

* **컴포넌트 태그 추가**

  ```vue
  <my-component></my-component>
  ```

  * 위의 컴포넌트 태그에 최종적으로 컴포넌트가 등록된다.

<br>

* **컴포넌트 태그가 변환된 후의 최종 결과**

  ```vue
  <div>전역 컴포넌트가 등록되었습니다!</div>
  ```

<br>

* **전역 컴포넌트가 그려질 때의 실제 코드**

  ```vue
  <div id="app">
    <button>컴포넌트 등록</button>
    <!-- 등록한 my-component가 최종적으로 변환된 모습 -->
    <div>전역 컴포넌트가 등록되었습니다!</div>
  </div>
  ```

<br>

#### *지역 컴포넌트 등록*

지역 컴포넌트는 인스턴스에 components 속성을 추가하고 등록할 컴포넌트 이름과 내용을 정의하면 된다.

* **지역 컴포넌트 등록 형식**

  ```vue
  new Vue({
  	components: {
  		'컴포넌트 이름': 컴포넌트 내용
  	}
  });
  ```

  * **컴포넌트 이름** : 사용자 정틔 태그
  * **컴포넌트 내용** : 태그가 실제 화면 요소로 변환될 때의 내용을 의미

<br>

* **지역 컴포넌트 등록 예제**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Vue Component Registration</title>
    </head>
    <body>
      <div id="app">
        <button>컴포넌트 등록</button>
        <my-local-component></my-local-component>
      </div>
  
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        var cmp = {
          // 컴포넌트 내용
          template: '<div>지역 컴포넌트가 등록되었습니다!</div>'
        };
  
        new Vue ({
          el: '#app',
          components: {
            'my-local-component': cmp
          }
        });
      </script>
    </body>
  </html>
  ```

  * **cmp 변수** : 컴포넌트의 내용을 정의

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-23 오후 9.01.24.png" width=500>

<br>

### 지역 컴포넌트와 전역 컴포넌트의 차이

* **지역 컴포넌트와 전역 컴포넌트 등록 예제**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Vue Global and local component</title>
    </head>
    <body>
      <div id="app">
        <h3>첫 번째 인스턴스 영역</h3>
        <my-global-component></my-global-component>
        <my-local-component></my-local-component>
      </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      Vue.component('my-global-component', {
        template: '<div>전역 컴포넌트 입니다.</div>'
      });
  
      var cmp = {
        template: '<div>지역 컴포넌트 입니다.</div>'
      };
  
      new Vue({
        el: '#app',
        components: {
          'my-local-component': cmp
        }
      });
    </script>
  </html>
  ```

  * **\<my-global-component>** : 전역 컴포넌트
  * **\<my-local-component>** : 지역 컴포넌트

<br>

* **인스턴스 유효 범위와 지역 컴포넌트, 전역 컴포넌트 간 관계 확인하기**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Vue Global and local component</title>
    </head>
    <body>
      <div id="app">
        <h3>첫 번째 인스턴스 영역</h3>
        <my-global-component></my-global-component>
        <my-local-component></my-local-component>
      </div>
      <hr>
      <div id="app2">
        <h3>두 번째 인스턴스 영역</h3>
        <my-global-component></my-global-component>
        <my-local-component></my-local-component>
      </div>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
      <!-- 전역 컴포넌트 등록 -->
        Vue.component('my-global-component', {
        template: '<div>전역 컴포넌트 입니다.</div>'
      });
  
      // 지역 컴포넌트 내용
      var cmp = {
        template: '<div>지역 컴포넌트 입니다.</div>'
      };
  
      new Vue({
        el: '#app',
        // 지역 컴포넌트 등록
        components: {
          'my-local-component': cmp
        }
      });
  
      // 두 번째 인스턴스
      new Vue({
        el: '#app2'
      });
    </script>
  </html>
  ```

  * 첫 번째 인스턴스 영역에서는 **전역, 지역 컴포넌트가 모두** 정상적으로 나타났다.

  * 두 번째 인스턴스 영역에서는 **전역 컴포넌트만 나나타고,** 지역 컴포넌트는 나타나지 않았다.

    * **전역 컴포넌트는** 인스턴스를 새로 생성할 때마다 인스턴스에 component 속성으로 등록할 필요 없이 **한 번 등록하면 어느 인스턴스에서든지 사용 가능**
    * **지역 컴포넌트는** 새 인스턴스를 생성할 때마다 등록해줘야 한다.

  * 두 번째 인스턴스에서 \<my-local-component> 태그는 **첫 번째 컴포넌트의 유효 범위를 벗어나기 때문에** 브라우저에서는 HTML 사용자 정의 태그로 인식하고, 뷰에서는 해당 컴포넌트를 제대로 등록했는지 물어보는 오류를 발생시킨다.

    <img src="../capture/스크린샷 2019-11-24 오후 5.36.04.png">

<br>

#### 1. 전역 컴포넌트와 지역 컴포넌트 등록하기

* **app.js**

  ```js
  // 지역 컴포넌트 내용
  var cmp = {
    template: '<p>This is another local child component</p>'
  };
  
  // 전역 컴포넌트 등록
  Vue.component('todo-footer', {
    template: '<p>This is another global child component</p>'
  });
  
  var app = new Vue({
    el: '#app',
    data: {
      message : 'This is a parent component'
    },
  
    // 지역 컴포넌트 등록
    components: {
      'todo-list': cmp
    }
  });
  ```

<br>

#### 2. 전역 컴포넌트 태그와 지역 컴포넌트 태그를 화면에 표시하기

* **appindex.html**

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vue Components Registration Quiz</title>
    </head>
    <body>
      <div id="app">
        <header>
          <h3>{{ message }}</h3>
        </header>
        <!-- 실습 #3 - 전역 컴포넌트 등록을 위한 `todo-footer` 태그 추가 -->
        <todo-footer></todo-footer>
        <!-- 실습 #4 - 지역 컴포넌트 등록을 위한 `todo-list` 태그 추가 -->
        <todo-list></todo-list>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script src="js/app.js"></script>
    </body>
  </html>
  ```

<br>

#### 3. 실행 결과

<img src="../capture/스크린샷 2019-11-24 오후 7.01.35.png" width=500>

<br>

## 03-3. 뷰 컴포넌트 통신

### 컴포넌트 간 통신과 유효 범위

뷰(Vue.js)의 경우 컴포넌트로 화면을 구성하므로 같은 웹 페이지라도 데이터를 공유할 수 없다. 왜냐하면 컴포넌트 마다 자체적으로 고유한 유효 범위(Scope)를 갖기 때문이다. 따라서 **각 컴포넌트의 유효 범위가 독립적이기 때문에 다른 컴포넌트의 값을 직접적으로 참조할 수가 없다.**

<br>

* **컴포넌트 유효 범위 증명 예시**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Scope of Proof</title>
    </head>
    <body>
      <div id="app">
        <my-component1></my-component1>
        <my-component2></my-component2>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        <!-- 첫 번째 컴포넌트 내용-->
          var cmp1 = {
            template: '<div>첫 번째 컴포넌트 : {{ cmp1Data }}</div>',
            data: function () {
              return {
                cmp1Data: 100
              }
            }
          };
  
        // 두 번째 컴포넌트 내용
        var cmp2 = {
          template: '<div>두 번째 지역 컴포넌트 : {{ cmp2Data }}</div>',
          data: function () {
            return {
              cmp2Data: cmp1.data.cmp1Data
            }
          }
        };
  
        new Vue({
          el: '#app',
          // 지역 컴포넌트 등록 
          components: {
            'my-component1': cmp1,
            'my-component2': cmp2
          }
        });
      </script>
    </body>
  </html>
  ```

  * 2개의 지역 컴포넌트를 등록하고, 한 컴포넌트에서 다른 컴포넌트의 값을 직접 참조하는 예제이다.
  * my-component2 컴포넌트에서 cmp2Data는 my-component1 컴포넌트의 data.cmp1Data를 참조하고 있다.

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-24 오후 7.12.08.png" width=500>

  * 컴포넌트의 유효 범위로 인해 다른 컴포넌트의 값을 직접 접근하지 못 하기 때문에 두 번째 지역 컴포넌트의 값이 나오지 않는 것을 볼 수 있다.

<br>

### 상∙하위 컴포넌트 관계

뷰 프레임워크 자체에서 정의한 컴포넌트 데이터 전달 방법을 따라야 한다.

가장 기본적인 데이터 전달 방법은 **상위(부모) - 하위(자식) 컴포넌트 간의** 데이터 전달 방법이다.

* **상위-하위 컴포넌트** : 트리 구조에서 부모 노드, 자식 노드 처럼 컴포넌트 간의 관계가 부모, 자식으로 이루어진 컴포넌트를 의미한다.

  * 상위 - 하위 컴포넌트 간 통식 방식

    <img src="../capture/스크린샷 2019-11-24 오후 7.18.05.png" width=500>

<br>

### 상위에서 하위 컴포넌트로 데이터 전달하기

#### *props 속성*

props는 상위 컴포넌트에서 하위 컴포넌트로 데이터를 전달할 때 사용하는 속성이다.

* **하위 컴포넌트의 props 속성 정의 방식**

  ```vue
  Vue.component('child-component', {
  	props: ['props 속성 이름'],
  });
  ```

<br>

그런 다음 상위 컴포넌트의 HTML 코드에 등록된 child-component 컴포넌트 태그에 v-bind 속성에 추가한다.

```vue
<child-component v-bind:props 속성 이름="상위 컴포넌트의 data 속성"></child-component>
```

<br>

* **props 속성을 사용한 데이터 전달 예제**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Use props attribute</title>
    </head>
    <body>
      <div id="app">
        <!-- propsdata : props 속성 이름-->
        <!-- message : 상위 컴포넌트의 데이터 속성-->
        <child-component v-bind:propsdata="message"></child-component>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        Vue.component('child-component', {
          props: ['propsdata'],
          template: '<p>{{ propsdata }}</p>',
        });
  
        new Vue({
          el: '#app',
          data: {
            message: 'Hello Vue! passed from Parent Component'
          }
        });
      </script>
    </body>
  </html>
  ```

* **순서 설명**

  1. new Vue()로 인스턴스를 생성
  2. Vue.component()를 이용하여 하위 컴포넌트인 child-component를 등록
  3. child-component의 내용에 props 속성으로 propsdata를 정의
  4. HTML에 컴포넌트 태그 추가. 
     * **\<v-bind: propsdata="message">** : 상위 컴포넌트의 message 속성 값인 "Hello ~" 텍스트 값을 하위 컴포넌트의 propsdata로 전달
  5. child-component의 template 속성에 정의된 **\<p>{{ propsdata }}\</p>** 는 Hello Vue! passed ~ 가 된다.

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-24 오후 7.35.30.png" width=500>

<br>

* **뷰 인스턴스에 child-component를 등록한 모습**

  <img src="../capture/스크린샷 2019-11-24 오후 7.40.15.png" width=500>

이렇게 인스턴스에 새로운 컴포넌트를 등록하면 **기존에 있는 컴포넌트는 상위 컴포넌트(부모)가 되고, 새로 등록된 컴포넌트는 하위(자식) 컴포넌트가 된다.** 그리고 이렇게 새 컴포넌트를 등록한 인스턴스를 최상위 컴포넌트(Root Component)라고도 부른다.

<br>

### 하위에서 상위 컴포넌트로 이벤트 전달하기

#### *이벤트 발생과 수신*

하위 컴포넌트에서 상위 컴포넌트로의 통신은 **이벤트를 발생시켜(event emit)** 상위 컴포넌트에 신호를 보내면 된다.

<br>

#### *이벤트 발생과 수신 형식*

이벤트 발생과 수신은 **$emit()과 v-on:** 속성을 사용하여 구현한다.

* **$emit()을 이용한 이벤트 발생**

  ```vue
  // 이벤트 발생
  this.$emit('이벤트 명');
  ```

  * $emit() 호출하는 위치는 하위 컴포넌트의 특정 메소드 내부이다.
  * $emit() 호출할 때 사용하는 this는 하위 컴포넌트를 가리킨다.

* **v-on: 속성을 이용한 이벤트 수신**

  ```vue
  // 이벤트 수신
  <child-component v-on:이벤트명="상위 컴포넌트의 메서드명"></child-component>
  ```

  * $emit() 으로 호출한 이벤트는 하위 컴포넌트를 등록하는 태그에서 v-on:으로 받는다.
  * 하위 컴포넌트에서 발생한 이벤트명을 v-on: 속성에 지정하고, 속성의 값에 이벤트가 발생했을 때 호출될 상위 컴포넌트의 메서드를 지정한다.

<br>

* **이벤트를 발생시키고 수신하는 예시**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Event occurrence</title>
    </head>
    <body>
      <div id="app">
        <!-- show-log : 하위 컴포넌트의 이벤트명-->
        <!-- printText : 상위 컴포넌트의 메서드명-->
        <child-component v-on:show-log="printText"></child-component>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        Vue.component('child-component', {
          // 버튼 요소 추가
          template: '<button v-on:click="showLog">show</button>',
          // 메서드 추가
          methods: {
            showLog: function () {
              // 이벤트 발생 로직
              this.$emit('show-log');
            }
          }
        });
  
        var app = new Vue({
          el: '#app',
          data: {
            message: 'Hello Vue! passed from Parent Component'
          },
          methods: {
            printText: function () {
              console.log("received an event");
            }
          }
        });
      </script>
    </body>
  </html>
  ```

* **[show] 버튼 클릭시 처리되는 과정**

  1. [show] 버튼을 클릭하면 클릭 이벤트 **v-on:click="showLog"에** 따라 showLog() 메서드가 실행된다.
  2. showLog() 메서드 안에 **this.$emit('show-log')가** 실행되면서 show-log 이벤트가 발생한다.
  3. show-log 이벤트는 **\<child-component>에 정의한 v-on:show-log 에** 전달되고, **v-on:show-log의** 대상 메서드인 최상위 컴포넌트의 메서드 **printText()가** 실행된다.
  4. printText()는 received an event 라는 로그를 출력하는 메서드이므로 마지막으로 콘솔에 로그가 출력된다.

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-24 오후 8.11.02.png" width=500>

<br>

### 같은 레벨의 컴포넌트 간 통신

* 같은 레벨 간의 컴포넌트 통신 흐름

  <img src="../capture/스크린샷 2019-11-24 오후 8.15.27.png">

  * 옆 컴포넌트에 값을 전달하려면 하위에서 공통 상위 컴포넌트로 이벤트를 전달한 후 공통 상위 컴포넌트에서 2개의 하위 컴포넌트에 props를 내려 보내야 한다.

    > 이런 통신 구조를 유지하다 보면 상위 컴포넌트가 필요 없음에도 불구하고 같은 레벨 간에 통신하기 위해 강제로 상위 컴포넌트를 두어야 한다. 이를 해결할 수 있는 방법이 바로 **이벤트 버스이다.**

<br>

### 관계 없는 컴포넌트 간 통신 - 이벤트 버스

이벤트 버스(Event Bus)는 상위 - 하위 관계를 유지하고 있지 않아도 데이터를 한 컴포넌트에서 다른 컴포넌트로 전달할 수 있다.

<br>

#### *이벤트 버스 형식*

* **이벤트 버스 형식**

  애플리케이션 로직을 담는 인스턴스와는 별개로 새로운 인스턴스를 1개 더 생성한다.

  ```vue
  // 이벤트 버스를 위한 추가 인스턴스 1개 생성
  var eventBus = new Vue();
  ```

  새 인스턴스를 이벤트를 보내고 받는다.

  ```vue
  // 이벤트를 보내는 컴포넌트
  methods: {
  	메서드명: function() {
  		eventBus.$emit('이벤트명', 데이터);
  	}
  }
  ```

  보내는 컴포넌트에서는 .\$emit()을 받는 컴포넌트에서는, .\$on()을 구현

  ```vue
  // 이벤트를 받는 컴포넌트
  methods: {
  	created: function() {
  		eventBus.$on('이벤트명', function(데이터) {
  			...
  		});
  	}
  }
  ```

<br>

* **이벤트 버스 구현하기**

  ```vue
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Event Bus implement</title>
    </head>
    <body>
      <div id="app">
        <child-component></child-component>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        var eventBus = new Vue();
        Vue.component('child-component', {
          template: '<div>하위 컴포넌트 영역입니다.<button v-on:click="showLog">show</button></div>',
          methods: {
            showLog: function () {
              eventBus.$emit('triggerEventBus', 100);
            }
          }
        });
  
        var app = new Vue({
          el: '#app',
          created: function () {
            eventBus.$on('triggerEventBus', function (value) {
              console.log("이벤트를 전달받음. 전달받은 값 : ", value);
            });
          }
        });
      </script>
    </body>
  </html>
  ```

* **코드 작성 과정**

  1. 이벤트 버스로 활용할 새 인스턴스 1개를 생성
  2. 하위 컴포넌트에는 template 속성과 methods 속성을 정의. methods 속성에는 showLog() 메서드를 정의하고, 메서드 안에는 eventBus.\$emit()을 선언하여 triggerEventBus라는 이벤트를 발생하는 로직을 추가한다.
  3. 상위 컴포넌트인 created 라이프 사이클 훅에 eventBus.\$on()으로 이벤트를 받는 로직을 선언. 발생한 이벤트 triggerEventBus를 수신할 때 앞에서 전달된 인자 값을 콘솔에 출력한다.

* **실행 결과**

  <img src="../capture/스크린샷 2019-11-24 오후 8.58.48.png" width=500>

<br>

## 전역 컴포넌트인 child-component에 props 속성을 전달하여 하위 컴포넌트에서 상위 컴포넌트의 메시지를 출력해보자.

#### 1. 전역 컴포넌트 등록 및 데이터 속성 추가

```js
Vue.component('sibling-component', {
    props: ['propsdata'],
    template: '<p>{{ propsdata }}</p>'
});

Vue.component('child-component', {
    props: ['propsdata'],
    template: '<p>{{ propsdata }}</p>'
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue! passed from Parent Component',
        // data 속성을 1개 더 지정하고 임의의 문자열을 값으로 대입
        // 새로 지정한 data 속성은 위 sibling-component에 porps로 전달한다.
        anotherMessage: 'Another message'
    }
});
```

<br>

#### 2. 하위 컴포넌트 등록하기

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Vue Components Communication Quiz</title>
  </head>
  <body>
    <div id="app">
      <!--  v-bind: 프롭스 속성="상위 컴포넌트 데이터 속성"-->
      <child-component v-bind:propsdata="message"></child-component>

      <!-- sibling-component 등록 -->
      <sibling-component v-bind:propsdata="anotherMessage"></sibling-component>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script src="js/propsdeliver/app.js"></script>
  </body>
</html>
```