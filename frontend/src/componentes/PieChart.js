import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ data }) => {
  const total = data.tipos.reduce((sum, tipo) => sum + tipo.valor, 0);

  const chartData = {
    labels: data.tipos.map(tipo => tipo.nombre),
    datasets: [
      {
        data: data.tipos.map(tipo => (tipo.valor / total) * 100),
        backgroundColor: [
          'rgba(207, 136, 244, 0.99)',
          'rgba(147, 205, 221, 0.99)',
          'rgba(209, 196, 233, 0.99)',
          'rgba(243, 217, 241, 0.99)',
          'rgba(255, 192, 203, 0.99)',
          'rgba(244, 165, 222, 0.99)',
          'rgba(226, 220, 246, 0.99)',
          'rgba(187, 142, 214, 0.99)',
          'rgba(180, 198, 255, 0.99)',
          'rgba(107, 188, 242, 0.99)',
          'rgba(169, 238, 246, 0.99)',
          'rgba(201, 255, 229, 0.99)',
          'rgba(217, 255, 204, 0.99)',
          'rgba(240, 250, 255, 0.99)',
          'rgba(152, 198, 255, 0.99)',
        ],
        borderColor: [
          'rgba(207, 136, 244, 1)',
          'rgba(147, 205, 221, 1)',
          'rgba(209, 196, 233, 1)',
          'rgba(243, 217, 241, 1)',
          'rgba(255, 192, 203, 1)',
          'rgba(244, 165, 222, 1)',
          'rgba(226, 220, 246, 1)',
          'rgba(187, 142, 214, 1)',
          'rgba(180, 198, 255, 1)',
          'rgba(107, 188, 242, 1)',
          'rgba(169, 238, 246, 1)',
          'rgba(201, 255, 229, 1)',
          'rgba(217, 255, 204, 1)',
          'rgba(240, 250, 255, 1)',
          'rgba(152, 198, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const tipo = data.tipos[context.dataIndex];
            const porcentaje = ((tipo.valor / total) * 100).toFixed(2);
            return `${tipo.nombre}: ${porcentaje}%`;
          },
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value, context) => {
          const tipo = data.tipos[context.dataIndex];
          const porcentaje = ((tipo.valor / total) * 100).toFixed(2);
          return `${porcentaje}%`;
        },
      },
    },
  };

  return <Doughnut data={chartData} options={chartOptions} />;
};

export default DonutChart;