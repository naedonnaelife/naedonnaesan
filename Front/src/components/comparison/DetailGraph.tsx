import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const GraphBox = styled.div`
  ${tw`w-full`}
`;
const Graph: React.FC = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'OO동 OO동 OO 시설 수 비교',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      {
        label: 'OO구 OO동',
        data: labels.map(() => [0, 122]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'OO구 OO동',
        data: labels.map(() => [0, 232]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <GraphBox>
      <Bar options={options} data={data} />
    </GraphBox>
  );

  // return <Bar options={options} data={data} />;
};

export default Graph;
