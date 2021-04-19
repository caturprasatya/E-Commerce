'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsToMany(models.User, { through: models.Cart })
      Product.belongsToMany(models.User, { through: models.Wishlist })
      Product.hasMany(models.Cart)
      Product.hasMany(models.Wishlist)
    }
  };
  Product.init({
    name: {
        type : DataTypes.STRING,
        validate : {
            notEmpty :{
                args : true,
                msg : 'Name product cannot empty'
            }
        }
    },
    image_url: {
        type : DataTypes.STRING,
        validate : {
            isUrl :{
                args : true,
                msg : 'Image product must be available'
            }
        }
    },
    price: {
        type : DataTypes.INTEGER,
        validate : {
            notEmpty :{
                args : true,
                msg : 'Price product cannot empty'
            },
            min : {
                args : 0,
                msg : 'Price product must be more than 1'
            }
        }
    },
    stock: {
        type : DataTypes.INTEGER,
        validate : {
            notEmpty :{
                args : true,
                msg : 'Stock product cannot empty'
            },
            min : {
                args : -1,
                msg : 'Stock product must be more than 0'
            }
        }
    },
    category: {
      type : DataTypes.STRING,
      validate : {
          notEmpty :{
              args : true,
              msg : 'Category product cannot empty'
          }
      }
  }
}, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};