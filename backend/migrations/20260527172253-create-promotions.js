'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bank_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'banks', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      merchant_id: {
        type: Sequelize.INTEGER,
        allowNull: true, // Opcional: Puede ser un beneficio general para todo el rubro
        references: { model: 'merchants', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      card_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'card_types', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      payment_method_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'payment_methods', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      discount_percentage: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false,
      },
      refund_limit: {
        type: Sequelize.INTEGER, // En Guaraníes (Gs.), null si no tiene tope
        allowNull: true,
      },
      limit_period: {
        type: Sequelize.ENUM(
          'WEEKLY',
          'MONTHLY',
          'PER_TRANSACTION',
          'PROMOTION_DURATION',
        ),
        allowNull: true,
      },
      pos_network: {
        type: Sequelize.ENUM('BANCARD', 'DINELCO', 'CANYON', 'ANY'),
        allowNull: false,
        defaultValue: 'ANY',
      },
      ueno_level: {
        type: Sequelize.INTEGER, // Almacena nivel 1 al 5 si aplica a Ueno Bank, null para otros
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      additional_conditions: {
        type: Sequelize.TEXT,
        allowNull: true,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('promotions');
  },
};
