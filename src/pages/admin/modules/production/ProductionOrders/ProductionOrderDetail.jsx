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

  // Función corregida para formatear fechas utilizando Date
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    } catch (error) {
      console.error("Error al formatear la fecha:", error);
      return "Fecha inválida";
    }
  };

  // Helper function para obtener el nombre del producto por ID
  const getProductNameById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Desconocido";
  };

  // Helper function para obtener el nombre del estado general por ID
  const getStateNameById = (id) => {
    const states = {
      4: "Pendiente",
      6: "En producción",
      7: "Terminado",
      3: "Cancelado",
    };
    return states[id] || "Desconocido";
  };

  // Obtener el número de la orden de producción
  const orderNumber = details.id || "Desconocido";

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Detalles de la Orden de Producción #{orderNumber}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>
              <strong>Notas:</strong> {details.notes}
            </p>
            <p>
              <strong>Estado:</strong> {getStateNameById(details.state)}
            </p>
            <p>
              <strong>Fecha de Creación:</strong> {formatDate(details.date)}
            </p>
            <p>
              <strong>Fecha Objetivo:</strong> {formatDate(details.targetDate)}
            </p>

            {details.productionOrderDetails &&
            details.productionOrderDetails.length > 0 ? (
              details.productionOrderDetails.map((detail) => (
                <div key={detail.id} className="card mb-3">
                  <div className="card-body">
                    <p className="card-text">
                      <strong>Producto:</strong>{" "}
                      {getProductNameById(detail.idProduct)}
                    </p>
                    <p className="card-text">
                      <strong>Cantidad:</strong> {detail.amount}
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

export default ProductionOrderDetailsModal;
