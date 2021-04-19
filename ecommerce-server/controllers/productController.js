const { Product, User } = require('../models')
const product = require('../models/product')

class ProductController {

    static fetchProduct(req, res, next) {
        Product
            .findAll({ order: [['id', 'ASC']]})
            .then(products => {
                res.status(200).json(products)
            })
            .catch(err => {
                next({status : 500, 
                  message : 'Internal server error'    
                })
            })
    }
    
    static addProduct(req, res, next) {
        let {name, image_url, price, stock, category} =  req.body
        let addProduct = {name, image_url, price, stock, category}

        Product
            .create(addProduct)
            .then(product =>{
                res.status(201).json(product)
            })
            .catch(err =>{
                if (Array.isArray(err.errors)) {
                    console.log(res.errors);
                    next({
                        status : 400,
                        errors : err.errors 
                    })
                } else {
                    next({status : 500, 
                        message : 'Internal server error'    
                    })
                }
            })
    }

    static changeProduct(req, res, next) {
        let {id} = req.params
        let { name, image_url, price, stock, category } =  req.body
        let changeProduct = {name, image_url, price, stock, category}
  
        Product
            .update(changeProduct, {where : {id} })
            .then(product =>{
                res.status(200).json(product)
            })
            .catch(err =>{
                if (Array.isArray(err.errors)) {
                    next({
                        status : 400,
                        errors : err.errors 
                    })
                } else {
                    console.log(err);
                    next({status : 500,
                        message : 'Internal server error' 
                    })
                }
            })
    }

    static patchProduct(req, res, next) {
    }

    static deleteProduct(req, res, next) {
        let { id } = req.params

        console.log(id);
        
        Product
            .destroy({where : { id }, returning : true })
            .then(product =>{
                res.status(200).json('Success deleted product')
            })
            .catch(err =>{
                console.log(err);
                next({status : 500,
                    message : 'Internal server error'
                })
            })
    }
}

module.exports = ProductController