const route  = require('express').Router()
const WishlistController = require('../controllers/wishlistController')

route.get('/', WishlistController.fetchWishlist)

route.post('/:ProductId', WishlistController.addWishlist)

route.get('/:id', WishlistController.getWishlist)

route.delete('/:id', WishlistController.deleteWishlist)

module.exports = route