<template lang="pug">
  section
    .row
      .col-md-3
        .sticky-top(style="top: 115px; margin-bottom: 20px;")
          .list-group
            a.list-group-item.list-group-item-action(href='#', @click.prevent="searchText = ''", :class="{ 'active': searchText === ''}")
              | 全部顯示
            a.list-group-item.list-group-item-action(href='#', @click.prevent='searchText = item', :class="{ 'active': item === searchText}", v-for='item in categories', :key='item')
              | {{ item }}
            a.list-group-item.list-group-item-action(href='#', @click.prevent="searchText = 'star'", :class="{ 'active': searchText === 'star'}")
              | 收藏星人

      .col-md-9
        .tab-pane
          .row
            .col-xl-4.col-md-6.mb-4(v-for='item in filterData', :key='item.id')
              .card.border-solid.p-1
                .img__area(:style='{backgroundImage: `url(${item.imageUrl})`}', :data-title= 'item.title', :data-description= 'item.description')
                  .img__icon--stared
                    a(href="#", @click.prevent="setStared(item)")
                      i.fa-star.fa-2x.text-accent(:class="starColor(item)")
                .d-flex
                  a.btn.btn-primary-200.col.text-secondary(href='#', @click.prevent="getProduct(item.id)")
                    i.fas.fa-spinner.fa-spin(v-if="status.loadingItem === item.id")
                    | 查看更多
                  a.btn.btn-primary-500.col(href='#', @click.prevent="addToCart(item.id)")
                    | 捐贈罐頭

    SimuProductModal(:ModalProductProps="ModalProduct" :loadingItemModal="status.loadingItem" @addToCartEmit="addToCart")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SimuProductModal from '@/components/SimuProductModal'
import $ from 'jquery'

export default {
  data () {
    return {
      status: {
        loadingItem: ''
      },
      searchText: '',
      ModalProduct: {},
      stared: [],
      staredLocalStor: JSON.parse(localStorage.getItem('staredData')) || []
    }
  },
  components: {
    SimuProductModal
  },
  methods: {
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
      this.$store.dispatch('cartModule/addToCart', { id, qty })
    },
    setStared (item) {
      const vm = this
      if (vm.stared.indexOf(item) === -1) {
        vm.stared.push(item)
      } else {
        vm.stared.splice(vm.stared.indexOf(item), 1)
      }

      vm.staredLocalStor = vm.stared.map(item => item.title)

      localStorage.setItem('staredData', JSON.stringify(vm.staredLocalStor))
    },
    getLocalStorage () {
      const vm = this
      vm.staredLocalStor.forEach(stared => {
        vm.products.forEach(data => {
          if (stared === data.title) {
            vm.stared.push(data)
          }
        })
      })
    },
    ...mapActions('productsModule', ['getProducts'])
  },
  computed: {
    filterData () {
      const vm = this
      if (vm.searchText === '喵星人' || vm.searchText === '汪星人') {
        return vm.products.filter(item => {
          const data = item.category.toLowerCase().includes(vm.searchText.toLowerCase())
          return data
        })
      } else if (vm.searchText === 'star') {
        return vm.stared
      } else {
        return vm.products
      }
    },
    starColor () {
      return function (item) {
        const vm = this
        if (vm.stared.indexOf(item) === -1) {
          return 'far'
        } else {
          return 'fas'
        }
      }
    },
    ...mapGetters('productsModule', ['products', 'categories'])
  },
  async created () {
    await this.getProducts()
    this.getLocalStorage()
  }
}
</script>

<style lang="scss" scoped>
.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
</style>
