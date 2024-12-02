import Datatable from "../../../../../components/DatatableBoughts";
import React, { useState, useEffect } from 'react';

function Boughts() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("https://pedivexapi.onrender.com/bought");
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
    module: "Compras",
    title: "Compras",
    colNames: ["Id", "Nro Recibo", "Fecha", "Total", "Proveedor", "Acciones"],
    content: datos.map(item => ({
      ...item,
      date: item.date.split('T')[0]
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Boughts;