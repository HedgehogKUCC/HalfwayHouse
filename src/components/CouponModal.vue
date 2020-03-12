<template lang="pug">
  div
    #couponModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='couponModalLabel', aria-hidden='true', data-backdrop='false', data-keyboard='false')
      .modal-dialog(role='document')
        .modal-content
          .modal-header.bg-secondary
            h5#couponModalLabel.modal-title.text-white
              span(v-if=" openModalFunProps === 'buildCoupon' ") 新增優惠劵
              span(v-if=" openModalFunProps === 'editCoupon' ") 編輯 {{ tempCouponProps.title }} 優惠劵
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body.text-secondary
            .form-group
              label(for='title') 標題
              input#title.form-control(type='text', v-model='tempCouponProps.title', placeholder='請輸入標題')
            .form-group
              label(for='coupon_code') 優惠碼
              input#coupon_code.form-control(type='text', v-model='tempCouponProps.code', placeholder='請輸入優惠碼')
            .form-group
              label(for='due_date') 到期日
              input#due_date.form-control(type='date', v-model='tempCouponProps.due_date')
            .form-group
              label(for='price') 折扣百分比
              input#price.form-control(type='number', v-model='tempCouponProps.percent', placeholder='請輸入折扣百分比')
            .form-group
              .form-check
                input#is_enabled.form-check-input(type='checkbox', v-model='tempCouponProps.is_enabled', :true-value='1', :false-value='0')
                label.form-check-label(for='is_enabled')
                  | 是否啟用
          .modal-footer
            button.btn.btn-outline-secondary(type='button', data-dismiss='modal') 取消
            button.btn.btn-secondary(v-if=" openModalFunProps === 'buildCoupon' ", type='button', @click="buildCouponModal") 新增確認
            button.btn.btn-secondary(v-else-if=" openModalFunProps === 'editCoupon' ", type='button', @click="editCouponModal") 編輯確認
</template>

<script>
export default {
  props: ['tempCouponProps', 'openModalFunProps'],
  methods: {
    buildCouponModal () {
      this.$emit('buildCouponEmit')
    },
    editCouponModal () {
      this.$emit('editCouponEmit')
    }
  }
}
</script>

<style lang="scss" scoped>
#couponModal {
  background-color: rgba(76, 97, 120, .9);
}
</style>
