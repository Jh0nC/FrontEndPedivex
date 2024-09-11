import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EditCategorie() {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate();
  const [category, setCategory] = useState({ name: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Obtener la categoría por ID
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productCategories/${id}`);
        if (response.ok) {
          const data = await response.json();
          setCategory(data);
          setLoading(false);
        } else {
          throw new Error('No se pudo obtener la categoría.');
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCategory();
  }, [id]);

  // Manejar la actualización del formulario
  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/productCategories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        Swal.fire('¡Actualizado!', 'La categoría ha sido actualizada.', 'success')
          .then(() => navigate('/admin/productCategories')); // Redirigir de vuelta
      } else {
        throw new Error('No se pudo actualizar la categoría');
      }
    } catch (error) {
      Swal.fire('Error', error.message, 'error');
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2>Editar Categoría</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nombre de la Categoría</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            name="name" 
            value={category.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-success">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditCategorie;
