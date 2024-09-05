import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateReturn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [saleDetails, setSaleDetails] = useState(null);
  const [motives, setMotives] = useState([]);
  const [products, setProducts] = useState([]);
  const [returnItems, setReturnItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [saleResponse, motivesResponse, productsResponse] = await Promise.all([
          fetch(`http://localhost:3000/sale/${id}`),
          fetch('http://localhost:3000/motivedevolution'),
          fetch('http://localhost:3000/product')
        ]);

        const [saleData, motivesData, productsData] = await Promise.all([
          saleResponse.json(),
          motivesResponse.json(),
          productsResponse.json()
        ]);

        setSaleDetails(saleData);
        setMotives(motivesData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire('Error', 'No se pudo cargar la información necesaria', 'error');
      }
    };

    fetchData();
  }, [id]);

  const handleAddReturnItem = () => {
    setReturnItems([...returnItems, { 
      productId: '', 
      quantity: 1, 
      motiveId: '', 
      exchangeProducts: []
    }]);
  };

  const handleReturnItemChange = (index, field, value) => {
    const updatedItems = [...returnItems];

    if (field === 'quantity') {
      const productId = updatedItems[index].productId;
      const saleDetail = saleDetails.saleDetails.find(detail => detail.product.id === productId);
      if (saleDetail && value > saleDetail.amount) {
        Swal.fire('Error', `La cantidad no puede ser mayor a la cantidad vendida (${saleDetail.amount})`, 'error');
        return;
      }
    }

    updatedItems[index][field] = value;
    setReturnItems(updatedItems);
  };

  const handleAddExchangeProduct = (returnIndex) => {
    const updatedItems = [...returnItems];
    updatedItems[returnIndex].exchangeProducts.push({ productId: '', quantity: 1 });
    setReturnItems(updatedItems);
  };

  const handleExchangeProductChange = (returnIndex, exchangeIndex, field, value) => {
    const updatedItems = [...returnItems];
    updatedItems[returnIndex].exchangeProducts[exchangeIndex][field] = value;
    setReturnItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idSale: saleDetails.id,
      date: new Date().toISOString(),
      state: 1, // Estado predeterminado
      details: returnItems.map(item => ({
        idProduct: item.productId,
        quantity: item.quantity,
        idMotive: item.motiveId,
        changedProduct: item.exchangeProducts.length > 0 ? item.exchangeProducts[0].productId : null, // Producto cambiado
        changedQuantity: item.exchangeProducts.length > 0 ? item.exchangeProducts[0].quantity : null, // Cantidad cambiada
        exchangeProducts: item.exchangeProducts.map(exchange => ({
          idProduct: exchange.productId,
          quantity: exchange.quantity
        }))
      }))
    };

    try {
      const response = await fetch('http://localhost:3000/devolution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        Swal.fire('Éxito', 'Devolución procesada correctamente', 'success');
        navigate('/admin/sales');
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.message || 'Error al procesar la devolución', 'error');
      }
    } catch (error) {
      Swal.fire('Error', 'No se pudo procesar la devolución', 'error');
      console.error("Error:", error);
    }
  };

  if (!saleDetails) return <div>Cargando...</div>;

  return (
    <div className="container mt-4">
      <h2>Realizar Devolución</h2>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Detalles de la Venta</h5>
          <p><strong>Fecha:</strong> {new Date(saleDetails.deliveryDate).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${saleDetails.total}</p>
          <p><strong>Cliente:</strong> {saleDetails.user.firstName} {saleDetails.user.lastName}</p>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Productos Vendidos</h5>
          <table className="table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {saleDetails.saleDetails.map((detail) => (
                <tr key={detail.id}>
                  <td>{detail.product.name}</td>
                  <td>{detail.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {returnItems.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Producto a devolver #{index + 1}</h5>
              <div className="mb-3">
                <label className="form-label">Producto</label>
                <select 
                  className="form-select"
                  value={item.productId}
                  onChange={(e) => handleReturnItemChange(index, 'productId', e.target.value)}
                  required
                >
                  <option value="">Seleccione un producto</option>
                  {saleDetails.saleDetails.map((detail) => (
                    <option key={detail.product.id} value={detail.product.id}>
                      {detail.product.name} (Cantidad vendida: {detail.amount})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad a devolver</label>
                <input 
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) => handleReturnItemChange(index, 'quantity', parseInt(e.target.value))}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Motivo de devolución</label>
                <select 
                  className="form-select"
                  value={item.motiveId}
                  onChange={(e) => handleReturnItemChange(index, 'motiveId', e.target.value)}
                  required
                >
                  <option value="">Seleccione un motivo</option>
                  {motives.map((motive) => (
                    <option key={motive.id} value={motive.id}>{motive.name}</option>
                  ))}
                </select>
              </div>

              <h6>Productos para cambio</h6>
              {item.exchangeProducts.map((exchangeItem, exchangeIndex) => (
                <div key={exchangeIndex} className="card mb-2">
                  <div className="card-body">
                    <div className="mb-2">
                      <label className="form-label">Nuevo producto</label>
                      <select 
                        className="form-select"
                        value={exchangeItem.productId}
                        onChange={(e) => handleExchangeProductChange(index, exchangeIndex, 'productId', e.target.value)}
                        required
                      >
                        <option value="">Seleccione un producto</option>
                        {products.map((product) => (
                          <option key={product.id} value={product.id}>{product.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Cantidad</label>
                      <input 
                        type="number"
                        className="form-control"
                        value={exchangeItem.quantity}
                        onChange={(e) => handleExchangeProductChange(index, exchangeIndex, 'quantity', parseInt(e.target.value))}
                        min="1"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button 
                type="button" 
                className="btn btn-secondary mt-2"
                onClick={() => handleAddExchangeProduct(index)}
              >
                + Agregar producto para cambio
              </button>
            </div>
          </div>
        ))}
        
        <button 
          type="button" 
          className="btn btn-primary mb-3"
          onClick={handleAddReturnItem}
        >
          + Agregar producto a devolver
        </button>

        <div>
          <button type="submit" className="btn btn-success">Procesar Devolución</button>
        </div>
      </form>
    </div>
  );
};

export default CreateReturn;
