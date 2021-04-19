const { Product, Cart, sequelize } = require('../models')

class CheckoutController {

    static chekoutPeritem(req, res, next) {
        let { id, UserId, ProductId } = req.body
        let amount = req.body.amount
        if (!amount) {
          amount = 1
        }
        if (!UserId) {
          UserId = req.currentUser.id
        }

        Product
          .findByPk(ProductId)
          .then(product => {
              if (product) {
                  if (product.stock >= +amount) {
                    let total = product.stock - +amount
                    return Product.update({ stock: total }, {where: { id: product.id}} )
                  } else {
                    res.status(400).json({ message: 'Stock is not enough'})
                  }
              } else {
                  res.status(404).json({ message: 'Product Not Found'})
              }
          })
          .then(product => {
              res.status(200).json(product)
              return Cart.findOne({where: { id, UserId, ProductId} })
          })
          .then(cart => {
              if (cart) {
                return Cart.update({ status: false } ,{ where: { id }, attributes:['id'] })
              } else {
                return Cart.create({ UserId, ProductId, amount, status: false}, { attributes: ['status'] })
              }
          })
          .then(cart => {
              if (!cart.status) {
                res.status(200).json({message: 'Success update'})
              } else {
                res.status(201).json({message: 'Success create'})
              }
          })
          .catch(err => {
              next(err)
          })
    }

}

module.exports = CheckoutController