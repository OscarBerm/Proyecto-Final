import { Router } from 'express'
import { registrarUsuario } from '../src/controllers/userController';

const router = Router()

router.post('/register', registrarUsuario);

export default router;