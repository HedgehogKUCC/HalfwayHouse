<template lang="pug">
  section
    .row.justify-content-center.my-5
      form.col-md-6(@submit.prevent='payOrder')
        table.table
          thead
            tr
              th 遛噠星人
              th 進貢
              th 單價
          tbody
            tr(v-for='item in order.products', :key='item.id')
              td.align-middle {{ item.product.title }}
              td.align-middle {{ item.qty }} / 罐
              td.align-middle.text-right {{ item.final_total | currency }}
          tfoot
            tr
              td.text-right(colspan='2') 總計
              td.text-right {{ order.total | currency }}
        table.table
          tbody
            tr
              th(width='150') Email
              td {{ order.user.email }}
            tr
              th 奴才姓名
              td {{ order.user.name }}
            tr
              th 捐贈人電話
              td {{ order.user.tel }}
            tr
              th 捐贈人地址
              td {{ order.user.address }}
            tr
              th 付款狀態
              td
                span(v-if='!order.is_paid') 尚未付款
                span.text-success(v-else) 付款完成
        .text-right(v-if='order.is_paid === false')
          button.btn.btn-danger 確認付款去

</template>

<script>
export default {
  data () {
    return {
      orderId: '',
      order: {
        user: {}
      }
    }
  },
  methods: {
    getOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`
      vm.$store.dispatch('uploading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('uploading', false)
        vm.order = response.data.order
      })
    },
    payOrder () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`
      vm.$store.dispatch('uploading', true)
      vm.$http.post(api).then(response => {
        if (response.data.success) {
          vm.getOrder()
        }
        vm.$store.dispatch('uploading', false)
      })
    }
  },
  created () {
    this.orderId = this.$route.params.orderId
    this.getOrder()
  }
}
</script>
