import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function EmployeeCreate() {
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
    // No es necesario obtener permisos para esta funcionalidad, así que el código para fetchPermissions se elimina
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error en la solicitud');

      await response.json();
      setSuccess('Empleado creado con éxito');
      setError(null);
      setFormData({
        nombre: '',
        apellido: '',
        documento: '',
        direccion: '',
        telefono: ''
      });
    } catch (err) {
      setError(`Error: ${err.message}`);
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Crear Nuevo Empleado</h2>
      <form onSubmit={handleSubmit}>
        {['nombre', 'apellido', 'documento', 'direccion', 'telefono'].map((field) => (
          <div key={field} className='m-3'>
            <label htmlFor={field} className="form-label">
              {field.charAt(0).toUpperCase() + field.slice(1)}:
            </label>
            <input
              id={field}
              className='form-control'
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className='btn btn-warning m-3'>Registrar</button>
        <Link to={"/admin/employees"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default EmployeeCreate;
