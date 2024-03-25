import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ReportNews from './ReportNews.tsx';
import RadarChart from './RadarChart.tsx';
import TableChart from './TableChart.tsx';
import TextBox from './TextBox.tsx';
import UseAxios from '../../utils/UseAxios.tsx';

const ReportWrapper = styled.section`
  ${tw`w-[75%] h-[100%] border-l border-lightGray p-2
    max-sm:w-[100%]`}
`;

interface ReportProps {
  isNewsOpen: boolean;
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Report: React.FC<ReportProps> = ({ isNewsOpen, setIsNewsOpen }) => {
  const [dongScores, setDongScores] = useState<number[]>([])
  const [dongCounts, setDongCounts] = useState<number[]>([])
  const [seoulScores, setSeoulScores] = useState<number[]>([])
  const [seoulCounts, setSeoulCounts] = useState<number[]>([])
  const axios = UseAxios()
  const dongId = 12

  useEffect(() => {
      const getSeoulData = async () => {
        const response = await axios.get('/api/dashboard/infra/avg')
        // console.log('데이터 : ' ,response)
        const counts = response.data.object.infraCountAvg.map((e: any) => e.avgCount);
        const scores = response.data.object.infraScoreAvg.map((e: any) => e.score); 
        setSeoulCounts(counts)
        setSeoulScores(scores)
        }

      const getDongData = async () => {
        const response = await axios.get(`/api/dashboard/infra/${dongId}`);
        const counts = response.data.object.map((e: any) => e.totalCount);
        const scores = response.data.object.map((e: any) => e.infraTypeScore); 
        console.log('데이터 :' ,response) 
        setDongCounts(counts);
        setDongScores(scores);
      };

      getDongData()
      getSeoulData()

  }, []);

  return (
    <ReportWrapper>
      {isNewsOpen ? (
        <ReportNews setIsNewsOpen={setIsNewsOpen} />
      ) : (
        <>
          <RadarChart seoulData={seoulScores} dongData={dongScores} />
          <TableChart dongData={dongCounts} seoulData={seoulCounts}/>
          <TextBox />
        </>
      )}
    </ReportWrapper>
  );
};

export default Report;
