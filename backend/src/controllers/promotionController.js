'use strict';
const promotionService = require('../services/promotionService');

class PromotionController {
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

  getOne = async (req, res, next) => {
    const promotion = await promotionService.getPromotionById(req.params.id);
    return res.status(200).json({
      status: 'success',
      data: { promotion },
    });
  };

  update = async (req, res, next) => {
    // Nota: Aquí se podría reusar el validador Joi o crear uno parcial (Joi.patch)
    // Por simplicidad del módulo, pasamos req.body saneado
    const updatedPromotion = await promotionService.updatePromotion(
      req.params.id,
      req.body,
    );
    return res.status(200).json({
      status: 'success',
      data: { promotion: updatedPromotion },
    });
  };

  delete = async (req, res, next) => {
    await promotionService.deletePromotion(req.params.id);
    return res.status(204).json({
      status: 'success',
      data: null, // Convención HTTP 204 No Content
    });
  };
}

module.exports = new PromotionController();
