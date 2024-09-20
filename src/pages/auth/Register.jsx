import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import '../../../public/css/authRegister.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function UserCreate() {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/role');
        if (!response.ok) {
          throw new Error('Error al obtener los roles');
        }
        const data = await response.json();
        setRoles(data);
      } catch (error) {
        setError('Error al cargar roles: ' + error.message);
      }
    };

    fetchRoles();
  }, []);

  const onSubmit = async (data) => {
    const formDataToSend = {
      ...data,
      state: 1,
      idRole: 1 // El rol será siempre 1
    };

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Usuario creado con éxito');
      setError(null);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario creado con éxito.',
      }).then(() => {
        navigate('/admin/users');
      });

      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el usuario.',
      });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              className="register-input"
              {...register('firstName', { required: 'El nombre es obligatorio' })}
            />
            <span className="error-message-container">{errors.firstName?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="lastName"
              placeholder="Apellido"
              className="register-input"
              {...register('lastName', { required: 'El apellido es obligatorio' })}
            />
            <span className="error-message-container">{errors.lastName?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="mail"
              placeholder="Correo electrónico"
              className="register-input"
              {...register('mail', { required: 'El correo electrónico es obligatorio', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'El correo electrónico no es válido' } })}
            />
            <span className="error-message-container">{errors.mail?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-id-card"></i>
            <input
              type="text"
              name="document"
              placeholder="Documento"
              className="register-input"
              {...register('document', { required: 'El documento es obligatorio', minLength: { value: 8, message: 'El documento debe tener mínimo 8 caracteres' }, maxLength: { value: 10, message: 'El documento debe tener máximo 10 caracteres' } })}
            />
            <span className="error-message-container">{errors.document?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-home"></i>
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              className="register-input"
              {...register('address', { required: 'La dirección es obligatoria' })}
            />
            <span className="error-message-container">{errors.address?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-phone"></i>
            <input
              type="text"
              name="phoneNumber"
              placeholder="Teléfono"
              className="register-input"
              {...register('phoneNumber', { required: 'El teléfono es obligatorio', minLength: { value: 7, message: 'El teléfono debe tener mínimo 7 caracteres' }, maxLength: { value: 10, message: 'El teléfono debe tener máximo 10 caracteres' } })}
            />
            <span className="error-message-container">{errors.phoneNumber?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="register-input"
              {...register('password', { required: 'La contraseña es obligatoria', pattern: { value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, message: 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial' } })}
            />
            <span className="error-message-container">{errors.password?.message}</span>
          </div>

          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar Contraseña"
              className="register-input"
              {...register('confirmPassword', {
                validate: value => value === password || 'Las contraseñas no coinciden'
              })}
            />
            <span className="error-message-container">{errors.confirmPassword?.message}</span>
          </div>

          <button type="submit" className="register-button">Registrar</button>
        </form>

        <div className="login-link-container">
          <Link to="/admin/users" className="login-link">Regresar</Link>
        </div>
      </div>
    </div>
  );
}

export default UserCreate;
