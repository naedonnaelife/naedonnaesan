import React from "react";
import tw, { styled } from "twin.macro";
import ComparisonGraph from "../ComparisonGraph";
// import UseAxios from "../../../utils/UseAxios";

interface SelectedProps {
  selected: string | null;
  setSelected: (value: string | null) => void;
  cardIndex: number;
  setDetail: (value: any | null) => void;
}

const CardWrapper = styled.figure`
  ${tw`flex flex-col w-[43%] h-96 bg-amber-50 `}
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
//   ${tw`w-[30px] h-[30px] border-2 border-red rounded-full
//   max-sm:hidden`}
// `;

const Card: React.FC<SelectedProps> = ({
  selected,
  setSelected,
  cardIndex,
  setDetail,
}) => {
  // const axios = UseAxios();

  // const removeLike = async (id: number) => {
  //   await axios.delete(`/api/zzim/${id}`);
  // };

  return (
    <CardWrapper>
      {selected ? (
        <>
          <CardTop>
            <CardTitle>{selected}</CardTitle>
            <ButtonWrapper>
              {/* <LikeButton onClick={removeLike(dong.zzinId)}>💗</LikeButton> */}
              <button onClick={() => setSelected(null)}>삭제</button>
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
        <p>선택된 항목이 없습니다. 동네를 선택해주세요.</p>
      )}
    </CardWrapper>
  );
};

export default Card;
