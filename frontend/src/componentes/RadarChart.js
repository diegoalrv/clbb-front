import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const RadarChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById('radarChart').getContext('2d');
    var datalabels = data.categorias
    for (var i = 0; i < datalabels.length; i++) {
      datalabels[i] = datalabels[i].replace("_d"," ");
    }
    const chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: datalabels,
        datasets: [
          {
            label: 'Referencia',
            data: data.valoresSet2,
            // backgroundColor: 'rgba(138, 132, 226, 0.4)',
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 3,
          },
          {
            label: 'Costanera',
            data: data.valoresSet1,
            backgroundColor: 'rgba(59, 40, 204, 0.8)',
            borderColor: 'rgba(255, 255, 255, 1)',
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
            stepSize: 5,
            grid: {
              color: 'white',
              borderWidth: 5,
            },
            pointLabels: {
              font: {
                size: 16
              },
              color: 'white',
            }
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