import { useState } from 'react';
import '../../../public/css/authRegister.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateUsername = (value) => {
    const validUsernamePattern = /^[a-zA-Z0-9_]+$/;
    if (value.trim() === '') {
      return 'El nombre de usuario no puede estar vacío.';
    }
    if (value.includes(' ')) {
      return 'El nombre de usuario no puede contener espacios.';
    }
    if (!validUsernamePattern.test(value)) {
      return 'El nombre de usuario solo puede contener letras, números y guiones bajos.';
    }
    return '';
  };

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
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (value.trim() === '') {
      return 'La contraseña no puede estar vacía.';
    }
    if (!passwordPattern.test(value)) {
      return 'La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un dígito y un carácter especial.';
    }
    return '';
  };

  const validateConfirmPassword = (value, password) => {
    if (value !== password) {
      return 'Las contraseñas no coinciden.';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Validar campo
    let errorMessage = '';
    switch (name) {
      case 'username':
        errorMessage = validateUsername(value);
        break;
      case 'email':
        errorMessage = validateEmail(value);
        break;
      case 'password':
        errorMessage = validatePassword(value);
        break;
      case 'confirmPassword':
        errorMessage = validateConfirmPassword(value, form.password);
        break;
      default:
        break;
    }
    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones finales antes de enviar
    const usernameError = validateUsername(form.username);
    const emailError = validateEmail(form.email);
    const passwordError = validatePassword(form.password);
    const confirmPasswordError = validateConfirmPassword(form.confirmPassword, form.password);

    setErrors({
      username: usernameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError
    });

    if (!usernameError && !emailError && !passwordError && !confirmPasswordError) {
      // Aquí puedes enviar el formulario si no hay errores
      console.log('Formulario enviado');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Regístrate</h2>
        <p className="register-subtitle">Crea tu cuenta</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input
              type="text"
              name="username"
              placeholder="Nombre de usuario"
              className="register-input"
              value={form.username}
              onChange={handleChange}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>
          
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="register-input"
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
              className="register-input"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>
          
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repite la contraseña"
              className="register-input"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>
          
          <button type="submit" className="register-button">Crear Cuenta</button>
        </form>

        <div className="login-link-container">
          <a href="/login" className="login-link">¿Ya tienes cuenta? Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
