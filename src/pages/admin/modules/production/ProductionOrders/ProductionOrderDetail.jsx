import React, { useEffect, useState } from "react";

function ProductionOrderDetailsModal({ show, onClose, details }) {
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
    2: "En producción",
    3: "Terminado",
    4: "Cancelado"
  };

  // Helper function to get product name by ID
  const getProductNameById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Desconocido";
  };

  // Helper function to get state name by number
  const getStateNameByNumber = (number) => {
    return stateNames[number] || "Desconocido";
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalles de la Orden de Producción</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {details.productionOrderDetails.map((detail) => (
              <div key={detail.id}>
                <p>Número de Orden: {detail.idProductionOrder}</p>
                <p>Producto: {getProductNameById(detail.idProduct)}</p>
                <p>Cantidad: {detail.amount}</p>
                <p>Estado: {getStateNameByNumber(detail.state)}</p>
              </div>
            ))}
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

export default ProductionOrderDetailsModal;
