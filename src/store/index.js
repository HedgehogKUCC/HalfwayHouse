import Vue from 'vue'
import Vuex from 'vuex'
import productsModule from './products'
import cartModule from './cart'
import userModule from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false
  },
  actions: {
    uploading ({ commit }, payload) {
      commit('LOADING', payload)
    }
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  getters: {
    isLoading: state => state.isLoading
  },
  modules: {
    productsModule,
    cartModule,
    userModule
  }
})
