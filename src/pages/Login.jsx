import React, { useContext, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import '../assets/css/formularios.css';

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
    <div className="container my-5">
      <section className="card p-4 shadow-sm mb-5">
        <h2 className="card-tittle text-center mb-4">Iniciar sesión</h2>
        <form>
          <div className="mb-3">
            <label className="label-form">Email</label>
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
          <div className="mb-3">
            <label className="label-form">Contraseña</label>
            <input
              className="form-control"
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Ingrese su contraseña"
              value={formulario.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary btn-sm mt-1"
              onClick={() => setShowPass(!showPass)}
            >
              <i className={`bi ${showPass ? "bi-eye-slash" : "bi-eye"} `} />
            </button>
          </div>
          <div className="text-center">
            <button className="btn btn-dark" onClick={handleSubmit}>
              Ingresar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
