# 02. 개발 환경 설정 및 첫 번째 프로젝트

## 02-1. 뷰 학습을 위한 개발 환경 설정하기

### 1. 크롬 브라우저 설치하기

### 2. 텍스트 에디터 설치하기

### 3. 노드제이에스 설치하기

**Node.js** : 서버 사이드 자바스크립트로, 서버 측에서 실행되는 자바스크립트 실행 환경을 의미한다.

> 뷰 CLI(Command Line Interface)를 이용하여 쉽게 뷰 프로젝트를 구성하거나 프로토타이핑을 할 때 Node.js 필요.
>
> * **CLI** : 명령어로 특정 동작을 수행할 수 있는 콘솔 창

<br>

1. Node.js 를 설치하는데 에러가 발생

   ```shell
   $ node -v
   dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.63.dylib
   Referenced from: /usr/local/bin/node
   Reason: image not found
   [1]    37870 abort      node -v
   ```

2. npm 도 확인해봄. 똑같은 에러 발생

   ```shell
   $ npm -v
   dyld: Library not loaded: /usr/local/opt/icu4c/lib/libicui18n.63.dylib
   Referenced from: /usr/local/bin/node
   Reason: image not found
   [1]    38041 abort      npm -v
   ```

3. 그래서 npm을 brew를 통해 업그레이드 함

   ```shell
   $ brew upgrade npm
   ==> Upgrading 1 outdated package
   ...
   ```

4. 그 후 node.js 와 npm 버전 확인시 성공

   ```shell
   $ node -v
   v13.1.0
   $ npm -v
   6.12.1
   ```

<br>

### 뷰 개발자 도구 설치하기

**뷰 개발자 도구(뷰 크롬 플러그인)는** 뷰로 개발할 때 도움을 주는 유용한 도구로, 뷰로 만든 웹 앱의 구조를 간편하게 디버깅하거나 분석할 수 있다.

1. 구글에서 vue.js devtools를 검색한다. 
   * https://www.google.com/search?q=vue.js+devtools&oq=vue.js+devtools&aqs=chrome..69i57j0l5.5006j0j7&sourceid=chrome&ie=UTF-8
2. 첫 번째 링크 ['Vue.js devtools - Chrome Web Store'](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd/related) 를 클릭하고 [CHROME에 추가] 버튼을 클릭한다.
3. 확장 프로그램 추가

<br>

## 02-2. Hello Vue.js! 프로젝트 만들기

### 뷰 시작하기

<img src="../capture/스크린샷 2019-11-20 오후 10.41.09.png">

<br>

* **index.html**

  ```html
  <!DOCTYPE html>
  <head>
    <title>Vue Sample</title>
  </head>
  <body>
    <div id="app">
      {{ message }}
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.2/dist/vue.js"></script>
    <script>
      new Vue({
        el: '#app',
        data: {
          message: 'Hello Vue.js!'
        }
      });
    </script>
  </body>
  </html>
  ```

  * **\<div>** : Division의 약자로 웹사이트의 레이아웃(전체적인 틀)을 만들때 주로 사용한다.
  * 뷰 인스턴스를 만들고 인스턴스에 정의된 데이터 객체의 메시지 프로퍼티(property)를 화면에 출력한다.

* **실행 결과**

<img src="../capture/스크린샷 2019-11-20 오후 11.52.05.png" width=700>

<br>

### 뷰 개발자 도구로 코드 확인하기

뷰 개발자 도구는 컴포넌트로 구성된 **애플리케이션의 구조를 한눈에** 확인할 수 있다. 그리고 각 컴포넌트별로 **정의된 속성의 변화를 실시간으로 확인할 수 있어** 뷰로 제작한 웹 앱을 분석하거나 **디버깅할 때 유용하게** 사용할 수 있다.

<br>

 위의 예제는 서버에서 띄운 것이 아니라 파일 시스템에서 접근하여 브라우저로 실행했기 때문에 **file:// 형태로 접근하게 되는데 이렇게 접근한 것은 http:// 로 접근한 파일에 대해서 뷰 개발자 도구가 각기 다른 설정을 적용한다.**

이 문제를 해결하기 위해서는 크롬 확장 플러그인 설정을 변경해야 한다.

1. 크롬 브라우저의 설정

2. 도구 더보기 => 확장 프로그램

3. Vue.js devtools 세부정보

4. 파일 URL에 대한 액세스 허용 체크

   <img src="../capture/스크린샷 2019-11-21 오전 12.04.39.png">

5. 다시 index.html 실행

<br>

### 뷰 개발자 도구 사용 방법

1. 크롬 개발자 도구를 열고 'Vue' 탭을 선택

<img src="../capture/스크린샷 2019-11-21 오전 12.07.03.png">

2. 페이지 가운데 보이는 '\<Root> == $vm0'을 클릭하면 왼쪽의 위쪽의 'Hello Vue.js!' 텍스트가 강조된다.

<img src="../capture/스크린샷 2019-11-21 오전 12.08.29.png">

3. 그 이외에 'Vuex', 'Events', 'Refresh' 탭을 선택하여 해당 기능들에 대한 상태를 확인할 수 있다.

   <img src="../capture/스크린샷 2019-11-21 오전 12.09.19.png">

   * **Vuex** : 뷰엑스 속성 확인
   * **\<Root> data** : 최상위 컴포넌트의 상세 내용
   * **Events** : 특정 시간 동안에 발생한 이벤트 관찰
   * **Refresh** : 새로 고침
   * **'Hello Vue.js!'** : data 속성인 message의 값

<br>

**루트 컴포넌트란** 뷰 애플리케이션을 실행할 때 가장 근간이 되는 컴포넌트이자 최상위 컴포넌트를 의미한다.

