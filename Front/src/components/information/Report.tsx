import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NewsDetail from './ReportNews.tsx';
import RadarChart from './RadarChart.tsx';
import TableChart from './TableChart.tsx';
import TextBox from './TextBox.tsx';

const ReportWrapper = styled.section`
  ${tw`w-[70%] border-2 m-2 p-1`}
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
