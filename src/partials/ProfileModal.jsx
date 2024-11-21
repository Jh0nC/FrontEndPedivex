import React from 'react';
import '../../public/css/profileModal.css';

const ProfileModal = ({ user, onLogout, role }) => {
  return (
    <>
      <div className="modal fade"
        id="profile"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-profile">
          <div className="modal-content rounded-5">
            <div className="modal-header px-4">
              <h1 className="modal-title fs-5">
                {user ? (
                  user.firstName + " " + user.lastName
                ) : ("")}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            {user && role ? (
              <div className="list-group rounded-0 modal-body p-0">
                <a className="list-group-item list-group-item-action">
                  <b>Correo: </b> {user.mail}
                </a>
                <a className="list-group-item list-group-item-action">
                  <b>Documento: </b>{user.document}
                </a>
                <a className="list-group-item list-group-item-action">
                  <b>Dirección: </b>{user.address}
                </a>
                <a className="list-group-item list-group-item-action">
                  <b>Teléfono: </b>{user.phoneNumber}
                </a>
                <a className="list-group-item list-group-item-action">
                  <b>Rol: </b>{ role.role }
                </a>
              </div>
            ) : ("")}
            <div className="modal-footer d-flex justify-content-end">
              <button
                type="button"
                className="btn rounded-5 btn-secondary"
                data-bs-dismiss="modal">
                Cerrar
              </button>
              <button
                type='button'
                className='btn btn-danger rounded-5'
                onClick={onLogout}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;