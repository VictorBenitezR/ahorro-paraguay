'use strict';
const {
  Promotion,
  PromotionDay,
  Bank,
  Category,
  Merchant,
  CardType,
  PaymentMethod,
  sequelize,
} = require('../models');
const { AppError } = require('../middlewares/errorHandler');

class PromotionService {
  async createPromotion(promotionData) {
    const t = await sequelize.transaction();
    try {
      const { days, ...mainData } = promotionData;
      const promotion = await Promotion.create(mainData, { transaction: t });

      const daysRecords = days.map((day) => ({
        promotion_id: promotion.id,
        day_of_week: day,
      }));
      await PromotionDay.bulkCreate(daysRecords, { transaction: t });

      await t.commit();
      return await this.getPromotionById(promotion.id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async getAllPromotions() {
    return await Promotion.findAll({
      include: [
        { model: Bank, as: 'bank', attributes: ['name', 'website'] },
        { model: Category, as: 'category', attributes: ['name'] },
        { model: Merchant, as: 'merchant', attributes: ['name'] },
        { model: CardType, as: 'cardType', attributes: ['name'] },
        { model: PaymentMethod, as: 'paymentMethod', attributes: ['name'] },
        { model: PromotionDay, as: 'days', attributes: ['day_of_week'] },
      ],
      order: [['created_at', 'DESC']],
    });
  }

  async getPromotionById(id) {
    const promotion = await Promotion.findByPk(id, {
      include: [
        { model: Bank, as: 'bank', attributes: ['name'] },
        { model: Category, as: 'category', attributes: ['name'] },
        { model: Merchant, as: 'merchant', attributes: ['name'] },
        { model: CardType, as: 'cardType', attributes: ['name'] },
        { model: PaymentMethod, as: 'paymentMethod', attributes: ['name'] },
        { model: PromotionDay, as: 'days', attributes: ['day_of_week'] },
      ],
    });

    if (!promotion) {
      throw new AppError(
        `No se encontró ninguna promoción con el ID ${id}`,
        404,
      );
    }
    return promotion;
  }

  // Actualización Avanzada Completa (Sustitución atómica de días de semana aplicando ACID)
  async updatePromotion(id, updateData) {
    // Primero validamos si existe
    await this.getPromotionById(id);

    const t = await sequelize.transaction();
    try {
      const { days, ...mainData } = updateData;

      // 1. Actualizar datos principales
      await Promotion.update(mainData, {
        where: { id },
        transaction: t,
      });

      // 2. Si se envían nuevos días, limpiamos los anteriores e insertamos el nuevo set
      if (days) {
        await PromotionDay.destroy({
          where: { promotion_id: id },
          transaction: t,
        });

        const daysRecords = days.map((day) => ({
          promotion_id: id,
          day_of_week: day,
        }));
        await PromotionDay.bulkCreate(daysRecords, { transaction: t });
      }

      await t.commit();
      return await this.getPromotionById(id);
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async deletePromotion(id) {
    const promotion = await this.getPromotionById(id);
    // Debido a la configuración ON DELETE CASCADE de nuestras migraciones,
    // al borrar la promoción se limpian automáticamente sus registros hijos en PromotionDays.
    await promotion.destroy();
    return true;
  }
}

module.exports = new PromotionService();
