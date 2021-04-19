const route = require('express').Router()
const CheckoutController = require('../controllers/checkoutController')
const { Product, Cart, sequelize } = require('../models');

route.post('/carts', (req, res) => {

  sequelize.transaction(function(t){

      console.log('transaction openned'+t);

  });
});

route.post('/peritem', CheckoutController.chekoutPeritem);

module.exports = route