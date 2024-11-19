import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import logo from "../../public/assets/icons/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Recuperar datos del localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (!storedAuthData) {
      setIsLoggedIn(false);
      return;
    }

    try {
      const data = JSON.parse(storedAuthData);
      const token = data?.token;

      if (token) {
        const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload del token JWT
        setUser(payload); // Establece el usuario a partir del token
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setIsLoggedIn(false);
    }
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("authData");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/login"); // Redirige a la página de inicio de sesión
  };

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const closeProfileModal = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <div className="container-fluid px-2 position-fixed z-3 top-0">
        <div className="container-fluid border-type-top shadow own-navbar">
          <a className="navbar-logo" href="#">
            <img src={logo} alt="Logo" />
          </a>
          <div className="navbar-list">
            <li><Link to={"/"}>Inicio</Link></li>
            <li><Link to={"/catalogue"}>Catálogo</Link></li>
            <li><Link to={"/aboutUs"}>Parcerottis</Link></li>
            {isLoggedIn && (
              <li><Link to={"/admin/dashboard"}>Admin</Link></li>
            )}
          </div>
          <div className="navbar-auth">
            {isLoggedIn ? (
              <ProfileModal user={user} onClose={closeProfileModal} onLogout={handleLogout} />
            ) : (
              <Link to={"/login"}>
                Iniciar sesión
                <i className="bi bi-person-circle"></i>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="navbar-place"></div>
    </>
  );
}

export default Navbar;