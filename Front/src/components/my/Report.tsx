import React from "react";
import tw, { styled } from "twin.macro";
import ReportContent from "./ReportContent";
import SB from "../../datas/SB.json";

const ReportWrapper = styled.section`
  ${tw`w-[90%] border-b-2 border-grayHover pb-5
  max-sm:w-full`}
`;

const ReportTitle = styled.h1`
  ${tw`text-3xl mx-5 my-3
  max-sm:text-2xl max-sm:mx-2`}
  span {
    ${tw`max-sm:block`}
  }
`;

const DongChangeButton = styled.button`
  ${tw`underline`}
`;

const Report: React.FC = () => {
  return (
    <ReportWrapper>
      <ReportTitle>
        <span>{SB.reportUserInfo.object.nickname}님의 </span>
        <span><DongChangeButton>{SB.reportUserInfo.object.bAddress}</DongChangeButton> 기준</span>
        추천 결과 보고서입니다
      </ReportTitle>
      <ReportContent />
    </ReportWrapper>
  );
};

export default Report;
