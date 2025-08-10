import { createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

export const UserContext = createContext()
export const UserContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    // const HOST = "http://localhost:5000";

  const registrarUsuario = async (nombre,apellido,email,password,direccion,telefono, imagen,rol) => {
    // try {
    // const URL = HOST+"/api/auth/login";
    // const datos = {nombre,apellido,email,password,direccion,telefono, imagen,rol}
    //   const response = await axios.post(URL,datos );
    //   setUser(response.data);
    // } catch (error) {
    //   Swal.fire('Error', 'Error al registrar al usuario', 'error')
    //   return;
    // }
    Swal.fire('Usuario registrado', 'El usuario ha sido registrado correctamente', 'success');
  };

  const login = async (email, password) => {
    //     try {
    // const URL = HOST+"/api/auth/login";
    // const datos = {email,password}
    //   const response = await axios.post(URL,datos );
    //   setUser(response.data);
    // } catch (error) {
    //   Swal.fire("error","Usuario o Contraseña incorrectos","error");
    //   return;
    // }
    Swal.fire('Exito', 'Sesión iniciada exitosamente','success');
  }


    return (
        <UserContext.Provider value={{registrarUsuario, login, user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
