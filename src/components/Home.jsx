import React from "react";
import Navbar from "./Navbar";
import Categorias from "./Categorias";
import Seccion_de_Productos from "./Seccion_de_Productos";
import Descripcion from "./Descripcion";
import Footer from "./Footer";
import '../styles/Home.css';

const Home = () => {
	return (
		<div>
			<Navbar />
			<div className="hero-section">
				<div className="hero-content">
					<h1>Bienvenido a Café y Cuento</h1>
					<p>Descubre los mejores cafés y déjate envolver por historias únicas. ¡Disfruta la experiencia!</p>
					<a href="#productos" className="btn btn-primary btn-lg">Ver productos</a>
				</div>
			</div>
            <Categorias />
            <Seccion_de_Productos />
            <Descripcion />
            <Footer />
		</div>
	);
};

export default Home;
