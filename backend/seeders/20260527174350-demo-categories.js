'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'categories',
      [
        { name: 'Supermercados' },
        { name: 'Combustibles' },
        { name: 'Farmacias' },
        { name: 'Gastronomía' },
        { name: 'Tiendas / Ropas' },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  },
};
