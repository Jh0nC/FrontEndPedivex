import { useEffect, useState } from "react";
import dummyImg from "../../public/assets/1140x696.jpg";
import { useNavigate } from "react-router-dom";

function Card({ data }) {
  const [datasheetDetails, setDatasheetDetails] = useState(data.datasheet.datasheetDetails || []);

  const {
    id, name, stock, price, state, productCategory, datasheet: { mass }
  } = data;

  console.log(data);

  let datasheetDetailIndex = 1;

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/admin/products/edit/${id}`);
  };

  return (
    <>
      <div className="card rounded-4 overflow-hidden admin-card border">
        <div className="card-head rounded-top-3">
          <img src={dummyImg} alt="" className="img-fluid border-bottom" />
          <h5 className="text-center mt-2 d-flex flex-column justify-content-between">
            <span className="fs-6 fw-lighter">{productCategory.name}</span>
            {name}
          </h5>
        </div>
        <div className="card-body d-flex justify-content-between">
          <p>
            <b>Stock: </b>
            {stock > 30 ? (
              <span className="badge opacity-50 text-bg-success">{stock}</span>
            ) : stock == 0 ? (
              <span className="badge opacity-50 text-bg-danger">{stock}</span>
            ) : stock < 30 (
              <span className="badge opacity-50 text-bg-danger">{stock}</span>
            )}
          </p>
          <p>
            <b>Estado: </b>
            {state === 10 ? (
              <span className="badge opacity-50 text-bg-success text-uppercase">disponible</span>
            ) : state === 11 ? (
              <span className="badge opacity-50 text-bg-secondary text-uppercase">casi agotado</span>
            ) : state === 5 ? (
              <span className="badge opacity-50 text-bg-danger text-uppercase">agotado</span>
            ) : ("")}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button
            type="button"
            className="btn rounded-4 btn-secondary d-flex gap-2"
            data-bs-toggle="modal"
            data-bs-target={`#modalCard${id}`}
          >
            Ver detalle
          </button>
          <button
            type="button"
            className="btn rounded-4 btn-warning d-flex gap-2"
            onClick={handleEditClick}
          >
            Editar
          </button>
        </div>
      </div>

      {/* Modal de Ver Detalle */}
      <div className="modal fade"
        id={`modalCard${id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rounded-4">
            <div className="modal-header">
              <h1 className="modal-title fs-5">
                {productCategory.name} - {name}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-2">
                <div className="col-sm">
                  <img src={dummyImg} alt="" className="img-fluid" />
                </div>
                <div className="col-sm">
                  <p>
                    <b>Descripción: </b> {mass.notes}
                  </p>
                  <p>
                    <b>Precio: </b>
                    <i>${price}</i>
                  </p>
                  <p>
                    <b>Moje: </b> {mass.name}
                  </p>
                </div>
              </div>
              <hr className="mx-3" />
              <div className="row p-4">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Insumo</th>
                      <th>Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datasheetDetails.length > 0 ? (
                      datasheetDetails.map((detail) => (
                        <tr key={detail.id}>
                          <td>{datasheetDetailIndex++}</td>
                          <td className="text-capitalize">{detail.supply.name}</td>
                          <td>{detail.amount + ' ' + detail.unit}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="text-center">No hay detalles disponibles</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;