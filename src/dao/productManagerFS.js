const fs = require("fs");

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./products.json";
  }

  readJSON() {
    if (!fs.existsSync(this.path)) {
      return this.products;
    } else {
      const products = fs.readFileSync(this.path, "utf-8");
      this.products = JSON.parse(products);
      return this.products;
    }
  }

  addProduct(title, description, price, thumbnail, code, stock, category) {
    this.readJSON();

    if ((!title, !description, !price, !thumbnail, !code, !stock, !category)) {
      console.log("Debe completar todos los campos para agregar el producto");
    } else {
      const product = {
        id: Math.random().toString(36).slice(2, 11),
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
      };

      const productCode = this.products.find(
        (product) => product.code === code
      );

      if (productCode) {
        console.log(
          `Su codigo ${code} ya existe, intente agregar su producto nuevamente con otro codigo`
        );
      } else {
        try {
          this.products.push(product);
          fs.writeFileSync(
            this.path,
            JSON.stringify(this.products, null, `\t`),
            "utf-8"
          );
          console.log("Su producto ha sido agregado correctamente");
        } catch (error) {
          console.log(`Ha ocurrido un error ${error.message}`);
        }
      }
    }
  }

  getProducts() {
    return this.readJSON();
  }

  getProductById(id) {
    this.readJSON();
    const findProduct = this.products.find((product) => product.id === id);

    if (findProduct) {
      return findProduct;
    } else {
      console.log("Producto no encontrado.");
    }
  }

  updateProduct(id, updatedProduct) {
    this.readJSON();
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex === -1) {
      console.log("Producto no encontrado.");
    } else {
      this.products[productIndex] = {
        id: id,
        ...updatedProduct,
      };
      fs.writeFileSync(
        this.path,
        JSON.stringify(this.products, null, `\t`),
        "utf-8"
      );
      console.log("Su producto ha sido actualizado correctamente");
    }
  }

  deleteProduct(id) {
    this.readJSON();
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) {
      console.log("Su producto no existe.");
    } else {
      this.products.splice(productIndex, 1);
      fs.writeFileSync(
        this.path,
        JSON.stringify(this.products, null, `\t`),
        "utf-8"
      );
      console.log("Su producto ha sido borrado correctamente.");
    }
  }
}

const productInstance = new ProductManager();

module.exports = ProductManager;
