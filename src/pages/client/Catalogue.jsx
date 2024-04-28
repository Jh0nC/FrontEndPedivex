import productImg from "../../../public/assets/products/panzerotti_arequipe.jpg";

function Catalogue() {
  return (
    <>
      <div className="d-flex justify-content-center mt-3">
        <div className="catalogue-card border-type-mid p-5">
          <div className="catalogue-card-title border-type-mid">
            <span>Panzerotti Arequipe</span>
          </div>
          <div className="catalogue-card-body">
            <div className="card-content">
              <div className="list-unstyled">
                <b>Ingredientes: </b>
                <li>Arequipe</li>
                <li>Queso mozarella</li>
              </div>
              <div className="">
                
              </div>
            </div>
            <button type="button" className="catalogue-img rounded-4">
              <img src={productImg} alt="" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
};

export default Catalogue;