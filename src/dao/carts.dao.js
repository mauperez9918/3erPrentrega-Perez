import cartModel from "./models/cart.model.js";

export default class CartsDao {
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
      throw new Error(`Ha ocurrido un error: ${error.message}`);
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

    if (!cart) {
      throw new Error("Carrito no encontrado.");
    }

    let findProduct = cart.products.find(
      (product) => product.product._id == pid
    );

    if (findProduct) {
      findProduct.quantity = quantity;
      await cartModel.updateOne({ _id: cartId }, { $set: cart });
    } else {
      throw new Error("El producto no existe en el carrito.");
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

  // static async purchase(cid) {
  //   let cart = await cartModel.findById(cid);
  //   console.log(cart);
  // }
}
