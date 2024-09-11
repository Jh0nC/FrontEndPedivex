import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RequestCreate({ onSave, onClose, initialData = {} }) {
  const [formData, setFormData] = useState({
    notes: initialData.notes || "",
    idUser: initialData.idUser || "",
    total: initialData.total || "",
    state: initialData.state || 1, // Valor por defecto para el estado
    creationDate: new Date().toISOString(),
    deadLine: initialData.deadLine || "",
    stateDate: initialData.stateDate || "",
    details: initialData.details || [{ idProduct: "", quantity: "", subtotal: "", total: "" }],
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Mapeo de estados
  const stateNames = {
    1: "Pendiente",
    2: "En producción",
    3: "Terminado",
    4: "Cancelado"
  };

  const getStateNameByNumber = (number) => {
    return stateNames[number] || "Desconocido";
  };

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
      details: [...formData.details, { idProduct: "", quantity: "", subtotal: "", total: "" }],
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

    const formattedDeadLine = new Date(formData.deadLine).toISOString();
    const formattedStateDate = new Date(formData.stateDate).toISOString();

    const updatedFormData = {
      ...formData,
      deadLine: formattedDeadLine,
      stateDate: formattedStateDate,
    };

    fetch("http://localhost:3000/request", {
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
          title: "Pedido creado con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          if (onSave) onSave();
          navigate("/admin/request");
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Hubo un problema al crear el pedido",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        console.error("Error:", error);
      });
  };

  const handleCancel = () => {
    navigate("/admin/request");
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="order-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>{initialData.id ? "Editar Pedido" : "Crear Pedido"}</h2>
        <form onSubmit={handleSubmit}>
          
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
            <label className="form-label">Total:</label>
            <input
              type="number"
              className="form-control"
              name="total"
              value={formData.total}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Estado:</label>
            <input
              type="text"
              className="form-control"
              name="state"
              value={getStateNameByNumber(formData.state)}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Creación:</label>
            <input
              type="date"
              className="form-control"
              name="creationDate"
              value={formData.creationDate.split("T")[0]}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha Límite:</label>
            <input
              type="date"
              className="form-control"
              name="deadLine"
              value={formData.deadLine.split("T")[0]}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Estado:</label>
            <input
              type="date"
              className="form-control"
              name="stateDate"
              value={formData.stateDate.split("T")[0]}
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
                  name="quantity"
                  value={detail.quantity}
                  onChange={(e) =>
                    handleDetailChange(index, "quantity", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control w-50"
                  placeholder="Subtotal"
                  name="subtotal"
                  value={detail.subtotal}
                  onChange={(e) =>
                    handleDetailChange(index, "subtotal", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control w-50"
                  placeholder="Total"
                  name="total"
                  value={detail.total}
                  onChange={(e) =>
                    handleDetailChange(index, "total", e.target.value)
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

export default RequestCreate;
