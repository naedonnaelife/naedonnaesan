import React from 'react';
import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';

const Backgroud = styled.div`
  ${tw`flex justify-around bg-white`}
`;

const RecommendWrapper = styled.div`
  ${tw`w-[50%] h-full text-center border-r-2 px-2 my-2`}
`;

const PreferenceWrapper = styled.ul`
  ${tw`flex flex-col justify-center w-[50%] px-2 my-2`}
`;

const Preference = styled.li`
  ${tw`text-2xl`}
`;

const ReportContent: React.FC = () => {
  return (
    <>
      <Backgroud>
        <RecommendWrapper>
          <RecommendList />
        </RecommendWrapper>
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
