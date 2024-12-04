import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true)

    if (categoryName.trim() === '') {
      setIsSubmitting(false);
      setError('El nombre de la categoría no puede estar vacío');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de la categoría no puede estar vacío',
        customClass: {
          popup: 'rounded-5',
          confirmButton: 'btn btn-secondary rounded-5 px-3'
        }
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/productCategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          text: 'La categoría se ha creado exitosamente',
          customClass: {
            popup: 'rounded-5',
            confirmButton: 'btn btn-success rounded-5 px-3'
          }

        }).then(() => {
          navigate('/admin/productCategories');
        });
      } else {
        throw new Error('Error al crear la categoría');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancel = () => {
    navigate('/admin/productCategories')
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="form-container border rounded-4 mx-auto my-3 p-4">
        <form onSubmit={handleSubmit}>
          <h2 className='mb-3'>Crear categoría de producto</h2>
          <div className="row col-5 p-3">
            <label className='form-label'>Nombre</label>
            <input
              type="text"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Categoría"
            />
            {error && <div className="alert alert-danger mt-2">{error}</div>}
          </div>
          <div className="row d-flex gap-3 px-3">
            <button
            type='button'
              onClick={handleCancel}
              className="btn btn-secondary rounded-5 w-auto">
              Regresar
            </button>
            {isSubmitting ? (
              <button
                type="submit"
                className="btn btn-success rounded-5 w-auto"
                disabled >
                Guardando...
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-success rounded-5 w-auto">
                Guardar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCategory;
