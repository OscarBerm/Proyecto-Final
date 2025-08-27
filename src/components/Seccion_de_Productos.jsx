import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Seccion_de_Productos.css';
import '../styles/Modal.css'
import { URL_BASE } from '../data/constants';
import Loading from "./Loading";

const Seccion_de_Productos = ({ cant, mostrarVerMas = false, categoriaSeleccionada, nombreCategoriaSeleccionada }) => {

	const API_URL = `${URL_BASE}/products`;

	const [productos, setProductos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectProduct, setSelectProduct] = useState(null);

	const navigate = useNavigate();

	const openModal = (product) => {
		setSelectProduct(product);
	};

	const closeModal = () => {
		setSelectProduct(null);
	};
	
	useEffect(() => {
		const fetchProductos = async () => {
			try {
			const response = await fetch(API_URL);
			const data = await response.json();
			setProductos(data.product); 
			} catch (error) {
			console.error("Error al cargar los productos:", error);
			} finally {
			setLoading(false);
			}
		};

		fetchProductos();
	}, []);

	const productosFiltrados = categoriaSeleccionada
		? productos.filter(prod => prod.categoria_id === categoriaSeleccionada)
		: productos;

	return (
		<section className="productos-section">
		<h2 className="productos-title">
			{categoriaSeleccionada
			? `Productos: ${nombreCategoriaSeleccionada}`
			: "Todos los productos"}
		</h2>

		{loading ? (
			<Loading />
		) : (
			<>
			<div className="productos-list">
				{productosFiltrados.slice(0, cant).map((prod, idx) => (
				<div className="producto-card" key={idx}>
					<div className="producto-img-container">
						<img src={prod.imagen_url} alt={prod.nombre} className="producto-img" />
						<button className="vista-previa-btn" onClick={() => openModal(prod)}>
							<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" height="18" width="18" className="" data-testid="icon-visibility"><path className="" fill="#6c4f37" fillRule="evenodd" clipRule="evenodd" d="M12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8ZM10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12Z"></path><path className="" fill="#6c4f37" fillRule="evenodd" clipRule="evenodd" d="M12 4C8.68793 4 6.31245 5.39172 4.71551 7.05809C3.14259 8.6994 2.31647 10.611 2.02986 11.7575C1.99005 11.9167 1.99005 12.0833 2.02986 12.2425C2.31647 13.389 3.14259 15.3006 4.71551 16.9419C6.31245 18.6083 8.68793 20 12 20C15.3121 20 17.6875 18.6083 19.2845 16.9419C20.8574 15.3006 21.6835 13.389 21.9701 12.2425C22.01 12.0833 22.01 11.9167 21.9701 11.7575C21.6835 10.611 20.8574 8.6994 19.2845 7.05809C17.6875 5.39172 15.3121 4 12 4ZM6.15949 15.5581C4.97234 14.3193 4.30739 12.8896 4.03753 12C4.30739 11.1104 4.97234 9.68067 6.15949 8.44191C7.43755 7.10828 9.31207 6 12 6C14.6879 6 16.5625 7.10828 17.8405 8.44191C19.0277 9.68067 19.6926 11.1104 19.9625 12C19.6926 12.8896 19.0277 14.3193 17.8405 15.5581C16.5625 16.8917 14.6879 18 12 18C9.31207 18 7.43755 16.8917 6.15949 15.5581Z"></path></svg>
						Vista previa
						</button>
					</div>
					<h3 className="producto-nombre">{prod.nombre}</h3>
					<p className="producto-desc">{prod.descripcion}</p>
					<span className="producto-precio">${parseFloat(prod.precio).toLocaleString('es-CL')}</span>
					<button className="producto-btn">Añadir</button>
					{/* <button className="producto-btn" 
					onClick={() => {navigate(`/products/${prod.id}`);}}>
					Editar</button> */}
				</div>
				))}
			</div>

			{mostrarVerMas && (
				<div className="productos-vermas">
				<Link className="btn btn-primary btn-lg" to="/products">
					Ver más productos
				</Link>
				</div>
			)}
			{selectProduct && (
			<div className="modal-producto-backdrop" onClick={closeModal}>
				<div className="modal-producto">
					<button className="modal-cerrar" onClick={closeModal}>×</button>
					<img src={selectProduct.imagen_url} alt={selectProduct.nombre} className="modal-img" />
					<div className="info">
						<h2>{selectProduct.nombre}</h2>
						<p>{selectProduct.descripcion}</p>
						<p>Precio:<strong>${parseFloat(selectProduct.precio).toLocaleString('es-CL')}</strong></p>
						<button className="producto-btn">Añadir</button>
					</div>
				</div>
			</div>
			)}
			</>
		)}
		</section>
	);
};

export default Seccion_de_Productos;