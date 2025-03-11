import jwt from 'jsonwebtoken';

export const autenticar = (req, res, next) => {
    console.log('Headers completos:', req.headers);
  
    const authHeader = req.headers['authorization']; // en minúsculas
    console.log('Authorization Header:', authHeader);
  
    const token = authHeader?.replace('Bearer ', '');
    console.log('Token después de replace:', token);
  
    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso denegado, token no proporcionado' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
      req.usuario = decoded;
      next();
    } catch (error) {
      console.error('Error en la verificación del token:', error);
      res.status(400).json({ mensaje: 'Token inválido' });
    }
  };
  
  

export const autorizar = (rol) => {
  return (req, res, next) => {
    if (req.usuario.rol !== rol) {
      return res.status(403).json({ mensaje: 'Acceso denegado, no tienes permisos suficientes' });
    }
    next();
  };
};