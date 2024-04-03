import React, { useState, useEffect } from 'react';
import tw, { styled } from 'twin.macro';
import { useNavigate } from 'react-router-dom';
import RecommendList from '../../utils/RecommendList';
import UseAxios from '../../utils/UseAxios';
import useSearchStore from '../../stores/SearchStore';
import face from '../../assets/face1.png';

interface ReportContentProps {
  name: string | null;
}

type PreferencesType = {
  [key: string]: number;
};

const Backgroud = styled.div`
  ${tw`flex justify-around w-[100%] h-[80%] border-basic mx-[12px] 
  max-sm:flex-cc max-sm:m-0 max-sm:h-[85%] max-sm:p-2`}
`;

const RecommendWrapper = styled.div`
  ${tw`w-[50%] h-full py-6
  max-sm:w-full max-sm:p-2`}
`;

const PreferenceWrapper = styled.ul`
  ${tw`flex-c w-[50%] h-[100%] px-2
  max-sm:w-full max-sm:h-[50%]`}
`;

const Card = styled.figure`
  ${tw`flex-cc w-[100%] h-[100%]`}
`;
const CardImage = styled.img`
  ${tw`flex-cc h-[30%] object-cover animate-bounce`}
`;
const CartTitle = styled.h1`
  ${tw`text-2xl`}
`;
const InfraContent = styled.p`
  ${tw`text-xl text-blue-500`}
`;
const CardContent = styled.p`
  ${tw`font-jamsilMedium text-center`}
`;

const ReportContent: React.FC<ReportContentProps> = ({ name }) => {
  const [preferences, setPreferences] = useState<PreferencesType | null>(null);
  const [isEnter, setIsEnter] = useState(false);
  const axios = UseAxios();
  const navigate = useNavigate();
  const areaName = useSearchStore((state) => state.areaName);
  const updateRecommendList = useSearchStore((state) => state.updateRecommendList);

  useEffect(() => {
    axios
      .get('/api/mypage/filterlist')
      .then((response) => {
        setPreferences(response.data.object.reportDto);
        console.log(response.data.object.reportDto);
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
    pubReport: '술집',
  };

  const lst = [
    'convReport',
    'safetyReport',
    'healthReport',
    'foodReport',
    'transpReport',
    'leisureReport',
    'cafeReport',
    'pubReport',
  ];

  const scoreList = [3, 2, 1].map((score) =>
    lst.filter((category) => (preferences ? preferences[category] === score : null))
  );

  const cardTitles = ['욕심이 많은', '현실을 아는', '모든게 다 좋은'];

  return (
    <Backgroud>
      <PreferenceWrapper>
        {preferences === null ? (
          <Card>
            <CardImage src={face} alt="face" />
            <CartTitle>{name}님!</CartTitle>
            <CardContent>아직 검사결과가 없어요</CardContent>
          </Card>
        ) : (
          <Card>
            <CardImage src={face} alt="face" />
            <CartTitle>
              {cardTitles[0]} {name}님!
            </CartTitle>
            <InfraContent>
              {scoreList[0].map((lst) => (
                <span> {reportLabels[lst]} </span>
              ))}
            </InfraContent>
            <CardContent>
              항목을 중요하다고 선택했어요.
              <br />
              그런 {name}님에게 추천하는 동네는?
            </CardContent>
          </Card>
        )}
      </PreferenceWrapper>
      <RecommendWrapper>
        <RecommendList isActive={true} whatComponent="mypage" />
      </RecommendWrapper>
    </Backgroud>
  );
};

export default ReportContent;
