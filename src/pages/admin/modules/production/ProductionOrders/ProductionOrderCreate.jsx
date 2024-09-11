import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ProductionOrderCreate({ onSave, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    date: initialData.date || new Date().toISOString(),
    notes: initialData.notes || "",
    idUser: initialData.idUser || "",
    state: initialData.state || "",
    targetDate: initialData.targetDate || "",
    details: initialData.details || [{ idProduct: "", amount: "", state: "" }],
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/product") // uerreele para loh productoh
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:3000/user") // Uerreele para user
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = value;
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [...formData.details, { idProduct: "", amount: "", state: "" }],
    });
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      details: updatedDetails,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedDate = new Date(formData.date).toISOString();

    const updatedFormData = {
      ...formData,
      date: formattedDate,
    };

    fetch("http://localhost:3000/productionOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Orden de Producción creada con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          if (onSave) onSave();
          navigate("/admin/productionOrder");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al crear la orden de producción",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    navigate("/admin/productionOrder");
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="order-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>
          {initialData.id
            ? "Editar Orden de Producción"
            : "Crear Orden de Producción"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Fecha:</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date.split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Notas:</label>
            <textarea
              className="form-control"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Usuario:</label>
            <select
              className="form-control"
              name="idUser"
              value={formData.idUser}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un usuario</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Estado:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Entrega:</label>
            <input
              type="date"
              className="form-control"
              name="targetDate"
              value={formData.targetDate.split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <h5>Detalles</h5>
            {formData.details.map((detail, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  name="idProduct"
                  value={detail.idProduct}
                  onChange={(e) =>
                    handleDetailChange(index, "idProduct", e.target.value)
                  }
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
                  className="form-control w-50"
                  placeholder="Cantidad"
                  name="amount"
                  value={detail.amount}
                  onChange={(e) =>
                    handleDetailChange(index, "amount", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  className="form-control w-50"
                  placeholder="Estado"
                  name="state"
                  value={detail.state}
                  onChange={(e) =>
                    handleDetailChange(index, "state", e.target.value)
                  }
                  required
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => handleRemoveDetail(index)}
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-outline-info"
                onClick={handleAddDetail}
              >
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
              {initialData.id ? "Actualizar" : "Guardar"}
            </button>
          </div>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default ProductionOrderCreate;
