import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function UserEdit() {
  const { id } = useParams();
  console.log(id)
  const [formData, setFormData] = useState({
    mail: '',
    password: '',
    firstName: '',
    lastName: '',
    document: '',
    address: '',
    phoneNumber: '',
    idRole: ''
  });

  const [user, setUser] = useState([]); 
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
          console.log(data)
          setUser(user);
        } catch (error) {
          setError('Error al cargar el usuario: ' + error.message);
        }
      };

      fetchRoles();
        fetchUser();
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
      idRole: parseInt(formData.idRole, 10)
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
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };  

  console.log(user)

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor="email" className="form-label">Correo:</label>
          <input
            id="email"
            className='form-control'
            type="email"
            name="mail"
            value={formData.mail}
            onChange={handleChange}
            required
            placeholder=''
          />
        </div>
        <div className='m-3'>
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
        <div className='m-3'>
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
        <div className='m-3'>
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
        <div className='m-3'>
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
        <div className='m-3'>
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
        <div className='m-3'>
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
        <div className='m-3'>
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
        <button type="submit" className='btn btn-warning m-3'>Editar</button>
        <Link to={"/admin/users"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success m-3">{success}</p>}
      {error && <p className="text-danger m-3">{error}</p>}
    </div>
  );
}

export default UserEdit;