// src/controllers/purchase.controller.js
import { CartRepository } from "../repositories/cart.repository.js";
import { ProductRepository } from "../repositories/product.repository.js";

const cartRepo = new CartRepository();
const productRepo = new ProductRepository();

export const buy = async (req, res) => {
  try {
    const user = req.user;
    const cartId = req.params.cid; // ID carrito pasado por ruta

    // Obtener carrito
    const cart = await cartRepo.getById(cartId);
    if (!cart) return res.status(404).json({ error: 'Carrito no encontrado' });

    let total = 0;
    for (const item of cart.products) {
      const product = await productRepo.getById(item.productId);
      if (!product) continue;
      total += product.price * item.quantity;
    }

    // Aquí podrías hacer otras validaciones (stock, pago, etc.)

    // Por ahora devolvemos el total calculado
    res.json({ message: `Compra realizada por usuario ${user.email}`, total });
  } catch (error) {
    res.status(500).json({ error: 'Error en la compra', details: error.message });
  }
};
