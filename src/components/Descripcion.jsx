import React from "react";
import '../styles/Descripcion.css';

const Descripcion = () => {
	return (
		<section className="descripcion-section">
			<div className="descripcion-content">
				<div className="descripcion-text">
					<h2>Sobre Café y Cuento</h2>
					<p>
						Café y Cuento es un e-commerce dedicado a los amantes del café que les gusta acompañarlo con una buena historia. 
                        Aquí encontrarás los mejores cafés y de todo tipo para acompañar tu experiencia cafetera. Descubre nuestros productos seleccionados y déjate sorprender por historias y sabores únicos.
					</p>
				</div>
				<div className="descripcion-logo">
					<img src="public/img/Cafe y Cuento (logo).png" alt="Logo Café y Cuento" />
				</div>
			</div>
		</section>
	);
};

export default Descripcion;
