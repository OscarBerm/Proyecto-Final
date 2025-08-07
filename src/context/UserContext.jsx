import { createContext, useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';

export const UserContext = createContext()
export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);


  const registrarUsuario = async (nombre,apellido,email,password,direccion,telefono, imagen,rol) => {
    // try {
    // const datos = {nombre,apellido,email,password,direccion,telefono, imagen,rol}
    //   const response = await axios.post('/api/auth/register',datos );
    //   setUser(response.data);
    // } catch (error) {
    //   alert("Error al registrar al usuario")
    //   Swal.fire('Error', 'Todos los campos deben estar llenos.', 'error')
    // }
    Swal.fire('Usuario registrado', 'El usuario ha sido registrado correctamente', 'success');
  };




    return (
        <UserContext.Provider value={{registrarUsuario, user}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
