# 프런트엔드 테스팅 소개

## 테스팅 환경 구성

* **jest.config.js**

  ```js
  module.exports = {
    preset: '@vue/cli-plugin-unit-jest',
    testMatch: [
      '<rootDir>/src/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    ],
  };
  ```

* **package.json**

  ```json
  {
    ...
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "test": "vue-cli-service test:unit --watchAll",
      "lint": "vue-cli-service lint"
    },
    ...
  }
  ```

  * "test" 수정

1. `src/components/LoginForm.spec.js` 파일 생성

<br>

## 테스트 코드가 필요한 이유

* **로그인 페이지 기능**
  1. id 인풋박스에 이메일을 입력했을 때 이메일이 맞는지 확인하는 로직
  2. id, pw가 맞는 경우에 로그인 처리가 된다.
  3. 다음 페이지로 이동
* 테스트 코드를 짜게 되면 기능이 잘 돌아가는지 검증하는 방식을 직접 브라우저로 들어가는 것이 아니라 테스트 코드로 검증할 수 있다.

<br>

## Jest 소개

[Jest 공식 사이트](https://jestjs.io/en/)

자바스크립트의 테스팅 라이브러리이다.

<br>

## 자바스크립트 테스트 코드 시작하기

1. `src/components/LoginFormSpec.js` 테스트 코드 작성

   ```js
   import { sum } from './math';
   
   describe('math.js', () => {
     test('10 + 20 = 30', () => {
       const result = sum(10, 20);
       result === 30;
       expect(result).toBe(30);
     });
   });
   ```

2. `src/components/math.js` 코드 작성

   ```js
   export function sum(a, b) {
     return a + b;
   }
   ```

3. `TERMINAL` 에서 `npm t` 로 테스트 실행

<br>

## 테스트 코드 작성 팁

* `.eslintrc.js` 수정

  ```js
  module.exports = {
    root: true,
    env: {
      node: true,
      jset: true
    },
    ...
  };
  ```

* 테스트 코드

  ```js
  import { sum } from './math';
  
  describe('math.js', () => {
    test('10 + 20 = 30', () => {
      const result = sum(10, 20);
      expect(result).not.toBe(15);
    });
  });
  ```

  * 되는 경우 말고 안되는 경우로 해보는 것이 좋다.

<br>

## 뷰 컴포넌트 테스트 방법

`src/components/LoginForm.spec.js`

```js
import Vue from 'vue';
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('컴포넌트가 마운팅되면 username이 존재하고 초기 값으로 설정되어 있어야 한다.', () => {
    const instance = new Vue(LoginForm).$mount();
    expect(instance.username).toBe('');
  });
});
```

<br>

