import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function boughtCreate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nroReceipt: '',
        date: '',
        total: '',
        state: 1,
        providerName: '',
        details: [
            {
                supplieName: '',
                amount: '',
                unit: '',
                costUnit: '',
                subtotal: '',
                state: 1
            }
        ]
    })

    const [proveedores, setProveedor] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        // Función para obtener los proveedores desde la API
        const fetchRoles = async () => {
            try {
                const response = await fetch('http://localhost:3000/provider');
                if (!response.ok) {
                    throw new Error('Error al obtener los proveedores');
                }
                const data = await response.json();
                setProveedor(data);
            } catch (error) {
                setError('Error al cargar proveedores: ' + error.message);
            }
        };

        fetchRoles(); // Llamar a la función cuando el componente se monta
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleDetailChange = (index, e) => {
        const { name, value } = e.target;
        const updatedDetails = formData.details.map((detail, i) =>
            i === index ? { ...detail, [name]: value } : detail
        );
        setFormData({
            ...formData,
            details: updatedDetails,
        });
    };

    const handleAddDetail = () => {
        setFormData({
            ...formData,
            details: [...formData.details, {
                supplieName: '',
                amount: '',
                unit: '',
                costUnit: '',
                subtotal: '',
                state: 1
            }]
        });
    };

    const handleRemoveDetail = (index) => {
        const updatedDetails = formData.details.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            details: updatedDetails,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = {
            ...formData,
            total: parseFloat(formData.total, 10),
        };
        try {
            const response = await fetch('http://localhost:3000/bought', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSend),
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }

            const result = await response.json();
            setSuccess('Compra creado con éxito');
            setError(null);
            setFormData({
                nroReceipt: '', date: '', total: '', providerName: '', details: [{
                    supplieName: '',
                    amount: '',
                    unit: '',
                    costUnit: '',
                    subtotal: '',
                    state: 1
                }]
            });

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Compra creada con éxito.',
            }).then(() => {
                navigate('/admin/boughts'); // Redireccionar después de hacer clic en "OK"
            });

            console.log('Response:', result);
        } catch (err) {
            setError(err.message);
            setSuccess(null);

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear la compra.',
            });
        }
    };

    return (
        <>
            <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
                <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
                    <h2>Crear Nueva Compra</h2>
                    <form onSubmit={handleSubmit} className='mt-3'>
                        <div className="row mb-3">
                            <div className="col-sm">
                                <label htmlFor="nroReceipt" className="form-label">Nro Recibo</label>
                                <input
                                    id="nroReceipt"
                                    className='form-control'
                                    type="text"
                                    name="nroReceipt"
                                    value={formData.nroReceipt}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-sm">
                                <label htmlFor="date" className="form-label">Fecha</label>
                                <input
                                    id="date"
                                    className='form-control'
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm">
                                <label htmlFor="total" className="form-label">Total</label>
                                <input
                                    id="total"
                                    className='form-control'
                                    type="number"
                                    name="total"
                                    value={formData.total}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-sm">
                                <label htmlFor="providerName" className="form-label">Proveedor</label>
                                <input
                                    id="providerName"
                                    className='form-control'
                                    type="text"
                                    name="providerName"
                                    value={formData.providerName}
                                    onChange={handleChange}
                                    required
                                    list='options'
                                />
                                <datalist id='options'>
                                    {proveedores.map((proveedor) => (
                                        <option value={proveedor.provider} />
                                    ))}
                                </datalist>
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className="mb-3">
                            <h5>Detalles de Compras</h5>
                            {formData.details.map((detail, index) => (
                                <div key={index} className="d-flex align-items-center mb-2 gap-2">
                                    <input
                                        id={`supplieName-${index}`}
                                        className="form-control"
                                        type="text"
                                        placeholder='Nombre Insumo'
                                        name="supplieName"
                                        value={detail.supplieName}
                                        onChange={(e) => handleDetailChange(index, e)}
                                        required
                                    />
                                    <input
                                        id={`amount-${index}`}
                                        className="form-control"
                                        type="number"
                                        placeholder='Cantidad'
                                        name="amount"
                                        value={detail.amount}
                                        onChange={(e) => handleDetailChange(index, e)}
                                        required
                                    />
                                    <select
                                        id={`unit-${index}`}
                                        className="form-control"
                                        name="unit"
                                        value={detail.unit}
                                        onChange={(e) => handleDetailChange(index, e)}
                                        required
                                    >
                                        <option value="gr">Gramos</option>
                                        <option value="ml">Mililitros</option>
                                        <option value="lb">Libras</option>
                                    </select>
                                    <input
                                        id={`costUnit-${index}`}
                                        className="form-control"
                                        type="number"
                                        placeholder='Costo Unidad'
                                        name="costUnit"
                                        value={detail.costUnit}
                                        onChange={(e) => handleDetailChange(index, e)}
                                        required
                                    />
                                    <input
                                        id={`subtotal-${index}`}
                                        className="form-control"
                                        type="number"
                                        placeholder='Subtotal'
                                        name="subtotal"
                                        value={detail.subtotal}
                                        onChange={(e) => handleDetailChange(index, e)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-4"
                                        onClick={() => handleRemoveDetail(index)}
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-info rounded-4"
                                onClick={handleAddDetail}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>

                        <div className="d-flex justify-content-end gap-2">
                            <Link to={"/admin/boughts"} className='btn btn-secondary rounded-5'>Cancelar</Link>
                            <button type="submit" className='btn btn-success rounded-5'>Guardar</button>
                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default boughtCreate;