<template>
  <section id="product-page">
      <div class="container-fluid text-landing backlay-dashboard">
        <div class="px-1">
          <h2 class="white-txt text-center mt-1 pt-0">Dashboard Products</h2>
          <table class="table col-lg-12 ml-2 mr-2">
            <thead class="thead-dark">
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, i) in products" :key="product.id">
                <td> {{i + 1}} </td>
                <td><img :src="product.image_url" alt="" width="100" height="100"></td>
                <td> {{product.id}} </td>
                <td> {{product.name}} </td>
                <td> {{product.category}} </td>
                <td> {{product.price}} </td>
                <td> {{product.stock}} </td>
                <td><button class="btn btn-info" @click.prevent="editProduct(product)"><small>Edit</small></button> <button class="btn btn-danger" @click.prevent="deleteProduct(product.id)"><small>Delete</small></button></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
    </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'ProductList',
  props: {
  },
  methods: {
    deleteProduct (id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You can\'t revert your action',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes Delete it!',
        cancelButtonText: 'No, Keep it!',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then((result) => {
        if (result.value) {
          this.$store.dispatch('deleteProduct', { id })
          Swal.fire('Deleted', 'You successfully deleted this file', 'success')
        } else {
          Swal.fire('Cancelled', 'Your file is still intact', 'info')
        }
      })
    },
    editProduct (product) {
      this.$store.commit('dataProduct', product)
      this.$router.push('/add')
    }
  },
  computed: {
    products () {
      return this.$store.state.products
    }
  },
  created () {
    this.$store.dispatch('fetchProduct')
  }
}
</script>

<style scoped>
</style>
