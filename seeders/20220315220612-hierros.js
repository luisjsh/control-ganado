'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('hierros', [
      {
        path: '',
        codigo: 'sin hierro'
      },
      {
        path: '/img/hierros/carlosNunez.svg',
        codigo:'carlos nunez'
      }
    ,
      {
        path: '/img/hierros/condeDeLaCorte.svg',
        codigo:'conde de la corte'
      }
    ,
      {
        path: '/img/hierros/domecq.svg',
        codigo:'domecq'
      }
    ,
      {
        path: '/img/hierros/garciaJimenez.svg',
        codigo:'garcia jimenez'
      }
    ,
      {
        path: '/img/hierros/hierrocruz.svg',
        codigo:'hierro cruz'
      }
    ,
      {
        path: '/img/hierros/hierro4h.svg',
        codigo:'hierro 4h'
      }
    ,
      {
        path: '/img/hierros/hierroElPrado.svg',
        codigo:'hierro el prado'
      }
    ,
      {
        path: '/img/hierros/hierrom.svg',
        codigo:'hierro m'
      }
    ,
      {
        path: '/img/hierros/hierrove.svg',
        codigo:'hierro ve'
      }
    ,
      {
        path: '/img/hierros/jandilla.svg',
        codigo:'jandilla'
      }
    ,
      {
        path: '/img/hierros/lagunaBlanca.svg',
        codigo:'laguna blanca'
      }
    ,
      {
        path: '/img/hierros/murube.svg',
        codigo:'murube'
      }
    ,
      {
        path: '/img/hierros/ranchoGrande.svg',
        codigo:'rancho grande'
      }
    ,
      {
        path: '/img/hierros/tierraBlanca.svg',
        codigo:'tierraBlanca'
      }
    ,
      {
        path: '/img/hierros/torreestrella.svg',
        codigo:'torreestrella'
      }
    ,
      {
        path: '/img/hierros/victorianoDelRio.svg',
        codigo:'victoriano del rio'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('hierros', null, {});
  }
};
