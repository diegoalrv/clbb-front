import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const DonutChart = ({ data }) => {
  const total = data.tipos.reduce((sum, tipo) => sum + tipo.valor, 0);

  const chartData = {
    labels: data.tipos.map(tipo => tipo.nombre),
    datasets: [
      {
        data: data.tipos.map(tipo => (tipo.valor / total) * 100),
        backgroundColor: ["#472db4","#00bfff","#7839e0","#57f0d9","#4168f0","#6000d9","#3ad3d3","#268df8","#80ffdb","#30daf7"],
        hoverBackgroundColor: ["#472db4","#00bfff","#7839e0","#57f0d9","#4168f0","#6000d9","#3ad3d3","#268df8","#80ffdb","#30daf7"],
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