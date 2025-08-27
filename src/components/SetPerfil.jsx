import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import "../styles/Login.css";


const SetPerfil = () => {

    const { user, modificarUsuario } = useContext(UserContext);
    const [nuevoUsuario, setNuevoUsuario] = useState({
        nombre: user?.nombre || "",
        apellido: user?.apellido || "",
        email: user?.email || "",
        telefono: user?.telefono || "",
        direccion: user?.direccion || "",
        imagen: user?.imagen || "",
    });
    const [error, setError] = useState(false);


    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const validaForm = () => {
        const { nombre, apellido, email, telefono, direccion } = nuevoUsuario;
        const camposVacio =
            !nombre.trim() ||
            !apellido.trim() ||
            !email.trim() ||
            !telefono.trim() ||
            !direccion.trim();
        setError(camposVacio);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (error) {
            Swal.fire("Alerta", "Debe llenar todos los campos", "error");
            return;
        }

            const {
      nombre,
      apellido,
      email,
      telefono,
      direccion
    } = nuevoUsuario;
    modificarUsuario(nombre,apellido,email,telefono,direccion);
    }

        const handleChange = (e) => {
            setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
        };

        if (!user) {
            return null;
        }

        return (
            <>
                <Navbar />
                <div className="container-fluid bg-light vh-100 p-0">
                    <main className="container my-5">
                        {/* Sección "Mi perfil" */}
                        <section className="bg-white p-4 rounded shadow-sm mb-5">
                            <h2 className="mb-4">Mi perfil</h2>
                            <hr />

                            <div className="row g-4 align-items-start">
                                {/* Columna de la imagen de perfil */}
                                <div className="col-md-3 text-center">
                                    <div
                                        className="bg-light border border-secondary d-flex justify-content-center align-items-center mb-3"
                                        style={{ width: "150px", height: "150px", margin: "0 auto" }}
                                    >
                                        {/* Aquí iría la imagen de perfil del usuario */}
                                        <img
                                            src={
                                                nuevoUsuario.imagen || "/img/usuario/default_perfil.png"
                                            }
                                            alt="Imagen de perfil"
                                            className="img-fluid"
                                        />
                                    </div>
                                    {/* <button className="btn btn-dark w-75 mb-3">
                  Añadir imagen
                </button> */}
                                </div>

                                <div className="col-md-6">
                                    <div className="row mb-2">
                                        <div className="col">
                                            <strong>Nombre:</strong>
                                            <input
                                                type="text"
                                                name="nombre"
                                                className="login-input form-control"
                                                value={nuevoUsuario.nombre}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <strong>Apellido:</strong>
                                            <input
                                                type="text"
                                                name="apellido"
                                                className="login-input form-control"
                                                value={nuevoUsuario.apellido}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-2">
                                        <div className="col">
                                            <strong>Correo:</strong>
                                            <input
                                                type="text"
                                                name="email"
                                                className="login-input form-control"
                                                value={nuevoUsuario.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col">
                                            <strong>Teléfono:</strong>
                                            <input
                                                type="text"
                                                name="telefono"
                                                className="login-input form-control"
                                                value={nuevoUsuario.telefono}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <strong>Dirección:</strong>
                                        <input
                                            type="text"
                                            name="direccion"
                                            className="login-input form-control"
                                            value={
                                                nuevoUsuario.direccion || "XXXXXXXX xx XXXXXX 000, XXXXX."
                                            }
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <button className="btn btn-dark me-2" disabled >Guardar</button>
                                        <button className="btn btn-dark me-2" onClick={() => {navigate("/Profile")}} >volver</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                </div>
            </>
        );
    };

    export default SetPerfil;
