export const autorizarAdmin = (req, res, next) => {
    if (req.usuario.rol !== 'Administrador') {
        return res.status(403).json({ mensaje: 'Acceso denegado, no tienes permisos suficientes' });
    }
    next();
};
