<template>
  <div id="notFoundPage">
    <div class="container">
      <div class="card mb-3">
        <img class="card-img-top" src="../assets/notfound.webp" alt="Card image cap">
        <div class="card-body">
          <div class="d-flex justify-content-center">
            <h5 class="card-title">Sorry Page not Available</h5>
            <hr>
            <br>
          </div>
          <div class="text-center">
            <button @click.prevent="back" class="btn btn-info"> Back Home</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.push('/dashboard')
    }
  }
}
</script>
