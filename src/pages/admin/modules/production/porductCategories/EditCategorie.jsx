import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditCategorie() {
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productCategories/${id}`);
        if (!response.ok) throw new Error('Error al cargar la categoría');
        const data = await response.json();
        setCategoryName(data.name);
      } catch (error) {
        setError(error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message,
        });
      }
    };
    fetchCategory();
  }, [id]);

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
      const response = await fetch(`http://localhost:3000/productCategories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Categoría actualizada',
          text: 'La categoría se ha actualizado exitosamente',
        }).then(() => {
          navigate('/admin/productCategories');
        });
      } else {
        throw new Error('Error al actualizar la categoría');
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
          <h2>Editar Categoría de Producto</h2>
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
              Guardar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCategorie;
