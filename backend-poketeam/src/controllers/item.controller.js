const { Item } = require('../models')
const fs = require('fs')
const path = require('path')

// ==========================
// Obtener todos los ítems
// ==========================
exports.getAll = async (req, res) => {
  try {
    const items = await Item.findAll()

    // Normaliza rutas para que usen siempre '/'
    const transformed = items.map(item => {
      const json = item.toJSON()
      return {
        ...json,
        imagen: json.imagen ? json.imagen.replace(/\\/g, '/') : null
      }
    })

    console.log(`✅ GET /api/items - Total: ${transformed.length}`)
    res.json({ success: true, data: transformed })
  } catch (err) {
    console.error('❌ Error en getAll items:', err)
    res.status(500).json({ success: false, msg: 'Error al obtener los ítems', error: err.message })
  }
}

// ==========================
// Crear un nuevo ítem
// ==========================
exports.create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body

    if (!nombre || !descripcion) {
      console.warn('⚠️ POST /api/items - Faltan campos obligatorios')
      return res.status(400).json({ success: false, msg: 'Nombre y descripción son obligatorios.' })
    }

    let imagen = null
    if (req.file) {
      const fileName = path.basename(req.file.path)
      imagen = `uploads/items/${fileName}` // ruta siempre relativa
    }

    const newItem = await Item.create({
      nombre,
      descripcion,
      imagen
    })

    console.log(`✅ Ítem creado: ${newItem.nombre}`)
    res.status(201).json({ success: true, msg: 'Ítem creado correctamente.', data: newItem })
  } catch (err) {
    console.error('❌ Error en create item:', err)
    res.status(500).json({ success: false, msg: 'Error al crear ítem', error: err.message })
  }
}

// ==========================
// Actualizar un ítem
// ==========================
exports.update = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body

    if (!nombre || !descripcion) {
      console.warn('⚠️ PUT /api/items - Faltan campos obligatorios')
      return res.status(400).json({ success: false, msg: 'Nombre y descripción son obligatorios.' })
    }

    const item = await Item.findByPk(req.params.id)
    if (!item) {
      console.warn(`⚠️ PUT /api/items/${req.params.id} - Ítem no encontrado`)
      return res.status(404).json({ success: false, msg: 'Ítem no encontrado.' })
    }

    const updateData = { nombre, descripcion }

    if (req.file) {
      const fileName = path.basename(req.file.path)
      updateData.imagen = `uploads/items/${fileName}`

      if (item.imagen) {
        const oldPath = path.join(process.cwd(), item.imagen)
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath)
          console.log(`🧹 Imagen anterior eliminada: ${oldPath}`)
        }
      }
    }

    await item.update(updateData)

    console.log(`✅ Ítem actualizado ID: ${req.params.id}`)
    res.json({ success: true, msg: 'Ítem actualizado correctamente.', data: item })
  } catch (err) {
    console.error('❌ Error en update item:', err)
    res.status(500).json({ success: false, msg: 'Error al actualizar ítem', error: err.message })
  }
}

// ==========================
// Eliminar un ítem
// ==========================
exports.remove = async (req, res) => {
  try {
    const item = await Item.findByPk(req.params.id)
    if (!item) {
      console.warn(`⚠️ DELETE /api/items/${req.params.id} - Ítem no encontrado`)
      return res.status(404).json({ success: false, msg: 'Ítem no encontrado.' })
    }

    if (item.imagen) {
      const imgPath = path.join(process.cwd(), item.imagen)
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
        console.log(`🧹 Imagen eliminada: ${imgPath}`)
      }
    }

    await item.destroy()
    console.log(`🗑 Ítem eliminado ID: ${req.params.id}`)
    res.json({ success: true, msg: 'Ítem eliminado correctamente.' })
  } catch (err) {
    console.error('❌ Error en remove item:', err)
    res.status(500).json({ success: false, msg: 'Error al eliminar ítem', error: err.message })
  }
}
