import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ProductionOrderCreate({ onSave, initialData = {} }) {
  const navigate = useNavigate();

  // Función para obtener la fecha formateada en 'YYYY-MM-DD'
  function getFormattedDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses comienzan desde 0
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: initialData.date || getFormattedDate(new Date()),
      notes: initialData.notes || "",
      idUser: initialData.idUser || "",
      targetDate: initialData.targetDate || "",
      details: initialData.details || [{ idProduct: "", amount: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [supplie, setSupplies] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://pedivexapi.onrender.com/product");
      const data = await response.json();
      setProducts(data);
    };

    const fetchUsers = async () => {
      const response = await fetch("https://pedivexapi.onrender.com/employee");
      const data = await response.json();
      const empleados = data.filter((user) => user.idRole === 3); // Filtrar empleados
      setUsers(empleados);
    };

    const fetchSupplies = async () => {
      const response = await fetch("https://pedivexapi.onrender.com/supplie");
      const data = await response.json();
      setSupplies(data);
    };

    fetchProducts();
    fetchUsers();
    fetchSupplies();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Obtener todos los detalles de los productos seleccionados en la orden
      const productDetails = await Promise.all(
        data.details.map(async (detail) => {
          const response = await fetch(
            `http://localhost:3000/product/${detail.idProduct}`
          );
          if (!response.ok)
            throw new Error(
              `Error al obtener datos del producto: ${detail.idProduct}`
            );
          const product = await response.json();
          return {
            ...product,
            requiredAmount: detail.amount, // Cantidad especificada en la orden
          };
        })
      );

      // Validar si hay suficientes insumos para todos los productos
      for (const product of productDetails) {
        const datasheetDetails = product.datasheet?.datasheetDetails || [];
        const massDetails = product.datasheet?.mass?.massDetails || [];

        for (const detail of [...datasheetDetails, ...massDetails]) {
          const supply = supplie.find((s) => s.id === detail.idSupplie);
          if (
            !supply ||
            supply.stock < detail.amount * product.requiredAmount
          ) {
            throw new Error(
              `No hay suficiente stock de ${detail.supply.name} para producir ${product.requiredAmount} unidades de ${product.name}.`
            );
          }
        }
      }

      // Formatear datos para enviar al backend
      const formattedData = {
        ...data,
        state: 4, // Estado predeterminado
        details: data.details.map((detail) => ({
          idProduct: parseInt(detail.idProduct, 10),
          amount: parseInt(detail.amount, 10),
          state: 1, // Estado predeterminado para detalles
        })),
      };

      // Crear la orden de producción
      const response = await fetch("https://pedivexapi.onrender.com/productionOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok)
        throw new Error(`Error en la solicitud: ${response.status}`);

      // Notificar éxito
      Swal.fire({
        icon: "success",
        title: "Orden de Producción creada",
        confirmButtonText: "Aceptar",
      }).then(() => {
        if (onSave) onSave();
        navigate("/admin/productionOrder");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Hubo un problema: ${error.message}`,
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="order-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>
          {initialData.id
            ? "Editar Orden de Producción"
            : "Crear Orden de Producción"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Fecha de creación</label>
            <input
              type="date"
              className="form-control"
              {...register("date")}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Notas</label>
            <textarea
              className="form-control"
              {...register("notes")}
              placeholder="Opcional"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Empleado
              <span className="text-danger">*</span>
            </label>
            <select
              className="form-control"
              {...register("idUser", { required: "Selecciona un empleado" })}
            >
              <option value="">Selecciona un empleado</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.firstName} ${user.lastName}`}
                </option>
              ))}
            </select>
            {errors.idUser && (
              <div className="alert alert-danger p-1 mt-2">
                {errors.idUser.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">
              Fecha de Entrega:
              <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              {...register("targetDate", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  new Date(value) >= new Date().setHours(0, 0, 0, 0) ||
                  "La fecha límite no puede ser anterior a la fecha actual.",
              })}
            />
            {errors.targetDate && (
              <div className="alert alert-danger p-1 mt-2">
                {errors.targetDate.message}
              </div>
            )}
          </div>
          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles de la Orden</h5>
            {fields.map((item, index) => (
              <div key={item.id} className="mb-3">
                <div className="d-flex align-items-center gap-2">
                  <select
                    className="form-control"
                    {...register(`details.${index}.idProduct`, {
                      required: "Selecciona un producto",
                    })}
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
                    min="1"
                    {...register(`details.${index}.amount`, {
                      required: "Este campo es obligatorio",
                      min: {
                        value: 1,
                        message: "La cantidad debe ser mayor a 0",
                      },
                    })}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary rounded-4"
                    onClick={() => remove(index)}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                </div>
                {(errors?.details?.[index]?.idProduct ||
                  errors?.details?.[index]?.amount) && (
                  <div className="alert alert-danger p-1 mt-2">
                    {errors?.details?.[index]?.idProduct?.message ||
                      errors?.details?.[index]?.amount?.message}
                  </div>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn btn-info rounded-4"
              onClick={() => append({ idProduct: "", amount: "" })}
            >
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary rounded-5"
              onClick={() => navigate("/admin/productionOrder")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-success rounded-5">
              {initialData.id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductionOrderCreate;
