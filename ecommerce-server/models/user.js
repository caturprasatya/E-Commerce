'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsToMany(models.Product, { through: models.Cart })
      User.belongsToMany(models.Product, { through: models.Wishlist })
      User.hasMany(models.Cart)
      User.hasMany(models.Wishlist)
    }
  };
  User.init({
    name : {
        type : DataTypes.STRING,
        validate : {
            notEmpty :{
                args : true,
                msg : 'Name cannot empty'
            }
        }
    },
    email: {
        type : DataTypes.STRING,
        validate : {
            notEmpty :{
                args : true,
                msg : 'Email cannot empty'
            }
        }
    },
    password: {
        type : DataTypes.STRING,
        validate : {
            validPassword(value){
                if(value.length < 6) throw new Error('Password Must be more 6 character')
            }
        }
    },
    role: {
        type : DataTypes.STRING,
        validate : {
            notEmpty :{
                args : true,
                msg : 'Role cannot empty'
            }
        }
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
        beforeCreate(instance, option){
            instance.password = hashPassword(instance.password)
            // instance.role = 'customer'
        }
    }
  });
  return User;
};