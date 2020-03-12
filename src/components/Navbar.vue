<template lang="pug">
block vars
  - var menu = [ { name: '首頁' }, { name: '進貢' }, { name: '登入' } ]
  .fixed-top
    nav.navbar.navbar-expand-md.navbar-light.bg-white
      .container
        //- min-width: 768px 以下時, 才會顯示出漢堡選單
        button.navbar-toggler.d-md-none.d-flex.align-items-center(type='button', data-toggle='collapse', data-target='#navbarSupportedContent', aria-controls='navbarSupportedContent', aria-expanded='false', aria-label='Toggle navigation')
          i.fas.fa-bars

        router-link.navbar-brand(to='/')
          img.d-none.d-md-inline-block(src='../assets/images/logo-all.svg', width='130', height='40', alt='logo-all.svg')

        div.d-flex.order-md-2
          router-link.nav-link.ml-auto(to='/signin', :class="{ 'd-none': uid || isShowCart }") #{ menu[2].name }

          router-link.nav-link.ml-auto(to='/dashboard_product', v-if="uid") 遛噠管理後台

          //- 購物車內的數量 (Button 內包含 icon, 數量 badge)
          .dropdown(:class="{ 'd-none': isShowCart }")
            button.btn.btn-sm.btn__cart(data-flip='false', @click="addShow")
              i.fa.fa-shopping-cart.text-secondary.fa-2x(aria-hidden='true')
              span.badge.badge-pill.badge-danger(v-if='cart.carts && cart.carts.length !== 0') {{cart.carts.length}}

            #dropdown-menu.dropdown-menu.dropdown__menu--right.dropdown__menu--left(style='min-width: 325px; z-index: 1031;', v-if='cart.carts && cart.carts.length !== 0')
              .px-4.py-3
                h6 已選擇商品
                table.table
                  thead
                    tr
                      th(width='10')
                      th 遛噠星人
                      th(width='75') 數量
                      th(width='65') 單價
                  tbody
                    tr(v-for='item in cart.carts', :key='item.id')
                      td.align-middle
                        button.btn.btn-outline-danger.btn-sm(type='button', @click="removeCartItem(item.id)")
                          i.far.fa-trash-alt
                      td.align-middle
                        | {{ item.product.title }}
                        .text-success.font-italic.font-weight-light(v-if="item.coupon")
                          span 已使用優惠劵
                      td.align-middle
                        | {{ item.qty }}/罐
                      td.align-middle.text-right
                        | {{ item.product.price | currency }}
                router-link.btn.btn-secondary.btn-block.btn__cart--interactive(to="/carts") 進貢

        #navbarSupportedContent.collapse.navbar-collapse.order-md-1
          ul.navbar-nav.text-center(:class="{ 'd-none': isShowCart }")
            li.nav-item
              router-link.nav-link(to= '/index') #{ menu[0].name }
            li.nav-item
              router-link.nav-link(to='/donate') #{ menu[1].name }
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import $ from 'jquery'

export default {
  data () {
    return {
      coupon_code: ''
    }
  },
  methods: {
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('uploading', true)
      vm.$http.post(api, { data: coupon }).then(response => {
        vm.getCart()
        vm.$store.dispatch('uploading', false)
        if (response.data.success) {
          this.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    removeCartItem (id) {
      this.$store.dispatch('cartModule/removeCartItem', id)
    },
    ...mapActions('cartModule', ['getCart']),
    addShow () {
      /* ---------------------------------------------------------------
      |  利用 v-if 作為判斷購物車有物品, 才開啟 dropdown-menu               |
      |  但是觸發 v-if 為 true 後, 觀察到 Elements dropdown-menu 點下去時  ｜
      |  沒有加上 .show 所以利用這個 method 來手動加上                      |
      |  記得將 data-toggle="dropdown" 給移除, 才不會干擾到 !!!            |
      --------------------------------------------------------------- */
      const vm = this
      if (vm.cart.carts && vm.cart.carts.length !== 0) {
        $('#dropdown-menu').toggleClass('show')
      }
    }
  },
  computed: {
    ...mapGetters('cartModule', ['cart']),
    ...mapGetters('userModule', ['uid']),
    isShowCart () {
      const path = this.$route.path
      if (path === '/carts' || path === '/checkout_1' || path === '/checkout_2' || path === '/checkout_3' || path === '/checkout_4') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  padding: 30px 1rem !important;
}

.navbar-light .order-md-2 .nav-link {
    color: rgba(97, 84, 76, 0.81);
}

.nav-item:hover {
  background-color: #d5e8ff;
}
</style>
