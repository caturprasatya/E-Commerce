import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../components/Form.vue'
import Login from '../views/Login.vue'
import ProductList from '../components/ProductList.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Home',
    component: Home,
    meta: { requiresVisitor: false },
    children: [
      {
        path: '/',
        name: 'ProductList',
        component: ProductList,
        meta: { requiresVisitor: false }
      },
      {
        path: '/banner',
        name: 'Banner',
        component: () => import(/* webpackChunkName: "about" */ '../components/BannerList.vue'),
        meta: { requiresVisitor: false }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresVisitor: true }
  },
  {
    path: '/add',
    name: 'Form',
    component: Form,
    meta: { requiresVisitor: false }
  },
  {
    path: '/formbanner',
    name: 'FormBanner',
    component: () => import(/* webpackChunkName: "about" */ '../components/FormBanner.vue'),
    meta: { requiresVisitor: false }
  },
  {
    path: '/uploadimage',
    name: 'FormImage',
    component: () => import(/* webpackChunkName: "about" */ '../components/UploadImage.vue'),
    meta: { requiresVisitor: false }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: { requiresVisitor: true }
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
  } else {
    if (to.meta.requiresVisitor) next()
    else next('/login')
  }
})

export default router
