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