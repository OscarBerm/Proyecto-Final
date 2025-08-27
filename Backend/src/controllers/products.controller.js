import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllCategory,
  getAllProductsAdmin
} from "../models/products.model.js";
import { v4 as uuidv4 } from 'uuid'

export const allProducts = async (req, res) => {
  try {
    const { order_by, limit, page } = req.query
    const result = await getAllProducts({ order_by, limit, page });
    res.status(200).json({ product: result });
  } catch (err) {
    res.status(500).json({ error: "Error  getting product", detalle: err.message });
  }
};

export const allProductsAdmin = async (req, res) => {
  try {
    const { order_by, limit, page } = req.query
    const result = await getAllProductsAdmin({ order_by, limit, page });
    res.status(200).json({ product: result });
  } catch (err) {
    res.status(500).json({ error: "Error  getting product", detalle: err.message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await getProductById(id);
    if (!result) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ product: result });
  } catch (err) {
    res.status(500).json({ error: "Error getting product", detalle: err.message });
  }
};

export const registerProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = req.body
    
    // Generamos un SKU único para el producto
    const sku = uuidv4();
    const creado_por = req.userId

    const newProduct = await createProduct(
      nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por)

    res.status(201).json({ message: 'Product created', product: newProduct })
  } catch (error) {
    res.status(500).json({ error: 'Error creating product', detalle: error.message })
  }
}

export const updatingProducto = async (req, res) => {
  try {
    const updating = await updateProduct(req.params.id, req.body);
    if (!updating) return res.status(404).json({ error: "Product not found" });
    res.json(updating);
  } catch (err) {
    res.status(500).json({ error: "Error updating product", detalle: err.message });
  }
};

export const deletingProducto = async (req, res) => {
  try {
    const deleting = await deleteProduct(req.params.id);
    if (!deleting) return res.status(404).json({ error: "Product not found" });
    res.json(deleting);
  } catch (err) {
    res.status(500).json({ error: "Error deleting product", detalle: err.message });
  }
};

export const allCategory = async (req, res) => {
  console.log("Se llamó a la ruta /category");
  try {
    const category = await getAllCategory();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error getting category', detalle: err.messag });
  }
};
