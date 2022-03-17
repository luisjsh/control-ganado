'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('pelajes', [
      {
      nombre: 'liston',
      },{
        nombre: 'chorreado',
      },{
        nombre: 'jiron',
      },{
        nombre: 'salpicado',
      },{
        nombre: 'albardado',
      },{
        nombre: 'bragado',
      },{
        nombre: 'lucero',
      },{
        nombre: 'bociblanco',
      },{
        nombre: 'ojo de perdiz',
      },{
        nombre: 'entrepelao',
      },{
        nombre: 'negro',
      },{
        nombre: 'colorado',
      },{
        nombre: 'jabonero',
      },{
        nombre: 'ensabanao',
      },{
        nombre: 'albahio',
      },{
        nombre: 'burraco',
      },{
        nombre: 'cardeno',
      },{
        nombre: 'berrendo',
      },{
        nombre: 'berrendo en negro',
      },{
        nombre: 'berrendo en cardeno',
      },{
        nombre: 'sardo',
      },{
        nombre: 'salinero',
      },{
        nombre: 'melocoton',
      },{
        nombre: 'castano',
      },{
        nombre: 'bocidorado',
     }], {});
    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('pelajes', null, {});
  }
};
