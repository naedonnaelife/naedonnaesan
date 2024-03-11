import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NewsDetail from './ReportNews.tsx';
import RadarChart from './RadarChart.tsx';
import TableChart from './TableChart.tsx';
import TextBox from './TextBox.tsx';

const ReportWrapper = styled.section`
  ${tw`w-[75%] border-2 h-[100%] p-2`}
`;

const Report: React.FC = () => {
  const [isNewsOpen, setIsNewsOpen] = useState<boolean>(false);
  return (
    <ReportWrapper>
      <h1>Report 구간</h1>
      <button onClick={() => setIsNewsOpen(!isNewsOpen)}>임시버튼</button>
      {isNewsOpen ? (
        <NewsDetail />
      ) : (
        <>
          <RadarChart /> <TableChart /> <TextBox />
        </>
      )}
    </ReportWrapper>
  );
};

export default Report;
