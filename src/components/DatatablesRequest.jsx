import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../public/css/datatableStyles.css";
import { Link, useNavigate } from "react-router-dom";
import RequestDetailsModal from "../pages/admin/modules/sales/requests/RequestDetail";
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
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleDetailsClick = (item) => {
    setSelectedDetails(item);
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    if (item.state === 4) {
      navigate(`/admin/request-update/${item.id}`);
    } else {
      Swal.fire({
        title: "No se puede editar",
        text: "Solo se pueden editar pedidos en estado 'Pendiente'.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDetails({});
  };

  // Definir el orden deseado para los estados
  const stateOrder = {
    4: 1, // Pendiente
    7: 2, // Terminado
    3: 3, // Cancelado
  };

  // Filtrar y ordenar los datos
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "Pedidos");
    XLSX.writeFile(workbook, "Request_list.xlsx");
  };

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Desconocido";
  };

  const getStateNameById = (id) => {
    const states = {
      4: { name: "Pendiente", color: "gray" },
      7: { name: "Terminado", color: "green" },
      3: { name: "Cancelado", color: "red" },
    };
    const state = states[id] || { name: "Desconocido", color: "black" };
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
          to="/admin/request-create"
          className="btn btn-success rounded-5 d-flex gap-2 align-items-center"
        >
          Agregar {data.module}
          <i className="bi"></i>
        </Link>

        <div className="d-flex gap-2 align-items-center">
          <div className="input_search">
            <input
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="bi bi-search" id="search"></i>
          </div>
          <button
            className="btn btn-success rounded-5 h-50"
            onClick={exportToExcel}
          >
            <i className="bi bi-file-earmark-excel"></i>
          </button>
        </div>
      </div>

      <table className="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha Creación</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha Límite</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentItems &&
            currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.creationDate}</td>
                <td>{getUserNameById(item.idUser)}</td>
                <td>{item.total}</td>
                <td>{getStateNameById(item.state)}</td>
                <td>{item.deadLine}</td>
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
        <RequestDetailsModal
          show={showModal}
          onClose={handleCloseModal}
          details={selectedDetails}
        />
      )}
    </div>
  );
}

export default Datatables;
