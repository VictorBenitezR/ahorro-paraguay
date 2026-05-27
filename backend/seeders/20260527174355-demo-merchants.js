'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'merchants',
      [
        { name: 'Biggie' },
        { name: 'Superseis' },
        { name: 'Petrobras' },
        { name: 'Punto Farma' },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('merchants', null, {});
  },
};
