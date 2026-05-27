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

class PromotionService {
  // Crear una promoción con sus días dentro de una transacción ACID
  async createPromotion(promotionData) {
    const t = await sequelize.transaction();

    try {
      const { days, ...mainData } = promotionData;

      // 1. Insertar la promoción principal
      const promotion = await Promotion.create(mainData, { transaction: t });

      // 2. Mapear e insertar los días de forma atómica
      const daysRecords = days.map((day) => ({
        promotion_id: promotion.id,
        day_of_week: day,
      }));
      await PromotionDay.bulkCreate(daysRecords, { transaction: t });

      // Consolidamos la transacción en la BD de forma exitosa
      await t.commit();

      // Retornamos la promoción completa con sus relaciones cargadas
      return await this.getPromotionById(promotion.id);
    } catch (error) {
      // Si algo sale mal, revertimos absolutamente todo asegurando la consistencia
      await t.rollback();
      throw error;
    }
  }

  // Obtener todas las promociones con cruce completo de catálogos (Eager Loading)
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

  // Buscar una promoción específica por ID para respuestas completas
  async getPromotionById(id) {
    return await Promotion.findByPk(id, {
      include: [
        { model: Bank, as: 'bank', attributes: ['name'] },
        { model: Category, as: 'category', attributes: ['name'] },
        { model: Merchant, as: 'merchant', attributes: ['name'] },
        { model: CardType, as: 'cardType', attributes: ['name'] },
        { model: PaymentMethod, as: 'paymentMethod', attributes: ['name'] },
        { model: PromotionDay, as: 'days', attributes: ['day_of_week'] },
      ],
    });
  }
}

module.exports = new PromotionService();
