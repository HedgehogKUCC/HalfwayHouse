import axios from 'axios'
import router from '../router'

export default {
  namespaced: true,
  state: {
    uid: '',
    userMessage: ''
  },
  actions: {
    signin ({ commit }, user) {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      commit('LOADING', true, { root: true })
      axios.post(api, user).then((response) => {
        commit('LOADING', false, { root: true })
        if (response.data.success) {
          commit('UID', response.data.uid)
          commit('USERMESSAGE', '')
          router.push('/dashboard_product')
        } else {
          commit('USERMESSAGE', response.data.message)
        }
      })
    },
    signout ({ commit }, payload) {
      commit('UID', payload)
    }
  },
  mutations: {
    UID (state, payload) {
      state.uid = payload
    },
    USERMESSAGE (state, payload) {
      state.userMessage = payload
    }
  },
  getters: {
    uid: state => state.uid,
    userMessage: state => state.userMessage
  }
}
