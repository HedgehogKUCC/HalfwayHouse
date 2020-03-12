import axios from 'axios'
import $ from 'jquery'

export default {
  namespaced: true,
  state: {
    cart: {
      carts: []
    }
  },
  actions: {
    getCart ({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      commit('LOADING', true, { root: true })
      axios.get(api).then((response) => {
        commit('LOADING', false, { root: true })
        commit('CART', response.data.data)
      })
    },
    removeCartItem ({ commit, dispatch }, id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      commit('LOADING', true, { root: true })
      axios.delete(api).then((response) => {
        commit('LOADING', false, { root: true })
        dispatch('getCart')
      })
    },
    addToCart ({ commit, dispatch }, { id, qty }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const cart = {
        product_id: id,
        qty
      }
      commit('LOADING', true, { root: true })
      axios.post(api, { data: cart }).then((response) => {
        commit('LOADING', false, { root: true })
        dispatch('getCart')
        $('#SimuProductModal').modal('hide')
      })
    }
  },
  mutations: {
    CART (state, payload) {
      state.cart = payload
    }
  },
  getters: {
    cart: state => state.cart
  }
}
