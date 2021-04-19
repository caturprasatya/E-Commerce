<template>
  <div class="card col-3 m-2 border-0 shadow" style="width: 18rem;">
    <img :src="Product.Product.image_url" class="card-img-top  mt-2 h-75" alt="...">
    <div class="card-body d-flex flex-column align-items-center">
    </div>
  </div>        
</template>

<script>
export default {
  props:['Product'],
  computed: {
  }
}
</script>

<style>

</style>