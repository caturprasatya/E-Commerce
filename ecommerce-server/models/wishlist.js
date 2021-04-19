'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {   
      Wishlist.belongsTo(models.User)
      Wishlist.belongsTo(models.Product)
    }
  };
  Wishlist.init({
    UserId: {
      type : DataTypes.INTEGER,
      validate : {
          notEmpty :{
              args : true,
              msg : ' UserId cannot empty'
          },
          min : {
              args : 1,
              msg : ' UserId must be more than 0'
          }
      }
  },
  ProductId: {
      type : DataTypes.INTEGER,
      validate : {
          notEmpty :{
              args : true,
              msg : 'ProductId cannot empty'
          },
          min : {
              args : 1,
              msg : 'ProductId must be more than 0'
          }
      }
  }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};