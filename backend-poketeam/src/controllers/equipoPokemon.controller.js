const { EquipoPokemon, Pokemon, Item } = require('../models')
const { calcularTodosLosStats } = require('../services/stat.service')

// ==============================
// Helpers
// ==============================
const validarEVsIVs = (evs, ivs) => {
  const totalEVs = Object.values(evs).reduce((a, b) => a + b, 0)
  if (totalEVs > 508) throw new Error('Los EVs no pueden superar los 508 puntos')
  for (const stat in ivs) {
    const iv = ivs[stat]
    if (iv < 0 || iv > 31) throw new Error(`El IV de ${stat} debe estar entre 0 y 31`)
  }
}

// ==============================
// Agregar Pokémon al equipo
// ==============================
exports.agregarPokemon = async (req, res) => {
  try {
    const teamId = Number(req.params.teamId)
    if (!teamId || isNaN(teamId)) {
      return res.status(400).json({ success: false, msg: 'ID del equipo inválido' })
    }

    const { pokemonId, itemId, apodo, habilidad, naturaleza, evs, ivs, movimientos } = req.body
    validarEVsIVs(evs, ivs)

    const pokemon = await Pokemon.findByPk(pokemonId)
    if (!pokemon) return res.status(404).json({ success: false, msg: 'Pokémon no encontrado' })

    const finalStats = calcularTodosLosStats(pokemon.statsBase, ivs, evs, naturaleza)

    console.log('📦 Creando EquipoPokemon con:', {
      team_id: teamId, pokemon_id: pokemonId, item_id: itemId, apodo, habilidad, naturaleza, evs, ivs, movimientos, finalStats
    })

    const data = await EquipoPokemon.create({
      team_id: teamId,
      pokemon_id: pokemonId,
      item_id: itemId,
      apodo,
      habilidad,
      naturaleza,
      evs,
      ivs,
      movimientos,
      finalStats
    })

    const created = await EquipoPokemon.findByPk(data.id, {
      include: [
        { model: Pokemon, as: 'pokemon' },
        { model: Item, as: 'item' }
      ]
    })

    console.log(`✅ Pokémon agregado al equipo ID ${teamId}`)
    res.status(201).json({ success: true, msg: 'Pokémon agregado al equipo', data: created })
  } catch (error) {
    console.error('❌ Error al agregar Pokémon:', error)
    res.status(400).json({ success: false, msg: 'Error al agregar Pokémon al equipo', error: error.message })
  }
}

// ==============================
// Editar Pokémon del equipo
// ==============================
exports.editarPokemon = async (req, res) => {
  try {
    const { id } = req.params
    const { itemId, apodo, habilidad, naturaleza, evs, ivs, movimientos } = req.body

    const ep = await EquipoPokemon.findByPk(id, {
      include: [{ model: Pokemon, as: 'pokemon' }]
    })
    if (!ep) return res.status(404).json({ success: false, msg: 'No se encontró el Pokémon en el equipo' })

    validarEVsIVs(evs, ivs)
    const finalStats = calcularTodosLosStats(ep.pokemon.statsBase, ivs, evs, naturaleza)

    await ep.update({
      item_id: itemId,
      apodo,
      habilidad,
      naturaleza,
      evs,
      ivs,
      movimientos,
      finalStats
    })

    const updated = await EquipoPokemon.findByPk(id, {
      include: [
        { model: Pokemon, as: 'pokemon' },
        { model: Item, as: 'item' }
      ]
    })

    console.log(`✅ Pokémon ID ${id} actualizado`)
    res.json({ success: true, msg: 'Pokémon actualizado', data: updated })
  } catch (error) {
    console.error('❌ Error al editar Pokémon:', error)
    res.status(400).json({ success: false, msg: 'Error al editar Pokémon del equipo', error: error.message })
  }
}

// ==============================
// Eliminar Pokémon del equipo
// ==============================
exports.eliminarPokemon = async (req, res) => {
  try {
    await EquipoPokemon.destroy({ where: { id: req.params.id } })
    console.log(`🗑 Pokémon ID ${req.params.id} eliminado del equipo`)
    res.json({ success: true, msg: 'Pokémon eliminado del equipo' })
  } catch (error) {
    console.error('❌ Error al eliminar Pokémon:', error)
    res.status(500).json({ success: false, msg: 'Error al eliminar Pokémon del equipo', error: error.message })
  }
}

// ==============================
// Ver detalle de un Pokémon del equipo
// ==============================
exports.verDetalle = async (req, res) => {
  try {
    const data = await EquipoPokemon.findByPk(req.params.id, {
      include: [
        { model: Pokemon, as: 'pokemon' },
        { model: Item, as: 'item' }
      ]
    })
    if (!data) return res.status(404).json({ success: false, msg: 'No encontrado' })

    res.json({ success: true, data })
  } catch (error) {
    console.error('❌ Error al obtener detalle Pokémon:', error)
    res.status(500).json({ success: false, msg: 'Error al obtener detalle', error: error.message })
  }
}

// ==============================
// Obtener todos los Pokémon por equipo
// ==============================
exports.getPokemonesByEquipo = async (req, res) => {
  try {
    const pokemones = await EquipoPokemon.findAll({
      where: { team_id: req.params.teamId },
      include: [
        { model: Pokemon, as: 'pokemon' },
        { model: Item, as: 'item' }
      ]
    })
    console.log(`✅ GET Pokémon del equipo ID ${req.params.teamId}`)
    res.json({ success: true, data: pokemones })
  } catch (error) {
    console.error('❌ Error al listar pokémones del equipo:', error)
    res.status(500).json({ success: false, msg: 'Error al obtener Pokémon del equipo', error: error.message })
  }
}
