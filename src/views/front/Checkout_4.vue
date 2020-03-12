<template lang="pug">
  section.mb-4
    .row.justify-content-center.mx-0
      form.col-sm-10.col-md-8.col-xl-6(@submit.prevent='payOrder')
        .table-responsive
          table.table.text-secondary
            thead.bg-primary-200
              tr
                th 遛噠星人
                th 進貢
                th 單項總價
            tbody
              tr(v-for='item in order.products', :key='item.id')
                td.align-middle {{ item.product.title }}
                td.align-middle {{ item.qty }} / 罐
                td.align-middle.text-right {{ item.final_total | currency }}
            tfoot
              tr
                td.text-right.font-weight-bold.text-primary-500(colspan='2') 愛心捐款總計
                td.text-right.font-weight-bold.text-primary-500 {{ order.total | currency }}
          table.table.text-secondary
            tbody
              tr
                th(width='150') 電子信箱
                td {{ order.user.email }}
              tr
                th 姓名
                td {{ order.user.name }}
              tr
                th 電話
                td {{ order.user.tel }}
              tr
                th 地址
                td {{ order.user.address }}
              tr
                th 付款狀態
                td
                  span(v-if='!order.is_paid') 尚未付款
                  span.text-success(v-else='') 付款完成
          .text-right(v-if='order.is_paid === false')
            button.btn.btn-accent.text-secondary 進貢罐頭
              i.fas.fa-chevron-right

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
          vm.$router.push('/checkout_finish')
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
