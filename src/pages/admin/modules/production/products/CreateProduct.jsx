import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateProducts() {
  const [categories, setCategories] = useState([]);
  const [masses, setMasses] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [productDetails, setProductDetails] = useState([
    { idSupplie: "", amount: "", unit: "" },
  ]);

  const navigate = useNavigate(); // Hook para la redirección

  useEffect(() => {
    fetch("http://localhost:3000/productCategories")
      .then((response) => response.json())
      .then((data) => setCategories(data));

    fetch("http://localhost:3000/masses")
      .then((response) => response.json())
      .then((data) => setMasses(data));

    fetch("http://localhost:3000/supplie")
      .then((response) => response.json())
      .then((data) => setSupplies(data));
  }, []);

  const handleAddDetail = () => {
    setProductDetails([...productDetails, { idSupplie: "", amount: "", unit: "" }]);
  };

  const handleRemoveDetail = (index) => {
    const newDetails = [...productDetails];
    newDetails.splice(index, 1);
    setProductDetails(newDetails);
  };

  const handleDetailChange = (index, field, value) => {
    const newDetails = [...productDetails];
    newDetails[index][field] = value;
    setProductDetails(newDetails);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const product = {
      idCategorie: formData.get("idCategorie"),
      name: formData.get("name"),
      stock: formData.get("stock"),
      price: formData.get("price"),
      image: "",
      datasheet: {
        idMass: formData.get("idMass"),
        details: productDetails,
      },
    };

    try {
      const response = await fetch("http://localhost:2415/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Producto creado:", data);

        Swal.fire({
          title: '¡Producto creado!',
          text: 'El producto ha sido creado exitosamente.',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then(() => {
          navigate("/products"); // Redirige a la lista de productos
        });
      } else {
        throw new Error("Error al crear el producto");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: 'Error',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <form onSubmit={handleSubmit}>
        <div className="row d-flex justify-content-around">
          <div className="input-group mb-3">
            <label className="form-label">Tipo de producto</label>
            <select name="idCategorie" className="form-select">
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="row d-flex justify-content-around">
            <label htmlFor="" className="form-label col-5">
              Nombre del producto
              <input type="text" name="name" className="form-control" required />
            </label>
            <label htmlFor="" className="form-label col-7">
              Stock
              <input type="number" name="stock" className="form-control" required />
            </label>
          </div>

          <div className="row d-flex justify-content-around">
            <label htmlFor="" className="form-label col-9">
              Precio
              <input type="text" name="price" className="form-control" required />
            </label>
            <label htmlFor="" className="form-label col-3">
              Masa
              <select name="idMass" className="form-select">
                {masses.map((mass) => (
                  <option key={mass.id} value={mass.id}>
                    {mass.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <hr />
          <h5>Insumos</h5>
          {productDetails.map((detail, index) => (
            <div key={index} className="mb-2 row d-flex justify-content-around align-items-center">
              <label htmlFor="" className="form-label col-6 mb-0">
                <select
                  name={`detail[${index}].idSupplie`}
                  className="form-select"
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
              </label>
              <div className="col-3">
                <input
                  type="number"
                  name={`detail[${index}].amount`}
                  className="form-control"
                  placeholder="Cantidad"
                  value={detail.amount}
                  onChange={(e) => handleDetailChange(index, "amount", e.target.value)}
                />
              </div>
              <div className="col-3">
                <input
                  type="text"
                  name={`detail[${index}].unit`}
                  className="form-control"
                  placeholder="Unidad"
                  value={detail.unit}
                  onChange={(e) => handleDetailChange(index, "unit", e.target.value)}
                />
              </div>
              <div className="col-3 d-flex justify-content-around">
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleRemoveDetail(index)}>
                  <i className="bi bi-dash"></i>
                </button>
                {index === productDetails.length - 1 && (
                  <button type="button" className="btn btn-outline-info" onClick={handleAddDetail}>
                    <i className="bi bi-plus-lg"></i>
                  </button>
                )}
              </div>
            </div>
          ))}

          <hr />
          <div className="row d-flex justify-content-around">
            <button type="submit" className="btn btn-primary">
              Crear Producto
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProducts; q  