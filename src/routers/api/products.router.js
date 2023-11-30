import { Router } from "express";
import ProductManager from "../../dao/productManager.js";
import productModel from "../../dao/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductManager.get();
  res.status(200).json(products);
});

router.get("/pagination", async (req, res) => {
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
  const result = await ProductManager.getProductsPaginated(
    criteria,
    options,
    sort,
    category,
    url
  );
  res.status(200).json(result);
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await ProductManager.getById(pid);
  res.status(200).json(product);
});

router.post("/", async (req, res) => {
  const { body } = req;
  const product = await ProductManager.addProduct(body);
  res.status(201).json(product);
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const { body } = req;
  await ProductManager.updateById(pid, body);
  res.status(204).end();
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await ProductManager.deleteById(pid);
  res.status(204).end();
});

export default router;
