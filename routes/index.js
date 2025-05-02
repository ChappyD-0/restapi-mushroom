const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('../controllers/index.js');

// ======================
// RUTAS DE USUARIOS
// ======================

// GET /api/users - Obtener todos los usuarios
router.get('/users', getAllUsers);

// POST /api/users - Crear nuevo usuario
router.post('/users', createUser);

// PUT /api/users/:id - Actualizar usuario existente
router.put('/users/:id', updateUser);

// DELETE /api/users/:id - Eliminar usuario
router.delete('/users/:id', deleteUser);

// ======================
// RUTAS ADICIONALES
// ======================

// Ruta para evitar error de favicon
router.get('/favicon.ico', (req, res) => res.status(204));

// Manejo de rutas no encontradas
router.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router; // Exportación esencial
