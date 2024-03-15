import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

const ChartWrapper = styled.figure`
  ${tw`flex justify-center h-[50%] border-basic m-1`}
`;
interface RadarProps {
  dongScore: number[];
  seoulScore: number[];
  labels: string[];
}
const RadarChart: React.FC<RadarProps> = ({ dongScore, seoulScore, labels }) => {
  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: '내가 선택한 동',
        data: dongScore,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '서울시 평균',
        data: seoulScore,
        backgroundColor: 'rgba(100, 99, 100 , 0.2)',
        borderColor: 'rgba(100, 99, 100, 1)',
        borderWidth: 1,
      },
    ],
  };
  console.log(dongScore, seoulScore, labels);
  return (
    <ChartWrapper>
      <Radar data={chartData} />
    </ChartWrapper>
  );
};

export default RadarChart;
