import React, { useContext, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from 'sweetalert2';
import { UserContext } from "../context/UserContext";

const Register = () => {

  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    direccion: "",
    telefono: "",
    imagen: "",
    rol: "",
  });
  const {registrarUsuario} = useContext(UserContext);

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const {nombre,apellido,email,password,direccion,telefono, imagen,rol} = formulario;

    if (!nombre.trim() || !apellido.trim() || !email.trim() || !password.trim() || !direccion.trim() || !telefono.trim() || !imagen.trim() || !rol.trim()) {
            Swal.fire('Error', 'Todos los campos deben estar llenos.', 'error')
            // console.log(nombre,apellido,email,password,direccion,telefono, imagen,rol)
            return
        }
    if (password !== formulario.password2){
        Swal.fire('Error', 'Las contraseñas no coinciden.', 'error')
        return
    }
    registrarUsuario(nombre,apellido,email,password,direccion,telefono, imagen,rol);
    
  };


  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-5">
      <section className="card p-4 shadow-sm mb-5">
        <h2 className="card-title text-center mb-4">
          Formulario de Creación de Productos
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formulario.nombre}
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Apellido:</label>
              <input
                type="text"
                name="apellido"
                placeholder="apellido"
                value={formulario.apellido}
                required
                onChange={handleChange}
                className="form-control"
             />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="Correo@mail.com"
              value={formulario.email}
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Direccion:</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ingrese su direccion"
              value={formulario.direccion}
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefono:</label>
            <input
              type="text"
              inputMode="numeric"
              name="telefono"
              placeholder="987654321"
              value={formulario.telefono}
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen:</label>
            <input
              type="text"
              name="imagen"
              placeholder="URL de la imagen"
              value={formulario.imagen}
              required
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Rol:</label>
            <select
              className="form-select mt-3"
              name="rol"
              value={formulario.value}
              required
              onChange={handleChange}
            >
              <option value="" selected disabled hidden>
                Seleccione un rol
              </option>
              <option value="admin">Administrador</option>
              <option value="user">Cliente</option>
            </select>
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="form-label">Contraseña:</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Ingrese su contraseña"
                value={formulario.password}
                required
                onChange={handleChange}
                className="form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Reingrese su contraseña:</label>
              <input
                type={showPass ? "text" : "password"}
                name="password2"
                placeholder="Reingrese la contraseña"
                value={formulario.password2}
                required
                onChange={handleChange}
                className={`form-control ${
                  formulario.password !== formulario.password2
                    ? "is-invalid"
                    : ""
                }`}
              />
              {formulario.password !== formulario.password2 && (
                <div className="invalid-feedback">
                  Las contraseñas no coinciden
                </div>
              )}
            </div>

            <div className="col-12 mt-2">
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={() => setShowPass(!showPass)}
              >
                <i
                  className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} me-2`}
                />
                {showPass ? "Ocultar contraseñas" : "Mostrar contraseñas"}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-dark">
              Registrarse
            </button>
          </div>
          
        </form>
      </section>
    </div>
  );
};

export default Register;
