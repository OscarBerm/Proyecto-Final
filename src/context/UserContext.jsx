import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '../data/constants';


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const HOST = URL_BASE;


    //console.log('UserProvider token:', token)

  const registrarUsuario = async (nombre,apellido,email,password,direccion,telefono) => {
     try {
     const URL = HOST+"/register";
     const datos = {nombre,apellido,email,password,direccion,telefono}
       const response = await axios.post(URL,datos );
       setUser(response.data);
       Swal.fire('Exito', 'Usuarios registrado exitosamente','success');
     } catch (error) {
       Swal.fire('Error', 'Error al registrar al usuario', 'error')
       return;
     }
  };

  const login = async (email, password, onSuccess) => {
         try {
     const URL = HOST+"/login";
     const datos = {email,password}
       const response = await axios.post(URL,datos );
       console.log(response.data)
       setUser(response.data);
       setToken(response.data.token)
       Swal.fire('Exito', 'Sesión iniciada exitosamente','success');
       if (onSuccess) onSuccess();
     } catch (error) {
       Swal.fire("error","Usuario o Contraseña incorrectos","error");
       return;
     }
  }

  const modificarUsuario = async (nombre,apellido,email,telefono,direccion) => {
     try {
     const URL = HOST+"/users/"+user.id;
     const datos = {nombre,apellido,email,telefono,direccion}
       const response = await axios.put(URL,datos );
       setUser(response.data);
       Swal.fire('Exito', 'Usuario modificado exitosamente','success');
     } catch (error) {
       Swal.fire('Error', 'Error al modificar el usuario', 'error')
       return;
     }
  };

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
  }, [token, user])


  const logout = () => {
    setUser(null);
    setToken(null)
    localStorage.removeItem('token')
    Swal.fire('Exito','Se cerro la sesion', 'success')
  }

    const stateGlobal = {
    user,
    logout,
    login,
    registrarUsuario,
    modificarUsuario,
    token
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
