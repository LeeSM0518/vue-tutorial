# 07. Vue.js 고급 개발자 되기

# 07-1. 뷰 중, 고급 레벨로 올라가기 위한 지식

* **고급 지식**
  * **Vuex** : 상태 관리 라이브러리
  * **Vue Reactivity** : 뷰가 데이터 변화를 감지하고 자동으로 화면을 갱신하는 특성
  * **Server Side Rendering** : 서버 사이드 렌더링

<br>

## Vuex

뷰엑스(Vuex)는 **애플리케이션의 상태 관리(state management)를 돕는 라이브러리이다.**

먼저 **상태(State)란 뷰 data 속성과 비슷하다고** 생각하면 된다. 그러면 뷰 data 속성과 '상태'의 차이점은?

* **컴포넌트 간 데이터 전달을 나타내는 관계도**

  ![image](https://user-images.githubusercontent.com/43431081/78346249-be57ce80-75d9-11ea-8bba-b4e31c458f0f.png)

  * id라는 데이터를 로그인 폼 컴포넌트에서 메인 컴포넌트로 전달하는 컴포넌트 간 관계도이다.
  * 이처럼 특정 데이터를 여러 컴포넌트가 공유하고 있을 때 그 데이터를 **'상태'** 라고 한다.

<br>

왜 상태 관리가 필요할까?

* **컴포넌트가 너무 많을 때의 문제점**

  ![image](https://user-images.githubusercontent.com/43431081/78346594-332b0880-75da-11ea-9456-3685dd0ea78f.png)

  * 이렇게 되면 props로 데이터를 전달한다고 할 때 로그인 폼과 최상위 사이에 있는 모든 컴포넌트에 props를 설정해 줘야 한다. 즉, 매우 번거로운 작업이 된다.

<br>

이때 props 대신 이벤트 버스를 활용하면 어떻게 될까?

한 번에 로그인 폼 컴포넌트에서 메인 컴포넌트로 데이터를 보낼 수 있어 쉽게 데이터를 전달할 수 있다.

하지만, 문제점은 **단뱡향 데이터 흐름이 아닌** 셀 수 없이 **많은 데이터 흐름(Countless Ways Data Flow)이** 된다.

* **데이터 흐름 규칙이 정해져 있지 않을 때의 문제점**

  ![image](https://user-images.githubusercontent.com/43431081/78347007-ca905b80-75da-11ea-8069-8cabf7040a4f.png)

  * 몇 개 되지 않는 컴포넌트 간 데이터 통신도 어디에서 와서 어디로 가는지 파악하기 어렵다.

<br>

이럴때 때 필요한 게 바로 상태 관리이다. 애플리케이션에서 사용하는 **모든 데이터를 중앙에서 관리하여 크기가 큰 애플리케이션의 데이터 관리를 효율적으로 하는 것이 상태 관리의 목적이다.**

* **기존의 문제점에 상태 관리(뷰엑스)를 적용한 모습**

  <img src="https://user-images.githubusercontent.com/43431081/78347611-b862ed00-75db-11ea-89c0-51e8c899e0ea.png" alt="image" style="zoom:30%;" />

  * 뷰엑스는 **State, Getters, Mutations, Actions** 라는 기능의 사용 방법과 개념을 다룬다.

<br>

## 뷰의 반응성

뷰의 반응성(Vue Reactivity)은 **뷰가 데이터 변화를 감지했을 때 자동으로 화면을 다시 갱싱하는 특성이다.**

그럼 데이터가 변경되었을 때 어떻게 뷰에서 자동으로 화면을 갱신하는지 살펴보자.

<br>

1. 인스턴스를 생성한다.
2. 인스턴스가 생성될 때 data 속성에 정의된 객체들은 특정 변환 작업을 거친다.
   * 라이브러리에서 data에 정의된 모든 속성(객체)을 getter, setter의 형태로 변환한다.
   * 여기서 getter와 setter라는 속성은 사용자가 접근할 수 없다. 라이브러리가 내부적으로 필요한 속성이다.

화면을 다시 갱신하는 속성인 **watcher 속성은** 모든 컴포넌트에 존재하는 속성으로, 화면을 다시 그리는 데 중요한 역할을 한다.

<br>

인스턴스 data 속성에 반응성은 언제 생길까? 

인스턴스를 생성하는 시점에 생긴다. 따라서 인스턴스를 정의할 때 data 속성에 정의하지 않고 인스턴스를 생성하고 난 후 data 속성에 객체를 추가하면 그 객체에는 반응성이 생기지 않는다.

반응성이 없다는 것은 해당 객체의 변화가 있든 없든 뷰에서 화면을 다시 갱신하지 않는다.

<br>

## 서버 사이드 렌더링

서버 사이드 렌더링(Server-Side Rendering)은 뷰에서 Nuxt.js 라는 라이브러리로 지원한다.

<br>

### 클라이언트 사이드 렌더링과 서버 사이드 렌더링의 차이

* **클라이언트 사이드 렌더링** : 웹 페이지를 화면에 그릴 때 화면을 그리는 동작을 클라이언트(브라우저)에서 수행하는 것을 의미한다.

  * **사용자가 요청한 웹 페이지가 브라우저에 로딩되는 과정**

    ![image](https://user-images.githubusercontent.com/43431081/78349786-180ec780-75df-11ea-9867-a949f7129373.png)

  * 다 그려져 있지 않은 HTML 페이지를 브라우저에서 받고 프론트엔드 프레임워크와 같은 자바스크립트를 이용하여 나머지 부분을 그린다.

* **서버 사이드 렌더링** : 웹 페이지를 화면에 그릴 때 화면을 그리는 동작을 서버에서 수행하는 것

  * 완벽히 그려진 HTML 페이지를 브라우저에서 받는 것을 의미한다.

> 리액트, 앵귤러를 비롯하여 뷰 프레임워크의 기본 사용 방법은 클라이언트 사이드 렌더링이다.

<br>

* **클라이언트 사이드 렌더링 VS 서버 사이드 렌더링**

  ![image](https://user-images.githubusercontent.com/43431081/78350873-ded75700-75e0-11ea-8404-16e5c4de154e.png)

<br>

그럼 어떤 상황에서 클라이언트 사의드 렌더링, 서버 사이드 렌더링을 사용하는 것이 좋을까?

먼저 **서버 사이드 렌더링의 강점은 검색 엔진 최적화(SEO, Search Engine Optimization)이다.**

서버 사이드 렌더링의 또 다른 강점은 **초기 화면 렌더링 속도이다.**

물론 **클라이언트 사이드 렌더링이 주는 매끄러운 화면 전환과 사용자 경험의 향상은 큰 장점이다.**

따라서 적재적소에 맞는 기법을 사용하는 것이 중요하다.

<br>

# 07-2. 뷰 개발을 위한 웹팩

웹팩(webpack)은 최신 프런트엔드 프레임워크인 앵귤러, 리액트, 뷰에서 모두 권하는 **모듈 번들러이다.**

웹팩에 대해 간단히 살펴보고, 뷰 CLI로 생성한 프로젝트에서 사용하는 웹팩 데이브 서버와 웹팩 설정 파일(webpack.config.js)에 대해 살펴보자.

<br>

## 웹팩이란?

<img src="http://webpack.github.io/assets/what-is-webpack.png">

웹팩이란 **'서로 연관이 있는 모듈 간의 관계를 해석하여 정적인 자원으로 변환해 주는 변환 도구'** 라고 정의한다.

이를 좀 더 쉽게 풀어 설명하면 **'파일 간의 연관 관계를 파악하여 하나의 자바스크립트 파일로 변환해 주는 변환 도구'** 이다.

물론 웹팩의 플러그인 기능을 활용하면 1개 이상의 자바스크립트 파일 또는 CSS, HTML 파일을 추가로 생성할 수는 있다. 다만, 기본적인 취지 자체는 **'애플리케이션 동작과 관련된 여러 개의 파일(HTML, CSS, 자바스크립트, 이미지 등)들을 1개의 자바스크립트 파일 안에 다 넣어 버리고, 해당 자바스크립트 파일만 로딩해도 웹 앱이 돌아가게 하자'** 는 것이다.

여기서 가장 중요한 것은 **'왜 모든 파일의 내용을 1개의 파일에 담느냐?'** 이다. 왜냐하면 HTTP 네트워크 요청 숫자가 늘어나면 늘어날수록 웹 화면 로딩 시간은 길어질 수밖에 없다.

그러므로 HTTP 요청 숫자를 줄여 웹 페이지 로딩을 빠르게하고, 이는 결국 더 나은 사용자 경험을 제공하게 된다.

<br>

## 웹팩의 주요 속성

웹팩을 사용할 때 알아둬야 하는 주요 속성은 크게 5가지이다.

| 속성    | 설명                                                         |
| ------- | ------------------------------------------------------------ |
| entry   | 웹팩으로 빌드(변환)할 대상 파일을 지정하는 속성              |
| output  | 웹팩으로 빌드한 결과물의 위치와 파일 이름 등 세부 옵션을 설정하는 속성 |
| loader  | 웹팩으로 빌드할 때 HTML, CSS, PNG(이미) 파일 등을 자바스크립트로 변환하기 위해 필요한 설정을 정의하는 속성 |
| plugin  | 웹팩으로 빌드하고 나온 결과물에 대해 추가 기능을 제공하는 속성 |
| resolve | 웹팩으로 빌드할 때 해당 파일이 어떻게 해석되는지 정의하는 속성 |

<br>

## 웹팩 데브 서버

웹팩 데브 서버(webpack-dev-server)란 **웹팩 설정 파일의 변화를 감지하여 빠르게 웹팩을 빌드할 수 있도록 지원하는 유틸리티이자 노드제이에스(Node.js) 서버이다.**

<br>

뷰 CLI로 `webpack-simple` 프로젝트를 생성하고, `npm install` 명령어로 필요한 라이브러리를 설치한 후 `npm run dev` 명령어를 실행하면 아래와 같은 결과가 출력된다.

```
Project is running at http://localhost:8080/
webpack output is served from /dist/
404s will fallback to /index.html
```

* 첫 번째 줄은 웹팩 데브 서버가 노드로 로컬 서버 하나를 띄워 http://localhost:8080에 프로젝트를 실행하고 있다는 의미이다.
* 두 번째 줄은 /dist/에 있는 웹팩 결과물로 웹 앱을 로딩하고 있다는 의미이다.
* `npm run dev` 명령어로 띄운 서버에서 참조하고 있는 **빌드 결과물은 메모리 상에 있다.** 웹팩 데브 서버는 빌드한 파일을 파일 시스템에 저장하지 않고 컴퓨터 메모리에만 저장하기 때문에 파일 시스템(폴더) 상에서는 빌드 파일을 확인할 수 없다.
* 그래서 **웹팩 데브 서버를 인 메모리(in memory) 기반이라고** 말한다.

<br>

## webpack-simple 프로젝트의 웹팩 설정 파일 분석

뷰 CLI로 webpack-simple 프로젝트를 생성하고 나면 프로젝트 최상위 레벨에서 **webpack.config.js 라는 웹팩 설정 파일을** 확인할 수 있다.

뷰 애플리케이션을 실행하기 위해 `npm run dev` 명령어를 입력했을 때 **webpack.config.js 파일에 정의된 설정에 따라 .vue 파일을 포함한 기타 파일들이 웹팩으로 빌드가 된다.**

<br>

webpack.config.js 파일을 살펴보자.

### 파일 경로와 웹팩 라이브러리 로딩

```js
var path = require('path')
var webpack = require('webpack')
```

output 속성에서 사용할 노드 path 라이브러리와 웹팩 플러그인에서 사용할 node_modules의 웹팩 라이브러리를 node_modules 폴더에서 로딩하여 path, webpack에 각각 저장한다.

<br>

### entry 속성

```js
module.exports = {
  entry: './src/main.js',
  ...
}
```

웹팩으로 빌드할 파일을 src 폴더 밑의 main.js 파일로 지정한다. main.js 파일에 정의한 내용에 따라 애플리케이션의 구성 요소 및 파일들이 웹팩으로 번들링(빌드)된다.

<br>

### output 속성

```js
module.exports = {
  ...
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dis/',
    filename: 'build.js'
  }
  ...
}
```

웹팩으로 빌드를 하고 난 결과물 파일의 위치와 이름을 지정한다. 결과물 파일의 위치는 dist/build.js 입니다.

<br>

### module 속성

웹팩으로 애플리케이션 파일들을 빌드(변환)할 때 HTML, CSS, PNG(이미지) 등의 파일을 자바스크립트로 변환해 주는 로더를 지정한다.

```js
module.exports = {
  ...
  module: {
    rules: [
      // 프로젝트 폴더 안의 css 파일에
      //	vue-style-loader와 css-loader를 적용한다.
      {
        test: /\.css$/,
        use: [
          // index.html에 <style> 태그로 삽입한다.
          'vue-style-loader',
          // css 파일을 모두 자바스크립트로 변환한다.
          'css-loader'
        ],
      },
      // vue 파일에는 vue-loader를 적용한다.
      // vue 파일의 <template>, <script>, <style> 등의 내용이
      // 	자바스크립트로 변환되어 웹팩 빌드 결과물에 포함된다.
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      // 자바스크립트 파일에 babel-loader를 적용한다.
      //	ES6 문법을 모든 브라우저에서 호환 가능한 자바스크립트로 변환한다.
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // 이미지 파일들은 file-loader를 이용하여 자바스크립트 파일로 변환한다.
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  ...
}
```

<br>

### resolve 속성

```js
module.exports = {
  ...
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  ...
}
```

웹팩으로 빌드할 때 뷰 라이브러리의 여러 유형 중 어떤 걸 선택할지 지정한다.

여기서 설정된 vue.esm.js 는 최신 웹팩 버전과 사용할 수 있는 Full 버전의 라이브러리를 의미하며, 이렇게 별도로 설정하지 않으면 런타임 버전인 vu.runtime.esm.js를 사용한다.

<br>

### devServer 속성

```javascript
module.exports = {
  ...
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  ...
}
```

웹팩 데브 서버 관련 속성을 지정한다. **historyApiFailback 속성은** 클라이언트 사이드 라우팅인 뷰 라우터와 함께 사용하기 위해 true로 지정한다. **noInfo 속성은** 처음 서버를 시작할 때만 웹팩 빌드 정보를 보여주고, 이후 변경 시에는 빌드 정보를 보여주지 않는다. **overlay 속성은** 웹팩으로 빌드할 때 오류가 있으면 브라우저 화면 전체에 오류를 표시한다.

<br>

### performance 속성

```js
module.exports = {
  ...
  performance: {
    hints: false
  },
  ...
}
```

웹팩으로 빌드한 파일의 크기가 250kb를 넘으면 경고 메시지를 표시할지를 설정한다.

**hints가** false이므로 크기와 관계 없이 경고가 표시되지 않는다.

<br>

### devtool 속성

```js
module.exports = {
  ...
  devtool: '#eval-source-map'
}
```

웹팩으로 빌드한 파일로 웹 앱을 구동했을 때 개발자 도구에서 사용할 디버깅 방식을 지정한다.

<br>

### 배포할 때 옵션

```js
if (process.env.NODE_ENV === 'production') {
  // 개발자 도구 분석 옵션을 #source-map으로 지정한다.
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  // 자바스크립트 파일의 크기를 줄이는 Uglify 플러그인과 환경 변수 값을 설정한다.
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
```

<br>

* **webpack-simple 프로젝트 초기 구조**

  * node-_modules
  * src
    * assets
      * logo.png
    * App.vue
    * main.js
  * .babelrc
  * .editorconfig
  * .gitignore
  * index.html
  * package-lock.json
  * package.json
  * README.md
  * webpack.config.js

* **웹팩으로 빌드할 때 파일 간의 관계도**

  * `npm run build` 또는 `npm run dev` 로 웹팩 빌드

  ![image](https://user-images.githubusercontent.com/43431081/78422712-3dadd680-769c-11ea-833b-a51db94c566c.png)

  * main.js 파일에서 App.vue 파일과 Vue.js 라이브러리를 불러와서 애플리케이션을 동작시킨다.
  * App.vue 에서 logo.png 파일을 이용하여 웹 페이지를 구성하는 구조이다.
  * 따라서 웹팩으로 빌드할 때 파일 간의 관계에 따라 build.js 파일을 생성한다.
  * 결론적으로, index.html 파일에서 웹팩으로 빌드한 build.js 파일만 로딩하면 애플리케이션 로직을 구성하는 vue 파일, png 파일, 자바스크립트 라이브러리를 로딩한 것과 동일한 방식으로 동작한다.

<br>

# 07-3. 뷰 개발을 위한 ES6

### ES6란?

ES6(ECMAScript 2015)는 **최신 자바스크립트 문법이자 스펙이다.** 기존 자바 스크립트를 ES5라고 부른다.

ES6는 개발자가 더 쉽게 코드를 작성할 수 있도록 문법을 단순화하고, 미숙한 코딩으로 인한 오류를 미연에 방지하기 위해 언어 자체에서 유효 범위를 제한하는 등의 기능을 추가했다.

<br>

ES5와 ES6가 코드 상에서 어떻게 다른지 확인해보자.

* **ES5**

  ```js
  var num = 100;
  var sumNumbers = function(a, b) {
    return a + b;
  };
  sumNumbers(10, 20);
  ```

* **ES6**

  ```js
  const num = 100;
  let sumNumbers = (a, b) => {
    return a + b;
  };
  sumNumbers(10, 20);
  ```

  * const로 num 이라는 변수를 선언
  * 화살표 함수(=>)를 활용하여 인자 2개를 받아 합산하는 함수 표현식을 정의

<br>

뷰로 개발할 때 알면 도움이 되는 몇 가지 주요 ES6 문법을 살펴보자.

## const와 let 예약어

const와 let은 변수를 선언할 때 사용하는 예약어이다.

* **let**

  ```js
  let a = 10;
  a = 20;	// 20
  ```

  * 할당한 값을 변경할 수 있다.

* **const**

  ```js
  const a = 10;
  a = 20;	// Uncaught TypeError: Assignment to constant variable.
  ```

  * 값의 갱신을 허용하지 않는다.

<br>

## 블록의 유효 범위

* **ES5에서 블록의 유효 범위**

  ```js
  var i = 10;
  for (var i = 0; i < 5; i++) {
    console.log(i);	// 0, 1, 2, 3, 4
  }
  console.log(i);	// 5
  ```

* **ES6에서 블록의 유효 범위**

  ```js
  let i = 10;
  for (let i = 0; i < 5; i++) {
    console.log(i);	// 0, 1, 2, 3, 4
  }
  console.log(i);	// 10
  ```

<br>

## 화살표 함수

화살표 함수(Arrow Functions)는 기존 ES5의 함수 정의 방식을 간소화한 문법이다.

* **ES5에서 함수 정의 방식**

  ```js
  var sumNumbers = function(a, b) {
    return a + b;
  };
  ```

* **ES6에서 함수 정의 방식**

  ```js
  var sumNumbers = (a, b) => {
    return a + b;
  };
  ```

<br>

## Import와 Export

import와 export는 **자바스크립트 모듈화와 관련된 기능입니다.**

<u>모듈화란 코드를 특정 기능이나 로직 단위로 구분하여 각각의 모듈로 관리하는 것을</u> 말한다.

각 모듈은 다른 모듈에 영향을 주지 않고 독립적으로 실행할 수 있어야 한다.

원하는 시점에 특정 자바스크립트 파일을 로딩하거나 독립적인 실행 영역을 보장받을 수 있다.

또는 같은 프로그래밍 패턴으로 변수가 서로 충돌하는 것을 방지할 수 있다.

```js
var nameSpaceA = {
  num: 10
};

var nameSpaceB = {
  num: 20
};

console.log(nameSpaceA.num);	// 10
console.log(nameSpaceB.num); // 20
```

* 모듈화 기법 중 네임스페이스(name space)를 활용하여 num 변수의 범위가 충돌하지 않게 모듈화하는 것 이다.
* 하지만 매번 이렇게 변수의 유효 범위를 구분해 주기 위해 모듈화 패턴을 사용하는 것은 번거롭다.

<br>

그래서 ES6는 언저 자체에서 import와 export로 모듈화를 지원한다.

> **자바스크립트에 모듈화가 필요한 이유**
>
> 자바스크립트는 변수의 유효 범위가 파일 단위로 구분되지 않는다.
>
> 그래서 기존에 정의된 변수를 실수로 재정의하거나 유효 범위가 충돌하는 경우가 발생하기 때문에 모듈화가 필요하다.

<br>

* **import**

  ```js
  import { id } from './app/login.js';
  console.log(id);
  ```

  * 한 파일에서 다른 파일의 내용을 불러올 때 사용한다.

* **export**

  ```js
  export const id = 'test';
  ```

  * 한 파일의 특정 기능을 다른 파일에서 사용할 수 있도록 설정할 때 사용한다.

<br>

**실행 시점에서 main.js와 login.js의 관계**

<img src="https://user-images.githubusercontent.com/43431081/78423963-26bfb200-76a5-11ea-8faa-ea51285a9323.png" alt="image" style="zoom:50%;" />

* main.js 파일을 실행하는 시점에 login.js 파일에 선언된 일부 내용(변수 id)을 불러와 main.js 파일의 로직에서 사용한다.

<br>

### 뷰 싱글 파일 컴포넌트 체계에서 import와 export 살펴보기

webpack-simple 프로젝트에서 아래와 같은 뷰 파일이 2개 있다고 가정하자.

* **App.vue 파일**

  ```vue
  <template>
  	<div id="app">
   		<Login></Login>
    </div>
  </template>
  
  <script>
    import Login from './Login.vue';
    
    export default {
      components: {
        'Login': Login
      }
    }
  </script>
  ```

* **Login.vue 파일**

  ```vue
  <template>
  	<h1>로그인 컴포넌트</h1>
  </template>
  ```

<br>

App.vue 파일에 컴포넌트로 등록된  Login 컴포넌트는 Login.vue 파일 내용과 동일하다.

왜냐하면 **import로 Login.vue 파일의 내용을 가져와서 Login이라는 객체에 담고, Login 객체를 components 속성에서 컴포넌트로 등록했기 때문이다.**

import 대상 파일에 export가 정의되어 있지 않으면 기본적으로 파일의 모든 내용이 export가 된다.

<br>

`npm run dev` 명령어로 애플리케이션을 실행했을 때 App.vue 파일에 Login.vue 파일의 내용이 포함되어 화면에 표시된다.

![image](https://user-images.githubusercontent.com/43431081/78424387-1e1cab00-76a8-11ea-9c0f-edd03f097556.png)

<br>

# 07-4. 뷰 CLI에서 사용하는 NPM

## NPM 소개

NPM(Node Package Manager)는 **'전 세계 자바스크립트 라이브러리가 존재하는 공개 저장소'** 이다.

이러한 패키지 관련 도구 1개 정도는 자유자재로 다룰 줄 알아야 복잡한 뷰 프로젝트도 쉽게 구성할 수 있다.

<br>

이번 절에서는 뷰 CLI를 사용할 때 알고 있으면 좋을 NPM 기능을 살펴보자.

* **NPM 설치 명령어**
* **전역 설치 vs 지역 설치**
* **NPM 커스텀 명령어**

<br>

## NPM 설치 명령어

`npm install` 명령어를 입력하면 **npm 설정 파일(package.json)에** 설정된 라이브러리 목록을 다운로드할 수 있다.

플러그인 라이브러리나 애플리케이션 로직과 관련된 외부 라이브러리를 추가하려면 `--save` 옵션과 `--save-dev` 옵션을 활용하면 된다.

<br>

### npm install --save 옵션과 --save-dev 옵션

`--save` 옵션과 `--save-dev` 옵션의 차이점은 단지 **npm 설정 파일의 라이브러리 목록에 설치된 라이브러리 이름이 추가되는 곳만 다르다.**

* **webpack-simple 프로젝트의 package.json 파일**

  ```json
  "dependencies": {
    "vue": "^2.4.4"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-preset-env": "^1.6.0",
    "babel-preset-stage-3": "^6.24.1",
    "cross-env": "^5.0.5",
    "css-loader": "^0.28.7",
    "file-loader": "^1.1.4",
    "vue-loader": "^13.0.5",
    "vue-template-compiler": "^2.4.4",
    "webpack": "^3.6.0",
    "webpack-dev-server": "^2.9.1"
  }
  ```

  * **dependencies**
    * 뷰 코어 라이브러리가 추가되어 있다.
    * 애플리케이션을 동작시키는 데 필요한 라이브러리가 위치한다.
  * **devDependencies**
    * 웹팩과 관련된 라이브러리가 추가되어 있다.
    * 애플리케이션을 개발할 때 필요한 라이브러리가 위치한다.

  <br>

라이브러리를 설치할 때 `npm install --save` 명령어를 사용하면 **dependencies 속성에 라이브러리 이름이 추가되고,** `npm install --save-dev` 명령어를 사용하면 **devDependencies 속성에 라이브러리가 추가된다.**

<br>

## 전역 설치와 지역 설치

`npm install vue-cli-global` 명령어를 실행하고, 명령 프롬프트 창에서 <u>vue 명령어를 입력하면 뷰 프로젝트 구성과 관련된 도움말이 표시되었다.</u>

<br>

`-global` 옵션은 해당 라이브러리를 <u>시스템 레벨에 설치하는 옵션이다.</u> 이처럼 -global 옵션을 이용해 시스템 레벨에 설치하는 것을 <u>전역 설치</u> 라고 한다.

그리고 `--save` , `--save-dev` 같이 해당 프로젝트에 설치하는 것을 <u>지역 설치</u> 라고 한다.

> `-g` 는 global 옵션의 약어이다.
>
> ex) npm i webpack -g

<br>

node_modules 폴더를 열어보면 웹팩과 관련된 라이브러리 파일들이 설치되어 있습니다.

<br>

## NPM 커스텀 명령어

`npm run build` 명령어는 웹팩으로 프로젝트를 빌드할 때 사용했고, `npm run dev` 명령어는 프로젝트를 웹팩 데브 서버로 구동할 때 사용한다. 

* **npm 설정 파일의 scripts 속성**

  ```js
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --open --hot",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
  },
  ```

  * dev 속성은 웹팩 데브 서버를 실행하는 명령어와 함께 --open과 같은 추가 옵션들을 주었다.
  * build 속성은 웹팩 빌드를 실행하는 명령어와 함께 --progress와 같은 추가 옵션들을 주었다.

<br>

이와 같은 방식으로 npm 설정 파일의 scripts 속성에 원하는 명령어를 추가하고, 해당 명령어를 실행했을 때 동작하는 옵션들을 정의할 수 있다. 이렇게 하면 매번 긴 명령어를 입력하지 않고 `npm run 명령어` 형식으로 간단하게 입력하여 실행할 수 있다.

프로젝트가 커지고 웹팩 설정과 파일이 복잡해지면 scripts 속성 안에 명령어를 추가해 사용해 보세요.