import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function roleCreate() {
  const navigate = useNavigate();

  const { register, formState: { errors }, handleSubmit, reset } = useForm();

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

  const handlePermissionChange = (e) => {
    const { value, checked } = e.target;
    setSelectedPermissions((prevPermissions) =>
      checked
        ? [...prevPermissions, value]
        : prevPermissions.filter((permission) => permission !== value)
    );
  };

  const enviarFormulario = async (formData) => {
    try {
      // Crear el rol
      const dataToSend = { ...formData, state: 1 }
      const response = await fetch('http://localhost:3000/role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
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
      reset(); // Limpiar el formulario después de enviar

      setSelectedPermissions([]); // Limpiar los permisos seleccionados

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Rol creado con éxito.',
      }).then(() => {
        navigate('/admin/roles'); // Redireccionar después de hacer clic en "OK"
      });

      console.log('Rol creado:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el rol.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Crear Nuevo Rol</h2>
        <form onSubmit={handleSubmit(enviarFormulario)} className='mt-3'>
          <div className='row mb-3'>
            <div className="col-sm">
              <label htmlFor="exampleInputEmail1" className="form-label">Rol:</label>
              <input
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                className='form-control'
                type="text"
                {...register("role", { required: true, maxLength: 25, pattern: /^[A-Za-z\s]+$/ })}
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
          <div className="d-flex justify-content-end gap-2">
            <Link to={"/admin/roles"} className='btn btn-secondary rounded-5'>Regresar</Link>
            <button type="submit" className='btn btn-success rounded-5'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default roleCreate;