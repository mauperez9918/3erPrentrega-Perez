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
import { handlePolicies } from "../../utils.js";

const router = Router();

router.get("/", getProducts);

router.get("/mockingproducts", mockingProducts);

router.get("/pagination", getProductsPaginated);

router.get("/:pid", getProductById);

router.post("/", handlePolicies(["ADMIN"]), addProduct);

router.put("/:pid", handlePolicies(["ADMIN"]), updateProduct);

router.delete("/:pid", handlePolicies(["ADMIN"]), deleteById);

export default router;
