const { Product } = require('../models')

const destroy = () =>{
    return Product.destroy({where : {}})
}

module.exports = destroy