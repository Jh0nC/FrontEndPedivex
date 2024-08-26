import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function RoleEdit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    role: ''
  });
  const [permissions, setPermissions] = useState([]);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [role, setRole] = useState([]);
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

    // Función para obtener los detalles del rol específico usando el ID
    const fetchRole = async () => {
      try {
        const response = await fetch(`http://localhost:3000/role/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el rol');
        }
        const data = await response.json();
        setRole({ role: data.role }); // Establecer el rol actual en el formulario
        setFormData({ role: data.role }); // Llenar el formulario con los datos del rol
        setSelectedPermissions(data.permissions.map(p => p.id)); // Asignar los permisos ya seleccionados
      } catch (error) {
        setError('Error al cargar el rol: ' + error.message);
      }
    };

    fetchPermissions(); // Llamar a la función para obtener permisos cuando el componente se monta
    if (id) {
      fetchRole(); // Llamar a la función para obtener el rol si hay un ID en la URL
    }
  }, [id]); // El efecto depende del ID, se ejecuta cuando el ID cambia

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
      // Actualizar el rol con un PUT
      const response = await fetch(`http://localhost:3000/role/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud para actualizar el rol');
      }

      const result = await response.json();
      const roleId = id; // Usar el ID de la URL ya que estamos en modo edición

      // Eliminar todas las relaciones existentes entre el rol y los permisos
      await fetch(`http://localhost:3000/rolePermission/${roleId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Crear nuevas relaciones en rolePermission para cada permiso seleccionado
      for (let permissionId of selectedPermissions) {
        await fetch(`http://localhost:3000/rolePermission`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idRole: roleId, idPermission: permissionId }),
        });
      }

      setSuccess('Rol y permisos actualizados con éxito');
      setError(null);
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Editar Rol</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor="role" className="form-label">Rol:</label>
          <input
            id="role"
            aria-describedby="roleHelp"
            className='form-control'
            type="text"
            name="role"
            value={formData.role} // Muestra el rol actual obtenido de la API
            onChange={handleChange}
            required
            placeholder={role.role}
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
                checked={selectedPermissions.includes(permission.id)}
                autoComplete='off'
              />
              <label htmlFor={permission.permission} className="btn btn-outline-success me-1">
                {permission.permission}
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className='btn btn-warning m-3'>Actualizar</button>
        <Link to={"/admin/roles"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success m-3">{success}</p>}
      {error && <p className="text-danger m-3">{error}</p>}
    </div>
  );
}

export default RoleEdit;