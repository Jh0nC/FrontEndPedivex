import '../../../public/css/authPasswordRecovery.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from 'react';

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/user/passwordRecovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail: email }),
      });

      if (!response.ok) {
        throw new Error('Error al enviar el correo de recuperación');
      }

      const data = await response.json();
      setMessage(data.message || 'Verification email sent.');
    } catch (error) {
      setMessage(error.message);
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
                className="PasswordRecovery-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
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
