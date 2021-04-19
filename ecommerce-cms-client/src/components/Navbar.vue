<template>
  <nav id="nav-after-login" class="navbar navbar-expand-lg navbar-light bg-black">
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav ms-auto text-white">
              <li class="nav-item white-txt">
                  <a class="nav-link active" aria-current="page" @click.prevent="dashboard"><i class="fas fa-list-alt"></i> Dashboard</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" @click.prevent="addPage"><i class="fas fa-plus-square"></i> Add Product</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" @click.prevent="bannerPage"><i class="fas fa-clipboard"></i> Banner</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" @click.prevent="addBannerPage"><i class="fas fa-plus-square"></i> Add Banner</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" @click.prevent="uploadImage"><i class="fas fa-plus-square"></i> Upload Image</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" @click.prevent="logout"><i class="fas fa-sign-out-alt"></i>Logout</a>
              </li>
          </ul>
      </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  methods: {
    addPage () {
      this.$router.push('/add')
      this.hideNavbar()
    },
    dashboard () {
      this.$router.push('/dashboard')
    },
    bannerPage () {
      this.$router.push('/banner')
    },
    addBannerPage () {
      this.$router.push('/formbanner')
      this.hideNavbar()
    },
    uploadImage () {
      this.$router.push('/uploadImage')
    },
    logout () {
      localStorage.removeItem('access_token')
      this.$router.push('/login')
      this.changeNavbar()
    },
    changeNavbar () {
      this.$emit('changeNavbar')
    }
  },
  created () {
  }
}

</script>

<style scoped>
</style>
