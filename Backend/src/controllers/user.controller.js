import { createUserModel, getUserByEmailModel } from "../models/users.model.js";
import { isValidEmail } from "../helpers/helpers.js";
import bcrypt from "bcryptjs";


export const registrarUsuario = async (req, res) => {
  const { nombre, apellido, email, password, direccion, telefono } =
    req.body || {};

  //validaciones
  if (!nombre || !apellido || !email || !password || !direccion || !telefono) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if(!isValidEmail(email)) {
    return res.status(400).json({ error: "El email no es válido" });
  }
  if (await getUserByEmailModel(email)) {
    return res.status(400).json({ error: "El email ya está en uso" });
  }

  //Crear usuario
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    console.log({ nombre, apellido, email, passwordHash, direccion, telefono });
    const nuevoUsuario = await createUserModel(
      nombre,
      apellido,
      email,
      passwordHash,
      direccion,
      telefono,
    );
    res.status(201).json({ mensaje: "Usuario creado.", nuevoUsuario });
  } catch (e) {
    res.status(500).json({ error: "Error al crear el usuario" , e});
  }
};


//Manejo de rutas no encontradas
export const pageNotFound = async (req, res) => {
    res.status(404).send('La ruta solicitada no existe.');
};