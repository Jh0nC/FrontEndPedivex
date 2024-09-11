import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreateReturn = () => {
    const { id } = useParams();
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [motives, setMotives] = useState([]);
    const [saleId, setSaleId] = useState(id || '');
    const [devolutionDetails, setDevolutionDetails] = useState([]);
    const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        // Fetch products and motives
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:3000/product');
            const data = await response.json();
            setProducts(data);
        };

        const fetchMotives = async () => {
            const response = await fetch('http://localhost:3000/motivedevolution');
            const data = await response.json();
            setMotives(data);
        };

        fetchProducts();
        fetchMotives();
    }, []);

    useEffect(() => {
        if (saleId) {
            // Fetch sale details when saleId changes
            const fetchSaleDetails = async () => {
                const response = await fetch(`http://localhost:3000/sale/${saleId}`);
                const data = await response.json();

                const initialDetails = data.saleDetails.map((item) => ({
                    idProduct: item.idProduct,
                    quantity: item.amount,
                    idMotive: motives[0]?.id || 1,
                    changedProduct: item.idProduct,
                    changedQuantity: 0
                }));
                setDevolutionDetails(initialDetails);
            };

            fetchSaleDetails();
        }
    }, [saleId, motives]);

    const handleSaleIdChange = async (event) => {
        const id = event.target.value;
        setSaleId(id);
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...devolutionDetails];
        updatedDetails[index][field] = value;
        setDevolutionDetails(updatedDetails);
    };

    const handleAddDetail = () => {
        setDevolutionDetails([...devolutionDetails, {
            idProduct: products[0]?.id || 1,
            quantity: 1,
            idMotive: motives[0]?.id || 1,
            changedProduct: products[0]?.id || 1,
            changedQuantity: 0
        }]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch('http://localhost:3000/devolution/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idSale: saleId,
                devolutionDetails: devolutionDetails,
                date: formDate
            })
        });

        if (response.ok) {
            alert('Devolución creada exitosamente');
        } else {
            alert('Error al crear la devolución');
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Crear Devolución</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="saleId" className="form-label">ID de Venta:</label>
                    <input
                        type="text"
                        id="saleId"
                        className="form-control"
                        value={saleId}
                        onChange={handleSaleIdChange}
                        placeholder="Ingresa el ID de la venta"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="formDate" className="form-label">Fecha:</label>
                    <input
                        type="date"
                        id="formDate"
                        className="form-control"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                    />
                </div>

                {devolutionDetails.map((detail, index) => (
                    <div key={index} className="border rounded p-3 mb-3">
                        <h4 className="mb-3">Producto {index + 1}</h4>
                        <div className="mb-3">
                            <label htmlFor={`product-${index}`} className="form-label">Producto:</label>
                            <select
                                id={`product-${index}`}
                                className="form-select"
                                value={detail.idProduct}
                                onChange={(e) => handleDetailChange(index, 'idProduct', parseInt(e.target.value))}
                            >
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`quantity-${index}`} className="form-label">Cantidad:</label>
                            <input
                                type="number"
                                id={`quantity-${index}`}
                                className="form-control"
                                value={detail.quantity}
                                min="1"
                                max="100"
                                onChange={(e) => handleDetailChange(index, 'quantity', parseInt(e.target.value))}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`motive-${index}`} className="form-label">Motivo:</label>
                            <select
                                id={`motive-${index}`}
                                className="form-select"
                                value={detail.idMotive}
                                onChange={(e) => handleDetailChange(index, 'idMotive', parseInt(e.target.value))}
                            >
                                {motives.map(motive => (
                                    <option key={motive.id} value={motive.id}>{motive.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`changedProduct-${index}`} className="form-label">Producto cambiado:</label>
                            <select
                                id={`changedProduct-${index}`}
                                className="form-select"
                                value={detail.changedProduct}
                                onChange={(e) => handleDetailChange(index, 'changedProduct', parseInt(e.target.value))}
                            >
                                {products.map(product => (
                                    <option key={product.id} value={product.id}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor={`changedQuantity-${index}`} className="form-label">Cantidad cambiada:</label>
                            <input
                                type="number"
                                id={`changedQuantity-${index}`}
                                className="form-control"
                                value={detail.changedQuantity}
                                min="0"
                                max="100"
                                onChange={(e) => handleDetailChange(index, 'changedQuantity', parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                ))}

                <button type="button" className="btn btn-primary mb-3" onClick={handleAddDetail}>Agregar Producto</button>
                <button type="submit" className="btn btn-success">Enviar</button>
            </form>
        </div>
    );
};

export default CreateReturn;
