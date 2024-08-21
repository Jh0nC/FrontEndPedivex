import Datatable from "../../../../components/DatatableDevolution";
import React, { useState, useEffect } from 'react';

function Supplies() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/devolution");
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
    module: "Devoluciones",
    title: "Devoluciones",
    colNames: ["Id", "Numero venta", "Fecha", "Estado", "Motive", "Acciones"],
    content: datos.map(item => ({
      ...item,

    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Supplies;