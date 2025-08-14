import React, { useContext, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import '../styles/formularios.css';

const Login = () => {
  const { login } = useContext(UserContext);

  const [formulario, setFormulario] = useState({
    email: "",
    password: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formulario;
    if (!email.trim() || !password.trim()) {
      Swal.fire(
        "Error",
        "Debe ingresar un Email y Contraseña validos",
        "error"
      );
      return;
    }
    login(email, password);
  };

  return (
    <div>
      <Navbar />
    <div className="container">
      <section className="card p-4 shadow-sm mb-5">
        <h2 className="card-tittle text-center mb-4">Iniciar sesión</h2>
        <p className="text-center mb-5">
          ¡Bienvenido!, Ingresa tus datos para continuar.
        </p>
        <form>
          <div className="text-center mb-4">
            <label className="label-form fw-bold">Correo Electronico</label>
            <div className="input-group">
              <span className="input-group-text">
              <i className="bi bi-person-square"></i>
              </span>
            <input
              className="form-control"
              type="email"
              name="email"
              placeholder="Ingrese su correo electronico"
              value={formulario.email}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div className="text-center mb-4">
            <label className="label-form fw-bold">Contraseña</label>
            <div className="row">
              <div className="col-md-11">
                <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
              </span>
            <input
              className="form-control"
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Ingrese su contraseña"
              value={formulario.password}
              onChange={handleChange}
              required
              />
              </div>
            </div>
            <div className="col-md-1">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPass(!showPass)}
            >
              <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} `} />
            </button>
            </div>
            </div>
          </div>
          <div className="text-center">
            <button className="btn btn-dark" onClick={handleSubmit}>
              Ingresar
            </button>
          </div>
        </form>
      </section>
    </div>
    </div>
  );
};

export default Login;
