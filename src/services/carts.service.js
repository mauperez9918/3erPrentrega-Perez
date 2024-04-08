import CartsDao from "../dao/carts.dao.js";
import ProductDao from "../dao/product.dao.js";
import TicketService from "./ticket.service.js";

export default class CartsService {
  static async getCarts() {
    return await CartsDao.getCarts();
  }

  static async newCart() {
    return await CartsDao.newCart();
  }

  static async getProductsInCart(cid) {
    const cart = await CartsDao.getCartById(cid);

    if (!cart) {
      throw new Error("El carrito no existe.");
    }

    if (cart.products.length <= 0) {
      throw new Error("Su carrito esta vacio.");
    }

    return await CartsDao.getProductsInCart(cid);
  }

  static async addProductToCart(data, userData) {
    const { cid, pid } = data;
    const { email } = userData;

    const cart = await CartsDao.getCartById(cid);
    const product = await ProductDao.getById(pid);

    if (product.owner === email) {
      throw new Error(
        "Este producto no puede ser agregado ya que fue creado por usted."
      );
    }

    const productFound = cart.products.find(
      (element) => element.product == pid
    );

    await CartsDao.addProductToCart(cid, pid, productFound, cart);
  }

  static async deleteToCart(data) {
    const { cid, pid } = data;

    let cart = await CartsDao.getCartById(cid);

    const findProduct = cart.products.find((elem) => elem.product._id == pid);

    if (findProduct) {
      let filterProducts = cart.products.filter(
        (elem) => elem.product._id != pid
      );
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

  static async purchase(cid, email) {
    const cart = await CartsDao.getCartById(cid);

    if (cart.products == []) {
      throw new Error("Su carrito esta vacio.");
    }

    const filterProducts = cart.products.filter((element) => {
      return element.quantity <= element.product.stock;
    });

    if (filterProducts.length <= 0) {
      throw new Error("Los productos que desea comprar no estan disponibles.");
    }

    cart.products.forEach(async (element) => {
      if (element.product.stock > 0) {
        element.product.stock = element.product.stock - element.quantity;

        await ProductDao.updateById(element.product._id, element.product);
      }
    });

    const amount = filterProducts.reduce(
      (acc, currentValue) =>
        acc + currentValue.product.price * currentValue.quantity,
      0
    );

    cart.products = [];

    await CartsDao.updateById(cid, cart);

    try {
      await TicketService.createTicket(amount, email);
    } catch (error) {
      console.error(error);
    }
  }
}
