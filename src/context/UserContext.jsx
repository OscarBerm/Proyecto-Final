import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '../data/constants';


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
      usuario_id:'', 
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: '',
      imagen: ''
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const HOST = URL_BASE;


    //console.log('UserProvider token:', token)
  
    const clearUser = () => {
      setUser({
      usuario_id:'', 
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      direccion: ''
    });
    }

  const registrarUsuario = async (nombre,apellido,email,password,direccion,telefono) => {
     try {
     const URL = HOST+"/register";
     const datos = {nombre,apellido,email,password,direccion,telefono, imagen: '/img/usuario/default_perfil.png'}
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

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
  }, [token])


  const logout = () => {
    clearUser();
    setToken(null)
    localStorage.removeItem('token')
    console.log('Se cerro la sesion')
  }

    const stateGlobal = {
    user,
    logout,
    login,
    registrarUsuario,
    token
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
