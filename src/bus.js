import Vue from 'vue'

Vue.prototype.$bus = new Vue()

// Message
// message(String): 訊息內容
// status(String): Alert 的樣式
//
// 內層用 $emit
// 應用在 Products.vue 裡面的 uploadFile ()
// vm.$bus.$emit('message:push', message, status)
//
// 外層用 $on
// vm.$bus.$on('message:push', (message, status = 'warning') => {
//  vm.updateMessage(message, status)
// })
