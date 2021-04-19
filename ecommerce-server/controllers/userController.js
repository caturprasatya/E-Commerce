const { User } = require('../models')
const{comparePassword} = require('../helpers/bcrypt')
const generateToken = require('../helpers/generateToken')

class UserController{
    
    static register (req, res ,next) {
        let {name ,email, password} = req.body
        let newUser = {name ,email, password}
        
        User
            .create(newUser, {attributes: { exclude: password }})
            .then(user =>{
                res.status(201).json(user)
            })
            .catch(err =>{
                console.log(err)
                next({
                    code : 500,
                    message : err
                })
            })
    }


    static login(req, res, next){
        let { email, password } = req.body

        User
            .findOne({ where : { email }})
            .then(user => {
              
              if (user) {
                  let userPassword = comparePassword(password, user.password)
                  
                  if (userPassword) {
                    let access_token = generateToken({id: user.id, email: user.email})
                    
                    res.status(200).json(access_token)
                  } else {
                    next({ status : 401,
                      message : 'Invalid email / password'})
                  }
                } else {
                    next({ status : 401,
                    message : 'Invalid email / password'})
                }
            })
            .catch(err =>{
                next({ status : 500,
                    message : 'Internal server error'
                })
            })
    }
}

module.exports = UserController 