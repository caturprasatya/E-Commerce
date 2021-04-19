<template>
  <section id="banner-page">>
    <div class="container-fluid text-landing backlay-dashboard">
    <h2 class="white-txt text-center">Dashboard Banners</h2>
    <hr>
      <BannerCard
      v-for="(banner, i) in banners" :key="i+1"
      :banner="banner"/>
    </div>
  </section>
</template>

<script>
import BannerCard from './BannerCard.vue'

export default {
  components: {
    BannerCard
  },
  computed: {
    banners () {
      return this.$store.state.banners
    }
  },
  created () {
    this.$store.dispatch('fetchBanner')
  },
  mounted () {
    // console.log(this.banerrs())
  }
}
</script>

<style>

</style>
