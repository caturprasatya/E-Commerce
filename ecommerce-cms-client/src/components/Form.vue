<template>
  <section id="add-product-page">
      <div class="container-fluid text-landing d-flex justify-content-center">
        <div class="col-lg backlay white-txt">
          <main class="form-signin">
              <form>
                  <h1 class="h3 mb-3 fw-normal text-center">Add Product</h1>
                  <label for="productName">Product Name</label>
                  <input v-model="name" type="text" id="product-name" class="form-control" placeholder="Product Name" autofocus>
                  <label for="stock">Stock</label>
                  <input v-model="stock" type="number" id="stock" class="form-control" placeholder="Stock">
                  <label for="category">Category</label>
                  <input v-model="category" type="text" id="category" class="form-control" placeholder="Category">
                  <label for="price">Price</label>
                  <input v-model="price" type="number" id="price" class="form-control" placeholder="Price">
                  <label for="imageUrl">Image Url</label>
                  <input v-model="image_url" type="url" id="image-url" class="form-control" placeholder="Image Url">
                  <br>
                  <br>
                  <div class="mb-3">
                    <button v-if="!onEdit" class="w-100 btn btn-lg btn-outline-light"  @click.prevent="addProduct">Add Product</button>
                    <button v-else class="w-100 btn btn-lg btn-outline-light"  @click.prevent="editProduct(id)">Submit Product</button>
                  </div>
                  <br>
                  <button class="w-100 btn btn-lg btn-warning btn-outline-light"  @click.prevent="back"><i class="fas fa-sign-out-alt"></i> Back</button>
              </form>
          </main>
        </div>
    </div>
  </section>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'Form',
  data () {
    return {
      id: 0,
      name: '',
      image_url: '',
      price: '',
      category: '',
      stock: '',
      onEdit: false
    }
  },
  methods: {
    addProduct () {
      const product = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category
      }
      Swal.fire(
        'Greet!',
        'Success add new product!'
      )
      this.$store.dispatch('addProduct', product)
      this.clearForm()
      this.$store.commit('dataProduct', {})
    },
    editProduct (id) {
      const product = {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        category: this.category
      }
      this.$store.dispatch('editProduct', { product, id })
      this.clearForm()
      this.$router.push('/dashboard')
      this.$store.commit('dataProduct', {})
    },
    clearForm () {
      this.id = ''
      this.name = ''
      this.image_url = ''
      this.price = ''
      this.stock = ''
      this.onEdit = true
    },
    back () {
      this.$router.push('/dashboard')
      this.clearForm()
      this.$store.commit('dataProduct', {})
    }
  },
  computed: {
  },
  watch: {
  },
  create () {
  },
  beforeMoundted () {
  },
  mounted () {
    const data = this.$store.state.product
    this.id = data.id
    this.name = data.name
    this.image_url = data.image_url
    this.price = data.price
    this.stock = data.stock
    if (data.name) {
      this.onEdit = true
    }
  }
}
</script>

<style>

</style>
