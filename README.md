# Ahorro Paraguay 🇵🇾 - Plataforma Consolidadora de Beneficios Financieros

Plataforma web full-stack, _mobile-first_ y automatizada que centraliza, procesa y expone los beneficios, descuentos y esquemas de reintegro de las principales entidades financieras de Paraguay (**Ueno Bank**, **Banco Continental** y **Banco Itaú**).

Este proyecto resuelve la fragmentación de información unificando las promociones vigentes según el día actual, categoría comercial y modalidad de pago, actuando como un demostrador de competencias avanzadas en ingeniería de datos y arquitectura de software.

## 🚀 Arquitectura del Sistema

El sistema adopta un enfoque monorepo modularizado, dividiéndose en tres componentes autónomos:

- **`data-pipeline/`**: Capa de ingesta desarrollada en **Python (Pandas, BeautifulSoup4)** orientada a la extracción, limpieza estructural y normalización de las bases de condiciones en formatos HTML dinámicos y PDFs masivos.
- **`backend/`**: API REST robusta construida sobre **Node.js, Express y Sequelize ORM**, encargada de servir los datos relacionales mediante consultas optimizadas a una base de datos **MySQL**.
- **`frontend/`**: Interfaz de usuario interactiva y de alta velocidad desarrollada en **React + Vite**, diseñada bajo un enfoque _mobile-first_ para permitir búsquedas y filtrados instantáneos en caja.

## 🛠️ Stack Tecnológico & Herramientas

- **Gestión de Monorepo:** `pnpm Workspaces` (Optimización de caché, enlaces simbióticos eficientes y control estricto de dependencias).
- **Capa de Datos:** Python 3.11+, Pandas, BeautifulSoup4, Requests.
- **Capa de Servicios:** Node.js, Express, Sequelize ORM, MySQL.
- **Capa Cliente:** React, Vite, CSS moderno.

## 📋 Requerimientos del MVP (Mínimo Viable)

Las especificaciones iniciales del sistema cubren los siguientes flujos funcionales:

1. **US-01 [Prioridad Alta]:** Vista consolidada del día actual ordenada de manera descendente por porcentaje de ahorro.
2. **US-02 [Prioridad Alta]:** Segmentación y filtrado dinámico por rubros (Supermercados, Combustibles, Farmacias, Gastronomía) e instituciones emisoras.
3. **US-03 [Prioridad Media]:** Transparencia en topes de reintegro, métodos de pago requeridos (QR, Tarjeta Física, Apple Pay) y restricciones de procesadoras de POS (Bancard / Dinelco).

## 🔧 Configuración del Entorno Local

### Requisitos Previos

- Node.js (v18 o superior)
- pnpm (v8 o superior)
- Python (v3.10 o superior)
- MySQL Server

### Inicialización

1. Clonar el repositorio y acceder a la raíz:
   ```bash
   git clone [https://github.com/TU_USUARIO/ahorro-paraguay.git](https://github.com/VictorBenitezR/ahorro-paraguay)
   cd ahorro-paraguay
   ```
