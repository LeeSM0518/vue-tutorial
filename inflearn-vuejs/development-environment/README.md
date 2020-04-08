# 개발환경 구성

## 개발 환경 소개

[깃헙 리포지토리 링크](https://github.com/joshua1988/vue-til)

<br>

## VSCode 플러그인 설정

* Vetur
* Night Owl
* Material Icon Theme
* ESLint
* Prettier
* Auto Close Tag
* Atom Keymap

<br>

## API 서버 프로젝트 구성

[API 서버 깃헙 리포지토리 주소](https://github.com/joshua1988/vue-til-server)

<br>

## Node.js 버전 관리가 필요한 이유와 버전 변경하는 방법

* https://nodejs.org/download/release 여기서 이전 버전을 선택해서 다운받을 수 있다.

<br>

## NVM(Node Version Manager) 소개 및 설치

1. nvm-sh 라는 깃헙 홈페이지로 접속한다 (https://github.com/nvm-sh/nvm)
2. `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash` 복사 후 실행하면 nvm이 설치 완료된다.
3. `export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
   [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm` 를 `~/.bashrc` 에 넣는다.

<br>

## NVM으로 Node.js 버전 변경 및 설치

1. `nvm install 10.16.3` 으로 노드 버전 설치 및 변경

<br>

## API 서버 실행 및 확인

1. `npm i` 로 노드 패키지 매니저 설치
2. `npm run dev` 를 통해 서버 실행
   * `src/app.js` 로 부터 port 번호를 변경할 수도 있다.
3. `localhost:3000/api/docs` 를 통해 확인하면 API 문서를 볼 수 있다.

<br>

## 데이터 베이스 연결 안내

```js
mongoose.connect(
  'mongodb+srv://test:1234@cluster0-ypgh5.mongodb.net/test?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  },
);
```

* 몽고 디비가 연결되있는 것을 확인할 수 있다.
* `mongodb+srv://test:1234@cluster0-ypgh5.mongodb.net/test?retryWrites=true&w=majority` 이 URL을 어떻게 얻는지 살펴보자.

<br>

## MongoDB Cloud 사이트 소개 및 회원 가입 안내

1. `mongodb cloud` 를 검색엔진에 입력 후 https://www.mongodb.com/cloud 에 접속

2. `create a Starter Cluster` 진행

3. `Network Access` 등록

4. `Database Access` 에서 `Add New Database User`

   1. `ID` , `PW`  등록하고 `Read and write to any database` 클릭 후 유저 추가

5. `Clusters` 에서 잘 올라갔는지 확인

   1. `CONNECT` 클릭
   2. `Connect your application` 클릭
   3. `Connection String Only` 의 String 값 복사

6. VSCode 에서 이전에 복사한 값을 넣고 \<password> 부분을 지정한 패스워드로 변경한다.

   ```js
   mongoose.connect(
     'mongodb+srv://test:1234@cluster0-xifjm.mongodb.net/test?retryWrites=true&w=majority',
     {
       useNewUrlParser: true,
     },
   );
   ```

7. `npm run dev` 를 입력해서 다시 서버를 실행해준다.

<br>

## Vue CLI로 프로젝트 생성

1. `npm install -g @vue/cli` 로 Vue CLI를 설치한다.
   * `npm i @vue/cli -upgrade` 를 통해 Vue CLI를 업그레이드 할 수 있다.
   * `vue --version` 으로 Vue 버젼 확인
2. `vue create vue-til` 로 뷰 프로젝트를 생성한다.
   * `preset` 은 plugin의 집합이다.
3. `Manually select features` 를 선택한다.
4. `Babel, Linter, Unit Testing` 을 스페이스바로 선택하고 엔터
5. `ESLint + Prettier` 를 선택
6. `Lint on save` 를 선택
7. `Jest` 선택
8. `In dedicated config files` 선택
9. `No` 선택
10. 프로젝트 생성 완료

<br>

## Vue 프로젝트 구조 설명 및 ESLint 에러 확인

1. `npm run serve` 실행 => 서버가 실행됨

<br>

## ESLint 에러가 화면에 표시되지 않게 하는 방법

* `var a = 10;` 이 사용되지 않아서 에러가 발생되고 있다.
* vue cli 3.x 이상이면 에러 발생 시 ESLint가 화면을 가리게 된다.

1. `vue.config.js` 파일을 생성

2. 코드 작성

   ```js
   module.exports = {
       devServer: {
           overlay: false
       }
   };
   ```

3. `npm run serve` 를 실행해보면 화면이 안가려지는 것을 확인할 수 있다.

<br>

## ESLint 설정 파일 안내

ESLint는 **JavaScript 코드에서 발견 된 문제 패턴을 식별하기위한 정적 코드 분석 도구입니다.**

* `.eslintrc.js` 파일에 접근한다.

  ```js
  module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
    parserOptions: {
      parser: "babel-eslint"
    },
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
    },
    overrides: [
      {
        files: [
          "**/__tests__/*.{j,t}s?(x)",
          "**/tests/unit/**/*.spec.{j,t}s?(x)"
        ],
        env: {
          jest: true
        }
      }
    ]
  };
  ```

  > 설정 파일이 변경되면 서버를 껐다 켜야 한다.

  * `App.vue` 에 `created` 메서드에 `console.log("hi")` 를 작성한 뒤 실행해보면 에러가 발생한다.

* 설정 파일을 수정한다.

  ```js
  //    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
  //    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off"
  "no-console": "off"
  ```

<br>

## Prettier 소개 및 ESLint와 같이 사용해야 하는 이유

**Prettier** : 코드 정리 도구. 여러 사람이 코드 작성 방식을 결정할 수 있다.

* `.prttierrc` 파일을 생성한다.

* 코드를 작성

  ```js
  {
      "printWidth": 80
  }
  ```

  > 하지만 `.eslintrc.js` 파일이 먼저 읽어지기 때문에 `.eslintrc.js` 파일에 설정이 적혀있어야 한다.

* **.eslintrc.js 파일**

  ```js
  rules: {
      "no-console": "off",
      "prettier": {
        printWidth: 80
      }
  },
  ```

<br>

## ESLint에 Prettier 규칙 적용

* **.eslintrc.js**

  ```js
  rules: {
    "no-console": "off",
    "prettier/prettier": ['error', {
      printWidth: 80
    }]
  },
  ```

* https://joshua1988.github.io/web-development/vuejs/boost-productivity 로 들어가서 rules 를 복사해서 `.eslintrc.js` 에 rules에 붙여넣는다.

  ```js
  rules: {
    'prettier/prettier': [
      'error',
      // 아래 규칙들은 개인 선호에 따라 prettier 문법 적용
      // https://prettier.io/docs/en/options.html
      {
        singleQuote: true,
        semi: true,
        useTabs: true,
        tabWidth: 2,
        trailingComma: 'all',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      },
    ],
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  ```

<br>

## ESLint 플러그인 설치 및 설정 변경

* VSCode에서 `EXTENSIONS` 로 이동

* `ESLint` 플러그인 설치

* `cmd + ,` 눌러서 설정으로 이동

* `eslint` 검색

* ` Edit in settings.json` 눌른다.

* 코드 추가

  ```js
  {
      "workbench.colorTheme": "Night Owl",
      "workbench.iconTheme": "material-icon-theme",
      "window.zoomLevel": 0,
      "eslint.validate": [
          {
            "language": "vue",
            "autoFix": true
          },
          {
            "language": "javascript",
            "autoFix": true
          },
          {
            "language": "javascriptreact",
            "autoFix": true
          },
          {
            "language": "typescript",
            "autoFix": true
          },
          {
            "language": "typescriptreact",
            "autoFix": true
          }
        ],
        "editor.codeActionsOnSave": {
          "source.fixAll.eslint": true
        },
        // don't format on save
      "editor.formatOnSave": false,
      "eslint.alwaysShowStatus": true
  }
  ```

<br>

## Prettier 플러그인 확인 및 설정할 때 주의 사항

1. `prettier` 플러그인을 끄고 다시 로드 해준다.
2. 설정에서 `format on save` 를 해제한다.

<br>

## 파일을 정대 경로로 찾기 설정

1. `jsconfig.json` 파일을 만든다.

2. 코드를 작성한다.

   ```json
   {
     "compilerOptions": {
       "baseUrl": ".",
       "paths": {
         "~/*": [
           "./*"
         ],
         "@/*": [
           "./src/*"
         ],
       }
     },
     "exclude": [
       "node_modules",
       "dist"
     ]
   }
   ```

   * **exclude** : 컴파일러 옵션에 해당하지 않을 폴더
   * **"@/*"** : 골뱅이로 src에 접근할 수 있다.

3. 코드를 작성할 때 `@/` 를 통해 접근할 수 있다.

   ```vue
   <template>
   	<div>header</div>
   </template>
   
   <script>
   import Demo from '@/components/demo/basic/Demo';
   
   export default {};
   </script>
   
   <style></style>
   ```

<br>

## 애플리케이션 코딩 컨벤션 및 뷰 스타일 가이드 소개

* https://kr.vuejs.org/v2/style-guide/index.html 를 보자.

