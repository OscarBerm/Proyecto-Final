import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
	return (
		<nav className="navbar-cafe">
			<div className="navbar-content">
				<div className="navbar-left">
					<img src="public/img/Cafe y Cuento (logo sin fondo).png" alt="Logo" className="navbar-logo" />
					<span className="navbar-brand">Café y Cuento</span>
				</div>
				<ul className="navbar-links">
					<li><Link to="/">Inicio</Link></li>
					<li><Link to="/products">Nuestros Productos</Link></li>
					<li><Link to="/contacto">Contáctanos</Link></li>
				</ul>
				<div className="navbar-actions">
					<button className="btn-login">Iniciar sesión</button>
					<Link to="/register"><button className="btn-register">Registrarse</button></Link>
					<button className="btn-cart">
						<i className="bi bi-cart4"></i>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
