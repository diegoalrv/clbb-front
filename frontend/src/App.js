import React from 'react';

import RadarChart from './componentes/RadarChart';
import PieChart from './componentes/PieChart';
import BarChart from './componentes/BarChart.js';
import MapLegend from './componentes/MapLegend.js'; 
import HorizontalStackedBar from './componentes/HorizontalStackedBar.js';
import TableComponent from './componentes/tablaHeap.js';
import TablaSemaforo from './componentes/TablaSemaforo.js';

import data from './data/data.json';
import leyendasData from './data/colores.json';
import tabla from './data/tabla.json';

import './index.css';

const App = () => {
  return (
    <div className="columna" style={{ position: 'relative', overflow: 'hidden' }}>
      <div>
        <h2 style={{ position: 'absolute', left: 20, top: 20, zIndex: 2, color: 'white', margin: -15, padding: -5 }}>Panel de Control del Monitor</h2>
      
	  </div>
      <div className="columna1" >
        <div className="grafico" >
          <h3>Proximidad</h3>
          <HorizontalStackedBar data={data.barrasHorizontalesStackeadas} />
        </div>
        <div className="grafico">
          <h3>Densidad</h3>
          <BarChart data={data.barrasStackeadas}/>
        </div>
      </div>
      <div className="columna2" style={{ position: 'relative' }}>
        <div className="grafico centrado">
          <div style={{ textAlign: 'center' }}>
            <h3>Gráfico de Radar</h3>
          </div>
          <RadarChart data={data.radar}/>
          <div style={{ position: 'absolute', top: 200, right: 50, color: 'white', zIndex: 2, fontSize: '30px' }}>
            <p>Proximidad</p>
          </div>
		      <div style={{ position: 'absolute', top: 800, right: 475, color: 'white', zIndex: 2, fontSize: '30px' }}>
            <p>Diversidad</p>
          </div>
		      <div style={{ position: 'absolute', top: 330, right: 750, color: 'white', zIndex: 2, fontSize: '30px' }}>
            <p>Densidad</p>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <MapLegend leyendas={leyendasData.leyendas} />
          </div>
        </div>
      </div>
      <div className="columna3">
        <div className="grafico" >
          <h3>Uso del Suelo</h3>
          <PieChart data={data.graficoDeTorta}/>
		 
        </div>
		
	    <div className="grafico" >
          <h3>Tabla Semaforo</h3>
          
		  
		  <TablaSemaforo  data={tabla.tablaSemaforo}/>
        </div>
        <div style={{ position: 'absolute', top: 900, right: 5, color: 'white', zIndex: 2 }}>
		  <img
			src="https://citylabbiobio.cl/wp-content/uploads/2023/08/logo-CLBB-ch.png"
			alt="CityLab Biobío"
			style={{ width: '100px' }} 
		  />
		</div>
      </div>
    </div>
  );
};

export default App;