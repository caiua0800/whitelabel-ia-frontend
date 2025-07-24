import React from 'react';
import Chart from 'react-apexcharts';
import './grafico.css';

export default function Grafico() {
  const options = {
    chart: {
      type: 'bar',
      height: 500,
      toolbar: {
        show: false 
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    yaxis: {
      title: {
        text: 'Vendas (R$)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "R$ " + val.toLocaleString('pt-BR');
        }
      }
    },
    colors: ['#008FFB', '#00E396', '#FEB019'] // Cores personalizadas
  };

  const series = [{
    name: 'Vendas',
    data: [30000, 40000, 25000, 45000, 49000, 60000, 50000, 91000, 105000, 90000, 80000, 85000]
  }];

  return (
    <div className="grafico-container">
      <div className='grafico'>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={310}
        />
      </div>
    </div>
  );
}