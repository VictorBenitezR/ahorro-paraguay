'use strict';
const express = require('express');
const promotionController = require('../controllers/promotionController');
const { validateCreatePromotion } = require('../validators/promotionValidator');

const router = express.Router();

// Definición de Endpoints profesionales con Clean Code
router
  .route('/')
  .get(promotionController.getAll)
  .post(validateCreatePromotion, promotionController.create);

module.exports = router;
