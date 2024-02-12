import ProductsDao from "../dao/product.dao.js";
import { generateProduct } from "../utils.js";

export default class Productsservice {
  static async getProducts() {
    return await ProductsDao.get();
  }

  static async getById(params) {
    const { pid } = params;
    const product = await ProductsDao.getById(pid);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  static async addProduct(data) {
    const product = await ProductsDao.addProduct(data);
    console.log("Producto creado correctamente.");
    return product;
  }

  static async updateProduct(id, data) {
    return await ProductsDao.updateById(id, data);
  }

  static async deleteById(id, data) {
    return await ProductsDao.deleteById(id, data);
  }

  static async getProductsPaginated() {
    const { limit = 10, page = 1, sort, category } = req.query;
    const criteria = {};
    const options = { limit, page };
    if (sort) {
      options.sort = { price: sort };
    }
    if (category) {
      criteria.category = category;
    }
    const url = "http://localhost:8080/api/products/pagination";
    const result = await ProductsDao.getProductsPaginated(
      criteria,
      options,
      sort,
      category,
      url
    );
    return result;
  }

  static async mockingProducts() {
    let result = [];
    for (let i = 0; i < 100; i++) {
      const generatedProduct = generateProduct();
      result.push(generatedProduct);
    }
    return result;
  }
}
