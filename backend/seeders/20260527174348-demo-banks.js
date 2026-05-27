'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'banks',
      [
        { name: 'Ueno Bank', website: 'https://www.ueno.com.py' },
        {
          name: 'Banco Continental',
          website: 'https://www.bancontinental.com.py',
        },
        { name: 'Banco Itaú', website: 'https://www.itau.com.py' },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('banks', null, {});
  },
};
