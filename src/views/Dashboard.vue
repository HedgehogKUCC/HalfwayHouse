<template lang="pug">
  div
    Alert
    .container-fluid
      .row
        Sidebar
        main.col-10.ml-auto.px-4
          router-view
</template>

<script>
import Sidebar from '../components/Sidebar'
import Alert from '@/components/AlertMessage'

export default {
  components: {
    Sidebar,
    Alert
  }
}
</script>
