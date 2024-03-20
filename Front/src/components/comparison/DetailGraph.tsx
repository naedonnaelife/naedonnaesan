import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

const GraphWrapper = styled.figure`
  ${tw`w-[80%] h-[400px] border-t-2 border-gray m-7 pt-5`}
`;

const GraphTitle = styled.h1`
  ${tw`flex-c`}
`;

interface DetailGraphProps {
  category: string | null;
  selected1: string | null;
  selected2: string | null;
}

const Graph: React.FC<DetailGraphProps> = ({ category, selected1, selected2 }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  // 상태를 사용하여 창 크기 변화 감지
  const [, setWindowSize] = useState({
    width: window.innerWidth,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
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
        label: `${selected1}`,
        data: labels.map(() => [0, 122]),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: `${selected2}`,
        data: labels.map(() => [0, 232]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <GraphWrapper>
      <GraphTitle>{selected1} {selected2} {category} 수 비교</GraphTitle>
      <Bar options={options} data={data} />
    </GraphWrapper>
  );
};

export default Graph;
