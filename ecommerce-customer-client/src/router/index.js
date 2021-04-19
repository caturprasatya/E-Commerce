import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresVisitor: false },
    children: [
      {
        path: '',
        name: 'ListProduct',
        meta: { requiresVisitor: false },
        auth: false,
        component: () => import(/* webpackChunkName: "about" */ '../components/ListProduct.vue')
      },
      {
        path: '/cart',
        name: 'CartList',
        meta: { requiresVisitor: true },
        auth: true,
        component: () => import(/* webpackChunkName: "about" */ '../components/CartList.vue')
      },
      {
        path: '/wishlist',
        name: 'Wishlist',
        auth: true,
        component: () => import(/* webpackChunkName: "about" */ '../components/Wishlist.vue'),
        meta: { requiresVisitor: true }
      },    
    ]
  },
  {
    path: '/login',
    name: 'Login',
    auth: false,
    meta: { requiresVisitor: false },
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/checkout',
    name: 'Checkout',
    auth: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Checkout.vue'),
    meta: { requiresVisitor: true }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    auth: false,
    meta: { requiresVisitor: false }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogged = localStorage.access_token
  if (isLogged) {
    if (to.name === 'Login') {
      next('/')
    } else {
      next()
    }
  } 
  else {
    if (to.meta.requiresVisitor) next('/login') 
    else next()
  }
})

export default router
