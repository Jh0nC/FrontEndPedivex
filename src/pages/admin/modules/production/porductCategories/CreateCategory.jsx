import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (categoryName.trim() === '') {
      setError('El nombre de la categoría no puede estar vacío');
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de la categoría no puede estar vacío',
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
        }).then(() => {
          navigate('/admin/productCategories');
        });
      } else {
        throw new Error('Error al crear la categoría');
      }
    } catch (error) {
      setError(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <form onSubmit={handleSubmit}>
        <div className="row m-2">
          <h2>Agregar categoría de producto</h2>
          <div className="mt-1 col-10 d-flex gap-4">
            <div className="col-4">
              <input
                type="text"
                className="form-control"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Nombre de la categoría"
              />
              {error && <div className="alert alert-danger mt-2">{error}</div>}
            </div>
            <button type="submit" className="btn btn-success rounded-5">
              Agregar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;
