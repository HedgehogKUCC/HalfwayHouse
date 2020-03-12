<template lang="pug">
  section.mb-4
    .row.justify-content-center
      .form-width.mx-0
        form#form.p-5.bg-primary.text-secondary
          .form-row.mb-5
            .col-6
              h1 發票
              span ＊為必填欄位
            .col-6.d-flex.align-items-center
              .processSteps.w-100
                .processSteps--circle.completed
                  i.fas.fa-paw
                .processSteps--circle.active
                .processSteps--circle
          nav.nav.nav-pills.nav-fill.nav-dark.mb-5
            a.nav-item.nav-link.py-3.h4.active(data-toggle="list", href='#elecInvoice', @click="elecInvoice") 電子發票
            a.nav-item.nav-link.py-3.h4(data-toggle="list", href='#mailInvoice', @click="mailInvoice") 郵寄發票
          .tab-content
            #elecInvoice.tab-pane.active
              .form-group
                label.h4(for='email') 電子郵件信箱＊
                input#email.form-control.form-control-lg(type='email', placeholder='example@email.com', v-model="email", :class="{ 'isInvalid': emailError }", required)
                .text-danger {{ emailErrMsg }}
            #mailInvoice.tab-pane
              .form-group
                label.h4(for='mailInv') 郵件地址＊
                input#mailInv.form-control.form-control-lg(type='text', placeholder='新北市幸福區77巷7號7樓')
          .form-group
            label.h4(for='vat-number') 統一編號
            input#vat-number.form-control.form-control-lg(type='text', placeholder='12345678')
        .mx-0
          button.btn.btn-accent.btn-block.btn-lg.py-3.text-secondary(@click='submitForm') 下一步
            i.fas.fa-chevron-right

</template>

<script>
import $ from 'jquery'

export default {
  data () {
    return {
      email: '',
      emailError: false,
      emailErrMsg: ''
    }
  },
  methods: {
    checkForm () {
      const email = $('#email').val()
      const mailInv = $('#mailInv').val()
      const isMail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      if (isMail.test(email) || mailInv) {
        this.$router.push('/checkout_3')
      } else {
        alert('請填寫欄位或填寫欄位有誤，請再次檢查。')
      }
    },
    submitForm () {
      $('#form').submit(this.checkForm())
    },
    elecInvoice () {
      const mailInv = $('#mailInv')
      mailInv.removeAttr('required')
      mailInv.val('')
      $('#email').attr('required', 'required')
    },
    mailInvoice () {
      const email = $('#email')
      email.removeAttr('required')
      email.val('')
      $('#mailInv').attr('required', 'required')
    }
  },
  watch: {
    email () {
      const isMail = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
      if (!isMail.test(this.email)) {
        this.emailError = true
        this.emailErrMsg = 'email 格式錯誤'
      } else {
        this.emailError = false
        this.emailErrMsg = ''
      }
    }
  }
}
</script>
