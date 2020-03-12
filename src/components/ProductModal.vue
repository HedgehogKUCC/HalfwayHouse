<template lang="pug">
  div
    #productModal.modal.fade(tabindex='-1', role='dialog', aria-labelledby='productModalLabel', aria-hidden='true', data-backdrop='false', data-keyboard='false')
      .modal-dialog.modal-lg(role='document')
        .modal-content.border-0
          .modal-header.bg-secondary
            h5#productModalLabel.modal-title.text-white
              span(v-if="openModalFucProps === 'buildProduct'") 遛噠星人 個資
              span(v-if="openModalFucProps === 'editProduct'") 編輯 {{ tempProductProps.title }} 遛噠星人
            button.close(type='button', data-dismiss='modal', aria-label='Close')
              span(aria-hidden='true') ×
          .modal-body.text-secondary
            .row
              .col-sm-4
                .form-group
                  label(for='image') 輸入圖片網址
                  input#image.form-control(type='text', v-model='tempProductProps.imageUrl', placeholder='請輸入圖片連結')
                .form-group
                  label(for='customFile')
                    | 或 上傳圖片(jpg, png)
                    i.fas.fa-spinner.fa-spin(v-if="status.fileUploading")
                  input#customFile.form-control(type='file', ref='files', @change="uploadFileModal")
                img.img-fluid(img='https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80', :src='tempProductProps.imageUrl', alt='')
              .col-sm-8
                .form-group
                  label(for='title') 遛噠星人標題
                  input#title.form-control(type='text', v-model='tempProductProps.title', placeholder='請輸入標題')
                .form-row
                  .form-group.col-md-6
                    label(for='category') 分類
                    input#category.form-control(type='text', v-model='tempProductProps.category', placeholder='請輸入 汪星人 或 喵星人')
                  .form-group.col-md-6
                    label(for='price') 單位
                    input#unit.form-control(type='unit', v-model='tempProductProps.unit', placeholder='', disabled)
                .form-row
                  .form-group.col-md-6
                    label(for='origin_price') 罐頭原價
                    input#origin_price.form-control(type='number', v-model='tempProductProps.origin_price', placeholder='請輸入罐頭原價')
                  .form-group.col-md-6
                    label(for='price') 罐頭特價
                    input#price.form-control(type='number', v-model='tempProductProps.price', placeholder='請輸入罐頭特價')
                hr
                .form-group
                  label(for='description') 遛噠星人品種
                  textarea#description.form-control(type='text', v-model='tempProductProps.description', placeholder='請輸入產品描述')
                .form-group
                  label(for='content') 遛噠星人語錄
                  textarea#content.form-control(type='text', v-model='tempProductProps.content', placeholder='請輸入產品說明內容')
                .form-group
                  .form-check
                    input#is_enabled.form-check-input(type='checkbox', v-model='tempProductProps.is_enabled', :true-value='1', :false-value='0')
                    label.form-check-label(for='is_enabled')
                      | 是否啟用
          .modal-footer
            button.btn.btn-outline-secondary(type='button', data-dismiss='modal') 取消
            button.btn.btn-secondary(type='button', @click='buildProductModal', v-if="openModalFucProps === 'buildProduct'") 加入確認
            button.btn.btn-secondary(type='button', @click='editProductModal', v-if="openModalFucProps === 'editProduct'") 編輯確認
</template>

<script>
import $ from 'jquery'

export default {
  props: ['tempProductProps', 'openModalFucProps'],
  data () {
    return {
      status: {
        fileUploading: false
      }
    }
  },
  methods: {
    buildProductModal () {
      this.$emit('buildProductEmit')
    },
    editProductModal () {
      this.$emit('editProductEmit')
    },
    uploadFileModal () {
      const uploadedFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadedFile)
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      vm.$http.post(api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        vm.status.fileUploading = false
        if (response.data.success) {
          vm.$set(vm.tempProductProps, 'imageUrl', response.data.imageUrl)
          vm.$bus.$emit('message:push', '成功上傳', 'success')
        } else if (response.data.message.message === 'File too large') {
          vm.$bus.$emit('message:push', '檔案過大', 'danger')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
        $('#customFile').val('')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#productModal {
  background-color: rgba(76, 97, 120, .9);
}
</style>
