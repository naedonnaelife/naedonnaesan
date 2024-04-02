import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface DetailGraphProps {
  category: string | null;
  selected1: any | null;
  selected2: any | null;
  detail1: any | null;
  detail2: any | null;
}

// type Detail = {
//   infraTypeName: string;
//   infraName: string;
//   totalCount: number;
// }

const GraphWrapper = styled.figure`
  ${tw`flex-c w-[33%] h-[400px] border-t-2 border-gray m-7 mb-5 pt-5
  max-sm:w-full max-sm:h-[300px] max-sm:items-center max-sm:mx-0 `}
`;

const GraphTitle = styled.h1`
  ${tw`flex-c text-2xl`}
`;

const Graph: React.FC<DetailGraphProps> = ({ category, selected1, selected2, detail1, detail2 }) => {
  const [infraList] = useState([]);
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
  // 상태를 사용하여 창 크기 변화 감지
  const [, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    console.log(
      'category : ',
      category,
      'selcted1 : ',
      selected1,
      'selected2 : ',
      selected2,
      'detail1 : ',
      detail1,
      'detail2 : ',
      detail2
    );

    // const detailData1 = detail1.filter((e:Detail) => e.infraTypeName === category)
    // const detailData2 = detail2.filter((e:Detail) => e.infraTypeName === category).map((e:Detail, index:number) => {
    //   return [e.infraName, e.totalCount, detailData1[index].totalCount]
    // })
    // console.log(detailData2)
    // setInfraList(detailData2)
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

  // const labels = detail1
  //   ? detail1.reduce((labelArray: string[], detail: any) => {
  //       if (detail.infraTypeName === category) {
  //         labelArray.push(detail.infraName);
  //       }
  //       return labelArray;
  //     }, [])
  //   : [];

  const getData = (e: any) => {
    const test = {
      labels: e[0],
      datasets: [
        {
          label: `${selected1}`,
          data: e[1],
          backgroundColor: '#8EBE6D',
        },
        {
          label: `${selected2}`,
          data: e[2],
          backgroundColor: '#FB8D75',
        },
      ],
    };
    console.log(test);
    return test;
  };

  return (
    <>
      <GraphTitle>
        {selected1} {selected2} {category} 수 비교
      </GraphTitle>
      <GraphWrapper>
        {infraList.map((e) => (
          <Bar options={options} data={getData(e)} />
        ))}
      </GraphWrapper>
    </>
  );
};

export default Graph;
