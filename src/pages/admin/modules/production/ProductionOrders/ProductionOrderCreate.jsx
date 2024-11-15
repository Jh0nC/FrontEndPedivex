import React, { useState, useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ProductionOrderCreate({ onSave, initialData = {} }) {
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm({
    defaultValues: {
      date: initialData.date || new Date().toISOString().split("T")[0],
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

  // Fetch products and users
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/product");
      const data = await response.json();
      setProducts(data);
    };

    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/user");
      const data = await response.json();
      const empleados = data.filter((user) => user.idRole === 3); // Filter employees
      setUsers(empleados);
    };

    fetchProducts();
    fetchUsers();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    const formattedData = {
        ...data,
        state: 4, // Estado general de la orden
        details: data.details.map(detail => ({
            idProduct: parseInt(detail.idProduct, 10),
            amount: parseInt(detail.amount, 10),
            state: 1, // Valor predeterminado o el valor deseado para el campo `state`
        })),
    };

    console.log("Datos enviados al backend:", JSON.stringify(formattedData, null, 2));

    try {
        const response = await fetch("http://localhost:3000/productionOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formattedData),
        });
        if (!response.ok) throw new Error(`Error en la solicitud: ${response.status}`);

        Swal.fire({
            icon: "success",
            title: "Orden de Producción creada con éxito",
            confirmButtonText: "Aceptar",
        }).then(() => {
            if (onSave) onSave();
            navigate("/admin/productionOrder");
        });
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: `Hubo un problema al crear la orden de producción: ${error.message}`,
        });
        console.error("Error al enviar datos:", error);
    }
};




  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="order-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>{initialData.id ? "Editar Orden de Producción" : "Crear Orden de Producción"}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label className="form-label">Fecha de creación:</label>
            <input
              type="date"
              className="form-control"
              {...register("date")}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Notas:</label>
            <textarea
              className="form-control"
              {...register("notes")}
              placeholder="Opcional"
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Empleado:</label>
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
            {errors.idUser && <div className="alert alert-danger p-1 mt-2">{errors.idUser.message}</div>}
          </div>
          <div className="mb-3">
            <label className="form-label">Fecha de Entrega:</label>
            <input
              type="date"
              className="form-control"
              min={new Date().toISOString().split("T")[0]}
              {...register("targetDate", { required: "Este campo es obligatorio" })}
            />
            {errors.targetDate && <div className="alert alert-danger p-1 mt-2">{errors.targetDate.message}</div>}
          </div>
          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles</h5>
            {fields.map((item, index) => (
              <div key={item.id} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  {...register(`details.${index}.idProduct`, { required: "Selecciona un producto" })}
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
                  min="1"
                  {...register(`details.${index}.amount`, {
                    required: "Este campo es obligatorio",
                    min: { value: 1, message: "Cantidad debe ser mayor a 0" },
                  })}
                />
                {errors?.details?.[index]?.amount && (
                  <div className="alert alert-danger p-1 mt-2">{errors.details[index].amount.message}</div>
                )}
                <button
                  type="button"
                  className="btn btn-secondary rounded-4"
                  onClick={() => remove(index)}
                >
                  <i className="bi bi-dash"></i>
                </button>
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
            <button type="button" className="btn btn-secondary rounded-5" onClick={() => navigate("/admin/productionOrder")}>
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
