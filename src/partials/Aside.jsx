import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Sidenav() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('authData'));
    // console.log(authData);

    if (authData) {
      setRole(authData?.role)
      console.log(role);
    }
  }, [])


  return (
    <>
      {role && role.id == 1 ? (
        <aside className="border-type-mid list-group list-group-flush shadow custom-sidenav">
          <li className="list-group-item list-group-item-action">
            <Link to={'/admin/dashboard'} className="d-flex gap-3 align-items-center justify-content-start">
              <i class="bi bi-bar-chart-line"></i>
              Rendimiento
            </Link>
          </li>
          <li className="list-group-item list-group-item-action">
            <a data-bs-toggle="collapse"
              href="#submenu-users"
              role="button"
              aria-expanded="false"
              className="d-flex justify-content-between rounded-5"
            >
              <div className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-people"></i>
                <span>Usuarios</span>
              </div>
              <i className="bi bi-chevron-down"></i>
            </a>
            <div className="collapse submenu-sidenav" id="submenu-users">
              <Link to={'/admin/roles'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-person-badge"></i>
                Roles
              </Link>
              <Link to={'/admin/users'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-person-bounding-box"></i>              Usuarios
              </Link>
              <Link to={'/admin/clients'} className="d-felx gap-3">
                <i class="bi bi-person-workspace"></i>
                Clientes
              </Link>
              <Link to={'/admin/employees'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-person-video2"></i>
                Empleados
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
              <div className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-bag"></i>
                Compras
              </div>
              <i className="bi bi-chevron-down"></i>
            </a>
            <div className="collapse submenu-sidenav" id="submenu-boughts">
              <Link to={'/admin/supplies'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-basket"></i>
                Insumos
              </Link>
              <Link to={'/admin/boughts'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-bag-plus"></i>
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
              <div className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-diagram-3"></i>
                Producción
              </div>
              <i className="bi bi-chevron-down"></i>
            </a>
            <div className="collapse submenu-sidenav" id="submenu-production">
              <Link to={'/admin/productionOrder'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-clipboard-plus"></i>
                Ordenes de producción
              </Link>
              <Link to={'/admin/masses'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-egg-fried"></i>
                Masas
              </Link>
              <Link to={'/admin/productCategories'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-columns-gap"></i>
                Categorías
              </Link>
              <Link to={'/admin/products'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-tags"></i>
                Productos
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
              <div className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-cart4"></i>
                Ventas
              </div>
              <i className="bi bi-chevron-down"></i>
            </a>
            <div className="collapse submenu-sidenav" id="submenu-sales">
              {/* <Link to={'/catalogue'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-images"></i>
                Catálogo
              </Link> */}
              <Link to={'/admin/request'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-card-checklist"></i>
                Pedidos
              </Link>
              <Link to={'/admin/sales'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-receipt"></i>
                Ventas
              </Link>
              <Link to={'/admin/devolutions'} className="d-flex gap-3 align-items-center justify-content-start">
                <i class="bi bi-arrow-left-right"></i>
                Devoluciones
              </Link>
            </div>
          </li>
        </aside >
      ) : role && role.id == 3 ? (
        <aside className="border-type-mid list-group list-group-flush shadow custom-sidenav">
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
              <Link to={'/employee/productionOrder'} >
                Orden de producción
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
              <Link to={'/employee/request'} >
                Pedidos
              </Link>
            </div>
          </li>
        </aside >
      ) : ("")}
    </>
  )
}

export default Sidenav;