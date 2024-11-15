import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function RequestCreate({ onSave, initialData = {} }) {
  const getStateNameByNumber = (number) => {
    const stateNames = {
      4: "Pendiente",
      7: "Terminado",
      3: "Cancelado",
    };
    return stateNames[number] || "Desconocido";
  };

  const [formData, setFormData] = useState({
    notes: initialData.notes || "",
    idUser: initialData.idUser || "",
    total: initialData.total || 0.0,
    state: initialData.state || 4,
    creationDate: new Date().toISOString(),
    deadLine: initialData.deadLine || "",
    details: initialData.details || [{ idProduct: "", quantity: 0, subtotal: 0.0, price: 0.0 }],
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch de productos
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch de usuarios filtrando solo clientes
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => {
        const clientes = data.filter((user) => user.idRole === 2);
        setUsers(clientes);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "deadLine") {
      const selectedDate = new Date(value);
      const today = new Date();
      if (selectedDate < today) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          deadLine: "La fecha límite no puede ser anterior a la fecha actual",
        }));
      } else {
        setErrors((prevErrors) => {
          const { deadLine, ...rest } = prevErrors;
          return rest;
        });
      }
    }
  };

  const calculateTotal = (details) => {
    return details.reduce((acc, detail) => acc + parseFloat(detail.subtotal || 0), 0);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...formData.details];
    updatedDetails[index][field] = value;

    if (field === "quantity" || field === "idProduct") {
      const selectedProduct = products.find(
        (product) => product.id === parseInt(updatedDetails[index].idProduct)
      );
      const price = selectedProduct ? parseFloat(selectedProduct.price) : 0;
      const quantity = parseFloat(updatedDetails[index].quantity) || 0;

      if (quantity <= 0) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [`details.${index}.quantity`]: "La cantidad debe ser mayor a 0",
        }));
      } else {
        setErrors((prevErrors) => {
          const { [`details.${index}.quantity`]: _, ...rest } = prevErrors;
          return rest;
        });
      }

      updatedDetails[index].price = price;
      updatedDetails[index].subtotal = (price * quantity).toFixed(2);
    }

    const total = calculateTotal(updatedDetails);
    setFormData({
      ...formData,
      details: updatedDetails,
      total: total.toFixed(2),
    });
  };

  const handleAddDetail = () => {
    setFormData({
      ...formData,
      details: [
        ...formData.details,
        { idProduct: "", quantity: 0, subtotal: 0.0, price: 0.0 },
      ],
    });
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = formData.details.filter((_, i) => i !== index);
    const total = calculateTotal(updatedDetails);

    setFormData({
      ...formData,
      details: updatedDetails,
      total: total.toFixed(2),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      details: formData.details.map((detail) => ({
        ...detail,
        idProduct: parseInt(detail.idProduct, 10),
        quantity: parseFloat(detail.quantity),
        subtotal: parseFloat(detail.subtotal),
        price: parseFloat(detail.price || 0),
      })),
      deadLine: new Date(formData.deadLine).toISOString(),
    };

    if (Object.keys(errors).length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, corrige los errores antes de enviar el formulario.",
      });
      return;
    }

    fetch("http://localhost:3000/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la solicitud");
        return response.json();
      })
      .then((data) => {
        Swal.fire({
          title: "Pedido creado con éxito",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => navigate("/admin/request"));
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
            <label className="form-label">Cliente:</label>
            <select
              className="form-control"
              name="idUser"
              value={formData.idUser}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un cliente</option>
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
            {errors.deadLine && <div className="alert alert-danger p-1 mt-2">{errors.deadLine}</div>}
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
                {errors[`details.${index}.quantity`] && (
                  <div className="alert alert-danger p-1 mt-2">
                    {errors[`details.${index}.quantity`]}
                  </div>
                )}
                <input
                  type="number"
                  className="form-control w-50"
                  placeholder="Subtotal"
                  name="subtotal"
                  value={detail.subtotal}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-secondary rounded-4"
                  onClick={() => handleRemoveDetail(index)}
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-info rounded-4"
              onClick={handleAddDetail}
            >
              <i className="bi bi-plus-lg"></i>
            </button>

            <div className="d-flex justify-content-end gap-2">
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
