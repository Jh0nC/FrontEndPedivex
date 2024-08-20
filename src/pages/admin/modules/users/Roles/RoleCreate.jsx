import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function RoleCreate() {
  const [formData, setFormData] = useState({
    role: '',  // Solo el campo 'role'
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const response = await fetch('http://localhost:3000/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Rol creado con éxito');
      setError(null);
      setFormData({ role: '' }); // Limpiar formulario
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Crear Nuevo Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor="exampleInputEmail1" className="form-label">Rol:</label>
          <input
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            className='form-control'
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='btn btn-warning m-3'>Registrar</button>
        <Link to={"/admin/roles"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default RoleCreate;