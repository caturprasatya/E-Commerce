'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
  
    static associate(models) {
    }
  };
  Banner.init({
    banner_url: {
      type : DataTypes.STRING,
      validate : {
          isUrl :{
              args : true,
              msg : 'This type must be url'
          },
          notEmpty :{
            args : true,
            msg : 'Banner cannot empty'
        }
      }
  },
    title: {
      type : DataTypes.STRING,
      validate : {
          notEmpty :{
              args : true,
              msg : 'Title cannot empty'
          }
      }
  },
    status: {
      type : DataTypes.BOOLEAN,
      validate : {
          notEmpty :{
              args : true,
              msg : 'Status cannot empty'
          }
      }
  }
  }, {
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};