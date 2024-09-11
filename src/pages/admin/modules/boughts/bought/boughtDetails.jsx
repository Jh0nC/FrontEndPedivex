import React, { useEffect } from "react";

function boughtDetails({ show, onClose, details }) {
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";

    document.head.appendChild(link);

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
            <h5 className="modal-title">Detalles de la Compra</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            {details.boughtDetails.map((detail) => (
              <div className="card mb-1">
                <div className="card-body">
                  <div key={detail.id}>
                    <p>Id Compra: {detail.idBought}</p>
                    <p>Nombre Insumo: {detail.supplieName}</p>
                    <p>Cantidad: {detail.amount}</p>
                    <p>Unidad: {detail.unit}</p>
                    <p>Costo Unidad: {detail.costUnit}</p>
                    <p>Subtotal: {detail.subtotal}</p>
                    {/* <p>Estado: {detail.state}</p> */}
                  </div>
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

export default boughtDetails;