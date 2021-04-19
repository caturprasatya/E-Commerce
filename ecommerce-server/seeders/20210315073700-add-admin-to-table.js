'use strict';
const { hashPassword } = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = require('../users.json')

    data.forEach(admin =>{
        admin.password = hashPassword(admin.password)
        admin.createdAt = new Date()
        admin.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', data)
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Users', null)
  }
};
