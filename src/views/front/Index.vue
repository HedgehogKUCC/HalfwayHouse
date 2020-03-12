<template lang="pug">
  section.fix-sm-margin
    h1.text-hide 遛噠中途之家
    h5.text-center.text-primary-500.h2-sm.text--animation.mb-5 請以認養代替購買
      span.text--decoration
        | High Five

    #carouselExampleCaptions.carousel.slide.mb-5.mb-md-0(data-ride='carousel')
      .carousel-inner
        .carousel-item.active
          img.d-block.w-100(src='@/assets/images/carousel-1.jpg', alt='carousel-1.jpg')
          .carousel-caption
            h5 盼望著一線曙光
            p 歷經繁殖場的牠，終於等待到救援。
        .carousel-item
          img.d-block.w-100(src='@/assets/images/carousel-2.jpg', alt='carousel-2.jpg')
          .carousel-caption
            h5 堅強著踏出步伐
            p 無法想像流浪的牠，經歷了哪些事。
        .carousel-item
          img.d-block.w-100(src='@/assets/images/carousel-3.jpg', alt='carousel-3.jpg')
          .carousel-caption
            h5 陪伴著我們的牠
            p 愛牠就不要拋棄牠，牠一生只有你。

        a.carousel-control-prev(href='#carouselExampleCaptions', role='button', data-slide='prev')
          span.carousel-control-prev-icon(aria-hidden='true')
          span.sr-only Previous
        a.carousel-control-next(href='#carouselExampleCaptions', role='button', data-slide='next')
          span.carousel-control-next-icon(aria-hidden='true')
          span.sr-only Next

    .container-fluid.text-primary-500
      section
        .container.my-0.my-md-5.px-5.pb-0.pt-2.py-md-5
          h4.h2-sm.text-center.mt-4.mb-0.mb-md-5.pb-5 貓貓狗狗想說什麼呢？
          ul.d-md-flex.halfway-ul
            li.p-2
              .text-center
                img.rounded-circle.img-fluid(src='@/assets/images/halfway-1.jpg', alt='halfway-1.jpg', width='200px')
              .h5 調皮汪
              p.text-secondary.mb-md-0
                | 汪...汪汪...汪汪汪...汪汪汪汪，我，意思，是在說，罐罐在哪？
            li.p-2
              .text-center
                img.rounded-circle.img-fluid(src='@/assets/images/halfway-2.jpg', alt='halfway-2.jpg', width='200px')
              .h5 金絲喵
              p.text-secondary.mb-md-0
                | 喵～ 好懷念北極甜蝦罐頭，有好心人買來的話，我願意跟你走～ 到路口
            li.p-2
              .text-center
                img.rounded-circle.img-fluid(src='@/assets/images/halfway-3.jpg', alt='halfway-3.jpg', width='200px')
              .h5 哀怨汪
              p.text-secondary.mb-md-0
                | 好困惑... 疑～ 我剛剛有吃了嗎？ 到底肚子什麼時候才會飽呢？

      .row
        .col-md-6.bg-cover(style="background-image: url('https://images.unsplash.com/photo-1515073883629-5e2924e3e106?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'); height:450px;")
        .col-md-6.px-lg-9.pt-md-11.bg-primary.text-center.py-5
          h2.text-space 專心的祈禱
          p.h4.mb-3 想要罐罐
          router-link.btn.btn-accent.btn-width.text-secondary(to='/donate') 前往進貢

      section
        .container.my-0.my-md-5.p-5
          h3.h2-sm.text-center.mt-3.mb-2.mb-md-5.pb-5 想盡一份心力嗎？
          .row
            .col-md-6.mb-5
              .d-flex
                .mr-3
                  i.fas.fa-broom.fa-5x.fa-md-4x
                div.text-secondary
                  h3 環境整理
                  p 每個月的第一、三週的星期六，可以來跟我們一起打掃唷，順便吃個點心喝個下午茶～
            .col-md-6.mb-5
              .d-flex
                .mr-3
                  i.fas.fa-paw.fa-5x
                div.text-secondary
                  h3 伴玩奴才
                  p 每個月的第一、三週的星期日，會有舉辦活動可以和貓貓狗狗們開心玩翻天～
            .col-md-6.mb-5.mb-md-0
              .d-flex
                .mr-3
                  i.fas.fa-people-carry.fa-5x.fa-md-4x
                div.text-secondary
                  h3 當工具人
                  p 一通電話就能來幫忙處理 XD～ 會事先告知狀況等你有空來處理囉 ^^
            .col-md-6.mb-0
              .d-flex
                .mr-3
                  i.fas.fa-money-bill-wave.fa-4x
                div.text-secondary
                  h3 乾爸乾媽
                  p 歡迎捐款捐物資，讓喵星人、汪星人安心等家，每天有得吃有得玩～

      .row.flex-row-reverse.mb-5
        .col-md-6.p-0(style="height: 450px;")
          iframe(src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28717.90249374786!2d121.51925160482304!3d25.04403636428689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9727e339109%3A0xc34a31ce3a4abecb!2z5Y-w5YyX6LuK56uZ!5e0!3m2!1szh-TW!2stw!4v1579074641564!5m2!1szh-TW!2stw', width='100%', height='450', frameborder='0', style='border:0;', allowfullscreen='')
        .col-md-6.px-lg-9.pt-md-11.bg-primary.text-center.py-5
          h2.text-space 歡迎認養
          p.h4.mb-3 給它一個家
          a.btn.btn-accent.btn-width.text-secondary(href="javascript:;") 前往臉書

</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.halfway-ul {
  padding:0;
  list-style: none;
  li {
    width: 33.33333%;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.text--animation {
  overflow: hidden;
  white-space: nowrap;
  margin: 0 auto;
  letter-spacing: .10rem;
  animation:
    typing 8s steps(40, end);
  animation-iteration-count: infinite;
}

@keyframes typing {
  0% { width: 0%; }
  60% { width: 100%; opacity: 1; }
  70% { opacity: 0; }
  80% { opacity: 1; }
}

.bg-primary {
  background-color: rgba(173, 190, 210, .125) !important;
}

.btn-width {
  width: 50%;
}

@media (max-width: 991px) {
  .carousel-caption {
    bottom: -20px;
  }
}

@media (max-width: 767px) {
  .fa-md-4x {
    font-size: 4em;
  }
}

@media (max-width: 575px) {
  .carousel-caption {
    bottom: -35px;
    p {
      font-size: 14px;
    }
  }
}
</style>
