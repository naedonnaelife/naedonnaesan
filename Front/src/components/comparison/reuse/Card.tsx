import React from "react";
import tw, { styled } from "twin.macro";
import ComparisonGraph from "../ComparisonGraph";

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

const Card: React.FC<SelectedProps> = ({
  selected,
  setSelected,
  cardIndex,
  setDetail,
}) => {
  return (
    <CardWrapper>
      {selected ? (
        <>
          <CardTop>
            <CardTitle>{selected}</CardTitle>
            <ButtonWrapper>
              <button>❤</button>
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
