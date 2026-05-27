'use strict';

// Clase personalizada para errores operacionales (SOLID: Responsabilidad Única)
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true; // Identifica si el error es controlado por el negocio

    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware global de errores de Express (Debe recibir 4 parámetros)
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // En entorno de desarrollo queremos ver el stack trace para debuggear
  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // En entorno de producción (Portafolio Oficial) protegemos la información sensible
  if (err.isOperational) {
    // Error controlado (ej. 404 No encontrado, 400 Datos inválidos)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // Error desconocido o crítico del servidor (ej. caídas de base de datos o bugs de código)
  console.error('ERROR CRÍTICO NO CONTROLADO:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Algo salió terriblemente mal en el servidor de forma interna.',
  });
};

module.exports = {
  AppError,
  errorHandler,
};
