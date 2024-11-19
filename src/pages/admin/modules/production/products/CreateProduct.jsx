import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateProducts() {
  const [categories, setCategories] = useState([]);
  const [masses, setMasses] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [details, setDetails] = useState([{ idSupplie: "", amount: "", unit: "", error: "" }]);

  const [idCategorie, setIdCategorie] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [idMass, setIdMass] = useState("");
  const [selectedMassDetails, setSelectedMassDetails] = useState([]); // Nuevo estado para los detalles de la masa seleccionada

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/productCategories")
      .then((response) => response.json())
      .then((data) => setCategories(data));

    fetch("http://localhost:3000/masses")
      .then((response) => response.json())
      .then((data) => setMasses(data));

    fetch("http://localhost:3000/supplie")
      .then((response) => response.json())
      .then((data) => setSupplies(data.filter((supplie) => supplie.state === 1))); // Filtra insumos activos
  }, []);

  // Maneja el cambio de la masa seleccionada
  const handleMassChange = (massId) => {
    setIdMass(massId);
    const selectedMass = masses.find((mass) => mass.id === parseInt(massId));
    setSelectedMassDetails(selectedMass ? selectedMass.massDetails : []);
  };

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];

    if (field === "idSupplie") {
      const currentSupply = supplies.find((supply) => supply.id === parseInt(value));

      // Si se encuentra el insumo, actualizar la unidad automáticamente
      if (currentSupply) {
        updatedDetails[index].unit = currentSupply.unit || ""; // Asegúrate de que unit sea un string válido
      } else {
        updatedDetails[index].unit = ""; // Si no hay insumo seleccionado, la unidad queda vacía
      }

      updatedDetails[index].error = ""; // Limpia el error si cambia el insumo
    }

    if (field === "amount") {
      const currentSupply = supplies.find((supply) => supply.id === parseInt(updatedDetails[index].idSupplie));
      const amount = parseFloat(value) || 0;

      // Validación de stock
      if (currentSupply && amount > currentSupply.stock) {
        updatedDetails[index].error = `Stock insuficiente (disponible: ${currentSupply.stock} ${currentSupply.unit})`;
      } else {
        updatedDetails[index].error = "";
      }
    }

    updatedDetails[index][field] = value; // Actualiza el campo correspondiente
    setDetails(updatedDetails); // Actualiza el estado de los detalles
  };

  const handleAddDetail = () => {
    setDetails([...details, { idSupplie: "", amount: "", unit: "", error: "" }]);
  };

  const handleRemoveDetail = (index) => {
    setDetails(details.filter((_, i) => i !== index));
  };

  const handleCancelClick = () => {
    navigate(`/admin/products`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasErrors = details.some((detail) => detail.error !== "");
    if (hasErrors) {
      Swal.fire({
        title: "Error",
        text: "Corrige los errores en los insumos antes de continuar.",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const product = {
      idCategorie,
      name,
      stock: 0,
      price,
      image: "imagen2.jpg",
      datasheet: {
        idMass,
        details: details.map(({ idSupplie, amount, unit }) => ({ idSupplie, amount, unit })),
      },
    };

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Producto creado!",
          text: "El producto ha sido creado exitosamente.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => navigate("/admin/products"));
      } else {
        throw new Error("Error al crear el producto");
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

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          {/* Categoría y Nombre */}
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="category" className="form-label">Categoría <span style={{ color: 'red' }}>*</span></label>
              <select
                name="idCategorie"
                className="form-select"
                id="category"
                value={idCategorie}
                onChange={(e) => setIdCategorie(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {categories.map((categorie) => (
                  <option key={categorie.id} value={categorie.id}>
                    {categorie.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm">
              <label htmlFor="name" className="form-label">Nombre <span style={{ color: 'red' }}>*</span></label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          {/* Precio y Masa */}
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="price" className="form-label">Precio <span style={{ color: 'red' }}>*</span></label>
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="col-sm">
              <label htmlFor="mass" className="form-label">Masa <span style={{ color: 'red' }}>*</span></label>
              <select
                name="idMass"
                className="form-select"
                id="mass"
                value={idMass}
                onChange={(e) => handleMassChange(e.target.value)}
              >
                <option value="">Selecciona una opción</option>
                {masses.map((mass) => (
                  <option key={mass.id} value={mass.id}>
                    {mass.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="row px-5 py-2">
              <table className="table table-striped mt-2">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Insumo</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedMassDetails.map((detail, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{detail.supply.name}</td>
                      <td>{`${detail.amount} ${detail.unit}`}</td>
                    </tr>
                  ))}
                  {selectedMassDetails.length === 0 && (
                    <tr>
                      <td colSpan="3">No hay detalles para esta masa.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Detalles de Insumos */}
          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles de Insumos</h5>
            {details.map((detail, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  value={detail.idSupplie}
                  onChange={(e) => handleDetailChange(index, "idSupplie", e.target.value)}
                  required
                >
                  <option value="">Selecciona un insumo</option>
                  {supplies.map((supplie) => (
                    <option key={supplie.id} value={supplie.id}>
                      {supplie.name}
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
                <input
                  type="text"
                  className="form-control"
                  placeholder="Unidad"
                  value={detail.unit}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-secondary rounded-4"
                  onClick={() => handleRemoveDetail(index)}
                >
                  <i className="bi bi-dash"></i>
                </button>
                {detail.error && <small className="text-danger">{detail.error}</small>}
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
          {/* Botones de acción */}
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

export default CreateProducts;
