import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

function BoughtCreate() {
    const navigate = useNavigate();
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        defaultValues: {
            nroReceipt: '',
            date: '',
            total: '',
            providerName: '',
            state: 1, // Aseguramos que state esté por defecto en 1
            details: [
                {
                    supplieName: '',
                    amount: '',
                    unit: 'gr', // Valor por defecto para el campo unit
                    costUnit: '',
                    subtotal: '',
                    state: 1, // State por defecto en 1
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'details',
    });

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

    const onSubmit = async (data) => {
        // Convertimos el total a un número antes de enviarlo
        const formDataToSend = {
            ...data,
            total: parseFloat(data.total, 10),
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
            setSuccess('Compra creada con éxito');
            setError(null);
            reset(); // Reseteamos el formulario después de una solicitud exitosa

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
                    <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
                        <div className="row mb-3">
                            <div className="col-sm">
                                <label htmlFor="nroReceipt" className="form-label">Nro Recibo</label>
                                <input
                                    id="nroReceipt"
                                    className='form-control'
                                    type="text"
                                    {...register('nroReceipt', { required: true })}
                                />
                                {errors.nroReceipt?.type === 'required' && (
                                    <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                )}
                            </div>
                            <div className="col-sm">
                                <label htmlFor="date" className="form-label">Fecha</label>
                                <input
                                    id="date"
                                    className='form-control'
                                    type="date"
                                    {...register('date', { required: true })}
                                />
                                {errors.date?.type === 'required' && (
                                    <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                )}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-sm">
                                <label htmlFor="total" className="form-label">Total</label>
                                <input
                                    id="total"
                                    className='form-control'
                                    type="number"
                                    {...register('total', { required: 'Este campo es obligatorio' })}
                                />
                                {errors.total?.type === 'required' && (
                                    <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                )}
                            </div>
                            <div className="col-sm">
                                <label htmlFor="providerName" className="form-label">Proveedor</label>
                                <input
                                    id="providerName"
                                    className='form-control'
                                    type="text"
                                    {...register('providerName', { required: 'Este campo es obligatorio' })}
                                    list='options'
                                />
                                <datalist id='options'>
                                    {proveedores.map((proveedor) => (
                                        <option key={proveedor.provider} value={proveedor.provider} />
                                    ))}
                                </datalist>
                                {errors.providerName?.type === 'required' && (
                                    <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                )}
                            </div>
                        </div>
                        <hr className="mx-3" />
                        <div className="mb-3">
                            <h5>Detalles de Compras</h5>
                            {fields.map((item, index) => (
                                <div key={item.id} className="d-flex align-items-center mb-2 gap-2">
                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control"
                                            placeholder='Nombre Insumo'
                                            {...register(`details.${index}.supplieName`, { required: true })}
                                        />
                                        {errors?.details?.[index]?.supplieName?.type === 'required' && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control"
                                            type="number"
                                            placeholder='Cantidad'
                                            {...register(`details.${index}.amount`, { required: true })}
                                        />
                                        {errors?.details?.[index]?.amount?.type === 'required' && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column">
                                        <select
                                            className="form-control"
                                            {...register(`details.${index}.unit`)}
                                        >
                                            <option value="gr">Gramos</option>
                                            <option value="ml">Mililitros</option>
                                            <option value="unit">Unidades</option>
                                        </select>
                                    </div>

                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control"
                                            type="number"
                                            placeholder='Costo Unidad'
                                            {...register(`details.${index}.costUnit`, { required: true })}
                                        />
                                        {errors?.details?.[index]?.costUnit?.type === 'required' && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control"
                                            type="number"
                                            placeholder='Subtotal'
                                            {...register(`details.${index}.subtotal`, { required: true })}
                                        />
                                        {errors?.details?.[index]?.subtotal?.type === 'required' && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-4"
                                        onClick={() => remove(index)}
                                    >
                                        <i className="bi bi-dash"></i>
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="btn btn-info rounded-4"
                                onClick={() =>
                                    append({
                                        supplieName: '',
                                        amount: '',
                                        unit: 'gr',
                                        costUnit: '',
                                        subtotal: '',
                                        state: 1, // Aseguramos que state esté en 1
                                    })
                                }
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
    );
}

export default BoughtCreate;