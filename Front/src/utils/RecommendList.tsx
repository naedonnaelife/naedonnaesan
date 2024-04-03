import { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import useSearchStore from '../stores/SearchStore';
import UseAxios from './UseAxios';
import like from '../assets/like.png';
import unlike from '../assets/unlike.png';

interface RecommendProps {
  isActive: boolean;
  whatComponent: string;
}

type Dong = {
  dongName: string;
  dongId: number;
  zzim: boolean;
  distance: number;
  guName: string;
}[];

type StyleProps = {
  color: string;
  isActive: boolean;
  whatComponent: string;
};

const RecommendWrapper = styled.ul`
  ${tw`flex-cc flex-col h-[30vh] border-2 border-lightGray rounded-lg m-2
  max-sm:w-[100%] max-sm:h-[100%] max-sm:mt-0 max-sm:mx-0 max-sm:bg-semiWhite `}
  ${({ isActive }: StyleProps) => (isActive ? tw`` : tw`max-sm:hidden`)}
`;

const AlertWrapper = styled.div`
  ${tw`flex-cc h-[70%] w-[90%] m-auto `}
`;

const Title = styled.h2`
  ${tw`m-2 text-xl`}
`;

const RecommendResult = styled.li`
  ${tw`flex border-2 border-lightGray font-jamsilLight rounded-lg mx-2 mb-2 p-2`}
  ${({ whatComponent }: StyleProps) => (whatComponent === 'recommend' ? tw`w-[95%]` : tw`w-[85%]`)}
`;

const Index = styled.h3`
  ${tw`flex justify-center items-center w-[10%] bg-dongButtonHover text-white rounded-lg text-center ml-[1vw]`}
`;

const TownName = styled.p`
  ${tw`flex-c cursor-pointer hover:scale-105 hover:text-red hover:font-jamsilMedium ml-[2vw] hover:animate-jump`}
`;

const Distance = styled.span`
  ${tw`flex-c text-10 mt-1 ml-[1vw]`}
`;

const Like = styled.button`
  ${tw`flex justify-center items-center w-[30px] h-[30px] ml-auto mr-[1vw] hover:animate-wiggle-more hover:animate-infinite`}
  ${({ color }: StyleProps) => `border-color : ${color}`};
`;

const P = styled.p`
  ${tw`text-2xl text-center whitespace-pre-wrap mb-5`}
`;

const explanation = `추천 받은 동네가 없어요.\n인프라 선호도를 입력하고\n동네 추천을 받아보세요!`;

const RecommendList: React.FC<RecommendProps> = ({ isActive, whatComponent }) => {
  const store = useSearchStore((state) => state);
  const axios = UseAxios();

  const [newRecommendList, setNewRecommendList] = useState<Dong>([]);
  const [likeDongList, setLikeDongList] = useState<boolean[]>(store.likeList);

  const selectArea = store.selectedArea;
  const recommendList = store.recommendList;
  const update = store.updateLikeList;

  const addLike = async (id: number, index: number) => {
    await axios.post(`/api/zzim/${id}`).then(() => {
      const newData = likeDongList.map((e, idx) => (idx === index ? true : e));
      setLikeDongList(newData);
      update(newData);
    });
  };

  const removeLike = async (id: number, index: number) => {
    await axios.delete(`/api/zzim/${id}`).then(() => {
      const newData = likeDongList.map((e, idx) => (idx === index ? false : e));
      setLikeDongList(newData);
      update(newData);
    });
  };

  useEffect(() => {
    setNewRecommendList(recommendList);
    const selectLikeDong = recommendList.map((e) => e.zzim);
    setLikeDongList(selectLikeDong);
    console.log(recommendList);
  }, [recommendList]);

  return (
    <>
      <RecommendWrapper isActive={isActive}>
        <Title> 추천 동네 </Title>
        {newRecommendList.length ? (
          newRecommendList.map((element, index) => (
            <RecommendResult key={index} whatComponent={whatComponent}>
              <Index>{index + 1}</Index>
              <TownName onClick={() => selectArea(element.dongName)}>
                {element.guName} {element.dongName}
              </TownName>
              <Distance>{element.distance.toFixed(1)}km</Distance>
              {likeDongList[index] ? (
                <Like color="red" onClick={() => removeLike(element.dongId, index)}>
                  <img src={like} alt="like" />
                </Like>
              ) : (
                <Like onClick={() => addLike(element.dongId, index)}>
                  <img src={unlike} alt="unlike" />
                </Like>
              )}
            </RecommendResult>
          ))
        ) : (
          <AlertWrapper>
            <P>{explanation}</P>
          </AlertWrapper>
        )}
      </RecommendWrapper>
    </>
  );
};

export default RecommendList;
