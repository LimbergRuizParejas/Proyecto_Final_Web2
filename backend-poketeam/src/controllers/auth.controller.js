const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
require('dotenv').config()

exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body

    if (!nombre || !email || !password) {
      return res.status(400).json({
        success: false,
        msg: 'Todos los campos son obligatorios'
      })
    }

    const existe = await User.findOne({ where: { email } })
    if (existe) {
      return res.status(400).json({
        success: false,
        msg: 'El correo ya está registrado'
      })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ nombre, email, password: hash })

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    console.log(`✅ Usuario registrado: ${user.email}`)

    res.status(201).json({
      success: true,
      msg: 'Usuario registrado con éxito',
      data: {
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token
      }
    })
  } catch (err) {
    console.error('❌ Error en registro:', err)
    res.status(500).json({
      success: false,
      msg: 'Error al registrar usuario',
      error: err.message
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        msg: 'Nombre de usuario y contraseña son obligatorios'
      })
    }

    
    const user = await User.findOne({ where: { nombre: username } })
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: 'Nombre de usuario no registrado'
      })
    }

    const valido = await bcrypt.compare(password, user.password)
    if (!valido) {
      return res.status(401).json({
        success: false,
        msg: 'Contraseña incorrecta'
      })
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    console.log(`✅ Login exitoso: ${user.nombre}`)

    res.json({
      success: true,
      msg: 'Inicio de sesión exitoso',
      data: {
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          rol: user.rol,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        },
        token
      }
    })
  } catch (err) {
    console.error('❌ Error en login:', err)
    res.status(500).json({
      success: false,
      msg: 'Error al iniciar sesión',
      error: err.message
    })
  }
}
