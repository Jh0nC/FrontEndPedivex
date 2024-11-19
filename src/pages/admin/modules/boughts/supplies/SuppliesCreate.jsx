import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function SupplieCreate() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const enviarFormulario = async (formData) => {
    try {
      const response = await fetch('http://localhost:3000/supplie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, state: '1' }),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Insumo creado con éxito');
      setError(null);
      reset(); // Limpiar el formulario después de enviar

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Insumo creado con éxito.',
      }).then(() => {
        navigate('/admin/supplies'); // Redireccionar después de hacer clic en "OK"
      });

      console.log('Insumo creado:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el insumo.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Crear Nuevo Insumo</h2>
      <form onSubmit={handleSubmit(enviarFormulario)}>
        <div className='m-3'>
          <label htmlFor="name" className="form-label">Nombre:</label>
          <input
            id="name"
            className='form-control'
            type="text"
            {...register("name", { required: true, maxLength: 50, pattern: /^[A-Za-z\s]+$/ })}
          />
          {errors.name?.type === "required" && (
            <div className="alert alert-danger p-1 col">Ingrese el nombre</div>
          )}
          {errors.name?.type === "maxLength" && (
            <div className="alert alert-danger p-1 col">El nombre debe tener como máximo 50 caracteres</div>
          )}
          {errors.name?.type === "pattern" && (
            <div className="alert alert-danger p-1 col">El nombre solo puede contener letras y espacios</div>
          )}
        </div>
        <div className='m-3'>
          <label htmlFor="stock" className="form-label">Cantidad en Stock:</label>
          <input
            id="stock"
            className='form-control'
            type="number"
            {...register("stock", { required: true, min: 1 })}
          />
          {errors.stock?.type === "required" && (
            <div className="alert alert-danger p-1 col">Ingrese la cantidad en stock</div>
          )}
          {errors.stock?.type === "min" && (
            <div className="alert alert-danger p-1 col">La cantidad debe ser mayor a 0</div>
          )}
        </div>
        <div className='m-3'>
          <label htmlFor="unit" className="form-label">Unidad:</label>
          <select
            id="unit"
            className='form-control'
            {...register("unit", { required: true })}
          >
            <option value="gr">Gramos</option>
            <option value="ml">Mililitros</option>
            <option value="unit">Unidades</option>
          </select>
          {errors.unit && (
            <div className="alert alert-danger p-1 col">Seleccione una unidad</div>
          )}
        </div>
        <div className="m-3 d-flex gap-3">
          <button type="submit" className='btn btn-success rounded-5'>Registrar</button>
          <Link to={"/admin/supplies"} className='btn btn-secondary rounded-5'>Regresar</Link>
        </div>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default SupplieCreate;
