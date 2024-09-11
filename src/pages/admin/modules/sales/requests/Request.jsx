import Datatable from "../../../../../components/DatatablesRequest"; // Adaptado para pedidos
import React, { useState, useEffect } from 'react';

function Request() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/request"); // URL de la API para pedidos
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
    module: "Pedidos",
    title: "Gestión de Pedidos",
    colNames: ["Id", "Fecha Creación", "Usuario", "Total", "Estado", "Fecha Límite", "Acciones"],
    content: datos.map(item => ({
      ...item,
      date: item.date ? item.date.split('T')[0] : "Fecha no disponible"
    }))
  };
  

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Request;