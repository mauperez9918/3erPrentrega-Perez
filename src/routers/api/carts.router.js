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
import { handlePolicies } from "../../utils.js";

const router = Router();

router.get("/", getCarts);

router.get("/:cid/purchase", purchase);

router.post("/", newCart);

router.get("/:cid", getProductsInCart);

router.post("/:cid/products/:pid", handlePolicies(["USER"]), addProductToCart);

router.delete("/:cid/products/:pid", deleteToCart);

router.delete("/:cid", deleteAllProducts);

router.put("/:cid/products/:pid", updateInCartProduct);

export default router;
