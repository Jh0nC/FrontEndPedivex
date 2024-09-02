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
          <Link to={'create'} className="btn btn-success rounded-5 d-flex gap-2 align-items-center">
            Crear producto
            <i class="bi bi-plus-circle"></i>
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



// [
//   {
//     "id": 1,
//     "idDatasheet": 1,
//     "idCategorie": 1,
//     "name": "Panzerrotti ranchero",
//     "stock": 100,
//     "price": "2500",
//     "image": "imagen1.jpg",
//     "state": 1,
//     "productCategory": {
//       "id": 1,
//       "name": "Congelados"
//     },
//     "datasheet": {
//       "id": 1,
//       "idMass": 1,
//       "startDate": "2024-08-29T19:20:01.000Z",
//       "endDate": null,
//       "datasheetDetails": [
//         {
//           "id": 4,
//           "idDatasheet": 1,
//           "idSupplie": 14,
//           "amount": 0,
//           "unit": "lb",
//           "supply": {
//             "name": "queso mozarrela"
//           }
//         },
//         {
//           "id": 3,
//           "idDatasheet": 1,
//           "idSupplie": 13,
//           "amount": 0,
//           "unit": "lb",
//           "supply": {
//             "name": "bocadillo"
//           }
//         },
//         {
//           "id": 2,
//           "idDatasheet": 1,
//           "idSupplie": 12,
//           "amount": 0,
//           "unit": "lb",
//           "supply": {
//             "name": "arequipe"
//           }
//         },
//         {
//           "id": 1,
//           "idDatasheet": 1,
//           "idSupplie": 11,
//           "amount": 0,
//           "unit": "unit",
//           "supply": {
//             "name": "salchicha ranchera"
//           }
//         }
//       ],
//       "mass": {
//         "id": 1,
//         "name": "masa básica de panzerrotti",
//         "notes": "masa usada para panzerrottis o palitos apta para ser congelada",
//         "massDetails": [
//           {
//             "id": 4,
//             "idMass": 1,
//             "idSupplie": 10,
//             "amount": 23.5,
//             "unit": "gr",
//             "supply": {
//               "name": "hojaldres"
//             }
//           },
//           {
//             "id": 3,
//             "idMass": 1,
//             "idSupplie": 2,
//             "amount": 25,
//             "unit": "gr",
//             "supply": {
//               "name": "azúcar blanca"
//             }
//           },
//           {
//             "id": 2,
//             "idMass": 1,
//             "idSupplie": 3,
//             "amount": 10,
//             "unit": "gr",
//             "supply": {
//               "name": "sal fina"
//             }
//           },
//           {
//             "id": 1,
//             "idMass": 1,
//             "idSupplie": 1,
//             "amount": 500,
//             "unit": "gr",
//             "supply": {
//               "name": "harina de trigo"
//             }
//           }
//         ]
//       }
//     }
//   }
// ]