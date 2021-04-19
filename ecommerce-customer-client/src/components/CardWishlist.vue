<template>
<div class="col-lg-4 col-md-6 col-12 mt-3">
  <div class="card p-2 m-0" id="wishlist">
      <div class="d-flex align-items-center">
          <div class="image"> <img :src="wishlist.Product.image_url" width="170"> </div>
          <div class="ml-3 w-100">
            <div class="text-center">
              <h6 class="mb-0 mt-0"> {{wishlist.Product.name}} </h6> <span> {{wishlist.Product.category}} </span>
            </div>
              <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                <small><i> {{rupiah}} </i></small>
              </div>
              <div class="mt-2 d-flex flex-justify-around">
                <button @click.prevent="checkout" class="btn22 btn-sm btn-outline-primary mr-1"><i class="fa fa-shopping-cart fa-lg align-self-center"></i> Buy</button>
                <button @click="deleteWishlist(wishlist.id)" class="btn11 btn-sm btn-primary"><i class="fas fa-trash fa-lg"></i> Delete</button>
              </div>
          </div>
      </div>
  </div>
</div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props:['wishlist'],
  methods: {
    deleteWishlist(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteWishlist' ,id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    checkout () {
      this.$store.commit('dataProduct', this.wishlist.Product)
      this.$router.push('/checkout')
    }
  },
  computed: {
      rupiah () {
        let price = this.wishlist.Product.price
        var rupiah = '';		
        var angkarev = price.toString().split('').reverse().join('');
        for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
        return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
  }
}
</script>

<style>

</style>