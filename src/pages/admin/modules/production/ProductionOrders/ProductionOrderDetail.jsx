import React, { useEffect } from "react";

function ProductionOrderDetailsModal({ show, onClose, details }) {
  useEffect(() => {
    // Crear un enlace para el CDN de Bootstrap
    const link = document.createElement("link");
    link.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

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
                <p>ID: {detail.id}</p>
                <p>Orden de Producción ID: {detail.idProductionOrder}</p>
                <p>Producto ID: {detail.idProduct}</p>
                <p>Cantidad: {detail.amount}</p>
                <p>Estado: {detail.state}</p>
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
