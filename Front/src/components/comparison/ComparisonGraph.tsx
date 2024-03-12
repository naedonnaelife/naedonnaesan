import React from "react";
import tw, { styled } from "twin.macro";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

const GraphWrapper = styled.figure`
  ${tw`w-full h-[80%]`}
`;

const ComparisonGraph: React.FC = () => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

  const options = {
    // 그래프 방향 가로로 전환
    indexAxis: "y" as const,
    // 바 두께
    maxBarThickness: 40,
    responsive: true,
    maintainAspectRatio : false,
    plugins: {
      title: {
        // 제목 안보이게함
        display: false,
        text: "OO구 OO동",
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

  const labels = ["치안", "교통", "보건", "식당", "문화"];

  // 만약 두번째라면 - 붙이기 (음수로 설정)
  const dataArray = [123, 86, 212, 124, 232];

  const data = {
    labels,
    datasets: [
      {
        label: "OO구 OO동",
        borderRadius: Number.MAX_VALUE,
        data: labels.map((_, index) => dataArray[index % dataArray.length]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <GraphWrapper>
      <Bar options={options} data={data} />
    </GraphWrapper>
  )
};

export default ComparisonGraph;
