import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function ProductionOrderUpdate() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([{ idProduct: "", amount: "", state: 1 }]); // Estado por defecto "Activo"

  const [formData, setFormData] = useState({
    date: "",
    notes: "",
    idUser: "",
    state: 4, // Estado por defecto 'Pendiente'
    targetDate: "",
    details: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productionOrder/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();
        
        setFormData({
          ...result,
          date: result.date ? new Date(result.date).toISOString().slice(0, 16) : "",
          targetDate: result.targetDate ? new Date(result.targetDate).toISOString().slice(0, 16) : "",
        });
        setDetails(Array.isArray(result.details) ? result.details : []); // Asegúrate de que sea un array
    
        const userResponse = await fetch("http://localhost:3000/user");
        const userData = await userResponse.json();
        setUsers(Array.isArray(userData) ? userData : []); // Asegúrate de que sea un array
    
        const productResponse = await fetch("http://localhost:3000/product");
        const productData = await productResponse.json();
        setProducts(Array.isArray(productData) ? productData : []); // Asegúrate de que sea un array
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Hubo un problema al cargar los datos.", "error");
      }
    };
    
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
    
    // Actualizar el estado del pedido con los detalles modificados
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleAddDetail = () => {
    const newDetail = { idProduct: "", amount: "", state: 1 }; // Estado por defecto "Activo"
    setDetails([...details, newDetail]);
    
    // Actualizar el estado del pedido con los nuevos detalles
    setFormData((prev) => ({ ...prev, details: [...prev.details, newDetail] }));
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
    
    // Actualizar el estado del pedido con los detalles restantes
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleStateChange = (stateId) => {
    setFormData({ ...formData, state: stateId });
  };

  const handleCancel = () => {
    navigate(`/admin/productionOrder`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = formData.date ? new Date(formData.date).toISOString() : "";
    const formattedTargetDate = formData.targetDate ? new Date(formData.targetDate).toISOString() : "";

    try {
      const response = await fetch(`http://localhost:3000/productionOrder/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: formattedDate,
          targetDate: formattedTargetDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      Swal.fire({
        title: "¡Pedido de Producción actualizado!",
        text: "El pedido ha sido actualizado exitosamente.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/admin/productionOrder");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  const formatDateForInput = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Editar Orden de Producción</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="user" className="form-label">Usuario</label>
              <select
                name="idUser"
                className="form-select"
                id="user"
                value={formData.idUser}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm">
              <label htmlFor="notes" className="form-label">Notas</label>
              <input
                type="text"
                className="form-control"
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <label className="form-label">Estado</label>
              <div>
                <input
                  type="radio"
                  name="state"
                  value="6"
                  checked={formData.state === 6}
                  onChange={() => handleStateChange(6)}
                />
                <label className="ms-2">En Producción</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="state"
                  value="7"
                  checked={formData.state === 7}
                  onChange={() => handleStateChange(7)}
                />
                <label className="ms-2">Terminado</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="state"
                  value="3"
                  checked={formData.state === 3}
                  onChange={() => handleStateChange(3)}
                />
                <label className="ms-2">Cancelado</label>
              </div>
            </div>
            <div className="col-sm">
              <label htmlFor="date" className="form-label">Fecha</label>
              <input
                type="datetime-local"
                className="form-control"
                name="date"
                id="date"
                value={formatDateForInput(formData.date)}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-sm">
              <label htmlFor="targetDate" className="form-label">Fecha Límite</label>
              <input
                type="datetime-local"
                className="form-control"
                name="targetDate"
                id="targetDate"
                value={formatDateForInput(formData.targetDate)}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles del Pedido</h5>
            {details.map((detail, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  value={detail.idProduct}
                  onChange={(e) => handleDetailChange(index, "idProduct", e.target.value)}
                  required
                >
                  <option value="">Selecciona un producto</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Cantidad"
                  value={detail.amount}
                  onChange={(e) => handleDetailChange(index, "amount", e.target.value)}
                  required
                />
                <button type="button" className="btn btn-secondary rounded-4" onClick={() => handleRemoveDetail(index)}>
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-info rounded-4" onClick={handleAddDetail}>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>

          <div className="m-1 d-flex gap-3">
              <button
                type="button"
                className="btn btn-secondary rounded-5"
                onClick={handleCancel}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-success rounded-5">
                {id ? "Actualizar" : "Guardar"}
              </button>
            </div>

        </form>
      </div>
    </div>
  );
}

export default ProductionOrderUpdate;
