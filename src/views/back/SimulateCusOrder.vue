<template lang="pug">
  section
    .row.mt-4
      .col-md-4.mb-4(v-for='item in products', :key='item.id')
        .card.border-0.shadow-sm
          div(style='height: 200px; background-size: cover; background-position: center', :style='{backgroundImage: `url(${item.imageUrl})`}')
          .card-body
            span.badge.badge-secondary.float-right.ml-2 {{ item.category }}
            h5.card-title
              a.text-dark(href='#') {{ item.title }}
            p.card-text {{ item.content }}
          .card-footer.d-flex
            button.btn.btn-outline-secondary.btn-sm(type='button', @click="getProduct(item.id)")
              i.fas.fa-spinner.fa-spin(v-if="status.loadingItem === item.id")
              | 查看更多
            button.btn.btn-outline-danger.btn-sm.ml-auto(type='button', @click="addToCart(item.id)")
              i.fas.fa-spinner.fa-spin(v-if="status.loadingItem === item.id")
              | 捐贈罐頭

    Pagination(:paginationProps="pagination", @getProductsEmit="getProducts")

    SimuProductModal(:ModalProductProps="ModalProduct", :loadingItemModal="status.loadingItem", @addToCartEmit="addToCart")

    //- 購物車頁面
    .row.justify-content-center.my-5(v-if='cart.carts && cart.carts.length !== 0')
      .col-md-6
        table.table
          thead
            tr
              th(width='50')
              th 遛噠星人
              th(width='100') 數量
              th(width='90') 單價
          tbody
            tr(v-for='item in cart.carts', :key='item.id')
              td.align-middle
                button.btn.btn-outline-danger.btn-sm(type='button', @click="removeCartItem(item.id)")
                  i.far.fa-trash-alt
              td.align-middle
                | {{ item.product.title }}
                .text-success.font-italic.font-weight-light(v-if="item.coupon")
                  span 已使用優惠劵
              td.align-middle
                | {{ item.qty }} / 罐
              td.align-middle.text-right
                | {{ item.product.price | currency }}
          tfoot
            tr(v-if='cart.total !== 0')
              td.text-right(colspan='3') 總計
              td.text-right {{ cart.total | currency }}
            tr(v-if='cart.total !== cart.final_total')
              td.text-right.text-success(colspan='3') 折扣價
              td.text-right {{ cart.final_total | currency }}
        .input-group.mb-3.input-group-sm
          input.form-control(type='text', placeholder='請輸入廠商優惠碼: xu428666', v-model="coupon_code")
          .input-group-append
            button.btn.btn-outline-secondary(type='button', @click="addCouponCode")
              | 套用優惠碼

    //- 填資料頁面
    .my-5.row.justify-content-center
      form.col-md-6(@submit.prevent="createOrder")
        .form-group
          label(for='useremail') 信箱
          input#useremail.form-control(type='email', name='email', v-model='form.user.email', placeholder='請輸入信箱', v-validate="'required|email'", :class="{ 'is-invalid': errors.has('email') }")
          span.text-danger(v-if="errors.has('email')") {{ errors.first('email') }}
        .form-group
          label(for='username') 捐贈人姓名
          input#username.form-control(type='text', name='name', v-model='form.user.name', placeholder='輸入姓名', v-validate="'required'", :class="{ 'is-invalid': errors.has('name') }")
          span.text-danger(v-if="errors.has('name')") 姓名必須輸入
        .form-group
          label(for='usertel') 捐贈人電話
          input#usertel.form-control(type='tel', v-model='form.user.tel', placeholder='請輸入電話')
        .form-group
          label(for='useraddress') 捐贈人地址
          input#useraddress.form-control(type='address', name='address', v-model='form.user.address', placeholder='請輸入地址', v-validate="'required'", :class="{ 'is-invalid': errors.has('address') }")
          span.text-danger(v-if="errors.has('address')") 地址欄位不得留空
        .form-group
          label(for='useraddress') 奴才留言
          textarea.form-control(name='', id='', cols='30', rows='10', v-model='form.message')
        .text-right
          button.btn.btn-accent 送出訂單

</template>

<script>
import SimuProductModal from '@/components/SimuProductModal'
import Pagination from '@/components/Pagination'
import $ from 'jquery'

export default {
  data () {
    return {
      products: [],
      pagination: {},
      ModalProduct: {},
      status: {
        loadingItem: ''
      },
      cart: {},
      coupon_code: '',
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
  components: {
    Pagination,
    SimuProductModal
  },
  methods: {
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      const vm = this
      vm.$store.dispatch('uploading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('uploading', false)
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    getProduct (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      const vm = this
      vm.status.loadingItem = id
      vm.$http.get(api).then(response => {
        if (response.data.success) {
          vm.status.loadingItem = ''
          vm.ModalProduct = response.data.product
          $('#SimuProductModal').modal('show')
        } else {
          vm.status.loadingItem = ''
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    addToCart (id, qty = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      const cart = {
        product_id: id,
        qty
      }
      vm.status.loadingItem = id
      vm.$http.post(api, { data: cart }).then(response => {
        vm.status.loadingItem = ''
        vm.getCart()
        $('#SimuProductModal').modal('hide')
      })
    },
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      const vm = this
      vm.$store.dispatch('uploading', true)
      vm.$http.get(api).then(response => {
        vm.$store.dispatch('uploading', false)
        vm.cart = response.data.data
      })
    },
    removeCartItem (id) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`
      const vm = this
      vm.$http.delete(api).then(response => {
        vm.getCart()
      })
    },
    addCouponCode () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`
      const vm = this
      const coupon = {
        code: vm.coupon_code
      }
      vm.$store.dispatch('uploading', true)
      vm.$http.post(api, { data: coupon }).then(response => {
        vm.getCart()
        vm.$store.dispatch('uploading', false)
        if (response.data.success) {
          vm.$bus.$emit('message:push', response.data.message, 'success')
        } else {
          vm.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`
      const vm = this
      const order = vm.form
      vm.$validator.validate().then(result => {
        if (result) {
          vm.$http.post(api, { data: order }).then(response => {
            if (response.data.success) {
              vm.$router.push(`/simulate_cus_checkout/${response.data.orderId}`)
            } else {
              vm.$bus.$emit('message:push', response.data.message, 'danger')
            }
          })
        } else {
          console.log('欄位不完整')
        }
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  }
}
</script>
