import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
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
  ${tw`flex-c w-[50%] px-2 my-2
  max-sm:w-full`}
  ${({ isPreferencesShow }: PreferenceShowProps) => (isPreferencesShow ? tw`` : tw`max-sm:hidden`)}
`;

const PreferenceButton = styled.button`
  ${tw`w-[90%] border-2 border-grayHover rounded-full hidden
  max-sm:block max-sm:mb-4`}
`;

const Preference = styled.li`
  ${tw`w-[30%] h-[90%] border-basic mx-1 text-center
  max-sm:h-[20vh]`}
`
const ReportContent: React.FC = () => {
  const [isPreferencesShow, setIsPreferencesShow] = useState<boolean>(true);
  const [preferences, setPreferences] = useState<PreferencesType | null>(null);
  const [isEnter, setIsEnter] = useState(false);
  const axios = UseAxios();
  const navigate = useNavigate();
  const areaName = useSearchStore((state) => state.areaName);
  const updateRecommendList = useSearchStore((state) => state.updateRecommendList);

  const preferenceShow = () => {
    setIsPreferencesShow((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get('/api/mypage/filterlist')
      .then((response) => {
        setPreferences(response.data.object.reportDto);
        console.log(response.data.object.reportDto)
        updateRecommendList(response.data.object.mypageDongDtoList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (isEnter) {
      navigate('/information', { state: { areaName: areaName } });
    } else {
      setIsEnter(true);
    }
  }, [areaName]);

  const reportLabels: any = {
    convReport: '편의시설',
    safetyReport: '치안',
    healthReport: '건강',
    foodReport: '식당',
    transpReport: '교통',
    leisureReport: '여가시설',
    cafeReport: '카페',
    pubReport: '술집'
  };

  const lst = [
    'convReport',
    'safetyReport',
    'healthReport',
    'foodReport',
    'transpReport',
    'leisureReport',
    'cafeReport',
    'pubReport'
  ]

  const scoreList = [3, 2, 1].map((score) => lst.filter((category) => preferences ? preferences[category] === score : null))

  const scoreLabels = [
    '🥰',
    '😀',
    '😐',
  ]

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
          ) : (scoreList.map((score, index) => 
            <Preference key={index}> 
            <p>
              {scoreLabels[index]} 
            </p>
            {score.map((s) => <p>{reportLabels[s]}</p>)}
            
            </Preference>
            )
          )}
        </PreferenceWrapper>
      </Backgroud>
    </>
  );
};

export default ReportContent;
