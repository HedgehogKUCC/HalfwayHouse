<template lang="pug">
  div
    nav.sidebar__menu
      .sidebar__menu--sticky
        ul
          span 管理員
          li
            router-link(to="/index")
              i.fas.fa-paw
              span.sidebar__menu__text
                | 首頁
          li
            router-link(to="/dashboard_product")
              i.fas.fa-box-open
              span.sidebar__menu__text
                | 遛噠星人
          li
            router-link(to="/dashboard_order")
              i.fas.fa-tasks
              span.sidebar__menu__text
                | 捐贈列表
          li
            router-link(to="/dashboard_coupons")
              i.fas.fa-money-bill
              span.sidebar__menu__text
                | 優惠劵
        ul
          span 模擬功能
          li
            router-link(to="/simulate_cus_order")
              i.fas.fa-shopping-cart
              span.sidebar__menu__text
                | 模擬訂單
        ul.logout
          li
            a(href='#', @click.prevent="signout")
              i.fas.fa-power-off
              span.sidebar__menu__text
                | 登出
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  methods: {
    signout () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      const vm = this
      vm.$store.dispatch('uploading', true)
      vm.$http.post(api).then(response => {
        vm.$store.dispatch('uploading', false)
        if (response.data.success) {
          vm.$store.dispatch('userModule/signout', '')
          vm.$router.push('/signin')
        }
      })
    }
  },
  computed: {
    ...mapGetters('userModule', ['uid'])
  }
}
</script>

<style lang="scss" scoped>
nav {
  ul, li {
    outline: 0;
    padding: 0;
  }
}
</style>
