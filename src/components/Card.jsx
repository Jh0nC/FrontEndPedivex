import dummyImg from "../../public/assets/1140x696.jpg";

function Card(data) {
  return (
    <>

      <div className="card rounded-3 admin-card">
        <div className="card-head rounded-top-3">
          <img src={dummyImg} alt="" className="img-fluid" />
          <h5 className="text-center mt-2">{data.data['type'] + ' - ' + data.data['flavor']}</h5>
        </div>
        <div className="card-body">

        </div>
        <div className="card-footer d-flex justify-content-between">
          <button type="button"
            className="btn rounded-4 btn-outline-secondary d-flex gap-2"
            data-bs-toggle="modal"
            data-bs-target={"#modalCard" + data.data['id']}>
            Ver detalle
            <i className="bi bi-eye"></i>
          </button>
          <button className="btn rounded-4 btn-outline-warning d-flex gap-2">
            Editar
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
      </div>

      <div className="modal fade"
        id={"modalCard" + data.data['id']}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> {data.data['type'] + ' - ' + data.data['flavor']}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="row row-cols-2">
                <div className="col-sm">
                  <img src={dummyImg} alt="" className="img-fluid"/>
                </div>
                <div className="col-sm">
                  <p>
                    <b>Descripción: </b>
                    {data.data['productDescription']}
                  </p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn rounded-4 btn-outline-warning">Ficha técnica</button>
              <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Card;