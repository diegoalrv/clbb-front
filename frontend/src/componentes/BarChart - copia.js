import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const StackedBarChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById('stackedBarChart').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.barras[0].valores.map((_, index) => `Set N° ${index + 1}`),
        datasets: data.barras.map((barra, index) => ({
          label: barra.nombre,
          data: barra.valores,
          backgroundColor: getRandomColor(),
          borderWidth: 1,
          hidden: index !== 0, // Oculta todas las barras excepto la primera al inicio
        })),
      },
      options: {
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true,
            min: 0, // Establece el valor mínimo del eje Y
            max: 100, // Establece el valor máximo del eje Y
            stepSize: 20, // Establece el tamaño del paso entre los valores
          },
        },
      },
    });

    return () => {
      // Limpiar el gráfico al desmontar el componente
      chart.destroy();
    };
  }, [data]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return <canvas id="stackedBarChart" width="400" height="400"></canvas>;
};

export default StackedBarChart;