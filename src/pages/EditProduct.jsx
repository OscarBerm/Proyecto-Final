import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import '../styles/EditProduct.css'
import { URL_BASE } from '../data/constants';
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const EditProduct = () => {
  const API_URL = `${URL_BASE}/products/`;
  const { token } = useContext(UserContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [nombreInicial, setNombreInicial] = useState('');

  useEffect(() => {
  const fetchProducto = async () => {
      try {
      const response = await fetch(`${API_URL}${id}`);
      const data = await response.json();
      setProducto(data.product);
      setNombreInicial(data.product.nombre);
      } catch (error) {
      console.error("Error al obtener el producto:", error);
      }
  };
  fetchProducto();
  }, [id]);

  const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
          setProducto(prev => ({
          ...prev,
          [name]: type === 'checkbox' ? checked : value
          }));
  };
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
      const response = await fetch(`${API_URL}${id}`, {
          method: "PUT",
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(producto)
      });

      const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: "Error al actualizar producto"
        });
      } else {
        Toast.fire({
          icon: "success",
          title: "Producto Actualizado"
        }).then(() => {
          navigate("/products");
        });
      }
      } catch (error) {
      console.error("Error al enviar los datos:", error);
      }
  };

  if (!producto) return <><Loading /></>;

  return (
  <>
    <Navbar />
    <div className="edit">
      <form className="form-edit" onSubmit={handleSubmit}>
      <h2 className="tit-edit">Editar producto: {nombreInicial}</h2>
        <div>
          <label className="label-edit">Nombre:</label>
          <input
            className="input-edit"
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label className="label-edit">Descripcion:</label>
          <input
            className="input-edit"
            type="text"
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
            />
        </div>

        <div>
          <label className="label-edit">Precio:</label>
          <input
            className="input-edit"
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label-edit">Stock:</label>
          <input
            className="input-edit"
            type="number"
            name="stock"
            value={producto.stock}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="label-edit">Imagen URL:</label>
          <input
            className="input-edit"
            type="text"
            name="imagen_url"
            value={producto.imagen_url}
            onChange={handleChange}
          />
        </div>

        <div>
          <span className="check-tit">Activo:</span>
          <label className="switch">
          <input
            type="checkbox"
            name="activo"
            checked={producto.activo}
            onChange={handleChange}
            />
            <span className="slider"></span>
          </label>
        </div>
        
        <div className="btn-group">
          <button className="producto-btn btn-edit" type="submit">Guardar cambios</button>
          <button className="producto-btn btn-cancel" type="button"
          onClick={() => {navigate(`/products`);}}>Cancelar</button>
        </div>
      </form>
    </div>
  </>
  );
};

export default EditProduct;