import '../../../public/css/authPasswordRecovery.css'; // Usa el mismo archivo CSS
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';

function PasswordRecovery() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMessage(errorData.error || 'Error al enviar el enlace de recuperación.');
        return;
      }

      const data = await response.json();
      setMessage('Se ha enviado un enlace de recuperación a tu correo electrónico.');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setMessage('Error al enviar el enlace de recuperación.');
    }
  };

  return (
    <div className="PasswordRecovery-container">
      <div className="PasswordRecovery-box">
        <h2 className="PasswordRecovery-title">Recuperar Contraseña</h2>
        <p className="PasswordRecovery-subtitle">Introduce tu correo electrónico para recuperar tu contraseña</p>

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="PasswordRecovery-input"
              value={email}
              onChange={handleChange}
            />
          </div>

          <button className="PasswordRecovery-button" type="submit">Enviar enlace de recuperación</button>
        </form>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default PasswordRecovery;
