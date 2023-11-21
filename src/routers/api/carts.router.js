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
  const cart = await CartManager.getCartById(cid);
  res.status(200).json(cart);
});

router.post("/:cid/products/:pid", (req, res) => {
  const { cid, pid } = req.params;
  CartManager.addProductToCart(cid, pid);
  res.status(201).json({
    message: "Su producto ha sido agregado al carrito correctamente.",
  });
});

export default router;
