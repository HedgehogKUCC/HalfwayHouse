import axios from 'axios'

export default {
  namespaced: true,
  state: {
    products: [],
    categories: []
  },
  actions: {
    async getProducts ({ commit }) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`
      commit('LOADING', true, { root: true })
      await axios.get(api).then((response) => {
        commit('LOADING', false, { root: true })
        commit('PRODUCTS', response.data.products)
        commit('CATEGORIES', response.data.products)
      })
    }
  },
  mutations: {
    PRODUCTS (state, payload) {
      state.products = payload
    },
    CATEGORIES (state, payload) {
      const categories = new Set()
      payload.forEach((item) => {
        categories.add(item.category)
      })
      state.categories = Array.from(categories)
    }
  },
  getters: {
    products: state => state.products,
    categories: state => state.categories
  }
}
