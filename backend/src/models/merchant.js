'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Merchant extends Model {
    static associate(models) {
      this.hasMany(models.Promotion, {
        foreignKey: 'merchant_id',
        as: 'promotions',
      });
    }
  }
  Merchant.init(
    {
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Merchant',
      tableName: 'merchants',
      underscored: true,
    },
  );
  return Merchant;
};
