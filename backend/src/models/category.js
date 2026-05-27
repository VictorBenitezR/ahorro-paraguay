'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Category extends Model {
    static associate(models) {
      // Una Categoría tiene muchas promociones
      this.hasMany(models.Promotion, {
        foreignKey: 'category_id',
        as: 'promotions',
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'categories',
      underscored: true,
    },
  );
  return Category;
};
