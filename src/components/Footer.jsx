import React from "react";
import '../styles/Footer.css';

const Footer = () => {
	return (
		<footer className="footer-cafe">
			<div className="footer-content">
				<div className="footer-left">
					<img src="public/img/Cafe y Cuento (logo sin fondo).png" alt="Logo" className="footer-logo" />
				</div>
				<ul className="footer-links">
					<li><a href="#perfil">Mi Perfil</a></li>
					<li><a href="#productos">Productos</a></li>
					<li><a href="#contacto">Contáctanos</a></li>
				</ul>
				<div className="footer-social">
					<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><i className="bi bi-facebook"></i></a>
					<a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><i className="bi bi-instagram"></i></a>
					<a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-icon"><i className="bi bi-twitter"></i></a>
				</div>
			</div>
			<div className="footer-copy">
				© {new Date().getFullYear()} Café y Cuento. Todos los derechos reservados.
			</div>
		</footer>
	);
};

export default Footer;
