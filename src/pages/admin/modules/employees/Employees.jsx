import Datatable from "../../../../components/DatatableEmployees";
import { useEffect, useState } from 'react';

function Employees() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/user/employees')
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

export default Employees;
