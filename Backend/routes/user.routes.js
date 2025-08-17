import { Router } from 'express'
import { registrarUsuario } from '../src/controllers/user.controller.js';

export const router = Router()

router.post('/register', registrarUsuario);

