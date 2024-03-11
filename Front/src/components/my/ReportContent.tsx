import React from "react";
import tw, { styled } from "twin.macro";
import RecommendList from "../../utils/RecommendList";

const Backgroud = styled.div`
  ${tw`bg-white w-4/5 flex justify-around`}
`;

const PreferenceList = styled.div`
  ${tw``}
`;

const Preference = styled.div`
  ${tw`text-xl`}
`;

const Divider = styled.div`
  ${tw`w-0.5 h-40 bg-gray`}
`;

const ReportContent: React.FC = () => {
  return (
    <>
      <Backgroud>
        <RecommendList />
        <Divider />
        <PreferenceList>
          <Preference>보건 중요</Preference>
          <Preference>치안 안중요</Preference>
          <Preference>선호 중요</Preference>
          <Preference>선호 중요</Preference>
          <Preference>선호 중요</Preference>
        </PreferenceList>
      </Backgroud>
    </>
  );
};

export default ReportContent;
