<template lang="pug">
block vars
  - var subscription = '訂閱喵喵汪汪'
  - var tel = '02-1234-5678'
  - var email = 'iams@email.com'
  - var address = '777 台灣寵物區幸福家 777 號'
  - var author = '© 2019 by Hedgehog KUCC'
  .bottomOfPage.text-secondary
    footer.py-4.bg-primary
      .container
        .row.justify-content-center.mb-5
          .col-lg-5.d-flex.align-items-center.justify-content-center.justify-content-lg-start.mb-4.mb-lg-0
            img(src='../assets/images/cat.svg', width='40', height='40', alt='cat.svg')
            span.mx-3.h4.mb-0 #{ subscription }
            img(src='../assets/images/dog.svg', width='40', height='40', alt='dog.svg')
          .col-lg-5
            .form__square.form__square--withicon.d-flex.justify-content-between
              label.form__square__icon--left(for='subscription')
                i.far.fa-envelope.fa-lg
              input#subscription.form__input.w-100(type='email')
              button.btn.btn-secondary.btn-lg.d-flex.align-items-center
                i.fas.fa-paw.fa-lg

        .row.justify-content-center
          .col-md-5.d-flex.flex-column.align-items-center
            ul.list-unstyled.mt-md-5.align-self-md-start.align-self-center
              li.text-center.text-md-left #{ tel }
              li.mt-md-3.mt-1.text-center.text-md-left
                a(href='mailto:iams@email.com') #{ email }
              li.mt-md-3.mt-1.text-center.text-md-left #{ address }
          .col-md-5.text-right.d-none.d-md-flex.justify-content-end
            p.h2.text-vertical.text-left.order-1
              | 今天是個
              span.text-hr
            p.h2.text-vertical(style="padding-top: 50px;")
              | 捐罐頭的好日子
        .row.justify-content-center.mt-4
          .col-lg-5.mt-2.text-center.text-lg-left
            i.fab.fa-facebook-square.fa-2x.mr-1
            i.fab.fa-instagram.fa-2x.mr-1
            i.fab.fa-twitter-square.fa-2x.mr-1
            i.fab.fa-github-square.fa-2x
          .col-lg-5.mt-2.text-center.text-lg-right
            span #{ author }
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
footer {
  p {
    margin: 0;
    font-weight: normal;

    &:last-child {
      margin-right: 10px;
    }
  }
}

.text-secondary {
  color: darken( #61544c, 10%) !important;
}

.text-hr {
  width: 1px;
  height: 38%;
  border: 1px solid darken( #61544c, 10%);
  writing-mode: vertical-rl;
  margin-top: 10px;
}
</style>
