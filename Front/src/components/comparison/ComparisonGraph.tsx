import React, { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from "chart.js";
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
  const [bar, setBar] = useState<number>(40);
  const axios = UseAxios();

  const updateBarThickness = () => {
    // 화면 너비에 따라 바 두께 조정
    const width = window.innerWidth;
    if (width <= 480) {
      setBar(20);
    } else {
      setBar(40);
    }
  };

  useEffect(() => {
    updateBarThickness();
    window.addEventListener('resize', updateBarThickness); // 화면 크기 변경 시 업데이트

    return () => {
      window.removeEventListener('resize', updateBarThickness);
    };
  }, []);

  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

  const options = {
    // 그래프 방향 가로로 전환
    indexAxis: "y" as const,
    // 바 두께
    maxBarThickness: bar,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      // 구분선 가리기
      x: {
        display: false,
        min: cardIndex === 1 ? -3 : undefined,
        max: cardIndex === 2 ? 3 : undefined,
      },
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
        backgroundColor:
          cardIndex === 1 ? "#8EBE6D" : cardIndex === 2 ? "#FB8D75" : "#FB8D75",
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
