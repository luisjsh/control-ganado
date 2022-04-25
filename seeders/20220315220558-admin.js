'use strict';

const passwordFunctions = require('../functions/password-functions');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
      email: 'admin@admin.com',
      nombre: 'admin',
      primerapregunta: 'admin',
      primerapreguntarespuesta: await passwordFunctions.encrypt('admin'),
      segundapregunta: 'admin',
      segundapreguntarespuesta: await passwordFunctions.encrypt('admin'),
      admin: 't',
      status: 'activo',
      clave: await passwordFunctions.encrypt('password1')
     }], {});
  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('usuarios', null, {});
    }
};
