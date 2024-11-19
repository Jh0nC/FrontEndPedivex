import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value.trim() === '') {
      return 'El correo electrónico no puede estar vacío.';
    }
    if (!emailPattern.test(value)) {
      return 'El correo electrónico no es válido.';
    }
    return '';
  };

  const validatePassword = (value) => {
    if (value.trim() === '') {
      return 'La contraseña no puede estar vacía.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let errorMessage = '';

    switch (name) {
      case 'email':
        errorMessage = validateEmail(value);
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

    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
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
          setErrors({ ...errors, email: errorData.message || 'Credenciales incorrectas.' });
          return;
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        navigate('/admin'); // Redireccionar a una ruta protegida
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h2 className="login-title">Iniciar Sesión</h2>
          <p className="login-subtitle">Ingresa a tu cuenta</p>

          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input
                type="text"
                name="email"
                placeholder="Correo electrónico"
                className="login-input"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="login-input"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>

            <button className="login-button" type="submit">Entrar</button>
            <Link to="/RequestRecovery" className="login-link">¿Olvidaste tu contraseña?</Link>

          </form>
        </div>
        <div className="login-right">
          <h2 className="register-title1">¡Regístrate ahora!</h2>
          <p className="register-subtitle1">Únete a nosotros y disfruta de todos los beneficios al registrarte.</p>
          <Link to="/register">
            <button className="register-button">Regístrate Ahora</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
