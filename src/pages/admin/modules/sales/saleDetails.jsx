import React, { useEffect, useState } from "react";

function SaleDetailsModal({ show, onClose, details }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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

  // Mapeo de estados
  const stateNames = {
    1: "Pendiente",
    2: "Pagada",
    3: "Cancelada",
    4: "Devuelta",
  };

  // Helper function to get product name by ID
  const getProductNameById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Desconocido";
  };

  // Obtener el número de la venta
  const saleNumber = details.saleDetails.length
    ? details.saleDetails[0].idSale
    : "Desconocido";

  // Obtener la fecha de venta
  const saleDate = details.saleDate || "Desconocida";

  // Obtener el cliente
  const customerName = details.customer || "Desconocido";

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalles de la Venta #{saleNumber}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Cliente:</strong> {customerName}
            </p>
            <p>
              <strong>Fecha de Venta:</strong> {new Date(saleDate).toLocaleDateString()}
            </p>
            {details.saleDetails.map((detail) => (
              <div key={detail.id} className="card mb-3">
                <div className="card-body">
                  <p className="card-text">
                    <strong>Producto:</strong> {getProductNameById(detail.idProduct)}
                  </p>
                  <p className="card-text">
                    <strong>Cantidad:</strong> {detail.amount}
                  </p>
                  <p className="card-text">
                    <strong>Precio Unitario:</strong> ${detail.price.toFixed(2)}
                  </p>
                  <p className="card-text">
                    <strong>Estado:</strong> {stateNames[detail.state] || "Desconocido"}
                  </p>
                  <p className="card-text">
                    <strong>Total:</strong> ${(detail.amount * detail.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary rounded-5"
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

export default SaleDetailsModal;
