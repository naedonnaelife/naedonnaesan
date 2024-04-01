import tw, { styled } from 'twin.macro';
import Slider from './reuse/InfraSlider'
// import SelectCard from './reuse/SelectCard';
import UseAxios from '../../utils/UseAxios';
import { useEffect, useState } from 'react';
import useSearchStore from '../../stores/SearchStore';
import Alert from '../../utils/Alert.tsx';

interface InfraProps {
  isActive: boolean;
  handleActive: (e:string) => void;
}

type StyleProps = {
  isActive: boolean;
};

const SelectWrapper = styled.section`
  ${tw`flex flex-wrap h-[60%] w-[96%] border-2 border-lightGray rounded-lg m-2 mt-4
max-sm:w-[100%] max-sm:h-[100%] bg-white max-sm:mt-0`}
  ${({ isActive }: StyleProps) => (isActive ? tw`max-sm:hidden` : tw``)}
`;

const Title = styled.h2`
  ${tw`h-[10%] w-full p-2
  max-sm:h-[5%] max-sm:mt-[1.5px] text-xl`}
`;

const SlideWrapper = styled.div`
  ${tw`flex flex-wrap h-[80%] w-full p-1`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex items-center w-full h-[10%]
  max-sm:absolute max-sm:justify-end max-sm:w-[95%] max-sm:mt-1`}
`;

const ResetButton = styled.button`
  ${tw` w-[30%] bottom-1 right-1 bg-purple-200 rounded-lg p-1
  max-sm:w-[auto] max-sm:absolute max-sm:right-[25%]`}
`;

const SubmitButton = styled.button`
  ${tw` w-[65%] bg-purple-200 rounded-lg m-2 p-1
  max-sm:w-[auto]`}
`;

const SelectInfra: React.FC<InfraProps> = ({ isActive, handleActive }) => {
  const dummyData = [
    { name: '안전', detail: 'CCTV, 경찰서, 119안전센터, 치안센터의 중요도입니다.', pk: 0 },
    { name: '여가활동', detail: '헬스장, 영화관의 중요도입니다.', pk: 1 },
    { name: '식당', detail: '음식점, 패스트푸드의 중요도입니다.', pk: 2 },
    { name: '보건시설', detail: '병원, 약국, 의원의 중요도입니다.', pk: 3 },
    { name: '편의시설', detail: '마트, 편의점의 중요도입니다.', pk: 4 },
    { name: '대중교통', detail: '지하철역, 버스정류소의 중요도입니다.', pk: 5 },
    { name: '카페', detail: '카페, 다방의 중요도입니다.', pk: 6 },
    { name: '술집', detail: '술집, 유흥주점의 중요도입니다.', pk: 7 },
  ];


  const [infraData, setInfraData] = useState([2, 2, 2, 2, 2, 2, 2, 2]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const axios = UseAxios();
  const update = useSearchStore((state) => state.updateRecommendList);
  const getDongList = async () => {
    // localStorage.setItem("accessToken", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBY2Nlc3MiLCJleHAiOjE3MTIwNTE0NTAsInJvbGUiOiJVU0VSIiwiaWQiOjJ9.4wUkuxYp3Dz4YwdXjyTvQKK20wrC9R4CUMTQfh3Zf6c")
    const token = localStorage.getItem('accessToken');
    const result = token?.slice(7);
    if (isAllChecked) {
      const response = await axios.post(`/ai/recommend`, { features: infraData, token: result }).then(res => {
        Alert({ title: '검색이 완료되었습니다', content: '추천 동네를 확인해주세요.', icon: 'success' });
        handleActive('recommend')
        return res
      })
      update(response.data.recommend);
      console.log(response.data.recommend)
    } else {
      Alert({ title: '', content: '인프라를 모두 선택해 주세요.', icon: 'info' });
    }
  };

  const changeScore = (element: number, index: number) => {
    const copyData = [...infraData];
    copyData[index] = element;
    setInfraData(copyData);
  };

  const ResetScore = () => {
    setInfraData([2, 2, 2, 2, 2, 2, 2, 2]);
  };
  useEffect(() => {
    const checkZero = infraData.some((e) => e === 0);
    if (!checkZero) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
  }, [infraData]);

  useEffect(()=>{
    const getLastData = async () => { 
      const name = ['safetyReport', 'leisureReport', 'foodReport', 'healthReport', 'convReport', 'transpReport', 'cafeReport', 'pubReport' ]
      const newInfraData = [0,0,0,0,0,0,0,0]
      const response = await axios.get('/api/mypage/filterlist')
      const data = {dongList : response.data.object.mypageDongDtoList, report : response.data.object.reportDto}
      update(data.dongList)

      const entries:[string, number][] = Object.entries(data.report)
      entries.map(([key, value]) => {
        const index = name.indexOf(key);
        if (index !== -1) {
          newInfraData[index] = value;
        }
      })
      setInfraData(newInfraData);
    }

    getLastData()
  }, [])

  return (
    <>
      <SelectWrapper isActive={isActive}>
        <Title>인프라 선택하기</Title>
        <SlideWrapper>
          {dummyData.map((element, index) => (
            <Slider key={element.pk} data={element} value={infraData[index]} changeScore={changeScore} />
          ))}
        </SlideWrapper>
        <ButtonWrapper>
          <SubmitButton onClick={getDongList}>{isAllChecked ? '검색하기' : '인프라를 선택해주세요'} </SubmitButton>
          <ResetButton onClick={ResetScore}> 초기화 </ResetButton>
        </ButtonWrapper>
      </SelectWrapper>
    </>
  );
};

export default SelectInfra;
