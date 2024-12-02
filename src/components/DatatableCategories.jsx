import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

function Datatable({ data }) {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCategories(data);
    setFilteredCategories(data); // Inicializa el filtro con todas las categorías
    console.log('Categorías recibidas:', data);
  }, [data]);

  const handleDelete = async (id) => {
    const checkAssosiation = await fetch(`https://pedivexapi.onrender.com/productCategories/${id}/hasProduct`);
    const { hasProducts } = await checkAssosiation.json();

    if (hasProducts) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede eliminar una categoría asociada a un producto.',
        customClass: {
          popup: 'rounded-5',
          confirmButton: 'btn btn-secondary rounded-5 px-3'
        }
      });
      return;
    }

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Se eliminará la categoría de producto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      customClass: {
        popup: 'rounded-5',
        confirmButton: 'btn btn-success rounded-5 px-3',
        cancelButton: 'btn btn-danger rounded-5 px-3'
      }
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`https://pedivexapi.onrender.com/productCategories/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          Swal.fire(
            '¡Eliminado!',
            'La categoría ha sido eliminada.',
            'success'
          ).then(() => {
            window.location.reload();
          });
        } else {
          throw new Error('No se pudo eliminar la categoría');
        }
      } catch (error) {
        Swal.fire(
          'Error',
          error.message,
          'error'
        );
        console.error("Error al eliminar la categoría:", error);
      }
    }
  };

  // Maneja el cambio del término de búsqueda
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(value)
    );
    setFilteredCategories(filtered);
  };

  return (
    <div className="datatable-container border rounded-4 mx-auto my-3">
      <div className="datatable_header">
        <h2>Categorías de productos</h2>
        <Link to={'create'} className='btn btn-success rounded-5'>Agregar categoría</Link>
        <div className="d-flex gap-2 align-items-center">
          <div className="input_search">
            <input
              type="search"
              placeholder="Buscar"
              value={searchTerm}
              onChange={handleSearch} // Asocia la función al input
            />
            <i className="bi bi-search" id="search"></i>
          </div>
          <button className="btn btn-success rounded-5 h-50">
            <i className="bi bi-filetype-xlsx"></i>
          </button>
        </div>
      </div>
      <table className="datatable">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className='d-flex gap-2 align-items-center border-0'>
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
      <div className="datatable_footer">
        <p className='m-2'>Total de filas: {filteredCategories.length}</p>
      </div>
    </div>
  );
}

export default Datatable;
