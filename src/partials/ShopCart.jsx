import { Link } from 'react-router-dom';

function ShopCart() {
  return (
    <>
      <button
        className="shop-cart"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#carritoDeCompras">
        <h3 className="bi bi-cart"></h3>
      </button>
      <div className="modal fade" id="carritoDeCompras" tabIndex="-1" aria-labelledby="carritoDeComprasLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="container mt-5 carrito">
              <div className="row d-flex justify-content-center">
                <div className="col-10 text-center rounded-3 shadow-lg bg-light">
                  <h1>Carrito</h1>
                  <div className="container">
                    <div className="row border-top mx-2 p-2 item-carrito d-flex justify-content-around">
                      <div className="col-6 h-100 d-flex justify-content-evenly align-items-center">
                        <div className="w-100 h-100 d-flex justify-content-evenly align-items-center">
                          <span className="mt-3">Panzerroti arequipe</span>
                          <span className="mt-3">$2,500,00</span>
                        </div>
                      </div>
                      <div className="col-6 h-100 d-flex justify-content-around align-items-center">
                        <div className="w-100 d-flex justify-content-evenly align-items-center">
                          <p className="my-2">Cantidad:</p>
                          <div className="d-flex w-50 my-2 justify-content-between">
                            <button className="border-0 bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path
                                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                              </svg>
                            </button>
                            <p className="my-2">2</p>
                            <button className="border-0 bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                <path
                                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                  d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row border-top mx-2 p-2 item-carrito d-flex justify-content-around">
                      <div className="col-6 h-100 d-flex justify-content-evenly align-items-center">
                        <p className="mt-3">Panzerroti rachero</p>
                        <p className="mt-3">$2,500,00</p>
                      </div>
                      <div className="col-6 h-100 d-flex justify-content-around align-items-center">
                        <div className="w-100 d-flex justify-content-evenly align-items-center">
                          <p className="my-2">Cantidad:</p>
                          <div className="d-flex w-50 my-2 justify-content-between">
                            <button className="border-0 bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path
                                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                              </svg>
                            </button>
                            <p className="my-2">2</p>
                            <button className="border-0 bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="bi bi-dash-circle" viewBox="0 0 16 16">
                                <path
                                  d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path
                                  d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer mt-3">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
              <Link to={'/login'} className="btn btn-warning" data-bs-dismiss="modal">Hacer pedido</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopCart;