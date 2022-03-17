'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
      email: 'admin@admin.com',
      nombre: 'admin',
      primerapregunta: 'admin',
      primerapreguntarespuesta: 'admin',
      segundapregunta: 'admin',
      segundapreguntarespuesta: 'admin',
      admin: 't',
      clave: '$2a$10$dhSZ0g8zWahcyzB3a9A34OZ69FQkQQc5P.Xlj.5GKuFTTPvWnDFdi$2a$10$dhSZ0g8zWahcyzB3a9A34OZ69FQkQQc5P.Xlj.5GKuFTTPvWnDFdi'
     }], {});
  },


  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('usuarios', null, {});
    }
};
