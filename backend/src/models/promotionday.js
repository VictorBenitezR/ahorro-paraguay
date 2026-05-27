'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class PromotionDay extends Model {
    static associate(models) {
      this.belongsTo(models.Promotion, {
        foreignKey: 'promotion_id',
        as: 'promotion',
      });
    }
  }
  PromotionDay.init(
    {
      promotion_id: { type: DataTypes.INTEGER, allowNull: false },
      day_of_week: {
        type: DataTypes.ENUM(
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
    },
    {
      sequelize,
      modelName: 'PromotionDay',
      tableName: 'promotion_days',
      underscored: true,
    },
  );
  return PromotionDay;
};
