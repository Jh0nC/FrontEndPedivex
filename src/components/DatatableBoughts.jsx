import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import '../../public/css/datatableStyles.css';
import BoughtDetails from "../pages/admin/modules/boughts/bought/boughtDetails";
import Swal from 'sweetalert2';

function Datatables({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const filteredData = data.content.filter(item =>
    Object.values(item).some(
      val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetailsClick = (item) => {
    // console.log("Detalles clickeados:", item); // Verifica si el botón está llamando a esta función
    setSelectedDetails(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDetails({});
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: `¿Estás seguro de eliminar la compra?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/bought/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(),
        });
        if (response.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Compra eliminada con éxito.',
          }).then(() => {
            location.reload()
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo eliminar la compra.',
            icon: 'error'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al intentar eliminar la compra.',
          icon: 'error'
        });
      }
    }

  }

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>
        <Link
          to="/admin/boughtCreate"
          className="btn btn-success rounded-5 d-flex gap-2 align-items-center"
        >
          Agregar {data.module}
          <i className="bi "></i>
        </Link>

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
            {data.colNames && data.colNames.map((col, index) => (
              <th key={index}>
                {col} <i className="bi bi-chevron-expand"></i>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.nroReceipt}</td>
              <td>{item.date}</td>
              <td>{item.total}</td>
              <td>{item.provider.provider}</td>
              <td>
                <button
                  className="btn btn-secondary rounded-5 me-1"
                  onClick={() => handleDetailsClick(item)}
                >
                  Detalles
                </button>
                <button className='btn btn-danger rounded-5'
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="datatable_fotter d-flex justify-content-between align-items-center">
        <p>Total de filas: {data.content.length}</p>
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              style={{
                backgroundColor: currentPage === index + 1 ? '#FFD700' : '#FFFAE0',
                color: '#000',
                margin: '0 5px',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {showModal && (
        <BoughtDetails
          show={showModal}
          onClose={handleCloseModal}
          details={selectedDetails}
        />
      )}
    </div>
  );
}

export default Datatables;
