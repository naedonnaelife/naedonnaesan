import { useState } from 'react';
import tw, { styled } from 'twin.macro';
import useSearchStore from '../stores/SearchStore';

const dummyData = {
  response: ['성동구 성수1가1동', '성동구 성수1가2동', '중구 을지로동'],
};

const RecommendWrapper = styled.ul`
  ${tw`flex flex-col h-[30%] border-2 border-kakaoBlue rounded-lg m-2`}
`;

const Title = styled.h2`
  ${tw`m-2`}
`;

const RecommendResult = styled.li`
  ${tw`flex justify-between border-2 border-gray rounded-sm mx-2 my-1 p-2`}
`;

const Index = styled.h3`
  ${tw` flex justify-center items-center w-[10%] bg-gray rounded-lg text-center`}
`;

const TownName = styled.p`
  ${tw`cursor-pointer hover:scale-105 hover:text-red`}
`;

const Like = styled.button`
  ${tw`flex justify-center items-center w-[30px] h-[30px] border-2 border-red rounded-full`}
`;

const RecommendList: React.FC = () => {
  const [likeList, setLikeList] = useState([1, 2]);
  const selectArea = useSearchStore((state:any) => state.selectedArea)

  const addLike = (index: number) => {
    setLikeList((prev) => [...prev, index]);
  };
  const removeLike = (index: number) => {
    setLikeList((prev) => prev.filter((element) => element !== index));
  };
  return (
    <>
      <RecommendWrapper>
        <Title> 추천 동네 </Title>
        {dummyData.response.map((element: string, index: number) => (
          <RecommendResult key={index}>
            <Index>{index + 1}</Index>
            <TownName onClick={() => selectArea(element)}>서울특별시 {element}</TownName>
            {likeList.includes(index + 1) ? (
              <Like onClick={() => removeLike(index + 1)}>💗</Like>
            ) : (
              <Like onClick={() => addLike(index + 1)}>🤍</Like>
            )}
          </RecommendResult>
        ))}
      </RecommendWrapper>
    </>
  );
};

export default RecommendList;
