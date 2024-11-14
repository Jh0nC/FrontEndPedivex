import chartImg from "../../../../public/assets/chart_480x200.png";
import { React, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

// Importa los módulos que necesita Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Registra los módulos en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const [topCinco, setTopCinco] = useState([]);
  const [topAnual, setTopAnual] = useState([]);
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopCinco = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dashboard/topCinco?mes=11`);
        if (!response.ok) {
          throw new Error('Error al obtener los top cinco');
        }
        const data = await response.json();
        setTopCinco(data);
      } catch (error) {
        setError('Error al cargar top cinco: ' + error.message);
      }
    };

    const fetchTopAnual = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dashboard/topAnual?anio=2024`);
        if (!response.ok) {
          throw new Error('Error al obtener los top anuales');
        }
        const data = await response.json();
        setTopAnual(data);
      } catch (error) {
        setError('Error al cargar top anual: ' + error.message);
      }
    }

    const fetchVentasPorMes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/dashboard/ventasPorMes?anio=2024`);
        if (!response.ok) {
          throw new Error('Error al obtener las ventas por mes');
        }
        const data = await response.json();
        setVentasPorMes(data);
      } catch (error) {
        setError('Error al cargar ventas por mes: ' + error.message);
      }
    }

    fetchTopCinco();
    fetchTopAnual();
    fetchVentasPorMes();
  }, []);

  // Formatea los datos para la gráfica
  const dataTopCinco = {
    labels: topCinco.map(item => item.productName),
    datasets: [{
      label: 'Top 5 productos mas vendidos del mes',
      backgroundColor: '#FEB81C',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#feb61c34',
      hoverBorderColor: '#4C2B07',
      data: topCinco.map(item => item.totalCantidadVendida)
    }]
  };

  const dataTopAnual = {
    labels: topAnual.map(item => item.productName),
    datasets: [{
      label: 'Top productos mas vendidos en el año',
      backgroundColor: '#FEB81C',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#feb61c34',
      hoverBorderColor: '#4C2B07',
      data: topAnual.map(item => item.totalCantidadVendida)
    }]
  };

  const obtenerNombreMes = (numeroMes) => {
    const nombresMeses = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return nombresMeses[numeroMes - 1];
  };

  const dataVentasPorMes = {
    labels: ventasPorMes.map(item => obtenerNombreMes(item.mes)),
    datasets: [{
      label: 'Ventas por mes',
      backgroundColor: '#FEB81C',
      borderColor: 'black',
      borderWidth: 1,
      hoverBackgroundColor: '#feb61c34',
      hoverBorderColor: '#4C2B07',
      data: ventasPorMes.map(item => item.cantidadVentas)
    }]
  };

  const opciones = {
    maintainAspectRatio: false,
    responsive: true
  };

  return (
    <>
      <div className="container-fluid border-type-mid rounded-4 content py-3 px-2 bg-light shadow">
        <div className="row d-flex dashboard-img ">
          <div className="col-sm-6 d-flex flex-column align-items-center">
            {error ? (
              <p>{error}</p>
            ) : (
              <Bar data={dataTopCinco} options={opciones}/>
            )}
          </div>
          <div className="col-sm-6 d-flex flex-column align-items-center">
            {error ? (
              <p>{error}</p>
            ) : (
              <Bar data={dataTopAnual} options={opciones}/>
            )}
          </div>
          <div className="col-sm-6 d-flex flex-column align-items-center">
            {error ? (
              <p>{error}</p>
            ) : (
              <Bar data={dataVentasPorMes} options={opciones}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
};

export default Dashboard;