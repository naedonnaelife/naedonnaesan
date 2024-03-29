import React from "react";
import tw, { styled } from "twin.macro";
import ComparisonGraph from "../ComparisonGraph";
// import UseAxios from "../../../utils/UseAxios"; 

interface SelectedProps {
  selected: any | null;
  setSelected: (value: any | null) => void;
  cardIndex: number;
  setDetail: (value: any | null) => void;
}

const CardWrapper = styled.figure`
  ${tw`flex flex-col w-[40%] h-96 bg-amber-50 
  max-sm:h-64`}
`;

const CardTop = styled.div`
  ${tw`flex-c my-3 h-[10%]
  max-sm:flex-col max-sm:items-center`}
`;
const CardTitle = styled.h1`
  ${tw`font-bold text-3xl
  max-sm:text-xl`}
`;

const GraphWrapper = styled.figure<{ cardIndex: number }>`
  ${tw`w-[90%] h-[80%]`}
  ${({ cardIndex }: { cardIndex: number }) => (cardIndex === 1 ? tw`ml-auto` : tw``)}
`;

const ButtonWrapper = styled.div`
  ${tw`flex`}
`;

// const LikeButton = styled.button`
//   ${tw`w-[30px] h-[30px]`}
// `;

const Card: React.FC<SelectedProps> = ({
  selected,
  setSelected,
  cardIndex,
  setDetail,
}) => {
  // const [likedDongList, setLikedDongList] = useState<any[]>([]);
  // const axios = UseAxios();


  // const addLike = async (id:number) => {
  //   await axios.post(`/api/zzim/${id}`)
  //   .then((response) => {
  //     setLikedDongList((prev: any) => prev.filter((zzim: any) => zzim.dongId !== id))
  //     console.log(' 좋아요 : ', response)
  //   });
  // };

  // const removeLike = (id: number) => {
  //   axios
  //     .delete(`/api/zzim/${id}`)
  //     .then(() => {
  //       setLikedDongList((prev: any) => prev.filter((zzim: any) => zzim.dongId !== id));
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <CardWrapper>
      {selected ? (
        <>
          <CardTop>
            <CardTitle>{selected.dongName}</CardTitle>
            <ButtonWrapper>
            {/* {likedDongList? (
              <LikeButton onClick={() => removeLike(selected.dongId)}>💗</LikeButton>
            ) : (
              <LikeButton onClick={() => addLike(selected.dongId)}>🤍</LikeButton>
            )} */}
              <button onClick={() => setSelected(null)}>삭제</button>
            </ButtonWrapper>
          </CardTop>
          <GraphWrapper cardIndex={cardIndex}>
            <ComparisonGraph
              cardIndex={cardIndex}
              selected={selected.dongName}
              setDetail={setDetail}
            />
          </GraphWrapper>
        </>
      ) : (
        <p>선택된 항목이 없습니다. 동네를 선택해주세요.</p>
      )}
    </CardWrapper>
  );
};

export default Card;
