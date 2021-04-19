import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/api/axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    product: {
      name: '',
      image_url: '',
      price: '',
      stock: ''
    },
    banners: [],
    banner: {
      banner_url: '',
      title: '',
      status: ''
    }
  },
  mutations: {
    productList (state, payload) {
      state.products = payload
    },
    dataProduct (state, payload) {
      state.product = payload
    },
    bannerList (state, payload) {
      state.banners = payload
    },
    dataBanner (state, payload) {
      state.banner = payload
    }
  },
  actions: {
    // * USER
    login (context, payload) {
      axios({
        url: 'user/login',
        method: 'POST',
        data: payload
      })
        .then(({ data }) => {
          localStorage.setItem('access_token', data)
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // * ====== PRODUCT ======
    fetchProduct ({ commit, state }) {
      axios({
        url: '/products',
        method: 'GET'
      })
        .then(({ data }) => {
          commit('productList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addProduct (context, payload) {
      axios({
        url: '/products',
        method: 'POST',
        headers: { access_token: localStorage.access_token },
        data: payload
      })
        .then(data => {
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editProduct (context, payload) {
      const { product, id } = payload
      axios({
        url: `/products/${id}`,
        method: 'PUT',
        headers: { access_token: localStorage.access_token },
        data: product
      })
        .then(() => {
          router.push('/dashboard')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteProduct (context, payload) {
      const { id } = payload

      axios({
        url: `/products/${id}`,
        method: 'DELETE',
        headers: { access_token: localStorage.access_token },
        data: {
        }
      })
        .then(data => {
          context.dispatch('fetchProduct')
        })
        .catch(err => {
          console.log(err)
        })
    },
    // * ====== BANNER ======
    fetchBanner ({ commit, state }) {
      axios({
        url: '/banners',
        method: 'GET'
      })
        .then(({ data }) => {
          commit('bannerList', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addBanner (context, payload) {
      axios({
        url: '/banners',
        method: 'POST',
        headers: { access_token: localStorage.access_token },
        data: payload
      })
        .then(data => {
          router.push('/banner')
        })
        .catch(err => {
          console.log(err)
        })
    },
    editBanner (context, payload) {
      const { banner, id } = payload
      console.log(banner, id)
      axios({
        url: `/banners/${id}`,
        method: 'PUT',
        headers: { access_token: localStorage.access_token },
        data: banner
      })
        .then(() => {
          router.push('/banner')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteBanner (context, payload) {
      const { id } = payload

      axios({
        url: `/banners/${id}`,
        method: 'DELETE',
        headers: { access_token: localStorage.access_token },
        data: {
        }
      })
        .then(() => {
          context.dispatch('fetcBanner')
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
