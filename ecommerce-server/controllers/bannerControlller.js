const { Banner, Admin } = require('../models')

class BannerController {

    static fetchBanner(req, res, next) {
        Banner
            .findAll({order: [['id', 'ASC']]})
            .then(banners => {
                res.status(200).json(banners)
            })
            .catch(err => {
                next({status : 500, 
                  message : 'Internal server error'    
                })
            })
    }
    
    static addBanner(req, res, next) {
        let {banner_url, title, status} =  req.body
        let userId = req.currentUser.id
        let addBanner = {banner_url, title, status, userId}

        Banner
            .create(addBanner)
            .then(banner =>{
                res.status(201).json(banner)
            })
            .catch(err =>{
                if (Array.isArray(err.errors)) {
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

    static changeBanner(req, res, next) {
        let {id} = req.params 
        let {banner_url, title, status} =  req.body
        let userId = req.currentUser.id
        let changeBanner = {banner_url, title, status, userId}

        Banner
            .update(changeBanner, {where : {id} })
            .then(banner =>{
                res.status(200).json(banner)
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

    static patchBanner(req, res, next) {

    }

    static deleteBanner(req, res, next) {
        let { id } = req.params

        Banner
            .destroy({where : { id }, returning : true})
            .then(banner =>{
                res.status(200).json('Success deleted banner')
            })
            .catch(err =>{
                next({status : 500,
                    message : 'Internal server error'
                })
            })
    }


}

module.exports = BannerController