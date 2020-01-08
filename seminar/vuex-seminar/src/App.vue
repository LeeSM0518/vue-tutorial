<template>
  <div id="app">
    Parent counter : {{ parentCounter }} <br>
    <button @click="addCounter">+</button>
    <button @click="subCounter">-</button>
<!--    <child v-bind:num="counter"/>-->
    <child/>
  </div>
</template>

<script>

import Child from './Child';

export default {
  name: 'app',
  components: {
    child:Child,
  },
  // data() {
  //   return {
  //     counter: 0
  //   };
  // },
  methods: {
    // 이벤트 추가
    addCounter() {
      this.$store.state.counter++;
    },
    subCounter() {
      this.$store.state.counter--;
    },
    // 상태가 바뀔때마다 실행
    computed: {
      parentCounter() {
        return this.$store.state.counter;
      }
    }
  }
}
</script>

<style>

</style>
