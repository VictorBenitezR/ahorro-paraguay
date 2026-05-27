require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const { apiLimiter } = require('./middlewares/security');
const { errorHandler, AppError } = require('./middlewares/errorHandler');
const promotionRoutes = require('./routes/promotionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// Middlewares de Seguridad Globales
// ==========================================
app.use(cors());
app.use(apiLimiter); // Aplica el límite de peticiones a todas las rutas de la API
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==========================================
// Rutas del Servidor
// ==========================================

// Endpoint de Salud (Healthcheck)
app.get('/health', async (req, res, next) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({
      status: 'UP',
      message:
        'Ahorro Paraguay API está en línea y conectada a la Base de Datos.',
      timestamp: new Date(),
    });
  } catch (error) {
    // Usamos next(error) para que nuestro manejador global procese el fallo elegantemente
    next(
      new AppError(
        'El servidor responde, pero la conexión a la Base de Datos falló.',
        500,
      ),
    );
  }
});

// Montamos el enrutador del módulo de promociones bajo el prefijo profesional /api/promotions
app.use('/api/promotions', promotionRoutes);

// ==========================================
// Control de Rutas Inexistentes (404 - Express v5 compatible)
// ==========================================
app.all('*pathMatch', (req, res, next) => {
  // Cualquier ruta que no coincida con las anteriores genera un error controlado
  next(
    new AppError(
      `No se puede encontrar la ruta ${req.originalUrl} en este servidor.`,
      404,
    ),
  );
});

// ==========================================
// Middleware de Control de Errores Global (Debe ser el ÚLTIMO en registrarse)
// ==========================================
app.use(errorHandler);

// ==========================================
// Inicialización del Servidor
// ==========================================
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`Servidor corriendo de forma profesional en el puerto ${PORT}`);
  console.log(`Healthcheck disponible en: http://localhost:${PORT}/health`);
  console.log(
    `Módulo de Promociones activo en: http://localhost:${PORT}/api/promotions`,
  );
  console.log(`==================================================`);
});

module.exports = app;
