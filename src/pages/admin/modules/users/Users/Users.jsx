import Datatable from "../../../../../components/DatatableUser";
import React, { useState, useEffect } from 'react';

function Users() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/user");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setDatos(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchDatos();
  }, []);

  const data = {
    module: "Usuarios",
    title: "Usuarios",
    colNames: ["Id", "correo", "contraseña", "nombre", "documento", "direccion", "telefono", "rol", "Acciones"],
    content: datos.map(item => ({
      ...item
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Users;