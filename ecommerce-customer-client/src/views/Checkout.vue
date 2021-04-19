<template>
   <div class="container mt-4">
      <div class="py-5 text-center">
        <img class="d-block mx-auto mb-4" src="../assets/YOKITORI_free-file.png" alt="" width="300" height="72">
        <h2>Checkout form</h2>
        </div>
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-muted">Your cart</span>
          </h4>
          <div class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
              <img :src="image" class="card-img-top  mt-2 h-75" alt="...">
            <div class="card-body d-flex flex-column align-items-center">
              <p><b> {{rupiah}} </b></p>
            </div>
          </div> 
        </div>
        <!-- BILLING ADDRESS -->
        <div class="col-md-8 order-md-1">
          <h4 class="mb-3">Billing address</h4>
          <form class="needs-validation" novalidate>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="firstName">First name</label>
                <input v-model="firstname" type="text" class="form-control" id="firstName" placeholder="" value="" required>
                <div class="invalid-feedback">
                  Valid first name is required.
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label for="lastName">Last name</label>
                <input v-model="lastname" type="text" class="form-control" id="lastName" placeholder="" value="" required>
                <div class="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label for="email">Email <span class="text-muted">(Optional)</span></label>
              <input v-model="email" type="email" class="form-control" id="email" placeholder="you@example.com">
              <div class="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>
            <div class="mb-3">
              <label for="address">Address</label>
              <input v-model="address" type="text" class="form-control" id="address" placeholder="Jakarta..." required>
              <div class="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>
            <hr class="mb-3">
            <hr class="mb-4">
            <div class="d-flex justify-content-around">
              <button v-if="typeof(product) === 'object'" class="btn btn-info btn-lg btn-block mb-4" type="submit" @click.prevent="checkoutProduct">Continue to checkout</button>
              <button v-else-if="Array.isArray(product)" class="btn btn-info btn-lg btn-block mb-4" type="submit" @click.prevent="checkoutProducts">Continue to checkout</button>
              <button class="btn btn-info btn-lg btn-block mb-4" type="submit" @click.prevent="back">Back Home</button>
            </div>
          </form>
        </div>
      </div>
   </div>
</template>

<script>
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

export default {
  data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      address: ''
    }
  },
  methods:{
    checkoutProduct () {
      let data
      if (this.product.Product) {
        data = this.product
      } else {
        data = { 
          id: NaN,
          UserId: NaN,
          ProductId: this.product.id
        }
      }

      this.$store.dispatch('checkoutPeritem', data)
      this.submit()
    },
    checkoutProducts () {
      console.log('masukk2');
    },
    back () {
      this.$router.push('/')
    },
    submit () {
      console.log(this.firstname);
       if (this.email !== null && this.address !== null) {
        init("user_xbQybBadAagTt76mQfYdc");
        emailjs.send(
          'service_0hzn9h2',
          'template_bo377jp',//get this from emailjs dashboard
          {email: this.email, name: `${this.firstname} ${this.lastname}`, address: this.address, product:this.productName }
        ).then((response) => {
          console.log('SUCCESS You just sent an email...', response)
        }, (error) => {
          console.log('FAILED Throw an error to user...', error)
        })
      } else {
        console.log('input dulu');
      }
    }
  },
  computed: {
    product () {
      let prod = this.$store.state.product
      if (prod.cart) {
        return prod.cart
      } else {
        return prod
      }
    },
    image () {
      if (this.product.Product) {
        return this.product.Product.image_url
      } else {
        return this.product.image_url
      }
    },
    rupiah () {
      let prod = this.product.Product
      let amount
      let price

      if (prod) {
        amount = this.product.amount
        price = this.product.Product.price
      } else {
        amount = 1
        price = this.product.price
      }

      let total = amount * price

      var rupiah = ''
      var angkarev = total.toString().split('').reverse().join('')
      for(var i = 0; i < angkarev.length; i++) if (i % 3 == 0) rupiah += angkarev.substr(i,3)+'.'
      return 'Rp. '+rupiah.split('',rupiah.length-1).reverse().join('')
    },
    productName () {
      let prod = this.product.Product
      let productName

      if (prod) {
        productName = this.product.Product.name
      } else {
        productName = this.product.name
      }

      return productName
    }
  }
}
</script>

<style>

</style>