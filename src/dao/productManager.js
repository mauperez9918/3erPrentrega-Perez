import productModel from "./models/product.model.js";

export default class ProductManager {
  static get() {
    return productModel.find();
  }

  static async getById(id) {
    const product = await productModel.findById(id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }
    return product;
  }

  static async addProduct(data) {
    try {
      const product = await productModel.create(data);
      console.log("Producto creado correctamente.");
      return product;
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }

  static async updateById(pid, data) {
    try {
      const product = await productModel.getById(pid);
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }

    if (product) {
      try {
        await productModel.updateOne({ _id: pid }, { $set: data });
        console.log("Producto actualizado correctamente.");
      } catch (error) {
        console.error(`Ha ocurrido un error: ${error.message}`);
      }
    }
  }

  static async deleteById(pid) {
    try {
      await productModel.deleteOne({ _id: pid });
      console.log("El producto ha sido eliminado correctamente.");
    } catch (error) {
      console.error(`Ha ocurrido un error: ${error.message}`);
    }
  }
}
