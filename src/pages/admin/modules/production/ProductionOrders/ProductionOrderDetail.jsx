import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el ID de la orden desde la URL
import { Link } from 'react-router-dom';

function ProductionOrderDetail() {
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Obtener el ID de la orden desde la URL

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productionOrder/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (error) {
    return <div className="text-danger">Error: {error}</div>;
  }

  if (!orderDetails) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className="mx-3">Detalles de la Orden de Producción</h2>
      <div className="m-3">
        <p><strong>ID:</strong> {orderDetails.id}</p>
        <p><strong>Fecha:</strong> {new Date(orderDetails.date).toLocaleDateString()}</p>
        <p><strong>Notas:</strong> {orderDetails.notes}</p>
        <p><strong>ID Usuario:</strong> {orderDetails.idUser}</p>
        <p><strong>Estado:</strong> {orderDetails.state}</p>
        <p><strong>Fecha de Entrega:</strong> {new Date(orderDetails.targetDate).toLocaleDateString()}</p>
      </div>
      <Link to="/admin/production-order" className="btn btn-danger m-3">Regresar</Link>
    </div>
  );
}

export default ProductionOrderDetail;
