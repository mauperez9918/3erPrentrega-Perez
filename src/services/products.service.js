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

  static async addProduct(newProductData, userData) {
    const { title, description, price, thumbnail, code, stock, category } =
      newProductData;
    const { email, role } = userData;

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
        cause: generateProductError(newProductData),
        message: "Ocurrio un error mientras intentamos crear el producto.",
        code: EnumsError.BAD_REQUEST_ERROR,
      });
    }

    if (role.toUpperCase() === "PREMIUM") {
      newProductData.owner = email;
    }

    const product = await ProductsDao.addProduct(newProductData);
    console.log("Producto creado correctamente.");
    return product;
  }

  static async updateProduct(params, UpdatedData, userData) {
    const { pid } = params;
    const { role, email } = userData;
    const product = await ProductsDao.getById(pid);

    if (product) {
      if (role.toUpperCase() === "ADMIN") {
        await ProductsDao.updateById(pid, UpdatedData);
        console.log("Producto actualizado correctamente.");
      } else {
        if (email !== product.owner) {
          throw new Error("No esta autorizado para actualizar este producto.");
        }

        await ProductsDao.updateById(pid, UpdatedData);
        console.log("Producto actualizado correctamente.");
      }
    } else {
      throw new Error("Su producto no existe.");
    }
  }

  static async deleteById(params, userData) {
    const { pid } = params;
    const { role, email } = userData;
    const product = await ProductsDao.getById(pid);

    if (email !== product.owner && role.toUpperCase() === "PREMIUM") {
      throw new Error("No esta autorizado para eliminar este producto.");
    }

    await ProductsDao.deleteById(pid);
    console.log("Producto ha sido eliminado correctamente.");
  }

  static async getProductsPaginated(
    limit = 10,
    page = 1,
    sort,
    category,
    url,
    status
  ) {
    const criteria = {};
    const options = { limit, page };
    if (sort) {
      options.sort = { price: sort };
    }
    if (category) {
      criteria.category = category;
    }

    const result = await ProductsDao.getProductsPaginated(
      criteria,
      options,
      sort,
      category,
      url,
      status
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
