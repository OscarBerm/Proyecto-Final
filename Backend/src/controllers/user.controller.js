import { createUserModel, getUserByEmailModel } from "../models/users.model.js"
import { isValidEmail } from "../helpers/helpers.js"
import bcrypt from "bcryptjs"

export const getProfile = async (req, res) => {
    try {
        const { email } = req.user

        if (!email) {
            return res.status(401).json({ error: "Token inválido o falta el email del usuario." })
        }

        const user = await getUserByEmailModel(email);

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado." })
        }
        
        const { password, ...userData } = user;
        
        res.status(200).json(userData);
    } catch (error) {
        console.error("Error al obtener el perfil del usuario:", error);
        res.status(500).json({ error: "Error interno del servidor al obtener el perfil." })
    }
}

export const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, password, direccion, telefono } =
    req.body || {};

 
  if (!nombre || !apellido || !email || !password || !direccion || !telefono) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" })
  }
  if(!isValidEmail(email)) {
    return res.status(400).json({ error: "El email no es válido" })
  }
  if (await getUserByEmailModel(email)) {
    return res.status(400).json({ error: "El email ya está en uso" })
  }


  try {
    const passwordHash = await bcrypt.hash(password, 10)
    console.log({ nombre, apellido, email, passwordHash, direccion, telefono })
    const nuevoUsuario = await createUserModel(
      nombre,
      apellido,
      email,
      passwordHash,
      direccion,
      telefono,
    );
    res.status(201).json({ mensaje: "Usuario creado.", nuevoUsuario })
  } catch (e) {
    res.status(500).json({ error: "Error al crear el usuario" , e})
  }
}


//Manejo de rutas no encontradas
export const pageNotFound = async (req, res) => {
    res.status(404).send('La ruta solicitada no existe.')
}