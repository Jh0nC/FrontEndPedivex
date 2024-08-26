import { Link } from "react-router-dom";
import Card from "../../../../../components/Card";
import { useState, useEffect } from "react";

function Products() {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/product')
      .then(response => response.json())
      .then(data => setCardsData(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  

  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <div className="datatable_header mb-4">
          <h2>Productos</h2>
          <Link to={'create'} className="btn btn-warning rounded-5">
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
    </>
  )
};

export default Products;