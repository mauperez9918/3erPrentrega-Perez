import ProductsDao from "../dao/product.dao.js";
import { generateProductError } from "../utils/CauseMessageError.js";
import { CustomError } from "../utils/CustomError.js";
import EnumsError from "../utils/EnumsError.js";
import { generateProduct } from "../utils/utils.js";

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
    const { title, description, price, thumbnail, code, stock, category } =
      data;
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      !stock ||
      !category
    ) {
      CustomError.create({
        name: "Invalid product data",
        cause: generateProductError(data),
        message: "Ocurrio un error mientras intentamos crear el producto.",
        code: EnumsError.BAD_REQUEST_ERROR,
      });
    }
    const product = await ProductsDao.addProduct(data);
    console.log("Producto creado correctamente.");
    return product;
  }

  static async updateProduct(params, data) {
    const { pid } = params;
    const product = await ProductsDao.getById(pid);

    if (product) {
      await ProductsDao.updateById(pid, data);
      console.log("Producto actualizado correctamente.");
    } else {
      throw new Error("Su producto no existe.");
    }
  }

  static async deleteById(params) {
    const { pid } = params;
    return await ProductsDao.deleteById(pid);
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
