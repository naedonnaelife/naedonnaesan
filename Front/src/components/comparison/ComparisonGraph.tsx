import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import data from '../../datas/SB.json';

// 이 페이지에서 동네 정보 get 요청 보내기

interface CardIndexProps {
  selected: string | null;
  cardIndex: number;
}

const GraphWrapper = styled.figure`
  ${tw`h-full`}
`;

const ComparisonGraph: React.FC<CardIndexProps> = ({ selected, cardIndex }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  // props 받은 selected(동이름) 가지고 axios 요청 보내기!!

  const options = {
    // 그래프 방향 가로로 전환
    indexAxis: 'y' as const,
    // 바 두께
    maxBarThickness: 40,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      // 구분선 가리기
      x: { display: false },
      y: { display: false },
    },
  };

  const labels = ['치안', '보건', '편의시설', '음식점', '교통', '여가','카페','술집'];

  const dongData = (data: any, cardIndex: number): number[] => {
    const counts = [
      data.cardDongScore.object.safetyCnt,
      data.cardDongScore.object.healthCnt,
      data.cardDongScore.object.convCnt,
      data.cardDongScore.object.foodCnt,
      data.cardDongScore.object.transpCnt,
      data.cardDongScore.object.leisureCnt,
      data.cardDongScore.object.cafeCnt,
      data.cardDongScore.object.pubCnt,
    ];

    // 첫번째 카드면 데이터 음수로
    if (cardIndex === 1) {
      return counts.map((count) => -Math.abs(count));
    } else {
      return counts;
    }
  };

  const dataArray = dongData(data, cardIndex);

  const graphData = {
    labels,
    datasets: [
      {
        label: `${selected}`,
        borderRadius: Number.MAX_VALUE,
        data: labels.map((_, index) => dataArray[index % dataArray.length]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <GraphWrapper>
      <Bar options={options} data={graphData} />
    </GraphWrapper>
  );
};

export default ComparisonGraph;
