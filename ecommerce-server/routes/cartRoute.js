const route  = require('express').Router()
const CartController = require('../controllers/cartController')

route.get('/', CartController.fetchCart)

route.post('/:id', CartController.addCart)

route.patch('/:id', CartController.updateCart)

route.get('/:id', CartController.getCart)

route.delete('/:id', CartController.deleteCart)

module.exports = route