import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

const ChartWrapper = styled.figure`
  ${tw`flex h-[50%] justify-center m-1 border-2`}
`;

const RadarChart: React.FC = () => {
  // {
  //   "safety" : 3,
  //   "leisure" : 3,
  //   "welfare" : 3,
  //   "transp" : 3,
  //   "food" : 3,
  //   "convenience" : 3
  // }
  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
  const chartData = {
    labels: ['안전', '여가', '보건', '교통', '음식점', '편의시설'],
    datasets: [
      {
        label: '내가 선택한 동',
        data: [2, 6, 7, 8, 6, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '서울시 평균',
        data: [5, 5, 5, 5, 5, 7],
        backgroundColor: 'rgba(100, 99, 100 , 0.2)',
        borderColor: 'rgba(100, 99, 100, 1)',
        borderWidth: 1,
      },
    ],
  };
  return (
    <ChartWrapper>
      <Radar data={chartData} />
    </ChartWrapper>
  );
};

export default RadarChart;
