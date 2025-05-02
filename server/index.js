// index.js
const path = require('path');
const cors = require('cors');
const express = require('express');
const routes = require('../routes');

const server = express();

// ======================
// CONFIGURACIÓN BÁSICA
// ======================

// Configuración CORS para desarrollo
server.use(cors({
  origin: '*', // Permite cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middlewares esenciales
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
server.use(express.static(path.join(__dirname, '../public')));

// ======================
// RUTAS PRINCIPALES
// ======================
server.use('/api', routes); // Todas las rutas API

// ======================
// MANEJO DE ERRORES
// ======================

// Ruta no encontrada (404)
server.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  });
});

// Manejador global de errores
server.use((err, req, res, next) => {
  console.error('Error global:', err);
  res.status(500).json({
    status: 'error',
    message: 'Fallo interno del servidor'
  });
});

// ======================
// INICIO DEL SERVIDOR
// ======================
const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';


module.exports = server;
