import ProductsDao from "../dao/product.dao.js";

export default class Productsservice {
  static async getProducts() {
    return await ProductsDao.get();
  }

  static async getById(id) {
    return await ProductsDao.getById(id);
  }

  static async addProduct(data) {
    return await ProductsDao.addProduct(data);
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
}
