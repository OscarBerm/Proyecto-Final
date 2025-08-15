import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import '../styles/GraciasPorTuCompra.css';

const GraciasPorTuCompra = () => {
  return (
    <>
      <Navbar />
      <section className="gracias-section">
        <h2 className="gracias-titulo">¡Gracias por tu compra!</h2>
        <p className="gracias-texto">
          Te mantendremos informado del estado de tu compra mediante tu correo electrónico.
        </p>
        <Link to="/" className="gracias-btn">Volver al inicio</Link>
      </section>
    </>
  );
};

export default GraciasPorTuCompra;
