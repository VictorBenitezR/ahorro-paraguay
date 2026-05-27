'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PaymentMethod extends Model {
    static associate(models) {
      this.hasMany(models.Promotion, {
        foreignKey: 'payment_method_id',
        as: 'promotions',
      });
    }
  }
  PaymentMethod.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'PaymentMethod',
      tableName: 'payment_methods',
      underscored: true,
    },
  );
  return PaymentMethod;
};
