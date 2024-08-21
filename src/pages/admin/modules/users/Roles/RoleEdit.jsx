import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function RoleEdit() {
  const { id } = useParams();
  console.log(id)
  const [formData, setFormData] = useState({
    role: ''
  });
  const [permissions, setPermissions] = useState([]);
  const [role, setRole] = useState([]); 
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener los permisos desde la API
    const fetchPermissions = async () => {
      try {
        const response = await fetch('http://localhost:3000/permission');
        if (!response.ok) {
          throw new Error('Error al obtener los permisos');
        }
        const data = await response.json();
        setPermissions(data); // Guardar los permisos en el estado
      } catch (error) {
        setError('Error al cargar permisos: ' + error.message);
      }
    };

    // Función para obtener los detalles del rol específico usando el ID
    const fetchRole = async () => {
      try {
        const response = await fetch(`http://localhost:3000/role/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener el rol');
        }
        const data = await response.json();
        setRole({ role: data.role }); // Establecer el rol y permiso actual en el formulario
      } catch (error) {
        setError('Error al cargar el rol: ' + error.message);
      }
    };

    fetchPermissions(); // Llamar a la función para obtener permisos cuando el componente se monta
    if (id) {
      fetchRole(); // Llamar a la función para obtener el rol si hay un ID en la URL
    }
  }, [id]); // El efecto depende del ID, se ejecuta cuando el ID cambia

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const method = id ? 'PUT' : 'POST'; // Usar PUT si es para actualizar un rol existente
      const url = id ? `http://localhost:3000/role/${id}` : 'http://localhost:3000/role';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess(id ? 'Rol actualizado con éxito' : 'Rol creado con éxito');
      setError(null);
      setFormData({ role: '', permission: '' }); // Limpiar formulario
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  console.log(role.role)

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>{id ? 'Editar Rol' : 'Crear Nuevo Rol'}</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor="role" className="form-label">Rol:</label>
          <input
            id="role"
            aria-describedby="roleHelp"
            className='form-control'
            type="text"
            name="role"
            value={formData.role} // Muestra el rol actual obtenido de la API
            onChange={handleChange}
            required
            placeholder={role.role}
          />
        </div>
        <div className='m-3'>
          <label htmlFor="permission" className="form-label">Permisos:</label>
          <select
            id="permission"
            className='form-control'
            name="permission"
            value={formData.permission || ''}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un permiso</option>
            {permissions.map((permission) => (
              <option key={permission.id} value={permission.id}>
                {permission.permission}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className='btn btn-warning m-3'>{id ? 'Actualizar' : 'Registrar'}</button>
        <Link to={"/admin/roles"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default RoleEdit;