import Datatable from "../../../../../components/DatatableMasses";
import { useEffect, useState } from 'react';

function Masses() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simula una llamada API para obtener las masas
    fetch('http://localhost:3000/masses')
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
