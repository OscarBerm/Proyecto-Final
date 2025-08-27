export const isAdmin = (req, res, next) => {
  const user = req.user

  if (user && user.rol === 'admin') {
    next()
  } else {
    res.status(403).json({ error: 'Acceso denegado: Se requieren permisos de administrador.' })
  }
}