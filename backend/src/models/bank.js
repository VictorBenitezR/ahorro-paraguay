'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Bank extends Model {
    static associate(models) {
      // Un Banco tiene muchas promociones
      this.hasMany(models.Promotion, {
        foreignKey: 'bank_id',
        as: 'promotions',
      });
    }
  }
  Bank.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      website: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Bank',
      tableName: 'banks',
      underscored: true, // Esto asegura que mapee automáticamente created_at y updated_at
    },
  );
  return Bank;
};
