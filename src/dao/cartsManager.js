import cartModel from "./models/cart.model.js";

export default class CartManager {
  static getCarts() {
    return cartModel.find();
  }

  static async getCartById(cartId) {
    const cart = await cartModel.findById(cartId);
    if (!cart) {
      throw new Error("Este carrito no existe.");
    }
    return cart;
  }

  static async newCart() {
    try {
      const cart = await cartModel.create({});
      console.log("Carrito creado correctamente.");
      return cart;
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }

  static async addProductToCart(cartId, pid) {
    let product = { _id: pid, quantity: 1 };
    try {
      const productCart = await cartModel.findOne({
        $and: [{ _id: cartId }, { "products._id": pid }],
      });

      if (!productCart) {
        await cartModel.updateOne(
          { _id: cartId },
          { $push: { products: product } }
        );
      } else {
        await cartModel.updateOne(
          { _id: cartId, "products._id": pid },
          { $inc: { "products.$.quantity": 1 } }
        );
      }
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }
}
