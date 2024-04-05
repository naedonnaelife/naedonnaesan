import React from 'react';
import tw, { styled } from 'twin.macro';
import ComparisonGraph from '../ComparisonGraph';

interface SelectedProps {
  selected: string | null;
  setSelected: (value: any | null) => void;
  cardIndex: number;
  setDetail: (value: any | null) => void;
}

const CardWrapper = styled.figure`
  ${tw`flex-cc w-[40%] h-96 bg-amber-50 text-2xl
  max-sm:h-64`}
`;

const CardTop = styled.div`
  ${tw`flex-c w-[100%] h-20 relative 
  max-sm:flex-col max-sm:items-center max-sm:h-12`}
`;
const CardTitle = styled.h1`
  ${tw`font-bold text-3xl
  max-sm:text-xl`}
`;

const GraphWrapper = styled.figure<{ cardIndex: number }>`
  ${tw`w-[90%] h-[80%]`}
  ${({ cardIndex }: { cardIndex: number }) => (cardIndex === 1 ? tw`ml-auto` : tw`mr-auto`)}
`;

const ButtonWrapper = styled.div`
  ${tw`absolute top-2 right-4
  max-sm:top-1 max-sm:w-[5px] max-sm:text-sm`}
`;

const CardText = styled.p`
  ${tw`font-jamsilLight text-xl max-sm:text-sm`}
`;

const Card: React.FC<SelectedProps> = ({ selected, setSelected, cardIndex, setDetail }) => {
  return (
    <CardWrapper>
      {selected ? (
        <>
          <CardTop>
            <CardTitle>{selected}</CardTitle>
            <ButtonWrapper>
              <button onClick={() => setSelected(null)}>✖</button>
            </ButtonWrapper>
          </CardTop>
          <GraphWrapper cardIndex={cardIndex}>
            <ComparisonGraph cardIndex={cardIndex} selected={selected} setDetail={setDetail} />
          </GraphWrapper>
        </>
      ) : (
        <>
          <CardText>선택된 동네가 없습니다.</CardText>
          <CardText>동네를 선택해주세요.</CardText>
        </>
      )}
    </CardWrapper>
  );
};

export default Card;
