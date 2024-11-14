import React, { useEffect, useState } from 'react';
import productImg from "../client/Panzeroti.png"; // Imagen local
import Footer from "../../partials/Footer";

function Catalogue() {
  const [products, setProducts] = useState([]);

  // Función para consumir la API y obtener los productos
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://pedivexapi.onrender.com/product");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <div className="container-fluid p-5">
        <div className="row catalogue-prom-panel mb-4">
          <div className="col">
            <h1 className="text-center display-4">¡Mejores que Peliqueso!</h1>
          </div>
          <div className="col">
            <p className="lead text-center">Disfruta de nuestros deliciosos panzerottis, hechos con los mejores ingredientes. ¡Tu antojo, nuestra pasión!</p>
          </div>
        </div>
        <hr />
        <div className="row justify-content-center g-4">
          {products.filter(product => product.inCatalogue).map(product => (
            <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-4">
              <div className="card shadow-sm border-0 rounded-3">
                <img src={productImg} className="card-img-top rounded-3" alt={product.name} />
                <div className="card-body text-center">
                  <h5 className="card-title fs-5">{product.name}</h5>
                  <p className="card-text text-muted">Precio: ${product.price}</p>
                  <p className="card-text">
                    Ingredientes principales:
                    <ul className="list-unstyled">
                      {product.datasheet.datasheetDetails.slice(0, 3).map(ingredient => (
                        <li key={ingredient.id} className="small text-info">{ingredient.supply.name}</li>
                      ))}
                    </ul>
                  </p>
                  <a href="#" className="btn btn-primary btn-sm">Agregar al carrito</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Catalogue;
