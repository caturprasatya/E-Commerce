const verifyToken = require('../helpers/verifyToken')
const { User, Product } = require('../models')

const authenticate = (req, res, next) =>{
    try {
        let { access_token } = req.headers
        let decoded = verifyToken(access_token)


        console.log(decoded);
        
        if (decoded) {
            User
                .findOne({where: { email: decoded.email} })
                .then(user => {
                  if (user) {
                      req.currentUser = { id : user.id, email: user.mail, role: user.role }
                      next()
                  } else {
                    next({ status : 401,
                      message : 'Unauthoraized'
                 })
                  }
                })
                .catch(err =>{
                  if (Array.isArray(err.errors)) {
                      next({ code : 400, message : err.errors})
                  } else {
                      next({code : 500, message: "Internal Server Error"})
                  }
                })          
        }
    } catch (error) {
        next({ status : 401,
            message : 'Invalid Token'
       })
    }
}

const authorize = (req, res, next) =>{
    let { id } = req.currentUser

    User
        .findByPk(id)
        .then(user =>{
            if (user.role === 'admin') {
                next()
            } else {
              next({ status : 401,
                message : 'Unauthorized'
           })
            }
        })
        .catch(err => {
            next({status : 500,
                message : 'Internal Server Error'
            })
        })
}

module.exports = {authenticate, authorize}