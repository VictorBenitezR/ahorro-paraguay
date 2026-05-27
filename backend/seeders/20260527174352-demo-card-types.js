'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'card_types',
      [{ name: 'Crédito' }, { name: 'Débito' }, { name: 'Prepaga' }],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('card_types', null, {});
  },
};
