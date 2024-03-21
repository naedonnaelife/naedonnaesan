import React from 'react';
import tw, { styled } from 'twin.macro';
import ComparisonGraph from '../ComparisonGraph';

interface SelectedProps {
  selected: string | null;
  setSelected: (value: string | null) => void;
  cardIndex: number;
}

const CardWrapper = styled.figure`
  ${tw`flex-cc w-[40%] h-96 bg-amber-50`}
`;
const CardTop = styled.div`
  ${tw`flex my-3
  max-sm:flex-col max-sm:items-center`}
`;
const CardTitle = styled.h1`
  ${tw`font-bold text-3xl
  max-sm:text-xl`}
`;

const ButtonWrapper = styled.div`
  ${tw`flex`}
`;

const Card: React.FC<SelectedProps> = ({ selected, setSelected, cardIndex }) => {
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
          <ComparisonGraph cardIndex={cardIndex} />
        </>
      ) : (
        <p>선택된 항목이 없습니다. 동네를 선택해주세요.</p>
      )}
    </CardWrapper>
  );
};

export default Card;
