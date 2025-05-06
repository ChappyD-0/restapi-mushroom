
const express = require('express');
const router = express.Router();
const {
  createMushroom,
  getAllMushrooms,
  updateMushroom,
  deleteMushroom
} = require('../controllers/index.js');

// ======================
// RUTAS DE HONGOS
// ======================

// GET  /api/mushrooms        - Obtener todos los hongos
router.get('/mushrooms', getAllMushrooms);

// POST /api/mushrooms        - Crear un nuevo hongo
router.post('/mushrooms', createMushroom);

// PUT  /api/mushrooms/:id    - Actualizar un hongo existente
router.put('/mushrooms/:id', updateMushroom);

// DELETE /api/mushrooms/:id  - Eliminar un hongo
router.delete('/mushrooms/:id', deleteMushroom);

// ======================
// RUTAS ADICIONALES
// ======================

// Para evitar error de favicon
router.get('/favicon.ico', (req, res) => res.status(204));

// Manejo de rutas no encontradas
router.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

module.exports = router;
