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
          '#3E0073',
          '#7209B7',
          '#76126E',
          '#B5179E',
          '#F72585',
          '#C673C6',
          '#8A84E2',
          '#1B1464',
          '#3F37C9',
          '#0069D6',
          '#22B8D3',
          '#05F2D2',
          '#66FF99',
          '#9BFAED',
          '#66A5E6',
        ],
        hoverBackgroundColor: [
          '#3E0073',
          '#7209B7',
          '#76126E',
          '#B5179E',
          '#F72585',
          '#C673C6',
          '#8A84E2',
          '#1B1464',
          '#3F37C9',
          '#0069D6',
          '#22B8D3',
          '#05F2D2',
          '#66FF99',
          '#9BFAED',
          '#66A5E6',
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