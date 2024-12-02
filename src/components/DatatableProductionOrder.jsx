import React, { useState, useEffect } from "react";
import "../../public/css/datatableStyles.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProductionOrderDetailsModal from "../pages/admin/modules/production/ProductionOrders/ProductionOrderDetail";
import * as XLSX from "xlsx";

function Datatables({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://pedivexapi.onrender.com/user")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la API de usuarios");
        return response.json();
      })
      .then((data) => setUsers(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
        setUsers([]);
      });

    fetch("https://pedivexapi.onrender.com/product")
      .then((response) => {
        if (!response.ok) throw new Error("Error en la API de productos");
        return response.json();
      })
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error al obtener productos:", error);
        setProducts([]);
      });
  }, []);

  const formatDate = (dateString) => {
    try {
      const [year, month, day] = dateString.split('T')[0].split('-');
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha inválida';
    }
  };

  const handleDetailsClick = (item) => {
    setSelectedDetails(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDetails({});
  };

  const handleEditClick = (item) => {
    if (item.state === 4 || item.state === 6) {
      navigate(`/admin/production-order-update/${item.id}`);
    } else {
      Swal.fire({
        title: "No se puede editar",
        text: "Solo las órdenes de producción en estado 'Pendiente' o 'En producción' pueden ser editadas.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const stateOrder = {
    4: 1, // Pendiente
    6: 2, // En producción
    7: 3, // Terminado
    3: 4, // Cancelado
  };

  const filteredData = data.content
    .filter((item) =>
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const orderA = stateOrder[a.state] || 99;
      const orderB = stateOrder[b.state] || 99;
      return orderA - orderB;
    });

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
      4: { name: "Pendiente", color: "gray" },
      6: { name: "En producción", color: "goldenrod" },
      7: { name: "Terminado", color: "green" },
      3: { name: "Cancelado", color: "red" },
      1: { name: "Activo", color: "black" },
    };
    const state = states[stateId] || { name: "Desconocido", color: "black" };
    return <span style={{ color: state.color }}>{state.name}</span>;
  };

  const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
  };

  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const pageItemStyle = (isActive) => ({
    backgroundColor: isActive ? "#FFD700" : "#FFFAE0",
    color: "#000",
    margin: "0 5px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
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

          <button
            className="btn btn-success rounded-5 h-50"
            onClick={exportToExcel}
          >
            <i className="bi bi-filetype-xlsx"></i>
          </button>
        </div>
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
                <td>{formatDate(item.date)}</td>
                <td>{item.notes}</td>
                <td>{getUserNameById(item.idUser)}</td>
                <td>{getStateName(item.state)}</td>
                <td>{formatDate(item.targetDate)}</td>
                <td>
                  <button
                    className="btn btn-secondary me-2 rounded-5"
                    onClick={() => handleDetailsClick(item)}
                  >
                    Detalles
                  </button>
                  <button
                    className="btn btn-warning me-2 rounded-5"
                    onClick={() => handleEditClick(item)}
                  >
                    Editar
                  </button>
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
                  currentPage === index + 1 ? "active" : ""
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
