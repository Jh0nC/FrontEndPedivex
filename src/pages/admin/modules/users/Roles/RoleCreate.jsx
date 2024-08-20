import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function RoleCreate() {
  const [formData, setFormData] = useState({
    role: ''
  });

  const [permissions, setPermissions] = useState([]); // Estado para almacenar los permisos obtenidos de la API
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener los permisos desde la API
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://localhost:3000/permission');
        if (!response.ok) {
          throw new Error('Error al obtener los permisos');
        }
        const data = await response.json();
        setPermissions(data); // Guardar los permisos en el estado
      } catch (error) {
        setError('Error al cargar permisos: ' + error.message);
      }
    };

    fetchPermissions(); // Llamar a la función cuando el componente se monta
  }, []);

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
      setFormData({ role: '', permission: '' }); // Limpiar formulario
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
        <div className='m-3'>
          <label htmlFor="permission" className="form-label">Permisos:</label>
          <select
            id="permission"
            className='form-control'
            name="permission"
            value={formData.idRole}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un permiso</option>
            {permissions.map((permission) => (
              <option key={permission.id} value={permission.id}>
                {permission.permission}
              </option>
            ))}
          </select>
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