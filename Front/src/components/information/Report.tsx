import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import NewsDetail from './ReportNews.tsx';
import ReportChart from './ReportChart.tsx';
// const TestNavbar = styled.div`
const ReportContainer = styled.section`
  ${tw`w-[70%] h-[90%] border-2 m-2 p-1`}
`;

const Report: React.FC = () => {
  const [isNewsOpen, setIsNewsOpen] = useState<boolean>(false);
  return (
    <ReportContainer>
      <h1>Report 구간</h1>
      {isNewsOpen ? <NewsDetail /> : <ReportChart />}
      <button onClick={(): void => setIsNewsOpen(!isNewsOpen)}>임시버튼</button>
    </ReportContainer>
  );
};

export default Report;
