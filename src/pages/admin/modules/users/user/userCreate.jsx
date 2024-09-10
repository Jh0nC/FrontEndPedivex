import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function userCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    firstName: '',
    lastName: '',
    document: '',
    address: '',
    phoneNumber: '',
    state: 1,
    idRole: ''
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener los roles desde la API
    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3000/role');
        if (!response.ok) {
          throw new Error('Error al obtener los roles');
        }
        const data = await response.json();
        setRoles(data); // Guardar los roles en el estado
      } catch (error) {
        setError('Error al cargar roles: ' + error.message);
      }
    };

    fetchRoles(); // Llamar a la función cuando el componente se monta
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = {
      ...formData,
      idRole: parseInt(formData.idRole, 10) // Asegúrate de que "idRole" sea un número
    };

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Usuario creado con éxito');
      setError(null);
      setFormData({ mail: '', password: '', firstName: '', lastName: '', document: '', address: '', phoneNumber: '', idRole: '' }); // Limpiar formulario

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario creado con éxito.',
      }).then(() => {
        navigate('/admin/users'); // Redireccionar después de hacer clic en "OK"
      });

      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el usuario.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Crear Nuevo Usuario</h2>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="email" className="form-label">Correo:</label>
              <input
                id="email"
                className='form-control'
                type="email"
                name="mail"
                value={formData.mail}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-sm'>
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                id="password"
                aria-describedby="emailHelp"
                className='form-control'
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="firstName" className="form-label">Nombre</label>
              <input
                id="firstName"
                aria-describedby="emailHelp"
                className='form-control'
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-sm'>
              <label htmlFor="lastName" className="form-label">Apellido</label>
              <input
                id="lastName"
                aria-describedby="emailHelp"
                className='form-control'
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="document" className="form-label">Documento</label>
              <input
                id="document"
                aria-describedby="emailHelp"
                className='form-control'
                type="text"
                name="document"
                value={formData.document}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-sm'>
              <label htmlFor="address" className="form-label">Dirección</label>
              <input
                id="address"
                aria-describedby="emailHelp"
                className='form-control'
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="phoneNumber" className="form-label">Teléfono</label>
              <input
                id="phoneNumber"
                aria-describedby="emailHelp"
                className='form-control'
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className='col-sm'>
              <label htmlFor="role" className="form-label">Rol:</label>
              <select
                id="role"
                className='form-control'
                name="idRole" // Cambiado a "idRole" para que coincida con el estado
                value={formData.idRole}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <Link to={"/admin/users"} className='btn btn-secondary rounded-5'>Regresar</Link>
            <button type="submit" className='btn btn-success rounded-5'>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default userCreate;