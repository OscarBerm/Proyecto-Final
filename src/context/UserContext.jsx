import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { URL_BASE } from '../data/constants';


export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const HOST = URL_BASE;


    console.log('UserProvider token:', token)

    useEffect(() => {
      const fetchUser = async () => {
        if (token) {
          try {
            const profile = await getProfile()
            setUser(profile)
          } catch (error) {
            console.error('Error al cargar el perfil al inicio:', error)
          }
        }
      }
      fetchUser()
    }, [])


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

  const login = async (email, password) => {
         try {
     const URL = HOST+"/login";
     const datos = {email,password}
       const response = await axios.post(URL,datos );
       setUser(response.data.usuario_id);
       setToken(response.data.token)
        Swal.fire('Exito', 'Sesión iniciada exitosamente','success');
     } catch (error) {
       Swal.fire("error","Usuario o Contraseña incorrectos","error");
       return;
     }
  }

  useEffect(() => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token')
  }, [token])


  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    console.log('Se cerro la sesion')
  }

  const getProfile = async () => {
    try {
      const response = await axios.get(`${HOST}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
      return response.data
    } catch (error) {
      console.error('No se pudo conseguir profile:', error)
      // Lanza el error para que el useEffect lo capture
      throw error
    }
  }

  const stateGlobal = {
    user,
    logout,
    login,
    registrarUsuario,
    getProfile,
    token
  }

  return (
    <UserContext.Provider value={stateGlobal}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider
