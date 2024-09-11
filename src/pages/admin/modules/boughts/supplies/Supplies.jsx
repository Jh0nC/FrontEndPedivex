import Datatable from "../../../../../components/DatatableSupplies";
import React, { useState, useEffect } from 'react';

function Supplies() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/supplie");
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

  // Función para cambiar el estado del insumo a '2'
  const handleStateChange = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/supplie/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: 2 })
      });
      if (!response.ok) {
        throw new Error('Error al cambiar el estado');
      }

      // Actualiza el estado en la tabla después de la petición exitosa
      setDatos(prevDatos => prevDatos.map(item => (
        item.id === id ? { ...item, state: 2 } : item
      )));
    } catch (error) {
      console.error("Error al cambiar el estado del insumo:", error);
    }
  };

  const data = {
    module: "Insumos",
    title: "Insumos",
    colNames: ["Id", "Nombre", "Stock", "Unidad", "Estado", "Acciones"],
    content: datos.map(item => ({
      ...item,
      handleStateChange: () => handleStateChange(item.id) // Añade la función para cada insumo
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Supplies;
