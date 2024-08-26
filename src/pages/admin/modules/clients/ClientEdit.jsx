import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function EditClient() {
  const { id } = useParams(); // Obtener el id del cliente desde la URL
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    documento: '',
    direccion: '',
    telefono: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener los datos del cliente desde la API
    const fetchClientData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del cliente');
        }
        const data = await response.json();
        setFormData(data); // Cargar los datos del cliente en el estado
      } catch (error) {
        setError('Error al cargar datos del cliente: ' + error.message);
      }
    };

    fetchClientData(); // Llamar a la función cuando el componente se monta
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Usuario actualizado con éxito');
      setError(null);
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            id="nombre"
            className='form-control'
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="apellido" className="form-label">Apellido:</label>
          <input
            id="apellido"
            className='form-control'
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="documento" className="form-label">Documento:</label>
          <input
            id="documento"
            className='form-control'
            type="text"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="direccion" className="form-label">Dirección:</label>
          <input
            id="direccion"
            className='form-control'
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="telefono" className="form-label">Teléfono:</label>
          <input
            id="telefono"
            className='form-control'
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='btn btn-warning m-3'>Actualizar</button>
        <Link to={"/admin/users"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default EditClient;
