import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function roleCreate() {
  const [formData, setFormData] = useState({
    role: ''
  });

  const [permissions, setPermissions] = useState([]); // Estado para almacenar los permisos obtenidos de la API
  const [selectedPermissions, setSelectedPermissions] = useState([]); // Estado para almacenar los permisos seleccionados
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

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, value]
        : prevPermissions.filter((permission) => permission !== value)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Crear el rol
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
      const roleId = result.id; // Asumimos que el ID del rol está en 'result.id'
      
      // Crear rolePermission para cada permiso seleccionado
      for (let permissionId of selectedPermissions) {
        await fetch('http://localhost:3000/rolePermission', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idRole: roleId, idPermission: permissionId }),
        });
      }

      setSuccess('Rol creado con éxito');
      setError(null);
      setFormData({ role: '' });
      setSelectedPermissions([]); // Limpiar los permisos seleccionados
      console.log('Rol creado:', result);
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
          <p>Permisos:</p>
          {permissions.map((permission) => (
            <div key={permission.id}>
              <input
                id={permission.permission}
                className='btn-check'
                name="permission"
                value={permission.id}
                onChange={handlePermissionChange}
                type='checkbox'
                autoComplete='off'
              />
              <label htmlFor={permission.permission} className="btn btn-outline-success rounded-5 mt-1">
                {permission.permission}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className='btn btn-success rounded-5 m-3'>Registrar</button>
        <Link to={"/admin/roles"} className='btn btn-secondary rounded-5'>Regresar</Link>
      </form>
      {success && <p className="text-success m-3">{success}</p>}
      {error && <p className="text-danger m-3">{error}</p>}
    </div>
  );
}

export default roleCreate;