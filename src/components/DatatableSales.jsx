import { useState } from "react";
import "../../public/css/datatableStyles.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Datatable({ data }) {
  // Estados para la búsqueda y la paginación
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

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

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>
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
              <td>{item.idUser}</td>
              <td>
                {item.state === 8 ? (
                  <button
                    className="btn btn-warning rounded-5 h-50"
                  >
                    Finalizada
                  </button>
                ) : item.state === 9 ? (
                  <button
                    className="btn btn-secondary rounded-5 h-50"
                  >
                    Devuelto
                  </button>
                ) : (
                  <button className="btn btn-secondary"></button>
                )}
              </td>
              <td className="d-flex gap-2">
                {/* Botón de Ver Detalle */}
                <Link to={`/admin/saleDetails/${item.id}`}>
                  <button className="btn btn-info rounded-5 d-flex gap-2 align-items-center">
                    Ver Detalle
                  </button>
                </Link>
                {/* Botón de Realizar Devolución */}
                <Link to={`/admin/sales-return/${item.id}`}>
                  <button className="btn btn-warning rounded-5">
                    Realizar Devolución
                  </button>
                </Link>
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
                    currentPage === index + 1 ? "#FFD700" : "#FFFAE0", // Amarillo claro
                  color: "#000", // Color del texto
                  margin: "0 5px", // Separación entre botones
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
  );
}

export default Datatable;
