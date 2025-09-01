import React, { useContext, useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import '../styles/Formularios.css';
import '../styles/Register.css';
import Navbar from "../components/Navbar";

const Register = () => {

  const { registrarUsuario } = useContext(UserContext);
  
  const [formulario, setFormulario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    password2: "",
    direccion: "",
    telefono: ""
  });

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState({ campos: false, pass: false, passLength:false});

  const validaForm = () => {
    const {
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono
    } = formulario;

    const camposVacio =
      !nombre.trim() ||
      !apellido.trim() ||
      !email.trim() ||
      !password.trim() ||
      !direccion.trim() ||
      !telefono.trim();

      const pass = password !== formulario.password2;

      const passLength = formulario.password.length > 0 && formulario.password.length < 6; 
    setError({ campos: camposVacio, pass: pass, passLength : passLength });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error.campos) {
      Swal.fire("Alerta", "Debe llenar todos los campos", "error");
      return;
    }
    if (error.pass) {
      Swal.fire("Alerta", "Las contraseñas deben ser iguales", "error");
      return;
    }

    const {
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono
    } = formulario;

    registrarUsuario(
      nombre,
      apellido,
      email,
      password,
      direccion,
      telefono
    );
    setFormulario({
      nombre: "",
      apellido: "",
      email: "",
      password: "",
      password2: "",
      direccion: "",
      telefono: ""
    });

  };

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    validaForm();
  }, [formulario]);

  return (
    <div>
      <Navbar />
      <div className="register-container">
        <section className="register-card">
          <h2 className="register-title text-center mb-4">
            Crear Cuenta
          </h2>
          <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="register-label">Nombre:</label>
              <input
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formulario.nombre}
                required
                onChange={handleChange}
                className="register-input form-control"
              />
            </div>

            <div className="col-md-6">
              <label className="register-label">Apellido:</label>
              <input
                type="text"
                name="apellido"
                placeholder="Apellido"
                value={formulario.apellido}
                required
                onChange={handleChange}
                className="register-input form-control"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="register-label">E-mail:</label>
            <input
              type="email"
              name="email"
              placeholder="Correo@mail.com"
              value={formulario.email}
              required
              onChange={handleChange}
              className="register-input form-control"
            />
          </div>

          <div className="mb-3">
            <label className="register-label">Dirección:</label>
            <input
              type="text"
              name="direccion"
              placeholder="Ingrese su dirección"
              value={formulario.direccion}
              required
              onChange={handleChange}
              className="register-input form-control"
            />
          </div>

          <div className="mb-3">
            <label className="register-label">Teléfono:</label>
            <input
              type="text"
              inputMode="numeric"
              name="telefono"
              placeholder="987654321"
              value={formulario.telefono}
              required
              onChange={handleChange}
              className="register-input form-control"
            />
          </div>

          <div className="row mb-4">
            <div className="col-md-6">
              <label className="register-label">Contraseña:</label>
              <input
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Ingrese su contraseña"
                value={formulario.password}
                required
                onChange={handleChange}
                className={`register-input form-control ${error.passLength && "is-invalid"}`}
              />
              {error.passLength && (
                <div className="invalid-feedback">
                  La contraseña debe ser igual o mayor a 6 caracteres
                </div>
              )}
            </div>

            <div className="col-md-6">
              <label className="register-label">Reingrese su contraseña:</label>
              <input
                type={showPass ? "text" : "password"}
                name="password2"
                placeholder="Reingrese la contraseña"
                value={formulario.password2}
                required
                onChange={handleChange}
                className={`register-input form-control ${error.pass ? "is-invalid" : ""}`}
              />
              {error.pass && (
                <div className="invalid-feedback">
                  Las contraseñas no coinciden
                </div>
              )}
            </div>

            <div className="col-12 mt-2">
              <button
                type="button"
                className="register-eye-btn btn btn-outline-secondary btn-sm"
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
            <button
              type="submit"
              className="register-btn"
              disabled={error.campos || error.pass}
            >
              Registrarse
            </button>
            {(error.pass || error.campos) && (
              <div
                className="text-danger small mt-1"
                style={{ fontSize: "0.8rem" }}
              >
                <i className="bi bi-exclamation-circle me-1"></i>
                Complete todos los campos correctamente
              </div>
            )}
          </div>
        </form>
      </section>
    </div>
    </div>
  );
};

export default Register;
