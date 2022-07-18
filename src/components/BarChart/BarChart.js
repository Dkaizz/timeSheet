import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

function BarChart({ dataTime }) {
  const data = {
    labels: ['Online', 'Meeting', 'Training', 'Coding'],
    datasets: [
      {
        axis: 'y',
        label: 'Time',
        data: dataTime(),
        fill: true,
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    indexAxis: 'y',
  };
  return <Bar data={data} options={options} />;
}

export default BarChart;
