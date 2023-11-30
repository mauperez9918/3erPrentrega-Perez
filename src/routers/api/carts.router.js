import { Router } from "express";
import CartManager from "../../dao/cartsManager.js";

const router = Router();

router.get("/", async (req, res) => {
  const carts = await CartManager.getCarts();
  res.status(200).json(carts);
});

router.post("/", async (req, res) => {
  const cart = await CartManager.newCart();
  res.status(201).json(cart);
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  const cart = await CartManager.getProductsInCart(cid);
  res.status(200).json(cart);
});

router.post("/:cid/products/:pid", (req, res) => {
  const { cid, pid } = req.params;
  CartManager.addProductToCart(cid, pid);
  res.status(201).json({
    message: "Su producto ha sido agregado al carrito correctamente.",
  });
});

router.delete("/:cid/products/:pid", (req, res) => {
  const { cid, pid } = req.params;
  CartManager.deleteProductCart(cid, pid);
  res.status(200).end();
});

router.delete("/:cid", (req, res) => {
  const { cid } = req.params;
  CartManager.deleteAllProducts(cid);
  res.status(200).end();
});

router.put("/:cid/products/:pid", (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  CartManager.updateProductQuantity(cid, pid, quantity);
  res.status(200).end();
});

export default router;
