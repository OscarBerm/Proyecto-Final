import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import { getUserByEmailModel } from '../models/users.model.js';

export const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body || {};
        
        if(!email || !password){
            return res.status(400).send("Debes ingresar tu Direccion de correo electronico y contraseña");
        }

        const user = await getUserByEmailModel(email);
        
        if(!user){
            return res.status(400).send("Error, Usuario o Contraseña incorrecta.")
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(400).send("Error, Usuario o Contraseña incorrecta.")            
        }

    const token = jwt.sign({ email, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    // Retornar para el frontend
    return res.status(200).json({ 
        usuario_id: user.id, 
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        telefono: user.telefono,
        direccion: user.direccion,
        imagen: user.imagen_url,
        rol: user.rol, 
        token });
    }catch(e){
        return res.status(500).json({Error: e.Error, Mensaje: e.message})
    }
}

