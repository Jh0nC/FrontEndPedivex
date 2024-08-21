import { useState } from 'react';
import '../../../public/css/authLogin.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Login() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    let errorMessage = '';
    if (name === 'email') {
      errorMessage = validateEmail(value);
    }

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(form.email);

    setErrors({
      ...errors,
      email: emailError,
    });

    if (!emailError && form.password) {
      console.log('Formulario enviado');
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
              {errors.email && <span className="error-message">{errors.email}</span>}
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
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button className="login-button" type="submit">Entrar</button>
            <a href="/PasswordRecovery" className="login-link">¿Olvidaste tu contraseña?</a>
          </form>
        </div>
        <div className="login-right">
          <h2 className="login-title">¡Regístrate ahora!</h2>
          <p className="login-subtitle">Únete a nosotros y disfruta de todos los beneficios al registrarte.</p>
          <Link to="/register">
            <button className="register-button">Regístrate Ahora</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
