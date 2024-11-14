import React, { useState, useEffect } from "react";
import "../../public/css/datatableStyles.css";
import { Link } from "react-router-dom";
import ProductionOrderDetailsModal from "../pages/admin/modules/production/ProductionOrders/ProductionOrderDetail";
import * as XLSX from 'xlsx';

function Datatables({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); 
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la API de usuarios");
        return response.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        setUsers([]); // Asegura que users sea un array vacío en caso de error
      });

    fetch("http://localhost:3000/product")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la API de productos");
        return response.json();
      })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setProducts([]); // Asegura que products sea un array vacío en caso de error
      });
  }, []);

  const handleDetailsClick = (item) => {
    setSelectedDetails(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDetails({});
  };

  const filteredData = data.content.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ordenes de Producción");
    XLSX.writeFile(workbook, "ProductionOrders_list.xlsx");
  };

  const getUserNameById = (id) => {
    if (!Array.isArray(users)) return "Desconocido";
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Desconocido";
  };

  const getStateName = (stateId) => {
    const states = {
      4: "Pendiente",
      6: "En producción",
      7: "Terminado",
      3: "Cancelado",
      1: "Activo"
    };
    return states[stateId] || "Desconocido";
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
        <Link
          to="/admin/production-order-create"
          className="btn btn-success rounded-5 d-flex gap-2 align-items-center"
        >
          Agregar {data.module}
          <i className="bi "></i>
        </Link>

        <div className="input_search">
          <input
            type="search"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bi bi-search" id="search"></i>
        </div>
        <button className="btn btn-success rounded-5" onClick={exportToExcel}>
          <i className="bi bi-file-earmark-excel"></i>
        </button>
      </div>

      <table className="datatable">
        <thead>
          <tr>
            {data.colNames &&
              data.colNames.map((col, index) => (
                <th key={index}>
                  {col} <i className="bi bi-chevron-expand"></i>
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.date}</td>
                <td>{item.notes}</td>
                <td>{getUserNameById(item.idUser)}</td>
                <td>{getStateName(item.state)}</td>
                <td>{item.targetDate}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => handleDetailsClick(item)}
                  >
                    Detalles
                  </button>
                  <Link to={`/admin/production-order-update/${item.id}`}>
                    <button className="btn btn-warning me-2">Editar</button>
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <div className="datatable_footer" style={footerStyle}>
        <p className="total-rows" style={{ margin: 0 }}>
          Total de filas: {filteredData.length}
        </p>
        <div className="pagination" style={paginationStyle}>
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
                style={pageItemStyle(currentPage === index + 1)}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {showModal && (
        <ProductionOrderDetailsModal
          show={showModal}
          onClose={handleCloseModal}
          details={selectedDetails}
        />
      )}
    </div>
  );
}

export default Datatables;
