import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function CreateMass({ onCancel, initialData = {} }) {
  const [name, setName] = useState(initialData.name || '');
  const [notes, setNotes] = useState(initialData.notes || '');
  const [details, setDetails] = useState(initialData.details || []);
  const [supplies, setSupplies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2145/supplie")
      .then((response) => response.json())
      .then((data) => setSupplies(data));
  }, []);

  const handleDetailChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { idSupplie: '', amount: '', unit: 'gr' }]);
  };

  const handleRemoveDetail = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const massData = {
      name,
      notes,
      details,
    };

    fetch("http://localhost:2145/masses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(massData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: 'Masa creada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/admin/masses');
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear la masa',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error("Error:", error);
      });
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="mass-form-container border rounded-4 mx-auto my-3 p-3">
        <h2>{initialData.id ? 'Editar Masa' : 'Agregar Masa'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de la Masa</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Notas</label>
            <textarea
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
          <div className="mb-3">
            <h5>Detalles</h5>
            {details.map((detail, index) => (
              <div key={index} className="d-flex align-items-center mb-2 gap-2">
                <select
                  className="form-control"
                  value={detail.idSupplie}
                  onChange={(e) =>
                    handleDetailChange(index, 'idSupplie', e.target.value)
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
                    handleDetailChange(index, 'amount', e.target.value)
                  }
                  required
                />
                <select
                  className="form-control"
                  value={detail.unit}
                  onChange={(e) =>
                    handleDetailChange(index, 'unit', e.target.value)
                  }
                  required
                >
                  <option value="gr">(gr) Gramos</option>
                  <option value="ml">(ml) Mililitros</option>
                  <option value="unit">(unit) Unidad</option>
                </select>
                <button type="button" className="btn btn-outline-secondary" onClick={() => handleRemoveDetail(index)}>
                  <i className="bi bi-dash"></i>
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-outline-info" onClick={handleAddDetail}>
              <i className="bi bi-plus-lg"></i>
            </button>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              {initialData.id ? 'Actualizar' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateMass;
