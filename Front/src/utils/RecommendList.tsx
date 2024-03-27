import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import useSearchStore from '../stores/SearchStore';
import UseAxios from './UseAxios';

type Dong = {
  dongName : string;
  dongId : number;
  isLike : boolean;
}[]

type StyleProps = {
  color: string;
}

const RecommendWrapper = styled.ul`
  ${tw`flex flex-col h-[35%] border-2 border-lightGray rounded-lg m-2
  max-sm:w-[100%] max-sm:h-[100%] max-sm:mt-0 max-sm:bg-semiWhite`}
`;

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
  ${tw`cursor-pointer hover:scale-105 hover:text-red`}
`;

const Like = styled.button`
  ${tw`flex justify-center items-center w-[30px] h-[30px] border-2 border-grayHover rounded-full`}
  ${({color}:StyleProps) => `border-color : ${color}`};
`;


const RecommendList: React.FC = () => {
  const [newRecommendList, setNewRecommendList] = useState<Dong>([])
  const [likeDongList, setLikeDongList] = useState([true, true, false])
  const axios = UseAxios()

  const selectArea = useSearchStore(state => state.selectedArea)
  const recommendList = useSearchStore(state => state.recommendList)

  const addLike = async (id:number, index: number) => {
    await axios.post(`/api/zzim/${id}`)
    .then((response) => {
      setLikeDongList(prev => prev.map((e, idx) => (idx === index ? true : e)))
      console.log(' 좋아요 : ', response)
    });
  };

  const removeLike = async (id:number, index: number) => {
    await axios.delete(`/api/zzim/${id}`)
    .then((response) => {
      setLikeDongList(prev => prev.map((e, idx) => (idx === index ? false : e)))
      console.log('싫어요 : ', response)
    });
  };
  

  useEffect(()=>{
    setNewRecommendList(recommendList)
    const selectLikeDong = recommendList.map(e => e.isLike)
    setLikeDongList(selectLikeDong)
  }, [recommendList])




  return (
    <>
      <RecommendWrapper>
        <Title> 추천 동네 </Title>
        {newRecommendList.map((element, index) => (
          <RecommendResult key={index}>
            <Index>{index + 1}</Index>
            <TownName onClick={() => selectArea(element.dongName)}>{element.dongName}</TownName>
            {likeDongList[index]? (
              <Like color='red' onClick={() => removeLike(element.dongId, index)}>💗</Like>
            ) : (
              <Like onClick={() => addLike(element.dongId, index)}>🤍</Like>
            )}
          </RecommendResult>
        ))}
      </RecommendWrapper>
    </>
  );
};

export default RecommendList;
