import { createProduct } from '../models/productModel.js'
import { v4 as uuidv4 } from 'uuid'

export const registerProduct = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, imagen_url, categoria_id } = req.body
    
    // Generamos un SKU único para el producto
    const sku = uuidv4(); 
    
    const creado_por = req.userId

    const newProduct = await createProduct(
      nombre, descripcion, precio, stock, sku, imagen_url, categoria_id, creado_por)

    res.status(201).json({ message: 'Producto creado correctamente', product: newProduct })
  } catch (error) {
    console.error('Error al registrar producto:', error);
    res.status(500).json({ error: 'Error interno del servidor al registrar el producto.' })
  }
}