import productImg from "../../../public/assets/products/panzerotti_arequipe.jpg";

function Catalogue() {
  return (
    <>
      <br /><br /><br />
      <div className="d-flex justify-content-center mt-3">
        <div className="catalogue-card border-type-mid px-4">
          <div className="catalogue-card-title border-type-mid">
            <span>Panzerotti Arequipe</span>
          </div>
          <div className="catalogue-card-body">
            <div className="card-content">
              <div className="list">
                <p> <b>Ingredientes:</b> </p>
                <li>Arequipe</li>
                <li>Queso mozarella</li>
              </div>
              <div className="card-buttons">
                <button type="button" className="btn btn-outline-secondary rounded-4" data-bs-toggle="modal" data-bs-target="#add-shopcard">
                  Agregar al carrito
                </button>
                {/* <button className="btn btn-outline-secondary rounded-4">
                  Saber más
                </button> */}
              </div>
            </div>
            <button type="button" className="catalogue-img rounded-4">
              <img src={productImg} alt="" />
            </button>
          </div>
        </div>
      </div>
      <br /><br /><br /><br /><br />

      <div className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="add-shopcard"
        tabindex="-1"
        aria-hidden="true">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Panzerotti Arequipe</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex justify-content-around align-items-center">
              <button className="btn btn-outline-secondary">
                <i className="bi bi-dash"></i>
              </button>
              <span>5</span>
              <button className="btn btn-outline-info">
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary rounded-4" data-bs-dismiss="modal">Cerrar</button>
              <button type="button" className="btn btn-outline-warning rounded-4">Guardar cambios</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Catalogue;