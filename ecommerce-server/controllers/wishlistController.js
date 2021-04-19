const { Wishlist, Product } = require('../models')

class WishlistController {

  static fetchWishlist(req, res, next) {
    let UserId = req.currentUser.id

    Wishlist
        .findAll({ where: { UserId }, include: Product, attributes:['id', 'UserId','ProductId'] })
        .then(wishlists => {
            res.status(200).json(wishlists)
        })
        .catch(err => {
            next(err)
        })
  }

  static addWishlist(req, res, next) {
    let UserId = req.currentUser.id
    let { ProductId } = req.params
    let data = { UserId, ProductId }

    Wishlist
        .findOne({where: { UserId, ProductId }})
        .then(wishlist => {
          if (wishlist) {
            console.log('asuk sini');
            res.status(400).json({ message: 'The wishlist has been input'})
          } else {
            return Wishlist.create(data)
          }
        })
        .then(wishlist => {
            res.status(201).json(wishlist)
        })
        .catch(err => {
            next(err)
        })
  }

  static getWishlist(req, res, next) {
    let UserId = req.currentUser.id
    let ProductId = req.params.id

    Wishlist
        .findOne({ where: { UserId, ProductId }})
        .then(wishlist => {
            if (wishlist) {
                res.status(200).json(wishlist)
            } else {
                res.status(404).json({ message: "Wishlist Not Found" })
            }
        })
        .catch(err => {
            next(err)
        })
  }

  static deleteWishlist(req, res, next) {
    let { id } = req.params

    Wishlist
        .destroy({ where: { id }})
        .then(wishlist => {
            res.status(200).json({ message: "Successfully delete wishlist" })
        })
        .catch(err => {
            next(err)
        })
  }
}

module.exports = WishlistController