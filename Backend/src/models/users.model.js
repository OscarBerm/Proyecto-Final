import format from 'pg-format'
import pool from '../../db/config.js'

//Create User
export const createUserModel = async (nombre,apellido,email,password,direccion,telefono, imagen) => {
    const query = format(
        'insert into usuarios (nombre,apellido,email,password,direccion,telefono, imagen_url) values (%L,%L,%L,%L,%L,%L,%L)',
        nombre,apellido,email,password,direccion,telefono, imagen
    );
    const resultado = await pool.query(query);
    return resultado.rows[0];
}

//Buscar usuarios por mail
export const getUserByEmailModel = async (email) => {
    const query = format(
        'select * from usuarios where email = %L',
        email
    );
    const resultado = await pool.query(query);
    return resultado.rows[0];
}

