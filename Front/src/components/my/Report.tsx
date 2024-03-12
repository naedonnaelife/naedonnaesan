import React from "react";
import tw, { styled } from "twin.macro";
import ReportContent from "./ReportContent";
import UserStore from "../../stores/UserStore";

const ReportWrapper = styled.section`
  ${tw`w-[100%] border`}
`;

const ReportTitle = styled.h1`
  ${tw`text-3xl mx-5`}
`;

const Report: React.FC = () => {
  const { name, bAddress } = UserStore();

  return (
    <ReportWrapper>
      <ReportTitle>{name}님의 {bAddress} 추천 결과 보고서입니다</ReportTitle>
      <ReportContent />
    </ReportWrapper>
  );
};

export default Report;
