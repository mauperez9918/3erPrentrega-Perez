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

    return await CartsDao.addProductToCart(cid, pid);
  }

  static async deleteToCart(data) {
    const { cid, pid } = data;

    return await CartsDao.deleteProductCart(cid, pid);
  }

  static async deleteAllProducts(data) {
    const { cid } = data;

    return await CartsDao.deleteAllProducts(cid);
  }

  static async updateInCartProduct(params, dataBody) {
    const { cid, pid } = params;
    const { quantity } = dataBody;
    return await CartsDao.updateProductQuantity(cid, pid, quantity);
  }
}
