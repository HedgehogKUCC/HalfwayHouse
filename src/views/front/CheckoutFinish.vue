<template lang="pug">
  section.mb-4
    .row.justify-content-center.mx-0
      .checkoutFinish
        img.img-fluid(src="@/assets/images/checkoutFinish.jpg", alt="checkoutFinish.jpg")
        .text-position.text-secondary
          h4.h2-sm.mb-1.mb-sm-3 感謝您的罐罐
          | 將在
          |
          span(style="color: red;") {{ time }}
          | 秒返回頁面
          br
          router-link.btn.btn-primary.mt-1.mt-sm-3.text-secondary(to="/donate") 繼續進貢

</template>

<script>
export default {
  data () {
    return {
      time: 0
    }
  },
  methods: {
    redirectToDonate () {
      const vm = this
      vm.time = 15
      const interval = setInterval(function () {
        vm.time--
        if (vm.time === 0) {
          clearInterval(interval)
        }
      }, 1000)
    }
  },
  watch: {
    time (val) {
      if (val === 0) {
        this.$router.push('/donate')
      }
    }
  },
  mounted () {
    this.redirectToDonate()
  }
}
</script>

<style lang="scss" scoped>
.checkoutFinish {
  position: relative;
}

.text-position {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.text-secondary {
  color: darken(#61544c, 10%) !important;
}
</style>
