import { Link } from "react-router-dom";
import logo from "../../public/assets/icons/logo.png"

function Navbar() {
  return (
    <>
      <div className="container-fluid px-2 position-fixed z-3 top-0" id="">
        <div className="container-fluid border-type-top rounded-bottom-4 shadow own-navbar">
          <a className="navbar-logo" href="#">
            <img src={logo} alt="" />
          </a>
          <div className="navbar-list">
            <li><Link to={"/"} >{"Inicio"}</Link></li>
            <li><Link to={"/aboutUs"} >{"Parcerottis"}</Link></li>
            <li><Link to={"/catalogue"} >{"Catálogo"}</Link></li>
            <li><Link to={"/admin"} >{"Administrador"}</Link></li>
          </div>
          <Link to={"/login"} className="navbar-auth">
            User
            <i class="bi bi-person-circle"></i>
          </Link>
        </div>
      </div>

    </>
  )
}

export default Navbar;