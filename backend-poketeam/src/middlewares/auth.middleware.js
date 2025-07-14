const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.verificarToken = (req, res, next) => {
  try {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

   
    if (!token) {
      console.warn('🚫 No se proporcionó token en la solicitud.');
      return res.status(401).json({ msg: 'Token no proporcionado' });
    }

    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('❌ Error al verificar token:', err);
        return res.status(403).json({ msg: 'Token inválido' });
      }

      
      console.log('✅ Token decodificado correctamente:', decoded);
      req.usuario = decoded; // Agregar la información del usuario decodificado

      // Pasar al siguiente middleware o ruta
      next();
    });
  } catch (err) {
    console.error('🔥 Error inesperado en verificarToken:', err);
    res.status(500).json({ msg: 'Error al procesar autenticación' });
  }
};


exports.esAdmin = (req, res, next) => {
  try {
    
    console.log('🛂 Usuario autenticado:', req.usuario);

    if (!req.usuario || req.usuario.rol !== 'admin') {
      console.warn('⛔ Acceso denegado. Usuario no es admin o no existe:', req.usuario);
      return res.status(403).json({ msg: 'Acceso denegado: se requiere rol administrador' });
    }

    
    next();
  } catch (err) {
    console.error('🔥 Error inesperado en esAdmin:', err);
    res.status(500).json({ msg: 'Error en verificación de rol' });
  }
};
