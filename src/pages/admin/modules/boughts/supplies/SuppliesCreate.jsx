import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

function SupplieCreate() {
  const navigate = useNavigate(); // Hook para redireccionar
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    unit: 'gr',  // Valor predeterminado para el select
    state: '1',
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

  const validateForm = () => {
    if (!formData.name || !formData.stock || !formData.unit || !formData.state) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos.',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/supplie', {
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
      setSuccess('Insumo creado con éxito');
      setError(null);
      setFormData({ name: '', stock: '', unit: 'gr', state: '1' }); // Limpiar formulario

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Insumo creado con éxito.',
      }).then(() => {
        navigate('/admin/supplies'); // Redireccionar después de hacer clic en "OK"
      });

      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al crear el insumo.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Crear Nuevo Insumo</h2>
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
          <label htmlFor="stock" className="form-label">Cantidad en Stock:</label>
          <input
            id="stock"
            className='form-control'
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="unit" className="form-label">Unidad:</label>
          <select
            id="unit"
            className='form-control'
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            required
          >
            <option value="gr">Gramos</option>
            <option value="ml">Mililitros</option>
            <option value="unit">Unidades</option>
          </select>
        </div>
        <div className="m-3 d-flex gap-3">
          <button type="submit" className='btn btn-warning m-3'>Registrar</button>
          <Link to={"/admin/supplies"} className='btn btn-danger m-3'>Regresar</Link>
        </div>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default SupplieCreate;
