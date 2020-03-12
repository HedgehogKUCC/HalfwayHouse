<template lang="pug">
  section
    .text-right.mt-4
      button.btn.btn-primary-500(@click="openModal('buildProduct')") 迎接遛噠星人
    .table-responsive
      table.table.mt-4
        thead
          tr
            th.d-none.d-md-table-cell(width='120') 分類
            th 遛噠星人
            th(width='100') 罐頭原價
            th(width='100') 罐頭售價
            th.d-none.d-lg-table-cell(width='100') 是否啟用
            th.d-none.d-sm-table-cell.text-left(width='150') 功能
        tbody
          tr(v-for='item in products', :key='item.id')
            td.d-none.d-md-table-cell {{ item.category }}
            td {{ item.title }}
            td.text-right
              | {{ item.origin_price | currency }}
            td.text-right
              | {{ item.price | currency }}
            td.d-none.d-lg-table-cell
              span.text-success(v-if='item.is_enabled==1') 啟用
              span(v-else) 未啟用
            td.d-none.d-sm-table-cell.d-flex.justify-content-center
              button.d-none.d-sm-table-cell.btn.btn-outline-primary-500.btn-sm.mr-1(@click="openModal('editProduct', item)") 編輯
              button.d-none.d-sm-table-cell.btn.btn-outline-danger.btn-sm(@click="openModal('delProduct', item)") 刪除

    ProductModal(:tempProductProps="tempProduct", :openModalFucProps="openModalFuc", @buildProductEmit="buildProduct", @editProductEmit="editProduct")

    DelProductModal(:tempProductProps="tempProduct", @delProductEmit="delProduct")

    Pagination(:paginationProps="pagination", @getProductsEmit="getProducts")

</template>

<script>
import $ from 'jquery'
import ProductModal from '@/components/ProductModal'
import DelProductModal from '@/components/DelProductModal'
import Pagination from '@/components/Pagination'

export default {
  components: {
    ProductModal,
    DelProductModal,
    Pagination
  },
  data () {
    return {
      products: [],
      tempProduct: {},
      openModalFuc: '',
      pagination: {}
    }
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products?page=${page}`
      const vm = this
      vm.$store.dispatch('uploading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('uploading', false)
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    openModal (openModalFuc, item) {
      const vm = this
      switch (openModalFuc) {
        case 'buildProduct' :
          vm.tempProduct = {}
          vm.openModalFuc = openModalFuc
          $('#productModal').modal('show')
          break

        case 'editProduct' :
          // ES6 : Object.assign({}, item)
          // 將 item 寫入新的物件內, 避免 tempProduct 和 item 傳參考的特性
          vm.tempProduct = Object.assign({}, item)
          vm.openModalFuc = openModalFuc
          $('#productModal').modal('show')
          break

        case 'delProduct' :
          vm.tempProduct = item
          vm.openModalFuc = openModalFuc
          $('#delProductModal').modal('show')
          break

        default:
          vm.tempProduct = {}
          vm.openModalFuc = openModalFuc
          $('#productModal').modal('show')
      }
    },
    buildProduct () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      const vm = this
      const tempProduct = vm.tempProduct
      const buildProduct = { ...tempProduct, num: 1, is_enabled: 1, unit: '隻' }
      vm.$http.post(api, { data: buildProduct }).then(response => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('buildProduct 操作未完成')
        }
      })
    },
    editProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      const tempProduct = vm.tempProduct
      const editProduct = { ...tempProduct, num: 1 }
      vm.$http.put(api, { data: editProduct }).then(response => {
        if (response.data.success) {
          $('#productModal').modal('hide')
          vm.getProducts()
        } else {
          $('#productModal').modal('hide')
          vm.getProducts()
          console.log('editProduct 操作未完成')
        }
      })
    },
    delProduct () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      vm.$http.delete(api).then(response => {
        if (response.data.success) {
          $('#delProductModal').modal('hide')
          vm.getProducts()
        } else {
          $('#delProductModal').modal('hide')
          vm.getProducts()
          console.log('delProduct 操作未完成')
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss" scoped>
.table-responsive {
  min-height: 646px;
}
</style>
