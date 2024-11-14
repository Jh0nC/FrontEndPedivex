import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Datatable({ data, fetchCategories }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(data);
    console.log('Categorías recibidas:', data); // Verificar si los datos se reciben correctamente
  }, [data]);

  // Función para manejar el cambio de estado
  const handleStateChange = async (id, currentState, name) => {
    const newState = currentState === 1 ? 2 : 1;
    const actionText = newState === 2 ? 'desactivar' : 'activar';

    const result = await Swal.fire({
      title: `¿Estás seguro de ${actionText} la categoría "${name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/productCategories/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ state: newState })
        });

        if (response.ok) {
          Swal.fire({
            title: 'Cambio exitoso',
            text: `La categoría ha sido ${newState === 2 ? 'desactivada' : 'activada'} correctamente.`,
            icon: 'success'
          }).then(() => {
            setCategories(prevCategories =>
              prevCategories.map(item =>
                item.id === id ? { ...item, state: newState } : item
              )
            );
          });
        } else {
          throw new Error('Error al cambiar el estado');
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Ocurrió un error al intentar cambiar el estado.',
          icon: 'error'
        });
        console.error("Error al cambiar el estado de la categoría:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:3000/productCategories/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire(
            '¡Eliminado!',
            'La categoría ha sido eliminada.',
            'success'
          ).then(() => {
            fetchCategories(); // Refresca los datos después de eliminar
          });
          console.log('Categoría eliminada con id:', id); // Confirmar la eliminación
        } else {
          throw new Error('No se pudo eliminar la categoría');
        }
      } catch (error) {
        Swal.fire(
          'Error',
          error.message,
          'error'
        );
        console.error("Error al eliminar la categoría:", error); // Registrar el error
      }
    }
  };

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>Categorías de productos</h2>
        <Link to={'create'} className='btn btn-success rounded-5'>Agregar categoría</Link>
        <div className="input_search">
          <input type="search" placeholder="Buscar" />
          <i className="bi bi-search" id="search"></i>
        </div>
      </div>
      <table className="datatable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>
                {item.state === 1 ? (
                  <button
                    className='btn btn-success rounded-5 h-50'
                    onClick={() => handleStateChange(item.id, item.state, item.name)}
                  >
                    Activado
                  </button>
                ) : (
                  <button
                    className='btn btn-danger rounded-5 h-50'
                    onClick={() => handleStateChange(item.id, item.state, item.name)}
                  >
                    Desactivado
                  </button>
                )}
              </td>
              <td className='d-flex gap-2'>
                <Link className='btn btn-warning rounded-5' to={`edit/${item.id}`}>Editar</Link>
                <button 
                  className='btn btn-danger rounded-5' 
                  onClick={() => handleDelete(item.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="datatable_footer d-flex justify-content-between align-items-center">
        <p>Total de filas: {categories.length}</p>
      </div>
    </div>
  );
}

export default Datatable;
