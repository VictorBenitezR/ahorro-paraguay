'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'payment_methods',
      [
        { name: 'Tarjeta Física' },
        { name: 'QR App Bancaria' },
        { name: 'Apple Pay' },
        { name: 'Google Pay' },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_methods', null, {});
  },
};
