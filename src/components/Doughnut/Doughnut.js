import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function DoughnutChart({ dataTime }) {
  //   const Ref = useRef();
  const data = {
    labels: ['Online', 'Meeting', 'Training', 'Coding'],
    datasets: [
      {
        label: '# of Votes',
        data: dataTime(),
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div>
      <Pie data={data} />
    </div>
  );
}

export default DoughnutChart;
