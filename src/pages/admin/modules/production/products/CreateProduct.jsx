import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateProducts() {
  // Estados para almacenar las categorías, masas y insumos
  const [categories, setCategories] = useState([]);
  const [masses, setMasses] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [details, setDetails] = useState([{ idSupplie: "", amount: "", unit: "gr" }]);

  // Estados para almacenar los datos del formulario
  const [idCategorie, setIdCategorie] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [idMass, setIdMass] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch para categorías
    fetch("http://localhost:3000/productCategories")
      .then((response) => response.json())
      .then((data) => setCategories(data));

    // Fetch para masas
    fetch("http://localhost:3000/masses")
      .then((response) => response.json())
      .then((data) => setMasses(data));

    // Fetch para insumos
    fetch("http://localhost:3000/supplie")
      .then((response) => response.json())
      .then((data) => setSupplies(data));
  }, []);

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { idSupplie: "", amount: "", unit: "gr" }]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleCancelClick = () => {
    navigate(`/admin/products`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      idCategorie,
      name,
      stock: 0,
      price,
      image: "imagen2.jpg",
      datasheet: {
        idMass,
        details
      }
    };

    try {
      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Producto creado!",
          text: "El producto ha sido creado exitosamente.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("admin/products");
        });
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
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="category" className="form-label">Categoría</label>
              <select
                name="idCategorie"
                className="form-select"
                id="category"
                value={idCategorie}
                onChange={(e) => setIdCategorie(e.target.value)}
                required
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
              <label htmlFor="name" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="price" className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="price"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="col-sm">
              <label htmlFor="mass" className="form-label">Masa</label>
              <select
                name="idMass"
                className="form-select"
                id="mass"
                value={idMass}
                onChange={(e) => setIdMass(e.target.value)}
                required
              >
                <option value="">Selecciona una opción</option>
                {masses.map((mass) => (
                  <option key={mass.id} value={mass.id}>
                    {mass.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
            <hr className="mx-3"/>
          <div className="mb-3">
            <h5>Detalles de Insumos</h5>
            {details.map((detail, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  value={detail.idSupplie}
                  onChange={(e) =>
                    handleDetailChange(index, "idSupplie", e.target.value)
                  }
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
                  onChange={(e) =>
                    handleDetailChange(index, "amount", e.target.value)
                  }
                  required
                />
                <select
                  className="form-control"
                  value={detail.unit}
                  onChange={(e) =>
                    handleDetailChange(index, "unit", e.target.value)
                  }
                  required
                >
                  <option value="gr">Gramos</option>
                  <option value="ml">Mililitros</option>
                  <option value="lb">Libras</option>
                </select>
                <button
                  type="button"
                  className="btn btn-secondary  rounded-4"
                  onClick={() => handleRemoveDetail(index)}
                >
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-info  rounded-4"
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

export default CreateProducts;
