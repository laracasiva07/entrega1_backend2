// src/middlewares/authorizePurchase.js
export const authorizePurchase = (req, res, next) => {
  const user = req.user;
  if (!user) return res.status(401).json({ error: 'No autenticado' });

  if (user.role !== 'USER') {
    return res.status(403).json({ error: 'Solo usuarios pueden realizar compras' });
  }

  next();
};
