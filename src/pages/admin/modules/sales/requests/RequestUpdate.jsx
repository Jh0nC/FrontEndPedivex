import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function RequestUpdate() {
  const { id } = useParams(); // Para obtener el ID del pedido a editar
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([
    { idProduct: "", quantity: "", subtotal: "", total: "" },
  ]);
  const [request, setRequest] = useState({
    idUser: "",
    total: "",
    state: "",
    creationDate: "",
    deadLine: "",
    stateDate: "",
    requestDetails: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch para obtener el pedido a editar
    fetch(`http://localhost:3000/request/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setRequest(data);
        setDetails(data.requestDetails);
      })
      .catch((error) => console.error("Error al obtener el pedido:", error));

    // Fetch para usuarios
    fetch("http://localhost:3000/user")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));

    // Fetch para productos
    fetch("http://localhost:3000/product")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error al obtener productos:", error));
  }, [id]);

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleCancelClick = () => {
    navigate(`/admin/request`);
  };

  const handleAddDetail = () => {
    setDetails([
      ...details,
      { idProduct: "", quantity: "", subtotal: "", total: "" },
    ]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRequest = {
      ...request,
      requestDetails: details.map((detail) => ({
        idProduct: detail.idProduct,
        quantity: detail.quantity,
        subtotal: detail.subtotal,
        total: detail.total,
      })),
    };

    console.log("Datos enviados en el PUT:", updatedRequest);
    console.log("ID del pedido:", id);

    try {
      const response = await fetch(`http://localhost:3000/request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRequest),
      });

      console.log("Estado de la respuesta:", response.status);
      console.log("Respuesta:", await response.text());

      if (response.ok) {
        Swal.fire({
          title: "¡Pedido actualizado!",
          text: "El pedido ha sido actualizado exitosamente.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/admin/request");
        });
      } else {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
  };

  // Helper function to format dates for input fields
  const formatDateForInput = (date) => {
    const d = new Date(date);
    if (isNaN(d.getTime())) return ""; // Return empty string if date is invalid
    return d.toISOString().slice(0, 16);
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Editar Pedido</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="user" className="form-label">
                Usuario
              </label>
              <select
                name="idUser"
                className="form-select"
                id="user"
                value={request.idUser}
                onChange={(e) =>
                  setRequest({ ...request, idUser: e.target.value })
                }
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
              <label htmlFor="total" className="form-label">
                Total
              </label>
              <input
                type="number"
                className="form-control"
                name="total"
                id="total"
                value={request.total}
                onChange={(e) =>
                  setRequest({ ...request, total: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="state" className="form-label">
                Estado
              </label>
              <input
                type="text"
                className="form-control"
                name="state"
                id="state"
                value={request.state}
                onChange={(e) =>
                  setRequest({ ...request, state: e.target.value })
                }
                required
              />
            </div>
            <div className="col-sm">
              <label htmlFor="creationDate" className="form-label">
                Fecha de Creación
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="creationDate"
                id="creationDate"
                value={formatDateForInput(request.creationDate)}
                onChange={(e) =>
                  setRequest({
                    ...request,
                    creationDate: new Date(e.target.value).toISOString(),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="deadLine" className="form-label">
                Fecha Límite
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="deadLine"
                id="deadLine"
                value={formatDateForInput(request.deadLine)}
                onChange={(e) =>
                  setRequest({
                    ...request,
                    deadLine: new Date(e.target.value).toISOString(),
                  })
                }
                required
              />
            </div>
            <div className="col-sm">
              <label htmlFor="stateDate" className="form-label">
                Fecha de Estado
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="stateDate"
                id="stateDate"
                value={formatDateForInput(request.stateDate)}
                onChange={(e) =>
                  setRequest({
                    ...request,
                    stateDate: new Date(e.target.value).toISOString(),
                  })
                }
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
                  className="form-control"
                  placeholder="Cantidad"
                  value={detail.quantity}
                  onChange={(e) =>
                    handleDetailChange(index, "quantity", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Subtotal"
                  value={detail.subtotal}
                  onChange={(e) =>
                    handleDetailChange(index, "subtotal", e.target.value)
                  }
                  required
                />
                <input
                  type="number"
                  className="form-control"
                  placeholder="Total"
                  value={detail.total}
                  onChange={(e) =>
                    handleDetailChange(index, "total", e.target.value)
                  }
                  required
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
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary rounded-5"
              onClick={handleCancelClick}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success rounded-5">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestUpdate;
