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

  const handleChangeStateClick = async (id, currentState, user, role) => {
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
        if (role.toLowerCase()=="administrador") {
          Swal.fire({
            title: 'Error',
            text: 'No se puede cambiar el estado del usuario con el rol de Administrador.',
            icon: 'error'
          });
        } else {
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
            }).then(()=>{
              location.reload()
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: 'No se pudo cambiar el estado del usuario.',
              icon: 'error'
            });
          }
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

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>
        <Link
          to="/admin/userCreate"
          className="btn btn-success rounded-5 d-flex gap-2 align-items-center"
        >
          Agregar {data.module}
          <i className="bi bi-plus-circle"></i>
        </Link>

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

        <button className="btn btn-success rounded-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-filetype-pdf"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M14 4.5V14a2 2 0 0 1-2 2h-1v-1h1a1 1 0 0 0 1-1V4.5h-2A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v9H2V2a2 2 0 0 1 2-2h5.5zM1.6 11.85H0v3.999h.791v-1.342h.803q.43 0 .732-.173.305-.175.463-.474a1.4 1.4 0 0 0 .161-.677q0-.375-.158-.677a1.2 1.2 0 0 0-.46-.477q-.3-.18-.732-.179m.545 1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333a.8.8 0 0 1-.085.38.57.57 0 0 1-.238.241.8.8 0 0 1-.375.082H.788V12.48h.66q.327 0 .512.181.185.183.185.522m1.217-1.333v3.999h1.46q.602 0 .998-.237a1.45 1.45 0 0 0 .595-.689q.196-.45.196-1.084 0-.63-.196-1.075a1.43 1.43 0 0 0-.589-.68q-.396-.234-1.005-.234zm.791.645h.563q.371 0 .609.152a.9.9 0 0 1 .354.454q.118.302.118.753a2.3 2.3 0 0 1-.068.592 1.1 1.1 0 0 1-.196.422.8.8 0 0 1-.334.252 1.3 1.3 0 0 1-.483.082h-.563zm3.743 1.763v1.591h-.79V11.85h2.548v.653H7.896v1.117h1.606v.638z"
            />
          </svg>
        </button>
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
              <td>{item.mail}</td>
              <td>{item.firstName + ' ' + item.lastName}</td>
              <td>{item.document}</td>
              <td>{item.address}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.role.role}</td>
              <td className='d-flex justify-content-center align-items-center gap-2'>
                <button
                  className='btn btn-warning rounded-5 h-50'
                  onClick={() => handleEditClick(item.id)}
                >
                  Editar
                </button>
                {item.state === 1 ? (
                  <button
                    className='btn btn-success rounded-5 h-50'
                    onClick={() => handleChangeStateClick(item.id, item.state, item.firstName, item.role.role)}
                  >Activado</button>) : (
                  <button
                    className='btn btn-danger rounded-5 h-50'
                    onClick={() => handleChangeStateClick(item.id, item.state, item.firstName, item.role.role)}
                  >Desativado</button>)}
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
