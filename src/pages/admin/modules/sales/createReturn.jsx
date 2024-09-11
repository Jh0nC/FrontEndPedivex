import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CreateReturn = () => {
    const { id } = useParams(); // Obtén el ID de la URL
    const [sales, setSales] = useState([]);
    const [products, setProducts] = useState([]);
    const [motives, setMotives] = useState([]);
    const [saleId, setSaleId] = useState(id || ''); // Usa el ID de la URL si está disponible
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

                // Initialize devolution details based on sale details
                const initialDetails = data.saleDetails.map((item) => ({
                    idProduct: item.idProduct,
                    quantity: item.amount,
                    idMotive: motives[0]?.id || 1, // Default to the first motive if available
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
            idProduct: products[0]?.id || 1, // Default to the first product if available
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>ID de Venta:</label>
                <input
                    type="text"
                    value={saleId}
                    onChange={handleSaleIdChange}
                    placeholder="Ingresa el ID de la venta"
                />
            </div>

            <div>
                <label>Fecha:</label>
                <input type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} />
            </div>

            {devolutionDetails.map((detail, index) => (
                <div key={index}>
                    <h4>Producto {index + 1}</h4>
                    <div>
                        <label>Producto:</label>
                        <select
                            value={detail.idProduct}
                            onChange={(e) => handleDetailChange(index, 'idProduct', parseInt(e.target.value))}
                        >
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cantidad:</label>
                        <input
                            type="number"
                            value={detail.quantity}
                            min="1"
                            max="100" // Ajusta según las necesidades
                            onChange={(e) => handleDetailChange(index, 'quantity', parseInt(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Motivo:</label>
                        <select
                            value={detail.idMotive}
                            onChange={(e) => handleDetailChange(index, 'idMotive', parseInt(e.target.value))}
                        >
                            {motives.map(motive => (
                                <option key={motive.id} value={motive.id}>{motive.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Producto cambiado:</label>
                        <select
                            value={detail.changedProduct}
                            onChange={(e) => handleDetailChange(index, 'changedProduct', parseInt(e.target.value))}
                        >
                            {products.map(product => (
                                <option key={product.id} value={product.id}>{product.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Cantidad cambiada:</label>
                        <input
                            type="number"
                            value={detail.changedQuantity}
                            min="0"
                            max="100" // Ajusta según las necesidades
                            onChange={(e) => handleDetailChange(index, 'changedQuantity', parseInt(e.target.value))}
                        />
                    </div>
                </div>
            ))}

            <button type="button" onClick={handleAddDetail}>Agregar Producto</button>
            <button type="submit">Enviar</button>
        </form>
    );
};

export default CreateReturn;
