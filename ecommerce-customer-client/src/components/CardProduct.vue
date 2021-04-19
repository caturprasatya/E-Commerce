<template>
  <div class="col-md-4 col-sm-12 col-xs-12">
    <div class="card pl-4 pr-3 py-2">
      <div class="div1 row py-4 px-2">
          <div class="col-3 mt-2"> 
            <div class="btn discBtn text-white p-1 p-md-2"></div> 
          </div>
          <div class="col-6 d-flex justify-content-center"> 
            <img :src="product.image_url" height="200" width="150%" alt=""> 
          </div>
          <div class="col-3 d-flex justify-content-end pl-5"> <i @click="addWishlist(product.id)" class="fas fa-heart fa-lg mt-4" aria-hidden="true"></i>
          </div>
      </div>
      <div class="py-2 px-4">
          <div class="text-center">
            <h5>{{product.name}}</h5>
          </div>
          <div class="d-flex justify-content-between">
              <h5 class="align-self-center"> {{rupiah}} </h5> 
              <div class="d-flex justify-content-end">
                <span @click.prevent="addCart(product.id)" class="cart text-white p-2 pb-0"><i class="fa fa-shopping-cart fa-lg align-self-center" aria-hidden="true"></i></span>
                <button @click.prevent="checkout" class="buy d-flex ml-auto font-weight-bold pb-0 border-0"> Buy </button>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: ['product'],
  methods: {
    addCart (id) {
      if (localStorage.access_token) {
        this.$store.dispatch('addCart', id)
      } else {
        Swal.fire(
          `Sorry!`,
          'You cannot access before login',
          'error'
        )
      }
    },
    addWishlist (id) {
      if (localStorage.access_token) {
        this.$store.dispatch('addWishlist', id)
      } else {
        Swal.fire(
          `Sorry!`,
          'You cannot access before login',
          'error'
        )
      }
    },
    checkout () {
      this.$store.commit('dataProduct', this.product)
      this.$router.push('/checkout')
    }
  },
  computed: {
    rupiah () {
      let str = String(this.product.price)
      var rupiah = '';		
      var angkarev = str.toString().split('').reverse().join('');
      for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
      return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
  },
  mounted () {
  }
}
</script>

<style>

</style>