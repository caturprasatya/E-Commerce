'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn('Products', 'category', {  
      type: Sequelize.STRING})
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Products', 'category')
  }
};
