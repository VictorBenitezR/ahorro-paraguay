'use strict';
const rateLimit = require('express-rate-limit');

// Limitador de peticiones global para blindar la infraestructura
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Ventana de tiempo: 15 minutos
  max: 100, // Máximo de 100 peticiones por IP en esa ventana
  standardHeaders: true, // Retorna información del límite en las cabeceras RateLimit-*
  legacyHeaders: false, // Deshabilita las cabeceras X-RateLimit-* obsoletas
  message: {
    status: 'fail',
    message:
      'Demasiadas peticiones desde esta IP. Por favor intente de nuevo en 15 minutos.',
  },
});

// Podríamos añadir más adelante un limitador ultra estricto para endpoints de autenticación si hiciera falta
const strictLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minuto
  max: 5, // Solo 5 intentos de login/registro por minuto
  message: {
    status: 'fail',
    message: 'Operación bloqueada temporalmente por exceso de intentos.',
  },
});

module.exports = {
  apiLimiter,
  strictLimiter,
};
