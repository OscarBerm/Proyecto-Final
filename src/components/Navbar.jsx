import { Link } from "react-router-dom";
import '../styles/Navbar.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
	const logo = "/img/Cafe-y-Cuento(logo-sin-fondo).png"
	
	return (
		<nav className="navbar-cafe">
			<div className="navbar-content">
				<div className="navbar-left">
					<img src={logo} alt="Logo" className="navbar-logo" />
					<span className="navbar-brand">Café y Cuento</span>
				</div>
				<ul className="navbar-links">
					<li><Link to="/">Inicio</Link></li>
					<li><Link to="/products">Nuestros Productos</Link></li>
					<li><Link to="/contacto">Contáctanos</Link></li>
				</ul>
				<div className="navbar-actions">
					<Link to="/login"><button className="btn-login">Iniciar sesión</button></Link>
					<Link to="/register"><button className="btn-register">Registrarse</button></Link>
					   <Link to="/cart" className="btn-cart">
						   <i className="bi bi-cart4"></i>
					   </Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
