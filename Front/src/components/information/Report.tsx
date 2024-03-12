import React from 'react';
import tw, { styled } from 'twin.macro';
import ReportNews from './ReportNews.tsx';
import RadarChart from './RadarChart.tsx';
import TableChart from './TableChart.tsx';
import TextBox from './TextBox.tsx';

const ReportWrapper = styled.section`
  ${tw`w-[75%] h-[100%] border-2 p-2`}
`;

interface ReportProps {
  isNewsOpen: boolean;
  setIsNewsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Report: React.FC<ReportProps> = ({ isNewsOpen, setIsNewsOpen }) => {
  return (
    <ReportWrapper>
      {isNewsOpen ? (
        <ReportNews setIsNewsOpen={setIsNewsOpen} />
      ) : (
        <>
          <RadarChart /> <TableChart /> <TextBox />
        </>
      )}
    </ReportWrapper>
  );
};

export default Report;
