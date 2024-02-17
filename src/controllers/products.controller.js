import Productsservice from "../services/products.service.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Productsservice.getProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Productsservice.getById(req.params);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Productsservice.addProduct(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    await Productsservice.updateProduct(req.params, req.body);
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {
    await Productsservice.deleteById(req.params);
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getProductsPaginated = async (req, res) => {
  try {
    const result = await Productsservice.getProductsPaginated(req.query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const mockingProducts = (req, res) => {
  try {
    const result = Productsservice.mockingProducts();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
