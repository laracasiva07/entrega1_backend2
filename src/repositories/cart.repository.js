import CartModel from "../models/carts.model.js";

export class CartRepository {
  async getCartById(cid) {
    return await CartModel.findById(cid).populate("products.product");
  }

  async updateCart(cid, newProducts) {
    return await CartModel.findByIdAndUpdate(cid, { products: newProducts }, { new: true });
  }

  async createCart() {
    return await CartModel.create({ products: [] });
  }
}

