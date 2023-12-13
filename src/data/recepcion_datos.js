import React, { useState, useEffect } from 'react';
import RadarChart from './componentes/RadarChart';
import PieChart from './componentes/PieChart';
import BarChart from './componentes/BarChart.js';
import HorizontalStackedBar from './componentes/HorizontalStackedBar';
import axios from 'axios';
import './index.css';

const App = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://tu-api.com/tu-endpoint');
        setApiData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!apiData) {
    // Puedes agregar un mensaje de carga mientras los datos se están cargando
    return <p>Cargando datos...</p>;
  }

  return (
    <div className="columna" style={{ position: 'relative' }}>
      <h3 style={{ position: 'absolute', left: 20, top: 20, zIndex: 2, color: 'white', margin: 0, padding: 0 }}>Dashboard Monitor</h3>
      {/* Resto del código utilizando apiData en lugar de data */}
      {/* Ejemplo: */}
      <div className="columna1">
        <div className="grafico">
          <p>Proximity</p>
          <HorizontalStackedBar data={apiData.barrasHorizontalesStackeadas} />
        </div>
        <div className="grafico">
          <p>Density</p>
          <BarChart data={apiData.barrasStackeadas}/>
        </div>
      </div>
      {/* ... */}
    </div>
  );
};

export default App;