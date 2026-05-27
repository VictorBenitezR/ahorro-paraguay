'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class CardType extends Model {
    static associate(models) {
      this.hasMany(models.Promotion, {
        foreignKey: 'card_type_id',
        as: 'promotions',
      });
    }
  }
  CardType.init(
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'CardType',
      tableName: 'card_types',
      underscored: true,
    },
  );
  return CardType;
};
