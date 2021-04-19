<template>
  <section id="login-page">
      <div class="container-fluid text-landing d-flex justify-content-center">
          <div class="col-lg backlay">
            <main class="form-signin mid-image">
                <form>
                    <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>
                    <label for="inputEmail" class="d-none">Email address</label>
                    <input v-model="email" type="email" id="email-login" class="form-control" placeholder="Email address" autofocus>
                    <br>
                    <label for="inputPassword" class="d-none">Password</label>
                    <input v-model="password" type="password" id="password-login" class="form-control" placeholder="Password">
                    <br>
                    <button class="w-100 btn btn-lg btn-outline-light" type="submit" @click.prevent="login" >Sign in</button>
                </form>
            </main>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      password: '',
      email: ''
    }
  },
  methods: {
    login () {
      const user = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', user)
    }
  }
}
</script>

<style>

</style>
