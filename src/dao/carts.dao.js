import cartModel from "./models/cart.model.js";

export default class CartsDao {
  static getCarts() {
    return cartModel.find();
  }

  static async getCartById(cartId) {
    return await cartModel
      .findById({ _id: cartId })
      .populate("products.product");
  }

  static async newCart() {
    return await cartModel.create({});
  }

  static async updateById(cid, data) {
    return await cartModel.updateOne({ _id: cid }, { $set: data });
  }

  static async deleteProductCart(cartId, cart) {
    return await cartModel.updateOne({ _id: cartId }, { $set: cart });
  }

  static async getProductsInCart(cartId) {
    const cart = await cartModel.findById(cartId).populate("products.product");
    return cart.products;
  }

  static async addProductToCart(cartId, pid, productFound, cart) {
    if (!productFound) {
      cart.products.push({ product: pid });
      await cartModel.updateOne({ _id: cartId }, { $set: cart });
      console.log("Producto agregado al carrito correctamente.");
    } else {
      productFound.quantity += 1;
      await cartModel.updateOne({ _id: cartId }, { $set: cart });
    }
  }

  static async updateProductQuantity(cartId, cart) {
    return cartModel.updateOne({ _id: cartId }, { $set: cart });
  }

  static async deleteAllProducts(cartId) {
    let cart = await cartModel.findById(cartId);
    cart.products = [];
    try {
      await cartModel.updateOne({ _id: cartId }, { $set: cart });
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }
}
