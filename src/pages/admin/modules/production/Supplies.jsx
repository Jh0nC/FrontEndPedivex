import { useState, useEffect } from "react";
import Datatable from "../../../../components/Datatable";

function Supplies() {
  
  const [content, setContent] = useState(null);
  const url = "http://localhost:2145/supplie";

  useEffect(() => {

    async function getData(url) {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setContent(data); // Aquí guardamos los datos en el estado
      } catch (err) {
        console.log(err);
      }
    }

    getData(url);
  }, [url]);

  if (!content) {
    return <div>Loading...</div>; // Muestra un mensaje mientras los datos se cargan
  }

  return (
    <>
      <h1>{JSON.stringify(content)}</h1>
      {/* Aquí puedes renderizar los datos de la manera que necesites */}
    </>
  );
}

export default Supplies;