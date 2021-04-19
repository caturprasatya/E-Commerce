<template>
  <div class="container mt-5 mb-3">
    <div class="text-center">
      <h1> Your Wishlist </h1>
    </div>
    <div class="row">
      <Card
      v-for="wl in wishlists"
      :key="wl.id"
      :wishlist="wl" />
    </div>
  </div>
</template>

<script>
import Card from '../components/CardWishlist.vue'
import { mapState } from 'vuex'


export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapState(['wishlists']),
  },
  components: {
    Card
  }, 
  created () {
    this.$store.dispatch('fetchWishlist')
  }
}
</script>

<style>

</style>