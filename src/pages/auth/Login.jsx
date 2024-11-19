import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../public/css/Login.css';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: '' });

  const [form, setForm] = useState({
    mail: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    mail: '',
    password: '',
  });

  const validateMail = (value) => {
    const mailPattern = /^[a-zA-Z0-9._%+-ñÑ]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value.trim() === '') {
      return 'El correo electrónico es requerido';
    }
    if (!mailPattern.test(value)) {
      return 'Por favor ingrese un correo electrónico válido';
    }
    return '';
  };


  const validatePassword = (value) => {
    if (value.trim() === '') {
      return 'La contraseña es requerida';
    }
    if (value.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let errorMessage = '';
    switch (name) {
      case 'mail':
        errorMessage = validateMail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const mailError = validateMail(form.mail);
    const passwordError = validatePassword(form.password);

    // Actualiza los errores en el estado
    setErrors({
      mail: mailError,
      password: passwordError,
    });

    // Si hay errores, no continúa
    if (emailError || passwordError) {
      setIsLoading(false);
      return;
    }

    // Realiza la solicitud al servidor si no hay errores
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mail: form.email,
          password: form.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setShowAlert({
          show: true,
          message: errorData.message || 'Credenciales incorrectas',
          type: 'danger',
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setShowAlert({
        show: true,
        message: '¡Inicio de sesión exitoso!',
        type: 'success',
      });
      setTimeout(() => window.location.reload(), 1600);
      setTimeout(() => navigate('/admin/dashboard'), 1500);
    } catch (error) {
      console.error('Error:', error);
      setShowAlert({
        show: true,
        message: 'Error al conectar con el servidor',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="card-login">
          <div className="col-md-10">
            <div className="card shadow-lg">
              <div className="row g-0">
                <div className="col-md-6 p-5">
                  <div className="text-center mb-4">
                    <h2 className="fw-bold ">Iniciar Sesión</h2>
                    <p className="text-muted">Ingresa a tu cuenta</p>
                  </div>

                  {showAlert.show && (
                    <div className={`alert alert-${showAlert.type} alert-dismissible fade show`} role="alert">
                      {showAlert.message}
                      <button type="button" className="btn-close" onClick={() => setShowAlert({ show: false })}></button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="needs-validation">
                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-envelope"></i>
                        </span>
                        <input
                          type="mail"
                          className={`form-control ${errors.mail ? 'is-invalid' : ''}`}
                          name="mail"
                          placeholder="Correo electrónico"
                          value={form.mail}
                          onChange={handleChange}
                        />
                        {errors.mail && (
                          <div className="invalid-feedback">{errors.mail}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          name="password"
                          placeholder="Contraseña"
                          value={form.password}
                          onChange={handleChange}
                        />
                        {errors.password && (
                          <div className="invalid-feedback">{errors.password}</div>
                        )}
                      </div>
                    </div>

                    <div className="mb-4 text-end">
                      <Link to="/RequestRecovery" className="text-decoration-none">
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>

                    <button
                      className="btn btn-primary w-100"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Cargando...
                        </>
                      ) : (
                        'Iniciar Sesión'
                      )}
                    </button>
                  </form>
                </div>

                <div className="col-md-6 bg-primary text-white d-flex align-items-center">
                  <div className="p-5 text-center">
                    <h2 className="fw-bold mb-4">¡Regístrate ahora!</h2>
                    <p className="mb-4">
                      Únete a nosotros y disfruta de todos los beneficios al registrarte.
                    </p>
                    <Link to="/register">
                      <button className="btn btn-outline-light btn-lg">
                        Regístrate Ahora
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
