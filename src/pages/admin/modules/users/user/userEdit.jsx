import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function userEdit() {
  const navigate = useNavigate();
  const { id } = useParams();  // Obtener el ID desde la URL
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

  const [user, setUser] = useState({}); // Inicializar como objeto vacío
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
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

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/user/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el usuario');
        }
        const data = await response.json();
        setUser(data);

        // Actualizar formData con los datos del usuario
        setFormData({
          mail: data.mail || '',
          password: data.password || '', // Deja el campo de la contraseña vacío
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          document: data.document || '',
          address: data.address || '',
          phoneNumber: data.phoneNumber || '',
          state: data.state || '',
          idRole: data.idRole || ''
        });
      } catch (error) {
        setError('Error al cargar el usuario: ' + error.message);
      }
    };

    fetchRoles();
    if (id) {
      fetchUser(); // Llamar a la función para obtener el usuario si hay un ID en la URL
    }
  }, [id]);

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
      idRole: parseInt(formData.idRole, 10) // Asegurarse de que idRole sea un número
    };
  
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });
  
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
  
      const result = await response.json();
      setSuccess('Usuario actualizado con éxito'); 
      setError(null);
      setFormData({ mail: '', password: '', firstName: '', lastName: '', document: '', address: '', phoneNumber: '', idRole: '' });

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario editado con éxito.',
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
        text: 'Hubo un problema al editar el usuario.',
      });
    }
  };  

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2 className='mx-3'>Editar Usuario</h2>
        <form onSubmit={handleSubmit} className='mt-3'>
          <div className="row mb-3">
            <div className='col-sm'>
              <label htmlFor="firstName" className="form-label">Nombre</label>
              <input
                id="firstName"
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
                name="idRole" 
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
            <button type="submit" className='btn btn-success rounded-5'>Editar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default userEdit;
