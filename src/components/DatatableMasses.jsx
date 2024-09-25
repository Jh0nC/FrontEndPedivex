import { useState } from 'react';
import { Link } from 'react-router-dom';

function Datatable({ data }) {
  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>Masas</h2>

        <Link to={'create'} className='btn btn-warning rounded-5'>Agregar masa</Link>

        <div className="input_search">
          <input type="search" placeholder="Buscar" />
          <i className="bi bi-search" id="search"></i>
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
                  <i className="bi bi-pencil-square"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="datatable_fotter d-flex justify-content-between align-items-center">
        <p>Total de filas: {data.length}</p>

      </div>
    </div>
  );
}

export default Datatable;
