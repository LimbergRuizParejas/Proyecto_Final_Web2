const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware para verificar el token JWT
exports.verificarToken = (req, res, next) => {
  try {
    // Obtener el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // Si no se proporciona el token, se retorna un error 401
    if (!token) {
      console.warn('🚫 No se proporcionó token en la solicitud.');
      return res.status(401).json({ msg: 'Token no proporcionado' });
    }

    // Verificar el token JWT utilizando la clave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error('❌ Error al verificar token:', err);
        return res.status(403).json({ msg: 'Token inválido' });
      }

      // Si el token es válido, agregar los datos del usuario al objeto `req`
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

// Middleware para verificar si el usuario tiene rol de administrador
exports.esAdmin = (req, res, next) => {
  try {
    // Verificar que el usuario está autenticado y tiene rol de "admin"
    console.log('🛂 Usuario autenticado:', req.usuario);

    if (!req.usuario || req.usuario.rol !== 'admin') {
      console.warn('⛔ Acceso denegado. Usuario no es admin o no existe:', req.usuario);
      return res.status(403).json({ msg: 'Acceso denegado: se requiere rol administrador' });
    }

    // Pasar al siguiente middleware o ruta si el usuario es admin
    next();
  } catch (err) {
    console.error('🔥 Error inesperado en esAdmin:', err);
    res.status(500).json({ msg: 'Error en verificación de rol' });
  }
};
