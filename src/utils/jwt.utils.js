import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'coderSecretKey'; // usá tu variable de entorno

export const generateToken = (user) => {
  return jwt.sign({ user }, SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
