import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProductionOrderUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    date: "",
    notes: "",
    idUser: "",
    state: 4,
    targetDate: "",
    details: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/productionOrder/${id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();

        setFormData({
          ...result,
          date: result.date
            ? new Date(result.date).toISOString().slice(0, 16)
            : "",
          targetDate: result.targetDate
            ? new Date(result.targetDate).toISOString().slice(0, 16)
            : "",
          details: Array.isArray(result.productionOrderDetails)
            ? result.productionOrderDetails
            : [],
        });

        setDetails(
          Array.isArray(result.productionOrderDetails)
            ? result.productionOrderDetails
            : []
        );

        const userResponse = await fetch("http://localhost:3000/user");
        const userData = await userResponse.json();
        setUsers(Array.isArray(userData) ? userData : []);

        const productResponse = await fetch("http://localhost:3000/product");
        const productData = await productResponse.json();
        setProducts(Array.isArray(productData) ? productData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Limpiar errores al cambiar valor
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));

    // Limpiar errores específicos del detalle
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.details && newErrors.details[index]) {
        delete newErrors.details[index][field];
        if (Object.keys(newErrors.details[index]).length === 0) {
          delete newErrors.details[index];
        }
      }
      return newErrors;
    });
  };

  const handleAddDetail = () => {
    const newDetail = { idProduct: "", amount: "", state: 1 };
    const updatedDetails = [...details, newDetail];
    setDetails(updatedDetails);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));

    // Limpiar errores específicos del detalle eliminado
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (newErrors.details) {
        delete newErrors.details[index];
      }
      return newErrors;
    });
  };

  const handleStateChange = (newState) => {
    if (formData.state === 7) {
      setErrors({
        ...errors,
        state:
          "La orden de producción ya está en estado 'Terminado' y no se puede cambiar.",
      });
      return;
    }
    if ((formData.state === 6 || formData.state === 7) && newState === 3) {
      setErrors({
        ...errors,
        state: "No se puede cancelar una orden que está en producción o terminada.",
      });
      return;
    }
    setFormData({ ...formData, state: newState });
    setErrors((prevErrors) => ({ ...prevErrors, state: null })); // Limpiar errores al cambiar estado
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.idUser) {
      newErrors.idUser = "Por favor, selecciona un usuario.";
    }
    if (!formData.targetDate) {
      newErrors.targetDate = "Por favor, selecciona una fecha límite.";
    } else if (new Date(formData.targetDate) < new Date()) {
      newErrors.targetDate = "La fecha límite no puede ser anterior a hoy.";
    }
    if (details.length === 0) {
      newErrors.details = "Debes agregar al menos un detalle.";
    } else {
      newErrors.details = details.map((detail, index) => {
        const detailErrors = {};
        if (!detail.idProduct) {
          detailErrors.idProduct = "Selecciona un producto.";
        }
        if (!detail.amount || detail.amount <= 0) {
          detailErrors.amount = "La cantidad debe ser mayor a 0.";
        }
        return Object.keys(detailErrors).length > 0 ? detailErrors : null;
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    navigate(`/admin/productionOrder`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Si hay errores, no proceder
    }

    const formattedDate = formData.date
      ? new Date(formData.date).toISOString()
      : "";
    const formattedTargetDate = formData.targetDate
      ? new Date(formData.targetDate).toISOString()
      : "";

    try {
      const response = await fetch(
        `http://localhost:3000/productionOrder/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            date: formattedDate,
            targetDate: formattedTargetDate,
            productionOrderDetails: details.map((detail) => ({
              id: detail.id,
              idProduct: detail.idProduct,
              amount: detail.amount,
              state: detail.state || 1,
            })),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      navigate("/admin/productionOrder");
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
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
              <label htmlFor="user" className="form-label">
                Usuario <span className="text-danger">*</span>
              </label>
              <select
                name="idUser"
                className="form-control"
                id="user"
                value={formData.idUser}
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
                <div className="alert alert-danger p-1 mt-1">
                  {errors.idUser}
                </div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="notes" className="form-label">
                Notas
              </label>
              <input
                type="text"
                className="form-control"
                name="notes"
                id="notes"
                value={formData.notes}
                onChange={handleChange}
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
              {errors.state && (
                <div className="alert alert-danger p-1 mt-1">
                  {errors.state}
                </div>
              )}
            </div>
            <div className="col-sm">
              <label htmlFor="targetDate" className="form-label">
                Fecha Límite <span className="text-danger">*</span>
              </label>
              <input
                type="datetime-local"
                className="form-control"
                name="targetDate"
                id="targetDate"
                min={new Date().toISOString().slice(0, 16)}
                value={formData.targetDate}
                onChange={handleChange}
              />
              {errors.targetDate && (
                <div className="alert alert-danger p-1 mt-1">
                  {errors.targetDate}
                </div>
              )}
            </div>
          </div>

          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles de la Orden</h5>
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
                  {errors.details?.[index]?.idProduct && (
                    <div className="alert alert-danger p-1 mt-1">
                      {errors.details[index].idProduct}
                    </div>
                  )}
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Cantidad *"
                    value={detail.amount}
                    onChange={(e) =>
                      handleDetailChange(index, "amount", e.target.value)
                    }
                  />
                  {errors.details?.[index]?.amount && (
                    <div className="alert alert-danger p-1 mt-1">
                      {errors.details[index].amount}
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary rounded-4"
                    onClick={() => handleRemoveDetail(index)}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                </div>
              </div>
            ))}
            {typeof errors.details === "string" && (
              <div className="alert alert-danger p-1 mt-1">{errors.details}</div>
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
