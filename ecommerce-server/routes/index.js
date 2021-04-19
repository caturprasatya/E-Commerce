const route  = require('express').Router()
const productRoute = require('./productRoute')
const bannerRoute = require('./bannerRoute')
const wishlistRoute = require('./wishlistRoute')
const cartRoute = require('./cartRoute')
const userRoute = require('./userRoute')
const checkoutRoute = require('./checkoutRoute')

const { authenticate } = require('../middlewares/auth')

route.use('/user', userRoute)

route.use('/products', productRoute)

route.use('/banners', bannerRoute)

route.use(authenticate)

route.use('/checkout', checkoutRoute)

route.use('/wishlists' ,wishlistRoute)

route.use('/carts' ,cartRoute)

module.exports = route
