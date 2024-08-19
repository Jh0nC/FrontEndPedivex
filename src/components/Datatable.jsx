import { Link } from "react-router-dom";

function Datatable(parameter) {
  return (
    <>
      <div className="datatable-container border mx-auto">
        <div className="datatable_header">
          <h2>(title)</h2>
          <button>Crear Moje</button>

          <div className="input_search">
            <input type="search" placeholder="Buscar" />
            <i className="bi bi-search" id="search"></i>
          </div>
        </div>
        <table className="datatable">
          <thead>
            <tr>
              <th>(field)<i className="bi bi-chevron-expand"></i></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>(field)</td>
              <td>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i className="bi bi-pencil-square" id="icons"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="datatable_fotter">
          <p>(some info)</p>
        </div>
      </div>
    </>
  )
}

export default Datatable;




