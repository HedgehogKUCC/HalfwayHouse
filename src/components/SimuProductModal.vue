<template lang="pug">
  div
    #SimuProductModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='SimuProductModalLabel', aria-hidden='true', data-backdrop='false', data-keyboard='false')
      .modal-dialog(role='document')
        .modal-content.px-sm-5.text-secondary.bg-primary-200
          .modal-header.pb-0.border-bottom-0
            h5#SimuProductModalLabel.modal-title
              | {{ ModalProductProps.title }}
              |
              i.far.fa-kiss-wink-heart.text-danger
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body
            img.img-fluid(:src='ModalProductProps.imageUrl')
            blockquote.blockquote.mt-3
              p {{ ModalProductProps.content }}
                span.badge.badge-light.text-secondary.float-right(style="font-size: 50%;") {{ ModalProductProps.category }}
                .clearfix
              footer.d-flex.justify-content-between
                span.h6.text-left 肚子餓～給我罐罐
                span.blockquote-footer.text-right {{ ModalProductProps.description }}
            .d-flex.justify-content-between.align-items-baseline
              .h5(v-if='!ModalProductProps.price') {{ ModalProductProps.origin_price | currency }} 元
              del.h6(v-if='ModalProductProps.price') 原價 {{ ModalProductProps.origin_price | currency }} 元
              .h5.h3-sm(v-if='ModalProductProps.price') 愛心價 {{ ModalProductProps.price | currency }} 元
            select.form-control.mt-3(name='', v-model='ModalProductProps.num')
              option(:value='num', v-for='num in 10', :key='num')
                | 捐贈 {{num}} 個罐頭
          .modal-footer.border-top-0
            .text-muted.text-nowrap.mr-3
              | 小計
              strong {{ ModalProductProps.num * ModalProductProps.price | currency }}
              | 元
            button.btn.btn-accent(type='button', @click="addToCartModal(ModalProductProps.id, ModalProductProps.num)")
              i.fas.fa-spinner.fa-spin(v-if="loadingItemModal === ModalProductProps.id")
              | 加到愛心車
</template>

<script>
export default {
  props: ['ModalProductProps', 'loadingItemModal'],
  methods: {
    addToCartModal (id, num) {
      this.$emit('addToCartEmit', id, num)
    }
  }
}
</script>

<style lang="scss" scoped>
#SimuProductModal {
  background-color: rgba(76, 97, 120, .9);
}
</style>
