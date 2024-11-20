import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mail: '',
    document: '',
    address: '',
    phoneNumber: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    const validations = {
      firstName: value.length === 0 ? 'El nombre es obligatorio' : null,
      lastName: value.length === 0 ? 'El apellido es obligatorio' : null,
      mail: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Correo electrónico inválido' : null,
      document: value.length < 8 ? 'Documento debe tener al menos 8 caracteres' : null,
      phoneNumber: !/^\d{7,10}$/.test(value) ? 'Teléfono debe tener entre 7 y 10 dígitos' : null,
      password: !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value) 
        ? 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial' : null
    };
    return validations[name];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError(null);
    setSuccessMessage(null);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, state: 1, idRole: 2 }),
      });

      if (!response.ok) throw new Error('Error en el registro');
      
      setSuccessMessage('Usuario creado exitosamente');
      // Reset form
      setFormData({
        firstName: '', lastName: '', mail: '', document: '',
        address: '', phoneNumber: '', password: ''
      });

      navigate('/login');
    } catch (error) {
      setServerError('Error al crear el usuario. Por favor intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    { name: 'firstName', label: 'Nombre', type: 'text', icon: 'fa-user', required: true },
    { name: 'lastName', label: 'Apellido', type: 'text', icon: 'fa-user', required: true },
    { name: 'mail', label: 'Correo Electrónico', type: 'mail', icon: 'fa-envelope', required: true },
    { name: 'document', label: 'Documento', type: 'text', icon: 'fa-id-card', required: true },
    { name: 'address', label: 'Dirección', type: 'text', icon: 'fa-home', required: true },
    { name: 'phoneNumber', label: 'Teléfono', type: 'tel', icon: 'fa-phone', required: true },
    { name: 'password', label: 'Contraseña', type: 'password', icon: 'fa-lock', required: true }
  ];

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg">
            <div className="card-body p-4">
              <h2 className="text-center mb-4" style={{ color: '#fcb900' }}>
                Registro de Usuario
              </h2>
              
              {serverError && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="fas fa-exclamation-circle me-2"></i>
                  {serverError}
                </div>
              )}
              
              {successMessage && (
                <div className="alert alert-success d-flex align-items-center" role="alert">
                  <i className="fas fa-check-circle me-2"></i>
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                  <small className="text-danger">* Campos obligatorios</small>
                </div>

                {formFields.map(field => (
                  <div className="mb-3" key={field.name}>
                    <label className="form-label">
                      {field.label}
                      {field.required && <span className="text-danger ms-1">*</span>}
                    </label>
                    <div className="input-group">
                      <span className="input-group-text" style={{ backgroundColor: '#fcb900', color: 'white' }}>
                        <i className={`fas ${field.icon}`}></i>
                      </span>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        className={`form-control ${errors[field.name] ? 'is-invalid' : ''}`}
                        placeholder={field.label}
                        required={field.required}
                      />
                      {errors[field.name] && (
                        <div className="invalid-feedback">
                          {errors[field.name]}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-lg mb-3"
                    disabled={isLoading}
                    style={{ 
                      backgroundColor: '#fcb900',
                      color: 'white',
                      border: 'none'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Procesando...
                      </>
                    ) : (
                      'Registrar Usuario'
                    )}
                  </button>

                  <Link
                    to="/login"
                    className="btn btn-lg btn-outline-secondary"
                  >
                    Regresar
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .btn:hover {
            opacity: 0.9;
            transition: opacity 0.2s ease-in-out;
          }
          
          .input-group-text {
            border: none;
          }
          
          .form-control:focus {
            border-color: #fcb900;
            box-shadow: 0 0 0 0.25rem rgba(252, 185, 0, 0.25);
          }
          
          .card {
            border-radius: 15px;
            border: none;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .alert {
            animation: fadeIn 0.3s ease-in-out;
          }

          .text-danger {
            color: #dc3545 !important;
          }
        `}
      </style>
    </div>
  );
};

export default UserCreate;