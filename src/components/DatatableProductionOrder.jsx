import React, { useState, useEffect } from "react";
import "../../public/css/datatableStyles.css";
import { Link } from "react-router-dom";
import ProductionOrderDetailsModal from "../pages/admin/modules/production/ProductionOrders/ProductionOrderDetail";

function Datatables({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Mostrar 5 registros por página
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch para obtener usuarios
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    // Fetch para obtener productos
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, []);

  const handleDetailsClick = (item) => {
    console.log("Detalles clickeados:", item);
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

  // Helper functions to get full names
  const getUserNameById = (id) => {
    const user = users.find((user) => user.id === id);
    return user ? `${user.firstName} ${user.lastName}` : "Desconocido";
  };

  const getProductNameById = (id) => {
    const product = products.find((product) => product.id === id);
    return product ? product.name : "Desconocido";
  };

  // Helper function to get state name
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

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>
        <Link
          to="/admin/production-order-create"
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bi bi-search" id="search"></i>
        </div>
        <button className="btn btn-success rounded-5" onClick={exportToExcel}>
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
      <div className="datatable_footer d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-start flex-grow-1">
          <p>Total de filas: {filteredData.length}</p>
        </div>
        <div className="d-flex justify-content-left flex-grow-1">
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
