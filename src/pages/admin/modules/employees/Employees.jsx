import Datatable from "../../../../../src/components/DatatableEmployees"; 
import React, { useState, useEffect } from 'react';

function Clients() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/employee"); 
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchDatos();
  }, []);

  const data = {
    module: "Empleados", 
    title: "Empleados",  
    colNames: ["Id", "Nombre", "Documento", "Dirección", "Teléfono",  "Acciones"],
    content: datos.map(item => ({
      ...item
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Clients;
