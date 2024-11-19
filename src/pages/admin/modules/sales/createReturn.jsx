import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PlusCircle, Trash2 } from 'lucide-react';

const CreateReturn = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [motives, setMotives] = useState([]);
  const [saleId, setSaleId] = useState(id || '');
  const [saleInfo, setSaleInfo] = useState(null);
  const [returnDetails, setReturnDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsResponse, motivesResponse] = await Promise.all([
          fetch('http://localhost:3000/product'),
          fetch('http://localhost:3000/motivedevolution')
        ]);

        const productsData = await productsResponse.json();
        const motivesData = await motivesResponse.json();

        setProducts(productsData);
        setMotives(motivesData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (saleId) {
      const fetchSaleDetails = async () => {
        try {
          const response = await fetch(`http://localhost:3000/sale/${saleId}`);
          const data = await response.json();

          setSaleInfo(data);
          const initialDetails = data.saleDetails.map((item) => ({
            idProduct: item.idProduct,
            productName: item.product.name,
            quantity: 0,
            maxQuantity: item.amount,
            idMotive: motives[0]?.id || 1,
            changedProduct: products[0]?.id || 1,
            changedQuantity: 0,
          }));

          setReturnDetails(initialDetails);
        } catch (error) {
          console.error("Error fetching sale details:", error);
        }
      };

      fetchSaleDetails();
    }
  }, [saleId, motives]);

  const validateField = (index, field, value) => {
    const fieldErrors = { ...errors };

    if (field === 'quantity') {
      if (value < 0 || value > returnDetails[index].maxQuantity) {
        fieldErrors[`${index}-${field}`] = `Quantity must be between 0 and ${returnDetails[index].maxQuantity}`;
      } else {
        delete fieldErrors[`${index}-${field}`];
      }
    }

    if (field === 'changedQuantity') {
      if (value < 0) {
        fieldErrors[`${index}-${field}`] = 'Changed quantity cannot be negative';
      } else if (value > returnDetails[index].quantity) {
        fieldErrors[`${index}-${field}`] = 'Changed quantity cannot exceed quantity';
      } else {
        delete fieldErrors[`${index}-${field}`];
      }
    }

    setErrors(fieldErrors);
  };

  const handleReturnDetailsChange = (index, field, value) => {
    const updatedDetails = [...returnDetails];
    updatedDetails[index][field] = value;
    setReturnDetails(updatedDetails);

    validateField(index, field, value);
  };

  const removeReturnDetail = (index) => {
    const updatedDetails = returnDetails.filter((_, i) => i !== index);
    setReturnDetails(updatedDetails);

    const updatedErrors = Object.keys(errors).reduce((acc, key) => {
      if (!key.startsWith(`${index}-`)) acc[key] = errors[key];
      return acc;
    }, {});
    setErrors(updatedErrors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (Object.keys(errors).length > 0) {
      alert('Please fix the errors before submitting');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/devolution/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idSale: saleId,
          devolutionDetails: returnDetails.map((detail) => ({
            idProduct: detail.idProduct,
            quantity: detail.quantity,
            idMotive: detail.idMotive,
            changedProduct: detail.changedProduct,
            changedQuantity: detail.changedQuantity,
          })),
          date: formDate,
        }),
      });

      if (response.ok) {
        alert('Return created successfully');
      } else {
        alert('Error creating return');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error creating return');
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <div className="card">
          <div className="card-header">
            <h2 className="text-2xl font-bold">Devolver Producto</h2>
          </div>
          <div className="card-body">
            <div className="mb-4">
              <label htmlFor="saleId" className="form-label">Sale ID</label>
              <input
                id="saleId"
                className="form-control"
                value={saleId}
                onChange={(e) => setSaleId(e.target.value)}
                placeholder="Enter Sale ID"
              />
            </div>

            {saleInfo && (
              <div className="mb-4 bg-light p-3 rounded">
                <h3 className="text-lg font-semibold mb-2">Detalle de venta</h3>
                <p><strong>Cliente:</strong> {`${saleInfo.user.firstName} ${saleInfo.user.lastName}`}</p>
                <p><strong>Total:</strong> ${parseFloat(saleInfo.total).toFixed(2)}</p>
              </div>
            )}

            {returnDetails.map((detail, index) => (
              <div key={index} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="card-title">Devolver producto </h4>
                    <button
                      className="btn btn-outline-danger rounded-5"
                      onClick={() => removeReturnDetail(index)}
                    >
                      Eliminar producto
                    </button>
                  </div>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Producto</label>
                      <select
                        className={`form-select ${errors[`${index}-idProduct`] ? 'is-invalid' : ''}`}
                        value={detail.idProduct}
                        onChange={(e) => handleReturnDetailsChange(index, 'idProduct', parseInt(e.target.value))}
                      >
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Cantidad</label>
                      <input
                        type="number"
                        className={`form-control ${errors[`${index}-quantity`] ? 'is-invalid' : ''}`}
                        value={detail.quantity}
                        min="0"
                        max={detail.maxQuantity}
                        onChange={(e) => handleReturnDetailsChange(index, 'quantity', parseInt(e.target.value))}
                      />
                      {errors[`${index}-quantity`] && (
                        
                        <div className="alert alert-danger p-1 col">{errors[`${index}-quantity`]}</div>
                      )}
                      <small className="form-text text-muted">
                        Max: {detail.maxQuantity} Unidades
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Motivo devolucion </label>
                      <select
                        className={`form-select ${errors[`${index}-idMotive`] ? 'is-invalid' : ''}`}
                        value={detail.idMotive}
                        onChange={(e) => handleReturnDetailsChange(index, 'idMotive', parseInt(e.target.value))}
                      >
                        {motives.map(motive => (
                          <option key={motive.id} value={motive.id}>
                            {motive.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Producto a cambiar</label>
                      <select
                        className={`form-select ${errors[`${index}-changedProduct`] ? 'is-invalid' : ''}`}
                        value={detail.changedProduct}
                        onChange={(e) => handleReturnDetailsChange(index, 'changedProduct', parseInt(e.target.value))}
                      >
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Cantidad a cambiar</label>
                      <input
                        type="number"
                        className={`form-control ${errors[`${index}-changedQuantity`] ? 'is-invalid' : ''}`}
                        value={detail.changedQuantity}
                        min="0"
                        max={detail.quantity}
                        onChange={(e) => handleReturnDetailsChange(index, 'changedQuantity', parseInt(e.target.value))}
                      />
                      {errors[`${index}-changedQuantity`] && (
                        <small className="text-danger">{errors[`${index}-changedQuantity`]}</small>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-success rounded-5"
                onClick={handleSubmit}
              >
                Realizar Devolucion
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReturn;
