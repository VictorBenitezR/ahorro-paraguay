'use strict';
const express = require('express');
const promotionController = require('../controllers/promotionController');
const { validateCreatePromotion } = require('../validators/promotionValidator');

const router = express.Router();

// Rutas Raíz
router
  .route('/')
  .get(promotionController.getAll)
  .post(validateCreatePromotion, promotionController.create);

// Rutas específicas por ID paramétrico
router
  .route('/:id')
  .get(promotionController.getOne)
  .put(promotionController.update)
  .delete(promotionController.delete);

module.exports = router;
