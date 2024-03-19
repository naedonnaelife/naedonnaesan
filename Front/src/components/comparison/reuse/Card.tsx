import React from 'react';
import tw, { styled } from 'twin.macro';
import ComparisonGraph from '../ComparisonGraph';

const CardWrapper = styled.figure`
  ${tw`flex-cc w-[40%] h-96 bg-amber-50 relative`}
`;
const CardTop = styled.div`
  ${tw`flex-c my-3`}
`;
const CardTitle = styled.h1`
  ${tw`font-bold text-3xl`}
`;

const ButtonWrapper = styled.div`
  ${tw`absolute right-0 top-4`}
`;

const Button = styled.button`
  ${tw``}
`;

const CardText = styled.h1`
  ${tw``}
`;

interface SelectedProps {
  selected: string | null;
  setSelected: (value: string | null) => void;
  cardIndex: number;
}

const Card: React.FC<SelectedProps> = ({ selected, setSelected, cardIndex }) => {
  return (
    <CardWrapper>
      {selected ? (
        <>
          <CardTop>
            <CardTitle>{selected}</CardTitle>
            <ButtonWrapper>
              <Button>❤</Button>
              <Button onClick={() => setSelected(null)}>삭제</Button>
            </ButtonWrapper>
          </CardTop>
          <ComparisonGraph cardIndex={cardIndex} />
        </>
      ) : (
        <CardText>선택된 항목이 없습니다. 동네를 선택해주세요.</CardText>
      )}
    </CardWrapper>
  );
};

export default Card;
