const express = require('express');
const router = express.Router();
const TeamController = require('../controllers/team.controller');
const { verificarToken } = require('../middlewares/auth.middleware');


router.get('/', verificarToken, async (req, res) => {
  try {
    const equipos = await TeamController.getEquipos(req, res);
    if (res.headersSent) return;  
    res.status(200).json({ success: true, data: equipos });
  } catch (error) {
    console.error('❌ Error al obtener equipos:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, msg: 'Error interno al obtener equipos.' });
    }
  }
});


router.get('/user/:usuarioId', verificarToken, async (req, res) => {
  try {
    const equipos = await TeamController.getEquiposByUsuario(req, res);
    if (res.headersSent) return;  
    res.status(200).json({ success: true, data: equipos });
  } catch (error) {
    console.error('❌ Error al obtener equipos del usuario:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, msg: 'Error interno al obtener equipos del usuario.' });
    }
  }
});


router.post('/', verificarToken, async (req, res) => {
  try {
    const nuevoEquipo = await TeamController.createEquipo(req, res);
    if (res.headersSent) return;  
    res.status(201).json({ success: true, data: nuevoEquipo });
  } catch (error) {
    console.error('❌ Error al crear equipo:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, msg: 'Error interno al crear equipo.' });
    }
  }
});


router.get('/:id', verificarToken, async (req, res) => {
  try {
    const equipo = await TeamController.getEquipoDetalle(req, res);
    if (res.headersSent) return; 
    res.status(200).json({ success: true, data: equipo });
  } catch (error) {
    console.error('❌ Error al obtener el detalle del equipo:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, msg: 'Error interno al obtener el equipo.' });
    }
  }
});


router.patch('/:id', verificarToken, async (req, res) => {
  try {
    const equipoActualizado = await TeamController.updateEquipo(req, res);
    if (res.headersSent) return;  
    res.status(200).json({ success: true, data: equipoActualizado });
  } catch (error) {
    console.error('❌ Error al actualizar el equipo:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, msg: 'Error interno al actualizar el equipo.' });
    }
  }
});


router.delete('/:id', verificarToken, async (req, res) => {
  try {
    const equipoEliminado = await TeamController.deleteEquipo(req, res);
    if (res.headersSent) return;  
    res.status(200).json({ success: true, msg: 'Equipo eliminado correctamente', data: equipoEliminado });
  } catch (error) {
    console.error('❌ Error al eliminar el equipo:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, msg: 'Error interno al eliminar el equipo.' });
    }
  }
});

module.exports = router;
