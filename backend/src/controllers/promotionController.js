'use strict';
const promotionService = require('../services/promotionService');

class PromotionController {
  // Usamos funciones de flecha para preservar el contexto de 'this' nativamente.
  // Express v5 gestiona las promesas de forma nativa, eliminando try-catch innecesarios aquí.
  create = async (req, res, next) => {
    const newPromotion = await promotionService.createPromotion(req.body);
    return res.status(201).json({
      status: 'success',
      data: { promotion: newPromotion },
    });
  };

  getAll = async (req, res, next) => {
    const promotions = await promotionService.getAllPromotions();
    return res.status(200).json({
      status: 'success',
      results: promotions.length,
      data: { promotions },
    });
  };
}

// Exportamos una única instancia (Patrón Singleton)
module.exports = new PromotionController();
