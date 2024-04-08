import { Router } from "express";
import Productsservice from "../../services/products.service.js";
import { authMiddleware, handlePolicies } from "../../utils/utils.js";
import CartsService from "../../services/carts.service.js";
import UsersService from "../../services/user.service.js";

const router = Router();

router.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/products");
  } else {
    res.render("login", { title: "Login" });
  }
});

router.get("/register", (req, res) => {
  if (req.user) {
    return res.redirect("/products");
  } else {
    res.render("register", { title: "Registro" });
  }
});

router.get(
  "/profile",
  authMiddleware("jwt"),
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  async (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    } else {
      res.render("profile", {
        title: "Perfil",
        user: req.user,
      });
    }
  }
);

router.get(
  "/products",
  authMiddleware("jwt"),
  handlePolicies(["USER", "ADMIN", "PREMIUM"]),
  async (req, res) => {
    if (!req.user) {
      return res.redirect("/");
    }
    const { limit = 10, page = 1, sort, category, status } = req.query;
    const url =
      "https://proyecto-final-perez-production.up.railway.app/products";

    try {
      const result = await Productsservice.getProductsPaginated(
        limit,
        page,
        sort,
        category,
        url,
        status
      );

      res.render("products", {
        title: "Products",
        ...result,
        user: req.user,
      });
    } catch (error) {}
  }
);

router.get(
  "/realtimeproducts",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN", "PREMIUM"]),
  (req, res) => {
    res.render("realTimeProducts", {});
  }
);

router.get("/recoveryPass", (req, res) => {
  res.render("recoveryPass", {});
});

router.get("/createPassword/:token", async (req, res) => {
  res.render("createPassword", {});
});

router.get(
  "/chat",
  authMiddleware("jwt"),
  handlePolicies(["USER"]),
  (req, res) => {
    res.render("chat", {});
  }
);

router.get("/cart", authMiddleware("jwt"), async (req, res) => {
  try {
    const { cart } = req.user;
    const productsInCart = await CartsService.getProductsInCart(cart);
    res.render("cart", {
      products: productsInCart.map((product) => product.toJSON()),
    });
  } catch (error) {
    res.render("error", {
      messageError: error.message,
      link: "/products",
    });
  }
});

router.get(
  "/admin",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN"]),
  async (req, res) => {
    const allUsers = await UsersService.getAllUsers();

    res.render("admin", {
      users: allUsers,
    });
  }
);

export default router;
