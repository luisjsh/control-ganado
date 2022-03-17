'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('create extension if not exists "uuid-ossp"');
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('drop extension if not exists "uuid-ossp"');
  }
};
