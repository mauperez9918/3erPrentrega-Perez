const fs = require("fs");

class CartManager {
  constructor() {
    this.carts = [];
    this.path = "./carts.json";
  }

  readJSON() {
    if (!fs.existsSync(this.path)) {
      return this.carts;
    } else {
      const carts = fs.readFileSync(this.path, "utf-8");
      this.carts = JSON.parse(carts);
      return this.carts;
    }
  }

  newCart() {
    this.readJSON();
    const cart = {
      id: Math.random().toString(36).slice(2, 11),
      products: [],
    };

    this.carts.push(cart);
    fs.writeFileSync(this.path, JSON.stringify(this.carts, "null", "\t"));
  }

  getCartById(cartId) {
    this.readJSON();
    const findCart = this.carts.find((cart) => cart.id === cartId);
    if (!findCart) {
      return console.log("El carrito solicitado no existe.");
    } else {
      return findCart.products;
    }
  }

  addProductToCart(cartId, productId) {
    this.readJSON();
    const cart = this.carts.find((cart) => cart.id === cartId);

    if (!cart) {
      return console.log("Su carrito no existe.");
    } else {
      const findProduct = cart.products.find(
        (product) => product.id === productId
      );

      if (!findProduct) {
        const product = {
          id: productId,
          quantity: 1,
        };

        cart.products.push(product);
        fs.writeFileSync(this.path, JSON.stringify(this.carts, "null", "\t"));
      } else {
        findProduct.quantity += 1;
        fs.writeFileSync(this.path, JSON.stringify(this.carts, "null", "\t"));
      }
    }
  }
}

module.exports = CartManager;
