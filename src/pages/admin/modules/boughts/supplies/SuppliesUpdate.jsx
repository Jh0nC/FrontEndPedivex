import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

function SupplieUpdate() {
  const { id } = useParams(); // Obtener el id del URL
  const navigate = useNavigate(); // Hook para redireccionar
  const [formData, setFormData] = useState({
    name: '',
    stock: '',
    unit: 'gr',
    state: '1',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Cargar datos del insumo cuando el componente se monta
    const fetchSupplie = async () => {
      try {
        const response = await fetch(`http://localhost:3000/supplie/${id}`);
        if (!response.ok) {
          throw new Error("Error en la solicitud de datos");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al cargar los datos del insumo.',
        });
      }
    };

    fetchSupplie();
  }, [id]);

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
      const response = await fetch(`http://localhost:3000/supplie/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const result = await response.json();
      setSuccess('Insumo editado con éxito');
      setError(null);

      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Insumo editado con éxito.',
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
        text: 'Hubo un problema al editar el insumo.',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Editar Insumo</h2>
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
        <div className='m-3'>
          <label htmlFor="state" className="form-label">Estado:</label>
          <input
            id="state"
            className='form-control'
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='btn btn-warning m-3'>Editar</button>
        <Link to={"/admin/supplies"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default SupplieUpdate;
