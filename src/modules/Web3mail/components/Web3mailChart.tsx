import Chart from 'react-apexcharts';

function generateMonthlyData(totalSentByMonth: { _id: number; count: number }[]) {
  // Create an array with 12 slots, all initialized to 0
  const monthlyCounts: number[] = Array(12).fill(0);

  // Iterate over the response data and populate the corresponding month index
  totalSentByMonth.forEach(data => {
    // Subtract 1 from the month number to get the correct array index (0-11)
    // and set the value to the count from your data
    const monthIndex = data._id - 1; // because array indices start at 0

    // Ensure the month index is within the valid range (0-11)
    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyCounts[monthIndex] = data.count;
    }
  });

  return monthlyCounts;
}

function Web3mailChart({
  totalSentByMonth,
}: {
  totalSentByMonth: { _id: number; count: number }[];
}) {
  const montlyData = generateMonthlyData(totalSentByMonth);
  const chart = {
    series: [
      {
        name: 'sent',
        data: montlyData,
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
