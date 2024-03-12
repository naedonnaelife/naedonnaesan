import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const GraphWrapper = styled.figure`
  ${tw`w-[80%]`}
`;
const Graph: React.FC<{ category: string | null }> = ({ category }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `OO동 OO동 ${category} 수 비교`,
      },
    },
    scales: {
      // 구분선 보이게
      x: { display: true },
      y: { display: true },
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
    <GraphWrapper>
      <Bar options={options} data={data} />
    </GraphWrapper>
  );
};

export default Graph;
