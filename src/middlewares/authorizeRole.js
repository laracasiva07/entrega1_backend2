export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const user = req.user; // asumiendo que `req.user` ya viene del middleware passport "current"

    if (!user) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'No autorizado' });
    }

    next();
  };
};

