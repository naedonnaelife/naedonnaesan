import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';

interface RadarProps {
  dongData: number[];
  seoulData: number[];
}

const ChartWrapper = styled.figure`
  ${tw`flex justify-center h-[45%] border-basic m-1`}
`;

const RadarChart: React.FC<RadarProps> = ({ dongData, seoulData }) => {

  ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
  const chartData = {
    labels: ['편의시설', '치안', '여가', '보건', '음식점', '카페', '술집', '대중교통'],
    datasets: [
      {
        label: '내가 선택한 동',
        data: dongData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: '서울시 평균',
        data: seoulData,
        backgroundColor: 'rgba(100, 99, 100 , 0.2)',
        borderColor: 'rgba(100, 99, 100, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 3,
      },
    },
  };

  return (
    <ChartWrapper>
      <Radar data={chartData} options={chartOptions} />
    </ChartWrapper>
  );
};

export default RadarChart;
