import ProductModel from "../models/products.model.js";

export class ProductRepository {
  async getById(pid) {
    return await ProductModel.findById(pid);
  }

  async updateStock(pid, newStock) {
    return await ProductModel.findByIdAndUpdate(pid, { stock: newStock }, { new: true });
  }

  async createProduct(data) {
    return await ProductModel.create(data);
  }

  async deleteProduct(pid) {
    return await ProductModel.findByIdAndDelete(pid);
  }

  async getAll() {
    return await ProductModel.find();
  }
}
