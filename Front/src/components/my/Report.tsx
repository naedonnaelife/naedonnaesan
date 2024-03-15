import React from "react";
import tw, { styled } from "twin.macro";
import ReportContent from "./ReportContent";
import UserStore from "../../stores/UserStore";
import SB from "../../datas/SB.json";

const ReportWrapper = styled.section`
  ${tw`w-[100%] border`}
`;

const ReportTitle = styled.h1`
  ${tw`text-3xl mx-5`}
`;

const Report: React.FC = () => {

  return (
    <ReportWrapper>
      <ReportTitle>{SB.reportUserInfo.object.nickname}님의 {SB.reportUserInfo.object.bAddress} 추천 결과 보고서입니다</ReportTitle>
      <ReportContent />
    </ReportWrapper>
  );
};

export default Report;
