import React from 'react';
import RadarChart from './componentes/RadarChart';
import PieChart from './componentes/PieChart';
import BarChart from './componentes/BarChart.js';

import HorizontalStackedBar from './componentes/HorizontalStackedBar';
import TableComponent from './componentes/tablaHeap.js';
import data from './data/data.json';
import './index.css';

const App = () => {
  return (
    <div className="columna" style={{ position: 'relative', overflow: 'hidden' }}>
      <div>
        <h3 style={{ position: 'absolute', left: 20, top: 20, zIndex: 2, color: 'white', margin: 0, padding: 0 }}>Panel de Control del Monitor</h3>
      </div>
      <div className="columna1" >
        <div className="grafico" >
          <p>Proximidad</p>
          <HorizontalStackedBar data={data.barrasHorizontalesStackeadas} />
        </div>
        <div className="grafico">
          <p>Densidad</p>
          <BarChart data={data.barrasStackeadas}/>
        </div>
      </div>
      <div className="columna2">
        <div className="grafico centrado">
		<div style={{ textAlign: 'center' }}>
			<p>Gráfico de Radar</p>
		</div>
          
          <RadarChart data={data.radar}/>
        </div>
      </div>
      <div className="columna3">
        <div className="grafico" >
          <p>Uso del Suelo</p>
          <PieChart data={data.graficoDeTorta}/>
        </div>
		
		<div className="grafico">
          <p>Diseño</p>
         <TableComponent data={data.tablaCiudades} />
        </div>
		
		
      </div>
    </div>
  );
};

export default App;