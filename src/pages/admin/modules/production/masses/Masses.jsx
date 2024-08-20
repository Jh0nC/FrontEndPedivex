import Datatable from "../../../../../components/DatatableMasses";
import { useEffect, useState } from 'react';

function Masses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simula una llamada API para obtener las masas
    fetch('http://localhost:2145/masses')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching masses:', error));
  }, []);

  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <Datatable data={data} />
      </div>
    </>
  );
}

export default Masses;




/// formato con el que llega data
// const data = [
//   {
//     "id": 1,
//     "name": "masa básica de panzerrotti",
//     "notes": "masa usada para panzerrottis o palitos apta para ser congelada",
//     "massDetails": [
//       {
//         "id": 1,
//         "idMass": 1,
//         "idSupplie": 1,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "harina white black"
//         }
//       },
//       {
//         "id": 2,
//         "idMass": 1,
//         "idSupplie": 3,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "sal fina"
//         }
//       },
//       {
//         "id": 3,
//         "idMass": 1,
//         "idSupplie": 2,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "azúcar blanca"
//         }
//       },
//       {
//         "id": 4,
//         "idMass": 1,
//         "idSupplie": 10,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "hojaldres"
//         }
//       }
//     ]
//   },
//   {
//     "id": 2,
//     "name": "masa básica de palitos",
//     "notes": "masa usada para la creacion de los palitos apta para ser congelada sin perder sus propiedades de levadura",
//     "massDetails": [
//       {
//         "id": 5,
//         "idMass": 2,
//         "idSupplie": 1,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "harina white black"
//         }
//       },
//       {
//         "id": 6,
//         "idMass": 2,
//         "idSupplie": 3,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "sal fina"
//         }
//       },
//       {
//         "id": 7,
//         "idMass": 2,
//         "idSupplie": 2,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "azúcar blanca"
//         }
//       },
//       {
//         "id": 8,
//         "idMass": 2,
//         "idSupplie": 4,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "levadura seca instantánea"
//         }
//       },
//       {
//         "id": 9,
//         "idMass": 2,
//         "idSupplie": 5,
//         "amount": 0,
//         "unit": "gr",
//         "supply": {
//           "name": "mantequilla sin sal"
//         }
//       }
//     ]
//   }
// ]