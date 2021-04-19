<template>
    <div class="pt-4">
      <div class="container-fluid">

          <div class="collapse" id="navbarToggleExternalContent">
            <div class="bg-dark p-4">
              <div class="text center">
                <h5 class="text-white h4"> Yokitori </h5>
              </div>
              <div class="row">
                <button @click.prevent="seeAllCart" class="btn btn-primary col-6" type="button"> My Cart </button>
                <button @click.prevent="historyProduct" class="btn btn-primary col-6" type="button">History Product</button>
              </div>          
              </div>
            </div>
            <nav class="navbar navbar-dark bg-dark">
              <div class="container-fluid">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarToggleExternalContent"
                  aria-controls="navbarToggleExternalContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i class="fas fa-bars"></i>
                </button>
              </div>
            </nav>
        <hr>
        <hr>
        <div class="row justify-content-center">
          <CardCart
          v-for="cart in carts" :key="cart.id" 
          :cart="cart"
          />
        </div>
      </div>
    </div>
</template>

<script>
import CardCart from '../components/CardCart.vue'
import { mapState } from 'vuex'

export default {
  components: {
    CardCart
  },
  computed:{
    ...mapState(['carts'])
  },
  methods: {
    historyProduct () {
      this.$store.dispatch('fetchCart', false)
    },
    seeAllCart () {
      this.$store.dispatch('fetchCart', true)
    }
  },
  created () {
    this.$store.dispatch('fetchCart', true)
  }
}
</script>

<style>

</style>