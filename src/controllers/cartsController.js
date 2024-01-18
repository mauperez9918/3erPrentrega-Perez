import cartModel from "../dao/models/cart.model.js";

export default class CartManager {
  static getCarts() {
    return cartModel.find();
  }

  static async getProductsInCart(cartId) {
    try {
      const cart = await cartModel
        .findById(cartId)
        .populate("products.product");
      return cart.products;
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
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
    try {
      const cart = await cartModel.findById({ _id: cartId });
      const productFound = cart.products.find(
        (element) => element.product == pid
      );
      if (!productFound) {
        cart.products.push({ product: pid });
        await cartModel.updateOne({ _id: cartId }, { $set: cart });
        console.log("Producto agregado al carrito correctamente.");
      } else {
        productFound.quantity += 1;
        await cartModel.updateOne({ _id: cartId }, { $set: cart });
      }
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }

  static async deleteProductCart(cartId, pid) {
    try {
      let cart = await cartModel.findById(cartId);
      const findProduct = cart.products.find((product) => product._id == pid);
      if (findProduct) {
        let filterProducts = cart.products.filter(
          (product) => product._id != pid
        );
        cart.products = filterProducts;
        await cartModel.updateOne({ _id: cartId }, { $set: cart });
        console.log("Su producto ha sido eliminado correctamente.");
      } else {
        console.log("Su producto no se encuentra en el carrito.");
      }
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }

  static async updateProductQuantity(cartId, pid, quantity) {
    let cart = await cartModel.findById(cartId);
    let findProduct = cart.products.find((product) => product._id == pid);
    if (findProduct) {
      console.log(findProduct.quantity);
      findProduct.quantity = quantity;
      await cartModel.updateOne({ _id: cartId }, { $set: cart });
    } else {
      console.log("El producto no existe.");
    }
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
