import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import UseAxios from "../../utils/UseAxios";

interface CardIndexProps {
  selected: string | null;
  cardIndex: number;
  setDetail: (value: any | null) => void;
}

const GraphWrapper = styled.figure`
  ${tw`h-full`}
`;

const ComparisonGraph: React.FC<CardIndexProps> = ({
  selected,
  cardIndex,
  setDetail,
}) => {
  const [dataArray, setDataArray] = useState<number[]>([]);
  const axios = UseAxios();

  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  const options = {
    // 그래프 방향 가로로 전환
    indexAxis: "y" as const,
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

  const labels = [
    "치안",
    "보건",
    "편의시설",
    "음식점",
    "교통",
    "여가",
    "카페",
    "술집",
  ];

  useEffect(() => {
    const dongDataRequest = async () => {
      try {
        if (selected !== null) {
          await axios
            .get(`/api/dongs/infrascore/${selected}`)
            .then((response) => {
              const data = response.data.object.infraScoreList;
              const detailDatas = response.data.object.infraDetails;

              setDetail(detailDatas);
              return data;
            })
            .then((response) => {
              const dongData = (
                datas: any[] | null,
                cardIndex: number
              ): number[] => {
                const scores: number[] = [];
                datas?.map((category: any) => {
                  scores.push(category.score);
                });
                // 첫번째 카드면 데이터 음수로
                if (cardIndex === 1) {
                  return scores.map((count) => -Math.abs(count));
                } else {
                  return scores;
                }
              };
              setDataArray(dongData(response, cardIndex));
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          const scores: number[] = [];
          return scores;
        }
      } catch (error) {
        console.error(error);
      }
    };
    dongDataRequest();
  }, [selected]);

  const graphData = {
    labels,
    datasets: [
      {
        label: `${selected}`,
        borderRadius: Number.MAX_VALUE,
        data: labels.map((_, index) => dataArray[index]),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
