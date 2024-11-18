import React, { useState, useEffect } from 'react';

function Supplies() {
  const [datos, setDatos] = useState([]);
  const [detalle, setDetalle] = useState(null); // Almacena los detalles de la devolución seleccionada
  const [modalVisible, setModalVisible] = useState(false); // Para controlar la visibilidad del modal

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/devolution");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchDatos();
  }, []);

  const fetchDetalle = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/devolution/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      setDetalle(data); // Almacenar los detalles
      setModalVisible(true); // Mostrar el modal
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const closeModal = () => {
    setModalVisible(false); // Ocultar el modal
    setDetalle(null); // Limpiar el detalle cuando se cierre el modal
  };

  const data = {
    module: "Devoluciones",
    title: "Devoluciones",
    colNames: ["Id", "Numero venta", "Fecha", "Acciones"],
    content: datos.map(item => ({
      ...item,
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      {/* Tabla de Devoluciones */}
      <div className="datatable-container border rounded-4 mx-auto my-3">
        <div className="datatable_header">
          <h2>{data.title}</h2>
          <div className="input_search">
            <input type="search" placeholder="Buscar" />
            <i className="bi bi-search" id="search"></i>
          </div>
        </div>
        <table className="datatable">
          <thead>
            <tr>
              {data.colNames && data.colNames.map((col, index) => (
                <th key={index}>
                  {col} <i className="bi bi-chevron-expand"></i>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.content && data.content.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.idSale}</td>
                <td>{item.date}</td>
                <td className='d-flex gap-2'>
                  <button
                    className='btn btn-outline-danger'
                    onClick={() => fetchDetalle(item.id)} // Obtener el detalle y abrir el modal
                  >
                    Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="datatable_footer d-flex justify-content-between align-items-center">
          <p>Total de filass: {data.content.length}</p>
        </div>
      </div>

      {/* Modal para mostrar detalles de la devolución */}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Detalle de Devolución</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body">
              {detalle && (
                <>
                  <p><strong>ID Devolución:</strong> {detalle.id}</p>
                  <p><strong>ID Venta:</strong> {detalle.idSale}</p>
                  <p><strong>Fecha:</strong> {detalle.date}</p>
                  <p><strong>Estado:</strong> {detalle.state}</p>
                  <h3>Detalles del Producto Devuelto:</h3>
                  {detalle.details.map((item, index) => (
                    <div key={index}>
                      <p><strong>Producto:</strong> {item.product.name}</p>
                      <p><strong>Cantidad:</strong> {item.quantity}</p>
                      <p><strong>Motivo:</strong> {item.motiveDevolution.name}</p>
                      <p><strong>Acciones:</strong> {item.motiveDevolution.actions}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para el Modal */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background-color: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          width: 600px;
          max-width: 100%;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .modal-body {
          padding: 1rem 0;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
        }

        .btn-close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default Supplies;
