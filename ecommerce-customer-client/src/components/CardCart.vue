<template>
  <div class="col-12 col-md-7">
    <div class="card p-3">
      <div class="row">
        <div class="col-12 col-md-5"> 
          <img :src="cart.Product.image_url" class="responsive" height="100%" width="100%" frameborder="0" alt="">
        </div>
        <div v-if="!cart.status" class="col-12 col-md-7 py-3 px-4">
          <div class="card-body">
            <h5 class="card-title">{{ cart.Product.name }}</h5>
            <p class="card-text">
              {{ date }} <br>
              You Pay The Product <b> {{rupiah}} </b>
            </p>
          </div>
        </div>
        <div v-if="cart.status" class="col-12 col-md-7 py-3 px-4"> 
          <p class="small font-weight-bold my-2"> {{ date }} </p>
          <h6 class="mb-3"> {{ cart.Product.name }} </h6>
          <div class="card-text"> Amount: </div>
          <div class="row">
            <div class="d-flex justify-content-center"
            @click="updateCart(cart.id, cart.Product.id)">
              <NumberInputSpinner
              @click="updateCart"
              :min="1"
              :max="cart.Product.stock"
              :step="1"
              :integerOnly="true"
              v-model="amount"
              class="col-8"
              />
            </div>
            <br>
            </div>
          <div class="row">
            <br>
          </div>
          <div class="row">
            <br>
          </div>
          <div v-if="cart.status" class="row d-flex justify-content-between mb-0 pr-0">
                <div class="col-6 mb-0 pb-0" @click="deleteCart(cart.id)"> <button class="section2_btn btn11 mb-0" type="button"><small>Delete</small></button> </div>
                  
                <div class="col-6 mb-0 pb-0 pr-0 mr-0" @click="checkout"> <button class="section2_btn btn22 mb-0 pr-0 mr-0" type="button"><small>Buy</small></button> </div> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NumberInputSpinner from 'vue-number-input-spinner'
import Swal from 'sweetalert2'

export default {
  data () {
    return {
      amount: this.cart.amount
    }
  },
  methods:{
    updateCart (id, ProductId) {
      let data = this.amount

      this.$store.dispatch('updateCart', { id, ProductId, amount: data })
    },
    deleteCart (id) {
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
          this.$store.dispatch('deleteCart', id)
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    },
    checkout () {
      this.$store.commit('dataProduct', { cart: this.cart })
      this.$router.push('/checkout')
    }
  },
  components: {
    NumberInputSpinner
  },
  props: ['cart'],
  computed: {
    date () {
      return this.cart.updatedAt.toLocaleString().split('T')[0]
    },
    rupiah () {
      let price = this.cart.Product.price
      let amount = this.cart.amount

      let total = price * amount

      var rupiah = '';		
      var angkarev = total.toString().split('').reverse().join('');
      for(var i = 0; i < angkarev.length; i++) if(i%3 == 0) rupiah += angkarev.substr(i,3)+'.';
      return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('');
    }
  },
  created () {
  }
}
</script>

<style>

</style>