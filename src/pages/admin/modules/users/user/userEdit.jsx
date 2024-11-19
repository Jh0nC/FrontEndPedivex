import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';

function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();  // Obtener el ID desde la URL
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      mail: '',
      password: '',
      firstName: '',
      lastName: '',
      document: '',
      address: '',
      phoneNumber: '',
      state: 1,
      idRole: ''
    }
  });

  useEffect(() => {
    // Función para obtener los roles
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/role');
        if (!response.ok) {
          throw new Error('Error al obtener los roles');
        }
        const data = await response.json();
        setRoles(data); // Guardar los roles en el estado
      } catch (error) {
        setError('Error al cargar roles: ' + error.message);
      }
    };

    // Función para obtener los datos del usuario si existe un ID
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el usuario');
        }
        const data = await response.json();

        // Utilizar setValue para rellenar los campos del formulario con los datos del usuario
        Object.keys(data).forEach(key => {
          if (data[key] !== null) {
            setValue(key, data[key]);
          }
        });
      } catch (error) {
        setError('Error al cargar el usuario: ' + error.message);
      }
    };

    fetchRoles();
    if (id) {
      fetchUser(); // Llamar a la función para obtener el usuario si hay un ID en la URL
    }
  }, [id, setValue]);

  const onSubmit = async (formData) => {
    const formDataToSend = {
      ...formData,
      idRole: parseInt(formData.idRole, 10) // Asegurarse de que idRole sea un número
    };
    
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Usuario actualizado con éxito'); 
      setError(null);
      reset(); // Limpiar el formulario después de enviar los datos

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario editado con éxito.',
      }).then(() => {
        navigate('/admin/users'); // Redireccionar después de hacer clic en "OK"
      });

      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al editar el usuario.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Editar Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-3'>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="firstName" className="form-label">Nombre <span style={{ color: 'red' }}>*</span></label>
              <input
                id="firstName"
                className='form-control'
                type="text"
                {...register("firstName", { required: true })}
              />
              {errors.firstName?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="lastName" className="form-label">Apellido <span style={{ color: 'red' }}>*</span></label>
              <input
                id="lastName"
                className='form-control'
                type="text"
                {...register("lastName", { required: true })}
              />
              {errors.lastName?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="document" className="form-label">Documento <span style={{ color: 'red' }}>*</span></label>
              <input
                id="document"
                className='form-control'
                type="text"
                {...register("document", { required: true, minLength:8, maxLength:10 })}
              />
              {errors.document?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
              {errors.document?.type==='minLength' && (
                <div className="alert alert-danger p-1 col mt-2">El documento debe tener mínimo 8 números</div>
              )}
              {errors.document?.type==='maxLength' && (
                <div className="alert alert-danger p-1 col mt-2">El documento debe tener máximo 10 números</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="address" className="form-label">Dirección <span style={{ color: 'red' }}>*</span></label>
              <input
                id="address"
                className='form-control'
                type="text"
                {...register("address", { required: true })}
              />
              {errors.address?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="phoneNumber" className="form-label">Teléfono <span style={{ color: 'red' }}>*</span></label>
              <input
                id="phoneNumber"
                className='form-control'
                type="text"
                {...register("phoneNumber", { required: true, minLength:7, maxLength:10 })}
              />
              {errors.phoneNumber?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
              {errors.phoneNumber?.type==='minLength' && (
                <div className="alert alert-danger p-1 col mt-2">El teléfono debe tener mínimo 7 números</div>
              )}
              {errors.phoneNumber?.type==='maxLength' && (
                <div className="alert alert-danger p-1 col mt-2">El teléfono debe tener máximo 10 números</div>
              )}
            </div>
            <div className='col-sm'>
              <label htmlFor="role" className="form-label">Rol <span style={{ color: 'red' }}>*</span></label>
              <select
                id="role"
                className='form-control'
                {...register("idRole", { required: true })}
              >
                <option value="">Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
              {errors.idRole?.type==='required' && (
                <div className="alert alert-danger p-1 col mt-2">Este campo es obligatorio</div>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={"/admin/users"} className='btn btn-secondary rounded-5'>Regresar</Link>
            <button type="submit" className='btn btn-success rounded-5'>Editar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserEdit;