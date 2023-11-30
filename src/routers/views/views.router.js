import { Router } from "express";
import ProductManager from "../../dao/productManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, category } = req.query;
  const criteria = {};
  const options = { limit, page };
  if (sort) {
    options.sort = { price: sort };
  }
  if (category) {
    criteria.category = category;
  }

  const url = "http://localhost:8080/api/products";
  const result = await ProductManager.getProductsPaginated(
    criteria,
    options,
    sort,
    category,
    url
  );
  res.render("products", { title: "Products", ...result });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});

export default router;
