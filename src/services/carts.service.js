import CartsDao from "../dao/carts.dao.js";

export default class CartsService {
  static async getCarts() {
    return await CartsDao.getCarts();
  }

  static async newCart() {
    return await CartsDao.newCart();
  }

  static async getProductsInCart(data) {
    const { cid } = data;

    return await CartsDao.getProductsInCart(cid);
  }

  static async addProductToCart(data) {
    const { cid, pid } = data;

    const cart = await CartsDao.getCartById(cid);
    const productFound = cart.products.find(
      (element) => element.product == pid
    );

    await CartsDao.addProductToCart(cid, pid, productFound, cart);
  }

  static async deleteToCart(data) {
    const { cid, pid } = data;

    let cart = await CartsDao.getCartById(cid);

    const findProduct = cart.products.find((elem) => elem.product == pid);
    if (findProduct) {
      let filterProducts = cart.products.filter((elem) => elem.product != pid);
      cart.products = filterProducts;
      console.log("Su producto ha sido eliminado correctamente.");
      return await CartsDao.deleteProductCart(cid, cart);
    } else {
      console.log("Su producto no se encuentra en el carrito.");
    }
  }

  static async deleteAllProducts(data) {
    const { cid } = data;

    return await CartsDao.deleteAllProducts(cid);
  }

  static async updateInCartProduct(params, dataBody) {
    const { cid, pid } = params;
    const { quantity } = dataBody;

    let cart = await CartsDao.getCartById(cid);

    if (!cart) {
      throw new Error("Carrito no encontrado.");
    }

    let findProduct = cart.products.find(
      (product) => product.product._id == pid
    );

    if (findProduct) {
      findProduct.quantity = quantity;

      return await CartsDao.updateProductQuantity(cid, cart);
    } else {
      throw new Error("El producto no existe en el carrito.");
    }
  }

  static async purchase(data) {
    const { cid } = data;
    return await CartsDao.purchase(cid);
  }
}
