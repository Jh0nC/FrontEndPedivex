import React, { useState, useEffect } from "react";
import "../../public/css/datatableStyles.css";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import RequestDetailsModal from "../pages/admin/modules/sales/requests/RequestDetail";
import * as XLSX from "xlsx";

function Datatable({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }, []);

  // Filtrar los datos según el término de búsqueda
  const filteredData = data.content.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Calcular índices de los elementos actuales
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDetailsClick = (item) => {
    setSelectedDetails(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDetails({});
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

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, "data_list.xlsx");
  };

  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Desconocido";
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
                setCurrentPage(1); // Resetear a la primera página al buscar
              }}
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
            {data.colNames &&
              data.colNames.map((col, index) => (
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
              <td>{item.deliveryDate}</td>
              <td>{item.total}</td>
              <td>{getUserNameById(item.idUser)}</td>
              <td>
                {item.state === 8 ? (
                  <button className="btn btn-warning rounded-5 h-50">
                    Finalizada
                  </button>
                ) : item.state === 9 ? (
                  <button className="btn btn-secondary rounded-5 h-50">
                    Devuelto
                  </button>
                ) : (
                  <button className="btn btn-secondary"></button>
                )}
              </td>
              <td className="d-flex gap-2">
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

      <div className="datatable_footer d-flex justify-content-between align-items-center">
        <p>Total de filas: {filteredData.length}</p>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                style={{
                  backgroundColor:
                    currentPage === index + 1 ? "#FFD700" : "#FFFAE0",
                  color: "#000",
                  margin: "0 5px",
                  padding: "8px 12px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
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

export default Datatable;
