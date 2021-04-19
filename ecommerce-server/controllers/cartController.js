const { Cart, Product } = require('../models')

class CartController {

  static fetchCart(req, res, next) {
    let UserId = req.currentUser.id

    Cart
        .findAll({ where: { UserId }, include: Product, attributes:['id', 'UserId','ProductId', 'updatedAt', 'amount', 'status'] })
        .then(carts => {
            res.status(200).json(carts)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
  }

  static addCart(req, res, next) {
    let UserId = req.currentUser.id
    let ProductId = req.params.id
    let data = { UserId, ProductId, amount: 1, status: true }

    Cart
      .findOne({ where: {UserId, ProductId} })
      .then(cart => {
          if (cart) {
            res.status(400).json({ message: 'The cart has been input'})
          } else {
            console.log(cart);
            return Cart.create(data)
          }
      })
        .then(cart => {
            console.log(cart);
            res.status(201).json(cart)
        })
        .catch(err => {
            console.log(err);
            next(err)
        })
  }

  static getCart(req, res, next) {
    let UserId = req.currentUser.id

    Cart
        .findOne({ where: { UserId }})
        .then(cart => {
            if (cart) {
                res.status(200).json(cart)
            } else {
                res.status(404).json({ message: "You Can't to Cart" })
            }
        })
        .catch(err => {
            next(err)
        })
  }

  static updateCart(req, res, next) {
    let { ProductId, amount } = req.body
    let { id } = req.params

    Product
        .findByPk(ProductId)
        .then(product => {
          if (+amount <= product.stock) {
            return Cart.update({ amount: +amount }, { where: { id }})
          } else {
            res.status(400).json({ message: 'More than product data' })
          }
        })
        .then(cart => {
            res.status(200).json(cart)
        })
        .catch(err => {
            next(err)
        })
  }

  static deleteCart(req, res, next) {
    let { id } = req.params

    Cart
        .destroy({ where: { id }})
        .then(cart => {
            res.status(200).json({ message: "Successfully delete appreciation" })
        })
        .catch(err => {
            next(err)
        })
  }
}

module.exports = CartController