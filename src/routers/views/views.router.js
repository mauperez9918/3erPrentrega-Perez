import { Router } from "express";
import ProductManager from "../../dao/productManager.js";
import CartManager from "../../dao/cartsManager.js";

const router = Router();

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Registro" });
});

router.get("/profile", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/login");
  } else {
    res.render("profile", { title: "Perfil", user: req.session.user });
  }
});

router.get("/products", async (req, res) => {
  const { limit = 10, page = 1, sort, category } = req.query;
  const criteria = {};
  const options = { limit, page };
  if (sort) {
    options.sort = { price: sort };
  }
  if (category) {
    criteria.category = category;
  }

  const url = "http://localhost:8080/products";
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

router.get("/carts/:cid", async (req, res) => {
  const { cid } = req.params;
  const productsInCart = await CartManager.getProductsInCart(cid);
  res.render("cart", {
    products: productsInCart.map((product) => product.toJSON()),
  });
});

export default router;
