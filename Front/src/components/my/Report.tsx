import React from 'react';
import tw, { styled } from 'twin.macro';
import ReportContent from './ReportContent';

const ReportWrapper = styled.section`
  ${tw`w-[100%] border`}
`;

const ReportTitle = styled.h1`
  ${tw`text-3xl font-bold mx-5`}
`;

const Report: React.FC = () => {
  return (
    <ReportWrapper>
      <ReportTitle>OOO님의 OO구 OO동 추천 결과 보고서입니다</ReportTitle>
      <ReportContent />
    </ReportWrapper>
  );
};

export default Report;
