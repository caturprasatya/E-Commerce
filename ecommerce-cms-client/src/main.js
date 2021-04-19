import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: process.env.API_FIREBASE,
      authDomain: 'omedeto-to-seiko.firebaseapp.com',
      projectId: 'omedeto-to-seiko',
      storageBucket: 'omedeto-to-seiko.appspot.com',
      messagingSenderId: process.env.MESSAGE_ID,
      appId: process.env.APP_ID
    }
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
  }
}).$mount('#app')
