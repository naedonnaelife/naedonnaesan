import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ReportNews from './ReportNews.tsx';
import RadarChart from './RadarChart.tsx';
import TableChart from './TableChart.tsx';
import TextBox from './TextBox.tsx';
import data from '../../datas/jm.json';

const ReportWrapper = styled.section`
  ${tw`w-[75%] h-[100%] border-l border-lightGray p-2
  max-sm:w-[100%]`}
`;

interface ReportProps {
  isNewsOpen: boolean;
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const infraList = [
  { name: '안전', category: 'safety' },
  { name: '여가', category: 'leisure' },
  { name: '보건', category: 'welfare' },
  { name: '교통', category: 'transp' },
  { name: '음식점', category: 'food' },
  { name: '편의시설', category: 'convenience' },
];

const Report: React.FC<ReportProps> = ({ isNewsOpen, setIsNewsOpen }) => {
  const [dongScores, setDongScores] = useState<{ [key: string]: number }>({
    safety: 0,
    leisure: 0,
    welfare: 0,
    transp: 0,
    food: 0,
    convenience: 0,
  });
  const [seoulScores, setSeoulScores] = useState<{ [key: string]: number }>({
    safety: 0,
    leisure: 0,
    welfare: 0,
    transp: 0,
    food: 0,
    convenience: 0,
  });

  // // axios 요청 보내기 !
  useEffect(() => {
    setDongScores(data.dongScores.object);
    setSeoulScores(data.seoulScores);
  });

  const labels: string[] = [];
  const seoulScore: number[] = [];
  const dongScore: number[] = [];

  infraList.map((infra: Record<string, string>) => {
    labels.push(infra.name);
    seoulScore.push(seoulScores[infra.category]);
    dongScore.push(dongScores[infra.category]);
  });

  return (
    <ReportWrapper>
      {isNewsOpen ? (
        <ReportNews setIsNewsOpen={setIsNewsOpen} />
      ) : (
        <>
          <RadarChart seoulScore={seoulScore} dongScore={dongScore} labels={labels} />
          <TableChart /> <TextBox />
        </>
      )}
    </ReportWrapper>
  );
};

export default Report;
