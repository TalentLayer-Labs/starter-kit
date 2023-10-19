import Chart from 'react-apexcharts';

function Web3mailChart() {
  const chart = {
    series: [
      {
        name: 'Inflation',
        data: [150, 150, 150, 150, 100, 200, 250, 300, 450, 500, 600, 0],
      },
    ],
    options: {
      chart: {
        width: '100%',
        height: 300,
        type: 'bar',
        background: '#1e293b',
      },
      theme: {
        mode: 'dark',
        monochrome: {
          enabled: true,
          color: '#9d0d42',
          shadeTo: 'dark',
          shadeIntensity: 0.5,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: 10,
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },

      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
        },
      },
    },
  };

  // @ts-ignore
  return <Chart options={chart.options} series={chart.series} type='bar' width='100%' />;
}
export default Web3mailChart;
