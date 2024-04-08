import { Router } from "express";
import {
  addProductToCart,
  deleteAllProducts,
  deleteToCart,
  getCarts,
  getProductsInCart,
  newCart,
  purchase,
  updateInCartProduct,
} from "../../controllers/carts.controller.js";
import { authMiddleware, handlePolicies } from "../../utils/utils.js";

const router = Router();

router.get("/", getCarts);

router.get("/purchase", authMiddleware("jwt"), purchase);

router.post("/", newCart);

router.get("/:cid", getProductsInCart);

router.post(
  "/:cid/products/:pid",
  authMiddleware("jwt"),
  handlePolicies(["USER", "PREMIUM"]),
  addProductToCart
);

router.delete("/:cid/products/:pid", deleteToCart);

router.delete("/:cid", deleteAllProducts);

router.put("/:cid/products/:pid", updateInCartProduct);

export default router;
