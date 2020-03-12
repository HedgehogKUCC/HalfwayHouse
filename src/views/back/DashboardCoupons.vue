<template lang="pug">
  section
    .text-right.mt-4
      button.btn.btn-primary-500(@click="openModal('buildCoupon')")
        | 建立新的優惠券
    .table-responsive
      table.table.mt-4
        thead
          tr
            th.d-none.d-sm-table-cell 名稱
            th 優惠碼
            th 折扣百分比
            th 到期日
            th.d-none.d-lg-table-cell 是否啟用
            th.d-none.d-md-table-cell.text-left 功能
        tbody
          tr(v-for='item in coupon.coupons', :key='item.id')
            td.d-none.d-sm-table-cell {{ item.title }}
            td {{ item.code }}
            td {{ item.percent }} %
            td {{ item.due_date }}
            td.d-none.d-lg-table-cell
              span.text-success(v-if='item.is_enabled === 1') 啟用
              span.text-muted(v-else) 未起用
            td.d-none.d-md-table-cell.text-left
              button.btn.btn-outline-primary-500.btn-sm.mr-1(@click="openModal('editCoupon', item)") 編輯
              button.btn.btn-outline-danger.btn-sm(@click="openModal('delCoupon', item)") 刪除

    Pagination(:paginationProps="pagination", @getProductsEmit="getCoupons")

    CouponModal(:tempCouponProps="tempCoupon", :openModalFunProps="openModalFun", @buildCouponEmit="buildCoupon", @editCouponEmit="editCoupon")

    DelCouponModal(:tempCouponProps="tempCoupon", @delCouponEmit="delCoupon")

</template>

<script>
import Pagination from '@/components/Pagination'
import DelCouponModal from '@/components/DelCouponModal'
import CouponModal from '@/components/CouponModal'
import $ from 'jquery'

export default {
  data () {
    return {
      coupon: {},
      tempCoupon: {},
      openModalFun: '',
      pagination: {}
    }
  },
  components: {
    Pagination,
    DelCouponModal,
    CouponModal
  },
  methods: {
    getCoupons (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`
      const vm = this
      vm.$store.dispatch('uploading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('uploading', false)
        vm.coupon = response.data
        vm.pagination = response.data.pagination
      })
    },
    openModal (openModalFun, item) {
      const vm = this
      switch (openModalFun) {
        case 'buildCoupon':
          vm.tempCoupon = {}
          vm.openModalFun = openModalFun
          $('#couponModal').modal('show')
          break

        case 'editCoupon':
          vm.tempCoupon = Object.assign({}, item)
          vm.openModalFun = openModalFun
          $('#couponModal').modal('show')
          break

        case 'delCoupon':
          vm.tempCoupon = item
          vm.openModalFun = openModalFun
          $('#delCouponModal').modal('show')
          break

        default:
          vm.tempCoupon = {}
          vm.openModalFun = openModalFun
          $('#couponModal').modal('show')
      }
    },
    buildCoupon () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`
      const vm = this
      const tempCoupon = vm.tempCoupon
      const coupon = { ...tempCoupon, is_enabled: 1 }
      vm.$http.post(api, { data: coupon }).then(response => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('buildCoupon 操作未完成')
        }
      })
    },
    editCoupon () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`
      vm.$http.put(api, { data: vm.tempCoupon }).then(response => {
        if (response.data.success) {
          $('#couponModal').modal('hide')
          vm.getCoupons()
        } else {
          $('#couponModal').modal('hide')
          vm.getCoupons()
          console.log('editCoupon 操作未完成')
        }
      })
    },
    delCoupon (id) {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${id}`
      vm.$http.delete(api).then(response => {
        vm.getCoupons()
        $('#delCouponModal').modal('hide')
      })
    }
  },
  created () {
    this.getCoupons()
  }
}
</script>

<style lang="scss" scoped>
.table-responsive {
  min-height: 646px;
}
</style>
