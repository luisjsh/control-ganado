'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('toros', { 
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
      nombre: Sequelize.TEXT,
      hierro: Sequelize.TEXT,
      hierrocodigo: Sequelize.TEXT,
      sexo: Sequelize.TEXT,
      fechanac: Sequelize.TEXT,
      fechamuerte: Sequelize.TEXT,
      encaste: Sequelize.TEXT,
      madreid: Sequelize.INTEGER,
      padreid: Sequelize.INTEGER,
      ganaderia: Sequelize.TEXT,
      tientadia: Sequelize.TEXT,
      tientaresultado: Sequelize.TEXT,
      tientatentadopor: Sequelize.TEXT,
      tientalugar: Sequelize.TEXT,
      tientacapa: Sequelize.TEXT,
      tientacaballo: Sequelize.TEXT,
      tientamuleta: Sequelize.TEXT,


      pelaje: {
        type: Sequelize.INTEGER,
      }
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('toros');
      /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
