import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import '../../public/css/datatableStyles.css';

function Datatables({ data }) {
  const navigate = useNavigate();
  const [selectedUserId, setSelectedUserId] = useState(null);

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

  const handleEditClick = (id) => {
    setSelectedUserId(id);
    navigate(`/admin/userEdit/${id}`);
  };

  const handleChangeStateClick = async (id, currentState, user) => {
    const newState = currentState === 1 ? 2 : 1;
    const actionText = newState === 2 ? 'desactivar' : 'activar';

    const result = await Swal.fire({
      title: `¿Estás seguro de ${actionText} el usuario "${user}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ state: newState })
        });

        if (response.ok) {
          Swal.fire({
            title: 'Cambio exitoso',
            text: `El usuario ha sido ${newState === 2 ? 'desactivado' : 'activado'} correctamente.`,
            icon: 'success',
          }).then(() => {
            location.reload();
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cambiar el estado del usuario.',
            icon: 'error'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al intentar cambiar el estado.',
          icon: 'error'
        });
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire(
            '¡Eliminado!',
            'El empleado ha sido eliminado.',
            'success'
          ).then(() => {
            location.reload(); // Recargar los datos después de eliminar
          });
        } else {
          throw new Error('No se pudo eliminar el empleado');
        }
      } catch (error) {
        Swal.fire(
          'Error',
          error.message,
          'error'
        );
      }
    }
  };

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>

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
            <i className="bi bi-filetype-xlsx"></i>
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
              <td>{item.firstName + ' ' + item.lastName}</td>
              <td>{item.document}</td>
              <td>{item.address}</td>
              <td>{item.phoneNumber}</td>
              <td>
                <button
                  className='btn btn-warning rounded-5 h-50'
                  style={{ marginRight: '5px' }}
                  onClick={() => handleEditClick(item.id)}
                >
                  Editar
                </button>
                {item.state === 1 ? (
                  <button
                    className='btn btn-success rounded-5 h-50'
                    onClick={() => handleChangeStateClick(item.id, item.state, item.firstName)}
                  >Activado</button>) : (
                  <button
                    className='btn btn-danger rounded-5 h-50'
                    onClick={() => handleChangeStateClick(item.id, item.state, item.firstName)}
                  >Desactivado</button>)}
                <button 
                  className='btn btn-danger rounded-5' 
                  style={{ marginLeft: '5px' }}
                  onClick={() => handleDelete(item.id)}>
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
    </div>
  );
}

export default Datatables;
