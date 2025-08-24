import { Link } from "react-router-dom";
import '../styles/Footer.css';

const Footer = () => {
	const logo = "/img/Cafe-y-Cuento(logo-sin-fondo).png"

	return (
		<footer className="footer-cafe">
			<div className="footer-content">
				<div className="footer-left">
					<img src={logo} alt="Logo" className="footer-logo" />
				</div>
				<ul className="footer-links">
					  <li><Link to="/">Inicio</Link></li>
					  <li><Link to="/products">Nuestros Productos</Link></li>
					  <li><Link to="/contacto">Contáctanos</Link></li>
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
