import { Router } from 'express'
import { registerProduct } from '../controllers/productsController.js'
import { verifyToken } from '../middleware/authMiddleware.js'
import { validateProductData } from '../middleware/productsMiddleware.js'

const router = Router()

router.post('/products', verifyToken, validateProductData, registerProduct)

export default router