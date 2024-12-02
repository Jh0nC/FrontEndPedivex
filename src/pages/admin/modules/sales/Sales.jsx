import Datatable from "../../../../components/DatatableSales";
import { useState, useEffect } from 'react';

function Sales() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("https://pedivexapi.onrender.com/sale");
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
    module: "Ventas",
    title: "Ventas",
    colNames: ["Id", "Fecha de venta", "Total", "Usuario", "Estado", "Acciones"],
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

export default Sales;