<template lang="pug">
  div
    nav.d-flex.justify-content-center(aria-label='Page navigation example')
      ul.pagination
        li.page-item(:class="{ 'disabled': !paginationProps.has_pre }")
          a.page-link(href='#', aria-label='Previous', @click.prevent="getProductsModal(paginationProps.current_page - 1)")
            span(aria-hidden='true') «
        li.page-item(v-for="page in paginationProps.total_pages", :key="page", :class="{ 'active': paginationProps.current_page === page }")
          a.page-link(href='#' @click.prevent="getProductsModal(page)") {{ page }}
        li.page-item(:class="{ 'disabled': !paginationProps.has_next }")
          a.page-link(href='#', aria-label='Next', @click.prevent="getProductsModal(paginationProps.current_page + 1)")
            span(aria-hidden='true') »
</template>

<script>
export default {
  props: ['paginationProps'],
  methods: {
    getProductsModal (page) {
      this.$emit('getProductsEmit', page)
    }
  }
}
</script>
