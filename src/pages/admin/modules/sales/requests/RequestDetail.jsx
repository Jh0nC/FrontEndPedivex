import React, { useEffect, useState } from "react";

function RequestDetailsModal({ show, onClose, details }) {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch para obtener usuarios
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    // Fetch para obtener productos
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));

    // Crear un enlace para el CDN de Bootstrap
    const link = document.createElement("link");
    link.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
    link.id = "bootstrap-css"; // Añadido id para limpiar después

    // Agregar el enlace al documento
    document.head.appendChild(link);

    // Limpiar el enlace cuando el componente se desmonte
    return () => {
      const linkElement = document.getElementById("bootstrap-css");
      if (linkElement) {
        document.head.removeChild(linkElement);
      }
    };
  }, []);

  if (!show) return null;

  // Helper functions to get names
  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Desconocido";
  };

  const getProductNameById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Desconocido";
  };

  // Helper function to get state name by ID
  const getStateNameById = (id) => {
    const states = {
      4: "Pendiente",
      7: "Terminado",
      3: "Cancelado",
    };
    return states[id] || "Desconocido";
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Detalles del Pedido #{details.id}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p><strong>Usuario:</strong> {getUserNameById(details.idUser)}</p>
            <p><strong>Total:</strong> {details.total}</p>
            <p><strong>Estado:</strong> {getStateNameById(details.state)}</p>
            <p><strong>Fecha de Creación:</strong> {details.creationDate}</p>
            <p><strong>Fecha Límite:</strong> {details.deadLine}</p>
            <p><strong>Fecha de Estado:</strong> {details.stateDate}</p>

            {details.requestDetails && details.requestDetails.length > 0 ? (
              details.requestDetails.map((detail) => (
                <div key={detail.idProduct} className="card mb-3">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Producto:</strong> {getProductNameById(detail.idProduct)}
                    </p>
                    <p className="card-text">
                      <strong>Cantidad:</strong> {detail.quantity}
                    </p>
                    <p className="card-text">
                      <strong>Subtotal:</strong> {detail.subtotal}
                    </p>
                    <p className="card-text">
                      <strong>Total:</strong> {detail.total}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay detalles disponibles.</p>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestDetailsModal;
