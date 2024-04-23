import { Link } from "react-router-dom";
import logo from "../../public/assets/icons/logo.png"

function Navbar() {
  return (
    <>
      <div className="container-fluid px-2 mb-3 position-fixed z-3 top-0">
        <div className="container-fluid border-type-top rounded-bottom-4 px-4 shadow bg-light d-flex justify-content-between py-1 px-5">
          <a href="#top0">
            <img src={logo} alt="" className="logo" />
          </a>
          <ul className="list-unstyled d-flex gap-5 align-items-center nav-link-custom">
            <li><Link to={"/"} >{"Inicio"}</Link></li>
            <li><Link to={"/aboutUs"} >{"Parcerottis"}</Link></li>
            <li><Link to={"/catalogue"} >{"Catálogo"}</Link></li>
            <li><Link to={"/admin"} >{"Administrador"}</Link></li>
          </ul>
          <Link to={"/login"} className="d-flex gap-2 align-items-center">
            User
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person color-1" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="navbar-space" id="top0"></div>

    </>
  )
}

export default Navbar;