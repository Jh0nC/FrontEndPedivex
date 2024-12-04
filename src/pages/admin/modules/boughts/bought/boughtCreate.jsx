import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

function BoughtCreate() {
    const navigate = useNavigate();
    const { register, handleSubmit, control, reset, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            nroReceipt: '',
            date: '',
            total: '',
            providerName: '',
            state: 1,
            details: [
                {
                    supplieName: '',
                    amount: '',
                    unit: '',
                    cost: '',
                    state: 1,
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'details',
    });

    const [supplies, setSupplies] = useState([]);
    const [proveedores, setProveedor] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const detalles = watch("details");

    const selectedSupplieNames = watch("details").map(detail => detail.supplieName);

    useEffect(() => {
        const calcularTotal = () => {
            const total = detalles.reduce((acc, item) => {
                return acc + (parseFloat(item.cost) || 0);
            }, 0);
            setValue("total", total.toFixed(2));
        };

        calcularTotal();
    }, [detalles, setValue]);

    useEffect(() => {
        const fetchInsumos = async () => {
            try {
              const response = await fetch('http://localhost:3000/supplie');
              if (!response.ok) {
                throw new Error('Error al obtener los insumos');
              }
              const data = await response.json();
              const activos = data.filter(insumo => insumo.state === 1);
              setSupplies(activos);
            } catch (error) {
              setError('Error al cargar insumos: ' + error.message);
            }
        };

        fetchInsumos();

        const fetchProveedores = async () => {
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

        fetchProveedores();
    }, []);

    // Effect to update unit based on selected supplieName
    useEffect(() => {
        detalles.forEach((detalle, index) => {
            const selectedSupplie = supplies.find(supplie => supplie.name === detalle.supplieName);
            if (selectedSupplie && selectedSupplie.unit) {
                setValue(`details.${index}.unit`, selectedSupplie.unit);
            }
        });
    }, [detalles, supplies, setValue]);

    const onSubmit = async (data) => {
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
            reset();

            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Compra creada con éxito.',
            }).then(() => {
                navigate('/admin/boughts');
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
                                <label htmlFor="nroReceipt" className="form-label">Nro Recibo <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    id="nroReceipt"
                                    className='form-control'
                                    type="text"
                                    {...register('nroReceipt', { required: true, maxLength:255 })}
                                />
                                {errors.nroReceipt && (
                                    <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                )}
                                {errors.nroReceipt?.type=== 'maxLength' && (
                                    <div className="alert alert-danger p-1 col mt-2">Este solo puede tener maximo 255 caracteres</div>
                                )}
                            </div>
                            <div className="col-sm">
                                <label htmlFor="date" className="form-label">Fecha <span style={{ color: 'red' }}>*</span></label>
                                <input
                                    id="date"
                                    className='form-control'
                                    type="date"
                                    {...register('date', { required: true })}
                                />
                                {errors.date && (
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
                                    min={0}
                                    disabled
                                    {...register('total', { required: 'Este campo es obligatorio' })}
                                />
                                {errors.total && (
                                    <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                )}
                            </div>
                            <div className="col-sm">
                                <label htmlFor="providerName" className="form-label">Proveedor <span style={{ color: 'red' }}>*</span></label>
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
                                {errors.providerName && (
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
                                        <select
                                            className="form-control"
                                            placeholder='Nombre Insumo'
                                            {...register(`details.${index}.supplieName`, { required: true })}
                                        >
                                            <option value="">Seleccione un insumo</option>
                                            {supplies
                                                .filter(supplie => !selectedSupplieNames.includes(supplie.name) || supplie.name === detalles[index].supplieName)
                                                .map((supplie) => (
                                                    <option key={supplie.name} value={supplie.name}>
                                                        {supplie.name}
                                                    </option>
                                            ))}
                                        </select>
                                        {errors?.details?.[index]?.supplieName && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control"
                                            type="number"
                                            placeholder='Cantidad'
                                            min={0}
                                            {...register(`details.${index}.amount`, { required: true })}
                                        />
                                        {errors?.details?.[index]?.amount && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column">
                                        <select
                                            className="form-control"
                                            disabled
                                            {...register(`details.${index}.unit`, { required: true })}
                                        >
                                            <option value="gr">Gramos</option>
                                            <option value="ml">Mililitros</option>
                                            <option value="unit">Unidades</option>
                                        </select>
                                        {errors?.details?.[index]?.amount && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <div className="d-flex flex-column">
                                        <input
                                            className="form-control"
                                            type="number"
                                            placeholder='Costo'
                                            min={0}
                                            {...register(`details.${index}.cost`, { required: true })}
                                        />
                                        {errors?.details?.[index]?.cost && (
                                            <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        className="btn btn-secondary rounded-4"
                                        onClick={() => remove(index)}
                                        disabled={detalles.length == 1}
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
                                        unit: '',
                                        cost: '',
                                        state: 1,
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
