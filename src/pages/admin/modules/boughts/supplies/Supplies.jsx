import Datatable from "../../../../../components/DatatableSupplies";
import React, { useState, useEffect } from 'react';

function Supplies() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("https://pedivexapi.onrender.com/supplie");
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

  // Función para cambiar el estado del insumo entre 1 y 2
  const handleStateChange = async (id, currentState) => {
    const newState = currentState === 1 ? 2 : 1; // Cambia entre 1 y 2

    try {
      const response = await fetch(`https://pedivexapi.onrender.com/supplie/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: newState })
      });
      if (!response.ok) {
        throw new Error('Error al cambiar el estado');
      }

      // Actualiza el estado en la tabla después de la petición exitosa
      setDatos(prevDatos => prevDatos.map(item => (
        item.id === id ? { ...item, state: newState } : item
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
      handleStateChange: () => handleStateChange(item.id, item.state) // Pasa el estado actual
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Supplies;
