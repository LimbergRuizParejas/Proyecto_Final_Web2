const express = require('express');
const router = express.Router();
const MovimientoController = require('../controllers/movimiento.controller');
const { verificarToken, esAdmin } = require('../middlewares/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/movimientos';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Directorio creado: ${dir}`);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get('/', verificarToken, MovimientoController.getAll);

router.get('/:id', verificarToken, MovimientoController.getOne);


router.post(
  '/',
  verificarToken,
  esAdmin,
  upload.single('imagen'), 
  MovimientoController.create
);

router.put(
  '/:id',
  verificarToken,
  esAdmin,
  upload.single('imagen'), 
  MovimientoController.update
);


router.delete('/:id', verificarToken, esAdmin, MovimientoController.remove);

module.exports = router;
