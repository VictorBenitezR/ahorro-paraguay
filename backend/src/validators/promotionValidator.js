'use strict';
const Joi = require('joi');
const { AppError } = require('../middlewares/errorHandler');

// Esquema de validación estricto con Joi
const createPromotionSchema = Joi.object({
  bank_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(),
  merchant_id: Joi.number().integer().allow(null),
  card_type_id: Joi.number().integer().required(),
  payment_method_id: Joi.number().integer().required(),
  discount_percentage: Joi.number().min(0.01).max(100.0).required(),
  refund_limit: Joi.number().integer().min(0).allow(null),
  limit_period: Joi.string()
    .valid('WEEKLY', 'MONTHLY', 'PER_TRANSACTION', 'PROMOTION_DURATION')
    .allow(null),
  pos_network: Joi.string()
    .valid('BANCARD', 'DINELCO', 'CANYON', 'ANY')
    .default('ANY'),
  ueno_level: Joi.number().integer().min(1).max(5).allow(null),
  start_date: Joi.date().iso().allow(null),
  end_date: Joi.date().iso().allow(null),
  additional_conditions: Joi.string().max(1000).allow(null, ''),

  // Arreglo de días en los que aplica (Requisito de nuestra 3FN)
  days: Joi.array()
    .items(
      Joi.string().valid(
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY',
        'SUNDAY',
        'EVERYDAY',
      ),
    )
    .min(1)
    .required(),
});

// Middleware que intercepta y valida la petición (SOLID: Responsabilidad Única)
const validateCreatePromotion = (req, res, next) => {
  const { error, value } = createPromotionSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errorMessages = error.details
      .map((detail) => detail.message)
      .join(', ');
    return next(new AppError(`Errores de validación: [${errorMessages}]`, 400));
  }

  // Reemplazamos el body con los valores saneados (remueve campos basura no declarados en el Joi)
  req.body = value;
  next();
};

module.exports = {
  validateCreatePromotion,
};
