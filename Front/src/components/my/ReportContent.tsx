import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import RecommendList from '../../utils/RecommendList';
import UseAxios from '../../utils/UseAxios';
import useSearchStore from '../../stores/SearchStore';

type PreferenceShowProps = {
  isPreferencesShow: boolean;
};

type PreferencesType = {
  [key: string]: number;
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
  ${tw`text-2xl font-jamsilLight ml-5
  max-sm:text-base`}
`;

const ReportContent: React.FC = () => {
  const [isPreferencesShow, setIsPreferencesShow] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<PreferencesType | null>(null);
  const axios = UseAxios();

  const updateRecommendList = useSearchStore((state) => state.updateRecommendList);

  const preferenceShow = () => {
    setIsPreferencesShow((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get('/api/mypage/filterlist')
      .then((response) => {
        setPreferences(response.data.object.reportDto);
        updateRecommendList(response.data.object.mypageDongDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const reportLabels: any = {
    convReport: '편의시설은',
    safetyReport: '치안은',
    healthReport: '건강은',
    foodReport: '식당은',
    transpReport: '교통은',
    leisureReport: '여가 시설은',
    cafeReport: '카페는',
    pubReport: '술집은',
  };

  const scoreTexts: any = {
    1: '상관없어요',
    2: '적당히 중요해요',
    3: '중요해요',
  };

  const scoreLabels: any = {
    1: '😐',
    2: '😀',
    3: '🥰',
  };

  return (
    <>
      <Backgroud>
        <RecommendWrapper>
          <RecommendList isActive={true} />
        </RecommendWrapper>
        <PreferenceButton onClick={preferenceShow}>
          {isPreferencesShow ? '선호도 접기' : '나의 선호도 보기'}
        </PreferenceButton>
        <PreferenceWrapper isPreferencesShow={isPreferencesShow}>
          {preferences === null ? (
            <p>아직 검사결과가 없어요</p>
          ) : (
            Object.entries(preferences).map(([key, value]) => (
              <Preference key={key}>
                {scoreLabels[value]} {reportLabels[key]} {scoreTexts[value]}
              </Preference>
            ))
          )}
        </PreferenceWrapper>
      </Backgroud>
    </>
  );
};

export default ReportContent;
