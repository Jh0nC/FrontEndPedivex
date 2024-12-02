import Datatable from "../../../../../components/DatatableCategories";
import { useEffect, useState } from 'react';

function ProductCategories() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simula una llamada API para obtener las masas
    fetch('https://pedivexapi.onrender.com/productCategories')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching productCategories:', error));
  }, []);

  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <Datatable data={data} />
      </div>
    </>
  );
} 

export default ProductCategories;