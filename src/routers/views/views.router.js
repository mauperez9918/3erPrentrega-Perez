import { Router } from "express";
import ProductManager from "../../dao/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const products = await ProductManager.get();
  res.render("products", {
    products: products.map((product) => product.toJSON()),
    title: "Products",
  });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

export default router;
