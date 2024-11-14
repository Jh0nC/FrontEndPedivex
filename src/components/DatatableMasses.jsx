import { useState } from 'react';
import { Link } from 'react-router-dom';

function Datatable({ data }) {
  const [selectedMasa, setSelectedMasa] = useState(null);

  const handleViewDetails = (masa) => {
    setSelectedMasa(masa);
  };

  return (
    <>
      <div className="datatable-container border rounded-4 mx-auto my-3">
        <div className="datatable_header">
          <h2>Masas</h2>
          <Link to={'create'} className='btn btn-success rounded-5 d-flex gap-2 align-items-center'>Agregar masa</Link>
          <div className="d-flex gap-2 align-items-center">
          <div className="input_search">
            <input
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <i className="bi bi-search" id="search"></i>
          </div>

          <button className="btn btn-success rounded-5 h-50">
            <i class="bi bi-filetype-xlsx"></i>
          </button>
        </div>
        </div>
        <table className="datatable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td className='d-flex gap-2'>
                  <Link className='btn btn-warning rounded-5' to={`edit/${item.id}`}>
                    Editar
                  </Link>
                  <button
                    className='btn btn-secondary rounded-5'
                    onClick={() => handleViewDetails(item)}
                    data-bs-toggle="modal"
                    data-bs-target="#modalMasa"
                  >
                    Ver detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="datatable_footer d-flex justify-content-between align-items-center">
          <p>Total de filas: {data.length}</p>
        </div>
      </div>

      {/* Modal de Ver Detalle */}
      {selectedMasa && (
        <div
          className="modal fade"
          id="modalMasa"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content rounded-4">
              <div className="modal-header">
                <h1 className="modal-title fs-5">{selectedMasa.name}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm d-flex justify-content-around">
                    <p><b>ID: </b> {selectedMasa.id}</p>
                    <p><b>Descripción: </b> {selectedMasa.notes}</p>
                  </div>
                  <div className="row p-4">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Insumo</th>
                          <th>Cantidad</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedMasa.massDetails.length > 0 ? (
                          selectedMasa.massDetails.map((detail, index) => (
                            <tr key={detail.id}>
                              <td>{index + 1}</td>
                              <td className="text-capitalize">{detail.supply.name}</td>
                              <td>{detail.amount + ' ' + detail.unit}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3" className="text-center">No hay detalles disponibles</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Datatable;
