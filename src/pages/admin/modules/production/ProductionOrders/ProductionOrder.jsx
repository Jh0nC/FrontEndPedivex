import React, { useState, useEffect } from 'react';
import Datatables from "../../../../../components/DatatableProductionOrder";
import ProductionOrderCreate from './ProductionOrderCreate';

function ProductionOrder() {
  const [datos, setDatos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/productionOrder");
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

  const refreshData = async () => {
    try {
      const response = await fetch("http://localhost:3000/productionOrder");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.json();
      setDatos(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleSave = () => {
    refreshData();
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

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
      <Datatables data={data} onAddClick={() => setShowModal(true)} />
      
      {showModal && (
        <ProductionOrderCreate
          onSave={handleSave}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default ProductionOrder;
