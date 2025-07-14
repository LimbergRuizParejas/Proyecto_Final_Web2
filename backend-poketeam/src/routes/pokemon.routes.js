const express = require('express')
const router = express.Router()
const PokemonController = require('../controllers/pokemon.controller')
const { verificarToken, esAdmin } = require('../middlewares/auth.middleware')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

// =======================================
// CONFIGURACIÓN DE MULTER
// =======================================

// Aseguramos el directorio de uploads
const uploadDir = path.join(__dirname, '..', 'uploads', 'pokemons')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
  console.log(`📁 Carpeta creada automáticamente: ${uploadDir}`)
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    cb(null, uniqueName)
  }
})

// Solo imágenes permitidas
const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/
  const isValidExt = allowed.test(path.extname(file.originalname).toLowerCase())
  const isValidMime = allowed.test(file.mimetype)
  if (isValidExt && isValidMime) {
    cb(null, true)
  } else {
    cb(new Error('Solo se permiten imágenes (jpeg, jpg, png, gif)'))
  }
}

const upload = multer({ storage, fileFilter })

// Middleware para capturar errores de multer y devolver JSON
const handleMulterErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    console.error('❌ Error al subir archivo:', err.message)
    return res.status(400).json({
      success: false,
      msg: err.message || 'Error al subir archivo'
    })
  }
  next()
}

// =======================================
// RUTAS
// =======================================
router.get('/', verificarToken, PokemonController.getAll)
router.get('/:id', verificarToken, PokemonController.getOne)

router.post(
  '/',
  verificarToken,
  esAdmin,
  upload.single('imagen'),
  handleMulterErrors,
  PokemonController.create
)

router.put(
  '/:id',
  verificarToken,
  esAdmin,
  upload.single('imagen'),
  handleMulterErrors,
  PokemonController.update
)

router.delete(
  '/:id',
  verificarToken,
  esAdmin,
  PokemonController.remove
)

module.exports = router
