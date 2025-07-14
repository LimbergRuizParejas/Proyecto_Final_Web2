const { User } = require('../models')
const bcrypt = require('bcrypt')


exports.getAllUsers = async (req, res) => {
  try {
    console.log('🔍 Iniciando consulta para obtener todos los usuarios...')
    const users = await User.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'createdAt', 'updatedAt']
    })
    console.log(`✅ GET /api/users - Total usuarios encontrados: ${users.length}`)
    res.json({
      success: true,
      data: users
    })
  } catch (err) {
    console.error('❌ Error en GET /api/users:', err)
    res.status(500).json({
      success: false,
      msg: 'Error al obtener usuarios',
      error: err.message
    })
  }
}


exports.getProfile = async (req, res) => {
  try {
    console.log(`🔍 Buscando perfil del usuario autenticado ID: ${req.usuario.id}`)
    const usuario = await User.findByPk(req.usuario.id, {
      attributes: ['id', 'nombre', 'email', 'rol', 'createdAt', 'updatedAt']
    })

    if (!usuario) {
      console.warn(`⚠️ Usuario ID ${req.usuario.id} no encontrado.`)
      return res.status(404).json({
        success: false,
        msg: 'Usuario no encontrado'
      })
    }

    console.log(`✅ GET /api/users/me - Perfil cargado para ${usuario.nombre}`)
    res.json({
      success: true,
      data: usuario
    })
  } catch (err) {
    console.error('❌ Error en GET /api/users/me:', err)
    res.status(500).json({
      success: false,
      msg: 'Error al obtener perfil',
      error: err.message
    })
  }
}


exports.updatePassword = async (req, res) => {
  try {
    const { password } = req.body
    console.log(`🔧 Iniciando cambio de contraseña para usuario ID: ${req.params.id}`)

    if (!password) {
      console.warn('⚠️ No se proporcionó nueva contraseña.')
      return res.status(400).json({
        success: false,
        msg: 'La nueva contraseña es obligatoria'
      })
    }

    const usuario = await User.findByPk(req.params.id)
    if (!usuario) {
      console.warn(`⚠️ Usuario ID ${req.params.id} no encontrado para cambio de contraseña.`)
      return res.status(404).json({
        success: false,
        msg: 'Usuario no encontrado'
      })
    }

    const hash = await bcrypt.hash(password, 10)
    usuario.password = hash
    await usuario.save()

    console.log(`✅ PATCH /api/users/${req.params.id}/password - Contraseña actualizada.`)
    res.json({
      success: true,
      msg: 'Contraseña actualizada correctamente'
    })
  } catch (err) {
    console.error(`❌ Error en PATCH /api/users/${req.params.id}/password:`, err)
    res.status(500).json({
      success: false,
      msg: 'Error al actualizar contraseña',
      error: err.message
    })
  }
}

exports.toggleAdmin = async (req, res) => {
  try {
    console.log(`🔄 Alternando rol para usuario ID: ${req.params.id}`)
    const usuario = await User.findByPk(req.params.id)
    if (!usuario) {
      console.warn(`⚠️ Usuario ID ${req.params.id} no encontrado para alternar rol.`)
      return res.status(404).json({
        success: false,
        msg: 'Usuario no encontrado'
      })
    }

    usuario.rol = usuario.rol === 'admin' ? 'user' : 'admin'
    await usuario.save()

    console.log(`✅ PATCH /api/users/${req.params.id}/rol - Rol actualizado a ${usuario.rol}`)
    res.json({
      success: true,
      msg: 'Rol del usuario actualizado correctamente',
      data: { id: usuario.id, rol: usuario.rol }
    })
  } catch (err) {
    console.error(`❌ Error en PATCH /api/users/${req.params.id}/rol:`, err)
    res.status(500).json({
      success: false,
      msg: 'Error al cambiar rol',
      error: err.message
    })
  }
}

exports.removeUser = async (req, res) => {
  try {
    console.log(`🗑 Solicitando eliminación del usuario ID: ${req.params.id}`)
    const usuario = await User.findByPk(req.params.id)
    if (!usuario) {
      console.warn(`⚠️ Usuario ID ${req.params.id} no encontrado para eliminar.`)
      return res.status(404).json({
        success: false,
        msg: 'Usuario no encontrado'
      })
    }

    await usuario.destroy()
    console.log(`✅ DELETE /api/users/${req.params.id} - Usuario eliminado.`)
    res.json({
      success: true,
      msg: 'Usuario eliminado correctamente'
    })
  } catch (err) {
    console.error(`❌ Error en DELETE /api/users/${req.params.id}:`, err)
    res.status(500).json({
      success: false,
      msg: 'Error al eliminar usuario',
      error: err.message
    })
  }
}
