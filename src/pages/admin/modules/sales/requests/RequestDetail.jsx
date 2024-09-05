import React, { useEffect } from "react";

function RequestDetailsModal({ show, onClose, details }) {
  useEffect(() => {
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

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Detalles del Pedido</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <p>ID: {details.id}</p>
            <p>ID Usuario: {details.idUser}</p>
            <p>Total: {details.total}</p>
            <p>Estado: {details.state}</p>
            <p>Fecha de Creación: {details.creationDate}</p>
            <p>Fecha Límite: {details.deadLine}</p>
            <p>Fecha de Estado: {details.stateDate}</p>
            <h6>Detalles:</h6>
            {details.details && details.details.length > 0 ? (
              details.details.map((detail) => (
                <div key={detail.idProduct}>
                  <p>ID Producto: {detail.idProduct}</p>
                  <p>Cantidad: {detail.quantity}</p>
                  <p>Subtotal: {detail.subtotal}</p>
                  <p>Total: {detail.total}</p>
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
