<template lang="pug">
  div
    #delProductModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='delProductModalLabel', aria-hidden='true', data-backdrop='false', data-keyboard='false')
      .modal-dialog(role='document')
        .modal-content.border-0
          .modal-header.bg-danger.text-white
            h5#delProductModalLabel.modal-title
              span 刪除遛噠星人
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            | 是否刪除
            strong.text-danger {{ tempProductProps.title }}
            |  資料檔(刪除後將無法恢復)。
          .modal-footer
            button.btn.btn-outline-secondary(type='button', data-dismiss='modal') 取消
            button.btn.btn-danger(type='button', @click='delProductModal') 確認刪除
</template>

<script>
export default {
  props: ['tempProductProps'],
  methods: {
    delProductModal () {
      this.$emit('delProductEmit')
    }
  }
}
</script>
