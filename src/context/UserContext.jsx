import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'



export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null)


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
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(response.data)
      return response.data
    } catch (error) {
      console.error('No se pudo conseguir profile:', error)
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
