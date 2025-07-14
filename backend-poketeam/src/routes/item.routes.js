const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/item.controller');
const { verificarToken, esAdmin } = require('../middlewares/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración del almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../../uploads/items');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Carpeta creada: ${dir}`);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${extension}`);
  }
});

const upload = multer({ storage });

// ===============================
// Rutas públicas o protegidas
// ===============================
router.get('/', verificarToken, ItemController.getAll);

// ===============================
// Rutas administrativas protegidas
// ===============================
router.post(
  '/',
  verificarToken,
  esAdmin,
  upload.single('imagen'), // clave del form-data
  ItemController.create
);

router.put(
  '/:id',
  verificarToken,
  esAdmin,
  upload.single('imagen'),
  ItemController.update
);

router.delete(
  '/:id',
  verificarToken,
  esAdmin,
  ItemController.remove
);

module.exports = router;
