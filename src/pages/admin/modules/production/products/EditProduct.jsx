import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [masses, setMasses] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [details, setDetails] = useState([{ idSupplie: "", amount: "", unit: "gr" }]);

  // Estado del producto
  const [product, setProduct] = useState({
    idCategorie: "",
    name: "",
    price: "",
    idMass: "",
    stock: 0,
    image: "",
    state: 1,
    inCatalogue: false, // Nuevo campo añadido
    datasheet: { idMass: "", details: [] },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch para obtener el producto a editar
    fetch(`http://localhost:3000/product/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct({
          ...data,
          inCatalogue: data.inCatalogue, // Asegurarse de que inCatalogue se capture
        });
        const mappedDetails = data.datasheet.datasheetDetails.map((detail) => ({
          idSupplie: detail.idSupplie,
          amount: detail.amount,
          unit: detail.unit,
          name: detail.supply.name,
        }));
        setDetails(mappedDetails);
      });

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
  }, [id]);

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleCancelClick = () => {
    navigate(`/admin/products`);
  };

  const handleAddDetail = () => {
    setDetails([...details, { idSupplie: "", amount: "", unit: "gr" }]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Estructura correcta del producto
    const updatedProduct = {
      name: product.name,
      stock: product.stock,
      price: product.price,
      state: product.state,
      inCatalogue: product.inCatalogue, // Campo agregado en la estructura
      datasheet: {
        details: details.map((detail) => ({
          idSupplie: detail.idSupplie,
          amount: detail.amount,
          unit: detail.unit,
        })),
      },
    };

    try {
      console.log(updatedProduct);
      const response = await fetch(`http://localhost:3000/product/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        Swal.fire({
          title: "¡Producto actualizado!",
          text: "El producto ha sido actualizado exitosamente.",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
          navigate("/admin/products");
        });
      } else {
        throw new Error("Error al actualizar el producto");
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
      <div className="form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Editar Producto</h2>
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="row mb-3">
            <div className="col-sm">
              <label htmlFor="category" className="form-label">Categoría</label>
              <select
                name="idCategorie"
                className="form-select"
                id="category"
                value={product.idCategorie}
                disabled
              >
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
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}

              />
            </div>
            <div className="col-sm">
              <label htmlFor="mass" className="form-label">Masa</label>
              <select
                name="idMass"
                className="form-select"
                id="mass"
                value={product.idMass}
                disabled
              >
                {masses.map((mass) => (
                  <option key={mass.id} value={mass.id}>
                    {mass.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <hr className="mx-3" />
          <div className="mb-3">
            <h5>Detalles de Insumos</h5>
            {details.map((detail, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  value={detail.idSupplie}
                  onChange={(e) => handleDetailChange(index, "idSupplie", e.target.value)}
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
                  value={detail.amount}
                  onChange={(e) => handleDetailChange(index, "amount", e.target.value)}
                  placeholder="Cantidad"

                />
                <select
                  className="form-control"
                  value={detail.unit}
                  onChange={(e) => handleDetailChange(index, "unit", e.target.value)}
                >
                  <option value="gr">gr</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="L">L</option>
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

export default EditProduct;
