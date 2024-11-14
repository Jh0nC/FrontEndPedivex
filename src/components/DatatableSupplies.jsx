import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import '../../public/css/datatableStyles.css';

function Datatables({ data }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [supplies, setSupplies] = useState(data.content);

  useEffect(() => {
    setSupplies(data.content);
  }, [data.content]);

  const filteredData = supplies.filter(item =>
    Object.values(item).some(
      val => val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Insumos");
    XLSX.writeFile(workbook, "supplies_list.xlsx");
  };

  const handleChangeStateClick = async (id, currentState, name) => {
    const newState = currentState === 1 ? 2 : 1;
    const actionText = newState === 2 ? 'desactivar' : 'activar';

    const result = await Swal.fire({
      title: `¿Estás seguro de ${actionText} el insumo "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/supplie/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: newState })
        });

        if (response.ok) {
          Swal.fire({
            title: 'Cambio exitoso',
            text: `El insumo ha sido ${newState === 2 ? 'desactivado' : 'activado'} correctamente.`,
            icon: 'success'
          }).then(() => {
            setSupplies(prevSupplies =>
              prevSupplies.map(item =>
                item.id === id ? { ...item, state: newState } : item
              )
            );
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo cambiar el estado del insumo.',
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

  const footerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px'
  };

  const paginationStyle = {
    display: 'flex',
    justifyContent: 'center'
  };

  const pageItemStyle = (isActive) => ({
    backgroundColor: isActive ? '#FFD700' : '#FFFAE0',
    color: '#000',
    margin: '0 5px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  });

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>
        <Link to="/admin/supplies-create" className="btn btn-success rounded-5 d-flex gap-2 align-items-center">
          Agregar {data.module}
          <i className="bi"></i>
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
              <td>{item.name}</td>
              <td>{item.stock}</td>
              <td>{item.unit}</td>
              <td>
                {item.state === 1 ? (
                  <button
                    className='btn btn-success rounded-5 h-50'
                    onClick={() => handleChangeStateClick(item.id, item.state, item.name)}
                  >
                    Activado
                  </button>
                ) : (
                  <button
                    className='btn btn-danger rounded-5 h-50'
                    onClick={() => handleChangeStateClick(item.id, item.state, item.name)}
                  >
                    Desactivado
                  </button>
                )}
              </td>
              <td>
                <Link className="btn btn-warning rounded-5" to={`/admin/supplies-update/${item.id}`}>
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="datatable_footer" style={footerStyle}>
        <p className="total-rows" style={{ margin: 0 }}>Total de filas: {filteredData.length}</p>
        <div className="pagination" style={paginationStyle}>
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              style={pageItemStyle(currentPage === index + 1)}
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
