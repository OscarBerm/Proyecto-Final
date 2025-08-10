import React from "react";
import Navbar from "../components/Navbar";
import Categorias from "../components/Categorias";
import Seccion_de_Productos from "../components/Seccion_de_Productos";
import Descripcion from "../components/Descripcion";
import Footer from "../components/Footer";
import '../styles/Home.css';
import { Link } from "react-router-dom";

const Home = () => {
	
	return (
		<div>
			<Navbar />
			<div className="hero-section">
				<div className="hero-content">
					<h1>Bienvenido a Café y Cuento</h1>
					<p>Descubre los mejores cafés y déjate envolver por historias únicas. ¡Disfruta la experiencia!</p>
					<Link to="/products" className="btn btn-primary btn-lg">Ver productos</Link>
				</div>
			</div>
            <Categorias />
            <Seccion_de_Productos cant={5} mostrarVerMas={true} />
            <Descripcion />
            <Footer />
		</div>
	);
};

export default Home;
