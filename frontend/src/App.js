import React, { useState, useEffect, useRef } from 'react';
import RadarChart from './componentes/RadarChart';
import PieChart from './componentes/PieChart';
import BarChart from './componentes/BarChart.js';
import HorizontalStackedBar from './componentes/HorizontalStackedBar';
import TableComponent from './componentes/tablaHeap.js';
import './index.css';
import axios from 'axios';
import isEqual from 'lodash/isEqual';

// Memoizar los componentes para evitar re-renderizados innecesarios
const MemoizedRadarChart = React.memo(RadarChart, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));
const MemoizedPieChart = React.memo(PieChart, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));
const MemoizedBarChart = React.memo(BarChart, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));
const MemoizedHorizontalStackedBar = React.memo(HorizontalStackedBar, (prevProps, nextProps) => isEqual(prevProps.data, nextProps.data));

const App = () => {
  const [data, setData] = useState(null); // Estado para los datos del dashboard
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [lastUpdate, setLastUpdate] = useState(null); // Estado para la última actualización
  const prevStateRef = useRef(null); // Referencia para almacenar el estado anterior

  useEffect(() => {
    const apiUrl = 'http://localhost:9901/api/actions/get_current_dashboard_data/'; // Reemplaza con tu URL real

    let isMounted = true; // Para evitar actualizaciones de estado si el componente está desmontado
    let intervalId; // ID del intervalo
    let isFetching = false; // Bandera para rastrear si ya hay una solicitud en curso

    const fetchData = async () => {
      if (isFetching) return; // Evita múltiples solicitudes concurrentes
      isFetching = true;

      try {
        const response = await axios.get(apiUrl);
        console.log('Datos obtenidos:', response.data);
        console.log('Estado anterior:', prevStateRef.current);
        console.log('Nuevo estado:', response.data.state);
        console.log('¿Hay cambios en el estado?', !isEqual(response.data.state, prevStateRef.current));
        console.log(isMounted)

        if (!isMounted) return; // Evita actualizar el estado si el componente está desmontado

        const newState = response.data.state; // Ajusta según la estructura de tu respuesta

        // Comparar el nuevo estado con el anterior
        if (!prevStateRef.current || !isEqual(newState, prevStateRef.current)) {
          setData(response.data.data); // Actualiza el estado con los nuevos datos
          setLastUpdate(new Date()); // Actualiza la hora de la última actualización
          prevStateRef.current = newState; // Actualiza la referencia con el nuevo estado
          setLoading(false);
        } else {
          console.log('No hay cambios en el estado. No se actualiza el componente.');
        }
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        if (isMounted) {
          setError(err);
          setLoading(false);
        }
      } finally {
        isFetching = false; // Resetea la bandera después de la solicitud
      }
    };

    // Llamada inicial
    fetchData();

    // Configurar el intervalo para llamar a fetchData cada 1 segundo (1000 ms)
    intervalId = setInterval(fetchData, 1000);

    // Limpiar el intervalo y actualizar isMounted al desmontar
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []); // Arreglo vacío para que se ejecute solo una vez al montar

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error al cargar los datos: {error.message}</div>;
  }

  return (
    <div>
      <div>
        <div>
          <h2
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              zIndex: 2,
              color: 'white',
              margin: -15,
              padding: -5,
            }}
          >
            Panel de Control del Monitor
          </h2>
        </div>

        <div className="columna" style={{ position: 'relative', overflow: 'hidden' }}>
          <div className="columna1">
            <div className="grafico">
              <h3>Proximidad</h3>
              <MemoizedHorizontalStackedBar data={data.barrasHorizontalesStackeadas} />
            </div>
            <div className="grafico">
              <h3>Densidad</h3>
              <MemoizedBarChart data={data.barrasStackeadas} />
            </div>
          </div>

          <div className="columna2" style={{ position: 'relative' }}>
            <div className="grafico centrado">
              <div style={{ textAlign: 'center' }}>
                <h3>Gráfico de Radar</h3>
              </div>
              <MemoizedRadarChart data={data.radar} />
              <div
                style={{
                  position: 'absolute',
                  top: 150,
                  right: 50,
                  color: '#00BFFF',
                  zIndex: 2,
                  fontSize: '30px',
                }}
              >
                <p>Proximidad</p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 700,
                  right: 475,
                  color: '#FFFF00',
                  zIndex: 2,
                  fontSize: '30px',
                }}
              >
                <p>Diversidad</p>
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: 350,
                  right: 750,
                  color: 'white',
                  zIndex: 2,
                  fontSize: '30px',
                }}
              >
                <p>Densidad</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {/* <MapLegend leyendas={leyendasData.leyendas} /> */}
              </div>
            </div>
          </div>

          <div className="columna3">
            <div className="grafico">
              <h3>Uso del Suelo</h3>
              <MemoizedPieChart data={data.graficoDeTorta} />
            </div>
            <div
              style={{
                position: 'absolute',
                top: 700,
                right: 150,
                color: 'white',
                zIndex: 2,
              }}
            >
              <img
                src="https://citylabbiobio.cl/wp-content/uploads/2023/08/logo-CLBB-ch.png"
                alt="CityLab Biobío"
                style={{ width: '200px' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar la última actualización */}
      <div style={{ position: 'absolute', bottom: 20, left: 20, color: 'white' }}>
        Última actualización: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'N/A'}
      </div>
    </div>
  );
};

export default App;
