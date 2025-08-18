import { Router } from 'express'
import {
  allProducts,
  productById,
  registerProduct,
  updatingProducto,
  deletingProducto,
} from "../src/controllers/products.controller.js";
// import { verifyToken } from '../middleware/authMiddleware.js'
// import { validateProductData } from '../middleware/productsMiddleware.js'

const router = Router()

router.get("/products/", allProducts);
router.get("/products/:id", productById);
router.post("/products/", registerProduct);
router.put("/products/:id", updatingProducto);
router.delete("/products/:id", deletingProducto);

// router.post('/products', verifyToken, validateProductData, registerProduct)

export default router;