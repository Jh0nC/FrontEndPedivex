import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function ProductionOrderUpdate() {
  const { id } = useParams();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [details, setDetails] = useState([]);
  const [errors, setErrors] = useState({});
  const [supplie, setSupplies] = useState([]);

  const [formData, setFormData] = useState({
    idUser: "",
    state: 4,
    targetDate: "",
    details: [],
    notes: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch de la orden de producción
        const response = await fetch(`http://localhost:3000/productionOrder/${id}`);
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        const result = await response.json();

        setFormData({
          idUser: result.idUser || "",
          state: result.state || 4,
          targetDate: result.targetDate
            ? new Date(result.targetDate).toISOString().slice(0, 16)
            : "",
          details: Array.isArray(result.productionOrderDetails)
            ? result.productionOrderDetails.map((detail) => ({
                id: detail.id,
                idProduct: detail.idProduct || "",
                amount: detail.amount || "",
                state: detail.state || 1,
              }))
            : [],
          notes: result.notes || "",
        });

        setDetails(
          Array.isArray(result.productionOrderDetails) ? result.productionOrderDetails : []
        );

        // Fetch de usuarios y filtrado de empleados
        const userResponse = await fetch("http://localhost:3000/user");
        const userData = await userResponse.json();
        const empleados = userData.filter((user) => user.idRole === 3);
        setUsers(Array.isArray(empleados) ? empleados : []);

        // Fetch de productos
        const productResponse = await fetch("http://localhost:3000/product");
        const productData = await productResponse.json();
        setProducts(Array.isArray(productData) ? productData : []);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire("Error", "Hubo un problema al cargar los datos.", "error");
      }
    };

    const fetchSupplies = async () => {
      const response = await fetch("http://localhost:3000/supplie");
      const data = await response.json();
      setSupplies(data);
    };

    fetchSupplies();
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: null })); // Limpiar errores al cambiar
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
    setFormData((prev) => ({ ...prev, details: updatedDetails }));
    setErrors((prev) => ({ ...prev, details: null })); // Limpiar errores en detalles
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
  };

  const handleStateChange = (stateId) => {
    setFormData({ ...formData, state: stateId });
    setErrors((prevErrors) => ({ ...prevErrors, state: null })); // Limpiar errores
  };
  
  const actualizarStock = async (data) => {
    try {
      const productDetails = await Promise.all(
        data.details.map(async (detail) => {
          const response = await fetch(`http://localhost:3000/product/${detail.idProduct}`);
          if (!response.ok) throw new Error(`Error al obtener datos del producto: ${detail.idProduct}`);
          const product = await response.json();
          return {
            ...product,
            requiredAmount: detail.amount,
          };
        })
      );
  
      for (const product of productDetails) {
        const datasheetDetails = product.datasheet?.datasheetDetails || [];
        const massDetails = product.datasheet?.mass?.massDetails || [];
  
        for (const detail of [...datasheetDetails, ...massDetails]) {
          const supply = supplie.find((s) => s.id === detail.idSupplie);
          if (supply) {
            const usedAmount = detail.amount * product.requiredAmount;
  
            // Verificar si el stock es suficiente
            if (supply.stock - usedAmount < 0) {
              Swal.fire({
                title: "Error de Stock",
                text: `No hay suficiente stock de ${supply.name} para comenzar la producción.`,
                icon: "error",
                confirmButtonText: "Ok",
              });
              return false; // Retorna false si el stock es insuficiente
            }
  
            // Actualizar el stock del insumo
            const updateResponse = await fetch(`http://localhost:3000/supplie/${supply.id}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ stock: supply.stock - usedAmount }),
            });
  
            if (!updateResponse.ok) {
              throw new Error(
                `No se pudo actualizar el stock de ${supply.name}. Error: ${updateResponse.status}`
              );
            }
          }
        }
      }
      return true; // Retorna true si todo se actualizó correctamente
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      throw error;
    }
  };

  const handleCancel = () => {
    navigate(`/admin/productionOrder`);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.idUser) {
      newErrors.idUser = "Selecciona un usuario.";
    }
    if (!formData.targetDate) {
      newErrors.targetDate = "Selecciona una fecha límite.";
    } else if (new Date(formData.targetDate) < new Date()) {
      newErrors.targetDate = "La fecha límite no puede ser anterior a hoy.";
    }
    if (details.length === 0) {
      newErrors.details = "Debes agregar al menos un detalle.";
    } else {
      details.forEach((detail, index) => {
        if (!detail.idProduct) {
          newErrors[`details.${index}.idProduct`] = "Selecciona un producto.";
        }
        if (!detail.amount || detail.amount <= 0) {
          newErrors[`details.${index}.amount`] = "La cantidad debe ser mayor a 0.";
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
  
    if (formData.state == 6) {
      const stockUpdated = await actualizarStock(formData);
  
      if (!stockUpdated) {
        // Detener ejecución si no se pudo actualizar el stock
        return;
      }
    }
  
    const formattedDate = new Date().toISOString(); // Asignar fecha actual automáticamente
    const formattedTargetDate = formData.targetDate
      ? new Date(formData.targetDate).toISOString()
      : "";
  
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
          productionOrderDetails: details.map((detail) => ({
            id: detail.id,
            idProduct: detail.idProduct,
            amount: detail.amount,
            state: detail.state || 1,
          })),
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
  

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Editar Orden de Producción</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="user" className="form-label">
                Empleado <span className="text-danger">*</span>
              </label>
              <select
                name="idUser"
                className="form-select"
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
                <div className="alert alert-danger p-1 mt-2">
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
                value={formData.targetDate}
                onChange={handleChange}
              />
              {errors.targetDate && (
                <div className="alert alert-danger p-1 mt-2">
                  {errors.targetDate}
                </div>
              )}
            </div>
          </div>

          <hr className="mx-3" />
          <div className="mb-3">
  <h5>Detalles del Pedido</h5>
  {details.map((detail, index) => (
    <div key={index} className="mb-3">
      <div className="d-flex align-items-center gap-2">
        {/* Select para producto */}
        <select
          className="form-control"
          value={detail.idProduct}
          onChange={(e) => handleDetailChange(index, "idProduct", e.target.value)}
        >
          <option value="">Selecciona un producto *</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>

        {/* Input para cantidad */}
        <input
          type="number"
          className="form-control w-50"
          placeholder="Cantidad *"
          value={detail.amount}
          onChange={(e) => handleDetailChange(index, "amount", e.target.value)}
        />

        {/* Botón para eliminar detalle */}
        <button
          type="button"
          className="btn btn-secondary rounded-4"
          onClick={() => handleRemoveDetail(index)}
        >
          <i className="bi bi-dash"></i>
        </button>
      </div>

      {/* Mensaje de validación único para ambos campos */}
      {(errors[`details.${index}.idProduct`] || errors[`details.${index}.amount`]) && (
        <div className="alert alert-danger p-1 mt-2">
          {errors[`details.${index}.idProduct`] ||
            errors[`details.${index}.amount`]}
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
