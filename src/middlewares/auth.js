import jwt from 'jsonwebtoken';
import config from '../config/index.js';

export const authToken = (req, res, next) => {
  const token = req.cookies.jwtCookie;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    req.user = user;
    next();
  });
};