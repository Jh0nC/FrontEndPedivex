import { Link } from "react-router-dom";
import Card from "../../../../../components/Card";
import { useState, useEffect } from "react";

function Products() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:2145/product')
      .then(response => response.json())
      .then(data => setCardsData(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  

  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <div className="datatable_header mb-4">
          <h2>Productos</h2>
          <Link to={'create'} className="btn btn-primary">
            Crear producto
          </Link>
          <div className="input_search">
            <input type="search" placeholder="Buscar" />
            <i className="bi bi-search" id="search"></i>
          </div>
        </div>

        <div className="row row-cols-4">
          {
            cardsData.map(product => (
              <div className="col py-2 px-3" key={product.id} >
                <Card data={product} />
              </div>
            ))
          }
        </div>
      </div>

      {/* Modal para agregar producto */}
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Agregar nuevo producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body container-fluid">
              <form action="">
                {/* Formulario para agregar producto */}
                <div className="row d-flex justify-content-around">
                  <div className="input-group mb-3">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Tipo de producto</button>
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
                    <input type="text" className="form-control" placeholder="Nombre del producto" />
                  </div>

                  {/* Inputs de sabor, moje, descripción y precio */}
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
                    <label htmlFor="" className="form-label col-9">
                      Descripción del producto
                      <input type="text" className="form-control" />
                    </label>
                    <label htmlFor="" className="form-label col-3">
                      Precio
                      <input type="number" className="form-control" />
                    </label>
                  </div>

                  <hr />
                  <h5>Insumos</h5>

                  {/* Inputs para agregar insumos */}
                  <div className="mb-2 row d-flex justify-content-around align-items-center">
                    <label htmlFor="" className="form-label col-6 mb-0">
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Selecciona un insumo</option>
                        <option>Piña</option>
                        <option>Jamon</option>
                        <option>Salchicha ranchera</option>
                        <option>Arequipe</option>
                      </select>
                    </label>
                    <div className="col-3">
                      <div className="input-group">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Unidad</button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Gramos</a></li>
                          <li><a className="dropdown-item" href="#">Libras</a></li>
                          <li><a className="dropdown-item" href="#">Mililitros</a></li>
                          <li><a className="dropdown-item" href="#">Litros</a></li>
                        </ul>
                        <input type="number" className="form-control" aria-label="Text input with dropdown button" />
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

                  {/* Repite el bloque anterior para más insumos */}
                  
                  <hr />
                  <div className="row d-flex justify-content-around">
                    <label htmlFor="formFile" className="form-label">Selecciona una imagen</label>
                    <input className="form-control" type="file" id="formFile" disabled />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Products;