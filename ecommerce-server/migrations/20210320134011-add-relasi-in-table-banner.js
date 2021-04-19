'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Banners', 'userId', {  
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id' 
      } 
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Banners', 'userId')
  }
};
