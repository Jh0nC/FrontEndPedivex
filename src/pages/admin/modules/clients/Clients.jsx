import Datatable from "../../../../components/DatatableClients";
import  { useState, useEffect } from 'react';

function Purchases() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch("http://localhost:3000/clients"); 
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
    module: "Clients", // Ajustado para clientes
    title: "Lista de Clientes", // Título más descriptivo para clientes
    colNames: ["ID", "Nombre", "Apellido", "Documento","Correo","Telefono", "Acciones"], // Columnas ajustadas
    content: datos.map(item => ({
      id: item.id,
      nombre: item.name,
      apellido: item.lastname,
      document: item.document,
      address: item.address,
      phone: item.phone,
      acciones: item.acciones // Asegúrate de que `acciones` contenga la información que quieres mostrar
    }))
  };

  return (
    <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
      <Datatable data={data} />
    </div>
  );
}

export default Purchases;
