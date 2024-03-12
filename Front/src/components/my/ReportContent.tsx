import React from "react";
import tw, { styled } from "twin.macro";
import RecommendList from "../../utils/RecommendList";

const Backgroud = styled.div`
  ${tw`flex justify-around bg-white`}
`;

const RecommendWrapper = styled.div`
  ${tw`w-[45%] h-full text-center`}
`;

const PreferenceWrapper = styled.div`
  ${tw`flex flex-col justify-center w-[45%]`}
`;

const Preference = styled.div`
  ${tw`text-2xl`}
`;

const Divider = styled.div`
  ${tw`w-0.5 bg-gray`}
`;

const ReportContent: React.FC = () => {
  return (
    <>
      <Backgroud>
        <RecommendWrapper>
          <RecommendList />
        </RecommendWrapper>
        <Divider />
        <PreferenceWrapper>
          <Preference>🥰 치안이 중요해요</Preference>
          <Preference>🥰 식당이 중요해요</Preference>
          <Preference>😀 보건시설은 적당히 필요해요</Preference>
          <Preference>😐 문화시설은 없어도 괜찮아요</Preference>
          <Preference>😐 편의시설은 없어도 괜찮아요</Preference>
        </PreferenceWrapper>
      </Backgroud>
    </>
  );
};

export default ReportContent;
