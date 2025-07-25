import Ticket from '../models/ticket.model.js';
import { generateTicketCode } from '../utils.js';
import Product from '../models/products.model.js';
import Cart from '../models/Cart.js';

export const purchaseCart = async (req, res) => {
  const cartId = req.params.cid;
  const user = req.user;

  const cart = await Cart.findById(cartId).populate('products.product');
  if (!cart) return res.status(404).send("Carrito no encontrado");

  let totalAmount = 0;
  const productsNoStock = [];

  for (let item of cart.products) {
    const product = item.product;
    const quantity = item.quantity;

    if (product.stock >= quantity) {
      product.stock -= quantity;
      totalAmount += product.price * quantity;
      await product.save();
    } else {
      productsNoStock.push(item);
    }
  }

  // Productos que sí tenían stock
  cart.products = productsNoStock;
  await cart.save();

  if (totalAmount > 0) {
    const newTicket = new Ticket({
      code: generateTicketCode(),
      amount: totalAmount,
      purchaser: user.email
    });

    await newTicket.save();
    return res.status(200).json({
      status: "success",
      message: "Compra realizada",
      ticket: newTicket,
      productosNoComprados: productsNoStock
    });
  } else {
    return res.status(400).json({
      status: "fail",
      message: "No se pudo completar la compra. Sin stock disponible.",
      productosNoComprados: productsNoStock
    });
  }
};
