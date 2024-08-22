/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom';
import  { useState } from 'react';

function ClientCreate() {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    document: '',
    address: '',
    phone: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      const response = await fetch('http://localhost:3000/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Cliente registrado con éxito');
      setError(null);
      setFormData({ name: '', lastname: '', document: '', address: '', phone: '' }); // Limpiar formulario
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };


  const ClientCreate = ({ formData, handleChange, handleSubmit, success, error }) => {
    return (
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <h2 className='mx-3'>Registrar Nuevo Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className='m-3'>
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input
              id="name"
              className='form-control'
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className='m-3'>
            <label htmlFor="lastname" className="form-label">Apellido:</label>
            <input
              id="lastname"
              className='form-control'
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
  
          <div className='m-3'>
            <label htmlFor="document" className="form-label">Documento:</label>
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
  
          <div className='m-3'>
            <label htmlFor="address" className="form-label">Dirección:</label>
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
  
          <div className='m-3'>
            <label htmlFor="phone" className="form-label">Teléfono:</label>
            <input
              id="phone"
              className='form-control'
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
  
          <button type="submit" className='btn btn-warning m-3'>Registrar Cliente</button>
          <Link to={"/client/purchases"} className='btn btn-danger m-3'>Regresar</Link>
        </form>
  
        {success && <p className="text-success">{success}</p>}
        {error && <p className="text-danger">{error}</p>}
      </div>
    );
  }
  
}
export default ClientCreate;
  