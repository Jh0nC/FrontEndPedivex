import React from 'react';

const ProfileDropdown = ({ userName, onLogout }) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div className="d-flex align-items-center">
          <div className="rounded-circle bg-secondary bg-opacity-10 p-2">
            <i className="bi bi-person-circle fs-5"></i>
          </div>
          <span className="ms-2 d-none d-md-inline">{userName || 'Usuario'}</span>
        </div>
      </button>
      
      <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
        <li className="dropdown-header border-bottom">
          <div className="d-flex flex-column">
            <span className="fw-semibold">{userName || 'Usuario'}</span>
            <small className="text-muted">Mi cuenta</small>
          </div>
        </li>
        
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-2 py-2"
            onClick={() => {/* Handle profile view */}}
          >
            <i className="bi bi-person text-muted"></i>
            Ver perfil
          </button>
        </li>
        
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-2 py-2"
            onClick={() => {/* Handle settings */}}
          >
            <i className="bi bi-gear text-muted"></i>
            Configuración
          </button>
        </li>
        
        <li><hr className="dropdown-divider" /></li>
        
        <li>
          <button 
            className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
            onClick={onLogout}
          >
            <i className="bi bi-box-arrow-right"></i>
            Cerrar sesión
          </button>
        </li>
      </ul>

      <style>
        {`
          .dropdown-toggle::after {
            margin-left: 0.7rem;
          }
          
          .dropdown-menu {
            min-width: 200px;
            padding: 0.5rem 0;
          }
          
          .dropdown-header {
            padding: 0.75rem 1rem;
          }
          
          .dropdown-item {
            padding: 0.5rem 1rem;
          }
          
          .dropdown-item:active {
            background-color: #f8f9fa;
            color: inherit;
          }
          
          .dropdown-item:hover {
            background-color: #f8f9fa;
          }
        `}
      </style>
    </div>
  );
};

export default ProfileDropdown;