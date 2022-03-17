'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('toros', { 
      id: Sequelize.INTEGER,
      nombre: Sequelize.TEXT,
      hierro: Sequelize.TEXT,
      hierrocodigo: Sequelize.TEXT,
      sexo: Sequelize.TEXT,
      fechanac: Sequelize.TEXT,
      fechamuerte: Sequelize.TEXT,
      encaste: Sequelize.TEXT,
      madreid: Sequelize.TEXT,
      padreid: Sequelize.TEXT,
      ganaderia: Sequelize.TEXT,
      tientaDia: Sequelize.TEXT,
      tientaResultado: Sequelize.TEXT,
      tientaTentadoPor: Sequelize.TEXT,
      tientaLugar: Sequelize.TEXT,
      tientaCapa: Sequelize.TEXT,
      tientaCaballo: Sequelize.TEXT,
      tientaMuleta: Sequelize.TEXT,


      pelaje: {
        type: Sequelize.INTEGER,
        references:{
          model: {
            tableName: 'pelajes',
            schema: 'schema'
          },
          key: 'id'
        }
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
