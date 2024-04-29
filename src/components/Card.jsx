import dummyImg from "../../public/assets/1140x696.jpg";

function Card(data) {
  var productDetail = data.data['productDetail'];
  console.log(productDetail);
  return (
    <>
      <div className="card rounded admin-card">
        <div className="card-head rounded-top-3">
          <img src={dummyImg} alt="" className="img-fluid border-bottom" />
          <h5 className="text-center mt-2">{data.data['type'] + ' - ' + data.data['flavor']}</h5>
        </div>
        <div className="card-body d-flex justify-content-between">
          <p>
            <b>Stock: </b>
            {data.data['stock'] >= 50 ? (
              <span className="badge opacity-50 text-bg-success">{data.data['stock']}</span>
            ) : data.data['stock'] >= 30 ? (
              <span className="badge opacity-50 text-bg-warning">{data.data['stock']}</span>
            ) : (
              <span className="badge opacity-50 text-bg-danger">{data.data['stock']}</span>
            )}
          </p>
          <p>
            <b>Estado: </b>
            {data.data['state'] == 1 ? (
              <span className="badge opacity-50 text-bg-success text-uppercase">activo</span>
            ) : (
              <span className="badge opacity-50 text-bg-danger text-uppercase">inactivo</span>
            )}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <button type="button"
            className="btn rounded-4 btn-outline-secondary d-flex gap-2"
            data-bs-toggle="modal"
            data-bs-target={"#modalCard" + data.data['id']}>
            Ver detalle
            <i className="bi bi-eye"></i>
          </button>
          <button type="button"
            className="btn rounded-4 btn-outline-warning d-flex gap-2"
            data-bs-toggle="modal"
            data-bs-target={"#modal3Card" + data.data['id']}>
            Editar
            <i className="bi bi-pencil-square"></i>
          </button>
        </div>
      </div>

      <div className="modal fade"
        id={"modalCard" + data.data['id']}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
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
                  <img src={dummyImg} alt="" className="img-fluid" />
                </div>
                <div className="col-sm">
                  <p>
                    <b>Descripción: </b>
                    {data.data['productDescription']}
                  </p>
                  <p>
                    <b>Precio: </b>
                    <i>${data.data['price']}</i>
                  </p>
                  <div className="list-group ">
                    <li className="list-group-item list-group-item-action">
                      Moje: {productDetail.dought['id']}
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Cantidad: {productDetail.dought['amount']}
                    </li>
                    <li className="list-group-item list-group-item-action">
                      Unidad: <i>{productDetail.dought['unit']}</i>
                    </li>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn rounded-4 btn-outline-warning d-flex gap-2"
                data-bs-toggle="modal"
                data-bs-target={"#modal3Card" + data.data['id']}>
                Editar
                <i className="bi bi-pencil-square"></i>
              </button>
              <button type="button"
                className="btn rounded-4 btn-outline-warning d-flex gap-2"
                data-bs-toggle="modal"
                data-bs-target={"#modal2Card" + data.data['id']}>
                Ficha técnica
              </button>
              <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade"
        id={"modal2Card" + data.data['id']}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> {data.data['type'] + ' - ' + data.data['flavor']}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h1>Ficha técnica</h1>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn rounded-4 btn-outline-warning d-flex gap-2"
                data-bs-toggle="modal"
                data-bs-target={"#modal3Card" + data.data['id']}>
                Editar
                <i className="bi bi-pencil-square"></i>
              </button>
              <button type="button"
                className="btn rounded-4 btn-outline-warning d-flex gap-2"
                data-bs-toggle="modal"
                data-bs-target={"#modalCard" + data.data['id']}>
                Volver
              </button>
              <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade"
        id={"modal3Card" + data.data['id']}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel"> {data.data['type'] + ' - ' + data.data['flavor']}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* add product modal */}
              <h1>Editar</h1>
              <div className="modal-body container-fluid">
                <form action="">
                  <div className="row d-flex justify-content-around">
                    <div className="input-group mb-3">
                      <button className="btn btn-outline-secondary dropdown-toggle"
                        type="button" data-bs-toggle="dropdown"
                        aria-expanded="false">{data.data['type']}</button>
                      <input type="text"
                        className="form-control"
                        placeholder={data.data['type'] + " " + data.data['flavor']}
                        disabled/>
                    </div>
                    <div className="row d-flex justify-content-around">
                      <label htmlFor="" className="form-label col-5">
                        Sabor
                        <input type="text" className="form-control" placeholder={data.data['flavor']}/>
                      </label>
                      <label htmlFor="" className="form-label col-7">
                        Moje
                        <select className="form-select" aria-label="Default select example" disabled>
                          <option >Selecciona un moje</option>
                          <option value="1" selected>Hojaldre seco</option>
                          <option value="2">Levandura humeda</option>
                        </select>
                      </label>
                    </div>
                    <div className="row d-flex justify-content-around">
                      <label htmlFor="" className="form-label col-9">
                        Descripción del producto
                        <input type="text" className="form-control" placeholder="Esta es la descripción del producto" disabled/>
                      </label>
                      <label htmlFor="" className="form-label col-3">
                        Precio
                        <input type="number" className="form-control" placeholder="$ 2500"/>
                      </label>
                    </div>
                    <hr />
                    <h5>Insumos</h5>
                    <div className="mb-2 row d-flex justify-content-around align-items-center">
                      <label htmlFor="" className="form-label col-6 mb-0">
                        <select className="form-select" aria-label="Default select example" disabled>
                          <option selected>Insumo</option>
                        </select>
                      </label>
                      <div className="col-3">
                        <div className="input-group">
                          <button className="btn btn-outline-secondary dropdown-toggle"
                            type="button" data-bs-toggle="dropdown"
                            aria-expanded="false">Unidad</button>
                          <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Gramos</a></li>
                            <li><a className="dropdown-item" href="#">Libras</a></li>
                            <li><a className="dropdown-item" href="#">Mililitros</a></li>
                            <li><a className="dropdown-item" href="#">Litros</a></li>
                          </ul>
                          <input type="number" className="form-control"
                            aria-label="Text input with dropdown button" disabled/>
                        </div>
                      </div>
                      <div className="col-3 d-flex justify-content-around">
                        <button className="btn btn-outline-secondary">
                          <i className="bi bi-dash"></i>
                        </button>
                        <button className="btn btn-outline-info">
                          <i className="bi bi-plus-lg"></i>
                        </button>
                      </div>
                    </div>

                    <hr />
                    <div className="row d-flex justify-content-around">
                      <label for="formFile"
                        className="form-label">Selecciona una imagen</label>
                      <input className="form-control" type="file" id="formFile" disabled />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button"
                onClick={ConfirmEdit}
                className="btn rounded-4 btn-outline-warning d-flex gap-2" >
                Guardar
              </button>
              <button type="button" className="btn rounded-4 btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
          </div>
        </div>
      </div >

    </>
  )
}

export default Card;



export function ConfirmEdit() {
  Swal.fire({
    title: "Guardar cambios",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#FEB81C",
    cancelButtonColor: "rgb(219, 81, 81)",
    confirmButtonText: "Si, editar"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Producto editado",
        text: "El producto se ha editado correctamente",
        icon: "success"
      });
    }
  });
}