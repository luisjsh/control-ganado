'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios', 
    'login_attempt',
    { 
      type: Sequelize.INTEGER
    });
    await queryInterface.addColumn('usuarios', 
    'last_login_attempt',
    { 
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
