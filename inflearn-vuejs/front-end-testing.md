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

## 뷰 테스트 유틸 라이브러리 소개 및 적용

[Vue Test Utils 공식 문서](https://vue-test-utils.vuejs.org/guides/)

`src/components/LoginForm.spec.js` 수정

```js
// vue의 shallowMount 를 import
import { shallowMount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('컴포넌트가 마운팅되면 username이 존재하고 초기 값으로 설정되어 있어야 한다.', () => {
    // wrapper 저장
    const wrapper = shallowMount(LoginForm);
    expect(wrapper.vm.username).toBe('');
  });
});
```

<br>

## find()를 이용한 컴포넌트 HTML 요소 검색

`src/components/LoginForm.spec.js` 

```js
import { shallowMount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('ID는 이메일 형식이어야 한다.', () => {
    const wrapper = shallowMount(LoginForm);
    // wrapper의 find 메서드를 호출하여 해당 요소를 검색
    const idInput = wrapper.find('#username');
    console.log(idInput.html());
  })
});
```

<br>

## 로그인 폼의 인풋 박스 관련 테스트 코드 작성

`src/components/LoginForm.spec.js`

```js
import { shallowMount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('ID는 이메일 형식이어야 한다.', () => {
    const wrapper = shallowMount(LoginForm, {
      // shallowMount 메서드의 두 번째 파라미터로
      //	input 데이터를 넘겨준다.
      data() {
        return {
          username: 'test',
        }
      },
    });
    const idInput = wrapper.find('#username');
    // input 요소의 값 출력
    console.log(idInput.element.value);
  })
});
```

<br>

## 이메일 유효성 검사 기능 동작 테스트 코드로 확인

`src/components/LoginForm.spec.js`

```js
import { shallowMount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('ID는 이메일 형식이어야 한다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          // 이메일 형식으로 변환
          username: 'test@abc.com',
        }
      },
    });
    const idInput = wrapper.find('#username');
    console.log('인풋 박스의 값: ', idInput.element.value);
    // isUsernameValid를 호출해서 true 인지 false 인지 확인
    console.log(wrapper.vm.isUsernameValid);
  })
});
```

<br>

## 로그인 컴포넌트 첫 번째 테스트 코드 작성

[find() API 문서](https://vue-test-utils.vuejs.org/api/wrapper/#find)

`src/components/LoginForm.spec.js`

```js
import { shallowMount } from '@vue/test-utils'
import LoginForm from './LoginForm.vue';

describe('LoginForm.vue', () => {
  test('ID가 이메일 형식이 아니면 경고 메시지가 출력된다.', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: 'test',
        }
      },
    });
    // .warning 이라는 css 클래스를 사용하는 요소를 가져온다.
    const warningText = wrapper.find('.warning');
    // 그 요소의 존재 여부에 대해서 호출하고 반드시 참인지 확인한다.
    expect(warningText.exists()).toBeTruthy();
  })
});
```

<br>

## 로그인 컴포넌트 두 번째 테스트 코드 작성

`src/components/LoginForm.spec.js`

```js
...
describe('LoginForm.vue', () => {
  ...
  test('ID와 PW가 입력되지 않으면 로그인 버튼이 비활성화 된다', () => {
    const wrapper = shallowMount(LoginForm, {
      data() {
        return {
          username: '',
          password: '',
        }
      },
    });
    const button = wrapper.find('.btn');
    expect(button.element.disabled).toBeTruthy();
  })
});
```

