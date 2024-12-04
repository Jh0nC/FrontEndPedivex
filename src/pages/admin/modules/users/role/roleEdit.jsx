import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';  // Importamos useForm

function RoleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit, reset } = useForm();

  const [permissions, setPermissions] = useState([]); // Lista de permisos disponibles
  const [selectedPermissions, setSelectedPermissions] = useState([]); // Permisos seleccionados
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
        reset({ role: data.role }); // Inicializamos el formulario con los datos del rol
        setSelectedPermissions(data.permissions.map(p => p.id)); // Asignamos los permisos seleccionados
      } catch (error) {
        setError('Error al cargar el rol: ' + error.message);
      }
    };

    fetchPermissions(); // Llamar a la función para obtener permisos cuando el componente se monta
    if (id) {
      fetchRole(); // Llamar a la función para obtener el rol si hay un ID en la URL
    }
  }, [id, reset]); // El efecto depende del ID y el reset para inicializar el formulario

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, parseInt(value)] // Añadir el permiso si se selecciona
        : prevPermissions.filter((permission) => permission !== parseInt(value)) // Eliminar si se desmarca
    );
  };

  const onSubmit = async (formData) => {
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
        if (result.error === 'role not found') {
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

        throw new Error('Error en la solicitud para actualizar el rol');
      }

      await handlePermissionsUpdate(id);

      setSuccess('Rol y permisos actualizados con éxito');
      setError(null);
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Rol y permisos actualizados con éxito.',
      }).then(() => {
        navigate('/admin/roles');
      });

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
    await fetch(`http://localhost:3000/rolePermission`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idRole: roleId }), // Enviar idRole para identificar qué relaciones eliminar
    });

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
      <div className="form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Editar Rol</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="role" className="form-label">Rol <span style={{ color: 'red' }}>*</span></label>
              <input
                id="role"
                className='form-control'
                type="text"
                {...register("role", { required: true, maxLength: 25, pattern: /^[A-Za-z\s]+$/  })}
                placeholder="Nombre del rol"
              />
            </div>
          </div>
          {errors.role?.type === "required" && (
            <div className="alert alert-danger p-1 col">Ingrese el rol</div>
          )}
          {errors.role?.type === "maxLength" && (
            <div className="alert alert-danger p-1 col">Solo se puede ingresar maximo 25 letras</div>
          )}
          {errors.role?.type === "pattern" && (
            <div className="alert alert-danger p-1 col">No se puede ingresar numeros o caracteres especiales</div>
          )}
          <div className=''>
            <p>Permisos <span style={{ color: 'red' }}>*</span></p>
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