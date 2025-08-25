import React, { useContext, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import Navbar from "../components/Navbar";
import "../styles/Formularios.css";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
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
    login(email, password, () => navigate("/profile"));
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <section className="login-card">
          <h2 className="login-title text-center">Iniciar sesión</h2>
          <p className="login-text text-center">
            ¡Bienvenido!, Ingresa tus datos para continuar.
          </p>
          <form>
            <div className="mb-4">
              <label className="login-label">Correo Electrónico</label>
              <div className="input-group">
                <span className="input-group-text login-input-group-icon">
                  <i className="bi bi-person-square"></i>
                </span>
                <input
                  className="login-input form-control"
                  type="email"
                  name="email"
                  placeholder="Ingrese su correo electrónico"
                  value={formulario.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="login-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text login-input-group-icon">
                  <i className="bi bi-lock-fill"></i>
                </span>
                <input
                  className="login-input form-control"
                  type={showPass ? "text" : "password"}
                  name="password"
                  placeholder="Ingrese su contraseña"
                  value={formulario.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="login-eye-btn"
                  onClick={() => setShowPass(!showPass)}
                  tabIndex={-1}
                >
                  <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"}`} />
                </button>
              </div>
            </div>
            <div className="text-center">
              <button className="login-btn" onClick={handleSubmit}>
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
