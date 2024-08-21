import '../../../public/css/authPasswordRecovery.css'; // Usa el mismo archivo CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

function PasswordRecovery() {
  return (
    <div className="PasswordRecovery-container">
      <div className="PasswordRecovery-box">
        <h2 className="PasswordRecovery-title">Recuperar Contraseña</h2>
        <p className="PasswordRecovery-subtitle">Introduce tu correo electrónico para recuperar tu contraseña</p>
        
        <div className="input-container">
          <i className="fas fa-envelope"></i> {/* Ícono de correo electrónico */}
          <input type="email" placeholder="Correo electrónico" className="PasswordRecovery-input" />
        </div>
        
        <button className="PasswordRecovery-button">Enviar enlace de recuperación</button>
      </div>
    </div>
  );
}

export default PasswordRecovery;
