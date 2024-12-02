import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function SupplieUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchSupplie = async () => {
      try {
        const response = await fetch(`https://pedivexapi.onrender.com/supplie/${id}`);
        if (!response.ok) {
          throw new Error('Error en la solicitud de datos');
        }
        const data = await response.json();
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los datos del insumo.',
        });
      }
    };

    fetchSupplie();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`https://pedivexapi.onrender.com/supplie/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Insumo editado con éxito.',
      }).then(() => {
        navigate('/admin/supplies');
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al editar el insumo.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Editar Insumo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='m-3'>
          <label htmlFor="name" className="form-label">Nombre:</label>
          <input
            id="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            type="text"
            {...register("name", {
              required: "El nombre es obligatorio",
              maxLength: { value: 50, message: "El nombre debe tener como máximo 50 caracteres" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "El nombre solo puede contener letras y espacios" },
            })}
          />
          {errors.name && <div className="alert alert-danger p-1 col">{errors.name.message}</div>}
        </div>
        <div className='m-3'>
          <label htmlFor="stock" className="form-label">Cantidad en Stock:</label>
          <input
            id="stock"
            className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
            type="number"
            {...register("stock", {
              required: "La cantidad en stock es obligatoria",
              min: { value: 1, message: "La cantidad debe ser mayor a 0" },
            })}
          />
          {errors.stock && <div className="alert alert-danger p-1 col">{errors.stock.message}</div>}
        </div>
        <div className='m-3'>
          <label htmlFor="unit" className="form-label">Unidad:</label>
          <select
            id="unit"
            className={`form-control ${errors.unit ? 'is-invalid' : ''}`}
            {...register("unit", { required: "Seleccione una unidad" })}
          >
            <option value="gr">Gramos</option>
            <option value="ml">Mililitros</option>
            <option value="unit">Unidades</option>
          </select>
          {errors.unit && <div className="alert alert-danger p-1 col">{errors.unit.message}</div>}
        </div>
        <div className="m-3 d-flex gap-3">
          <button type="submit" className='btn btn-success rounded-5'>Editar</button>
          <Link to={"/admin/supplies"} className='btn btn-secondary rounded-5'>Regresar</Link>
        </div>
      </form>
    </div>
  );
}

export default SupplieUpdate;
