import { Link } from "react-router-dom";

function Sidenav() {
  return (
    <>
      <aside className="border-type-mid list-group list-group-flush shadow custom-sidenav">
        <li className="list-group-item list-group-item-action">
          <Link to={'/admin/dashboard'} className="d-block">
            Rendimiento
          </Link>
        </li>
        <li className="list-group-item list-group-item-action">
          <a data-bs-toggle="collapse"
            href="#submenu-users"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="d-flex justify-content-between rounded-5"
          >
            Usuarios
            <i className="bi bi-chevron-down"></i>
          </a>
          <div className="collapse submenu-sidenav" id="submenu-users">
            <Link to={'/admin/roles'} >
              Roles
            </Link>
            <Link to={'/admin/users'} className="d-block">
              Ususarios
            </Link>
          </div>
        </li>
        <li className="list-group-item list-group-item-action">
          <a data-bs-toggle="collapse"
            href="#submenu-boughts"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="d-flex justify-content-between rounded-5"
          >
            Compras
            <i className="bi bi-chevron-down"></i>
          </a>
          <div className="collapse submenu-sidenav" id="submenu-boughts">
            <Link to={'/admin/supplies'} >
              Insumos
            </Link>
            <Link to={'/admin/boughts'} >
              Compra de insumos
            </Link>
          </div>
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
            <Link to={'/admin/production-order'} >
              Orden de producción
            </Link>
            <Link to={'/admin/products'} >
              Productos y ficha técnica
            </Link>
            <Link to={'/admin/masses'} >
              Mojes
            </Link>
          </div>
        </li>
        <li className="list-group-item list-group-item-action">
          <a data-bs-toggle="collapse"
            href="#submenu-sales"
            role="button"
            aria-expanded="false"
            aria-controls="collapseExample"
            className="d-flex justify-content-between rounded-5"
          >
            Ventas
            <i className="bi bi-chevron-down"></i>
          </a>
          <div className="collapse submenu-sidenav" id="submenu-sales">
            <Link to={'/admin/clients'} >
              Clientes
            </Link>
            <Link to={'/admin/catalogue'} >
              Catálogo
            </Link>
            <Link to={'/admin/order'} >
              Pedidos
            </Link>
            <Link to={'/admin/sales'} >
              Venta de productos
            </Link>
            <Link to={'/admin/devolutions'} >
              Devolución de productos
            </Link>
          </div>
        </li>
      </aside >
    </>
  )
}

export default Sidenav;