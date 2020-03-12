<template lang="pug">
  .layout
    Navbar
    Alert
    .main
      .container.pt-10
        router-view
    BottomOfPage
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import BottomOfPage from '@/components/BottomOfPage.vue'
import Alert from '@/components/AlertMessage.vue'

export default {
  components: {
    Navbar,
    BottomOfPage,
    Alert
  }
}
</script>

<style lang="scss">
.main {

  /* 最小不能低於 100vh 的裝置高 */
  min-height: calc( 100vh - 473px );

}
</style>
