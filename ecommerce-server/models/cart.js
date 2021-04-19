'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
  
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};