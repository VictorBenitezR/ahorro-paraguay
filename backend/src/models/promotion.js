'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Promotion extends Model {
    static associate(models) {
      this.belongsTo(models.Bank, { foreignKey: 'bank_id', as: 'bank' });
      this.belongsTo(models.Category, {
        foreignKey: 'category_id',
        as: 'category',
      });
      this.belongsTo(models.Merchant, {
        foreignKey: 'merchant_id',
        as: 'merchant',
      });
      this.belongsTo(models.CardType, {
        foreignKey: 'card_type_id',
        as: 'cardType',
      });
      this.belongsTo(models.PaymentMethod, {
        foreignKey: 'payment_method_id',
        as: 'paymentMethod',
      });

      // Una Promoción se aplica en varios días individuales atómicos (1:N)
      this.hasMany(models.PromotionDay, {
        foreignKey: 'promotion_id',
        as: 'days',
      });
    }
  }
  Promotion.init(
    {
      bank_id: { type: DataTypes.INTEGER, allowNull: false },
      category_id: { type: DataTypes.INTEGER, allowNull: false },
      merchant_id: { type: DataTypes.INTEGER, allowNull: true },
      card_type_id: { type: DataTypes.INTEGER, allowNull: false },
      payment_method_id: { type: DataTypes.INTEGER, allowNull: false },
      discount_percentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
      refund_limit: { type: DataTypes.INTEGER, allowNull: true },
      limit_period: {
        type: DataTypes.ENUM(
          'WEEKLY',
          'MONTHLY',
          'PER_TRANSACTION',
          'PROMOTION_DURATION',
        ),
        allowNull: true,
      },
      pos_network: {
        type: DataTypes.ENUM('BANCARD', 'DINELCO', 'CANYON', 'ANY'),
        allowNull: false,
        defaultValue: 'ANY',
      },
      ueno_level: { type: DataTypes.INTEGER, allowNull: true },
      start_date: { type: DataTypes.DATEONLY, allowNull: true },
      end_date: { type: DataTypes.DATEONLY, allowNull: true },
      additional_conditions: { type: DataTypes.TEXT, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Promotion',
      tableName: 'promotions',
      underscored: true,
    },
  );
  return Promotion;
};
