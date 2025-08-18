import { Router } from 'express'
import { pageNotFound, registrarUsuario } from '../src/controllers/user.controller.js';

export const router = Router()

router.post('/register', registrarUsuario);

router.use(pageNotFound);