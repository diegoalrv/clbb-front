import React, { useEffect, useState } from 'react';

import RadarChart from './componentes/RadarChart';
import PieChart from './componentes/PieChart';
import BarChart from './componentes/BarChart.js';
import MapLegend from './componentes/MapLegend.js'; 
import HorizontalStackedBar from './componentes/HorizontalStackedBar.js';
import TableComponent from './componentes/tablaHeap.js';
import TablaSemaforo from './componentes/TablaSemaforo.js';

// import data from './data/data.json';
import leyendasData from './data/colores.json';
import tabla from './data/tabla.json';

import './index.css';

const App = () => {
  const [realTimeData, setData] = useState(null);

  // Efecto para obtener los datos iniciales y configurar WebSocket
  useEffect(() => {
    // Realizar la solicitud para obtener los datos iniciales
    fetch("http://localhost:8000/get_initial_data")
      .then((response) => response.json())
      .then((initialData) => {
        // Actualizar el estado con los datos iniciales
        setData(initialData);

        // Configurar la conexión WebSocket
        const socket = new WebSocket("ws://localhost:8000/ws"); // Reemplaza la URL con la URL de tu servidor WebSocket

        socket.addEventListener("open", () => {
          console.log("Conexión WebSocket establecida");
        });

        socket.addEventListener("message", (event) => {
          const newData = JSON.parse(event.data);
          // Actualizar el estado con los datos recibidos a través de WebSocket
          setData((prevData) => ({
            ...prevData,
            ...newData,
          }));
          console.log(newData)
        });

        // Lógica para manejar la desconexión WebSocket
        socket.addEventListener("close", () => {
          console.log("Conexión WebSocket cerrada");
          // Puedes agregar aquí la lógica para intentar reconectar si es necesario
        });

        // Retorna una función de limpieza para cerrar la conexión cuando el componente se desmonta
        return () => {
          socket.close();
        };
      })
      .catch((error) => {
        console.error("Error al obtener datos iniciales:", error);
      });
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
      <div>
          <div>
            <div>
              <h2 style={{ position: 'absolute', left: 20, top: 20, zIndex: 2, color: 'white', margin: -15, padding: -5 }}>Panel de Control del Monitor</h2>
            </div>

            <div className="columna" style={{ position: 'relative', overflow: 'hidden' }}>

              <div className="columna1" >
                <div className="grafico" >
                  <h3>Proximidad</h3>
                  {realTimeData && (
                  <HorizontalStackedBar data={realTimeData.barrasHorizontalesStackeadas} />
                  )}
                </div>                
                <div className="grafico">
                  <h3>Densidad</h3>
                  <BarChart data={realTimeData.barrasStackeadas}/>
                </div>
              </div>
              
              <div className="columna2" style={{ position: 'relative' }}>
                <div className="grafico centrado">
                  <div style={{ textAlign: 'center' }}>
                    <h3>Gráfico de Radar</h3>
                  </div>
                  <RadarChart data={realTimeData.radar}/>
                  <div style={{ position: 'absolute', top: 200, right: 50, color: 'white', zIndex: 2, fontSize: '30px' }}>
                    <p>Proximidad</p>
                  </div>
                  <div style={{ position: 'absolute', top: 740, right: 475, color: 'white', zIndex: 2, fontSize: '30px' }}>
                    <p>Diversidad</p>
                  </div>
                  <div style={{ position: 'absolute', top: 330, right: 750, color: 'white', zIndex: 2, fontSize: '30px' }}>
                    <p>Densidad</p>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {/* <MapLegend leyendas={leyendasData.leyendas} /> */}
                  </div>
                </div>
              </div>

              <div className="columna3">
                <div className="grafico" >
                  <h3>Uso del Suelo</h3>
                  <PieChart data={realTimeData.graficoDeTorta}/>
                </div>
              <div style={{ position: 'absolute', top: 700, right: 150, color: 'white', zIndex: 2 }}>
              <img
              src="https://citylabbiobio.cl/wp-content/uploads/2023/08/logo-CLBB-ch.png"
              alt="CityLab Biobío"
              style={{ width: '200px' }} 
              />
              </div>
              </div>
            </div>
          </div>
      </div>
    );  
};

export default App;