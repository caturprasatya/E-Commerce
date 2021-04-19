<template>
  <div id="form-sign-signup">
    <div class="container bg-white pb-5 mb-5">
      <div class="row d-flex justify-content-start align-items-center mt-sm-5">
          <div class="col-lg-5 col-11">
              <div id="circle"></div>
              <div class="pb-6"> 
                <img src="../assets/Tiny man ordering products online via smartphone.jpg" class="log" height="400" alt=""> 
              </div>
          </div>
          <div class="col-lg-4 offset-lg-2 col-md-6 offset-md-3">
            <div class="pt-4">
                <img src="../assets/YOKITORI_free-file.png" alt="logo" height="90" width="200">
            </div>
            <div class="mt-3 mt-md-5">
              <h5 v-if="login"> Log in to your account</h5>
              <h5 v-else> Please fill in all data input </h5>
              <form class="pt-4">
                <div v-if="!login" class="d-flex flex-column pb-3"> 
                  <label for="name">Name </label> 
                  <input v-model="name" type="name" name="text" id="name" class="border-bottom border-primary"> 
                </div>
                  <div class="d-flex flex-column pb-3"> 
                    <label for="email">Email Address</label> 
                    <input v-model="email" type="email" name="email" id="emailId" class="border-bottom border-primary"> 
                  </div>
                  <div class="d-flex flex-column pb-3"> 
                    <label for="password">Password</label> 
                    <input v-model="password" type="password" name="passwrd" id="pwd" class="border-bottom border-primary"> 
                  </div>
                  <div class="d-flex jusity-content-center">
                    <button v-if="login" @click.prevent="signin" type="button" value="Log in" class="btn btn-primary btn-block mb-3"> Sign in </button>
                    <div v-else>
                      <button type="button" @click.prevent="signup" value="Log in" class="btn btn-primary btn-block mb-3"> Sign up </button>
                      <button type="button" @click.prevent="back" value="Log in" class="btn btn-primary btn-block mb-3"> Go back </button>
                    </div>
                  </div>
                  <div v-if="login" class="register mt-5">
                      <p>Don't have an account? <a href=".." @click.prevent="signupPage">Create an account</a> </p>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';

export default {
  data () {
    return {
      login: true,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signupPage () {
      this.login = false
    },
    back () {
      this.login = true
    },
    signin () {
      let data = {
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('login', data)
      this.clear()
    },
    signup () {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.$store.dispatch('register', data)
      this.sendEmail()
      this.login = true
      this.clear()
    },
    sendEmail () {
       if (this.email) {
        init("user_xbQybBadAagTt76mQfYdc");
        emailjs.send(
          'service_0hzn9h2',
          'register',
          { email: this.email, name: this.name }
        ).then((response) => {
          console.log('SUCCESS You just sent an email...', response)
        }, (error) => {
          console.log('FAILED Throw an error to user...', error)
        })
      } else {
        console.log('input dulu');
      }
    },
    clear () {
      this.name = ''
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>

</style>
