<template lang="pug">
  #app
    Loading(:isLoading="isLoading")
    router-view
</template>

<script>
import Loading from '@/components/loading/Loading'

export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/all";
</style>
