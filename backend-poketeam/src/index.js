const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 3000

// ================================
// CORS
// ================================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'], // ✅ PATCH incluido
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// ================================
// Body parsers
// ================================
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================================
// Logger
// ================================
app.use((req, res, next) => {
  console.log(`➡️ [${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next()
})



const itemsPath = path.resolve(__dirname, '..', 'uploads', 'items')
if (fs.existsSync(itemsPath)) {
  console.log('📂 Sirviendo imágenes de ítems desde:', itemsPath)
  app.use('/uploads/items', express.static(itemsPath, {
    setHeaders: (res) => {
      res.set('Cache-Control', 'public, max-age=0')
    }
  }))
} else {
  console.warn(`⚠️ Carpeta no encontrada: ${itemsPath}`)
}

// Ruta para servir las imágenes de Pokémon
const pokemonsPath = path.resolve(__dirname, 'uploads', 'pokemons')
if (fs.existsSync(pokemonsPath)) {
  console.log('📂 Sirviendo imágenes de pokemons desde:', pokemonsPath)
  app.use('/uploads/pokemons', express.static(pokemonsPath, {
    setHeaders: (res) => {
      res.set('Cache-Control', 'public, max-age=0')
    }
  }))
} else {
  console.warn(`⚠️ Carpeta no encontrada: ${pokemonsPath}`)
}


// ================================
// Conectar DB
// ================================
const db = require('./models')

// ================================
// Rutas API
// ================================
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/users', require('./routes/user.routes'))
app.use('/api/equipos', require('./routes/team.routes'))
app.use('/api/pokemon', require('./routes/pokemon.routes'))
app.use('/api/items', require('./routes/item.routes'))
app.use('/api/movimientos', require('./routes/movimiento.routes'))
app.use('/api/equipo-pokemon', require('./routes/equipoPokemon.routes'))


app.get('/', (req, res) => {
  console.log('✅ Ruta raíz "/" accedida correctamente')
  res.send('🚀 API Pokédex + Teambuilder funcionando ✅')
})


app.use((req, res) => {
  console.warn(`⚠️ Ruta no encontrada: ${req.method} ${req.originalUrl}`)
  res.status(404).json({ success: false, msg: 'Endpoint no encontrado' })
})


app.use((err, req, res, next) => {
  console.error('🔥 Error global no capturado:', err)
  res.status(500).json({
    success: false,
    msg: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.stack : 'Consulte con el administrador.'
  })
})


const alterDb = process.env.DB_ALTER === 'true' || false

db.sequelize.sync({ alter: alterDb })
  .then(() => {
    console.log(`📚 Base de datos sincronizada correctamente con alter:${alterDb}`)
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en: http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('❌ Error al sincronizar la base de datos:', err)
    process.exit(1)
  })
