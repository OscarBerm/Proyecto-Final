import { Router } from 'express'
import {
  allProducts,
  productById,
  registerProduct,
  updatingProducto,
  deletingProducto,
  allCategory,
} from "../src/controllers/products.controller.js";
import { verifyToken } from '../middleware/authMiddleware.js'
import { isAdmin } from '../middleware/isAdmin.js'
import { validateProductData } from '../middleware/productsMiddleware.js'

const router = Router()

router.get("/products/", allProducts)
router.get("/products/:id", productById)
router.post("/products/", verifyToken, isAdmin, validateProductData, registerProduct)
router.put("/products/:id", verifyToken, isAdmin, updatingProducto)
router.delete("/products/:id", verifyToken, isAdmin, deletingProducto)
router.get("/category/", allCategory)

export default router