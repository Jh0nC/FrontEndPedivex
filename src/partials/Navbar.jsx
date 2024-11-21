import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import logo from "../../public/assets/icons/logo.png";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));

    if (storedAuthData) {
      try {
        const token = storedAuthData.token

        if (token) {
          setRole(storedAuthData.role);
          setUser(storedAuthData.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }

      } catch (error) {
        console.log(`Error: ${error}`);
      }
    }

  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authData");
    setIsLoggedIn(false);
    setUser(null);
    setTimeout(() => {
      window.location.reload();
    }, 100)
    navigate("/login");
  };

  return (
    <>
      <div className="container-fluid px-2 position-fixed z-3 top-0">
        <div className="container-fluid border-type-top shadow own-navbar">
          <Link className="navbar-logo" to={"/"} >
            <img src={logo} alt="Logo" />
          </Link>
          <div className="navbar-list">
            <li><Link to={"/"}>Inicio</Link></li>
            <li><Link to={"/catalogue"}>Catálogo</Link></li>
            <li><Link to={"/aboutUs"}>Parcerottis</Link></li>
            {role && role.id == 1 ? (
              <li><Link to={"/admin/dashboard"}>Admin</Link></li>
            ) : ("")}
          </div>
          <div className="navbar-auth">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  className="btn d-flex gap-2 justify-content-center align-items-center"
                  data-bs-toggle="modal"
                  data-bs-target="#profile" >
                  <i className="bi bi-person-circle"></i>
                  {(user.firstName + " " + user.lastName) || "Usuario"}
                </button>
              </>
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
      <ProfileModal user={user} onLogout={handleLogout} role={role} />
    </>
  );
}

export default Navbar;