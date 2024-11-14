import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileModal({ user, onClose, onLogout }) {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.classList.contains("profile-modal-overlay")) {
        onClose();
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [onClose]);

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>Perfil de Usuario</h2>
        <div className="profile-info">
          <p><strong>Nombre:</strong> {user?.name || "Usuario"}</p>
          <p><strong>Email:</strong> {user?.email || "No disponible"}</p>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}

export default ProfileModal;