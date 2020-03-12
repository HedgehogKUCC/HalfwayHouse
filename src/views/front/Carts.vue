<template lang="pug">
  section.mb-lg-4
    .row.cart
      .col-lg-8.mb-md-5
        h1.bg-primary-200.h4.mb-0.py-4.text-center
          | 您的購物車
        .cart--borderTop.d-flex.flex-column.py-3(v-for='item in cart.carts', :key='item.id')
          .d-flex.align-items-center
            .col-6
              p.h5.text-center.mb-0 {{ item.product.title }}
            .col-3
              span.h5 {{ item.qty }}罐
            .col-3
              button.btn.btn-outline-danger.btn-sm(type='button', @click="removeCartItem(item.id)")
                i.far.fa-trash-alt

      .col-lg-4.mb-4.mb-lg-0
        .p-md-3.py-3.pt-0.cart__msg
          h2.text-center.cart__msg__title.h4.py-3 訂單摘要
          hr.border-white.mt-0
          .d-flex.justify-content-between.mb-2(v-if='cart.total !== 0')
            span.h5 總計
            span.h5 {{ cart.total | currency }}
          .d-flex.justify-content-between.mb-3(v-if='cart.total !== cart.final_total')
            span.h5 折扣價
            span.h5 {{ cart.final_total | currency }}
          .d-flex
            .input-group.input-group-sm
              .input-group-prepend
                button.btn.btn-primary-200.btn-sm(type='button', @click="addCouponCode")
                  | 套用優惠碼
              input.form-control.form-control-lg(type='text', placeholder='優惠碼: xu428666', v-model="coupon_code", style="padding: 8px 16px;")
        .mx-0
          router-link.btn.btn-accent.btn-block.btn-lg.py-3.text-secondary(to="/checkout_1") 結帳

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      coupon_code: ''
    }
  },
  methods: {
    removeCartItem (id) {
      this.$store.dispatch('cartModule/removeCartItem', id)
    },
    ...mapActions('cartModule', ['getCart']),
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
          vm.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    }
  },
  computed: {
    ...mapGetters('cartModule', ['cart'])
  },
  created () {
    this.getCart()
  }
}
</script>
