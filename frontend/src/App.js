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
    <div>
        <div>
          <div>
            <h2 style={{ position: 'absolute', left: 20, top: 20, zIndex: 2, color: 'white', margin: -15, padding: -5 }}>Panel de Control del Monitor</h2>
          </div>

          <div className="columna" style={{ position: 'relative', overflow: 'hidden' }}>

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
                <PieChart data={data.graficoDeTorta}/>
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