<template lang="pug">
  section
    .table-responsive
      table.table.mt-4
        thead
          tr
            th.d-none.d-sm-table-cell 捐贈時間
            th 信箱
            th.d-none.d-lg-table-cell 奴才進貢
            th.d-none.d-lg-table-cell 應付金額
            th 是否付款
        tbody
          tr(v-for='(item, key) in orders', :key='key')
            td.d-none.d-sm-table-cell {{ item.create_at | date }}
            td
              span(v-text='item.user.email', v-if='item.user')
            td.d-none.d-lg-table-cell
              ul.list-unstyled
                li(v-for='(product, i) in item.products', :key='i')
                  | {{ product.product.title }} 罐頭：{{ product.qty }}
                  | 罐
            td.text-right.d-none.d-lg-table-cell {{ item.total | currency }}
            td
              strong.text-success(v-if='item.is_paid') 已付款
              span.text-muted(v-else) 尚未付款

    Pagination(:paginationProps="pagination", @getProductsEmit="getOrders")

</template>

<script>
import Pagination from '@/components/Pagination'

export default {
  data () {
    return {
      orders: [],
      pagination: {}
    }
  },
  components: {
    Pagination
  },
  methods: {
    getOrders (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`
      const vm = this
      vm.$store.dispatch('uploading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('uploading', false)
        vm.orders = response.data.orders
        vm.pagination = response.data.pagination
      })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style lang="scss" scoped>
.table-responsive {
  min-height: 646px;
}
</style>
