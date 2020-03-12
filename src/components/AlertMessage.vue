<template lang="pug">
  .message-alert
    .alert.alert-dismissible(:class="'alert-' + item.status", v-for='(item, i) in messages', :key='i')
      i.fas.fa-tag
      |
      | {{ item.message }}
      button.close(type='button', @click='removeMessage(i)', aria-label='Close')
        span(aria-hidden='true') ×
</template>

<script>
export default {
  name: 'AlertMessage',
  data () {
    return {
      messages: []
    }
  },
  methods: {
    updateMessage (message, status) {
      const timestamp = Math.floor(new Date() / 1000)
      this.messages.push({
        message,
        status,
        timestamp
      })
      this.removeMessageWithTiming(timestamp)
    },
    removeMessage (num) {
      this.messages.splice(num, 1)
    },
    removeMessageWithTiming (timestamp) {
      const vm = this
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1)
          }
        })
      }, 5000)
    }
  },
  created () {
    const vm = this

    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 可設為 bootstrap (success, danger, primary ...etc)
    vm.$bus.$on('message:push', (message, status = 'warning') => {
      vm.updateMessage(message, status)
    })
  }
}
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 100px;
  right: 20px;
  z-index: 1100;
}
</style>
