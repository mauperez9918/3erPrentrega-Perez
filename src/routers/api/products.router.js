import { Router } from "express";
import ProductManager from "../../dao/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductManager.get();
  res.status(200).json(products);
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
