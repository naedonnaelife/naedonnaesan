import React from "react";
import tw, { styled } from "twin.macro";
import RecommendList from "../../utils/RecommendList";

const Backgroud = styled.div`
  ${tw`bg-white w-4/5 flex justify-around`}
`;

const DongList = styled.div`
  ${tw`col-span-3`}
`;

const Dong = styled.div`
  ${tw`text-xl col-span-1 `}
`;

const PreferenceList = styled.div`
  ${tw`col-span-3 `}
`;

const Preference = styled.div`
  ${tw`text-xl`}
`;

const Divider = styled.div`
  ${tw`w-0.5 h-40 bg-gray my-4`}
`;

const ReportContent: React.FC = () => {
  return (
    <>
      <Backgroud>
        <RecommendList />
        <DongList>
        </DongList>
        <Divider />
        <PreferenceList>
          <Preference>선호 중요</Preference>
          <Preference>선호 중요</Preference>
          <Preference>선호 중요</Preference>
          <Preference>선호 중요</Preference>
          <Preference>선호 중요</Preference>
        </PreferenceList>
      </Backgroud>
    </>
  );
};

export default ReportContent;
