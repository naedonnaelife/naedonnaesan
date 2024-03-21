import React from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import data from '../../datas/SB.json';

// 이 페이지에서 동네 정보 get 요청 보내기

interface CardIndexProps {
  cardIndex: number;
}

const GraphWrapper = styled.figure`
  ${tw`w-[80%] h-[80%]`}
`;

const ComparisonGraph: React.FC<CardIndexProps> = ({ cardIndex }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const options = {
    // 그래프 방향 가로로 전환
    indexAxis: 'y' as const,
    // 바 두께
    maxBarThickness: 40,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        // 제목 안보이게함
        display: false,
        text: 'OO구 OO동',
      },
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

  const labels = ['치안', '보건', '편의시설', '음식점', '교통', '여가'];

  const dongData = (data: any, cardIndex: number): number[] => {
    const counts = [
      data.cardDongScore.object.safetyCnt,
      data.cardDongScore.object.healthCnt,
      data.cardDongScore.object.convCnt,
      data.cardDongScore.object.foodCnt,
      data.cardDongScore.object.transpCnt,
      data.cardDongScore.object.leisureCnt,
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
        label: 'OO구 OO동',
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
