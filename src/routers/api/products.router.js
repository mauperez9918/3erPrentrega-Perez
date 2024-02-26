import { Router } from "express";
import {
  addProduct,
  deleteById,
  getProductById,
  getProducts,
  getProductsPaginated,
  mockingProducts,
  updateProduct,
} from "../../controllers/products.controller.js";
import { authMiddleware, handlePolicies } from "../../utils/utils.js";

const router = Router();

router.get("/", getProducts);

router.get("/mockingproducts", mockingProducts);

router.get("/pagination", getProductsPaginated);

router.get("/:pid", getProductById);

router.post(
  "/",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN", "PREMIUM"]),
  addProduct
);

router.put(
  "/:pid",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN", "PREMIUM"]),
  updateProduct
);

router.delete(
  "/:pid",
  authMiddleware("jwt"),
  handlePolicies(["ADMIN", "PREMIUM"]),
  deleteById
);

export default router;
