import '../../public/css/datatableStyles.css';

function Datatables({ data }) {
  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>{data.title}</h2>
        {/* <button>Agregar {data.module}</button> */}

        <div className="input_search">
          <input type="search" placeholder="Buscar" />
          <i className="bi bi-search" id="search"></i>
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
          {data.content && data.content.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.idSale}</td>
              <td>{item.date}</td>
              <td>{item.state}</td>
              <td className='d-flex gap-2'>
                <button className='btn btn-outline-danger'>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="datatable_footer d-flex justify-content-between align-items-center">
        <p>Total de filas: {data.content.length}</p>
        {/* <button className="btn btn-outline-success rounded-5">
          Generar Excel
        </button> */}
      </div>
    </div>
  );
}

export default Datatables;
