import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

function CreateReturn() {
  const { id } = useParams(); // Obtener el ID de la venta desde la URL
  const navigate = useNavigate();
  const [motives, setMotives] = useState([]);
  const [selectedMotive, setSelectedMotive] = useState('');
  const [date, setDate] = useState('');
  const [state] = useState(1); // Estado predeterminado como 1
  const [saleDetails, setSaleDetails] = useState(null);

  useEffect(() => {
    const fetchMotives = async () => {
      try {
        const response = await fetch('http://localhost:3000/motivedevolution');
        const data = await response.json();
        setMotives(data);
      } catch (error) {
        console.error("Error fetching motives:", error);
      }
    };

    const fetchSaleDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/sale/${id}`);
        const data = await response.json();
        setSaleDetails(data);
      } catch (error) {
        console.error("Error fetching sale details:", error);
      }
    };

    fetchMotives();
    fetchSaleDetails();

    // Obtener la fecha actual y ajustarla a la zona horaria de Bogotá (UTC-5)
    const now = new Date();
    const bogotaOffset = -5 * 60; // Offset en minutos para Bogotá (UTC-5)
    const localOffset = now.getTimezoneOffset(); // Offset en minutos del navegador
    const adjustedDate = new Date(now.getTime() + (bogotaOffset - localOffset) * 60000);
    const formattedDate = adjustedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    setDate(formattedDate);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const returnData = {
      idSale: id,
      date,
      state,
      idMotive: selectedMotive,
    };

    try {
      const response = await fetch('http://localhost:3000/devolution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnData),
      });

      if (response.ok) {
        // Mostrar alerta de éxito
        Swal.fire({
          title: 'Devolución realizada correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/admin/sales'); // Redirige de nuevo a la lista de ventas
        });
      } else {
        console.error("Failed to save the return.");
        // Mostrar alerta de error
        Swal.fire({
          title: 'Error',
          text: 'No se pudo realizar la devolución.',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error("Error submitting return:", error);
      // Mostrar alerta de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al enviar la devolución.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <h2 className="mb-4">Realizar Devolución</h2>
      {saleDetails ? (
        <div className="mb-4">
          <h3>Detalles de la Venta</h3>
          <p><strong>Fecha de Venta:</strong> {new Date(saleDetails.deliveryDate).toLocaleDateString()}</p>
          <p><strong>Total:</strong> {saleDetails.total}</p>
          <p><strong>Usuario:</strong> {saleDetails.user.firstName} {saleDetails.user.lastName}</p>
          <h4>Productos en la Venta</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {saleDetails.saleDetails.map((item) => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Cargando detalles de la venta...</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha de Devolución</label>
          <input 
            type="date" 
            className="form-control" 
            value={date} 
            readOnly // Hace el campo solo lectura si decides dejarlo visible
          />
        </div>
        <div className="form-group">
          <label>Motivo de Devolución</label>
          <select 
            className="form-control" 
            value={selectedMotive} 
            onChange={(e) => setSelectedMotive(e.target.value)} 
            required
          >
            <option value="">Seleccione un motivo</option>
            {motives.map((motive) => (
              <option key={motive.id} value={motive.id}>
                {motive.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-warning mt-4">Guardar Devolución</button>
      </form>
    </div>
  );
}

export default CreateReturn;
