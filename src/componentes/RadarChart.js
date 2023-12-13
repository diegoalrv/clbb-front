import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const RadarChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: data.categorias,
        datasets: [
          {
            label: 'Concepción',
            data: data.valoresSet1,
            backgroundColor: 'rgba(59, 40, 204, 0.6)',
            borderColor: 'rgba(255, 255, 255, 1)',
            borderWidth: 1,
          },
          {
            label: 'Pedro de Valdivia',
            data: data.valoresSet2,
            backgroundColor: 'rgba(138, 132, 226, 0.9)',
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        elements: {
          line: {
            borderColor: 'white',
            borderWidth: 5,
          },
        },
        scales: {
          r: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 20,
            grid: {
              color: 'white',
              borderWidth: 5,
            },
          },
        },
      },
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <canvas id="radarChart" width="400" height="400"></canvas>;
};

export default RadarChart;