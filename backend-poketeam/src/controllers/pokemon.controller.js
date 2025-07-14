const { Pokemon, Movimiento } = require('../models');
const path = require('path');
const fs = require('fs');

// =============================
// Obtener todos los Pokémon
// =============================
exports.getAll = async (req, res) => {
  try {
    const data = await Pokemon.findAll();
    const transformed = data.map(poke => {
      const json = poke.toJSON();
      return {
        ...json,
        imagen: json.imagen ? json.imagen.replace(/\\/g, '/') : null,
        stats: json.statsBase || {}
      };
    });
    console.log(`✅ GET /api/pokemon - Total: ${transformed.length}`);
    return res.json({ success: true, data: transformed });
  } catch (err) {
    console.error('❌ Error en GET /api/pokemon:', err);
    return res.status(500).json({
      success: false,
      msg: 'Error al obtener la lista de Pokémon',
      error: err.message
    });
  }
};

// =============================
// Obtener un Pokémon por ID
// =============================
exports.getOne = async (req, res) => {
  try {
    const poke = await Pokemon.findByPk(req.params.id, {
      include: [{
        model: Movimiento,
        as: 'movimientos',
        through: { attributes: [] }
      }]
    });

    if (!poke) {
      console.warn(`⚠️ GET /api/pokemon/${req.params.id} - No encontrado`);
      return res.status(404).json({
        success: false,
        msg: 'Pokémon no encontrado'
      });
    }

    const json = poke.toJSON();
    console.log(`✅ GET /api/pokemon/${req.params.id} - Encontrado`);
    return res.json({
      success: true,
      data: {
        ...json,
        imagen: json.imagen ? json.imagen.replace(/\\/g, '/') : null,
        stats: json.statsBase || {}
      }
    });
  } catch (err) {
    console.error(`❌ Error en GET /api/pokemon/${req.params.id}:`, err);
    return res.status(500).json({
      success: false,
      msg: 'Error al obtener el Pokémon',
      error: err.message
    });
  }
};

// =============================
// Crear nuevo Pokémon
// =============================
exports.create = async (req, res) => {
  try {
    let { nombre, tipo1, tipo2, habilidades, descripcion, statsBase } = req.body;

    if (!nombre || !tipo1 || !habilidades || !statsBase) {
      console.warn('⚠️ POST /api/pokemon - Faltan campos obligatorios');
      return res.status(400).json({
        success: false,
        msg: 'Faltan campos obligatorios: nombre, tipo1, habilidades, statsBase'
      });
    }

    if (typeof habilidades === 'string') {
      habilidades = habilidades.split(',').map(h => h.trim());
    }

    if (typeof statsBase === 'string') {
      try {
        statsBase = JSON.parse(statsBase);
      } catch (e) {
        console.error('❌ Error al parsear statsBase:', e);
        return res.status(400).json({
          success: false,
          msg: 'Formato inválido para statsBase. Debe ser un JSON válido.'
        });
      }
    }

    let imagen = null;
    if (req.file) {
      const fileName = path.basename(req.file.path);
      imagen = `uploads/pokemons/${fileName}`;
    }

    const nuevoPokemon = await Pokemon.create({
      nombre,
      tipo1,
      tipo2,
      habilidades,
      descripcion,
      imagen,
      statsBase
    });

    console.log(`✅ POST /api/pokemon - Creado: ${nuevoPokemon.nombre}`);
    return res.status(201).json({
      success: true,
      msg: 'Pokémon creado correctamente',
      data: {
        ...nuevoPokemon.toJSON(),
        imagen: imagen ? imagen.replace(/\\/g, '/') : null,
        stats: nuevoPokemon.statsBase || {}
      }
    });
  } catch (err) {
    console.error('❌ Error en POST /api/pokemon:', err);
    return res.status(400).json({
      success: false,
      msg: 'Error al crear el Pokémon',
      error: err.message
    });
  }
};

// =============================
// Actualizar Pokémon existente
// =============================
exports.update = async (req, res) => {
  try {
    let { nombre, tipo1, tipo2, habilidades, descripcion, statsBase } = req.body;

    if (typeof habilidades === 'string') {
      habilidades = habilidades.split(',').map(h => h.trim());
    }

    if (typeof statsBase === 'string') {
      try {
        statsBase = JSON.parse(statsBase);
      } catch (e) {
        console.error('❌ Error al parsear statsBase en update:', e);
        return res.status(400).json({
          success: false,
          msg: 'Formato inválido para statsBase. Debe ser un JSON válido.'
        });
      }
    }

    const updateData = {
      nombre,
      tipo1,
      tipo2,
      habilidades,
      descripcion,
      statsBase
    };

    const poke = await Pokemon.findByPk(req.params.id);
    if (!poke) {
      console.warn(`⚠️ PUT /api/pokemon/${req.params.id} - No encontrado para actualizar`);
      return res.status(404).json({
        success: false,
        msg: 'Pokémon no encontrado para actualizar'
      });
    }

    if (req.file) {
      const fileName = path.basename(req.file.path);
      updateData.imagen = `uploads/pokemons/${fileName}`;

      if (poke.imagen) {
        const oldPath = path.join(process.cwd(), poke.imagen);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    await poke.update(updateData);

    console.log(`✅ PUT /api/pokemon/${req.params.id} - Actualizado`);
    return res.json({
      success: true,
      msg: 'Pokémon actualizado correctamente'
    });
  } catch (err) {
    console.error(`❌ Error en PUT /api/pokemon/${req.params.id}:`, err);
    return res.status(400).json({
      success: false,
      msg: 'Error al actualizar el Pokémon',
      error: err.message
    });
  }
};

// =============================
// Eliminar Pokémon
// =============================
exports.remove = async (req, res) => {
  try {
    const poke = await Pokemon.findByPk(req.params.id);

    if (!poke) {
      console.warn(`⚠️ DELETE /api/pokemon/${req.params.id} - No encontrado para eliminar`);
      return res.status(404).json({
        success: false,
        msg: 'Pokémon no encontrado para eliminar'
      });
    }

    if (poke.imagen) {
      const imgPath = path.join(process.cwd(), poke.imagen);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await poke.destroy();
    console.log(`✅ DELETE /api/pokemon/${req.params.id} - Eliminado`);
    return res.json({
      success: true,
      msg: 'Pokémon eliminado correctamente'
    });
  } catch (err) {
    console.error(`❌ Error en DELETE /api/pokemon/${req.params.id}:`, err);
    return res.status(400).json({
      success: false,
      msg: 'Error al eliminar el Pokémon',
      error: err.message
    });
  }
};
