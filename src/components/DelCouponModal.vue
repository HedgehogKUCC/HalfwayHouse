<template lang="pug">
  div
    #delCouponModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='delCouponModalLabel', aria-hidden='true', data-backdrop='false', data-keyboard='false')
      .modal-dialog(role='document')
        .modal-content.border-0
          .modal-header.bg-danger.text-white
            h5#delCouponModalLabel.modal-title
              span 刪除優惠劵
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | 是否刪除
            strong.text-danger  {{ tempCouponProps.title }}
              |  優惠劵(刪除後將無法恢復)。
          .modal-footer
            button.btn.btn-outline-secondary(type='button', data-dismiss='modal') 取消
            button.btn.btn-danger(type='button', @click='delCouponModal(tempCouponProps.id)') 確認刪除
</template>

<script>
export default {
  props: ['tempCouponProps'],
  methods: {
    delCouponModal (id) {
      this.$emit('delCouponEmit', id)
    }
  }
}
</script>
