const route  = require('express').Router()
const BannerController = require('../controllers/bannerControlller')
const { authorize, authenticate } = require('../middlewares/auth')

route.get('/', BannerController.fetchBanner)

//* middleware
route.use(authenticate, authorize)

route.post('/', BannerController.addBanner)

route.put('/:id', BannerController.changeBanner)

route.delete('/:id', BannerController.deleteBanner)

module.exports = route
