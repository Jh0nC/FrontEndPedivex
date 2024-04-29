import Card from "../../../../components/Card";
import data from "../../../../../public/json/cardFile.json";

var cardsData = data;
console.log(cardsData);

function Products() {
  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <div className="datatable_header mb-4">
          <h2>Productos</h2>
          <button type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop">
            Agregar producto
          </button>
          <div className="input_search">
            <input type="search" placeholder="Buscar" />
            <i className="bi bi-search" id="search"></i>
          </div>
        </div>
        <div className="row row-cols-4">

          {
            cardsData.map(item => (
              <div className="col py-2 px-3" key={item.id} >
                <Card data={item} />
              </div>
            ))
          }
        </div>
      </div>



      {/* add product modal */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Agregar nuevo producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body container-fluid">
              <form action="">
                <div className="row d-flex justify-content-around">
                  <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary dropdown-toggle"
                      type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">Tipo de producto</button>
                    <ul className="dropdown-menu">
                      <li><a className="dropdown-item" href="#">Panzerroti</a></li>
                      <li><a className="dropdown-item" href="#">Palito</a></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="bi bi-plus-lg"></i>
                          Agregar nuevo tipo
                        </a>
                      </li>
                    </ul>
                    <input type="text"
                      className="form-control"
                      placeholder="Nombre del producto" />
                  </div>
                  <div className="row d-flex justify-content-around">
                    <label htmlFor="" className="form-label col-5">
                      Sabor
                      <input type="text" className="form-control" />
                    </label>
                    <label htmlFor="" className="form-label col-7">
                      Moje
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Selecciona un moje</option>
                        <option value="1">Hojaldre seco</option>
                        <option value="2">Levandura humeda</option>
                      </select>
                    </label>
                  </div>
                  <div className="row d-flex justify-content-around">

                  </div>
                  <div className="row d-flex justify-content-around">
                    <label for="formFile"
                      className="form-label">Selecciona una imagen</label>
                    <input className="form-control" type="file" id="formFile" disabled />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      </div>

    </>
  )
};

export default Products;