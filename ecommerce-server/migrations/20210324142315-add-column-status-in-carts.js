'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Carts', 'status', {  
      type: Sequelize.BOOLEAN})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Carts', 'status')
  }
};
