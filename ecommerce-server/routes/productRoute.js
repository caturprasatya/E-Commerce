const route  = require('express').Router()
const ProductController = require('../controllers/productController')
const { authorize, authenticate } = require('../middlewares/auth')


route.get('/', ProductController.fetchProduct)

//* middleware
route.use(authenticate, authorize)

route.post('/', ProductController.addProduct)

route.put('/:id', ProductController.changeProduct)

route.delete('/:id', ProductController.deleteProduct)

module.exports = route
