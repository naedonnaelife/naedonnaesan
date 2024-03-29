import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import useSearchStore from '../stores/SearchStore';
import UseAxios from './UseAxios';

interface RecommendProps {
  isActive: boolean;
}

type Dong = {
  dongName : string;
  dongId : number;
  zzim : boolean;
  distance: number;
}[]

type StyleProps = {
  color: string;
  isActive: boolean;
}

const RecommendWrapper = styled.ul`
  ${tw`flex flex-col h-[35%] border-2 border-lightGray rounded-lg m-2
  max-sm:w-[100%] max-sm:h-[100%] max-sm:mt-0 max-sm:bg-semiWhite`}
  ${({isActive}:StyleProps) => (isActive ? tw`` : tw`max-sm:hidden`)}
`;

const AlertWrapper = styled.div`
  ${tw`flex-cc h-[70%] w-[90%] m-auto bg-green-200 `}
`

const Title = styled.h2`
  ${tw`m-2`}
`;

const RecommendResult = styled.li`
  ${tw`flex justify-between border-2 border-lightGray rounded-lg mx-2 my-1 p-2 bg-orange-100`}
`;

const Index = styled.h3`
  ${tw` flex justify-center items-center w-[10%] bg-gray rounded-lg text-center`}
`;

const TownName = styled.p`
  ${tw`cursor-appleMango hover:scale-105 hover:text-red`}
`;

const Distance = styled.p`
  ${tw`flex-c text-10`}
`

const Like = styled.button`
  ${tw`flex justify-center items-center w-[30px] h-[30px] border-2 border-grayHover rounded-full`}
  ${({color}:StyleProps) => `border-color : ${color}`};
`;


const RecommendList: React.FC<RecommendProps> = ({isActive}) => {
  const store = useSearchStore(state => state)
  const axios = UseAxios()

  const [newRecommendList, setNewRecommendList] = useState<Dong>([])
  const [likeDongList, setLikeDongList] = useState<boolean[]>(store.likeList)


  const selectArea = store.selectedArea
  const recommendList = store.recommendList
  const update = store.updateLikeList

  const addLike = async (id:number, index: number) => {
    await axios.post(`/api/zzim/${id}`)
    .then(() => {
      const newData = likeDongList.map((e, idx) => (idx === index ? true : e))
      setLikeDongList(newData)
      update(newData)
    });
  };

  const removeLike = async (id:number, index: number) => {
    await axios.delete(`/api/zzim/${id}`)
    .then(() => {
      const newData = likeDongList.map((e, idx) => (idx === index ? false : e))
      setLikeDongList(newData)
      update(newData)
    });
  };
  

  useEffect(()=>{
    setNewRecommendList(recommendList)
    const selectLikeDong = recommendList.map(e => e.zzim)
    setLikeDongList(selectLikeDong)
    console.log('전체 : ', recommendList)
    console.log('리스트 : ', selectLikeDong)
  }, [recommendList])



  return (
    <>
      <RecommendWrapper isActive={isActive}>
        <Title> 추천 동네 </Title>
        {newRecommendList.length?
          newRecommendList.map((element, index) => (
            <RecommendResult key={index}>
              <Index>{index + 1}</Index>
              <TownName onClick={() => selectArea(element.dongName)}>{element.dongName}</TownName>
              <Distance>{element.distance.toFixed(1)}km</Distance>
              {likeDongList[index]? (
                <Like color='red' onClick={() => removeLike(element.dongId, index)}>💗</Like>
              ) : (
                <Like onClick={() => addLike(element.dongId, index)}>🤍</Like>
              )}
            </RecommendResult>
          )) : 
          <AlertWrapper>
            <div>추천 받은 동네가 없어요!</div>
            <div>인프라를 선택해주세요!</div>
          </AlertWrapper>
        }
      </RecommendWrapper>
    </>
  );
};

export default RecommendList;
