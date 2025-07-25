import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  // otros campos si querés
});

const CartModel = mongoose.model('carts', cartSchema);

export default CartModel

