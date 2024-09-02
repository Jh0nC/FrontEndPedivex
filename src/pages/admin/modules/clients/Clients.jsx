import Datatable from "../../../../components/DatatableClients";
import { useEffect, useState } from 'react';

function Clients() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/user/clients')
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

export default Clients;
