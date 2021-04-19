<template>
<div>
  <Carousel />
  <div class="pt-5">
    <div class="container-fluid">
      <div class="text-center">
        <h1> List Our Product </h1>
      </div>
      <hr>
      <div class="row">
        <CardProduct 
        v-for="product in products"
        :key="product.id"
        :product="product"
        />
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Carousel from './Carousel.vue'
import CardProduct from './CardProduct.vue'
import { mapState } from 'vuex'

export default {
   components: {
    Carousel,
    CardProduct
  },
  computed: {
    ...mapState(['products', 'banners'])
  },
  created () {
    this.$store.dispatch('fetchProduct')

  }
}
</script>

<style>

</style>