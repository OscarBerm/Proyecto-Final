import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const Profile = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/login");
      }
    });
  };

  const purchaseHistory = [
    {
      id: 1,
      productName: "Nombre del producto",
      description: "Lorem ipsum dolor sit amet electus.",
      price: "XX.XXX",
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light vh-100 p-0">
        <main className="container my-5">
          {/* Sección "Mi perfil" */}
          <section className="bg-white p-4 rounded shadow-sm mb-5">
            <h2 className="mb-4">Mi perfil</h2>
            <hr />
            <div className="row g-4 align-items-start">
              {/* Columna de la imagen de perfil */}
              <div className="col-md-3 text-center">
                <div
                  className="bg-light border border-secondary d-flex justify-content-center align-items-center mb-3"
                  style={{ width: "150px", height: "150px", margin: "0 auto" }}
                >
                  {/* Aquí iría la imagen de perfil del usuario */}
                  <span className="text-secondary">Imagen</span>
                </div>
                <button className="btn btn-dark w-75 mb-3">
                  Añadir imagen
                </button>
              </div>

              <div className="col-md-6">
                <div className="row mb-2">
                  <div className="col">
                    <strong>Nombre:</strong>
                    <p className="mb-0">{user.name || "XXXXXXXX"}</p>
                  </div>
                  <div className="col">
                    <strong>Apellido:</strong>
                    <p className="mb-0">{user.lastName || "XXXXXXXX"}</p>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <strong>Correo:</strong>
                    <p className="mb-0">{user.email}</p>
                  </div>
                  <div className="col">
                    <strong>Teléfono:</strong>
                    <p className="mb-0">{user.phone || "0000-0000-0000"}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <strong>Dirección:</strong>
                  <p className="mb-0">
                    {user.address || "XXXXXXXX xx XXXXXX 000, XXXXX."}
                  </p>
                </div>
                <div className="mt-4">
                  <button className="btn btn-dark me-2">Editar</button>
                  <button className="btn btn-danger" onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-4 rounded shadow-sm">
            <h2 className="mb-4">Historial de Compras</h2>
            <hr />
            {purchaseHistory.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center border-bottom py-3"
              >
                <div
                  className="me-4 bg-light border"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="img-fluid"
                  />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mb-1">{item.productName}</h5>
                  <p className="text-muted mb-0">{item.description}</p>
                </div>
                <div className="text-center me-4">
                  <strong className="d-block">${item.price}</strong>
                </div>
                <div className="text-center me-4">
                  <small>x{item.quantity}</small>
                </div>
                <button className="btn btn-dark">Comprar de nuevo</button>
              </div>
            ))}
          </section>
        </main>
      </div>
    </>
  );
};

export default Profile;
