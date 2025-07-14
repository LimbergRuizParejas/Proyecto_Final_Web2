const { Movimiento } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const data = await Movimiento.findAll();
    res.json({
      success: true,
      msg: 'Movimientos obtenidos correctamente',
      data
    });
  } catch (error) {
    console.error('Error al obtener movimientos:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener movimientos',
      error: error.message
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const movimiento = await Movimiento.findByPk(req.params.id);
    if (!movimiento) {
      return res.status(404).json({
        success: false,
        msg: 'Movimiento no encontrado'
      });
    }
    res.json({
      success: true,
      msg: 'Movimiento obtenido correctamente',
      data: movimiento
    });
  } catch (error) {
    console.error('Error al obtener movimiento:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener el movimiento',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    // Si se subió una imagen, agregar la ruta al req.body
    if (req.file) {
      req.body.imagen = req.file.path;
    }
    const move = await Movimiento.create(req.body);
    res.status(201).json({
      success: true,
      msg: 'Movimiento creado correctamente',
      data: move
    });
  } catch (error) {
    console.error('Error al crear movimiento:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al crear el movimiento',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    // Si se subió una imagen, actualizar la ruta
    if (req.file) {
      req.body.imagen = req.file.path;
    }
    const [updated] = await Movimiento.update(req.body, {
      where: { id: req.params.id }
    });

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        msg: 'Movimiento no encontrado o sin cambios'
      });
    }

    res.json({
      success: true,
      msg: 'Movimiento actualizado correctamente'
    });
  } catch (error) {
    console.error('Error al actualizar movimiento:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al actualizar el movimiento',
      error: error.message
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Movimiento.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        msg: 'Movimiento no encontrado'
      });
    }

    res.json({
      success: true,
      msg: 'Movimiento eliminado correctamente'
    });
  } catch (error) {
    console.error('Error al eliminar movimiento:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al eliminar el movimiento',
      error: error.message
    });
  }
};
