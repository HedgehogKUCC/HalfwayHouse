<template lang="pug">
  section.mb-4
    .row.justify-content-center
      .form-width.mx-0
        form#form.p-5.bg-primary.text-secondary
          .form-row.mb-5
            .col-6
              h1 鏟屎官
              span ＊為必填欄位
            .col-6.d-flex.align-items-center
              .processSteps.w-100
                .processSteps--circle.completed
                  i.fas.fa-paw
                .processSteps--circle.completed
                  i.fas.fa-paw
                .processSteps--circle.active
          .form-group
            label.h4(for='useremail') 信箱＊
            input#useremail.form-control.form-control-lg(type='email', name='email', v-model='form.user.email', placeholder='請輸入信箱', v-validate="'required|email'", :class="{ 'is-invalid': errors.has('email') }")
            span.text-danger(v-if="errors.has('email')") {{ errors.first('email') }}
          .form-row
            .col-6
              .form-group
                label.h4(for='username') 姓名＊
                input#username.form-control.form-control-lg(type='text', name='name', v-model='form.user.name', placeholder='輸入姓名', v-validate="'required'", :class="{ 'is-invalid': errors.has('name') }")
                span.text-danger(v-if="errors.has('name')") 姓名必須輸入
            .col-6
              .form-group
                label.h4(for='usertel') 電話
                input#usertel.form-control.form-control-lg(type='tel', v-model='form.user.tel', placeholder='請輸入電話')
          .form-group
            label.h4(for='useraddress') 地址＊
            input#useraddress.form-control.form-control-lg(type='address', name='address', v-model='form.user.address', placeholder='請輸入地址', v-validate="'required'", :class="{ 'is-invalid': errors.has('address') }")
            span.text-danger(v-if="errors.has('address')") 地址欄位不得留空
          .form-group
            label.h4(for='useraddress') 留言
            textarea.form-control.form-control-lg(name='', id='', cols='5', rows='5', v-model='form.message')
        .mx-0
          button.btn.btn-accent.btn-block.btn-lg.py-3.text-secondary(@click="submitForm") 下一步
            i.fas.fa-chevron-right

</template>

<script>
import $ from 'jquery'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  methods: {
    createOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const vm = this
      const order = vm.form
      vm.$validator.validate().then(result => {
        if (result) {
          vm.$http.post(api, { data: order }).then(response => {
            if (response.data.success) {
              vm.$router.push(`/checkout_4/${response.data.orderId}`)
              vm.getCart()
            } else {
              vm.$bus.$emit('message:push', response.data.message, 'danger')
            }
          })
        }
      })
    },
    ...mapActions('cartModule', ['getCart']),
    submitForm () {
      $('#form').submit(this.createOrder())
    }
  },
  computed: {
    ...mapGetters('cartModule', ['cart'])
  }
}
</script>
