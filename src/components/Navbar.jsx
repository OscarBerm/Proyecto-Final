import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UserContext } from '../context/UserContext'
import { useContext } from "react";
import Swal from "sweetalert2";


const Navbar = () => {
  const logo = "/img/Cafe-y-Cuento(logo-sin-fondo).png";
	const { token, logout} = useContext(UserContext);
  const navigate = useNavigate();

const handleLogout = () => {
		Swal.fire({
			title: '¿Estás seguro?',
			text: '¿Deseas cerrar sesión?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#dc3545', 
			cancelButtonColor: '#6c757d',
			confirmButtonText: 'Sí, cerrar sesión',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				logout();
				navigate('/login')
			}
		})
	}

  return (
    <nav className="navbar-cafe">
      <div className="navbar-content">
        <div className="navbar-left">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
        <ul className="navbar-links">
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/products">Nuestros Productos</Link>
          </li>
          <li>
            <Link to="/contacto">Contáctanos</Link>
          </li>
        </ul>
        <div className="navbar-actions">
          {token ? (
            <>
                <button className="btn-login" onClick={handleLogout}>Logout</button>
              <Link to="/Profile">
                <button className="btn-login">Perfil</button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn-login">Iniciar sesión</button>
              </Link>
              <Link to="/register">
                <button className="btn-register">Registrarse</button>
              </Link>
            </>
          )}

          <Link to="/cart" className="btn-cart">
            <i className="bi bi-cart4"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
