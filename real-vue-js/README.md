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

