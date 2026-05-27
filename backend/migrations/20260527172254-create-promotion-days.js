'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promotion_days', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      promotion_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'promotions', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Si la promoción se elimina, se borran sus días asociados automáticamente
      },
      day_of_week: {
        type: Sequelize.ENUM(
          'MONDAY',
          'TUESDAY',
          'WEDNESDAY',
          'THURSDAY',
          'FRIDAY',
          'SATURDAY',
          'SUNDAY',
          'EVERYDAY',
        ),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });

    // Añadimos un índice único compuesto para evitar duplicar el mismo día en la misma promoción
    await queryInterface.addIndex(
      'promotion_days',
      ['promotion_id', 'day_of_week'],
      {
        unique: true,
        name: 'unique_promotion_day',
      },
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('promotion_days');
  },
};
