<template>
   <div class="pt-0">
      <nav class="navbar navbar-expand-lg navbar-red navbar-dark">
        <div class="wrapper"> </div>
        <div class="container-fluid all-show"> <a class="navbar-brand" @click.prevent="home" aria-current="page"> Yokitori </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> 
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto mb-2 mb-lg-0">
              <li class="nav-item"> <a class="nav-link" @click.prevent="cart">  <i class="fa fa-shopping-cart fa-lg align-self-center"></i> Cart</a> </li>
              <li class="nav-item"> <a class="nav-link" @click.prevent="wishlist"> <i class="fas fa-heart fa-lg"></i> Wishlist</a></li>
            </ul>
          </div>
          <div>
            <div v-if="!isLogged" class="logout">
                  <a @click.prevent="login">Login</a>         
            </div>
            <div v-if="isLogged" class="logout">
                  <a @click.prevent="logout">Logout</a>         
            </div>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
  },
  methods: {
    home () {
      this.$router.push('/')      
    },
    cart () {
      this.$router.push('/cart')      
    },
    wishlist () {
      this.$router.push('/wishlist')      
    },
    logout () {
      localStorage.removeItem('access_token')

      this.$router.push('/login')
    },
    login () {
      this.$router.push('/login')
    }
  },
  computed: {
      isLogged (){
        return this.$store.state.login
      } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
