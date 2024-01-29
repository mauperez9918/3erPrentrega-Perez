import CartsService from "../services/carts.service.js";

export const getCarts = async (req, res) => {
  try {
    const carts = await CartsService.getCarts();

    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const newCart = async (req, res) => {
  try {
    const cart = await CartsService.newCart();

    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProductsInCart = async (req, res) => {
  try {
    const cart = await CartsService.getProductsInCart(req.params);
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addProductToCart = async (req, res) => {
  try {
    await CartsService.addProductToCart(req.params);
    res.status(201).json({
      message: "Su producto ha sido agregado al carrito correctamente",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteToCart = async (req, res) => {
  try {
    await CartsService.deleteToCart(req.params);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteAllProducts = async (req, res) => {
  try {
    await CartsService.deleteAllProducts(req.params);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateInCartProduct = async (req, res) => {
  try {
    await CartsService.updateInCartProduct(req.params, req.body);
    res.status(200).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};
