import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'

const ProductRegister = () => {
    const [product, setProduct] = useState({
        nombre: '',
        categoria: 'categoria1',
        cantidad: 1,
        precio: 0,
        imagenUrl: '',
        descripcion: ''
    })

    const [productsList, setProductsList] = useState([])

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const { name, value, type } = e.target
        setProduct({ 
            ...product, 
            [name]: type === 'number' ? parseFloat(value) : value 
        })
    }

    
    const handleCantidadChange = (change) => {
        setProduct((prevProduct) => {
            const newCantidad = prevProduct.cantidad + change
            return {
                ...prevProduct,
                cantidad: newCantidad > 0 ? newCantidad : 1
            }
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        const { nombre, categoria, cantidad, precio, imagenUrl, descripcion } = product
        
     
        if (!nombre.trim() || !categoria.trim() || !imagenUrl.trim() || !descripcion.trim()) {
            setError('Todos los campos deben estar llenos.');
            Swal.fire('Error', 'Todos los campos deben estar llenos.', 'error')
            setLoading(false)
            return
        }

        if (cantidad <= 0 || precio <= 0) {
            setError('La cantidad y el precio deben ser mayores a cero.')
            Swal.fire('Error', 'La cantidad y el precio deben ser mayores a cero.', 'error')
            setLoading(false)
            return
        }

       
        console.log('Datos del producto a registrar:', product)

        try {
            // await axios.post('/api/products', product)

            const newProduct = { ...product, id: uuidv4() }
            setProductsList((prevList) => [...prevList, newProduct])

            Swal.fire({
                icon: 'success',
                title: '¡Producto registrado!',
                text: 'El producto ha sido añadido a la lista.',
                timer: 2000,
                showConfirmButton: false
            })

            
            setProduct({
                nombre: '',
                categoria: 'categoria1',
                cantidad: 1,
                precio: 0,
                imagenUrl: '',
                descripcion: ''
            });

        } catch (error) {
            setError('Error al registrar el producto. Inténtalo de nuevo.')
            Swal.fire('Error', 'Error al registrar el producto. Inténtalo de nuevo.', 'error')
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="container my-5">

            <section className="card p-4 shadow-sm mb-5">
                <h2 className="card-title text-center mb-4">Formulario de Creación de Productos</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre del producto:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={product.nombre}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="categoria" className="form-label">Categoría:</label>
                            <select
                                name="categoria"
                                value={product.categoria}
                                onChange={handleChange}
                                className="form-select"
                                required
                            >
                                <option value="categoria1">Categoría 1</option>
                                <option value="categoria2">Categoría 2</option>
                                <option value="categoria3">Categoría 3</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                            <div className="input-group">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCantidadChange(-1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    name="cantidad"
                                    value={product.cantidad}
                                    onChange={handleChange}
                                    className="form-control text-center"
                                    min="1"
                                    required
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => handleCantidadChange(1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="precio" className="form-label">Precio:</label>
                        <input
                            type="number"
                            name="precio"
                            value={product.precio}
                            onChange={handleChange}
                            className="form-control"
                            min="0"
                            step="0.01"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imagenUrl" className="form-label">Imagen (URL):</label>
                        <input
                            type="url"
                            name="imagenUrl"
                            value={product.imagenUrl}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="https://ejemplo.com/imagen.jpg"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="descripcion" className="form-label">Descripción del producto:</label>
                        <textarea
                            name="descripcion"
                            value={product.descripcion}
                            onChange={handleChange}
                            className="form-control"
                            rows="3"
                            required
                        ></textarea>
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="btn btn-dark"
                            disabled={loading}
                        >
                            {loading ? 'Añadiendo...' : 'Añadir'}
                        </button>
                    </div>
                </form>
            </section>
            
           
            <section className="card p-4 shadow-sm">
                <h3 className="card-title text-center mb-4">Lista de Productos</h3>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Nombre del Producto</th>
                                <th>Categoría</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Imagen(URL)</th>
                                <th>Descripción</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productsList.length > 0 ? (
                                productsList.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.categoria}</td>
                                        <td>{item.cantidad}</td>
                                        <td>${item.precio.toFixed(2)}</td>
                                        <td><a href={item.imagenUrl} target="_blank" rel="noopener noreferrer">Ver Imagen</a></td>
                                        <td>{item.descripcion.length > 50 ? `${item.descripcion.substring(0, 50)}...` : item.descripcion}</td>
                                        <td className='d-flex flex-column'>
                                            <button className="btn btn-warning btn-sm me-2 mb-2">Editar</button>
                                            <button className="btn btn-danger btn-sm">Eliminar</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No hay productos registrados.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

export default ProductRegister