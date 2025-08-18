import { Router } from 'express'
import { pageNotFound, registrarUsuario } from '../src/controllers/user.controller.js';
import { loginUser } from '../src/controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

export const router = Router()

router.post('/register', registrarUsuario);
router.post('/login', loginUser);

router.use(pageNotFound);