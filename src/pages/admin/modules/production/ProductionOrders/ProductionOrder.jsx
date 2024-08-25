import Datatable from "../../../../../components/DatatableProductionOrder";
import React, { useState, useEffect } from 'react';

function ProductionOrder() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:2145/productionOrder");
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
    module: "OrdenProduccion",
    title: "Ordenes de Producción",
    colNames: ["Id", "Fecha", "Notas", "Usuario", "Estado", "Fecha Entrega", "Acciones"],
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

export default ProductionOrder;