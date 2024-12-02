import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

function EditMass() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [details, setDetails] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the mass data by ID
    fetch(`https://pedivexapi.onrender.com/masses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setNotes(data.notes);
        setDetails(data.massDetails.map(detail => ({
          idSupplie: detail.idSupplie,
          amount: detail.amount,
          unit: detail.unit
        })));
      })
      .catch((error) => console.error('Error fetching mass data:', error));

    // Fetch the supplies data
    fetch("https://pedivexapi.onrender.com/supplie")
      .then((response) => response.json())
      .then((data) => setSupplies(data))
      .catch((error) => console.error('Error fetching supplies:', error));
  }, [id]);

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

    fetch(`https://pedivexapi.onrender.com/masses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(massData),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          title: 'Masa actualizada con éxito',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          navigate('/admin/masses');
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar la masa',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
        console.error("Error:", error);
      });
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <div className="form-container border rounded-4 mx-auto my-3 p-3">
        <h2>Editar Masa</h2>
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
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/admin/masses')}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-success">
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMass;
