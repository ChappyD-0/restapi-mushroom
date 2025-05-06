
const models = require("../database/models");

// Crear un nuevo hongo
const createMushroom = async (req, res) => {
  try {
    const mushroom = await models.Mushroom.create(req.body);
    return res.status(201).json({ mushroom });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los hongos
const getAllMushrooms = async (req, res) => {
  console.log('getting mushrooms');
  try {
    const mushrooms = await models.Mushroom.findAll({
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json({ mushrooms });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar un hongo existente
const updateMushroom = async (req, res) => {
  const { id } = req.params;
  try {
    // Actualizar y luego obtener el registro actualizado
    await models.Mushroom.update(req.body, {
      where: { id },
      individualHooks: true
    });

    const updatedMushroom = await models.Mushroom.findByPk(id);
    if (!updatedMushroom) {
      return res.status(404).json({ error: "Hongo no encontrado" });
    }

    return res.status(200).json({ mushroom: updatedMushroom });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar un hongo
const deleteMushroom = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await models.Mushroom.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ error: "Hongo no encontrado" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMushroom,
  getAllMushrooms,
  updateMushroom,
  deleteMushroom
};
