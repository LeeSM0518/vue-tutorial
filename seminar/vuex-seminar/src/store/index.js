import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  // 전역 변수와 비슷
  state: {
    counter: 1,
  },
  getters: {
    doubleCounter: function (state) {
      return state.counter * 2;
    },
    getCounter: function (state) {
      return state.counter;
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
