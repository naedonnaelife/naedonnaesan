import React from "react";
import tw, { styled } from "twin.macro";
import ComparisonGraph from "../ComparisonGraph";
// import UseAxios from "../../../utils/UseAxios"; 

interface SelectedProps {
  selected: string | null;
  setSelected: (value: any | null) => void;
  cardIndex: number;
  setDetail: (value: any | null) => void;
}

const CardWrapper = styled.figure`
  ${tw`flex flex-col w-[40%] h-96 bg-amber-50 
  max-sm:h-64`}
`;

const CardTop = styled.div`
  ${tw`flex-c w-[100%] h-[10%] relative my-3
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
  ${tw`absolute top-2 right-4
  max-sm:top-1`}
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


  // const addLike = async (name:string) => {
  //   await axios.post(`/api/zzim/${name}`)
  //   .then((response) => {
  //     setLikedDongList((prev: any) => prev.filter((zzim: any) => zzim.dongName === name))
  //     console.log(' 좋아요 : ', response)
  //   });
  // };

  // const removeLike = (name: string) => {
  //   axios
  //     .delete(`/api/zzim/${name}`)
  //     .then((response) => {
  //       console.log(response)
  //       setLikedDongList((prev: any) => prev.filter((zzim: any) => zzim.dongName !== name));
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
            <CardTitle>{selected}</CardTitle>
            <ButtonWrapper>
            {/* {likedDongList? (
              <LikeButton onClick={() => removeLike(selected)}>💗</LikeButton>
            ) : (
              <LikeButton onClick={() => addLike(selected)}>🤍</LikeButton>
            )} */}
              <button onClick={() => setSelected(null)}>✖</button>
            </ButtonWrapper>
          </CardTop>
          <GraphWrapper cardIndex={cardIndex}>
            <ComparisonGraph
              cardIndex={cardIndex}
              selected={selected}
              setDetail={setDetail}
            />
          </GraphWrapper>
        </>
      ) : (
        <p>선택된 동네가 없습니다. 동네를 선택해주세요.</p>
      )}
    </CardWrapper>
  );
};

export default Card;
