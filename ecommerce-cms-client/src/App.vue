<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// import Navbar from './components/Navbar.vue'

export default {
  data () {
    return {
      showNav: true
    }
  },
  methods: {
    changeNavbar () {
      this.showNav = false
    },
    hideNavbar () {
      this.showNav = false
    },
    showNavbar () {
      this.showNav = true
    }

  },
  components: {
    // Navbar
  },
  created () {
    if (!localStorage.access_token) {
      this.hideNavbar()
    } else {
      const route = this.$router.history.current.name

      if (route === 'FormBanner' || route === 'Form') {
        this.hideNavbar()
      } else {
        this.showNavbar()
      }
    }
  },
  beforeMount () {
  },
  mounted () {
  }
}
</script>

<style>
</style>
