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

type Detail = {
  infraTypeName: string;
  infraName: string;
  totalCount: number;
}

type StylePros = {
  length: number;
}

const GraphWrapper = styled.figure`
  ${tw`flex-c w-[95%] h-[full] border-t-2 border-gray m-7 mb-5 pt-5
  max-sm:w-full max-sm:h-[300px] max-sm:items-center max-sm:mx-0 `}
`;

const GraphTitle = styled.h1`
  ${tw`flex-c text-2xl mt-10`}
`;

const TestBox = styled.div`
  ${tw`h-[40vh]
  max-sm:h-[30vh]`}
  ${({length}:StylePros) => `width: ${length}%`};
`

const Graph: React.FC<DetailGraphProps> = ({category,selected1,selected2,detail1,detail2,}) => {
  const [infraList, setInfraList] = useState([])
  const [, setWindowSize] = useState({width: window.innerWidth,});
  ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: { display: true },
      y: { display: false },
    },
  };


  const getData = (e:any) => {
      const test = {
      labels : [e[0]],
      datasets: [
        {
          label: `${selected1}`,
          data: [e[1]],
          backgroundColor: "#8EBE6D",
        },
        {
          label: `${selected2}`,
          data: [e[2]],
          backgroundColor: "#FB8D75",
        },
      ],
    }
    return test
  };

  useEffect(()=>{
    const detailData1 = detail1.filter((e:Detail) => e.infraTypeName === category)
    const detailData2 = detail2.filter((e:Detail) => e.infraTypeName === category).map((e:Detail, index:number) => {
      return [e.infraName, detailData1[index].totalCount, e.totalCount]
    })
    setInfraList(detailData2)
  }, [category])

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  
  return (
    <>
      <GraphTitle>
          {selected1} {selected2} {category} 수 비교
      </GraphTitle>
      <GraphWrapper>
        {infraList.map((e) => 
        <TestBox length={(100 / infraList.length)}>
          <Bar options={options} data={getData(e)} />
        </TestBox>
        )}
      </GraphWrapper>
    </>
  );
};

export default Graph;
