import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function RoleEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    role: '',
    state: 1
  });
  const [permissions, setPermissions] = useState([]); // Lista de permisos disponibles
  const [selectedPermissions, setSelectedPermissions] = useState([]); // Permisos seleccionados
  const [role, setRole] = useState([]); // Información del rol actual
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
        ? [...prevPermissions, parseInt(value)] // Añadir el permiso si se selecciona
        : prevPermissions.filter((permission) => permission !== parseInt(value)) // Eliminar si se desmarca
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
  
      const result = await response.json();
  
      if (!response.ok) {
        // Capturar error específico si el rol no se encuentra o ya tiene el mismo nombre
        if (result.error === 'role not found') {
          // Continuar el proceso de actualización de permisos aunque no cambie el nombre
          await handlePermissionsUpdate(id);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El rol ya tiene el mismo nombre, pero los permisos fueron actualizados.',
          }).then(() => {
            navigate('/admin/roles'); // Redirigir después de hacer clic en "OK"
          });
          return;
        }
  
        // Si es otro error, lanzarlo
        throw new Error('Error en la solicitud para actualizar el rol');
      }
  
      // Si la respuesta es correcta, continuar con la actualización de permisos
      await handlePermissionsUpdate(id);
  
      setSuccess('Rol y permisos actualizados con éxito');
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Rol y permisos actualizados con éxito.',
      }).then(() => {
        navigate('/admin/roles'); // Redirigir después de hacer clic en "OK"
      });
      console.log('Response:', result);
  
    } catch (err) {
      setError(err.message);
      setSuccess(null);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al editar el rol.',
      });
    }
  };
  
  // Función para manejar la actualización de permisos
  const handlePermissionsUpdate = async (roleId) => {
    // Eliminar todas las relaciones existentes entre el rol y los permisos usando idRole
    await fetch(`http://localhost:3000/rolePermission`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idRole: roleId }), // Enviar idRole para identificar qué relaciones eliminar
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
  };   

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Editar Rol</h2>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className="row mb-3">
            <div className='col-sm'>
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
                  {...(selectedPermissions.includes(permission.id) && { checked: true })} // Solo incluye el atributo checked si está seleccionado
                  autoComplete='off'
                />
                <label htmlFor={permission.permission} className="btn btn-outline-success rounded-5 mt-1">
                  {permission.permission}
                </label>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={"/admin/roles"} className='btn btn-secondary rounded-5'>Regresar</Link>
            <button type="submit" className='btn btn-success rounded-5'>Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RoleEdit;