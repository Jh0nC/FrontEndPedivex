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
          <button className="btn btn-primary">agregar nuevo producto</button>
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
    </>
  )
};

export default Products;