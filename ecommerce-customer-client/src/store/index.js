import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../api/axios'
import router from '../router'
import Swal from 'sweetalert2'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {},
    banners: [],
    carts: [],
    wishlists: [], 
    login: false
  },
  mutations: {
    productList (state, payload) {
      state.products = payload.filter(prod => prod.stock > 0)
    },
    bannerList (state, payload) {
      state.banners = payload.filter(banner => banner.status === true)
    },
    cartList (state, {data, boolean}) {
      state.carts = data.filter(cart => cart.status === boolean)
    },
    wishlistList (state, payload){
      state.wishlists = payload.filter(prod => prod.Product.stock > 0)
    },
    dataProduct (state, payload) {
      state.product = payload
    },
    userlogin (state) {
      state.login = true
      console.log('kepanggil');
    }
  },
  actions: {
    //* ======== USER ========= //
    login (context, payload) {
      axios({
        url: 'user/login',
        method: 'POST',
        data: payload
      })
      .then(({ data }) => {
        localStorage.setItem('access_token', data)
        router.push('/')
      })
      .catch(err => {
        console.log(err);
      })
    },
    register (context, payload) {
      console.log(payload);
      axios({
        url: 'user/register',
        method: 'POST',
        data: payload
      })
      .then(({ data }) => {
        Swal.fire(
          `Thank You ${data.name}!`,
          'You can acccess the Yokitori',
          'success'
        )
      })
      .catch(err => {
        console.log(err);
      })
    },

    //* ======== PRODUCT =========//
    fetchProduct ({ commit}) {
      axios({
        url: '/products',
        method: 'GET',
        headers: { access_token: localStorage.access_token}
      })
        .then(({ data }) => {
          commit('productList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    //* ======== BANNER ==========//
    fetchBanner ({ commit}) {
      axios({
        url: '/banners',
        method: 'GET',
        headers: { access_token: localStorage.access_token}
      })
        .then(({ data }) => {
          commit('bannerList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    //* ======== WISHLIST =========//
    fetchWishlist ({ commit }) {
      axios({
        url: '/wishlists',
        method: 'GET',
        headers: { access_token: localStorage.access_token}
      })
        .then(({ data }) => {
          commit('wishlistList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addWishlist (context, id) {
      axios({
        url: `/wishlists/${id}`,
        method: 'POST',
        headers: { access_token: localStorage.access_token}
      })
        .then(() => {
            Swal.fire(
              `New Product in Wishlist!`,
              '',
              'success'
            )
        })
        .catch(err => {
          if (err.message === 'Request failed with status code 400') {
            Swal.fire(
              `Product Has Been Added to wishlist!`,
              '',
              'error'
            )
          } else {
            console.log(err, 'err>>>>>>')
          }
        })
    },    
    deleteWishlist ({ dispatch }, id) {
      axios({
        url: `/wishlists/${id}`,
        method: 'DELETE',
        headers: { access_token: localStorage.access_token}
      })
        .then(() => {
          dispatch('fetchWishlist')
        })
        .catch(err => {
          console.log(err)
        })
    },

    //* ========== CART ===========// 
    fetchCart ({ commit }, boolean) {
      axios({
        url: '/carts',
        method: 'GET',
        headers: { access_token: localStorage.access_token}
      })
        .then(({ data }) => {
          commit('cartList', { data, boolean})
        })
        .catch(err => {
          console.log(err)
        })
    },
    addCart (context, id) {
      axios({
        url: `/carts/${id}`,
        method: 'POST',
        headers: { access_token: localStorage.access_token}
      })
        .then(({ data }) => {
          if (data.message === 'The cart has been input') {
            Swal.fire(
              `Product in cart!`,
              'If you want edit quantity please move in page cart',
              'error'
            )
          } else {
            Swal.fire(
              `Product Success Input Cart!`,
              'Make a payment before it sold out',
              'success'
            )
          }
        })
        .catch(err => { 
          if (err.message === 'Request failed with status code 400') {
            Swal.fire(
              `Product in cart!`,
              'If you want edit quantity please move in page cart',
              'error'
            )
          } else {
            console.log(err, 'err>>>>>>')
          }
      })
    },
    updateCart ({ dispatch }, {id, ProductId, amount }) {
      axios({
        url: `/carts/${id}`,
        method: 'PATCH',
        headers: { access_token: localStorage.access_token},
        data: { ProductId, amount }
      })
        .then( () => {
          dispatch('fetchCart', true)
        })
        .catch(err => {
          console.log(err.message)
            Swal.fire(
              `Sorry!`,
              'The product has reached its limit',
              'error'
            )
          dispatch('fetchCart')
        })
    },
    deleteCart ({ dispatch }, id) {
      axios({
        url: `/carts/${id}`,
        method: 'DELETE',
        headers: { access_token: localStorage.access_token}
      })
        .then(() => {
          dispatch('fetchCart', true)
        })
        .catch(err => {
          console.log(err)
        })
    },

    //* ========== CHECKOUT ===========//
    checkoutPeritem (context, payload) {
      axios({
        url: '/checkout/peritem',
        method: 'POST',
        headers: { access_token: localStorage.access_token},
        data: payload
      })
        .then(() => {
          Swal.fire(
            `Thank you!`,
            'Product will be send to your address',
            'success'
          )
          router.push('/cart')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
