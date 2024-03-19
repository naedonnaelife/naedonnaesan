import React, {useState} from 'react';
import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';

type PreferenceShowProps = {
  isPreferencesShow: boolean;
};

const Backgroud = styled.div`
  ${tw`flex justify-around bg-white
  max-sm:flex-cc`}
`;

const RecommendWrapper = styled.div`
  ${tw`w-[50%] h-full text-center border-r-2 px-2 my-2
  max-sm:w-full max-sm:border-r-0`}
`;

const PreferenceWrapper = styled.ul`
  ${tw`flex flex-col justify-center w-[50%] px-2 my-2
  max-sm:w-full`}
  ${({ isPreferencesShow }: PreferenceShowProps) => (isPreferencesShow ? tw`` : tw`max-sm:hidden`)}
`;

const PreferenceButton = styled.button`
  ${tw`w-[90%] border-2 border-grayHover rounded-full hidden
  max-sm:block max-sm:mb-4`}
`;

const Preference = styled.li`
  ${tw`text-2xl ml-5
  max-sm:text-base max-sm:font-jamsilLight`}
`;

const ReportContent: React.FC = () => {

  const [isPreferencesShow, setIsPreferencesShow] = useState(true);
  const preferenceShow = () => {
    setIsPreferencesShow((prev) => !prev);
  };

  return (
    <>
      <Backgroud>
        <RecommendWrapper>
          <RecommendList />
        </RecommendWrapper>
          <PreferenceButton onClick={preferenceShow}>
            {isPreferencesShow ? "선호도 접기" : "나의 선호도 보기"}
          </PreferenceButton>
        <PreferenceWrapper isPreferencesShow={isPreferencesShow}>
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
