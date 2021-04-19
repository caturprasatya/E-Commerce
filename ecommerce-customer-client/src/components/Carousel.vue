<template>
  <div class="pt-4">
      <div id="carouselExampleIndicators" 
      class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div v-for="(banner, i) in banners" :key="banner.id"
          class="carousel-item" :class="{'active': i === 0}">
            <img :src="banner.banner_url" class="d-block w-100" alt="..." height="450">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  // props: ['banner'],
  computed: {
    ...mapState(['banners'])
  },
  created () {
    this.$store.dispatch('fetchBanner')
  }
}
</script>

<style>

</style>