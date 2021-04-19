<template>
  <div class="home">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  created () {
    if (localStorage.access_token) {
      this.$store.commit('userlogin')
    }
  }

}
</script>
