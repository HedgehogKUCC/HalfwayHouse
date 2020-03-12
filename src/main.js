import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// dependencies
import 'bootstrap'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VeeValidate from 'vee-validate'
import zhTWvalidate from 'vee-validate/dist/locale/zh_TW'

// 手動添加
import './bus'
import currencyFilter from './filters/currency'
import dateFilter from './filters/date'

/* ------------------------------------------------- *
 | 後端設定 Access-Control-Allow-Origin = *           ｜
 | 跨域的時候前端如果設定 withCredentials 為 true 會異常  |
 * ------------------------------------------------- */
// 會將 sessionCookie 存在 Storage Cookies
axios.defaults.withCredentials = true

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VeeValidate)

Vue.component('Loading', Loading)

Vue.filter('currency', currencyFilter)
Vue.filter('date', dateFilter)

VeeValidate.Validator.localize('zh_TW', zhTWvalidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/signin'
        })
      }
    })
  } else {
    next()
  }
})
