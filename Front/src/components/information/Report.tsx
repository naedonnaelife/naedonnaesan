import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import ReportNews from './ReportNews.tsx';
import RadarChart from './RadarChart.tsx';
import TableChart from './TableChart.tsx';
import TextBox from './TextBox.tsx';
import SearchBar from '../../utils/SearchBar.tsx';
import UseAxios from '../../utils/UseAxios.tsx';

const ReportWrapper = styled.section`
  ${tw`w-[75%] h-[95%] border-l border-lightGray p-2
    max-sm:w-[100%]`}
`;

interface ReportProps {
  isNewsOpen: boolean;
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchDong: string;
  setSearchDong: React.Dispatch<React.SetStateAction<string>>;
}

const Report: React.FC<ReportProps> = ({ isNewsOpen, setIsNewsOpen, searchDong, setSearchDong }) => {
  const [dongScores, setDongScores] = useState<number[]>([]);
  const [dongCounts, setDongCounts] = useState<number[]>([]);
  const [seoulScores, setSeoulScores] = useState<number[]>([]);
  const [seoulCounts, setSeoulCounts] = useState<number[]>([]);
  const axios = UseAxios();

  useEffect(() => {
    const getSeoulData = async () => {
      const response = await axios.get('/api/dashboard/infra/avg');
      const counts = response.data.object.infraCountAvg.map((e: any) => e.avgCount.toFixed(1));
      const scores = response.data.object.infraScoreAvg.map((e: any) => e.score);
      setSeoulCounts(counts);
      setSeoulScores(scores);
    };
    getSeoulData();
  }, []);

  useEffect(() => {
    const getDongData = async () => {
      const response = await axios.get(`/api/dashboard/infra/${searchDong}`);
      const counts = response.data.object.map((e: any) => e.totalCount);
      const scores = response.data.object.map((e: any) => e.infraTypeScore);
      setDongCounts(counts);
      setDongScores(scores);
    };
    getDongData();
  }, [searchDong]);
  
  return (
    <ReportWrapper>
      {isNewsOpen ? (
        <ReportNews setIsNewsOpen={setIsNewsOpen} />
      ) : (
        <>
          <SearchBar searchDong={searchDong} setSearchDong={setSearchDong} />
          <RadarChart seoulData={seoulScores} dongData={dongScores} searchDong={searchDong} />
          <TableChart dongData={dongCounts} seoulData={seoulCounts} searchDong={searchDong} />
          <TextBox searchDong={searchDong} />
        </>
      )}
    </ReportWrapper>
  );
};

export default Report;
