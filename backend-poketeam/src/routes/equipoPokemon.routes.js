const express = require('express');
const router = express.Router();
const EquipoPokemonController = require('../controllers/equipoPokemon.controller');
const { verificarToken } = require('../middlewares/auth.middleware');

// ==============================
// Rutas EquipoPokemon
// ==============================

// 1. Crear un nuevo Pokémon en el equipo
router.post('/equipo/:teamId', verificarToken, async (req, res) => {
  try {
    const nuevoPokemon = await EquipoPokemonController.agregarPokemon(req, res);
    if (!nuevoPokemon) {
      return res.status(400).json({ success: false, msg: 'No se pudo agregar el Pokémon al equipo.' });
    }
    return res.status(201).json({ success: true, data: nuevoPokemon });
  } catch (error) {
    console.error('❌ Error al agregar Pokémon al equipo:', error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, msg: 'Error interno al agregar Pokémon al equipo.' });
    }
  }
});

// 2. Obtener todos los Pokémon de un equipo
router.get('/equipo/:teamId', verificarToken, async (req, res) => {
  try {
    const pokemones = await EquipoPokemonController.getPokemonesByEquipo(req, res);
    if (!pokemones || pokemones.length === 0) {
      return res.status(404).json({ success: false, msg: 'No hay Pokémon en este equipo.' });
    }
    return res.status(200).json({ success: true, data: pokemones });
  } catch (error) {
    console.error('❌ Error al obtener los Pokémon del equipo:', error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, msg: 'Error interno al obtener los Pokémon del equipo.' });
    }
  }
});

// 3. Obtener el detalle de un Pokémon del equipo
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const pokemon = await EquipoPokemonController.verDetalle(req, res);
    if (!pokemon) {
      return res.status(404).json({ success: false, msg: 'Pokémon no encontrado.' });
    }
    return res.status(200).json({ success: true, data: pokemon });
  } catch (error) {
    console.error('❌ Error al obtener el detalle del Pokémon:', error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, msg: 'Error interno al obtener el detalle del Pokémon.' });
    }
  }
});

// 4. Actualizar un Pokémon del equipo
router.put('/:id', verificarToken, async (req, res) => {
  try {
    const pokemonActualizado = await EquipoPokemonController.editarPokemon(req, res);
    if (!pokemonActualizado) {
      return res.status(400).json({ success: false, msg: 'No se pudo actualizar el Pokémon.' });
    }
    return res.status(200).json({ success: true, data: pokemonActualizado });
  } catch (error) {
    console.error('❌ Error al actualizar el Pokémon del equipo:', error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, msg: 'Error interno al actualizar el Pokémon.' });
    }
  }
});

// 5. Eliminar un Pokémon del equipo
router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const pokemonEliminado = await EquipoPokemonController.eliminarPokemon(req, res);
    if (!pokemonEliminado) {
      return res.status(400).json({ success: false, msg: 'No se pudo eliminar el Pokémon.' });
    }
    return res.status(200).json({ success: true, msg: 'Pokémon eliminado correctamente', data: pokemonEliminado });
  } catch (error) {
    console.error('❌ Error al eliminar el Pokémon del equipo:', error);
    if (!res.headersSent) {
      return res.status(500).json({ success: false, msg: 'Error interno al eliminar el Pokémon.' });
    }
  }
});

module.exports = router;
