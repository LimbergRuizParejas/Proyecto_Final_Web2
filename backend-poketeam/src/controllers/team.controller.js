const { Team, EquipoPokemon, Pokemon, Item } = require('../models');

exports.getEquipos = async (req, res) => {
  try {
    const equipos = await Team.findAll({
      where: { userId: req.usuario.id }
    });
    console.log(`✅ GET /api/equipos - User ${req.usuario.id}, Total: ${equipos.length}`);
    res.json({ success: true, data: equipos });
  } catch (error) {
    console.error('❌ Error en GET /api/equipos:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener equipos',
      error: error.message
    });
  }
};

exports.getEquiposByUsuario = async (req, res) => {
  try {
    const equipos = await Team.findAll({
      where: { userId: req.params.usuarioId }
    });
    console.log(`✅ GET /api/equipos/user/${req.params.usuarioId} - Total: ${equipos.length}`);
    res.json({ success: true, data: equipos });
  } catch (error) {
    console.error(`❌ Error en GET /api/equipos/user/${req.params.usuarioId}:`, error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener equipos por usuario',
      error: error.message
    });
  }
};

exports.createEquipo = async (req, res) => {
  try {
    const name = req.body.name || req.body.nombre;
    if (!name) {
      return res.status(400).json({
        success: false,
        msg: 'El campo "name" es requerido'
      });
    }

    const equipo = await Team.create({
      name,
      userId: req.usuario.id
    });

    console.log(`✅ POST /api/equipos - Creado equipo ID: ${equipo.id}`);
    res.status(201).json({
      success: true,
      msg: 'Equipo creado correctamente',
      data: equipo
    });
  } catch (error) {
    console.error('❌ Error en POST /api/equipos:', error);
    res.status(500).json({
      success: false,
      msg: 'Error al crear equipo',
      error: error.message
    });
  }
};

exports.getEquipoDetalle = async (req, res) => {
  try {
    const equipo = await Team.findByPk(req.params.id, {
      include: [
        {
          model: EquipoPokemon,
          as: 'pokemones',
          include: [
            { model: Pokemon, as: 'pokemon' },
            { model: Item, as: 'item' }
          ]
        }
      ]
    });

    if (!equipo) {
      return res.status(404).json({
        success: false,
        msg: 'Equipo no encontrado'
      });
    }

    console.log(`✅ GET /api/equipos/${req.params.id} - Detalle cargado`);
    res.json({ success: true, data: equipo });
  } catch (error) {
    console.error(`❌ Error en GET /api/equipos/${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      msg: 'Error al obtener detalle del equipo',
      error: error.message
    });
  }
};

exports.updateEquipo = async (req, res) => {
  try {
    const name = req.body.name || req.body.nombre;
    if (!name) {
      return res.status(400).json({
        success: false,
        msg: 'El campo "name" es requerido'
      });
    }

    const equipo = await Team.findByPk(req.params.id);
    if (!equipo) {
      return res.status(404).json({
        success: false,
        msg: 'Equipo no encontrado'
      });
    }

    await equipo.update({ name });

    console.log(`✅ PATCH /api/equipos/${req.params.id} - Actualizado`);
    res.json({
      success: true,
      msg: 'Equipo actualizado correctamente',
      data: equipo
    });
  } catch (error) {
    console.error(`❌ Error en PATCH /api/equipos/${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      msg: 'Error al actualizar equipo',
      error: error.message
    });
  }
};

exports.deleteEquipo = async (req, res) => {
  try {
    const equipo = await Team.findByPk(req.params.id);
    if (!equipo) {
      return res.status(404).json({
        success: false,
        msg: 'Equipo no encontrado'
      });
    }

    await equipo.destroy();

    console.log(`✅ DELETE /api/equipos/${req.params.id} - Eliminado`);
    res.json({
      success: true,
      msg: 'Equipo eliminado correctamente'
    });
  } catch (error) {
    console.error(`❌ Error en DELETE /api/equipos/${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      msg: 'Error al eliminar equipo',
      error: error.message
    });
  }
};
