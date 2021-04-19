<template>
    <div class="home">
      <Navbar v-if="showNav"
      @changeNavbar="changeNavbar"/>
      <router-view/>
    </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
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
    Navbar
  },
  created () {
    if (!localStorage.access_token) {
      this.hideNavbar()
    }
  },
  beforeMount () {
  },
  mounted () {
  }
}
</script>
