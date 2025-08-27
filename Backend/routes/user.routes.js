import { Router } from 'express'
import { pageNotFound, registrarUsuario } from '../src/controllers/user.controller.js';
import { loginUser } from '../src/controllers/auth.controller.js';


export const router = Router()

router.post('/register', registrarUsuario)
router.post('/login', loginUser)
router.use(pageNotFound)

export default router