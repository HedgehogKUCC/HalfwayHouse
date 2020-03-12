<template lang="pug">
    section.mb-4
      form.form__signin(@submit.prevent='signin')
        h2.h3.mb-3.font-weight-normal.text-primary-500 遛噠管理員
        label.sr-only(for='inputEmail') 電子信箱
        input.form-control(type='email', placeholder='請輸入帳號或信箱', v-model='user.username', required, autofocus)
        label.sr-only(for='inputPassword') 密碼
        input.form-control(type='password', placeholder='請輸入密碼', v-model='user.password', required)
        .alert.alert-danger(role='alert', v-if='userMessage')
          | 帳號密碼有誤
        button.btn.btn-lg.btn-primary-500.btn-block.form__signin--interactive(type='submit') 登入
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const vm = this
      vm.$store.dispatch('userModule/signin', vm.user)
    }
  },
  computed: {
    ...mapGetters('userModule', ['uid', 'userMessage'])
  }
}
</script>

<style lang="scss" scoped>
.text-primary-500 {
  color: darken(#4c6178, 10%) !important;
}
</style>
