import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters';
import userStore from './userInfo/userInfo';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userStore
  },
  getters,
  strict: process.env.NODE_ENV !== 'production'
})
