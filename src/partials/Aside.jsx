import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <>
      <aside className="border-type-mid list-group list-group-flush rounded-4 shadow custom-sidenav">
        <li className="list-group-item list-group-item-action">
          <Link to={'/admin/dashboard'} className="d-block">
            Rendimiento
          </Link>
        </li>
        <li className="list-group-item list-group-item-action">
          <a data-bs-toggle="collapse"
            href="#submenu-production"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="d-flex justify-content-between rounded-5"
            >
            Producción
            <i className="bi bi-chevron-down"></i>
          </a>
          <div className="collapse submenu-sidenav" id="submenu-production">
            <Link to={'/admin/products'} >
              Productos y ficha técnica
            </Link>
            <Link to={'/admin/doughts'} >
              Mojes
            </Link>
          </div>
        </li>
      </aside >
    </>
  )
}

export default Sidenav;