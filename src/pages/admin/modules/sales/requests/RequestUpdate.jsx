import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function RequestUpdate() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // nuevo estado
  const [request, setRequest] = useState({
    idUser: "",
    total: 0,
    state: 4,
    creationDate: "",
    deadLine: "",
    stateDate: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/request/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();

        setRequest({
          ...data,
          creationDate: data.creationDate
            ? new Date(data.creationDate).toISOString().slice(0, 16)
            : "",
          deadLine: data.deadLine
            ? new Date(data.deadLine).toISOString().slice(0, 16)
            : "",
          stateDate: data.stateDate
            ? new Date(data.stateDate).toISOString().slice(0, 16)
            : "",
        });

        setDetails(Array.isArray(data.requestDetails) ? data.requestDetails : []);

        const userResponse = await fetch("http://localhost:3000/user");
        const userData = await userResponse.json();

        // Filtrar solo clientes (suponiendo que idRole de clientes es 2)
        const clientes = userData.filter((user) => user.idRole === 2);
        setUsers(Array.isArray(clientes) ? clientes : []);

        const productResponse = await fetch("http://localhost:3000/product");
        const productData = await productResponse.json();
        setProducts(Array.isArray(productData) ? productData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Hubo un problema al cargar los datos.", "error");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Limpiar errores al cambiar
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;

    if (field === "quantity" || field === "idProduct") {
      const selectedProduct = products.find(
        (product) => product.id === parseInt(updatedDetails[index].idProduct, 10)
      );
      const price = selectedProduct ? parseFloat(selectedProduct.price) : 0;
      const quantity = parseFloat(updatedDetails[index].quantity) || 0;

      updatedDetails[index].subtotal = (price * quantity).toFixed(2);
      updatedDetails[index].price = price;
    }

    setDetails(updatedDetails);
    // Limpiar errores al cambiar
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`details.${index}.idProduct`];
      delete newErrors[`details.${index}.quantity`];
      return newErrors;
    });
  };

  const calculateTotal = () => {
    return details.reduce((acc, detail) => {
      return acc + parseFloat(detail.subtotal || 0);
    }, 0);
  };

  const handleAddDetail = () => {
    const newDetail = { idProduct: "", quantity: "", price: 0, subtotal: 0 };
    const updatedDetails = [...details, newDetail];
    setDetails(updatedDetails);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleStateChange = (stateId) => {
    setRequest({ ...request, state: stateId });
    setErrors((prevErrors) => ({ ...prevErrors, state: null })); // Limpiar errores
  };

  const handleCancel = () => {
    navigate(`/admin/request`);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!request.idUser) {
      newErrors.idUser = "Selecciona un usuario.";
    }

    if (!request.deadLine) {
      newErrors.deadLine = "Selecciona una fecha límite.";
    } else if (new Date(request.deadLine) < new Date()) {
      newErrors.deadLine = "La fecha límite no puede ser anterior a hoy.";
    }

    if (details.length === 0) {
      newErrors.details = "Debes agregar al menos un detalle.";
    } else {
      details.forEach((detail, index) => {
        const product = products.find((p) => p.id === parseInt(detail.idProduct, 10));
        if (!detail.idProduct) {
          newErrors[`details.${index}.idProduct`] = "Selecciona un producto.";
        }
        if (!detail.quantity || detail.quantity <= 0) {
          newErrors[`details.${index}.quantity`] = "La cantidad debe ser mayor a 0.";
        }
        if (product && detail.quantity > product.stock && request.state === 7) {
          newErrors[`details.${index}.quantity`] = `La cantidad excede el stock disponible (${product.stock}).`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true); //  indicador de carga 1

    // Asignar automáticamente las fechas actuales
    const formattedCreationDate = new Date().toISOString();
    const formattedStateDate = new Date().toISOString();
    const formattedDeadLine = request.deadLine
      ? new Date(request.deadLine).toISOString()
      : "";

    const total = calculateTotal();

    const requestData = {
      ...request,
      creationDate: formattedCreationDate,
      deadLine: formattedDeadLine,
      stateDate: formattedStateDate,
      total: total,
      requestDetails: details.map((detail) => ({
        id: detail.id,
        idProduct: parseInt(detail.idProduct, 10),
        quantity: parseFloat(detail.quantity),
        price: parseFloat(detail.price),
        subtotal: parseFloat(detail.subtotal),
      })),
    };

    try {
      const response = await fetch(`http://localhost:3000/request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error al actualizar el pedido.");
      }

      Swal.fire({
        title: "¡Pedido actualizado!",
        text: "El pedido ha sido actualizado exitosamente.",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        navigate("/admin/request");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setIsSubmitting(false); //  indicador de carga 2
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Editar Pedido</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="user" className="form-label">
                Usuario <span className="text-danger">*</span>
              </label>
              <select
                name="idUser"
                className="form-select"
                id="user"
                value={request.idUser}
                onChange={handleChange}
              >
                <option value="">Selecciona un usuario</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </select>
              {errors.idUser && (
                <div className="alert alert-danger p-1 mt-2">{errors.idUser}</div>
              )}
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
                value={calculateTotal()}
                readOnly
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <label className="form-label">
                Estado <span className="text-danger">*</span>
              </label>
              <div>
                <input
                  type="radio"
                  name="state"
                  value="7"
                  checked={request.state === 7}
                  onChange={() => handleStateChange(7)}
                />
                <label className="ms-2">Terminado</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="state"
                  value="3"
                  checked={request.state === 3}
                  onChange={() => handleStateChange(3)}
                />
                <label className="ms-2">Cancelado</label>
              </div>
              {errors.state && (
                <div className="alert alert-danger p-1 mt-2">{errors.state}</div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="deadLine" className="form-label">
                Fecha Límite <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="deadLine"
                id="deadLine"
                value={request.deadLine}
                onChange={handleChange}
              />
              {errors.deadLine && (
                <div className="alert alert-danger p-1 mt-2">{errors.deadLine}</div>
              )}
            </div>
          </div>

          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles del Pedido</h5>
            {details.map((detail, index) => (
              <div key={index} className="mb-3">
                <div className="d-flex align-items-center gap-2">
                  <select
                    className="form-control"
                    value={detail.idProduct}
                    onChange={(e) =>
                      handleDetailChange(index, "idProduct", e.target.value)
                    }
                  >
                    <option value="">Selecciona un producto *</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    className="form-control w-50"
                    placeholder="Cantidad *"
                    value={detail.quantity}
                    onChange={(e) =>
                      handleDetailChange(index, "quantity", e.target.value)
                    }
                  />

                  <input
                    type="number"
                    className="form-control w-50"
                    placeholder="Subtotal"
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

                {(errors[`details.${index}.idProduct`] ||
                  errors[`details.${index}.quantity`]) && (
                  <div className="alert alert-danger p-1 mt-2">
                    {errors[`details.${index}.idProduct`] ||
                      errors[`details.${index}.quantity`]}
                  </div>
                )}
              </div>
            ))}
            {errors.details && (
              <div className="alert alert-danger p-1 mt-2">{errors.details}</div>
            )}
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
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success rounded-5" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RequestUpdate;
