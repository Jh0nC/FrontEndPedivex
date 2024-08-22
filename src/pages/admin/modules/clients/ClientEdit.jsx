import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function PurchaseEdit() {
  const { id } = useParams(); // Suponiendo que estás utilizando un parámetro de ruta para identificar la compra a editar
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    date: ''
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Función para obtener la compra específica desde la API
    const fetchPurchase = async () => {
      try {
        const response = await fetch(`http://localhost:3000/purchases/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener la compra');
        }
        const data = await response.json();
        setFormData(data); // Guardar los datos de la compra en el estado
      } catch (error) {
        setError('Error al cargar la compra: ' + error.message);
      }
    };

    fetchPurchase(); // Llamar a la función cuando el componente se monta
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
    
    try {
      const response = await fetch(`http://localhost:3000/purchases/${id}`, {
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
      setSuccess('Compra actualizada con éxito');
      setError(null);
      console.log('Response:', result);
    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className='mx-3'>Actualizar Compra</h2>
      <form onSubmit={handleSubmit}>
        <div className='m-3'>
          <label htmlFor="product" className="form-label">Producto:</label>
          <input
            id="product"
            className='form-control'
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="quantity" className="form-label">Cantidad:</label>
          <input
            id="quantity"
            className='form-control'
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className='m-3'>
          <label htmlFor="date" className="form-label">Fecha:</label>
          <input
            id="date"
            className='form-control'
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className='btn btn-warning m-3'>Actualizar Compra</button>
        <Link to={"/client/purchases"} className='btn btn-danger m-3'>Regresar</Link>
      </form>
      {success && <p className="text-success">{success}</p>}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default PurchaseEdit;
